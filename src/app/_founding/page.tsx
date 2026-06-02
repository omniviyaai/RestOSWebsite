import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SpotCounter } from '@/components/ui/SpotCounter'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { RegionFoundingMission } from '@/components/ui/RegionContent'

export const metadata: Metadata = {
  title: 'Founding Partner Program — Be One of 10',
  description:
    'Be one of the 10 Indian restaurants that shapes how RestOS works. First 90 days completely free. Direct WhatsApp line to the founders. No credit card required.',
  openGraph: {
    title: 'RestOS Founding Partner Program — 10 Spots Only',
    description:
      'First 90 days free. Direct WhatsApp line to the founders. Shape the product roadmap. Permanent Founding Partner badge.',
    url: 'https://restos.in/founding',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RestOS Founding Partner Program' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS Founding Partner Program — 10 Spots Only',
    description: 'First 90 days free. Direct access to founders. Shape the product roadmap.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://restos.in/founding' },
}

const perks = [
  { title: 'RestOS completely free for 90 days', desc: 'Every feature. No restrictions. No credit card required.' },
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

const breadcrumbFounding = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://restos.in/' },
    { '@type': 'ListItem', position: 2, name: 'Founding Partner Program', item: 'https://restos.in/founding' },
  ],
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'RestOS Founding Partner Program',
  description: 'First 90 days completely free. Direct WhatsApp line to founders. Shape the product roadmap. Permanent Founding Partner badge.',
  brand: { '@type': 'Brand', name: 'RestOS by Omniviya' },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    availability: 'https://schema.org/LimitedAvailability',
    url: 'https://restos.in/founding',
    description: 'Free for first 90 days. Limited to 10 restaurants.',
  },
}

export default function FoundingPage() {
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
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.773 9.773 0 01-5.021-1.384l-.36-.214-3.733.974.999-3.639-.235-.374A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
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
