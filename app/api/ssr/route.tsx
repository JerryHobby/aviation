import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    let ip = req.headers.get('x-real-ip') as string;
    let userAgent = req.headers.get('user-agent') as string

    const forwardedFor = req.headers.get('x-forwarded-for') as string
    if (!ip && forwardedFor) {
        ip = forwardedFor?.split(",").at(0) ?? "Unknown";
    }

    if (!ip) ip = 'Unknown'
    if (ip === '::1') ip = 'localhost'
    if (!userAgent) userAgent = 'Unknown'

    return NextResponse.json({
        ip: ip,
        userAgent: userAgent,
    }, {status: 200});
}
