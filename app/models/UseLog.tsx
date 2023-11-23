import prisma from "@/prisma/client";
import Axios from "axios";

interface Props {
    level: string,
    message: string,
    component: string,
    ip?: string,
    userAgent?: string,
}

export async function PutLog({level, message, component, ip, userAgent}: Props) {

    //const response = await Axios.get('http://localhost:3000/api/ssr');
    const response = await Axios.get('https://api.ipify.org?format=json');
    //let ip: string = response.data.ip;
    //let userAgent: string = response.data.userAgent;

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
