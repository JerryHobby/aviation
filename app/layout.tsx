import type {Metadata} from 'next'
import {Inter} from 'next/font/google';
import './globals.css'
import '@radix-ui/themes/styles.css';
import './theme-config.css'
import './reactMarkdown.css';
import {Container, Theme} from '@radix-ui/themes';
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

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={inter.variable}>
        <body className={inter.className}>
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
