import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { DEMO_PAGE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About — RestOS by Omniviya',
  description:
    'RestOS is built by Omniviya — on a mission to give Indian restaurants the technology they deserve. QR ordering, KDS, payments, and analytics for Indian restaurants.',
  openGraph: {
    title: 'About RestOS — Restaurant Operating System by Omniviya',
    description:
      'RestOS is built by Omniviya to give Indian restaurants the technology they deserve — QR ordering, kitchen display, payments, and analytics.',
    url: 'https://restos.in/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RestOS — About' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About RestOS — Restaurant Operating System by Omniviya',
    description: 'RestOS by Omniviya — built for Indian restaurants.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://restos.in/about' },
}

const breadcrumbAbout = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://restos.in/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://restos.in/about' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbAbout) }} />
      <main className="bg-midnight min-h-screen">
        <div className="max-w-xl mx-auto px-4 pt-28 pb-24">
          {/* Mission */}
          <div className="mb-14">
            <span className="text-[10px] font-mono tracking-widest text-teal uppercase block mb-4">
              Our Mission
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-6 text-balance leading-tight">
              Indian restaurants deserve better technology.
            </h1>
            <p className="text-stone text-sm sm:text-base leading-relaxed">
              Every day, thousands of restaurant owners across India manage their entire operation
              through WhatsApp groups, paper KOTs, and spreadsheets. Not because they want to —
              because the software available to them is too expensive, too complicated, or built for
              someone else entirely.
            </p>
          </div>

          {/* What we built */}
          <div className="mb-14">
            <h2 className="font-display font-bold text-warm-white text-lg sm:text-xl mb-4">What We Built</h2>
            <p className="text-stone text-sm sm:text-base leading-relaxed mb-4">
              RestOS is a complete restaurant operating system — QR ordering, kitchen display,
              waiter app, payments, reservations, analytics — all connected, all in real time,
              all on devices you already own.
            </p>
            <p className="text-stone text-sm sm:text-base leading-relaxed">
              No expensive hardware. No complicated setup. No per-device fees. Software that works
              the way Indian restaurants actually work.
            </p>
          </div>

          {/* Company */}
          <div className="rounded-xl border border-wire bg-carbon p-5 sm:p-6 mb-14">
            <h3 className="font-display font-semibold text-warm-white text-base mb-3">About Omniviya</h3>
            <p className="text-stone text-sm leading-relaxed">
              Omniviya is a software company building technology for businesses underserved by
              existing tools. RestOS is our first product. We are based in India and building
              for India first.
            </p>
          </div>

          {/* Contact */}
          <div className="mb-14">
            <h2 className="font-display font-bold text-warm-white text-lg sm:text-xl mb-6">Get In Touch</h2>
            <div className="space-y-4">
              {[
                { label: 'WhatsApp', href: '#', text: 'Message us directly', external: true },
                { label: 'Email', href: 'mailto:hello@omniviya.in', text: 'hello@omniviya.in', external: false },
                { label: 'Website', href: 'https://omniviya.in', text: 'omniviya.in', external: true },
              ].map(({ label, href, text, external }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="text-stone text-sm w-16 flex-shrink-0">{label}</span>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-teal text-sm hover:text-teal/70 transition-colors duration-150"
                  >
                    {text}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={DEMO_PAGE_URL} variant="primary" className="w-full sm:w-auto justify-center py-4">
              Book a Demo
            </Button>
            <WhatsAppButton className="w-full sm:w-auto justify-center py-4" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
