import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-outfit'
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  weight: ['400', '500'],
  variable: '--font-jetbrains'
})

export const metadata: Metadata = {
  title: 'Valymux | The Simple Gateway for AI Providers',
  description: 'One simple API endpoint. Every model at your fingertips. Zero latency overhead. The intelligent gateway for developers building with AI providers.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
