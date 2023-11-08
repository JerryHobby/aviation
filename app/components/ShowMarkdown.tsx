'use client';
import React from 'react';
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import {Page} from ".prisma/client";

interface Props {
    item?: Page | null,
    index?: number
}

const ShowMarkdown = ({item = null, index = 0}: Props) => {
    if (!item?.text) return (<>No data</>);
    return (
        <ReactMarkdown className='reactMarkDown' key={index} remarkPlugins={[gfm]}>
            {item.text}
        </ReactMarkdown>
    );
};

export default ShowMarkdown;