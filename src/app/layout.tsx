import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RestOS — The Operating System For Restaurants',
  description:
    'RestOS is the complete operating system for Indian restaurants. QR ordering, kitchen display, waiter app, payments, and analytics. One screen. Everything connected.',
  keywords: 'restaurant software India, QR ordering system, kitchen display system, restaurant POS India, restaurant management software',
  openGraph: {
    title: 'RestOS — The Operating System For Restaurants',
    description: 'One screen. Every order. Every table. Every rupee.',
    url: 'https://restos.in',
    siteName: 'RestOS',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS — The Operating System For Restaurants',
    description: 'One screen. Every order. Every table. Every rupee.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-midnight text-warm-white antialiased">
        {children}
      </body>
    </html>
  )
}
