import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FeaturesClient } from '@/components/features'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Every RestOS feature translated into outcomes for your restaurant: QR code ordering, kitchen display system, payments, management dashboard, and real-time analytics.',
  openGraph: {
    title: 'RestOS Features — QR Ordering, KDS, Payments & Analytics',
    description:
      'QR code ordering, kitchen display system, payments, management dashboard, and real-time analytics — all connected.',
    url: 'https://restos.in/features',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RestOS Features' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS Features — QR Ordering, KDS, Payments & Analytics',
    description: 'Every RestOS feature explained: QR ordering, kitchen display, payments, management, and analytics.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://restos.in/features' },
}

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://restos.in/' },
              { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://restos.in/features' },
            ],
          }),
        }}
      />
      <main className="bg-midnight min-h-screen">
        <FeaturesClient />
      </main>
      <Footer />
    </>
  )
}
