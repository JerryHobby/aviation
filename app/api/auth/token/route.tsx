import {NextRequest, NextResponse} from "next/server";
import {getToken} from 'next-auth/jwt';

export async function GET(request: NextRequest) {
    const token = await getToken({req: request});
    //
    if (token) {
        return NextResponse.json(token);
    } else {
        return NextResponse.json("Not signed in");
    }
}
