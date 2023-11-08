import Title from "@/app/components/Title";
import React from "react";
import ShowMarkdown from "@/app/components/ShowMarkdown";
import usePages from "@/app/models/UsePages";
import {Flex} from "@radix-ui/themes";
import Image from "next/image";
import 'app/components/YouTubeEmbed.css'


export default async function Home() {

    const title = "Jerry Hobby's Aviation Tools"
    const icon = "home"
    const pagePrefix = "home"
    const data = await usePages(pagePrefix);

    return (
        <main>
            <Title title={title} icon={icon}/>
            <Flex align='start'  className="flex-wrap">
                <Flex className="flex-wrap max-w-xl">
                {(data) && data['Home 1']
                    && <ShowMarkdown item={data['Home 1']}/>}
                    </Flex>
                    <Image
                        src="/images/aviator.jpg"
                        alt="Jerry Hobby flying a plane" width={300} height={20}
                        className="align-top object-contain h-50 w-300 border mx-16 p-3 rounded-box "/>
            </Flex>
        </main>
    )
}
