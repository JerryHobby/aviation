import React from 'react';
import {BiHome} from "react-icons/bi";

type MapType = {
    [id: string]: string;
}

const continentColor: MapType = {};

continentColor['AF'] = 'bg-red-100';
continentColor['AN'] = 'bg-purple-100';
continentColor['AS'] = 'bg-yellow-100';
continentColor['EU'] = 'bg-slate-100';
continentColor['NA'] = 'bg-blue-100';
continentColor['OC'] = 'bg-indigo-100';
continentColor['SA'] = 'bg-pink-100';

export default continentColor;