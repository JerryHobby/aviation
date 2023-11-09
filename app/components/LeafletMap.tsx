'use client'
import type { MapOptions } from 'leaflet'
import type { FC, ReactNode } from 'react'
import {MapContainer, TileLayer, Popup} from "react-leaflet";
//import L, {Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
//import {useEffect} from "react";

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
//     iconUrl: require('leaflet/dist/images/marker-icon.png').default,
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
// });



const LeafletMap: FC<
    {
        center: [number, number]
        children: ReactNode
        zoom: number
    } & MapOptions
> = ({ children, ...options }) => {

    const position: [number, number] = [48.2082, 16.3738];
    var marker;

    // useEffect(() => {
    //      marker = new Marker([48.2002, 16.3708]).addTo(L.map('map'));
    // });

    return (
        <>
        <MapContainer
            className="border-gray-500 border h-[500px] w-full relative"
            maxZoom={18}
            {...options}
        >
                {/*<Popup>*/}
                {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
                {/*</Popup>*/}
                {/*<Popup>*/}
                {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
                {/*</Popup>*/}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {children}
        </MapContainer></>
    )
}

export default LeafletMap