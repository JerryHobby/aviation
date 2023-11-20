import {NextRequest, NextResponse} from "next/server";

type Data = {
    ip: string,
    userAgent: string
}

export function POST(req: NextRequest,  {params}: { params: { logLevel: string, log: string  } }) {
    let ip = req.headers.get('x-real-ip') as string;
    let userAgent = req.headers.get('user-agent') as string

    console.log('ip: ', ip)

    const forwardedFor = req.headers.get('x-forwarded-for') as string
    if(!ip && forwardedFor){
        ip = forwardedFor?.split(",").at(0) ?? "Unknown";
    }

    if(!ip) ip = 'Unknown'
    if(ip === '::1') ip = 'localhost'
    if(!userAgent) userAgent = 'Unknown'

    return NextResponse.json(
        {
            ip: ip,
            userAgent: userAgent,
            logLevel: params.logLevel,
            log: params.log,
        }, {status: 200});
}
