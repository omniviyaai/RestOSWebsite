import type { Viewport } from 'next'
import './globals.css'
import { LenisProvider } from '@/components/ui/LenisProvider'
import { ScrollProgressBar } from '@/components/ui/ScrollProgress'
import { RegionProvider } from '@/lib/region-context'

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
    <html lang="en">
      <body className="bg-midnight text-warm-white antialiased">
        <LenisProvider />
        <ScrollProgressBar />
        {/* Default provider for the rare bare "/" hit; the edge function rewrites real
            traffic to /in or /uk, whose layouts supply the correct region provider and
            render the cookie banner + WhatsApp badge inside it. */}
        <RegionProvider region="in">{children}</RegionProvider>
      </body>
    </html>
  )
}
