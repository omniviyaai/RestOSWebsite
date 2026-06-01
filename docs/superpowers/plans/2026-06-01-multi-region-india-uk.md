# Multi-Region (India / UK) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve two regional variants of restos.in (India and UK) from the same domain using Netlify Edge Function geo-routing and Next.js route groups.

**Architecture:** Next.js route groups `(in)/` and `(uk)/` generate static HTML for each region from a single build. A Netlify Edge Function detects visitor country via `context.geo.country` and rewrites requests to the correct prefix. A React Context (`RegionProvider` / `useRegion`) delivers region-specific content (currency, pricing, video, copy) to all components.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS, Framer Motion, Netlify Edge Functions (Deno)

---

### Task 1: Region Config Foundation

**Files:**
- Create: `src/lib/region-config.ts`
- Create: `src/lib/region-context.tsx`

- [ ] **Step 1: Create region-config.ts**

```typescript
// src/lib/region-config.ts
export type Region = 'in' | 'uk'

export interface RegionConfig {
  currency: string
  currencyCode: string
  phonePrefix: string
  paymentGateways: string[]
  siteName: string
  locales: string[]
  badge: string
  tagline: string
  description: string
  heroVideo: string
  geoRegion: string
  geoPlaceName: string
  ogLocale: string
  htmlLang: string
  ogTitle: string
  ogDescription: string
  twitterTitle: string
  twitterDescription: string
}

export const regionConfig: Record<Region, RegionConfig> = {
  in: {
    currency: '\u20B9',
    currencyCode: 'INR',
    phonePrefix: '+91',
    paymentGateways: ['Razorpay', 'Cashfree'],
    siteName: 'RestOS by Omniviya',
    locales: ['en_IN', 'hi'],
    badge: 'NOW LAUNCHING IN INDIA',
    tagline: 'Built For India. Built To Last.',
    description: 'Built for India. The complete operating system for restaurants of every size.',
    heroVideo: '/video/restos-vertical-inr.mp4',
    geoRegion: 'IN',
    geoPlaceName: 'India',
    ogLocale: 'en_IN',
    htmlLang: 'en',
    ogTitle: 'RestOS \u2014 The Operating System For Indian Restaurants',
    ogDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all connected, all in real time, all on devices you already own.',
    twitterTitle: 'RestOS \u2014 The Operating System For Indian Restaurants',
    twitterDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all in real time.',
  },
  uk: {
    currency: '\u00A3',
    currencyCode: 'GBP',
    phonePrefix: '+44',
    paymentGateways: ['Stripe'],
    siteName: 'RestOS UK',
    locales: ['en_GB'],
    badge: 'NOW AVAILABLE IN THE UK',
    tagline: 'Built For UK Restaurants.',
    description: 'Built for the UK. The complete operating system for restaurants of every size.',
    heroVideo: '/video/restos-vertical-gbp.mp4',
    geoRegion: 'GB',
    geoPlaceName: 'United Kingdom',
    ogLocale: 'en_GB',
    htmlLang: 'en',
    ogTitle: 'RestOS \u2014 The Operating System For UK Restaurants',
    ogDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all connected, all in real time.',
    twitterTitle: 'RestOS \u2014 The Operating System For UK Restaurants',
    twitterDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all in real time.',
  },
}
```

- [ ] **Step 2: Create region-context.tsx**

```typescript
'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Region, RegionConfig } from './region-config'
import { regionConfig } from './region-config'

const RegionContext = createContext<RegionConfig>(regionConfig.in)

export function RegionProvider({
  region,
  children,
}: {
  region: Region
  children: ReactNode
}) {
  return (
    <RegionContext.Provider value={regionConfig[region]}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion() {
  return useContext(RegionContext)
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/region-config.ts src/lib/region-context.tsx
git commit -m "feat: add region config and context for India/UK"
```

---

### Task 2: Update Constants to Use Region Config

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Remove region-specific values, keep global ones**

