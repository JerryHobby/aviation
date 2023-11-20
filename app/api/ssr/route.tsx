import type { NextApiRequest, NextApiResponse } from 'next'
import {NextResponse} from "next/server";

type Data = {
    ip: string,
    userAgent: string
}
export async function GET(req: NextApiRequest) {
    let ip = req.headers['x-real-ip'] as string;
    let userAgent = req.headers['user-agent'] as string
    console.log('ip: ', ip)

    const forwardedFor = req.headers['x-forwarded-for'] as string
    // if(!ip && forwardedFor){
    //     ip = forwardedFor?.split(",").at(0) ?? "Unknown";
    // }

    if(!ip) ip = 'Unknown'
    if(!userAgent) userAgent = 'Unknown'

    return NextResponse.json(
        {
            ip: ip,
            userAgent: userAgent,
            header: req.headers,
        }, {status: 200});
}
