// query categories
// query articles
// build navigation menu for categories
// build navigation menu for articles
// return object with categories and articles

import prisma from "@/prisma/client";

interface Props {
    id: number
}

const UseArticle = async ({id}: Props) => {
    return prisma.article.findUnique({
        where: {
            id: id
        },
        include: {
            Category: true
        }
    });
};

export default UseArticle;