```typescript
// src/lib/constants.ts

export const DEMO_PAGE_URL = '/demo'
export const FOUNDING_PAGE_URL = '/founding'

export const FOUNDING_SPOTS_TOTAL = 10
export const FOUNDING_SPOTS_TAKEN = 0

export const YOUTUBE_VIDEO_ID = 'REPLACE_WITH_YOUR_VIDEO_ID'

export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Founding Partner', href: '/founding' },
  { label: 'About', href: '/about' },
] as const

export const PAIN_STATEMENTS = [
  'A customer complained their order never reached the kitchen.',
  'Your waiter wrote it down wrong. Again.',
  'You found out at closing that 3 tables had billing errors.',
  'You were at home and had no idea what was happening inside.',
  'You lost a regular because the queue was too long.',
] as const

export const TRUST_SIGNALS = [
  {
    title: 'Your money, your account',
    description: 'Payments go directly to your account. We never touch it.',
  },
  {
    title: 'Your data, completely isolated',
    description: 'No other restaurant can ever see your orders, customers, or revenue.',
  },
  {
    title: 'Works on devices you already own',
    description: 'Any phone, tablet, or laptop. No proprietary hardware to buy.',
  },
  {
    title: 'No app download needed',
    description: 'Customers scan a QR code. That is all. No sign-up. No install.',
  },
] as const
```

Note: `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE`, `WHATSAPP_URL` are removed — they move to region config. `TRUST_SIGNALS` removes `Razorpay or Cashfree` from the first item (now generic).

- [ ] **Step 2: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: move region-specific constants to region config"
```

---

### Task 3: Route Group Layouts

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/(in)/layout.tsx`
- Create: `src/app/(uk)/layout.tsx`

- [ ] **Step 1: Update root layout to accept layout params and be region-agnostic**

```typescript
// src/app/layout.tsx
import type { Viewport } from 'next'
import './globals.css'
import { LenisProvider } from '@/components/ui/LenisProvider'
import { ScrollProgressBar } from '@/components/ui/ScrollProgress'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-midnight text-warm-white antialiased">
        <LenisProvider />
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  )
}
```

Remove the `jsonLd` script and all hardcoded metadata from root layout — those will be per-region now.

- [ ] **Step 2: Create (in)/layout.tsx**

```typescript
// src/app/(in)/layout.tsx
import type { Metadata } from 'next'
import { RegionProvider } from '@/lib/region-context'

const baseUrl = 'https://restos.in'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'RestOS \u2014 The Operating System For Indian Restaurants',
    template: '%s \u2014 RestOS',
  },
  description:
    'RestOS is the complete operating system for Indian restaurants. QR code ordering, kitchen display system, waiter app, UPI payments, and real-time analytics.',
  keywords: [
    'restaurant management software India',
    'QR ordering system',
    'kitchen display system',
    'restaurant POS India',
    'Indian restaurant software',
    'QR menu for restaurants',
    'online ordering system restaurant',
    'restaurant analytics platform',
    'cloud kitchen software India',
    'restaurant operating system',
  ],
  authors: [{ name: 'Omniviya' }],
  creator: 'Omniviya',
  publisher: 'Omniviya',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://restos.in/in',
    languages: {
      'en-in': 'https://restos.in/in',
      'en-gb': 'https://restos.in/uk',
    },
  },
  openGraph: {
    title: 'RestOS \u2014 The Operating System For Indian Restaurants',
    description:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all connected, all in real time.',
    url: 'https://restos.in/in',
    siteName: 'RestOS by Omniviya',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RestOS \u2014 Restaurant Operating System',
      },
    ],
    locale: 'en_IN',
    type: 'website',
    countryName: 'India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS \u2014 The Operating System For Indian Restaurants',
    description:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all in real time.',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
  },
}

export default function InLayout({ children }: { children: React.ReactNode }) {
  return <RegionProvider region="in">{children}</RegionProvider>
}
```

- [ ] **Step 3: Create (uk)/layout.tsx**

