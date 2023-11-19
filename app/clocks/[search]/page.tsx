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

    const title = "World Clocks";
    const icon = "timezone";
    const pagePrefix = "clocks";

    var find = decodeURIComponent(search);
    // todo - add search form to search for timezones
    // collect a list of aaa to build the timezone list
    var aaa: string[];

    if(find) {
        find = find.toUpperCase();
        aaa = find.split(' ');
    }
    else
        aaa = ['IAH', 'SFO', 'LAX'];

    const timezones = await UseTimezones(aaa);
    if(timezones)
        timezones.sort((a, b) => {
            return aaa.indexOf(a.aaa) - aaa.indexOf(b.aaa);
        });

    return (
        <main className='w-full'>
            <Title title={title} icon={icon}/>
            <div className='flex justify-end whitespace-nowrap pb-5'>
            <SearchForm search={find}/>
                </div>
            {
                <Flex className="my-5 flex-wrap gap-x-24 gap-y-10 text-center">
                    {timezones && timezones.map((timezone) => {
                        return (
                            <div key={timezone.aaa} className="">
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
