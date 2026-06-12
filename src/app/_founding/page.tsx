import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SpotCounter } from '@/components/ui/SpotCounter'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { RegionFoundingMission } from '@/components/ui/RegionContent'
import type { Region } from '@/lib/region-config'
import { regionConfig } from '@/lib/region-config'

const perks = [
  { title: 'Omniviya completely free for 90 days', desc: 'Every feature. No restrictions. No credit card required.' },
  { title: 'Direct WhatsApp line to the founders', desc: 'Real humans. Real responses. Not a support ticket.' },
  { title: 'Shape the product roadmap', desc: 'Your feedback gets acted on — not filed away.' },
  { title: 'Founding Partner badge', desc: 'Permanent recognition as one of the first 10.' },
  { title: 'First access to every new feature', desc: 'Before anyone else, always.' },
]

const asks = [
  '20 minutes with us once a month — tell us what is working and what is not',
  'Candid feedback when something is broken or confusing',
  'Permission to mention your restaurant as a Founding Partner (optional)',
]

/** Shared founding-partner content rendered by /in and /uk wrappers with region-correct schema. */
export function FoundingPageContent({ region }: { region: Region }) {
  const cfg = regionConfig[region]
  const base = `https://omniviya.in/${region}`

  const breadcrumbFounding = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: 'Founding Partner Program', item: `${base}/founding` },
    ],
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Omniviya Founding Partner Program',
    description: 'First 90 days completely free. Direct WhatsApp line to founders. Shape the product roadmap. Permanent Founding Partner badge.',
    brand: { '@type': 'Brand', name: cfg.siteName },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: cfg.currencyCode,
      availability: 'https://schema.org/LimitedAvailability',
      url: `${base}/founding`,
      description: 'Free for first 90 days. Limited to 10 restaurants.',
    },
  }

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbFounding) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <main className="bg-midnight min-h-screen">
        <div className="max-w-xl mx-auto px-4 pt-28 pb-24">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-[10px] font-mono tracking-widest uppercase mb-6">
              10 Spots Only
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-4 text-balance">
              You&apos;re Not Just a Customer.
              <br />
              <span className="text-gold">You&apos;re a Founder.</span>
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              <RegionFoundingMission />
              {' We want to build it with you — not just for you.'}
            </p>
          </div>

          {/* Story */}
          <div className="space-y-4 mb-12">
            <p className="text-stone text-sm sm:text-base leading-relaxed">
              Most restaurant software is built by people who have never worked a dinner service.
              They build features, not solutions. They add complexity, not clarity.
            </p>
            <p className="text-stone text-sm sm:text-base leading-relaxed">
              We are doing this differently. The first 10 restaurants that join us get a direct line
              to our team. Not a support ticket — a WhatsApp conversation. When something is broken,
              you call us. When you want a feature, we listen.
            </p>
            <p className="text-warm-white text-sm sm:text-base leading-relaxed font-medium">
              That is what a Founding Partner is.
            </p>
          </div>

          {/* What you get */}
          <div className="rounded-2xl border border-gold/30 bg-carbon p-6 sm:p-8 mb-6">
            <h2 className="font-display font-bold text-warm-white text-lg sm:text-xl mb-6">
              What Founding Partners Get
            </h2>
            <ul className="space-y-5">
              {perks.map(({ title, desc }, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-gold text-base mt-0.5 flex-shrink-0" aria-hidden="true">✦</span>
                  <div>
                    <p className="text-warm-white font-medium text-sm">{title}</p>
                    <p className="text-stone text-xs sm:text-sm mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What we ask */}
          <div className="rounded-xl border border-wire/50 bg-carbon/40 p-5 sm:p-6 mb-10">
            <h3 className="font-display font-semibold text-warm-white text-sm mb-4">
              What We Ask In Return
            </h3>
            <ul className="space-y-3">
              {asks.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-teal text-sm mt-0.5 flex-shrink-0" aria-hidden="true">→</span>
                  <span className="text-stone text-xs sm:text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spot counter */}
          <div className="text-center mb-8">
            <SpotCounter />
          </div>

          {/* Apply via WhatsApp */}
          <div className="text-center">
            <p className="text-stone text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              Send us a WhatsApp message with your restaurant name, city, and type — takeaway, dine-in, cafe, or cloud kitchen. We respond within 24 hours.
            </p>
            <WhatsAppButton className="flex items-center justify-center gap-3 w-full sm:w-auto sm:inline-flex px-8 py-4 rounded-xl bg-[#25D366] text-white font-display font-semibold text-base hover:bg-[#22c55e] active:scale-[0.98] transition-all duration-150 min-h-[52px] border-0">
              Apply via WhatsApp
            </WhatsAppButton>
            <p className="text-stone/50 text-xs mt-4">
              Or email us at hello@omniviya.in — subject: &quot;Founding Partner&quot;
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
