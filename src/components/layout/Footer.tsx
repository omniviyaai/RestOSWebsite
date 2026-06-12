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

        {/* Developed by Omniviya */}
        <div className="mt-6 pt-5 border-t border-wire/40 flex justify-center">
          <a
            href="https://omniviya.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity duration-200 group"
            aria-label="Developed by Omniviya"
          >
            <span className="text-stone text-[11px] tracking-wide">Developed by</span>
            <svg width="22" height="22" viewBox="0 0 260 260" aria-hidden="true" className="flex-shrink-0">
              <polygon points="130,14 136,78 130,90 124,78" fill="#E8732A"/>
              <polygon points="130,14 136,78 130,90 124,78" fill="#0A8A7C" transform="rotate(45 130 130)"/>
              <polygon points="130,14 136,78 130,90 124,78" fill="#C8A84B" transform="rotate(90 130 130)"/>
              <polygon points="130,14 136,78 130,90 124,78" fill="#0A8A7C" transform="rotate(135 130 130)"/>
              <polygon points="130,14 136,78 130,90 124,78" fill="#E8732A" transform="rotate(180 130 130)"/>
              <polygon points="130,14 136,78 130,90 124,78" fill="#0A8A7C" transform="rotate(225 130 130)"/>
              <polygon points="130,14 136,78 130,90 124,78" fill="#C8A84B" transform="rotate(270 130 130)"/>
              <polygon points="130,14 136,78 130,90 124,78" fill="#0A8A7C" transform="rotate(315 130 130)"/>
              <circle cx="130" cy="130" r="90" fill="none" stroke="#E8732A" strokeWidth="1.2" opacity=".2"/>
              <circle cx="130" cy="130" r="14" fill="#E8732A"/>
              <circle cx="130" cy="130" r="7" fill="#F8F5F0"/>
            </svg>
            <span
              style={{ fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: '13px', letterSpacing: '4px' }}
              className="text-[#F0EDE8] group-hover:text-white transition-colors duration-200"
            >
              <span style={{ color: '#E8732A' }}>OMNI</span>VIYA
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
