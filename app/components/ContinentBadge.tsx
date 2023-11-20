import React from 'react';

interface continent {
    shortName: string,
    longName: string,
    color: string
}

type Continent = {
    [id: string]: continent;
}

const continentPrefs: Continent = {};

continentPrefs['AF'] = {shortName: 'AF', longName: 'Africa', color: 'bg-red-100  border-red-500'};
continentPrefs['AN'] = {shortName: 'AN', longName: 'Antarctica', color: 'bg-purple-100  border-purple-500'};
continentPrefs['AS'] = {shortName: 'AS', longName: 'Asia', color: 'bg-yellow-100  border-yellow-500'};
continentPrefs['EU'] = {shortName: 'EU', longName: 'Europe', color: 'bg-slate-100  border-slate-500'};
continentPrefs['NA'] = {shortName: 'NA', longName: 'North America', color: 'bg-blue-100  border-blue-500'};
continentPrefs['OC'] = {shortName: 'OC', longName: 'Oceania', color: 'bg-indigo-100  border-indigo-500'};
continentPrefs['SA'] = {shortName: 'SA', longName: 'South America', color: 'bg-pink-100  border-pink-500'};

interface Props {
    continent: string
}

const ContinentBadge = ({continent}: Props) => {
    return (
        <span className={'flex-min border border-thick rounded py-0 px-1 mx-1 ' + continentPrefs[continent].color}>
            {continentPrefs[continent].longName}
        </span>
    );
};

export default ContinentBadge;
