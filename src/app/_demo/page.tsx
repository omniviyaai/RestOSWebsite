import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TalkToMiviButton } from '@/components/ui/TalkToMiviButton'

export const metadata: Metadata = {
  title: 'Book a Free Demo — Omniviya',
  description:
    'See Omniviya running in your restaurant. Book a free 20-minute demo with the founding team. QR ordering, kitchen display, payments, and analytics — live walkthrough.',
  openGraph: {
    title: 'Book a Free Demo — Omniviya Restaurant Operating System',
    description:
      'Free 20-minute demo with the founding team. See Omniviya — QR ordering, kitchen display, payments, and analytics live.',
    url: 'https://omniviya.in/demo',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya Demo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Demo — Omniviya Restaurant Operating System',
    description: 'Free 20-minute demo. See Omniviya live in your restaurant.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://omniviya.in/demo' },
}

const breadcrumbDemo = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://omniviya.in/' },
    { '@type': 'ListItem', position: 2, name: 'Book a Demo', item: 'https://omniviya.in/demo' },
  ],
}

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbDemo) }} />
      <main className="min-h-screen bg-midnight pt-28 pb-20 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono tracking-widest text-teal uppercase block mb-4">Free · 20 Minutes</span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-warm-white mb-3 text-balance">
              Let&apos;s show you Omniviya in your restaurant.
            </h1>
            <p className="text-stone text-base leading-relaxed">
              Pick a time. We&apos;ll walk you through everything live — ordering, kitchen display, payments, analytics.
            </p>
          </div>

          {/* Cal.com embed placeholder */}
          <div className="rounded-2xl border border-wire bg-carbon p-8 text-center mb-8">
            <div className="w-8 h-8 rounded-full bg-wire/50 mx-auto mb-4 flex items-center justify-center">
              <span className="text-stone text-sm">📅</span>
            </div>
            <p className="text-warm-white font-display font-semibold text-base mb-2">
              Calendar booking coming soon
            </p>
            <p className="text-stone text-sm leading-relaxed">
              In the meantime, talk to MIVI and we&apos;ll schedule a demo within 24 hours.
            </p>
          </div>

          {/* Primary CTA — MIVI */}
          <div className="flex flex-col items-center gap-4">
            <TalkToMiviButton className="flex items-center justify-center gap-3 w-full px-8 py-4 rounded-xl text-base min-h-[52px] border-0">
              Talk to MIVI to Book a Demo
            </TalkToMiviButton>
            <p className="text-stone/60 text-xs">
              Typically respond within 30 minutes during business hours.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
