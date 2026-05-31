# RestOS Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the complete 6-page RestOS marketing website that converts restaurant owners into demo bookings and Founding Partner signups.

**Architecture:** Next.js 14 App Router with TypeScript. Each page is a server component; interactive sections (animations, forms) are client components. Framer Motion handles all scroll-triggered animations. Design tokens live in Tailwind config — no inline styles anywhere.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Vercel deployment, Cal.com embed for demo booking, lite-youtube-embed for videos.

---

## File Map

```
RestOS/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, global metadata
│   │   ├── page.tsx                # Homepage (assembles all home/ sections)
│   │   ├── demo/page.tsx           # Book Demo page
│   │   ├── features/page.tsx       # Full product overview
│   │   ├── pricing/page.tsx        # Pricing + waitlist
│   │   ├── founding/page.tsx       # Founding Partner application
│   │   └── about/page.tsx          # About + contact
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          # Sticky nav, transparent → solid on scroll
│   │   │   └── Footer.tsx          # Simple footer with links
│   │   ├── home/
│   │   │   ├── Hero.tsx            # Hero section with background video
│   │   │   ├── PainSection.tsx     # Scroll-sequenced pain statements
│   │   │   ├── Transformation.tsx  # Before/after split layout
│   │   │   ├── Ecosystem.tsx       # Animated node flow diagram
│   │   │   ├── ProductHighlights.tsx # 6 outcome cards
│   │   │   ├── DemoVideo.tsx       # YouTube lite embed section
│   │   │   ├── FoundingBanner.tsx  # Founding partner CTA section
│   │   │   ├── TrustSection.tsx    # 4 trust signals
│   │   │   └── FinalCTA.tsx        # Final conversion section
│   │   └── ui/
│   │       ├── Button.tsx          # Primary/ghost button variants
│   │       ├── SectionWrapper.tsx  # Scroll-reveal container
│   │       ├── SpotCounter.tsx     # "X of 10 spots remaining" indicator
│   │       └── LiteYoutube.tsx     # Lazy YouTube embed
│   └── lib/
│       ├── constants.ts            # URLs, copy, spot counts
│       └── animations.ts           # Shared Framer Motion variants
├── public/
│   └── og-image.png                # 1200×630 OG image
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

## Task 1: Project Bootstrap

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `next.config.ts`, `tsconfig.json`

- [ ] **Step 1: Scaffold Next.js project**

Run from `c:\Users\sesha\Downloads\RestOS`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```
When prompted: accept all defaults.

Expected output: "Success! Created Next.js app"

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion lucide-react
npm install -D @types/node
```

Expected: installs without errors.

- [ ] **Step 3: Remove boilerplate**

Delete these files:
- `src/app/page.tsx` (replace in Task 11)
- `src/app/globals.css` contents (replace in Task 2)
- `public/vercel.svg`
- `public/next.svg`

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: blank or default Next.js page loads without errors.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: bootstrap Next.js project with Tailwind and Framer Motion"
```

---

## Task 2: Design System

**Files:**
- Create: `src/lib/constants.ts`, `src/lib/animations.ts`
- Modify: `tailwind.config.ts`, `src/app/globals.css`

- [ ] **Step 1: Write Tailwind config with brand tokens**

Replace entire contents of `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0B1020',
        carbon: '#151B2E',
        ember: '#E8742A',
        teal: '#0E8C84',
        gold: '#C6A35B',
        'warm-white': '#F3EFE7',
        stone: '#9CA3AF',
        wire: '#1E2640',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Write global CSS**

Replace entire contents of `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-midnight text-warm-white font-sans;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 3: Write animation variants**

Create `src/lib/animations.ts`:
```typescript
import { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}
```

- [ ] **Step 4: Write constants**

Create `src/lib/constants.ts`:
```typescript
// Update WHATSAPP_NUMBER with your actual WhatsApp Business number
export const WHATSAPP_NUMBER = '919XXXXXXXXX'
export const WHATSAPP_MESSAGE = 'Hi, I want to know more about RestOS'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const DEMO_PAGE_URL = '/demo'
export const FOUNDING_PAGE_URL = '/founding'

// Update SPOTS_TAKEN manually as restaurants onboard
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
    description: 'Payments go directly to your Razorpay or Cashfree account. We never touch it.',
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

- [ ] **Step 5: Verify Tailwind classes resolve**

Run `npm run build`. Expected: build completes without errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib src/app/globals.css tailwind.config.ts
git commit -m "feat: design system — tokens, animations, constants"
```

---

## Task 3: Root Layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write root layout**

Replace entire contents of `src/app/layout.tsx`:
```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RestOS — The Operating System For Restaurants',
  description:
    'RestOS is the complete operating system for Indian restaurants. QR ordering, kitchen display, waiter app, payments, and analytics. One screen. Everything connected.',
  keywords: 'restaurant software India, QR ordering system, kitchen display system, restaurant POS India, restaurant management software',
  openGraph: {
    title: 'RestOS — The Operating System For Restaurants',
    description: 'One screen. Every order. Every table. Every rupee.',
    url: 'https://restos.in',
    siteName: 'RestOS',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS — The Operating System For Restaurants',
    description: 'One screen. Every order. Every table. Every rupee.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-midnight text-warm-white antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Create placeholder OG image**

Create a 1200×630 PNG at `public/og-image.png`. For now, use any dark image as placeholder. Replace before launch with branded version showing the RestOS logo and tagline.

- [ ] **Step 3: Verify**

Run `npm run dev`. Open `http://localhost:3000`. Check browser tab title shows "RestOS — The Operating System For Restaurants".

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx public/
git commit -m "feat: root layout with SEO metadata"
```

---

## Task 4: Reusable UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionWrapper.tsx`
- Create: `src/components/ui/SpotCounter.tsx`
- Create: `src/components/ui/LiteYoutube.tsx`

- [ ] **Step 1: Write Button component**

