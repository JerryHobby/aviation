import React from 'react';
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

// updates all airport timezones
const Page = async () => {

    const USE_API = false;

    // for each airport
    // get the timezone from the airport's lat/long
    // update the airport's timezone

    // Airports where type = 'large_airport' = 500
    const Airports = await prisma.airports.findMany({
        where: {
            type: 'large_airport'
        },
        orderBy: [
            {
                name: 'asc'
            }
        ]
    });

    Airports.map(async (airport) => {
        let url = USE_API
            && `https://api.ipgeolocation.io/timezone?apiKey=${process.env.IP_GEOLOCATION_API_KEY}&lat=${airport.latitude_deg}&long=${airport.longitude_deg}`
            || `http://127.0.0.1:8000/timezone/tz/?lat=${airport.latitude_deg}&lng=${airport.longitude_deg}`

        const timezone = await Axios({
            method: 'get',
            url: url
        });

        console.log(timezone.data)

    })

    return (
        <div>

        </div>
    );
};

export default Page;