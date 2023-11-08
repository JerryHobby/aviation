import React from 'react';
import Title from "@/app/components/Title";
import usePages from "@/app/models/UsePages";
import ShowMarkdown from "@/app/components/ShowMarkdown";
import {Page} from ".prisma/client";
import {Card} from "@radix-ui/themes";

const Contact = async () => {

    const title = "Contact Jerry"
    const icon = "contact"
    const pagePrefix = "contact"

    const data = await usePages(pagePrefix);

    function getCard(content?: Page) {
        if (!content?.text) return (<>No data</>);
        return ( <ShowMarkdown item={content}/>);
    }

    const cardStyle = 'prose w-96 mt-5 p-5 bg-gray-100 rounded-md'

    return (
        <main>
            <Title title={title} icon={icon}/>

            <Card className={cardStyle}>
                {data && getCard(data['Contact 1'])}
            </Card>
        </main>
    )
};

export default Contact;
export const dynamic="force-dynamic";