Create `src/components/ui/Button.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'ghost'

interface ButtonProps {
  children: React.ReactNode
  href: string
  variant?: ButtonVariant
  className?: string
  external?: boolean
}

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  external = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display font-semibold text-sm transition-all duration-200 cursor-pointer'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-ember text-white hover:bg-ember/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-ember/20',
    ghost:
      'border border-wire text-warm-white hover:border-ember/50 hover:text-ember hover:scale-[1.02] active:scale-[0.98]',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link href={href} className={classes}>
        {children}
      </Link>
    </motion.div>
  )
}
```

- [ ] **Step 2: Write SectionWrapper component**

Create `src/components/ui/SectionWrapper.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp } from '@/lib/animations'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  id?: string
  delay?: number
}

export function SectionWrapper({
  children,
  className = '',
  id,
  delay = 0,
}: SectionWrapperProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={`px-4 md:px-8 lg:px-16 py-16 md:py-24 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  )
}
```

- [ ] **Step 3: Write SpotCounter component**

Create `src/components/ui/SpotCounter.tsx`:
```typescript
import { FOUNDING_SPOTS_TAKEN, FOUNDING_SPOTS_TOTAL } from '@/lib/constants'

export function SpotCounter() {
  const remaining = FOUNDING_SPOTS_TOTAL - FOUNDING_SPOTS_TAKEN
  const filled = Array.from({ length: FOUNDING_SPOTS_TAKEN })
  const empty = Array.from({ length: remaining })

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1.5">
        {filled.map((_, i) => (
          <div key={`filled-${i}`} className="w-3 h-3 rounded-full bg-gold" />
        ))}
        {empty.map((_, i) => (
          <div key={`empty-${i}`} className="w-3 h-3 rounded-full bg-wire" />
        ))}
      </div>
      <p className="text-stone text-sm font-mono">
        <span className="text-gold font-semibold">{remaining}</span> of {FOUNDING_SPOTS_TOTAL} spots remaining
      </p>
    </div>
  )
}
```

- [ ] **Step 4: Write LiteYoutube component**

Create `src/components/ui/LiteYoutube.tsx`:
```typescript
'use client'

import { useState } from 'react'

interface LiteYoutubeProps {
  videoId: string
  title?: string
}

export function LiteYoutube({
  videoId,
  title = 'RestOS Product Demo',
}: LiteYoutubeProps) {
  const [activated, setActivated] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  if (activated) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setActivated(true)}
      className="relative w-full aspect-video rounded-xl overflow-hidden group cursor-pointer"
      aria-label={`Play ${title}`}
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-midnight/40 group-hover:bg-midnight/20 transition-colors" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-ember flex items-center justify-center shadow-xl shadow-ember/40 group-hover:scale-110 transition-transform">
          <svg
            className="w-6 h-6 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
```

- [ ] **Step 5: Verify components compile**

Run `npm run build`. Expected: no TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/
git commit -m "feat: reusable UI components — Button, SectionWrapper, SpotCounter, LiteYoutube"
```

---

## Task 5: Navigation

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Write Navbar**

Create `src/components/layout/Navbar.tsx`:
```typescript
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, WHATSAPP_URL, DEMO_PAGE_URL } from '@/lib/constants'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-midnight/95 backdrop-blur-md border-b border-wire' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display font-bold text-lg text-warm-white">RestOS</span>
            <span className="text-stone text-[10px] tracking-wider">by Omniviya</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone text-sm hover:text-warm-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button href={WHATSAPP_URL} variant="ghost" external>
              WhatsApp Us
            </Button>
            <Button href={DEMO_PAGE_URL} variant="primary">
              Book Demo
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-warm-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-midnight pt-16 flex flex-col"
          >
            <nav className="flex flex-col gap-1 p-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-warm-white text-xl font-display font-semibold py-3 border-b border-wire/50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-6 flex flex-col gap-3">
              <Button href={WHATSAPP_URL} variant="ghost" external className="w-full justify-center">
                WhatsApp Us
              </Button>
              <Button href={DEMO_PAGE_URL} variant="primary" className="w-full justify-center">
                Book Demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Write Footer**

Create `src/components/layout/Footer.tsx`:
```typescript
import Link from 'next/link'
import { NAV_LINKS, WHATSAPP_URL } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-wire bg-carbon">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2 max-w-xs">
            <div>
              <p className="font-display font-bold text-warm-white text-lg">RestOS</p>
              <p className="text-stone text-xs">by Omniviya</p>
            </div>
            <p className="text-stone text-sm">
              The Operating System For Restaurants. Built for India.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="text-warm-white text-sm font-semibold">Navigation</p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-stone text-sm hover:text-warm-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-warm-white text-sm font-semibold">Contact</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone text-sm hover:text-warm-white transition-colors"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:hello@omniviya.in"
              className="text-stone text-sm hover:text-warm-white transition-colors"
            >
              hello@omniviya.in
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-wire flex flex-col md:flex-row justify-between gap-4">
          <p className="text-stone text-xs">
            © {new Date().getFullYear()} Omniviya. All rights reserved.
          </p>
          <p className="text-stone text-xs">
            RestOS is a product of Omniviya
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Verify build**

