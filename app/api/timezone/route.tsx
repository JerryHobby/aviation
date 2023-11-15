import prisma from "@/prisma/client";
import Axios from "axios";
import {NextRequest, NextResponse} from "next/server";
import {Airports} from ".prisma/client";


// {
//     "timezone": "America/Los_Angeles",
//     "timezone_offset": -8,
//     "date": "2018-12-06",
//     "date_time": "2018-12-06 02:02:09",
//     "date_time_txt": "Thursday, December 06, 2018 02:02:09",
//     "date_time_wti": "Thu, 06 Dec 2018 02:02:09 -0800",
//     "date_time_ymd": "2018-12-06T02:02:09-0800",
//     "date_time_unix": 1544090529.989,
//     "time_24": "02:02:09",
//     "time_12": "02:02:09 AM",
//     "week": "49",
//     "month": "12",
//     "year": "2018",
//     "year_abbr": "18",
//     "is_dst": false,
//     "dst_savings": 1
// }

// keepers:
// timezone: string,
// timezone_offset: number,
// timezone_is_dst: bool,
// timezone_dst_savings: number,
// timezone_last_update: date
// updates all airport timezones on second sunday in march and first sunday in november


// updates all airport timezones
export async function GET (request: NextRequest) {

    // Search Params
    const searchParams = request.nextUrl.searchParams;
    const aaa = searchParams.get('aaa');
    const loc = searchParams.get('loc');

    if( (!aaa && !loc) // fail - no params
        || (aaa && aaa.length !== 3) // fail - invalid airport code
        || (loc && loc.length < 3)) // fail - invalid location

        return new NextResponse(null, {
            status: 404,
            statusText: 'Invalid Request',
        })

    let airport;

    if(aaa) {

        // check timezone table
        // if found and data < 24 hours old, return it
        // if found and data > 24 hours old - query API
        // if not found - query API

        const cached = await prisma.timezone.findFirst({
            where: {aaa: aaa}
        });

        if(cached && cached.last_update) {
            const now = new Date();
            const diff = now.getTime() - cached.last_update.getTime();
            const hours = Math.floor(diff / (1000 * 60 * 60));
            if(hours < 24) {
                return new NextResponse(
                    JSON.stringify({
                        timezone: cached.timezone,
                        offset: cached.offset,
                        is_dst: cached.is_dst,
                        dst_savings: cached.dst_savings,
                        last_update: cached.last_update,
                        cached: true
                    }),
                    {
                        status: 200
                    }
                );
            }
        }

        // stale data or missing data - query API

        airport = await prisma.airports.findFirst({where: {iata_code: aaa},});

        if (!airport) {
            return new NextResponse(null, {
                status: 404,
                statusText: 'Not Found',
            })
        }

        return await getTimezoneData(airport, loc);

    } else {
        // this route gets location timezone, but does not update database
        const timezone = await getTimezoneData(null, loc);

        if (!timezone) {
            return new NextResponse(null, {
                status: 404,
                statusText: 'Not Found',
            })
        }

        return timezone;
    }
}

async function getTimezoneData(airport: Airports | null, location: string | null | undefined) {
    let lng = airport && airport.longitude_deg || undefined;
    let lat = airport && airport.latitude_deg || undefined
    let loc = location || undefined;
    let findStr;
    let timezone;

    if(!airport && !loc) {
        return new NextResponse(null, {
            status: 404,
            statusText: 'Invalid Request',
        })
    }

    if(airport && lng && lat) {
        findStr = `&lat=${lat}&long=${lng}`;
    } else if (loc) {
        findStr = `&location=${loc}`;
    } else if (airport) {
        findStr = `&${airport.municipality}%20${airport.iso_country}%20${airport.continent}`;
    }

    let url =
        `https://api.ipgeolocation.io/timezone?apiKey=${process.env.IP_GEOLOCATION_API_KEY}${findStr}`;

    try {
        timezone = await Axios({
            method: 'get',
            url: url
        });
    }
    catch (e) {
        return new NextResponse(null, {
            status: 404,
            statusText: 'Not Found',
        })
    }

    // try to save it to the timezone table only if airport exists
    airport && airport.iata_code && timezone
    && await updateTimezoneTable(airport.iata_code, timezone);

    let data;
    if(timezone && timezone.data)
        data = timezone.data || undefined;

    if(data) {
        return new NextResponse(
            JSON.stringify(data),
            {
                status: 200
            }
        );
    } else {
        return new NextResponse(null, {
            status: 404,
            statusText: 'Not Found',
        })
    }
}

async function updateTimezoneTable(aaa: string, timezone: any) {

    // query to see if it already exists
    // if it does, update it
    // if it doesn't, create it

    let record;

    try {
        record = await prisma.timezone.findFirst({
            where: {aaa: aaa}
        });

        if (record) {
            record = await prisma.timezone.update({
                where: {aaa: aaa},
                data: {
                    timezone: timezone.data.timezone,
                    offset: timezone.data.timezone_offset,
                    is_dst: timezone.data.is_dst,
                    dst_savings: timezone.data.dst_savings,
                    last_update: timezone.data.timezone_date_time,
                }
            })
        }

        if (!record) {
            record = await prisma.timezone.create({
                data: {
                    aaa: aaa.toUpperCase(),
                    timezone: timezone.data.timezone,
                    offset: timezone.data.timezone_offset,
                    is_dst: timezone.data.is_dst,
                    dst_savings: timezone.data.dst_savings,
                    last_update: new Date()
                }
            })
        }
    }
    catch (e) {
        console.log(e)
        return undefined;
    }

    return record;
}
