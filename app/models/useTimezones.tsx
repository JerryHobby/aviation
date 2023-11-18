import prisma from "@/prisma/client";
import Axios, {AxiosResponse} from "axios";
import {Airports, Timezone} from "@prisma/client";

// when using the Abstract API, the response is:
interface AbstractTimezone {
    "datetime": string,                 // "2023-11-18 00:26:31",
    "timezone_name": string,            // "Greenwich Mean Time",
    "timezone_location": string,        // "Europe/London",
    "timezone_abbreviation": string,    // "GMT",
    "gmt_offset": number,               // 0,
    "is_dst": boolean,                  // false,
    "requested_location": string,       // "Oxford, United Kingdom",
    "latitude": string,                 // 51.7520131,
    "longitude": string,                // -1.2578499
}

// when using the ipgeolocation.io API, the response is:
interface IpGeoTimezone {
    "timezone": string,         // "America/Los_Angeles",
    "timezone_offset": number,  // -8,
    "date": string,             // "2018-12-06",
    "date_time": string,        // "2018-12-06 02:02:09",
    "date_time_txt": string,    // "Thursday, December 06, 2018 02:02:09",
    "date_time_wti": string,    // "Thu, 06 Dec 2018 02:02:09 -0800",
    "date_time_ymd": string,    // "2018-12-06T02:02:09-0800",
    "date_time_unix": number,   // 1544090529.989,
    "time_24": string,          // "02:02:09",
    "time_12": string,          // "02:02:09 AM",
    "week": string,             // "49",
    "month": string,            // "12",
    "year": string,             // "2018",
    "year_abbr": string,        // "18",
    "is_dst": boolean,          // false,
    "dst_savings": number,      // 1
}

// combined airport and timezone data - returned
export interface AirportTimezone {
    aaa: string,
    timezone?: string,
    timezone_offset?: number,
    timezone_is_dst?: boolean,
    current_time?: string,
    current_date?: string,
    latitude?: number,
    longitude?: number,
}

const UseTimezones = async (aaa: string[]) => {

    const airportTimezones: AirportTimezone[] = [];

    if (aaa.length === 0) {// fail - invalid location
        return airportTimezones
    }

    const airports: Airports[] = await prisma.airports.findMany({
        where: {iata_code: {in: aaa}}
    });

    if (airports.length === 0) {// fail - invalid location
        return airportTimezones
    }

    // load response array with all airports found in table
    airports.map((airport) => {
        airportTimezones.push({
            aaa: airport.iata_code!,  // create first element of response array
            latitude: airport.latitude_deg || undefined,
            longitude: airport.longitude_deg || undefined,
        })
    });

    let timezones: Timezone[] = [];
    const now = new Date();
    let staleDate = calculateStaleDate();

    if (airportTimezones.length > 0) {
        // first look in cache - saves time
        timezones = await prisma.timezone.findMany(
            {
                where: {
                    aaa: {in: airportTimezones.map((airport) => airport.aaa)},
                    last_update: {gte: staleDate}
                }
            });

        // add timezone data to airportTimezones from cache
        timezones.map((timezone) => {
            const index = airportTimezones.findIndex((airport) => airport.aaa === timezone.aaa);
            if (index >= 0) {
                airportTimezones[index].timezone = timezone.timezone!;
                airportTimezones[index].timezone_offset = timezone.offset!;
                airportTimezones[index].timezone_is_dst = timezone.is_dst!;
                airportTimezones[index].current_time = now.toLocaleTimeString('en-US', {timeZone: timezone.timezone!})
                airportTimezones[index].current_date = now.toLocaleDateString('en-US', {timeZone: timezone.timezone!})
            }
        });

        // all valid airports in response
        // all cached timezones in response

        // is anything missing?
        const missing = airportTimezones.filter((airport) => !airport.timezone);

        if (missing.length > 0) {
            var loopIndex = 0;
            // Fetch timezone data for all missing airports
            const timezonePromises = missing.map(async (airport) => {
                const timezone = await getTimezoneData(airport.aaa, airport.longitude, airport.latitude, loopIndex++);

                // Update response with new timezone data
                if (timezone) {
                    const index = airportTimezones.findIndex((item) => item.aaa === airport.aaa);
                    if (index >= 0) {
                        airportTimezones[index].timezone = timezone.timezone;
                        airportTimezones[index].timezone_offset = timezone.timezone_offset;
                        airportTimezones[index].timezone_is_dst = timezone.timezone_is_dst;
                        airportTimezones[index].current_time = now.toLocaleTimeString('en-US', {timeZone: timezone.timezone!})
                        airportTimezones[index].current_date = now.toLocaleDateString('en-US', {timeZone: timezone.timezone!})
                    }
                }
            });

            // Wait for all timezone data to be fetched and response updated
            await Promise.all(timezonePromises);
        }

        return airportTimezones;
    }
}

