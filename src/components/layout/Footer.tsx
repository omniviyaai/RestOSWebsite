import Link from 'next/link'
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-wire bg-carbon">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-display font-bold text-warm-white text-lg">RestOS</p>
              <p className="text-stone text-xs tracking-wider">by Omniviya</p>
            </div>
            <p className="text-stone text-sm leading-relaxed max-w-xs">
              The Operating System For Restaurants. Built for India.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-warm-white text-sm font-semibold font-display">Navigation</p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone text-sm hover:text-warm-white transition-colors duration-150 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-warm-white text-sm font-semibold font-display">Contact</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone text-sm hover:text-warm-white transition-colors duration-150 w-fit"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:hello@omniviya.in"
              className="text-stone text-sm hover:text-warm-white transition-colors duration-150 w-fit"
            >
              hello@omniviya.in
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-wire flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-stone text-xs">© {year} Omniviya. All rights reserved.</p>
          <p className="text-stone text-xs">RestOS is a product of Omniviya</p>
        </div>
      </div>
    </footer>
  )
}
