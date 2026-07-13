import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { TalkToMiviButton } from '@/components/ui/TalkToMiviButton'
import { RegionLinkButton } from '@/components/ui/RegionLinkButton'
import { RegionAboutMission } from '@/components/ui/RegionContent'

export const metadata: Metadata = {
  title: 'About — Omniviya',
  description:
    'Omniviya is a complete restaurant operating system for Indian restaurants. QR ordering, KDS, payments, and analytics.',
  openGraph: {
    title: 'About Omniviya — Restaurant Operating System',
    description:
      'Omniviya is a complete restaurant operating system — QR ordering, kitchen display, payments, and analytics.',
    url: 'https://omniviya.in/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — About' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Omniviya — Restaurant Operating System',
    description: 'Omniviya — built for Indian restaurants.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://omniviya.in/about' },
}

const breadcrumbAbout = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://omniviya.in/' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://omniviya.in/about' },
  ],
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbAbout) }} />
      <main className="bg-midnight min-h-screen">
        <div className="max-w-xl mx-auto px-4 pt-28 pb-24">
          <RegionAboutMission />

          {/* Contact */}
          <div className="mb-14">
            <h2 className="font-display font-bold text-warm-white text-lg sm:text-xl mb-6">Get In Touch</h2>
            <div className="space-y-4">
              {[
                { label: 'Email', href: 'mailto:hello@omniviya.in', text: 'hello@omniviya.in' },
                { label: 'Website', href: 'https://omniviya.in', text: 'omniviya.in' },
              ].map(({ label, href, text }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="text-stone text-sm w-16 flex-shrink-0">{label}</span>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
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
            <RegionLinkButton slug="demo" className="w-full sm:w-auto justify-center py-4">
              Book a Demo
            </RegionLinkButton>
            <TalkToMiviButton className="w-full sm:w-auto justify-center py-4" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
