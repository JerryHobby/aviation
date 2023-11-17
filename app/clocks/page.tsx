import {Title} from "@/app/components";
import UseTimezones from "@/app/models/useTimezones";
import React from "react";
import {Flex} from "@radix-ui/themes";
import Clock from "@/app/clocks/clock";
import SearchForm from "@/app/clocks/searchForm";

interface Props {
    search?: string;

}

const Page = async ({search}:Props) => {

    const title = "Timezone Finder";
    const icon = "timezone";
    const pagePrefix = "timezone";

    // todo - add search form to search for timezones
    // collect a list of aaa to build the timezone list
    var aaa;
    if(search)
        aaa = search.split(' ');
    else
        aaa = ['IAH', 'SFO', 'LAX'];

    const timezones = await UseTimezones(aaa);

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