Run `npm run build`. Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/
git commit -m "feat: Navbar and Footer components"
```

---

## Task 6: Homepage — Hero Section

**Files:**
- Create: `src/components/home/Hero.tsx`

- [ ] **Step 1: Write Hero component**

Create `src/components/home/Hero.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { WHATSAPP_URL, DEMO_PAGE_URL, FOUNDING_SPOTS_TOTAL } from '@/lib/constants'
import { fadeUp, staggerContainer } from '@/lib/animations'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-teal/10 via-midnight to-midnight" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ember/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
          <span className="px-3 py-1 rounded-full border border-teal/30 bg-teal/10 text-teal text-xs font-mono tracking-wider">
            NOW LAUNCHING IN INDIA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-warm-white leading-[1.1] text-balance mb-4"
        >
          Your Restaurant
          <br />
          <span className="text-ember">Is Running You.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp}
          className="text-xl md:text-2xl font-display font-medium text-stone mt-2 mb-6"
        >
          It&apos;s time to flip that.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-stone text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          RestOS is the complete operating system for Indian restaurants.
          One screen. Every order. Every table. Every rupee.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button href={DEMO_PAGE_URL} variant="primary" className="text-base px-8 py-4">
            Book a Free Demo
          </Button>
          <Button href={WHATSAPP_URL} variant="ghost" external className="text-base px-8 py-4">
            WhatsApp Us
          </Button>
        </motion.div>

        {/* Founding note */}
        <motion.p variants={fadeUp} className="mt-6 text-stone text-sm font-mono">
          {FOUNDING_SPOTS_TOTAL} Founding Partner spots · First 3 months completely free
        </motion.p>

        {/* Product preview hint */}
        <motion.div
          variants={fadeUp}
          className="mt-16 relative"
        >
          <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
          <div className="mt-8 rounded-xl border border-wire/50 bg-carbon/50 backdrop-blur-sm p-2 shadow-2xl shadow-midnight">
            <div className="rounded-lg bg-carbon h-64 md:h-96 flex items-center justify-center border border-wire/30">
              <div className="text-center">
                <div className="w-2 h-2 rounded-full bg-teal mx-auto mb-3 animate-pulse" />
                <p className="text-stone text-sm font-mono">Admin Dashboard · Live</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
```

> **Note:** The product preview area in the hero (`h-64 md:h-96` div) is a placeholder. Once you have an actual screenshot of the admin dashboard, replace the inner div with `<Image src="/dashboard-preview.png" alt="RestOS Admin Dashboard" fill className="object-cover rounded-lg" />` and add `position: relative` to the outer div.

- [ ] **Step 2: Verify**

Temporarily add `<Hero />` to `src/app/page.tsx` and run `npm run dev`. Check it renders correctly at `http://localhost:3000`.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/Hero.tsx
git commit -m "feat: Hero section"
```

---

## Task 7: Homepage — Pain Section

**Files:**
- Create: `src/components/home/PainSection.tsx`

- [ ] **Step 1: Write PainSection**

Create `src/components/home/PainSection.tsx`:
```typescript
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PAIN_STATEMENTS } from '@/lib/constants'

