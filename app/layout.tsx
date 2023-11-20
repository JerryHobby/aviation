import type {Metadata} from 'next'
import {Inter} from 'next/font/google';
import {Container, Theme} from '@radix-ui/themes';
import './globals.css'
import '@radix-ui/themes/styles.css';
import './theme-config.css'
import './reactMarkdown.css';
import {Footer, NavBar} from "@/app/components";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Aviation.JerryHobby.com',
    description: 'Jerry\'s Aviation',
};

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning={true}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#000000"/>
            <meta name="description" content={metadata.description!}/>
            <link rel="icon" href="/favicon.ico"/>
            <title content='Aviation.JerryHobby.com'/>
        </head>

        <body className={inter.className} suppressHydrationWarning={true}>
        <Theme>
            <header className="sticky top-0 z-50"><NavBar/></header>
            <Container className='content-center'>
                {children}
            </Container>
            <Footer/>
        </Theme>
        </body>
        </html>
    )
}
