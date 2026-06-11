import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FeaturesClient } from '@/components/features'
import { getFaqContent } from '@/lib/features-content'
import type { Region } from '@/lib/region-config'
import { regionConfig } from '@/lib/region-config'

/**
 * Shared features page content. Lives in a private `_` folder (not routable) and is
 * rendered by the /in and /uk page wrappers with their region, so all server-rendered
 * JSON-LD (currency, payment methods, tax terms, FAQ) is region-correct.
 */
export function FeaturesPageContent({ region }: { region: Region }) {
  const cfg = regionConfig[region]
  const base = `https://omniviya.in/${region}`
  const faq = getFaqContent(region)
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
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
              { '@type': 'ListItem', position: 2, name: 'Features', item: `${base}/features` },
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
            name: 'Omniviya',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'Cloud-based restaurant management platform with QR code ordering, kitchen display system, digital payments, real-time analytics, and table management.',
            applicationSubCategory: 'RestaurantManagement',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: cfg.currencyCode,
              description: 'Pay per use, no minimum commitment. Hardware not required.',
            },
            featureList: [
              'QR code ordering',
              'Kitchen display system',
              `Digital payments (${cfg.paymentPhrase})`,
              'Real-time revenue analytics',
              'Table and floor management',
              'Menu management',
              'Staff access controls',
              `${cfg.taxTerm}-ready reports`,
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
            mainEntity: faq.questions.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
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
