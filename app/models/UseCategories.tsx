import prisma from "@/prisma/client";

const UseCategories = async () => {

    const categories = await prisma.category.findMany(
        {
            include: {
                articles: true
            },
            orderBy: {
                name: 'asc'
            }
        }
    );

    return categories
};

export default UseCategories;