```typescript
// src/app/(uk)/layout.tsx
import type { Metadata } from 'next'
import { RegionProvider } from '@/lib/region-context'

const baseUrl = 'https://restos.in'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'RestOS \u2014 The Operating System For UK Restaurants',
    template: '%s \u2014 RestOS',
  },
  description:
    'RestOS is the complete operating system for UK restaurants. QR code ordering, kitchen display system, waiter app, and real-time analytics.',
  keywords: [
    'restaurant management software UK',
    'QR ordering system',
    'kitchen display system',
    'restaurant POS UK',
    'UK restaurant software',
    'QR menu for restaurants',
    'online ordering system restaurant',
    'restaurant analytics platform',
    'restaurant operating system',
  ],
  authors: [{ name: 'Omniviya' }],
  creator: 'Omniviya',
  publisher: 'Omniviya',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://restos.in/uk',
    languages: {
      'en-gb': 'https://restos.in/uk',
      'en-in': 'https://restos.in/in',
    },
  },
  openGraph: {
    title: 'RestOS \u2014 The Operating System For UK Restaurants',
    description:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all connected, all in real time.',
    url: 'https://restos.in/uk',
    siteName: 'RestOS UK',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RestOS \u2014 Restaurant Operating System',
      },
    ],
    locale: 'en_GB',
    type: 'website',
    countryName: 'United Kingdom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS \u2014 The Operating System For UK Restaurants',
    description:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all in real time.',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'GB',
    'geo.placename': 'United Kingdom',
  },
}

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <RegionProvider region="uk">{children}</RegionProvider>
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/\(in\)/layout.tsx src/app/\(uk\)/layout.tsx
git commit -m "feat: add route group layouts for India and UK with SEO metadata"
```

---

### Task 4: Route Group Page Wrappers

**Files:**
- Create: `src/app/(in)/page.tsx`
- Create: `src/app/(in)/pricing/page.tsx` (with India-specific metadata)
- Create: `src/app/(in)/features/page.tsx`
- Create: `src/app/(in)/founding/page.tsx`
- Create: `src/app/(in)/about/page.tsx`
- Create: `src/app/(in)/demo/page.tsx`
- Create: `src/app/(uk)/page.tsx`
- Create: `src/app/(uk)/pricing/page.tsx` (with UK-specific metadata)
- Create: `src/app/(uk)/features/page.tsx`
- Create: `src/app/(uk)/founding/page.tsx`
- Create: `src/app/(uk)/about/page.tsx`
- Create: `src/app/(uk)/demo/page.tsx`

Each route group page re-exports the component from the existing page (which stays as-is) AND re-defines metadata. The route group layout metadata merges with page metadata — page metadata wins for conflicting fields.

Example pattern for each page:

- [ ] **Step 1: Home page wrappers**

```typescript
// src/app/(in)/page.tsx
export { default } from '@/app/page'
```

```typescript
// src/app/(uk)/page.tsx
export { default } from '@/app/page'
```

- [ ] **Step 2: Pricing page wrappers**

```typescript
// src/app/(in)/pricing/page.tsx
import type { Metadata } from 'next'
export { default } from '@/app/pricing/page'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, honest pricing for Indian restaurants. 10 Founding Partner spots available — first 90 days completely free.',
  openGraph: {
    title: 'RestOS Pricing — Simple, Honest, No Hidden Fees',
    description: 'Founding Partner pricing for Indian restaurants.',
    url: 'https://restos.in/in/pricing',
  },
  alternates: { canonical: 'https://restos.in/in/pricing' },
}
```

```typescript
// src/app/(uk)/pricing/page.tsx
import type { Metadata } from 'next'
export { default } from '@/app/pricing/page'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, honest pricing for UK restaurants. Get started with RestOS today.',
  openGraph: {
    title: 'RestOS Pricing — Simple, Honest, No Hidden Fees',
    description: 'Pricing for UK restaurants.',
    url: 'https://restos.in/uk/pricing',
  },
  alternates: { canonical: 'https://restos.in/uk/pricing' },
}
```

- [ ] **Step 3: Create remaining page wrappers** following the same pattern:

Each region gets wrappers for: features, founding, about, demo.

For **India** pages use:
- canonical: `https://restos.in/in/{page}`
- India-focused descriptions

For **UK** pages use:
- canonical: `https://restos.in/uk/{page}`
- UK-focused descriptions

- [ ] **Step 4: Update NavLinks hrefs in existing pages**

In `src/app/pricing/page.tsx`, `features/page.tsx`, `founding/page.tsx`, `about/page.tsx`, `demo/page.tsx`: the Breadcrumb JSON-LD and any hardcoded URLs pointing to `https://restos.in/{page}` need to be updated. Since these pages are shared, we need to make these dynamic.

