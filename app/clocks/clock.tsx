'use client'
import React, {useState} from 'react';

interface Props {
    location: string,
    timezone: string | undefined
}

const Clock = ({location, timezone}: Props) => {

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
        <div
            className=' bg-gradient-to-br from-cyan-600 to-blue-800 align-middle py-5 shadow-lg shadow-gray-400 shadow-inner-xl drop-shadow-blue-500 whitespace-nowrap border-1 w-[200px] h-[200px] border border-indigo-700 rounded-full'>
            <div className='text-center pt-2'>
                <h1 className='text-3xl text-cyan-300 justify-center'>{location}</h1>
            </div>
            <div className='text-center'>
                <h1 className='text-3xl text-white py-1.5 font-bold'>{currentTime}</h1>
                <p className='text-cyan-300 text-lg font-semibold'>{currentDate}</p>

            </div>

        </div>
    );
};

export default Clock;