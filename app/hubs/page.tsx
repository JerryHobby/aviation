import React from 'react';
import {Title} from "@/app/components";
import usePages from "@/app/models/UsePages";
import ShowMarkdown from "@/app/components/ShowMarkdown";

const Page = async () => {
    const title = "US Airline Hubs"
    const icon = "airports"
    const pagePrefix = "hubs";
    const data = await usePages(pagePrefix);

    return (
        <main>
            <Title title={title} icon={icon}/>
                <div>
                    {(data) && data['Hubs 1']
                        && <ShowMarkdown item={data['Hubs 1']}/>}
                </div>
        </main>
    );
};

export default Page;
export const dynamic="force-dynamic";