The simplest fix: change JSON-LD breadcrumb URLs to be relative (remove `https://restos.in/` prefix) so they work for both regions. But JSON-LD needs absolute URLs...

Better approach: remove hardcoded India-specific JSON-LD from the shared page components and move them to the route group page wrappers. The route group page wrappers can inject the JSON-LD scripts.

Actually, the simplest approach for this plan: keep the existing pages as-is for India, and for UK wrappers, create UK-specific JSON-LD if needed. The India wrappers re-export the existing page (which has India-specific SEO). The UK wrappers will need their own.

For simplicity: update the existing page files to use `region-config` for dynamic values. But that requires making the page components `'use client'` or using `generateMetadata`... 

Actually, let me keep this practical: for NOW, the India pages re-export the existing pages with their existing metadata. The UK pages get new wrappers with UK metadata. The breadcrumb URLs in existing pages point to `https://restos.in/{page}` which will redirect to `/in/{page}` via the Edge Function — so they'll work fine.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(in\)/ src/app/\(uk\)/
git commit -m "feat: add route group page wrappers for all 6 pages"
```

---

### Task 5: Update Hero and TiltedDevice Components

**Files:**
- Modify: `src/components/home/Hero.tsx`
- Modify: `src/components/ui/TiltedDevice.tsx`

- [ ] **Step 1: Update TiltedDevice to accept videoSrc prop**

```typescript
// src/components/ui/TiltedDevice.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, type MotionValue } from 'framer-motion'

interface TiltedDeviceProps {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  videoSrc?: string
}

export function TiltedDevice({ rotateX, rotateY, videoSrc = '/video/restos-flow.mp4' }: TiltedDeviceProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  // ... rest stays the same

  // Update the video source element:
  return (
    // ...
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ filter: 'brightness(0.85) saturate(0.9)' }}
      key={videoSrc} // key forces re-mount when video changes
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
    // ...
  )
}
```

- [ ] **Step 2: Update Hero to use region for badge, tagline, and video**

```typescript
// src/components/home/Hero.tsx
// Add import:
import { useRegion } from '@/lib/region-context'

// Inside Hero function:
export function Hero() {
  const region = useRegion()
  // ... rest of the function

  // Change badge text:
  {region.badge}

  // Change tagline:
  {region.tagline}

  // Change description:
  RestOS is the complete operating system for {region.geoPlaceName === 'India' ? 'Indian' : 'UK'} restaurants.

  // Pass video src to TiltedDevice:
  <TiltedDevice
    rotateX={deviceRotateX}
    rotateY={deviceRotateY}
    videoSrc={region.heroVideo}
  />
}
```

Specific changes in Hero.tsx:
- Line 128: `NOW LAUNCHING IN INDIA` → `{region.badge}`
- Line 190: `It's time to flip that.` → `{region.tagline}`
- Line 201-202: `RestOS is the complete operating system for Indian restaurants.` → `RestOS is the complete operating system for ${region.geoPlaceName === 'India' ? 'Indian' : 'UK'} restaurants.`
- Line 241-244: Pass `videoSrc={region.heroVideo}` to TiltedDevice

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Hero.tsx src/components/ui/TiltedDevice.tsx
git commit -m "feat: region-aware Hero with dynamic badge, tagline, and video"
```

---

### Task 6: Update Navbar for Region Picker

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Add region picker toggle**

```typescript
// Add to imports:
import { useRegion } from '@/lib/region-context'
import type { Region } from '@/lib/region-config'
import { useRouter, usePathname } from 'next/navigation'

// Add state and effect:
const region = useRegion()
const router = useRouter()
const pathname = usePathname()

const currentRegion: Region = (typeof window !== 'undefined' && document.cookie.includes('region=uk')) ? 'uk' : 'in'

function switchRegion(target: Region) {
  const path = pathname.replace(/^\/(in|uk)/, '')
  document.cookie = `region=${target}; path=/; max-age=31536000`
  router.push(`/${target}${path}`)
}
```

Add the region picker in the navbar alongside the existing buttons (after line 93):

```tsx
<div className="hidden md:flex items-center gap-2 mr-2">
  <button
    onClick={() => switchRegion('in')}
    className={`px-2 py-1 text-xs rounded font-mono transition-colors ${
      currentRegion === 'in' ? 'bg-ember/20 text-ember' : 'text-stone hover:text-warm-white'
    }`}
  >
    IN
  </button>
  <button
    onClick={() => switchRegion('uk')}
    className={`px-2 py-1 text-xs rounded font-mono transition-colors ${
      currentRegion === 'uk' ? 'bg-ember/20 text-ember' : 'text-stone hover:text-warm-white'
    }`}
  >
    UK
  </button>
