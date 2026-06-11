'use client'

import Link from 'next/link'
import { NAV_SLUGS } from '@/lib/constants'
import { Logo } from '@/components/ui/Logo'
import { useRegion } from '@/lib/region-context'
import { openCookieSettings } from '@/components/features/CookieConsentBanner'

export function Footer() {
  const region = useRegion()
  const year = new Date().getFullYear()
  const whatsappUrl = `https://wa.me/${region.whatsappNumber}?text=${encodeURIComponent('Hi, I want to know more about Omniviya')}`

  return (
    <footer className="border-t border-wire bg-carbon">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo variant="full" />
            <p className="text-stone text-sm leading-relaxed max-w-xs">
              {region.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-warm-white text-sm font-semibold font-display">Navigation</p>
            {NAV_SLUGS.map(({ label, slug }) => (
              <Link
                key={slug}
                href={`/${region.key}/${slug}/`}
                className="text-stone text-sm hover:text-warm-white transition-colors duration-150 w-fit"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-warm-white text-sm font-semibold font-display">Contact</p>
            <a
              href={whatsappUrl}
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

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <p className="text-warm-white text-sm font-semibold font-display">Legal</p>
            <Link
              href={`/${region.key}/privacy/`}
              className="text-stone text-sm hover:text-warm-white transition-colors duration-150 w-fit"
            >
              Privacy Policy
            </Link>
            <Link
              href={`/${region.key}/cookies/`}
              className="text-stone text-sm hover:text-warm-white transition-colors duration-150 w-fit"
            >
              Cookie Policy
            </Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-stone text-sm hover:text-warm-white transition-colors duration-150 w-fit text-left"
            >
              Cookie Settings
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-wire flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-stone text-xs">&copy; {year} Omniviya. All rights reserved.</p>
          <p className="text-stone text-xs">Omniviya is a restaurant operating system · Operating under {region.legalFramework}.</p>
        </div>
      </div>
    </footer>
  )
}
