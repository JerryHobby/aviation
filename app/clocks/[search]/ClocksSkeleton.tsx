import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {Title} from "@/app/components";
import SearchForm from "@/app/airports/searchForm";

const AirportSkeleton = async () => {

    const title = "World Clocks";
    const icon = "timezone";

    return (
        <main>
            <Title title={title} icon={icon}/>
            <div className='flex justify-end whitespace-nowrap pb-5'>
                <div className='flex justify-between'>
                    <div className='flex  whitespace-nowrap pl-5'>
                        <SearchForm/>
                    </div>
                </div>
            </div>

            <Skeleton count={4} className="flex-wrap mx-8 my-10 text-center" borderRadius='100%' inline={true}
                      width={200} height={200}/>

        </main>
    );
};

export default AirportSkeleton;