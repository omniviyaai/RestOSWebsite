import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { RegionLinkButton } from '@/components/ui/RegionLinkButton'
import { RegionPaymentFeature, RegionAnalyticsDescription } from '@/components/ui/RegionContent'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Every RestOS feature translated into outcomes for your restaurant: QR code ordering, kitchen display system, UPI payments, waiter app, reservations, management dashboard, and real-time analytics.',
  openGraph: {
    title: 'RestOS Features — QR Ordering, KDS, Payments & Analytics',
    description:
      'QR code ordering, kitchen display system, waiter app, UPI payments, management dashboard, and real-time analytics — all connected.',
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

const features = [
  {
    category: 'Ordering',
    headline: 'Customers order themselves',
    description: 'Every table gets a unique QR code. Customers scan, browse your full menu with photos, customize their order, and pay — all from their own phone. No app download. No sign-up. No friction.',
    bullets: [
      'Works for dine-in and takeaway in the same flow',
      'Menu changes you make go live instantly',
      'Veg / non-veg indicators on every item',
      'Spice levels, addon groups, special instructions supported',
      'Your branding on the menu — not ours',
    ],
  },
  {
    category: 'Kitchen',
    headline: 'Kitchen never misses an order',
    description: 'Ditch the paper KOTs. Every order appears on the kitchen display the moment it is placed. Color-coded by status. Timer shows how long each order has been waiting. Audio alert when a new order arrives.',
    bullets: [
      'New → Confirmed → Completed → Served flow',
      'Orders over 10 minutes pulse amber, over 20 pulse red',
      'Special instructions highlighted in amber — nothing missed',
      'Paid vs unpaid badge on every order',
      'Works on any tablet or TV you already have',
    ],
  },
  {
    category: 'Payments',
    headline: '',
    description: '',
    bullets: [] as string[],
  },
  {
    category: 'Management',
    headline: 'Manage your entire restaurant from one screen',
    description: 'The admin dashboard gives you complete visibility — revenue, orders, staff, menu, tables — all in one place, from any device.',
    bullets: [
      "Today's revenue, order count, and AOV at a glance",
      'Full menu management with photos and stock tracking',
      'Table layout with open/close session control',
      'Staff management with role-based access',
      'Reservation calendar and customer reviews',
    ],
  },
  {
    category: 'Analytics',
    headline: 'Finally know what is working',
    description: '',
    bullets: [
      'Daily, weekly, and monthly revenue reports',
      'Revenue by source — dine-in vs takeaway vs QR',
      'Top selling items updated live',
      'Hourly order trends',
      'Customer review tracking over time',
    ],
  },
]

const breadcrumbFeatures = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://restos.in/' },
    { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://restos.in/features' },
  ],
}

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbFeatures) }} />
      <main className="bg-midnight min-h-screen">
        <div className="pt-28 pb-12 px-4 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-4 text-balance">
            Everything Your Restaurant Needs
          </h1>
          <p className="text-stone text-base sm:text-lg leading-relaxed">
            Every feature translated into what it means for your restaurant tomorrow morning.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-24 space-y-20 sm:space-y-28">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-start`}
            >
              <div className="flex-1 w-full">
                <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-3 block">
                  {feature.category}
                </span>
                {feature.category === 'Payments' ? (
                  <RegionPaymentFeature />
                ) : (
                  <>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-warm-white mb-4 text-balance">
                      {feature.headline}
                    </h2>
                    <p className="text-stone text-sm sm:text-base leading-relaxed mb-6">
                      {feature.category === 'Analytics' ? <RegionAnalyticsDescription /> : feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="text-teal text-sm mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                          <span className="text-warm-white/90 text-sm">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="flex-1 w-full rounded-xl border border-wire bg-carbon h-48 sm:h-64 flex items-center justify-center">
                <p className="text-stone/50 text-xs font-mono">{feature.category} · Replace with screenshot</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-carbon/20 py-16 sm:py-20 px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-warm-white mb-6 text-balance">
            See all of this in your restaurant.
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <RegionLinkButton slug="demo" className="w-full sm:w-auto justify-center py-4">
              Book a Free Demo
            </RegionLinkButton>
            <WhatsAppButton className="w-full sm:w-auto justify-center py-4" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
