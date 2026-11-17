import type { Metadata } from 'next'
import {
  Cormorant_Garamond,
  Noto_Sans_Georgian,
  Noto_Serif_Georgian,
} from 'next/font/google'

import './globals.css'

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
})

const georgianSans = Noto_Sans_Georgian({
  subsets: ['georgian'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-georgian-sans',
})

const georgianSerif = Noto_Serif_Georgian({
  subsets: ['georgian'],
  weight: ['400', '500', '600'],
  variable: '--font-georgian-serif',
})

export const metadata: Metadata = {
  title: 'LEV Shoes — The Art of Every Step',
  description: 'Discover the world of LEV Shoes.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ka">
      <body
        className={`${displayFont.variable} ${georgianSans.variable} ${georgianSerif.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
