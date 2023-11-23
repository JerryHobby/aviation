import React from 'react';
import Image from "next/image";
import Title from "@/app/components/Title";
import usePages from "@/app/models/UsePages";
import ShowMarkdown from "@/app/components/ShowMarkdown";
import {Page} from ".prisma/client";
import FlexibleFrame from "@/app/components/FlexibleFrame";
import {Log} from "@/app/components";

const Contact = async () => {

    const title = "Contact Jerry"
    const icon = "contact"
    const pagePrefix = "contact"

    const data = await usePages(pagePrefix);

    function getCard(content?: Page) {
        if (!content?.text) return (<>No data</>);
        return (<ShowMarkdown item={content}/>);
    }

    return (
        <main>
            <Title title={title} icon={icon}/>
            <div className='flex flex-col sm:flex-row gap-5 justify-center'>
                <FlexibleFrame
                    className='border shadow rounded flex flex-col sm:flex-row gap-5 justify-center bg-gray-50'>
                    <Image
                        src="/images/jerry_hobby_headshot.png"
                        alt="Jerry Hobby" width={150} height={100}
                        className="align-top object-contain h-150 w-250 rounded-box "/>

                    {data && getCard(data['Contact 1'])}
                </FlexibleFrame>
            </div>
            <Log
                component='Contact'
                level='INFO'
                message='Page Loaded'/>
        </main>
    )
};

export default Contact;
export const dynamic = "force-dynamic";