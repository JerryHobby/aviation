import React from 'react';
import {Title} from "@/app/components";
import usePages from "@/app/models/UsePages";
import ShowMarkdown from "@/app/components/ShowMarkdown";
import prisma from "@/prisma/client";
import { Table } from '@radix-ui/themes';

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
                            {airline.name} ({airline.iataCode})
                        </Table.Cell>
                        <Table.Cell>
                            <div className="font-semibold">{airline.headquarters}</div>
                            <span className="font-semibold">Hubs:</span> {airline.hubs}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Root>
        </main>
    );
};

export default Page;
export const dynamic="force-dynamic";