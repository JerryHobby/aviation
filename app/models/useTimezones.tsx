import prisma from "@/prisma/client";
import Axios from "axios";

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

export interface aaaTimezone {
    aaa: string,
    timezone?: string,
    timezone_offset?: number,
    timezone_is_dst?: boolean,
    timezone_dst_savings?: number,
    longitude?: number,
    latitude?: number,
    current_time?: string,
    current_date?: string,
}

const UseTimezones = async (aaa: string[]) => {

    const response: aaaTimezone[] = [];

    if (aaa.length === 0) {// fail - invalid location
        return response
    }

    const airports = await prisma.airports.findMany({
        where: {iata_code: {in: aaa}}
    });

    if (airports.length === 0) {// fail - invalid location
        return response
    }

    // load response array with all airports found in table
    airports.map((airport) => {
        response.push({
            aaa: airport.iata_code!,
            latitude: airport.latitude_deg!,
            longitude: airport.longitude_deg!
        })
    });

    let timezones;
    const now = new Date();
    let staleDate = new Date();
    staleDate.setDate(staleDate.getDate() - 1); // 24 hours ago

    if (response.length > 0) {
        // first look in cache - saves time
        timezones = await prisma.timezone.findMany(
            {
                where: {
                    aaa: {in: response.map((airport) => airport.aaa)},
                    last_update: {gte: staleDate}
                }
            });

        // add timezone data to response from cache
        timezones.map((timezone) => {
            const index = response.findIndex((airport) => airport.aaa === timezone.aaa);
            if (index >= 0) {
                response[index].timezone = timezone.timezone!;
                response[index].timezone_offset = timezone.offset!;
                response[index].timezone_is_dst = timezone.is_dst!;
                response[index].timezone_dst_savings = timezone.dst_savings!;
                response[index].current_time = now.toLocaleTimeString('en-US', {timeZone: timezone.timezone!})
                response[index].current_date = now.toLocaleDateString('en-US', {timeZone: timezone.timezone!})
            }
        });

        // all valid airports in response
        // all cached timezones in response

        // is anything missing?

        // ...

// is anything missing?
        const missing = response.filter((airport) => !airport.timezone);

        if (missing.length > 0) {
            // Fetch timezone data for all missing airports
            const timezonePromises = missing.map(async (airport) => {
                const timezone = await getTimezoneData(airport.aaa, airport.longitude, airport.latitude);

                // Update response with new timezone data
                if (timezone) {
                    const index = response.findIndex((item) => item.aaa === airport.aaa);
                    if (index >= 0) {
                        response[index].timezone = timezone.data.timezone;
                        response[index].timezone_offset = timezone.data.timezone_offset;
                        response[index].timezone_is_dst = timezone.data.is_dst;
                        response[index].timezone_dst_savings = timezone.data.dst_savings;
                        response[index].current_time = now.toLocaleTimeString('en-US', {timeZone: timezone.data.timezone!})
                        response[index].current_date = now.toLocaleDateString('en-US', {timeZone: timezone.data.timezone!})

                    }
                }
            });

            // Wait for all timezone data to be fetched and response updated
            await Promise.all(timezonePromises);
        }

        return response;
    }

    async function getTimezoneData(aaa: string, lng?: number, lat?: number) {

        let findStr;
        let timezone;

        if (lng && lat) {
            findStr = `&lat=${lat}&long=${lng}`;
        } else {
            return undefined;
        }

        let url =
            `https://api.ipgeolocation.io/timezone?apiKey=${process.env.IP_GEOLOCATION_API_KEY}${findStr}`;
        try {
            timezone = await Axios({
                method: 'get',
                url: url
            });
        } catch (e) {
            return undefined;
        }

        // try to save it to the timezone table
        aaa && timezone && await updateTimezoneTable(aaa, timezone);

        return timezone;
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
                        last_update: timezone.data.last_update,
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
        } catch (e) {
            console.log(e)
            return undefined;
        }
        return record;
    }
}


export default UseTimezones;
