import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { RegionLinkButton } from '@/components/ui/RegionLinkButton'
import { RegionWhatsAppLink } from '@/components/ui/RegionWhatsAppLink'
import { RegionAboutMission } from '@/components/ui/RegionContent'

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
              <div className="flex items-center gap-4">
                <span className="text-stone text-sm w-16 flex-shrink-0">WhatsApp</span>
                <RegionWhatsAppLink className="text-teal text-sm hover:text-teal/70 transition-colors duration-150" />
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <RegionLinkButton slug="demo" className="w-full sm:w-auto justify-center py-4">
              Book a Demo
            </RegionLinkButton>
            <WhatsAppButton className="w-full sm:w-auto justify-center py-4" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