async function getTimezoneData(aaa: string, lng?: number, lat?: number, loopIndex?: number) {

    let findStr: string;
    let timezone: AirportTimezone;
    let response = {} as AxiosResponse<IpGeoTimezone | AbstractTimezone>;
    let ipGeoData: IpGeoTimezone = {} as IpGeoTimezone;
    let abstractData: AbstractTimezone = {} as AbstractTimezone;

    // use ipgeolocation.io to get timezone data
    // or use abstract api - map the fields to the airportTimezones

    const useIpGeo = (process.env.TIMEZONE_API === 'ipgeolocation');
    const useAbstract = !useIpGeo;
    let url: string;

    if (useIpGeo) {
        if (lng && lat) {
            findStr = `&lat=${lat}&long=${lng}`;
        } else {
            findStr = `&location=${aaa}`;
        }
        url = `https://api.ipgeolocation.io/timezone?apiKey=${process.env.IP_GEOLOCATION_API_KEY}${findStr}`;
    }


    if (useAbstract) {

        findStr = '&location=' + aaa;
        if (lng && lat) {
            findStr = `${lat},${lng}`;
        } else {
            findStr = `&location=${aaa}`;
        }
        url = `https://timezone.abstractapi.com/v1/current_time/?api_key=${process.env.ABSTRACT_API_KEY}&location=${findStr}`;
    }

    // throttle to 1 request per  1.5 second
    // loopIndex multiplies to space out all queries
    // only necessary when using the abstract api

    const delay = (useAbstract ? 1500 * (loopIndex ? loopIndex : 0)! : 0);

    await new Promise(resolve => setTimeout(resolve, delay ))
        .then(async () => {
            try {
                //console.log(loopIndex, '-> running after ', delay/1000, ' seconds');
                response = await Axios({
                    method: 'get',
                    url: url,
                });
            } catch (e) {
                return undefined;
            }
        });

    ////////////////

    if (!response || response.status !== 200) {
        console.log('API error getting timezone data');
        console.log(response.statusText)
        return undefined;
    }

    if (useIpGeo) {
        ipGeoData = response.data as IpGeoTimezone;
    } else {
        abstractData = response.data as AbstractTimezone;
    }

    // map the response fields to the airportTimezones
    if (useIpGeo && ipGeoData) {
        timezone = {
            aaa: aaa,
            timezone: ipGeoData.timezone,
            timezone_offset: ipGeoData.timezone_offset,
            timezone_is_dst: ipGeoData.is_dst,
            current_time: ipGeoData.date_time,
            current_date: ipGeoData.date,
            latitude: lat,
            longitude: lng,
        };
    } else if (useAbstract && abstractData) {
        const recDate = new Date();// "datetime": "2023-11-18 00:26:31"
        const time = recDate.toLocaleTimeString('en-US', {timeZone: abstractData.timezone_location});
        const date = recDate.toLocaleDateString('en-US', {timeZone: abstractData.timezone_location});

        timezone = {
            aaa: aaa,
            timezone: abstractData.timezone_location,
            timezone_offset: abstractData.gmt_offset,
            timezone_is_dst: abstractData.is_dst,
            current_time: time,
            current_date: date,
            latitude: lat,
            longitude: lng,
        };
    }

    // try to save it to the timezone table
    if (aaa && timezone!) {
        await updateTimezoneTable(aaa, timezone);
    }

    return timezone!;
}


async function updateTimezoneTable(aaa: string, timezone: any) {
    // query to see if it already exists
    // if it does, update it
    // if it doesn't, create it

    let record;

    try {
        const data = {
            aaa: aaa.toUpperCase(),
            timezone: timezone.timezone,
            offset: timezone.timezone_offset,
            is_dst: timezone.timezone_is_dst,
            last_update: new Date()
        }

        record = await prisma.timezone.findFirst({
            where: {aaa: aaa}
        });

        if (record) {
            record = await prisma.timezone.update({
                where: {aaa: aaa},
                data: data
            })
        } else {
            record = await prisma.timezone.create({
                data: data
            })
        }

    } catch (e) {
        console.log(e)
        return undefined;
    }
    return record;
}


function calculateStaleDate() {
    let staleDate = new Date();

    // LOGIC to calculate stale date

    // when was last DST change?
    // stale is anything before that date
    // different countries change on different dates

    // all changes seem to occur in March and November
    // but not all countries change in March and November
    // some change in sep, oct, nov
    // some change in mar, apr, may

    staleDate.setDate(staleDate.getDate() - 1); // 24 hours ago
    return staleDate;
}

export default UseTimezones;
