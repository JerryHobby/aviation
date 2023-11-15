import prisma from "@/prisma/client";

const UseCategories = async () => {

    return  prisma.category.findMany(
        {
            include: {
                Article: true
            },
            orderBy: {
                name: 'asc'
            }
        }
    );

};

export default UseCategories;