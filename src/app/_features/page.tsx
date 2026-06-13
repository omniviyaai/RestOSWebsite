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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to set up Omniviya in your restaurant',
            description: 'Most restaurants go live within 48 hours. Upload your menu, print QR codes, connect a kitchen display, and start taking orders.',
            step: [
              { '@type': 'HowToStep', position: 1, name: 'Upload your menu', text: 'Upload your menu to Omniviya or let our team do it for you. Menu changes go live instantly across all QR codes.' },
              { '@type': 'HowToStep', position: 2, name: 'Print QR codes', text: 'Print unique QR codes for each table in your restaurant. Customers scan to browse, order, and pay from their own phone.' },
              { '@type': 'HowToStep', position: 3, name: 'Connect a kitchen display', text: 'Connect any screen in your kitchen — a tablet, TV, or laptop. Orders appear instantly, timestamped and color-coded.' },
              { '@type': 'HowToStep', position: 4, name: 'Start taking orders', text: 'Your restaurant is live. Customers order from their phones. Kitchen sees every order on screen. Revenue tracks in real time.' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h2', '.faq-question'] },
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
