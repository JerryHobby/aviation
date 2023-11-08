import prisma from "@/prisma/client";

const UseActiveCategories = async () => {

    return prisma.category.findMany(
        {
            where: {
                articles: {
                    some: {
                        categoryId: {gt: 0}
                    }
                }
            },
            include: {
                articles: true
            },
            orderBy: {
                name: 'asc'
            }
        }
    );
};

export default UseActiveCategories;