'use client'
import React from 'react';

const navBarGradientGray = "bg-gradient-to-b from-0% via-25% to-100% from-indigo-100 via-indigo-50 to-indigo-100";
const navBarDropShadow = " drop-shadow-[0_2px_3px_rgba(0,0,0,0.1)] border border-t-gray-300";

const footerStyle = navBarGradientGray + navBarDropShadow + " flex space-x-6 px-4 py-2 min-w-full text-sm"


const Footer = () => {
    return (
        <>
            <div className={footerStyle}>
                <div className="flex flex-col items-center justify-center">Copyright 2023</div>
                <div className="flex-grow"/>

                <div className="flex flex-col items-center justify-center">Jerry Hobby - Software
                    Engineer</div>
                <div className="flex-grow"/>

                <div className="flex flex-col items-center justify-center">
                    <a href='https://JerryHobby.com' target='_blank'>JerryHobby.com</a>

                </div>
            </div>
        </>
    );
};

export default Footer;