import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FeaturesClient } from '@/components/features'
import { FAQ_CONTENT } from '@/lib/features-content'

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'RestOS',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Cloud-based restaurant management platform with QR code ordering, kitchen display system, digital payments, real-time analytics, and table management.',
            applicationSubCategory: 'RestaurantManagement',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
              description: 'Pay per use, no minimum commitment. Hardware not required.',
            },
            featureList: [
              'QR code ordering',
              'Kitchen display system',
              'Digital payments with UPI',
              'Real-time revenue analytics',
              'Table and floor management',
              'Menu management',
              'Staff access controls',
              'GST-ready reports',
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_CONTENT.questions.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
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
