import {Title} from "@/app/components";
import UseTimezones from "@/app/models/useTimezones";
import React from "react";
import {Flex} from "@radix-ui/themes";

const Page = async () => {
    const title = "Timezone Finder";
    const icon = "timezone";
    const pagePrefix = "timezone";

    // todo - add search form to search for timezones
    // collect a list of aaa to build the timezone list

    const aaa = ['IAH', 'SFO', 'LAX', 'JFK', 'ORD', 'DFW', 'SNA', 'DXB', 'HNL'];
    const timezones = await UseTimezones(aaa);
    console.log(timezones);

    return (
        <main>
            <Title title={title} icon={icon}/>
            {
                <Flex align='start' className="flex-wrap gap-2">
                    {timezones && timezones.map((timezone) => {
                        return (
                            <div key={timezone.aaa} className="w-1/4 border rounded">
                                <h2>{timezone.aaa}</h2>
                                <p>timezone: {timezone.timezone}</p>
                                <p>{timezone.current_date} - {timezone.current_time}</p>
                            </div>
                        )
                    })}
                </Flex>
            }
        </main>
    );
};

export default Page;
