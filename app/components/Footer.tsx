'use client'
import React from 'react';

const navBarGradientGray = "bg-gradient-to-b from-0% via-25% to-100% from-gray-100 via-gray-50 to-gray-100";
//const navBarGradientBlue = "bg-gradient-to-b from-0% via-75% to-100% from-blue-100 via-blue-50 to-blue-100";
const navBarDropShadow = " drop-shadow-[0_2px_3px_rgba(0,0,0,0.1)] border border-t-gray-300";

const footerStyle = navBarGradientGray + navBarDropShadow + " flex space-x-6 px-4 py-2 min-w-full text-sm"


const Footer = () => {
    return (
        <>
            <div className={footerStyle}>
                <div className="flex flex-col items-center justify-center">Copyright 2023 - Jerry Hobby</div>
                <div className="flex-grow"/>

                <div className="flex flex-col items-center justify-center">Jerry Hobby - Professional Software
                    Engineer</div>
                <div className="flex-grow"/>

                <div className="flex flex-col items-center justify-center">Built with Next.JS/React</div>
            </div>
        </>
    );
};

export default Footer;