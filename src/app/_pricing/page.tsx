import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SpotCounter } from '@/components/ui/SpotCounter'
import { RegionLinkButton } from '@/components/ui/RegionLinkButton'
import { RegionPaymentFaqAnswer } from '@/components/ui/RegionContent'
import type { Region } from '@/lib/region-config'
import { regionConfig } from '@/lib/region-config'

const faqs = [
  { q: 'Is there a contract?', a: 'No. No lock-in, no minimum term. Stop at any time.' },
  { q: 'Do I need to buy new hardware?', a: 'No. Omniviya works on phones, tablets, and laptops you already own. Customers use their own phones.' },
  { q: 'What happens after the 90 days?', a: 'You move to regular pricing, or you leave. No tricks. We tell you well in advance.' },
  { q: 'Is my data safe?', a: 'Yes. Your restaurant gets its own isolated database. No other restaurant can see your data. Everything is encrypted.' },
  { q: 'Does it work for takeaway-only restaurants?', a: 'Yes. Dine-in, takeaway, and cloud kitchen flows are all built in.' },
  { q: 'What payment methods are supported?', a: null },
]

/** Shared pricing content rendered by /in and /uk wrappers with region-correct schema. */
export function PricingPageContent({ region }: { region: Region }) {
  const cfg = regionConfig[region]
  const base = `https://omniviya.in/${region}`

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a ?? cfg.paymentFaqAnswer },
    })),
  }

  const breadcrumbPricing = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbPricing) }} />
      <main className="bg-midnight min-h-screen">
        <div className="pt-28 pb-12 px-4 text-center max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-3">
            Simple, honest pricing.
          </h1>
          <p className="text-stone text-base">No hidden fees. No surprises.</p>
        </div>

        <div className="max-w-3xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Founding Partner */}
            <div className="rounded-2xl border-2 border-gold/50 bg-carbon p-7 sm:p-8 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-gold text-midnight text-[10px] font-mono font-bold tracking-widest uppercase">
                  Founding Partner
                </span>
              </div>
              <div className="mt-3 mb-5">
                <p className="text-4xl font-display font-bold text-warm-white">Free</p>
                <p className="text-gold text-sm mt-1">for your first 90 days</p>
              </div>
              <p className="text-stone text-sm leading-relaxed mb-7">
                Everything included. Direct access to the founding team. Your feedback shapes the product.
              </p>
              <div className="mb-7">
                <SpotCounter />
              </div>
              <RegionLinkButton slug="founding" className="w-full justify-center py-3.5">
                Claim Your Spot
              </RegionLinkButton>
            </div>

            {/* Regular */}
            <div className="rounded-2xl border border-wire bg-carbon p-7 sm:p-8">
              <div className="mb-5">
                <p className="text-4xl font-display font-bold text-stone/60">TBD</p>
                <p className="text-stone text-sm mt-1">per month · announced at launch</p>
              </div>
              <p className="text-stone text-sm leading-relaxed mb-7">
                Everything included. Standard support. Join the waitlist to get early access and pricing.
              </p>
              <div className="rounded-lg bg-wire/20 border border-wire/50 p-4 mb-7">
                <p className="text-stone/70 text-xs text-center leading-relaxed">
                  Pricing announced at launch. Waitlist gets notified first.
                </p>
              </div>
              <a
                href="mailto:hello@omniviya.in?subject=RestOS Waitlist"
                className="flex w-full items-center justify-center px-6 py-3.5 rounded-lg border border-wire text-warm-white text-sm font-display font-semibold hover:border-ember/50 hover:text-ember transition-colors duration-150 min-h-[44px]"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto px-4 pb-24">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-warm-white text-center mb-10">
            Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-wire/50 pb-6">
                <p className="font-display font-semibold text-warm-white text-sm mb-2">{faq.q}</p>
                <p className="text-stone text-sm leading-relaxed">
                  {faq.a ?? <RegionPaymentFaqAnswer />}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
