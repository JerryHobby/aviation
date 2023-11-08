import prisma from "@/prisma/client";
import {Project} from ".prisma/client";

export type ProjectMap = {
    [id: string]: Project;
}

const UseProjects = async (title: string = '') => {

    const data = await prisma.project.findMany(
        {
            where: {
                title: {startsWith: title}
            },
            orderBy: {
                date: 'desc'
            }
        }
    );

    if (!data) return null;

    // index content by content title
    const content: ProjectMap = {};
    data.map((item) => {
        content[item.title] = item;
    });

    return content;
};

export default UseProjects;