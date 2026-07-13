import type { Viewport } from 'next'
import { Space_Grotesk, DM_Sans, Space_Mono, Cinzel } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { LenisProvider } from '@/components/ui/LenisProvider'
import { ScrollProgressBar } from '@/components/ui/ScrollProgress'
import { RegionProvider } from '@/lib/region-context'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
  preload: false,
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-cinzel',
  display: 'swap',
  preload: false,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${spaceMono.variable} ${cinzel.variable}`}>
      <body className="bg-midnight text-warm-white antialiased">
        <LenisProvider />
        <ScrollProgressBar />
        {/* Default provider for the rare bare "/" hit; the edge function rewrites real
            traffic to /in or /uk, whose layouts supply the correct region provider and
            render the cookie banner + WhatsApp badge inside it. */}
        <RegionProvider region="in">{children}</RegionProvider>
        <Script
          src="https://restos.omniviya.in/assistant/widget.js"
          data-tenant-id="restos"
          data-api-url="https://restos.omniviya.in/assistant"
          data-primary-color="#E8742A"
          data-position="right"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
