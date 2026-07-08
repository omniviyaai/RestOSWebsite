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
      description: 'Omniviya is a complete restaurant operating system — QR ordering, kitchen display, payments, analytics, and table management. Built for UK restaurants.',
      foundingDate: '2025',
      location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'GB' } },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hello@omniviya.in',
        availableLanguage: ['English'],
      },
      sameAs: [
        'https://omniviya.in',
        'https://restaurants.omniviya.in',
        'https://www.linkedin.com/company/omniviya',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://omniviya.in/#website',
      url: 'https://omniviya.in',
      name: 'Omniviya',
      description: 'Omniviya is restaurant management software for UK restaurants — QR code ordering, kitchen display system, card payments, and real-time analytics.',
      publisher: { '@id': 'https://omniviya.in/#organization' },
      inLanguage: 'en-GB',
    },
    {
      '@type': 'Person',
      '@id': 'https://omniviya.in/#founder',
      name: 'Sri Chakra Thummalaseshadri',
      jobTitle: 'Founder & CEO',
      affiliation: { '@id': 'https://omniviya.in/#organization' },
      url: 'https://omniviya.in/uk/about',
      knowsAbout: ['Restaurant technology', 'Restaurant management software', 'QR ordering', 'Kitchen display systems'],
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://omniviya.in'),
  title: {
    default: 'Omniviya — The Operating System For UK Restaurants',
    template: '%s — Omniviya',
  },
  description: 'Omniviya is the complete operating system for UK restaurants. QR code ordering, kitchen display system, waiter app, and real-time analytics.',
  keywords: [...regionConfig.uk.seoKeywords],
  authors: [{ name: 'Omniviya' }],
  creator: 'Omniviya',
  publisher: 'Omniviya',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://omniviya.in/uk',
    languages: {
      'en-gb': 'https://omniviya.in/uk',
      'en-in': 'https://omniviya.in/in',
      'x-default': 'https://omniviya.in/in',
    },
  },
  openGraph: {
    title: 'Omniviya — The Operating System For UK Restaurants',
    description: 'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time.',
    url: 'https://omniviya.in/uk',
    siteName: 'Omniviya',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Operating System' }],
    locale: 'en_GB',
    type: 'website',
    countryName: 'United Kingdom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omniviya — The Operating System For UK Restaurants',
    description: 'QR ordering, kitchen display, waiter app, payments, and analytics — all in real time.',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'GB',
    'geo.placename': 'United Kingdom',
  },
}

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <RegionCookieSetter region="uk" />
      <RegionProvider region="uk">
        {children}
        <CookieConsentBanner />
        <WhatsAppFloatingBadge />
      </RegionProvider>
    </>
  )
}
