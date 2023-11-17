import {Title} from "@/app/components";
import UseTimezones from "@/app/models/useTimezones";
import React from "react";
import {Flex} from "@radix-ui/themes";
import Clock from "@/app/clocks/clock";
import SearchForm from "@/app/clocks/searchForm";

interface Props {
    params: {
        search: string
    }
}

const Page = async  ({params: {search}}: Props)  => {

    const title = "Timezone Finder";
    const icon = "timezone";
    const pagePrefix = "timezone";

    var find = decodeURIComponent(search);
    // todo - add search form to search for timezones
    // collect a list of aaa to build the timezone list
    var aaa: string[];

    if(find)
        aaa = find.split(' ');
    else
        aaa = ['IAH', 'SFO', 'LAX'];

    const timezones = await UseTimezones(aaa);

    if(timezones)
        timezones.sort((a, b) => {
            return aaa.indexOf(a.aaa) - aaa.indexOf(b.aaa);
        });

    return (
        <main className='w-full'>
            <SearchForm/>
            <Title title={title} icon={icon}/>
            {
                <Flex className="flex-wrap gap-10 items-end">
                    {timezones && timezones.map((timezone) => {
                        return (
                            <div key={timezone.aaa} className="flex justify-center">
                                <Clock location={timezone.aaa} timezone={timezone.timezone}/>
                            </div>
                        )
                    })}
                </Flex>
            }
        </main>
    );
};

export default Page;
