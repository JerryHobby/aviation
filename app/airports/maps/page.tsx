import React from 'react';
import {Title} from "@/app/components";
import SearchForm from "@/app/airports/searchForm";
import usePages from "@/app/models/UsePages";
import ShowMarkdown from "@/app/components/ShowMarkdown";
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(() => import('@/app/components/LeafletMap'), { ssr: false })

// todo - implement regional maps with nearby airports - range 300 miles?

const center: [number, number] = [48.2082, 16.3738]
const markers: [number, number][] = [center, [48.2, 16.37], [48.1987, 16.3685]]

import { icon } from 'leaflet'
import {Marker} from "react-leaflet";

// Marker.prototype.options.icon = icon({
//     iconUrl: '/static/leaflet/map-marker.svg',
//     iconRetinaUrl: '/static/leaflet/map-marker.svg',
//     iconSize: [24, 24],
//     iconAnchor: [12, 24],
//     shadowUrl: '/static/leaflet/marker-shadow.png',
//     shadowRetinaUrl: '/static/leaflet/marker-shadow.png',
//     shadowSize: [41, 41],
//     shadowAnchor: [12, 41],
// })

const Page = async () => {
    const title = "Maps of Airports"
    const icon = "airports"
    const pagePrefix = "airports";
    const data = await usePages(pagePrefix);

    return (
        <main>
            <Title title={title} icon={icon}/>

            <div className='w-full pb-2 text-right whitespace-nowrap pl-5'>
                <SearchForm/>
            </div>

            <div className='flex justify-between'>
                <div className='max-w-md pr-5'>
                    {(data) && data['Airports 1']
                        && <ShowMarkdown item={data['Airports 1']}/>}
                </div>

                {/*<LeafletMap center={center} zoom={13}>*/}

                {/*        {markers.map((position, index) => (*/}
                {/*            <Marker key={index} position={position} />*/}
                {/*        ))}*/}

                {/*</LeafletMap>*/}

            </div>
        </main>
    );
};

export default Page;
