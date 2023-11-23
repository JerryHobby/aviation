import React from "react";
import ShowMarkdown from "@/app/components/ShowMarkdown";
import usePages from "@/app/models/UsePages";
import {Flex} from "@radix-ui/themes";
import Image from "next/image";
import {PutLog} from "@/app/models/UseLog";
import User from "@/app/user/page";

export default async function Home() {

    //const title = "Jerry's Aviation"
    //const icon = "home"
    const pagePrefix = "home"
    const data = await usePages(pagePrefix);
    await PutLog({level: "INFO", message: "Page Loaded", component: "Home"});
    return (
        <main>
            <Image className='rounded-lg w-full object-contain mb-20 shadow-xl' src='/images/globebanner.png'
                   alt='global banner' width={1000} height={200}/>
            <Flex align='start' className="flex-wrap">
                <Flex className="flex-wrap max-w-xl">
                    {(data) && data['Home 1']
                        && <ShowMarkdown item={data['Home 1']}/>}
                </Flex>
                <Image
                    src="/images/aviator.jpg"
                    alt="Jerry Hobby flying a plane" width={300} height={20}
                    className="align-top object-contain h-50 w-300 border mx-16 p-3 rounded-box "/>
            </Flex>

            <User />
        </main>
    )
}
export const dynamic = "force-dynamic";