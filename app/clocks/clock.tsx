'use client'
import React, {useState} from 'react';
import {Card} from "@radix-ui/themes";

interface Props {
    location: string,
    timezone: string | undefined
}

const Clock = ({location, timezone}:Props) => {

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US',
        {timeZone: timezone}));
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('en-US',
        {timeZone: timezone}));

    setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString('en-US',
            {timeZone: timezone}));
        setCurrentDate(new Date().toLocaleDateString('en-US',
            {timeZone: timezone}));
    });

    return (
        <div className='py-5 drop-shadow-md whitespace-nowrap bg-sky-100 w-[200px] border border-blue-700 rounded-2xl'>
            <div className='text-center border border-b-blue-700 mb-5 px-5'>
                <h1 className='justify-center'>{location}</h1>
            </div>
            <div className='text-center'>
                <h3>{currentDate}</h3>
                <h2 className='mt-3 text-blue-500'>{currentTime}</h2>
            </div>

        </div>
    );
};

export default Clock;