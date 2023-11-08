import React from 'react';
import {Title} from "@/app/components";
import SearchForm from "@/app/airports/searchForm";
import usePages from "@/app/models/UsePages";
import ShowMarkdown from "@/app/components/ShowMarkdown";

const Page = async () => {
    const title = "Search Airports"
    const icon = "airplane"
    const pagePrefix = "airports";
    const data = await usePages(pagePrefix);

    return (
        <>
            <Title title={title} icon={icon}/>

            <div className='flex justify-between'>

                <div>
                    {(data) && data['Airports 1']
                        && <ShowMarkdown item={data['Airports 1']}/>}
                </div>
                <div className='flex  whitespace-nowrap pl-5'>
                    <SearchForm/>
                </div>
            </div>
        </>
    );
};

export default Page;
export const dynamic="force-dynamic";