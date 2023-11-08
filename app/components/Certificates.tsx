'use client';
import React, {Component} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import Image from "next/image";

const certificates = [
    {
        title: 'SoloLearn Certificate - C#',
        image: 'Jerry Hobby SoloLearn Certificate - CSharp.png'
    },
    {
        title: 'SoloLearn Certificate - C',
        image: 'Jerry Hobby SoloLearn Certificate - C.png'
    },
    {
        title: 'SoloLearn Certificate - C++',
        image: 'Jerry Hobby SoloLearn Certificate - CPP.png'
    },
    {
        title: 'SoloLearn Certificate - HTML',
        image: 'Jerry Hobby SoloLearn Certificate - HTML.png'
    },
    {
        title: 'SoloLearn Certificate - Introduction to Java',
        image: 'Jerry Hobby SoloLearn Certificate - Introduction to Java.png'
    },
    {
        title: 'SoloLearn Certificate - Java Intermediate',
        image: 'Jerry Hobby SoloLearn Certificate - Java Intermediate.png'
    },
    {
        title: 'SoloLearn Certificate - Kotlin',
        image: 'Jerry Hobby SoloLearn Certificate - Kotlin.png'
    },
    {
        title: 'SoloLearn Certificate - PHP',
        image: 'Jerry Hobby SoloLearn Certificate - PHP.png'
    },
    {
        title: 'SoloLearn Certificate - Python Core',
        image: 'Jerry Hobby SoloLearn Certificate - Python Core.png'
    },
    {
        title: 'SoloLearn Certificate - Python Data Structures',
        image: 'Jerry Hobby SoloLearn Certificate - Python Data Structures.png'
    },
    {
        title: 'SoloLearn Certificate - Python Intermediate',
        image: 'Jerry Hobby SoloLearn Certificate - Python Intermediate.png'
    },
    {
        title: 'SoloLearn Certificate - Python for Beginners',
        image: 'Jerry Hobby SoloLearn Certificate - Python for Beginners.png'
    },
    {
        title: 'SoloLearn Certificate - SQL',
        image: 'Jerry Hobby SoloLearn Certificate - SQL.png'
    },
    {
        title: 'Coding With Mosh - NextJS With Typescript',
        image: 'certificate-of-completion-for-mastering-next-js-13-with-typescript.png'
    },
    {
        title: 'Coding With Mosh - Ultimate Java Fundamentals',
        image: 'certificate-of-completion-for-ultimate-java-part-1-fundamentals.png'
    },
    {
        title: 'Coding With Mosh - Ultimate Java Object Oriented Programming',
        image: 'certificate-of-completion-for-ultimate-java-part-2-object-oriented-programming.png'
    },
    {
        title: 'Coding With Mosh - Unit Testing for C Developers',
        image: 'certificate-of-completion-for-unit-testing-for-c-developers.png'
    },
    {
        title: 'Coding With Mosh - Develop Issue Tracker App with NextJS',
        image: 'next-js-projects-build-an-issue-tracker.png'
    }
];

export default class Certificates extends Component {
    render() {
        return (
            <Carousel
                width='500'
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
            >
                {certificates.map((certificate) => {
                        return (
                            <div key={certificate.title}>
                                <Image
                                    alt={certificate.title}
                                    src={`/certificates/${certificate.image}`}
                                    width={500} height={350}
                                />
                                {/*<p className="legend">{certificate.title}</p>*/}
                            </div>
                        )
                    }
                )}
            </Carousel>
        );
    }
}


//ReactDOM.render(<Certificates/>, document.querySelector('.demo-carousel'));

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>