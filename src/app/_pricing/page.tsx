import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FoundingStrip } from '@/components/pricing/FoundingStrip'
import { PricingClient } from '@/components/pricing/PricingClient'
import type { Region } from '@/lib/region-config'
import { regionConfig } from '@/lib/region-config'
import { PLAN_PRICES } from '@/lib/pricing-content'

const faqsForSchema = [
  { q: 'Is there a contract?', a: 'No. No lock-in, no minimum term. Stop at any time.' },
  { q: 'Do I need to buy new hardware?', a: 'No. Omniviya works on phones, tablets, and laptops you already own. Customers use their own phones.' },
  { q: 'Do you take a commission on orders?', a: 'Never. 0% on every order, on every plan. You keep all your revenue.' },
  { q: 'Is my data safe?', a: 'Yes. Your restaurant gets its own isolated database. No other restaurant can see your data. Everything is encrypted.' },
  { q: 'Does it work for takeaway-only restaurants?', a: 'Yes. Dine-in, takeaway, and cloud kitchen flows are all built in.' },
]

export function PricingPageContent({ region }: { region: Region }) {
  const cfg = regionConfig[region]
  const base = `https://restaurants.omniviya.in/${region}`
  const prices = PLAN_PRICES[region]

  const offersSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Omniviya',
    description: 'Restaurant operating system — QR ordering, kitchen display, payments, and analytics.',
    brand: { '@type': 'Brand', name: 'Omniviya' },
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: cfg.currencyCode, availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Premium', price: String(prices.premium), priceCurrency: cfg.currencyCode, availability: 'https://schema.org/InStock', url: `${base}/pricing` },
      { '@type': 'Offer', name: 'Elite', price: String(prices.elite), priceCurrency: cfg.currencyCode, availability: 'https://schema.org/InStock', url: `${base}/pricing` },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ...faqsForSchema.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      { '@type': 'Question', name: 'What payment methods are supported?', acceptedAnswer: { '@type': 'Answer', text: cfg.paymentFaqAnswer } },
    ],
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${base}/pricing` },
    ],
  }

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="bg-midnight min-h-screen pt-16">
        <FoundingStrip />
        <PricingClient />
      </main>
      <Footer />
    </>
  )
}
