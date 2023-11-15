// query categories
// query articles
// build navigation menu for categories
// build navigation menu for articles
// return object with categories and articles

import prisma from "@/prisma/client";

export const UseArticles = async () => {
    return prisma.article.findMany(
        {
            include: {
                Category: true,
            },
            orderBy: {
                date: 'desc'
            }
        });
};

export default UseArticles;
