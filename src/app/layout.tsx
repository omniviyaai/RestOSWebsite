import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LenisProvider } from '@/components/ui/LenisProvider'
import { ScrollProgressBar } from '@/components/ui/ScrollProgress'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://restos.in/#organization',
      name: 'Omniviya',
      url: 'https://omniviya.in',
      logo: 'https://restos.in/og-image.png',
      description: 'Building RestOS — the complete operating system for Indian restaurants.',
      foundingDate: '2025',
      location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'IN' } },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hello@omniviya.in',
        availableLanguage: ['English', 'Hindi'],
      },
      sameAs: ['https://omniviya.in'],
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://restos.in/#webapplication',
      name: 'RestOS',
      url: 'https://restos.in',
      description:
        'QR ordering, kitchen display system, waiter app, UPI payments, reservations, and real-time analytics for Indian restaurants.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cross-platform (web, iOS, Android)',
      browserRequirements: 'Requires modern browser on phone, tablet, or laptop',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
        description: 'Free for 90 days for Founding Partners',
      },
      author: { '@type': 'Organization', '@id': 'https://restos.in/#organization' },
      provider: { '@type': 'Organization', '@id': 'https://restos.in/#organization' },
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://restos.in'),
  title: {
    default: 'RestOS — The Operating System For Indian Restaurants',
    template: '%s — RestOS',
  },
  description:
    'RestOS is the complete operating system for Indian restaurants. QR code ordering, kitchen display system, waiter app, UPI payments, and real-time analytics. One screen. Every order. Every table. Every rupee.',
  keywords: [
    'restaurant management software India',
    'QR ordering system',
    'kitchen display system',
    'restaurant POS India',
    'Indian restaurant software',
    'QR menu for restaurants',
    'online ordering system restaurant',
    'restaurant analytics platform',
    'cloud kitchen software India',
    'restaurant operating system',
  ],
  authors: [{ name: 'Omniviya' }],
  creator: 'Omniviya',
  publisher: 'Omniviya',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://restos.in' },
  openGraph: {
    title: 'RestOS — The Operating System For Indian Restaurants',
    description:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time, all on devices you already own.',
    url: 'https://restos.in',
    siteName: 'RestOS by Omniviya',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RestOS — Restaurant Operating System',
      },
    ],
    locale: 'en_IN',
    type: 'website',
    countryName: 'India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS — The Operating System For Indian Restaurants',
    description:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all in real time.',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
  },
}

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
