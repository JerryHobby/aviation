import prisma from "@/prisma/client";

const UseCategories = async () => {

    return prisma.category.findMany(
        {
            include: {
                article: true
            },
            orderBy: {
                name: 'asc'
            }
        }
    );

};

export default UseCategories;