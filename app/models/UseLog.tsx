import prisma from "@/prisma/client";
import Axios from "axios";

interface Log {
    component?: string,
    level?: string,
    message?: string,
    ip?: string,
    userAgent?: string,
}

interface Props {
    level: string,
    message: string,
    component: string,
}

export async function PutLog({level, message, component}: Props) {

    const response = await Axios.get('http://localhost:3000/api/ssr');
    //const response = await Axios.get('https://api.ipify.org?format=json');
    let ip:string = response.data.ip;
    let userAgent:string = response.data.userAgent;

    console.log("PutLog: ", level, message, component, ip, userAgent);
    await prisma.log.create({
        data: {
            component: component,
            level: level!,
            message: message!,
            ip: ip,
            userAgent: userAgent,
        }
    });
}