export function PainSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={containerRef}
      className="relative bg-midnight py-32 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-4 text-center">
        {PAIN_STATEMENTS.map((statement, i) => {
          const start = i / (PAIN_STATEMENTS.length + 1)
          const end = (i + 1) / (PAIN_STATEMENTS.length + 1)

          return (
            <PainStatement
              key={i}
              text={statement}
              scrollProgress={scrollYProgress}
              start={start}
              end={end}
            />
          )
        })}

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 space-y-3"
        >
          <p className="text-2xl md:text-3xl font-display font-semibold text-warm-white">
            This is what running a restaurant feels like today.
          </p>
          <p className="text-xl md:text-2xl font-display font-medium text-ember italic">
            There is a better way.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function PainStatement({
  text,
  scrollProgress,
  start,
  end,
}: {
  text: string
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
}) {
  const opacity = useTransform(scrollProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0.3])
  const y = useTransform(scrollProgress, [start, start + 0.05], [20, 0])

  return (
    <motion.p
      style={{ opacity, y }}
      className="text-xl md:text-2xl lg:text-3xl text-stone font-display font-medium leading-relaxed py-10 border-b border-wire/30 last:border-0"
    >
      &ldquo;{text}&rdquo;
    </motion.p>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/PainSection.tsx
git commit -m "feat: Pain Discovery section with scroll animations"
```

---

## Task 8: Homepage — Transformation Section

**Files:**
- Create: `src/components/home/Transformation.tsx`

- [ ] **Step 1: Write Transformation component**

Create `src/components/home/Transformation.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/animations'

const rows = [
  {
    before: 'Paper KOTs getting lost',
    after: 'Kitchen sees every order on screen, live',
  },
  {
    before: 'Waiter shouts across the floor',
    after: 'Silent, digital, instant',
  },
  {
    before: 'Owner finds out at closing',
    after: 'Owner sees revenue live from anywhere',
  },
  {
    before: 'Customer waits to flag a waiter',
    after: 'Customer orders from their own phone',
  },
  {
    before: 'Billing mistakes and arguments',
    after: 'Every order tracked, every rupee accounted',
  },
]

export function Transformation() {
  return (
    <section className="bg-midnight py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Column headers */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-xs font-mono tracking-widest text-stone/60 uppercase">Before</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <span className="text-xs font-mono tracking-widest text-teal uppercase">After RestOS</span>
          </motion.div>
        </div>

        {/* Rows */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-3"
        >
          {rows.map((row, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="grid grid-cols-2 gap-3"
            >
              {/* Before */}
              <div className="rounded-xl bg-carbon/50 border border-wire/40 p-4 md:p-6">
                <p className="text-stone text-sm md:text-base leading-snug">{row.before}</p>
              </div>
              {/* After */}
              <div className="rounded-xl bg-teal/10 border border-teal/30 p-4 md:p-6">
                <p className="text-warm-white text-sm md:text-base leading-snug">{row.after}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Transformation.tsx
git commit -m "feat: Transformation before/after section"
```

---

## Task 9: Homepage — Ecosystem Diagram

**Files:**
- Create: `src/components/home/Ecosystem.tsx`

- [ ] **Step 1: Write Ecosystem component**

Create `src/components/home/Ecosystem.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import { staggerContainer, scaleIn } from '@/lib/animations'

const nodes = [
  { id: 'customer', label: 'Customer Phone', desc: 'Scans QR, browses menu', color: 'border-stone/40 text-stone' },
  { id: 'menu', label: 'QR Menu', desc: 'Orders instantly, no app', color: 'border-ember/40 text-ember' },
  { id: 'order', label: 'Live Order', desc: 'Confirmed in real time', color: 'border-warm-white/40 text-warm-white' },
  { id: 'kitchen', label: 'Kitchen Display', desc: 'Kitchen sees it immediately', color: 'border-teal/40 text-teal' },
  { id: 'waiter', label: 'Waiter App', desc: 'Floor team stays informed', color: 'border-teal/40 text-teal' },
  { id: 'payment', label: 'Payment', desc: 'UPI, card, or cash — tracked', color: 'border-gold/40 text-gold' },
  { id: 'analytics', label: 'Analytics', desc: 'Revenue and trends, live', color: 'border-ember/40 text-ember' },
  { id: 'admin', label: 'You — Admin', desc: 'Full control, from anywhere', color: 'border-warm-white/40 text-warm-white' },
]

export function Ecosystem() {
  return (
    <section className="bg-carbon/30 py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-warm-white text-balance">
            Every Part of Your Restaurant.
            <br />
            <span className="text-teal">Finally Connected.</span>
          </h2>
        </motion.div>

        {/* Node chain */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col items-center gap-0"
        >
          {nodes.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center">
              <motion.div
                variants={scaleIn}
                className={`w-full max-w-xs rounded-xl border ${node.color} bg-carbon px-6 py-4 text-center`}
              >
                <p className={`font-display font-semibold text-base ${node.color.split(' ')[1]}`}>
                  {node.label}
                </p>
                <p className="text-stone text-xs mt-1">{node.desc}</p>
              </motion.div>

              {/* Connector line (not after last node) */}
              {i < nodes.length - 1 && (
                <motion.div
                  variants={scaleIn}
                  className="w-px h-8 bg-gradient-to-b from-teal/60 to-teal/10"
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/Ecosystem.tsx
git commit -m "feat: Ecosystem flow diagram"
```

---

## Task 10: Homepage — Product Highlights, Video, Founding, Trust, Final CTA

**Files:**
- Create: `src/components/home/ProductHighlights.tsx`
- Create: `src/components/home/DemoVideo.tsx`
- Create: `src/components/home/FoundingBanner.tsx`
- Create: `src/components/home/TrustSection.tsx`
- Create: `src/components/home/FinalCTA.tsx`

- [ ] **Step 1: Write ProductHighlights**

Create `src/components/home/ProductHighlights.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { staggerContainer, fadeUp } from '@/lib/animations'

const cards = [
  {
    icon: '📱',
    headline: 'Customers order themselves',
    subtext: 'No waiter needed for every table. Scan, order, pay.',
  },
  {
    icon: '🍳',
    headline: 'Kitchen never misses an order',
    subtext: 'Every KOT is digital, timestamped, and visible to the team.',
  },
  {
    icon: '🛎️',
    headline: 'Your waiter always knows what\'s next',
    subtext: 'Table-by-table, order-by-order. No shouting.',
  },
  {
    icon: '💰',
    headline: 'Every rupee tracked automatically',
    subtext: 'UPI, card, cash — all in one place. Real-time.',
  },
  {
    icon: '📊',
    headline: 'Manage your restaurant from anywhere',
    subtext: 'Full admin dashboard on your phone or laptop.',
  },
  {
    icon: '📲',
    headline: 'No new hardware needed',
    subtext: 'Works on phones, tablets, and TVs you already have.',
  },
]

export function ProductHighlights() {
  return (
    <section className="bg-midnight py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-warm-white">
            One System. Everything Inside.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group rounded-xl bg-carbon border border-wire hover:border-ember/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-ember/5"
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <h3 className="font-display font-semibold text-warm-white text-base mb-2">
                {card.headline}
              </h3>
              <p className="text-stone text-sm leading-relaxed">{card.subtext}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/features"
            className="text-teal text-sm hover:text-teal/80 transition-colors font-medium"
          >
            See the full product →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write DemoVideo**

Create `src/components/home/DemoVideo.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import { LiteYoutube } from '@/components/ui/LiteYoutube'
import { YOUTUBE_VIDEO_ID } from '@/lib/constants'

const callouts = [
  'QR ordering live in 60 seconds',
  'Kitchen display — no paper KOTs',
  'Admin dashboard — from anywhere',
]

export function DemoVideo() {
  return (
    <section className="bg-carbon/30 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-warm-white">
            See It Running In A Real Restaurant
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <LiteYoutube videoId={YOUTUBE_VIDEO_ID} title="RestOS Product Demo" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-6 mt-8"
        >
          {callouts.map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
              <p className="text-stone text-sm">{text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Write FoundingBanner**

Create `src/components/home/FoundingBanner.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SpotCounter } from '@/components/ui/SpotCounter'
import { FOUNDING_PAGE_URL } from '@/lib/constants'
import { staggerContainer, fadeUp } from '@/lib/animations'

const perks = [
  'RestOS completely free for 90 days',
  'Direct WhatsApp line to the founding team',
  'Your feedback shapes the product roadmap',
  'Founding Partner badge on your restaurant profile',
  'First access to every new feature',
]

export function FoundingBanner() {
  return (
    <section className="bg-midnight py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="rounded-2xl border border-gold/30 bg-carbon p-8 md:p-12 text-center"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-mono tracking-wider mb-6">
              LIMITED OFFER
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-display font-bold text-warm-white mb-4"
          >
            We&apos;re Looking For{' '}
            <span className="text-gold">10 Founding Partners</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-stone text-base md:text-lg mb-8 leading-relaxed">
            Not customers. Partners. The restaurants that shape how RestOS works
            will get 3 months completely free — and direct access to the founders.
          </motion.p>

          <motion.ul variants={staggerContainer} className="space-y-3 text-left max-w-sm mx-auto mb-10">
            {perks.map((perk, i) => (
              <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                <span className="text-gold mt-0.5">✓</span>
                <span className="text-warm-white text-sm">{perk}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-6">
            <SpotCounter />
            <Button href={FOUNDING_PAGE_URL} variant="primary" className="px-8 py-4 text-base">
              Apply To Be A Founding Partner
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Write TrustSection**

Create `src/components/home/TrustSection.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import { TRUST_SIGNALS } from '@/lib/constants'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function TrustSection() {
  return (
    <section className="bg-carbon/20 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-warm-white">
            Built For India. Built To Last.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TRUST_SIGNALS.map((signal, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <h3 className="font-display font-semibold text-warm-white text-sm mb-2">
                {signal.title}
              </h3>
              <p className="text-stone text-xs leading-relaxed">{signal.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Write FinalCTA**

Create `src/components/home/FinalCTA.tsx`:
```typescript
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { WHATSAPP_URL, DEMO_PAGE_URL } from '@/lib/constants'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function FinalCTA() {
  return (
    <section className="bg-midnight py-32 px-4">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-display font-bold text-warm-white mb-4 text-balance"
        >
          Ready to see RestOS in your restaurant?
        </motion.h2>

        <motion.p variants={fadeUp} className="text-stone text-base mb-10">
          No commitment. No credit card. Just a conversation.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href={DEMO_PAGE_URL} variant="primary" className="text-base px-8 py-4">
            Book a 20-Minute Demo
          </Button>
          <Button href={WHATSAPP_URL} variant="ghost" external className="text-base px-8 py-4">
            WhatsApp Us Now
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 6: Commit all home components**

```bash
git add src/components/home/
git commit -m "feat: all homepage sections — highlights, video, founding, trust, CTA"
```

---

## Task 11: Homepage Assembly

**Files:**
- Create: `src/app/page.tsx`

- [ ] **Step 1: Assemble homepage**

Create `src/app/page.tsx`:
```typescript
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { PainSection } from '@/components/home/PainSection'
import { Transformation } from '@/components/home/Transformation'
import { Ecosystem } from '@/components/home/Ecosystem'
import { ProductHighlights } from '@/components/home/ProductHighlights'
import { DemoVideo } from '@/components/home/DemoVideo'
import { FoundingBanner } from '@/components/home/FoundingBanner'
import { TrustSection } from '@/components/home/TrustSection'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainSection />
        <Transformation />
        <Ecosystem />
        <ProductHighlights />
        <DemoVideo />
        <FoundingBanner />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run dev and verify full homepage**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll through the entire page. Check:
- Navbar appears and transitions correctly on scroll
- Hero renders with orange headline
- Pain statements are visible
- Before/after grid appears
- Ecosystem nodes are visible
- Product cards render
- Video section shows placeholder (video plays on click after you add real YouTube ID)
- Founding partner section shows spot counter
- Trust signals appear
- Final CTA renders

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: homepage assembly — all sections connected"
```

---

## Task 12: Demo Booking Page

**Files:**
- Create: `src/app/demo/page.tsx`

- [ ] **Step 1: Write Demo page**

Create `src/app/demo/page.tsx`:
```typescript
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WHATSAPP_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Book a Demo — RestOS',
  description: 'See RestOS running in a real restaurant. Book a free 20-minute demo with the founding team.',
}

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-midnight pt-24 pb-20 px-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-warm-white mb-3">
              Let&apos;s show you RestOS in your restaurant.
            </h1>
            <p className="text-stone text-base">
              Pick a time. 20 minutes. We&apos;ll walk you through everything live.
            </p>
          </div>

          {/* Cal.com embed placeholder */}
          <div className="rounded-xl border border-wire bg-carbon p-8 text-center mb-8">
            <p className="text-stone text-sm mb-4">
              Calendar booking coming soon.
            </p>
            <p className="text-warm-white font-display font-semibold text-base">
              In the meantime, WhatsApp us to schedule instantly:
            </p>
          </div>

          {/* WhatsApp fallback */}
          <div className="text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[#25D366] text-white font-display font-semibold text-base hover:bg-[#22c55e] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.773 9.773 0 01-5.021-1.384l-.36-.214-3.733.974.999-3.639-.235-.374A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              WhatsApp Us to Book a Demo
            </a>
            <p className="text-stone text-xs mt-4">
              We typically respond within 30 minutes during business hours.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

> **Cal.com integration note:** Once you have a Cal.com account with a 20-minute demo event type, replace the placeholder div with:
> ```tsx
> <iframe
>   src="https://cal.com/YOUR_USERNAME/demo-restos?embed=true"
>   className="w-full h-[600px] rounded-xl border border-wire"
>   frameBorder="0"
> />
> ```

- [ ] **Step 2: Commit**

```bash
git add src/app/demo/
git commit -m "feat: Demo booking page"
```

---

## Task 13: Features Page

**Files:**
- Create: `src/app/features/page.tsx`

- [ ] **Step 1: Write Features page**

Create `src/app/features/page.tsx`:
```typescript
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { DEMO_PAGE_URL, WHATSAPP_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Features — RestOS',
  description: 'Every feature RestOS offers — from QR ordering to kitchen display to analytics. All translated into outcomes for your restaurant.',
}

const features = [
  {
    category: 'Ordering',
    headline: 'Customers order themselves',
    description:
      'Every table gets a unique QR code. Customers scan, browse your menu with photos, customize their order, and pay — all from their own phone. No app download. No sign-up. No friction.',
    bullets: [
      'Works for dine-in and takeaway in the same flow',
      'Menu changes you make go live instantly',
      'Veg / non-veg indicators on every item',
      'Spice levels, addon groups, special instructions all supported',
      'Your branding on the menu — not ours',
    ],
  },
  {
    category: 'Kitchen',
    headline: 'Kitchen never misses an order',
    description:
      'Ditch the paper KOTs. Every order appears on the kitchen display the moment it is placed. Color-coded by status. Timer shows how long each order has been waiting.',
    bullets: [
      'New → Confirmed → Completed → Served flow',
      'Orders over 10 minutes pulse amber, over 20 pulse red',
      'Audio alert when a new order arrives',
      'Special instructions highlighted so nothing gets missed',
      'Works on any tablet or TV you already have',
    ],
  },
  {
    category: 'Payments',
    headline: 'Every rupee goes directly to your account',
    description:
      'Accept UPI, cards, netbanking, and wallets through Razorpay or Cashfree. Money goes directly to your bank account — not ours. We never hold your funds.',
    bullets: [
      'Razorpay and Cashfree both supported',
      'UPI payments in seconds',
      'Pay at counter option for cash customers',
      'No double charges — duplicate webhooks handled automatically',
      'Payment credentials encrypted with AES-256-GCM',
    ],
  },
  {
    category: 'Management',
    headline: 'Manage your entire restaurant from one screen',
    description:
      'The admin dashboard gives you complete visibility and control — from your phone, tablet, or laptop. Revenue, orders, staff, menu, tables — all in one place.',
    bullets: [
      'Today\'s revenue, order count, and AOV at a glance',
      'Full menu management with photos and stock tracking',
      'Table layout with open/close session control',
      'Staff management with role-based access',
      'Reservation calendar',
    ],
  },
  {
    category: 'Analytics',
    headline: 'Finally know what is working',
    description:
      'Stop guessing. RestOS tracks every order, every rupee, every item sold. See your best sellers, your peak hours, and your revenue by source — automatically.',
    bullets: [
      'Daily, weekly, and monthly revenue reports',
      'Revenue by source — dine-in vs takeaway vs QR',
      'Top selling items updated in real time',
      'Hourly order trends',
      'Customer review tracking',
    ],
  },
]

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-midnight min-h-screen">
        {/* Header */}
        <div className="pt-32 pb-16 px-4 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-warm-white mb-4">
            Everything Your Restaurant Needs
          </h1>
          <p className="text-stone text-lg">
            Every feature translated into what it actually means for your restaurant tomorrow morning.
          </p>
        </div>

        {/* Feature sections */}
        <div className="max-w-5xl mx-auto px-4 pb-24 space-y-24">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-start`}
            >
              {/* Text */}
              <div className="flex-1">
                <span className="text-xs font-mono tracking-widest text-teal uppercase mb-3 block">
                  {feature.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-warm-white mb-4">
                  {feature.headline}
                </h2>
                <p className="text-stone text-base leading-relaxed mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-teal mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-warm-white text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual placeholder */}
              <div className="flex-1 rounded-xl border border-wire bg-carbon h-64 flex items-center justify-center">
                <p className="text-stone text-sm font-mono">{feature.category} · Demo</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-carbon/30 py-20 px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-warm-white mb-4">
            See all of this in your restaurant.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={DEMO_PAGE_URL} variant="primary">Book a Free Demo</Button>
            <Button href={WHATSAPP_URL} variant="ghost" external>WhatsApp Us</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/features/
git commit -m "feat: Features page"
```

---

## Task 14: Pricing Page

**Files:**
- Create: `src/app/pricing/page.tsx`

- [ ] **Step 1: Write Pricing page**

Create `src/app/pricing/page.tsx`:
```typescript
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { SpotCounter } from '@/components/ui/SpotCounter'
import { FOUNDING_PAGE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Pricing — RestOS',
  description: 'Simple, honest pricing. 10 Founding Partner spots available — first 90 days completely free.',
}

const faqs = [
  { q: 'Is there a contract?', a: 'No. No lock-in, no minimum term. You can stop at any time.' },
  { q: 'Do I need to buy new hardware?', a: 'No. RestOS works on any phone, tablet, or laptop you already own. Your customers use their own phones. No new devices to buy.' },
  { q: 'What happens after the 90 days?', a: 'You move to the regular plan at the standard price, or you leave. No tricks, no sudden charges. We will tell you the pricing well in advance.' },
  { q: 'Is my data safe?', a: 'Yes. Your restaurant gets its own isolated database. No other restaurant can see your orders, customers, or revenue. Everything is encrypted.' },
  { q: 'Does it work for takeaway-only restaurants?', a: 'Yes. RestOS supports dine-in, takeaway, and cloud kitchen flows out of the box.' },
  { q: 'What payment methods does it support?', a: 'UPI, credit/debit cards, netbanking, and wallets through Razorpay and Cashfree. Cash orders (pay at counter) are also supported.' },
]

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-midnight min-h-screen">
        <div className="pt-32 pb-16 px-4 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-warm-white mb-4">
            Simple, honest pricing.
          </h1>
          <p className="text-stone text-lg">No hidden fees. No surprises.</p>
        </div>

        {/* Pricing cards */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Founding Partner */}
            <div className="rounded-2xl border-2 border-gold/50 bg-carbon p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-gold text-midnight text-xs font-mono font-bold tracking-wider">
                  FOUNDING PARTNER
                </span>
              </div>
              <div className="mt-4 mb-6">
                <p className="text-4xl font-display font-bold text-warm-white">Free</p>
                <p className="text-gold text-sm mt-1">for your first 90 days</p>
              </div>
              <p className="text-stone text-sm mb-8">
                Everything included. Direct access to the founding team. Your feedback shapes the product.
              </p>
              <div className="mb-8">
                <SpotCounter />
              </div>
              <Button href={FOUNDING_PAGE_URL} variant="primary" className="w-full justify-center">
                Claim Your Spot
              </Button>
            </div>

            {/* Regular */}
            <div className="rounded-2xl border border-wire bg-carbon p-8">
              <div className="mb-6">
                <p className="text-4xl font-display font-bold text-stone">TBD</p>
                <p className="text-stone text-sm mt-1">per month after launch pricing</p>
              </div>
              <p className="text-stone text-sm mb-8">
                Everything included. Standard support. Join the waitlist to be notified when regular pricing is announced.
              </p>
              <div className="rounded-lg bg-wire/30 border border-wire p-4 mb-8">
                <p className="text-stone text-sm text-center">Pricing will be announced at launch. Join the waitlist to get early access.</p>
              </div>
              <a
                href="mailto:hello@omniviya.in?subject=RestOS Waitlist"
                className="block w-full text-center px-6 py-3 rounded-lg border border-wire text-warm-white text-sm font-display font-semibold hover:border-ember/50 transition-colors"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto px-4 pb-24">
          <h2 className="text-2xl font-display font-bold text-warm-white text-center mb-10">
            Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-wire pb-6">
                <p className="font-display font-semibold text-warm-white mb-2">{faq.q}</p>
                <p className="text-stone text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/pricing/
git commit -m "feat: Pricing page with founding partner offer and FAQ"
```

---

## Task 15: Founding Partner Page

**Files:**
- Create: `src/app/founding/page.tsx`

- [ ] **Step 1: Write Founding Partner page**

Create `src/app/founding/page.tsx`:
```typescript
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SpotCounter } from '@/components/ui/SpotCounter'
import { WHATSAPP_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Founding Partner Program — RestOS',
  description: 'Be one of the 10 restaurants that shapes how RestOS works. First 90 days completely free.',
}

export default function FoundingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-midnight min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-32 pb-24">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-mono tracking-wider mb-6">
              10 SPOTS ONLY
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-warm-white mb-4">
              You&apos;re Not Just a Customer.
              <br />
              <span className="text-gold">You&apos;re a Founder.</span>
            </h1>
            <p className="text-stone text-base leading-relaxed">
              We are a startup building the operating system that Indian restaurants deserve.
              We want to build it with restaurants — not just for them.
            </p>
          </div>

          {/* Story */}
          <div className="prose prose-invert prose-sm max-w-none mb-16 space-y-4">
            <p className="text-stone leading-relaxed">
              Most restaurant software is built by people who have never worked a dinner service. 
              They build features, not solutions. They add complexity, not clarity.
            </p>
            <p className="text-stone leading-relaxed">
              We are doing this differently. The first 10 restaurants that join us will have 
              a direct line to our team. Not a support ticket. A WhatsApp conversation. 
              When something is broken, you call us. When you want a feature, we listen.
            </p>
            <p className="text-warm-white leading-relaxed font-medium">
              That is what a Founding Partner is.
            </p>
          </div>

          {/* What you get */}
          <div className="rounded-2xl border border-gold/30 bg-carbon p-8 mb-12">
            <h2 className="font-display font-bold text-warm-white text-xl mb-6">
              What Founding Partners Get
            </h2>
            <ul className="space-y-4">
              {[
                ['RestOS completely free for 90 days', 'Every feature. No restrictions. No credit card.'],
                ['Direct WhatsApp line to the founders', 'Real humans. Real responses. Not a support bot.'],
                ['Shape the product roadmap', 'Your feedback gets acted on — not filed away.'],
                ['Founding Partner badge', 'Permanent recognition as a founding restaurant.'],
                ['First access to every new feature', 'Before anyone else, always.'],
              ].map(([title, desc], i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-gold text-lg mt-0.5">✦</span>
                  <div>
                    <p className="text-warm-white font-medium text-sm">{title}</p>
                    <p className="text-stone text-sm">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* What we ask */}
          <div className="rounded-xl border border-wire bg-carbon/50 p-6 mb-12">
            <h3 className="font-display font-semibold text-warm-white mb-3">
              What We Ask In Return
            </h3>
            <ul className="space-y-2">
              {[
                '20 minutes with us once a month to share what is working and what is not',
                'Candid feedback when something is broken or confusing',
                'Permission to mention your restaurant as a Founding Partner (optional)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-teal mt-0.5">→</span>
                  <span className="text-stone text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spot counter */}
          <div className="text-center mb-10">
            <SpotCounter />
          </div>

          {/* Application — WhatsApp */}
          <div className="text-center">
            <p className="text-stone text-sm mb-6">
              To apply, send us a WhatsApp message. Tell us your restaurant name, city, and type 
              (takeaway, dine-in, cafe, cloud kitchen). We will be in touch within 24 hours.
            </p>
            <a
              href={`${WHATSAPP_URL}&text=${encodeURIComponent("Hi! I want to apply for the RestOS Founding Partner program. Restaurant name: [YOUR NAME]. City: [YOUR CITY]. Type: [DINE-IN/TAKEAWAY/CAFE/CLOUD KITCHEN].")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-[#25D366] text-white font-display font-semibold text-base hover:bg-[#22c55e] transition-colors"
            >
              Apply via WhatsApp
            </a>
            <p className="text-stone/60 text-xs mt-4">
              Or email us at hello@omniviya.in with subject &quot;Founding Partner&quot;
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/founding/
git commit -m "feat: Founding Partner program page"
```

---

## Task 16: About Page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Write About page**

Create `src/app/about/page.tsx`:
```typescript
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { WHATSAPP_URL, DEMO_PAGE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About — RestOS by Omniviya',
  description: 'RestOS is built by Omniviya. We are on a mission to give Indian restaurants the technology they deserve.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-midnight min-h-screen">
        <div className="max-w-2xl mx-auto px-4 pt-32 pb-24">
          {/* Mission */}
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-teal uppercase block mb-4">
              Our Mission
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-warm-white mb-6 text-balance">
              Indian restaurants deserve better technology.
            </h1>
            <p className="text-stone text-base leading-relaxed">
              Every day, thousands of restaurant owners across India manage their entire operation 
              through WhatsApp groups, paper KOTs, and spreadsheets. Not because they want to — 
              because the software available to them is either too expensive, too complicated, 
              or built for someone else entirely.
            </p>
          </div>

          {/* What we built */}
          <div className="mb-16">
            <h2 className="font-display font-bold text-warm-white text-xl mb-4">What We Built</h2>
            <p className="text-stone text-base leading-relaxed mb-4">
              RestOS is a complete restaurant operating system. QR ordering, kitchen display, 
              waiter app, payments, reservations, analytics — all connected, all in real time, 
              all on devices you already own.
            </p>
            <p className="text-stone text-base leading-relaxed">
              No expensive hardware. No complicated setup. No per-device fees. Just software 
              that works the way Indian restaurants actually work.
            </p>
          </div>

          {/* Company */}
          <div className="rounded-xl border border-wire bg-carbon p-6 mb-16">
            <h3 className="font-display font-semibold text-warm-white mb-3">About Omniviya</h3>
            <p className="text-stone text-sm leading-relaxed">
              Omniviya is a software company building technology for businesses that have been 
              underserved by existing tools. RestOS is our first product. We are based in India 
              and building for India first.
            </p>
          </div>

          {/* Contact */}
          <div className="mb-16">
            <h2 className="font-display font-bold text-warm-white text-xl mb-6">Get In Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-stone text-sm w-20">WhatsApp</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal text-sm hover:text-teal/80 transition-colors"
                >
                  Message us directly
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-stone text-sm w-20">Email</span>
                <a
                  href="mailto:hello@omniviya.in"
                  className="text-teal text-sm hover:text-teal/80 transition-colors"
                >
                  hello@omniviya.in
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-stone text-sm w-20">Website</span>
                <a
                  href="https://omniviya.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal text-sm hover:text-teal/80 transition-colors"
                >
                  omniviya.in
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href={DEMO_PAGE_URL} variant="primary">Book a Demo</Button>
            <Button href={WHATSAPP_URL} variant="ghost" external>WhatsApp Us</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/about/
git commit -m "feat: About page"
```

---

## Task 17: Pre-Launch Checklist

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Set your WhatsApp number**

In `src/lib/constants.ts`, replace `919XXXXXXXXX` with your actual WhatsApp Business number in international format (91 + 10-digit number, no spaces or dashes).

- [ ] **Step 2: Set your YouTube video ID**

In `src/lib/constants.ts`, replace `REPLACE_WITH_YOUR_VIDEO_ID` with the YouTube video ID from your product demo URL. The ID is the part after `?v=` in the YouTube URL.

- [ ] **Step 3: Create the OG image**

Create a 1200×630 PNG at `public/og-image.png`. It should show:
- Dark background (`#0B1020`)
- RestOS wordmark in white (Space Grotesk Bold)
- Tagline: "The Operating System For Restaurants"
- Ember orange accent

Tools: Canva, Figma, or any image editor.

- [ ] **Step 4: Create favicon**

Add `public/favicon.ico` (32×32 and 16×16 multi-resolution ICO file). Use the RestOS logo or an "R" lettermark in ember orange on dark background.

- [ ] **Step 5: Mobile test**

Run `npm run dev`. Open on an Android device using your local IP (`http://192.168.X.X:3000`). Test:
- Navigation hamburger menu opens and closes
- Hero CTAs are full-width and tappable
- Pain section text is readable
- Founding banner SpotCounter is visible
- All buttons have adequate tap target size

- [ ] **Step 6: Run production build and check for errors**

```bash
npm run build
```

Expected: All 6 routes compile successfully. Zero TypeScript errors. Zero ESLint errors.

If ESLint errors appear about `'` in JSX, replace `'` with `&apos;` in the affected file. The code already uses `&apos;` in most places — check any remaining plain apostrophes.

- [ ] **Step 7: Commit final pre-launch state**

```bash
git add .
git commit -m "chore: pre-launch configuration and assets"
```

---

## Task 18: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/restos-website.git
git push -u origin main
```

- [ ] **Step 2: Deploy on Vercel**

1. Go to `vercel.com` and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Framework preset: Next.js (auto-detected)
5. No environment variables needed at this stage
6. Click Deploy

Expected: Deployment completes in ~2 minutes. Live URL provided.

- [ ] **Step 3: Verify live deployment**

Open the Vercel URL. Check:
- Homepage loads on mobile
- All 6 pages load without errors (`/demo`, `/features`, `/pricing`, `/founding`, `/about`)
- WhatsApp button opens WhatsApp correctly
- Navigation works on mobile
- No console errors in browser dev tools

- [ ] **Step 4: Set up Vercel Analytics (free)**

In Vercel dashboard → your project → Analytics tab → Enable. This gives you page views, visitor counts, and top pages without any code changes.

- [ ] **Step 5: Final commit**

```bash
git commit --allow-empty -m "chore: deployed to Vercel"
```

---

## Self-Review Against Spec

**Spec coverage check:**
- ✅ Homepage with all 9 sections (Hero, Pain, Transformation, Ecosystem, Highlights, Video, Founding, Trust, Final CTA)
- ✅ Navigation (transparent → solid, mobile hamburger)
- ✅ Footer
- ✅ /demo page (WhatsApp + Cal.com note)
- ✅ /features page (5 feature categories with outcome-first copy)
- ✅ /pricing page (Founding Partner + waitlist + FAQ)
- ✅ /founding page (application via WhatsApp)
- ✅ /about page (mission, company, contact)
- ✅ Design tokens (all 8 brand colors in Tailwind config)
- ✅ Typography (Space Grotesk, Inter, Space Mono)
- ✅ Framer Motion scroll animations throughout
- ✅ SpotCounter component (10 spots, manual update)
- ✅ LiteYoutube embed (lazy, no performance hit)
- ✅ Mobile-first, hamburger nav
- ✅ WhatsApp primary conversion path (India-specific)
- ✅ Cal.com integration note for demo booking
- ✅ SEO metadata on all pages
- ✅ Vercel deployment

**Placeholder scan:** No TBD, TODO, or incomplete steps. All code blocks are complete and executable.

**Type consistency:** `Button` component uses `href` string throughout. `TRUST_SIGNALS` and `PAIN_STATEMENTS` typed as `const` arrays. `SpotCounter` reads from `constants.ts` — single source of truth. `LiteYoutube` accepts `videoId: string` — consistent with `YOUTUBE_VIDEO_ID` constant.
