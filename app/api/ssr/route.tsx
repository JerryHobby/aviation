import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";

function getUserData(req: NextRequest) {
    let ip = req.headers.get('x-real-ip') as string;
    let userAgent = req.headers.get('user-agent') as string

    const forwardedFor = req.headers.get('x-forwarded-for') as string
    if (!ip && forwardedFor) {
        ip = forwardedFor?.split(",").at(0) ?? "Unknown";
    }

    if (!ip) ip = 'Unknown'
    if (ip === '::1') ip = 'localhost'
    if (!userAgent) userAgent = 'Unknown'

    return {ip, userAgent};
}

async function logEntry(data: any) {
    prisma.log.create({
        data: {
            ip: data.ip,
            userAgent: data.userAgent,
            level: data.level,
            message: data.message,
            component: data.component,
        }
    });
}

async function handler(req: NextRequest, res: NextResponse) {
    const {method} = req;

    let {ip, userAgent} = getUserData(req);

    if (method === "GET") {
        return NextResponse.json({
            ip: ip,
            userAgent: userAgent,
        }, {status: 200});
    }

    if (method === "POST") {
        const body = await req.json();

        const data = {
            ip: ip,
            userAgent: userAgent,
            level: body.level,
            message: body.message,
            component: body.component,
        }
        await logEntry(data);
        return NextResponse.json({body: data}, {status: 200});
    }
}

export {handler as GET, handler as POST}
