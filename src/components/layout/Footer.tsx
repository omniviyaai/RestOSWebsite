'use client'

import Link from 'next/link'
import { NAV_SLUGS } from '@/lib/constants'
import { Logo } from '@/components/ui/Logo'
import { useRegion } from '@/lib/region-context'
import { openCookieSettings } from '@/components/features/CookieConsentBanner'

declare global {
  interface Window {
    MIVI?: { open: () => void; close: () => void; toggle: () => void }
  }
}

const STAFF_LOGIN    = 'https://restos.omniviya.in/staff/login'
const ADMIN_LOGIN    = 'https://restos.omniviya.in/admin/login'
const ADMIN_REGISTER = 'https://restos.omniviya.in/admin/register'

export function Footer() {
  const region = useRegion()
  const year   = new Date().getFullYear()

  return (
    <footer className="relative bg-carbon overflow-hidden">
      {/* Glowing top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
      <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-ember/5 to-transparent pointer-events-none" />

      {/* Subtle mesh in footer background */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

          {/* Brand — 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Logo variant="full" />
            <p className="text-stone/80 text-sm leading-relaxed max-w-xs">
              {region.description}
            </p>
            {/* Region badge */}
            <div className="flex items-center gap-2 mt-1">
              <span className="status-dot-live scale-75" />
              <span className="text-teal/70 text-xs font-mono">{region.badge}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="text-warm-white text-sm font-semibold font-display mb-1">Explore</p>
            {NAV_SLUGS.map(({ label, slug }) => (
              <Link
                key={slug}
                href={`/${region.key}/${slug}/`}
                className="text-stone/70 text-sm hover:text-warm-white transition-colors duration-150 w-fit"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* App Access */}
          <div className="flex flex-col gap-3">
            <p className="text-warm-white text-sm font-semibold font-display mb-1">App Access</p>
            <a href={STAFF_LOGIN} target="_blank" rel="noopener noreferrer"
               className="text-stone/70 text-sm hover:text-warm-white transition-colors duration-150 w-fit">
              Staff Login
            </a>
            <a href={ADMIN_LOGIN} target="_blank" rel="noopener noreferrer"
               className="text-stone/70 text-sm hover:text-ember transition-colors duration-150 w-fit">
              Admin Login
            </a>
            <a href={ADMIN_REGISTER} target="_blank" rel="noopener noreferrer"
               className="text-teal text-sm hover:text-teal/80 transition-colors duration-150 w-fit font-medium">
              Register Free →
            </a>
          </div>

          {/* Contact + Legal */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-warm-white text-sm font-semibold font-display mb-1">Contact</p>
              <button type="button" onClick={() => window.MIVI?.open?.()}
                 className="text-stone/70 text-sm hover:text-warm-white transition-colors duration-150 w-fit text-left">
                Talk to MIVI
              </button>
              <a href="mailto:hello@omniviya.in"
                 className="text-stone/70 text-sm hover:text-warm-white transition-colors duration-150 w-fit">
                hello@omniviya.in
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-warm-white text-sm font-semibold font-display mb-1">Legal</p>
              <Link href={`/${region.key}/privacy/`}
                className="text-stone/70 text-sm hover:text-warm-white transition-colors duration-150 w-fit">
                Privacy Policy
              </Link>
              <Link href={`/${region.key}/cookies/`}
                className="text-stone/70 text-sm hover:text-warm-white transition-colors duration-150 w-fit">
                Cookie Policy
              </Link>
              <button type="button" onClick={openCookieSettings}
                className="text-stone/70 text-sm hover:text-warm-white transition-colors duration-150 w-fit text-left">
                Cookie Settings
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-wire/50 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-stone/40 text-xs">&copy; {year} Omniviya. All rights reserved.</p>
          <p className="text-stone/40 text-xs">
            Operating under {region.legalFramework}.
          </p>
        </div>

        {/* Brand credit */}
        <div className="mt-6 pt-5 border-t border-wire/20 flex justify-center">
          <a
            href="https://omniviya.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 opacity-50 hover:opacity-90 transition-opacity duration-200 group"
            aria-label="Developed by Omniviya"
          >
            <span className="text-stone/60 text-[11px] tracking-wide">Developed by</span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 260 260"
              aria-hidden="true"
              className="flex-shrink-0 animate-spin"
              style={{ animationDuration: '8s', animationTimingFunction: 'linear' }}
            >
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
              style={{ fontFamily: "var(--font-cinzel), serif", fontWeight: 900, fontSize: '13px', letterSpacing: '4px' }}
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
