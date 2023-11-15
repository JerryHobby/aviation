import prisma from "@/prisma/client";

const UseActiveCategories = async () => {

    return prisma.category.findMany(
        {
            where: {
                Article: {
                    some: {
                        categoryId: {gt: 0}
                    }
                }
            },
            include: {
                Article: true
            },
            orderBy: {
                name: 'asc'
            }
        }
    );
};

export default UseActiveCategories;