</div>
```

Also update `WHATSAPP_URL` usage — make it dynamic from region config. Since the Navbar is a `'use client'` component, it can call `useRegion()`.

Add `WHATSAPP_NUMBER` to region config:

```typescript
// Add to RegionConfig interface and regionConfig object:
whatsappNumber: string
```

With values:
- in: `'919XXXXXXXXX'`
- uk: `'447XXXXXXXXX'`

Then in Navbar, derive WhatsApp URL:

```typescript
const WHATSAPP_URL = `https://wa.me/${region.whatsappNumber}?text=${encodeURIComponent('Hi, I want to know more about RestOS')}`
```

Also update the Navbar logo link href — should link to the current region's root (`/in` or `/uk`):

```typescript
<Link href={`/${currentRegion}`} ...>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx src/lib/region-config.ts
git commit -m "feat: add region picker toggle to navbar"
```

---

### Task 7: Update Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Make Footer region-aware**

Since Footer is a server component currently, we need to either make it a client component or pass region as a prop. Simpler: make it a client component that reads from `useRegion()`.

```typescript
'use client'

import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'
import { Logo } from '@/components/ui/Logo'
import { useRegion } from '@/lib/region-context'

export function Footer() {
  const region = useRegion()
  const year = new Date().getFullYear()

  const WHATSAPP_URL = `https://wa.me/${region.whatsappNumber}?text=${encodeURIComponent('Hi, I want to know more about RestOS')}`

  return (
    <footer className="border-t border-wire bg-carbon">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo variant="full" />
            <p className="text-stone text-sm leading-relaxed max-w-xs">
              {region.description}
            </p>
          </div>

          {/* Navigation — same */}
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
          <p className="text-stone text-xs">&copy; {year} Omniviya. All rights reserved.</p>
          <p className="text-stone text-xs">RestOS is a product of Omniviya</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: region-aware footer with dynamic phone and description"
```

---

### Task 8: Update Trust Section Payment Gateway Text

**Files:**
- Modify: `src/components/home/TrustSection.tsx`

- [ ] **Step 1: Make payment gateway text region-aware**

```typescript
// Add to imports:
import { useRegion } from '@/lib/region-context'

// Inside component:
const region = useRegion()

// Change line 33 in constants.ts description — but since TRUST_SIGNALS is in constants,
// the simplest approach: override the description in TrustSection component
// or make TRUST_SIGNALS a function that takes region config.

// Option A (simpler): In TrustSection, replace the description text:
const signals = TRUST_SIGNALS.map((s, i) => {
  if (i === 0) {
    return {
      ...s,
      description: `Payments go directly to your ${region.paymentGateways.join(' or ')} account. We never touch it.`
    }
  }
  return s
})
```

Use `signals` instead of `TRUST_SIGNALS` in the component render.

- [ ] **Step 2: Commit**

```bash
git add src/components/home/TrustSection.tsx
git commit -m "feat: region-aware payment gateway names in trust section"
```

---

### Task 9: Update DemoVideo Section

**Files:**
- Modify: `src/components/home/DemoVideo.tsx`
- Modify: `src/components/ui/LiteYoutube.tsx` (if needed)

The DemoVideo section is shared — it shows a YouTube embed. No region-specific changes needed unless the YouTube video differs by region. If it does, accept a `videoId` prop or read from region config.

- [ ] **Step 1: (Conditional) Make LiteYoutube videoId configurable per region**

Add to region config:

```typescript
youtubeVideoId: string
```

- in: `'REPLACE_WITH_YOUR_VIDEO_ID'`
- uk: `'REPLACE_WITH_UK_VIDEO_ID'`

Update DemoVideo:

```typescript
import { useRegion } from '@/lib/region-context'

export function DemoVideo() {
  const region = useRegion()
  // ...
  <LiteYoutube videoId={region.youtubeVideoId} title="RestOS Product Demo" />
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/DemoVideo.tsx src/lib/region-config.ts
git commit -m "feat: region-specific YouTube video ID"
```

---

### Task 10: Update Pricing Page

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: Remove hardcoded pricing copy and use region config**

Since the pricing page is a server component with hardcoded India references, convert it to use the region context by wrapping its content in a client component.

Create a `PricingContent` client component that reads from `useRegion()` and renders the pricing-specific content (amounts, currency, etc.). The page file will import and render it.

For this plan, the simplest approach: update the hardcoded strings in the pricing page to reference region config values.

Since the pricing page is currently a server component with its own layout (Navbar/Footer), the route group wrappers will provide their own layout. The PricingPage component itself should be region-aware.

The simplest change: move the PricingPage body content into a client component.

- [ ] **Step 2: Commit**

```bash
git add src/app/pricing/page.tsx
git commit -m "feat: region-aware pricing page"
```

---

### Task 11: Update Other Pages (Features, About, Founding, Demo)

**Files:**
- Modify: `src/app/features/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/founding/page.tsx`
- Modify: `src/app/demo/page.tsx`

Each of these pages references `WHATSAPP_URL` from constants. Since `WHATSAPP_URL` was removed from constants, they need to derive it from region config.

- [ ] **Step 1: Update each page's WhatsApp reference**

Each page currently imports:
```typescript
import { WHATSAPP_URL } from '@/lib/constants'
```

Change all such imports to use a `getWhatsAppUrl()` helper that takes the region, or wrap the pages in client components that use `useRegion()`.

Simplest approach: Create a helper function that each page can call:

```typescript
// src/lib/region-config.ts (add)
export function getWhatsAppUrl(region: Region): string {
  const number = regionConfig[region].whatsappNumber
  const message = 'Hi, I want to know more about RestOS'
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
```

Then update each page to pass the region and use this function. This requires each page to know its region. Since these are server components, add a `region` export to each route group page:

```typescript
// src/app/(in)/about/page.tsx
import type { Metadata } from 'next'
export { default } from '@/app/about/page'
export const region = 'in' as const
// metadata...
```

Then each page reads it. But props don't flow from route group pages to the actual page component...

Alternative: Keep it simpler. Add a `WHATSAPP_URL` constant back to constants.ts but make it a function, or just add the UK number and derive it.

For the plan: the simplest working approach is to:
1. Keep `WHATSAPP_NUMBER` in constants.ts as the India default
2. Add `UK_WHATSAPP_NUMBER` for UK
3. Create a dynamic helper or just inline it

Actually, the cleanest way: Each page that needs WhatsApp creates a client sub-component that uses `useRegion()`. But that's heavy refactoring for this plan.

Simplest practical approach for now:
- Keep `WHATSAPP_NUMBER = '919XXXXXXXXX'` in constants for backward compat
- Add `UK_WHATSAPP_NUMBER = '447XXXXXXXXX'`
- Add a `getWhatsAppUrl(region?: Region)` helper
- Each route group layout provides the region somehow

Actually the absolute simplest: just patch each existing page. The Navbar and Footer already handle WhatsApp dynamically. The only pages that use `WHATSAPP_URL` directly in the page body are features, about, founding, and demo pages. These are mostly just links in Button components.

In practice, re-checking the pages:
- `features/page.tsx` - uses `WHATSAPP_URL` in CTA buttons
- `about/page.tsx` - uses `WHATSAPP_URL` in CTA buttons
- `founding/page.tsx` - uses `WHATSAPP_URL` in CTA buttons
- `demo/page.tsx` - uses `WHATSAPP_URL` in CTA buttons

For all of these, the WhatsApp button is in a CTA section. Since the edge function handles geo-routing and the Navbar/Footer are already region-aware, the WhatsApp URL used in page-body CTAs also needs to be region-aware.

Simplest fix: In each page, compute the WhatsApp URL dynamically using a small inline approach. Since these are server components, we can use a constant export trick:

Actually, let me just make the pages work by keeping a default export. The absolute simplest: have each route group page pass the region somehow.

OK this is getting too detailed for the plan. Let me abstract it: for each of these 4 pages, the WhatsApp URL in CTAs and JSON-LD breadcrumbs needs to be region-aware. The approach: use a client sub-component `WhatsAppButton` that reads from `useRegion()` for the URL, and keep the rest of the page server-side.

- [ ] **Step 3: Commit**

```bash
git add src/app/features/page.tsx src/app/about/page.tsx src/app/founding/page.tsx src/app/demo/page.tsx
git commit -m "feat: region-aware WhatsApp links in page CTAs"
```

---

### Task 12: Edge Function and Netlify Config

**Files:**
- Create: `netlify/edge-functions/geo-route.ts`
- Create: `netlify.toml`

- [ ] **Step 1: Create the Edge Function**

```typescript
// netlify/edge-functions/geo-route.ts
import type { Context } from 'netlify:edge'

export default async (req: Request, ctx: Context) => {
  const url = new URL(req.url)

  // Pass through static assets and region-prefixed paths
  if (
    url.pathname.startsWith('/in/') ||
    url.pathname.startsWith('/uk/') ||
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/video/') ||
    url.pathname.startsWith('/og-image') ||
    url.pathname.startsWith('/favicon') ||
    url.pathname.match(/\.\w+$/) // any file extension
  ) {
    return
  }

  // Check manual override cookie
  const cookies = req.headers.get('cookie') || ''
  const regionCookie = cookies.match(/region=(in|uk)/)?.[1]
  if (regionCookie) {
    return ctx.rewrite(new URL(`/${regionCookie}${url.pathname}`, req.url))
  }

  // Geo detect — default to India for unknown countries
  const country = ctx.geo.country
  const prefix = country === 'GB' ? '/uk' : '/in'
  return ctx.rewrite(new URL(`${prefix}${url.pathname}`, req.url))
}
```

- [ ] **Step 2: Create netlify.toml**

```toml
# netlify.toml
[build]
  command = "npx next build && npx next export"
  publish = "out/"

[[edge_functions]]
  function = "geo-route"
  path = "/*"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/video/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

- [ ] **Step 3: Update next.config.ts for Netlify Edge compat**

```typescript
// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Skip the default _next/static rewrite that conflicts with Edge Function
  skipMiddlewareUrlNormalize: true,
}

export default nextConfig
```

- [ ] **Step 4: Commit**

```bash
git add netlify.toml netlify/edge-functions/geo-route.ts next.config.ts
git commit -m "feat: add Netlify Edge Function geo-routing and deploy config"
```

---

### Task 13: Add .superpowers to .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Append .superpowers/ to .gitignore**

```
.superpowers/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers directory"
```

---

### Task 14: Build and Verify

- [ ] **Step 1: Run the full build**

```bash
npx next build && npx next export
```

Expected output:
```
out/
├── in/
│   ├── index.html
│   ├── pricing/index.html
│   ├── features/index.html
│   ├── founding/index.html
│   ├── about/index.html
│   └── demo/index.html
├── uk/
│   ├── index.html
│   ├── pricing/index.html
│   ├── features/index.html
│   ├── founding/index.html
│   ├── about/index.html
│   └── demo/index.html
├── video/
│   ├── restos-flow.mp4
│   ├── restos-vertical-inr.mp4
│   └── restos-vertical-gbp.mp4
└── ... (static assets)
```

- [ ] **Step 2: Verify India pages have India-specific content**

Check `out/in/index.html` for:
- Badge: `NOW LAUNCHING IN INDIA`
- Currency: INR references
- Video: `/video/restos-vertical-inr.mp4`

- [ ] **Step 3: Verify UK pages have UK-specific content**

Check `out/uk/index.html` for:
- Badge: `NOW AVAILABLE IN THE UK`
- Currency: GBP references
- Video: `/video/restos-vertical-gbp.mp4`

- [ ] **Step 4: Deploy to Netlify**

Connect the repo to Netlify. The `netlify.toml` handles build and edge function config. No environment variables needed.

- [ ] **Step 5: Verify live**

Visit `https://restos.in/uk/` — should show UK content.
Visit `https://restos.in/in/` — should show India content.
Visit `https://restos.in/` from a UK IP — should rewrite to `/uk/`.
Visit `https://restos.in/` from an India IP — should rewrite to `/in/`.
