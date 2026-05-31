import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WHATSAPP_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Book a Free Demo — RestOS',
  description:
    'See RestOS running in your restaurant. Book a free 20-minute demo with the founding team. QR ordering, kitchen display, payments, and analytics — live walkthrough.',
  openGraph: {
    title: 'Book a Free Demo — RestOS Restaurant Operating System',
    description:
      'Free 20-minute demo with the founding team. See QR ordering, kitchen display, payments, and analytics live.',
    url: 'https://restos.in/demo',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RestOS Demo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Demo — RestOS Restaurant Operating System',
    description: 'Free 20-minute demo. See RestOS live in your restaurant.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://restos.in/demo' },
}

const breadcrumbDemo = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://restos.in/' },
    { '@type': 'ListItem', position: 2, name: 'Book a Demo', item: 'https://restos.in/demo' },
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
              Let&apos;s show you RestOS in your restaurant.
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
              In the meantime, WhatsApp us directly and we&apos;ll schedule a demo within 24 hours.
            </p>
          </div>

          {/* Primary CTA — WhatsApp */}
          <div className="flex flex-col items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-8 py-4 rounded-xl bg-[#25D366] text-white font-display font-semibold text-base hover:bg-[#22c55e] active:scale-[0.98] transition-all duration-150 min-h-[52px]"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.773 9.773 0 01-5.021-1.384l-.36-.214-3.733.974.999-3.639-.235-.374A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              WhatsApp Us to Book a Demo
            </a>
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
