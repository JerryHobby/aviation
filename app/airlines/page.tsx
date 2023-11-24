import React from 'react';
import {Log, ShowMarkdown, Title} from "@/app/components";
import usePages from "@/app/models/UsePages";
import prisma from "@/prisma/client";
import {Table} from '@radix-ui/themes';
import Image from "next/image";

const Page = async () => {
    const title = "Major Global Airlines"
    const icon = "airports"
    const pagePrefix = "airlines";
    const data = await usePages(pagePrefix);

    const airlines = await prisma.airlines.findMany({
        orderBy: [
            {
                name: 'asc'
            }
        ]
    });

    if (!airlines) {
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

            <Table.Root className='border rounded shadow  mb-10'>
                {airlines.map((airline) => (
                    <Table.Row key={airline.id}
                        // className={continentColor[airline!.continent!]}
                    >
                        <Table.Cell className='font-bold w-[250px]'>
                            {airline.logo
                                ? <div>
                                    {airline.website
                                        && <a className='text-blue-500' target='_blank' href={airline.website}>
                                            <Image className='float-left mr-3 w-[150px] h-auto'
                                                   src={'/images/airlines/' + airline.logo}
                                                   alt={airline.name} width={150} height={50}/>
                                        </a>
                                        || <Image className='float-left mr-3 w-[150px] h-auto'
                                                  src={'/images/airlines/' + airline.logo}
                                                  alt={airline.name} width={150} height={50}/>
                                    }
                                    <div className="font-semibold text-md">({airline.iata_code})</div>
                                </div>
                                : <div className="font-semibold text-md">
                                    {airline.name} ({airline.iata_code})
                                </div>
                            }
                        </Table.Cell>
                        <Table.Cell>
                            <div className="font-semibold whitespace-nowrap">{airline.name}</div>
                            <div className="font-semibold whitespace-nowrap">{airline.headquarters}</div>
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
            <Log
                component={title}
                level='INFO'
                message='Page Loaded'/>
        </main>

    );
};

export default Page;
export const dynamic = "force-dynamic";