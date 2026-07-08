import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CITIES, getCity } from '@/lib/city-data'

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const city = getCity(params.city)
  if (!city) return {}
  return {
    title: `${city.tagline} — Omniviya`,
    description: `${city.description} Free to start. No hardware. 0% platform fee.`,
    alternates: { canonical: `https://omniviya.in/in/cities/${city.slug}` },
    openGraph: {
      title: `${city.tagline} — Omniviya`,
      description: city.description,
      url: `https://omniviya.in/in/cities/${city.slug}`,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `Omniviya — Restaurant Management Software ${city.name}` }],
    },
  }
}

const FEATURES = [
  { icon: '📱', title: 'QR Code Ordering', desc: 'Customers order from their own phone at the table — no waiter needed for order entry.' },
  { icon: '🖥', title: 'Kitchen Display System', desc: 'Orders appear instantly on a screen in your kitchen. No printers, no paper, no lost tickets.' },
  { icon: '💳', title: 'UPI & Card Payments', desc: 'Accept all UPI apps, cards, and cash. Payments go directly to your Razorpay or Cashfree account.' },
  { icon: '📊', title: 'Real-time Analytics', desc: 'See your best dishes, peak hours, and revenue trends — updated as each order comes in.' },
]

export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCity(params.city)
  if (!city) notFound()

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Omniviya',
    applicationCategory: 'BusinessApplication',
    description: `${city.tagline}. QR ordering, kitchen display system, UPI payments for restaurants in ${city.name}.`,
    url: `https://omniviya.in/in/cities/${city.slug}`,
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'INR' },
      { '@type': 'Offer', name: 'Premium', price: '1199', priceCurrency: 'INR' },
    ],
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'State', name: city.state },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-midnight">

        {/* Hero */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-56 bg-ember/6 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-48 bg-teal/4 blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative">
            <div className="flex items-center gap-2 mb-8">
              <Link href="/in" className="text-xs text-stone/40 hover:text-stone/60 transition-colors font-mono">India</Link>
              <span className="text-stone/25 text-xs">/</span>
              <span className="text-xs text-stone/40 font-mono">{city.name}</span>
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-ember/10 border border-ember/20 text-ember text-xs font-mono mb-6">
              {city.restaurants} restaurants in {city.name}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-6 leading-snug text-balance">
              Restaurant Management Software for{' '}
              <span className="text-ember">{city.name}</span>{' '}
              Restaurants
            </h1>

            <p className="text-stone/65 text-base sm:text-lg max-w-2xl leading-relaxed mb-10">
              {city.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://restos.omniviya.in/admin/register"
                className="inline-flex items-center justify-center gap-2 bg-ember text-white font-display font-semibold px-6 py-3 rounded-xl hover:bg-ember/90 transition-colors text-sm"
              >
                Start free — no credit card
              </a>
              <Link
                href="/in/features"
                className="inline-flex items-center justify-center gap-2 border border-wire/40 text-warm-white/70 hover:text-warm-white hover:border-wire/60 font-display font-medium px-6 py-3 rounded-xl transition-colors text-sm"
              >
                See all features
              </Link>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-sm text-stone/40 font-mono uppercase tracking-wider mb-5">Works for</h2>
          <div className="flex flex-wrap gap-2">
            {city.industries.map((ind) => (
              <span key={ind} className="px-4 py-2 rounded-full border border-wire/30 text-stone/65 text-sm font-sans">
                {ind}
              </span>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-warm-white mb-10">
            Everything a {city.name} restaurant needs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-wire/30 p-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(21,27,46,0.8) 0%, rgba(11,16,32,0.6) 100%)' }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="text-2xl mb-3" role="img" aria-hidden>{f.icon}</div>
                <h3 className="font-display font-semibold text-warm-white mb-2">{f.title}</h3>
                <p className="text-stone/55 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <div
            className="rounded-2xl border border-ember/20 p-8 sm:p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.06) 0%, rgba(11,16,32,0.8) 100%)' }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/25 to-transparent" />

            <div className="flex gap-0.5 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-gold/80">
                  <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.3l-3.7 2 .7-4.1-3-2.9 4.2-.7L7 1z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-warm-white/85 text-base sm:text-lg leading-relaxed mb-6 font-sans">
              &ldquo;{city.testimonial.quote}&rdquo;
            </blockquote>

            <div>
              <p className="text-warm-white font-display font-semibold text-sm">{city.testimonial.name}</p>
              <p className="text-stone/45 text-xs mt-0.5">{city.testimonial.restaurant} · {city.testimonial.type}</p>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <section className="max-w-4xl mx-auto px-4 pb-24">
          <div className="rounded-2xl border border-wire/25 p-8 sm:p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(21,27,46,0.7) 0%, rgba(11,16,32,0.5) 100%)' }}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-warm-white mb-3">
              Pricing that works for {city.name} restaurants
            </h2>
            <p className="text-stone/55 text-sm mb-2">
              Free plan available. Premium from ₹1,199/month. 0% platform fee on every order.
            </p>
            <p className="text-stone/35 text-xs mb-7">No hardware. No setup cost. No contract.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://restos.omniviya.in/admin/register"
                className="inline-flex items-center justify-center gap-2 bg-ember text-white font-display font-semibold px-6 py-3 rounded-xl hover:bg-ember/90 transition-colors text-sm"
              >
                Register free →
              </a>
              <Link
                href="/in/pricing"
                className="inline-flex items-center justify-center gap-2 border border-wire/40 text-warm-white/70 hover:text-warm-white font-display font-medium px-6 py-3 rounded-xl transition-colors text-sm"
              >
                See pricing
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
