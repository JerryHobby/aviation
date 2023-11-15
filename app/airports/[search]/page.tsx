import React from 'react';
import prisma from "@/prisma/client";
import {Table} from "@radix-ui/themes";
import {Title} from "@/app/components";
import SearchForm from "@/app/airports/searchForm";
import {forEach} from "lodash";
import usePages from "@/app/models/UsePages";
import ShowMarkdown from "@/app/components/ShowMarkdown";

interface Props {
    params: {
        search: string
    }
}

interface AirportColors {
    [index: string]: string;
}

const airportColor: AirportColors = {
    'large_airport': 'text-blue-500 text-lg',
    'medium_airport': 'text-green-500 text-md',
    'small_airport': 'text-yellow-500 text-sm',
    'closed': 'text-red-500 text-sm',
    'heliport': 'text-purple-500 text-sm',
    'seaplane_base': 'text-pink-500 text-sm',
    'balloonport': 'text-indigo-500 text-sm',
};

const Page = async ({params: {search}}: Props) => {
    const title = "Airports"
    const icon = "airports"
    const pagePrefix = "AirportSearch";
    const data = await usePages(pagePrefix);

    const find = decodeURIComponent(search);
    const airports = await prisma.airports.findMany({
        include: {
            Regions: {select: {name: true}},
            Countries: {select: {name: true}},
        },
        where: {
            type: {
                not: 'small_airport' || 'closed' || 'heliport' || 'seaplane_base' || 'balloonport'
            },
            iata_code: {not: null},
            AND: {
                OR: [
                    {name: {contains: find}},
                    {municipality: {contains: find}},
                    {iata_code: {contains: find}},
                    {local_code: {contains: find}},
                    {iso_country: {contains: find}},
                    {ident: {contains: find}},
                    {keywords: {contains: find}},
                    {Regions: {name: {contains: find}}},
                    {Countries: {name: {contains: find}}},
                ]
            }
        },

        orderBy: {
            iata_code: 'asc'
        },

        take: 100
    });


    function calculateScore(airport: any) {
        // weighted score --
        let score = 0;

        forEach(airport, (field: any) => {
            if (field && typeof field === 'object') {
                forEach(field, (subfield: any) => {
                    if (subfield && typeof subfield === 'string') {
                        if (subfield.toUpperCase() === find.toUpperCase()) {
                            score += 100;
                        } else if (subfield.toUpperCase().includes(find.toUpperCase())) {
                            score += 10;
                        }
                    }
                });
            }

            if (field && typeof field === 'string') {
                if (field.toUpperCase() === find.toUpperCase()) {
                    score += 100;
                } else if (field.toUpperCase().includes(find.toUpperCase())) {
                    score += 10;
                }
            }
        });

        if (score && airport.type === 'large_airport') {
            score = 400;
        } else if (score && airport.type === 'medium_airport') {
            score += 200;
        }
        return score;
    }

    airports.sort((a, b) => {
        const scoreA = calculateScore(a);
        const scoreB = calculateScore(b);

        if (scoreB < scoreA) {
            return -1;
        } else if (scoreB > scoreA) {
            return 1;
        }

        return a.iata_code! < b.iata_code! ? -1 : a.iata_code! > b.iata_code! ? 1 : 0;
    });

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
            <Table.Root className=' border rounded mt-3 mb-10 max-w-full'>
                <Table.Header className='bg-gray-100'>
                    <Table.Row>
                        <Table.Cell className='font-bold'>IATA</Table.Cell>
                        <Table.Cell className='font-bold'>Name</Table.Cell>
                        <Table.Cell className='font-bold'>Location</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {airports.slice(0, 10).map((airport) => (
                        <Table.Row key={airport.id} >
                            <Table.Cell>
                                {airport.wikipedia_link ? (
                                    <a className='underline' href={airport.wikipedia_link} target='_blank' rel='noreferrer'>
                                        <div className={`font-bold ${airportColor[airport.type!]}`}>{airport.iata_code}</div>
                                    </a>
                                ) : (
                                    <div className={`font-bold ${airportColor[airport.type!]}`}>{airport.iata_code}</div>
                                )}
                            </Table.Cell>
                            <Table.Cell>
                                <div className='font-bold '>{airport.name}</div>
                                <div className='textarea-xs p-0 m-0 '>{airport.keywords}</div>
                            </Table.Cell>
                            <Table.Cell>
                                <div>{airport.municipality + ", " + airport.Regions?.name}</div>
                                <div className='textarea-xs p-0 m-0 '>{airport.Countries.name}</div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </main>
    );
};

export default Page;