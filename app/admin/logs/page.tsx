import React from 'react';
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next"
import nextAuthOptions from "@/app/auth/authOptions";
//import {Session} from "next-auth";
import {groupBy, orderBy} from "lodash";
import {Title} from "@/app/components";
import {redirect} from "next/navigation";

const Page = async () => {

    // const {status, data: session} = useSession(); // client side
    const session = await getServerSession(nextAuthOptions) // server side
    var admin = false

    if (!session || !session.user?.email) redirect('/api/auth/signin')
    else {
        console.log(session.user?.email)
        admin = [
            "jerry@anythinginternet.com",
            "jerryhobby@gmail.com",
        ].includes(session.user?.email)
    }
    if (!admin) redirect('/api/auth/signin')

    const title = "Access Logs"
    const icon = "airports"

    var log = await prisma.log.findMany(
        {where: {ip: {not: 'localhost'}},}
    )

    log = orderBy(log, ['date'], "desc")

    const tableStyle = "border-collapse border border-gray-300 rounded-lg shadow-lg"
    const tableHeaderStyle = "text-left border border-gray-300 bg-gray-100 px-2 py-1"
    const tableRowStyle = "border border-gray-300 px-2 py-1"
    const tableCellStyleWrap = "align-top border border-gray-300 px-2 py-1"
    const tableCellStyle = tableCellStyleWrap + " whitespace-nowrap"

    return (
        <main>
            <Title title={title} icon={icon}/>
            <table className={tableStyle}>
                <thead>
                <tr>
                    <th className={tableHeaderStyle}>Date</th>
                    <th className={tableHeaderStyle}>Time</th>
                    <th className={tableHeaderStyle}>IP</th>
                    <th className={tableHeaderStyle}>Component</th>
                    <th className={tableHeaderStyle}>Level</th>
                    <th className={tableHeaderStyle}>Message</th>
                    <th className={tableHeaderStyle}>User Agent</th>
                </tr>
                </thead>
                <tbody>
                {log.map((log) => (
                    <tr key={log.ip} className={tableRowStyle}>
                        <td className={tableCellStyle}>{log.date.toLocaleDateString()}</td>
                        <td className={tableCellStyle}>{log.date.toLocaleTimeString()}</td>
                        <td className={tableCellStyle}>{log.ip}</td>
                        <td className={tableCellStyle}>{log.component}</td>
                        <td className={tableCellStyle}>{log.level}</td>
                        <td className={tableCellStyleWrap}>{log.message}</td>
                        <td className={tableCellStyleWrap}>{log.userAgent}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </main>
    );
};

export default Page;