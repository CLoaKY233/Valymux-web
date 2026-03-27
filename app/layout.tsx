import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/json-ld'
import { AnimationBootstrap } from '@/components/animation-bootstrap'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE, TWITTER_HANDLE } from '@/lib/seo'
import './globals.css'

const outfit = Outfit({
  subsets: ["latin"],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-outfit'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ['400'],
  display: 'swap',
  variable: '--font-jetbrains'
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Valymux',
    default: 'Valymux | The Simple Gateway for AI Providers',
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="preconnect" href="https://api.github.com" crossOrigin="anonymous" />
      </head>
      <body className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}>
        <AnimationBootstrap />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
