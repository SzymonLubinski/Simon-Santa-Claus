import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Providers from "@/components/Providers";
import {ReactNode} from "react";


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Simon Santa Claus',
    description: 'Merry Christmas!',
}

export default function RootLayout({children}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
                <div id='portal'/>
            </body>
        </html>
    )
}
