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
      description: 'QR ordering, kitchen display system, waiter app, UPI payments, reservations, and real-time analytics for Indian restaurants.',
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
  description: 'RestOS is the complete operating system for Indian restaurants. QR code ordering, kitchen display system, waiter app, UPI payments, and real-time analytics.',
  keywords: [...regionConfig.in.seoKeywords],
  authors: [{ name: 'Omniviya' }],
  creator: 'Omniviya',
  publisher: 'Omniviya',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://restos.in/in',
    languages: {
      'en-in': 'https://restos.in/in',
      'en-gb': 'https://restos.in/uk',
      'x-default': 'https://restos.in/in',
    },
  },
  openGraph: {
    title: 'RestOS — The Operating System For Indian Restaurants',
    description: 'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time.',
    url: 'https://restos.in/in',
    siteName: 'RestOS by Omniviya',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RestOS — Restaurant Operating System' }],
    locale: 'en_IN',
    type: 'website',
    countryName: 'India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS — The Operating System For Indian Restaurants',
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
