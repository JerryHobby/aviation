import prisma from "@/prisma/client";

const UseActiveCategories = async () => {

    return prisma.category.findMany(
        {
            where: {
                article: {
                    some: {
                        categoryId: {gt: 0}
                    }
                }
            },
            include: {
                article: true
            },
            orderBy: {
                name: 'asc'
            }
        }
    );
};

export default UseActiveCategories;