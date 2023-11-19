import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {Title} from "@/app/components";
import ShowMarkdown from "../../components/ShowMarkdown";
import SearchForm from "@/app/airports/searchForm";
import usePages from "@/app/models/UsePages";
import {Flex} from "@radix-ui/themes";

const AirportSkeleton = async () => {
    const title = "Airports"
    const icon = "airports"
    const pagePrefix = "AirportSearch";
    const data = await usePages(pagePrefix);

    return (
        <main>
            <Title title={title} icon={icon}/>
            <div className='flex justify-between'>
                <div>
                    {(data) && data['AirportSearch 1']
                        && <ShowMarkdown item={data['AirportSearch 1']}/>}
                </div>
                <div className='flex  whitespace-nowrap pl-5'>
                    <SearchForm/>
                </div>
            </div>

            <Skeleton count={1} height={50} className='mb-2'/>
            <Skeleton count={6} inline={true} className='mb-1' height={70}/>

        </main>
    );
};

export default AirportSkeleton;