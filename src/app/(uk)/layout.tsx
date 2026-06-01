import type { Metadata } from 'next'
import { RegionProvider } from '@/lib/region-context'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://restos.in/#organization',
      name: 'Omniviya',
      url: 'https://omniviya.in',
      logo: 'https://restos.in/og-image.png',
      description: 'Building RestOS — the complete operating system for UK restaurants.',
      foundingDate: '2025',
      location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'GB' } },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hello@omniviya.in',
        availableLanguage: ['English'],
      },
      sameAs: ['https://omniviya.in'],
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://restos.in/#webapplication',
      name: 'RestOS',
      url: 'https://restos.in',
      description:
        'QR ordering, kitchen display system, waiter app, and real-time analytics for UK restaurants.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cross-platform (web, iOS, Android)',
      browserRequirements: 'Requires modern browser on phone, tablet, or laptop',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP',
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
    default: 'RestOS — The Operating System For UK Restaurants',
    template: '%s — RestOS',
  },
  description:
    'RestOS is the complete operating system for UK restaurants. QR code ordering, kitchen display system, waiter app, and real-time analytics.',
  keywords: [
    'restaurant management software UK',
    'QR ordering system',
    'kitchen display system',
    'restaurant POS UK',
    'UK restaurant software',
    'QR menu for restaurants',
    'online ordering system restaurant',
    'restaurant analytics platform',
    'restaurant operating system',
  ],
  authors: [{ name: 'Omniviya' }],
  creator: 'Omniviya',
  publisher: 'Omniviya',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://restos.in/uk',
    languages: {
      'en-gb': 'https://restos.in/uk',
      'en-in': 'https://restos.in/in',
    },
  },
  openGraph: {
    title: 'RestOS — The Operating System For UK Restaurants',
    description:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time.',
    url: 'https://restos.in/uk',
    siteName: 'RestOS UK',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RestOS — Restaurant Operating System',
      },
    ],
    locale: 'en_GB',
    type: 'website',
    countryName: 'United Kingdom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS — The Operating System For UK Restaurants',
    description:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all in real time.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RegionProvider region="uk">{children}</RegionProvider>
    </>
  )
}
