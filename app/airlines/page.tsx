import React from 'react';
import {Title} from "@/app/components";
import usePages from "@/app/models/UsePages";
import ShowMarkdown from "@/app/components/ShowMarkdown";
import prisma from "@/prisma/client";
import {Table} from '@radix-ui/themes';

const Page = async () => {
    const title = "Major Global Airlines"
    const icon = "airports"
    const pagePrefix = "airlines";
    const data = await usePages(pagePrefix);

    const airlines = await prisma.airline.findMany({
        orderBy: [
            {
                name: 'asc'
            }
        ]
    });

    if(!airlines) {
        return (
            <main>
            <Title title={title} icon={icon}/>
            <div>Something went wrong. Try again later.</div>
        </main>
        )
    }

    return (
        <main>
            <Title title={title} icon={icon}/>
            <div>
                {(data) && data['Airlines 1']
                    && <ShowMarkdown item={data['Airlines 1']}/>}
            </div>

            <Table.Root className='border mb-10'>
                {airlines.map((airline) => (
                    <Table.Row key={airline.id}>
                        <Table.Cell className='font-bold whitespace-nowrap'>
                            <div className="font-semibold text-md">{airline.name} ({airline.iataCode})</div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="font-semibold">{airline.headquarters}</div>
                            <div className="font-semibold">
                                {airline.website &&
                                    <a className='text-blue-500' target='_blank'
                                       href={airline.website}>[www] </a>}
                                {airline.phone && airline.phone}
                            </div>
                            <div className="pt-2">Hubs: {airline.hubs}</div>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Root>
        </main>
    );
};

export default Page;
export const dynamic = "force-dynamic";