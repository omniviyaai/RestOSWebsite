import type { Metadata } from 'next'
import { RegionProvider } from '@/lib/region-context'
import { RegionCookieSetter } from '@/components/ui/RegionCookieSetter'
import { CookieConsentBanner } from '@/components/features/CookieConsentBanner'
import { WhatsAppFloatingBadge } from '@/components/ui/WhatsAppFloatingBadge'
import { regionConfig } from '@/lib/region-config'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://omniviya.in/#organization',
      name: 'Omniviya',
      url: 'https://omniviya.in',
      logo: 'https://omniviya.in/og-image.png',
      description: 'Omniviya is a complete restaurant operating system — QR ordering, kitchen display, payments, analytics, and table management. Built for Indian restaurants.',
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
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://omniviya.in'),
  title: {
    default: 'Omniviya — The Operating System For Indian Restaurants',
    template: '%s — Omniviya',
  },
  description: 'Omniviya is the complete operating system for Indian restaurants. QR code ordering, kitchen display system, waiter app, UPI payments, and real-time analytics.',
  keywords: [...regionConfig.in.seoKeywords],
  authors: [{ name: 'Omniviya' }],
  creator: 'Omniviya',
  publisher: 'Omniviya',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://omniviya.in/in',
    languages: {
      'en-in': 'https://omniviya.in/in',
      'en-gb': 'https://omniviya.in/uk',
      'x-default': 'https://omniviya.in/in',
    },
  },
  openGraph: {
    title: 'Omniviya — The Operating System For Indian Restaurants',
    description: 'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time.',
    url: 'https://omniviya.in/in',
    siteName: 'Omniviya',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Operating System' }],
    locale: 'en_IN',
    type: 'website',
    countryName: 'India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omniviya — The Operating System For Indian Restaurants',
    description: 'QR ordering, kitchen display, waiter app, payments, and analytics — all in real time.',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
  },
}

export default function InLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RegionCookieSetter region="in" />
      <RegionProvider region="in">
        {children}
        <CookieConsentBanner />
        <WhatsAppFloatingBadge />
      </RegionProvider>
    </>
  )
}
