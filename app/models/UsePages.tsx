import prisma from "@/prisma/client";
import {Page} from ".prisma/client";

export type PageMap = {
    [id: string]: Page;
}

const UsePages = async (title: string) => {
    const data = await prisma.page.findMany({
        where: {
            title: {
                startsWith: title
            }
        }
    });

    if (!data) return null;

    // index content by content title
    const content: PageMap = {};
    data.map((item) => {
        content[item.title] = item;
    });

    return content;
};

export default UsePages;