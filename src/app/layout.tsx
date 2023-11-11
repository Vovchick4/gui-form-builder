import './globals.css'

import type { Metadata } from 'next'
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/vela-orange/theme.css";
import 'primeicons/primeicons.css';

import { Navbar } from '@/components'
import { Inter } from 'next/font/google'

import MyDesignSystem from '@/components/prime-react-design';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-black"}>
        <PrimeReactProvider value={{ unstyled: true, pt: MyDesignSystem }}>
          <Navbar />
          <div className='py-4'>{children}</div>
        </PrimeReactProvider>
      </body>
    </html>
  )
}
