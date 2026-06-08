# Features Page 3D Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat features page with a scroll-driven 3D storytelling experience: 9 sections connected by a visual timeline, each feature as a floating 3D card with problem-to-solution scroll-reveal.

**Architecture:** Server component page shell (metadata + layout) wraps a client-side orchestrator that renders each section. A shared `FeatureCard3D` wrapper provides perspective, mouse parallax tilt, and scroll-reveal (problem->solution). Each section is a standalone component with unique layout. Region-aware content via existing `useRegion()` context.

**Tech Stack:** Next.js 16 (App Router), framer-motion (useScroll, useTransform, useSpring), Tailwind CSS v3, lenis smooth scroll (existing), TypeScript 5

**Spec:** `docs/superpowers/specs/2026-06-07-features-page-3d-redesign.md`

---

## File Structure

### New Files

| # | File | Responsibility |
|---|------|---------------|
| 1 | `src/lib/features-content.ts` | All feature copy, bullets, icons as typed constants |
| 2 | `src/components/features/FeatureCard3D.tsx` | Shared 3D card wrapper: perspective container, mouse tilt, scroll-reveal, stagger |
| 3 | `src/components/features/FeaturesHero.tsx` | Section 1: letter-by-letter headline, ambient orbs, tagline, CTAs |
| 4 | `src/components/features/TimelineOverview.tsx` | Section 2: 7-node interactive journey map with animated connectors |
| 5 | `src/components/features/OrderingFeature.tsx` | Section 3: ordering problem->solution |
| 6 | `src/components/features/KitchenFeature.tsx` | Section 4: split layout with KDS device mockup |
| 7 | `src/components/features/PaymentFeature.tsx` | Section 5: region-aware payments |
| 8 | `src/components/features/ManagementFeature.tsx` | Section 6: dashboard preview with device mockup |
| 9 | `src/components/features/AnalyticsFeature.tsx` | Section 7: region-aware analytics with animated counters |
| 10 | `src/components/features/BYODFeature.tsx` | Section 8: minimalist BYOD philosophy statement |
| 11 | `src/components/features/FeaturesCTA.tsx` | Section 9: full-width immersive CTA close |
| 12 | `src/components/features/FeaturesClient.tsx` | Client orchestrator - renders all sections in order |
| 13 | `src/components/features/index.ts` | Barrel exports |

### Modified Files

| # | File | Change |
|---|------|--------|
| 1 | `src/app/_features/page.tsx` | Replace flat content with server shell wrapping `<FeaturesClient />` |
| 2 | `src/lib/animations.ts` | Add feature-section variants (problemFade, solutionSlide, counterUp) |

---

### Task 1: Feature Content Data + Animation Variants

**Files:**
- Create: `src/lib/features-content.ts`
- Modify: `src/lib/animations.ts`

- [ ] **Step 1: Create content data file**

```tsx
// src/lib/features-content.ts

export interface FeatureProblem {
  icon: string
  headline: string
  bullets: string[]
}

export interface FeatureSolution {
  icon: string
  headline: string
  description: string
  bullets: string[]
}

export interface FeatureSection {
  id: string
  category: string
  problem: FeatureProblem
  solution: FeatureSolution
}

// Problem-solution data for features 3-7 (region-agnostic parts)
// Payments and Analytics use region components for solution content
export const FEATURE_SECTIONS: FeatureSection[] = [
  {
    id: 'ordering',
    category: 'Ordering',
    problem: {
      icon: '⏳',
      headline: 'Customers wait for a waiter just to place an order',
      bullets: [
        'Customers feeling rushed into ordering quickly',
        'Wrong orders caused by miscommunication',
        'Staff spending valuable time writing down orders',
        'Long queues at counters during busy hours',
      ],
    },
    solution: {
      icon: '📱',
      headline: 'Customers order when they are ready',
      description: 'Every table gets its own QR code. Customers scan, browse your menu, customize their order, and pay from their own phone.',
      bullets: [
        'Customers order immediately when they are ready',
        'Customers see exactly what they are ordering before confirming',
        'Fewer ordering mistakes and fewer disputes',
        'Staff focus on hospitality instead of data entry',
        'Works for dine-in, takeaway, and staff-assisted orders',
      ],
    },
  },
  {
    id: 'kitchen',
    category: 'Kitchen',
    problem: {
      icon: '📝',
      headline: 'Lost paper tickets, illegible handwriting, frustrated kitchen',
      bullets: [
        'Lost paper KOTs that never reach the kitchen',
        'Illegible handwriting causing wrong dishes',
        'Waiters repeatedly asking the kitchen for updates',
        'Customers constantly asking "Where is my order?"',
      ],
    },
    solution: {
      icon: '🖥️',
      headline: 'Kitchen never misses an order',
      description: 'Every order appears on the kitchen display the moment it is placed. Color-coded by status. Timer shows how long each order has been waiting.',
      bullets: [
        'Orders arrive instantly in the kitchen with audio alert',
        'No paper tickets to lose ever again',
        'Orders over 10 minutes pulse amber, over 20 pulse red',
        'Special instructions highlighted so nothing gets missed',
        'Works on any tablet or TV you already own',
      ],
    },
  },
  {
    id: 'management',
    category: 'Management',
    problem: {
      icon: '🔄',
      headline: 'Jumping between multiple systems, guessing what is happening',
      bullets: [
        'Not knowing what is happening on the floor right now',
        'Time wasted updating menus manually across platforms',
        'Limited visibility into daily operations and staff performance',
        'No single source of truth for table status or reservations',
      ],
    },
    solution: {
      icon: '📊',
      headline: 'Run your entire restaurant from one screen',
      description: 'Orders, tables, revenue, staff, menus, reservations, and customer activity all managed from a single dashboard. Accessible from any device.',
      bullets: [
        'Full operational visibility from any phone, tablet, or laptop',
        'Menu updates go live instantly across all tables and online',
        'Better table management with open/close session control',
        'Staff management with role-based access controls',
        'Less manual work, more time focused on customers',
      ],
    },
  },
]

// Non-feature section copy
export const HERO_CONTENT = {
  headline: 'Everything Your Restaurant Needs',
  tagline: 'Less Waiting. Less Confusion. Less Hardware. More Revenue.',
}

export const TIMELINE_CONTENT = {
  headline: 'One Order. One Timeline. Visible To Everyone.',
  subtext: 'From customer phone to your dashboard, every step is connected.',
  nodes: [
    { id: 'ordering', label: 'Customer Phone', desc: 'Scans QR, browses menu', color: 'text-stone', accent: 'border-stone/40 bg-stone/5' },
    { id: 'ordering', label: 'QR Menu', desc: 'Orders instantly, no app', color: 'text-ember', accent: 'border-ember/40 bg-ember/5' },
    { id: 'ordering', label: 'Live Order', desc: 'Confirmed in real time', color: 'text-warm-white', accent: 'border-warm-white/30 bg-warm-white/5' },
    { id: 'kitchen', label: 'Kitchen Display', desc: 'Kitchen sees it immediately', color: 'text-teal', accent: 'border-teal/40 bg-teal/5' },
    { id: 'payment', label: 'Payment', desc: 'Settled from the table', color: 'text-gold', accent: 'border-gold/40 bg-gold/5' },
    { id: 'management', label: 'Admin Dashboard', desc: 'Full control, from anywhere', color: 'text-ember', accent: 'border-ember/30 bg-ember/5' },
    { id: 'analytics', label: 'Analytics', desc: 'Revenue and trends, live', color: 'text-teal', accent: 'border-teal/30 bg-teal/5' },
  ],
}

export const BYOD_CONTENT = {
  headline: 'The restaurant software that does not force you to buy hardware',
  subtext: 'Most restaurant systems want you to buy POS terminals, self-ordering kiosks, kitchen printers, and pager devices. RestOS works with what you already own.',
  bullets: [
    'Customers use their own phones to order and pay',
    'Staff use existing phones, tablets, or computers',
    'Kitchen uses existing tablets or TVs you already have',
    'No hardware lock-ins. No expensive setup costs.',
    'Easier staff training. Faster rollout.',
  ],
}

export const CTA_CONTENT = {
  headline: 'See all of this in your restaurant.',
}
```

- [ ] **Step 2: Add feature-relevant animation variants to animations.ts**

```ts
// Add after finalCTA "Momentum" section

// ─── Feature section "Scroll-Reveal" ──────────────────────────────────────────

export const problemFade: Variants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  hidden: { opacity: 0, y: -12, transition: { duration: 0.3, ease: 'easeIn' } },
}

export const solutionSlide: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
}

export const counterUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 150, damping: 20, delay: i * 0.08 },
  }),
}

export const deviceFloat: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15, delay: i * 0.15 },
  }),
}
```

- [ ] **Step 3: Verify the file compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/features-content.ts src/lib/animations.ts
git commit -m "feat: add features content data and animation variants"
```

---

### Task 2: FeatureCard3D Shared Wrapper

**Files:**
- Create: `src/components/features/FeatureCard3D.tsx`

- [ ] **Step 1: Create FeatureCard3D component**

```tsx
'use client'

import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { normaliseMousePos, springs } from '@/lib/parallax'

interface FeatureCard3DProps {
  children: React.ReactNode
  className?: string
  id?: string
  perspective?: 'shallow' | 'deep'
  tiltIntensity?: number
}

export function FeatureCard3D({
  children,
  className = '',
  id,
  perspective = 'shallow',
  tiltIntensity = 2,
}: FeatureCard3DProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  const rotateX = useSpring(0, springs.ecosystem)
  const rotateY = useSpring(0, springs.ecosystem)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4])
  const scrollScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.92, 1, 1, 0.92])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(
      e.clientX - rect.left,
      e.clientY - rect.top,
      rect.width,
      rect.height
    )
    rotateX.set(pos.y * -tiltIntensity)
    rotateY.set(pos.x * tiltIntensity)
  }, [rotateX, rotateY, tiltIntensity, reduceMotion])

  const handleMouseLeave = useCallback(() => {
    if (reduceMotion) return
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY, reduceMotion])

  const perspectivePx = perspective === 'deep' ? '1600px' : '1200px'

  return (
    <section
      ref={sectionRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative py-20 md:py-28 px-4 overflow-hidden ${className}`}
      style={{ perspective: perspectivePx }}
    >
      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          scale: reduceMotion ? 1 : scrollScale,
          opacity: scrollOpacity,
          transformStyle: 'preserve-3d',
        }}
        className="max-w-5xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/features/FeatureCard3D.tsx
git commit -m "feat: add FeatureCard3D shared wrapper with scroll and mouse parallax"
```

---

### Task 3: FeaturesHero

**Files:**
- Create: `src/components/features/FeaturesHero.tsx`

- [ ] **Step 1: Create FeaturesHero component**

```tsx
'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useRegion } from '@/lib/region-context'
import { normaliseMousePos, mapMouseToRotation, mapMouseToOffset, springs } from '@/lib/parallax'
import { heroLetter, heroEntry } from '@/lib/animations'
import { FOUNDING_SPOTS_TOTAL } from '@/lib/constants'
import { HERO_CONTENT } from '@/lib/features-content'

const HEADLINE_WORDS = [
  { text: 'Everything', color: 'text-warm-white' },
  { text: 'Your', color: 'text-warm-white' },
  { text: 'Restaurant', color: 'text-ember' },
]
const TAGLINE_WORDS = [
  { text: 'Less', color: 'text-teal' },
  { text: 'Waiting.', color: 'text-warm-white' },
  { text: 'Less', color: 'text-teal' },
  { text: 'Confusion.', color: 'text-warm-white' },
  { text: 'Less', color: 'text-teal' },
  { text: 'Hardware.', color: 'text-warm-white' },
  { text: 'More', color: 'text-teal' },
  { text: 'Revenue.', color: 'text-ember' },
]

export function FeaturesHero() {
  const region = useRegion()
  const containerRef = useRef<HTMLElement>(null)

  const contentRotateX = useSpring(0, springs.hero)
  const contentRotateY = useSpring(0, springs.hero)
  const orbX = useSpring(0, { stiffness: 40, damping: 20 })
  const orbY = useSpring(0, { stiffness: 40, damping: 20 })
  const orb2X = useSpring(0, { stiffness: 30, damping: 18 })
  const orb2Y = useSpring(0, { stiffness: 30, damping: 18 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    contentRotateX.set(mapMouseToRotation(-pos.y, 1.2))
    contentRotateY.set(mapMouseToRotation(pos.x, 1.2))
    orbX.set(mapMouseToOffset(-pos.x, 25))
    orbY.set(mapMouseToOffset(-pos.y, 25))
    orb2X.set(mapMouseToOffset(pos.x, 18))
    orb2Y.set(mapMouseToOffset(pos.y, 18))
  }, [contentRotateX, contentRotateY, orbX, orbY, orb2X, orb2Y])

  const handleMouseLeave = useCallback(() => {
    contentRotateX.set(0); contentRotateY.set(0)
    orbX.set(0); orbY.set(0); orb2X.set(0); orb2Y.set(0)
  }, [contentRotateX, contentRotateY, orbX, orbY, orb2X, orb2Y])

  let letterIdx = 0
  const headlineLetters = HEADLINE_WORDS.map((word) => word.text.split('').map(() => letterIdx++))
  const taglineLetters = TAGLINE_WORDS.map((word) => word.text.split('').map(() => letterIdx++))

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden bg-midnight"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient orbs */}
      <motion.div style={{ x: orbX, y: orbY }} className="absolute top-[15%] left-[10%] w-80 h-80 rounded-full pointer-events-none">
        <div className="w-full h-full rounded-full bg-ember/8 blur-3xl animate-breathing" />
      </motion.div>
      <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute bottom-[20%] right-[8%] w-96 h-96 rounded-full pointer-events-none">
        <div className="w-full h-full rounded-full bg-teal/8 blur-3xl animate-breathing" style={{ animationDelay: '1.5s' }} />
      </motion.div>

      {/* Dot grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: 'radial-gradient(circle, #9CA3AF 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Scroll hint - pulsing dot at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-1 h-8 rounded-full bg-gradient-to-b from-teal/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ rotateX: contentRotateX, rotateY: contentRotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 text-center max-w-3xl mx-auto px-4"
      >
        {/* Badge */}
        <motion.div
          variants={heroEntry} custom={0.4} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="px-3 py-1.5 rounded-full border border-teal/30 bg-teal/10 text-teal text-xs font-mono tracking-wider">
            {region.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ perspective: '800px' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] text-balance">
            {HEADLINE_WORDS.map((word, wi) => (
              <span key={wi}>
                {word.text.split('').map((char, ci) => (
                  <motion.span
                    key={`${wi}-${ci}`}
                    variants={heroLetter}
                    custom={headlineLetters[wi][ci]}
                    initial="hidden"
                    animate="visible"
                    className={`inline-block ${word.color}`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wi < HEADLINE_WORDS.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          variants={heroEntry} custom={0.9} initial="hidden" animate="visible"
          className="text-lg sm:text-xl md:text-2xl font-display font-medium text-stone mt-4 mb-8"
        >
          {TAGLINE_WORDS.map((word, wi) => (
            <span key={wi} className={word.color}>{word.text} </span>
          ))}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroEntry} custom={1.1} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button href={`/${region.key}/demo/`} variant="primary" className="text-base px-8 py-4 min-h-[52px] justify-center">
            Book a Free Demo
          </Button>
          <Button
            href={`https://wa.me/${region.whatsappNumber}?text=${encodeURIComponent('Hi, I want to know more about RestOS')}`}
            variant="ghost" external className="text-base px-8 py-4 min-h-[52px] justify-center"
          >
            WhatsApp Us
          </Button>
        </motion.div>

        {/* Founding note */}
        <motion.p
          variants={heroEntry} custom={1.15} initial="hidden" animate="visible"
          className="text-stone/60 text-xs font-mono tracking-wide mt-6"
        >
          {FOUNDING_SPOTS_TOTAL} Founding Partner spots &middot; First 3 months completely free
        </motion.p>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/features/FeaturesHero.tsx
git commit -m "feat: add FeaturesHero with 3D letter-by-letter animation"
```

---

### Task 4: TimelineOverview

**Files:**
- Create: `src/components/features/TimelineOverview.tsx`

- [ ] **Step 1: Create TimelineOverview component**

```tsx
'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { ecosystemNode, ecosystemLine } from '@/lib/animations'
import { normaliseMousePos, springs } from '@/lib/parallax'
import { TIMELINE_CONTENT } from '@/lib/features-content'

export function TimelineOverview() {
  const sectionRef = useRef<HTMLElement>(null)
  const rotateX = useSpring(0, springs.ecosystem)
  const rotateY = useSpring(0, springs.ecosystem)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    rotateX.set(pos.y * -2)
    rotateY.set(pos.x * 2)
  }, [rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0); rotateY.set(0)
  }, [rotateX, rotateY])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-carbon/15 py-20 md:py-28 px-4 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-14"
        >
          <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white text-balance leading-tight">
            {TIMELINE_CONTENT.headline}
          </h2>
          <p className="text-stone text-sm sm:text-base mt-4 max-w-md mx-auto">
            {TIMELINE_CONTENT.subtext}
          </p>
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="flex flex-col items-center"
        >
          {TIMELINE_CONTENT.nodes.map((node, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <motion.button
                variants={ecosystemNode}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                whileFocus={{ scale: 1.04 }}
                onClick={() => scrollToSection(node.id)}
                className={`w-full rounded-xl border ${node.accent} bg-carbon px-5 py-4 text-center cursor-pointer relative`}
                style={{ transformStyle: 'preserve-3d', translateZ: `${(i + 1) * 4}px` }}
              >
                <p className={`font-display font-semibold text-sm sm:text-base ${node.color}`}>
                  {node.label}
                </p>
                <p className="text-stone text-xs mt-0.5">{node.desc}</p>
                <motion.div
                  className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-current"
                  style={{ color: 'inherit' }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.15 }}
                />
              </motion.button>

              {i < TIMELINE_CONTENT.nodes.length - 1 && (
                <motion.div
                  variants={ecosystemLine}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="w-px h-7 bg-gradient-to-b from-teal/50 to-teal/0 origin-top flex-shrink-0 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute w-full h-1.5 bg-teal/60 rounded-full"
                    animate={{ y: [-6, 28] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2, ease: 'easeInOut' }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/features/TimelineOverview.tsx
git commit -m "feat: add TimelineOverview with 3D interactive node chain"
```

---

### Task 5: OrderingFeature

**Files:**
- Create: `src/components/features/OrderingFeature.tsx`

- [ ] **Step 1: Create OrderingFeature component**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { FEATURE_SECTIONS } from '@/lib/features-content'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function OrderingFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const feature = FEATURE_SECTIONS[0]
  const problemOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const problemY = useTransform(scrollYProgress, [0, 0.35], [0, reduceMotion ? 0 : -20])
  const solutionOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.4, 0.65], [reduceMotion ? 0 : 24, 0])

  return (
    <FeatureCard3D id="ordering">
      <div ref={sectionRef} className="relative min-h-[60dvh] flex items-center">
        {/* Problem Phase */}
        <motion.div
          style={{ opacity: problemOpacity, y: problemY }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center max-w-lg mx-auto">
            <span className="text-5xl mb-4 block">{feature.problem.icon}</span>
            <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block">
              The Problem
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-ember mb-4 text-balance">
              {feature.problem.headline}
            </h3>
            <ul className="space-y-2 text-left max-w-md mx-auto">
              {feature.problem.bullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-2 text-stone text-sm">
                  <span className="text-ember/50 mt-0.5 flex-shrink-0">&#10007;</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Solution Phase */}
        <motion.div
          style={{ opacity: solutionOpacity, y: solutionY }}
          className="w-full"
        >
          <motion.div
            variants={reduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center max-w-lg mx-auto"
          >
            <span className="text-5xl mb-4 block">{feature.solution.icon}</span>
            <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
              {feature.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-teal mb-2 text-balance">
              {feature.solution.headline}
            </h3>
            <p className="text-stone text-sm sm:text-base leading-relaxed mb-6">
              {feature.solution.description}
            </p>
            <motion.ul variants={staggerContainer} className="space-y-2 text-left max-w-md mx-auto">
              {feature.solution.bullets.map((bullet, j) => (
                <motion.li key={j} variants={fadeUp} className="flex items-start gap-2 text-stone text-sm">
                  <span className="text-teal mt-0.5 flex-shrink-0">&#10003;</span>
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/features/OrderingFeature.tsx
git commit -m "feat: add OrderingFeature with problem-to-solution scroll-reveal"
```

---

### Task 6: KitchenFeature (Split Layout)

**Files:**
- Create: `src/components/features/KitchenFeature.tsx`

- [ ] **Step 1: Create KitchenFeature component**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { FEATURE_SECTIONS } from '@/lib/features-content'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function KitchenFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const feature = FEATURE_SECTIONS[1]
  const problemOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const problemX = useTransform(scrollYProgress, [0, 0.35], [0, reduceMotion ? 0 : -30])
  const solutionOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1])
  const solutionX = useTransform(scrollYProgress, [0.4, 0.65], [reduceMotion ? 0 : 30, 0])

  return (
    <FeatureCard3D id="kitchen" perspective="deep" className="bg-carbon/10">
      <div ref={sectionRef} className="relative min-h-[60dvh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-center">
          {/* Problem Side */}
          <motion.div
            style={{ opacity: problemOpacity, x: problemX }}
            className="text-center lg:text-right"
          >
            <span className="text-5xl mb-3 block">{feature.problem.icon}</span>
            <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block">
              Before RestOS
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-ember mb-3 text-balance">
              {feature.problem.headline}
            </h3>
            <ul className="space-y-2 inline-block text-left">
              {feature.problem.bullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-2 text-stone text-sm">
                  <span className="text-ember/50 mt-0.5 flex-shrink-0">&#10007;</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            style={{ opacity: solutionOpacity, x: solutionX }}
          >
            <motion.div
              variants={reduceMotion ? {} : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-5xl mb-3 block">{feature.solution.icon}</span>
              <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
                After RestOS
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-teal mb-2 text-balance">
                {feature.solution.headline}
              </h3>
              <p className="text-stone text-sm sm:text-base leading-relaxed mb-4">
                {feature.solution.description}
              </p>
              <motion.ul variants={staggerContainer} className="space-y-1.5">
                {feature.solution.bullets.map((bullet, j) => (
                  <motion.li key={j} variants={fadeUp} className="flex items-start gap-2 text-stone text-sm">
                    <span className="text-teal mt-0.5 flex-shrink-0">&#10003;</span>
                    {bullet}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Status badge decoration */}
        <motion.div
          className="absolute top-4 right-4 lg:right-8 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono"
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [1, 0]) }}
        >
          Order #1042 · 12 min
        </motion.div>
        <motion.div
          className="absolute top-4 left-4 lg:left-8 px-3 py-1 rounded-full border border-teal/30 bg-teal/10 text-teal text-xs font-mono"
          style={{ opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1]) }}
        >
          Order #1042 · Confirmed
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/features/KitchenFeature.tsx
git commit -m "feat: add KitchenFeature with split before/after layout"
```

---

### Task 7: PaymentFeature (Region-Aware)

**Files:**
- Create: `src/components/features/PaymentFeature.tsx`

- [ ] **Step 1: Create PaymentFeature component**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { RegionPaymentFeature } from '@/components/ui/RegionContent'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function PaymentFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const problemOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const problemY = useTransform(scrollYProgress, [0, 0.3], [0, reduceMotion ? 0 : -20])
  const solutionOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.35, 0.6], [reduceMotion ? 0 : 20, 0])

  const problemHeadline = 'Waiting for the bill, queuing to pay, running card machines between tables'
  const problemBullets = [
    'Customers waiting for the bill after finishing their meal',
    'Queues forming at the payment counter during busy hours',
    'Staff running card machines between tables',
    'Lost revenue from customers who leave instead of waiting',
  ]

  return (
    <FeatureCard3D id="payment" className="bg-midnight">
      <div ref={sectionRef} className="relative min-h-[55dvh] flex items-center">
        <motion.div
          style={{ opacity: problemOpacity, y: problemY }}
          className="absolute inset-0 flex items-center"
        >
          <div className="max-w-md mx-auto">
            <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block text-center">
              The Problem
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-ember text-center mb-4 text-balance">
              {problemHeadline}
            </h3>
            <ul className="space-y-2 max-w-sm mx-auto">
              {problemBullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-2 text-stone text-sm">
                  <span className="text-ember/50 mt-0.5 flex-shrink-0">&#10007;</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: solutionOpacity, y: solutionY }}
          className="w-full"
        >
          <motion.div
            variants={reduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-lg mx-auto"
          >
            <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
              Payments
            </span>
            <RegionPaymentFeature />
          </motion.div>
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/features/PaymentFeature.tsx
git commit -m "feat: add PaymentFeature with region-aware payment content"
```

---

### Task 8: ManagementFeature

**Files:**
- Create: `src/components/features/ManagementFeature.tsx`

- [ ] **Step 1: Create ManagementFeature component**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { FEATURE_SECTIONS } from '@/lib/features-content'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function ManagementFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const feature = FEATURE_SECTIONS[2]
  const problemOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
  const solutionOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.4, 0.65], [reduceMotion ? 0 : 20, 0])

  return (
    <FeatureCard3D id="management" perspective="deep">
      <div ref={sectionRef} className="relative min-h-[55dvh] flex items-center">
        <motion.div
          style={{ opacity: problemOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center max-w-lg mx-auto">
            <span className="text-5xl mb-4 block">{feature.problem.icon}</span>
            <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block">
              The Problem
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-amber-300/80 mb-4 text-balance">
              {feature.problem.headline}
            </h3>
            <ul className="space-y-2 text-left max-w-md mx-auto">
              {feature.problem.bullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-2 text-stone text-sm">
                  <span className="text-ember/50 mt-0.5 flex-shrink-0">&#10007;</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: solutionOpacity, y: solutionY }}
          className="w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
            <motion.div
              variants={reduceMotion ? {} : staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className="text-5xl mb-3 block">{feature.solution.icon}</span>
              <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
                {feature.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-teal mb-2 text-balance">
                {feature.solution.headline}
              </h3>
              <p className="text-stone text-sm sm:text-base leading-relaxed mb-4">
                {feature.solution.description}
              </p>
              <motion.ul variants={staggerContainer} className="space-y-1.5">
                {feature.solution.bullets.map((bullet, j) => (
                  <motion.li key={j} variants={fadeUp} className="flex items-start gap-2 text-stone text-sm">
                    <span className="text-teal mt-0.5 flex-shrink-0">&#10003;</span>
                    {bullet}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Dashboard mockup card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
              className="w-72 rounded-xl border border-wire bg-carbon p-4 shadow-2xl shadow-ember/5"
              style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-wire">
                <span className="text-xs font-mono text-stone">Today</span>
                <span className="text-xs font-mono text-teal">&#9650; +12%</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone">Revenue</span>
                  <span className="text-warm-white font-mono font-bold">&#8377;42,580</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone">Orders</span>
                  <span className="text-warm-white font-mono">84</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone">Avg Order</span>
                  <span className="text-warm-white font-mono">&#8377;506</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone">Tables</span>
                  <span className="text-teal font-mono">12/18</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/features/ManagementFeature.tsx
git commit -m "feat: add ManagementFeature with dashboard mockup"
```

---

### Task 9: AnalyticsFeature (Region-Aware)

**Files:**
- Create: `src/components/features/AnalyticsFeature.tsx`

- [ ] **Step 1: Create AnalyticsFeature component**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FeatureCard3D } from './FeatureCard3D'
import { RegionAnalyticsDescription } from '@/components/ui/RegionContent'
import { counterUp } from '@/lib/animations'

const ANALYTICS_DATA = [
  { label: 'Best Seller', value: 'Biryani', sub: '342 orders this week' },
  { label: 'Peak Hour', value: '8-9 PM', sub: '42% of daily revenue' },
  { label: 'Avg Check', value: '&#8377;520', sub: '+8% vs last month' },
  { label: 'Revenue/Month', value: '&#8377;12.6L', sub: 'Dine-in: 68% | Takeaway: 32%' },
]

export function AnalyticsFeature() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const problemOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const solutionOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1])
  const solutionY = useTransform(scrollYProgress, [0.35, 0.6], [reduceMotion ? 0 : 20, 0])

  const problemHeadline = 'Guessing which dishes are profitable, overstaffing or understaffing during peak hours'
  const problemBullets = [
    'Guessing which dishes are actually profitable',
    'Overstaffing or understaffing during peak hours',
    'Not knowing where revenue comes from',
    'Making decisions based on assumptions instead of data',
  ]

  return (
    <FeatureCard3D id="analytics" className="bg-carbon/10">
      <div ref={sectionRef} className="relative min-h-[55dvh] flex items-center">
        <motion.div
          style={{ opacity: problemOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center max-w-lg mx-auto">
            <span className="text-5xl mb-4 block">&#129300;</span>
            <span className="text-[10px] font-mono tracking-widest text-ember/60 uppercase mb-2 block">
              The Problem
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-ember mb-4 text-balance">
              {problemHeadline}
            </h3>
            <ul className="space-y-2 text-left max-w-md mx-auto">
              {problemBullets.map((bullet, j) => (
                <li key={j} className="flex items-start gap-2 text-stone text-sm">
                  <span className="text-ember/50 mt-0.5 flex-shrink-0">&#10007;</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: solutionOpacity, y: solutionY }}
          className="w-full"
        >
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-5xl mb-3 block">&#128202;</span>
            <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-2 block">
              Analytics
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-teal mb-2 text-balance">
              Know What Makes Money
            </h3>
            <p className="text-stone text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
              <RegionAnalyticsDescription />
            </p>

            {/* Data cards */}
            <motion.div
              initial={reduceMotion ? undefined : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-2 gap-3 max-w-lg mx-auto"
            >
              {ANALYTICS_DATA.map((item, i) => (
                <motion.div
                  key={i}
                  variants={counterUp}
                  custom={i}
                  className="rounded-xl border border-wire bg-carbon p-4 text-center"
                  style={{ transformStyle: 'preserve-3d', translateZ: `${(i + 1) * 6}px` }}
                >
                  <div className="text-xs font-mono text-stone mb-1">{item.label}</div>
                  <div className="text-lg font-display font-bold text-warm-white" dangerouslySetInnerHTML={{ __html: item.value }} />
                  <div className="text-[10px] font-mono text-stone/60 mt-0.5">{item.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </FeatureCard3D>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/features/AnalyticsFeature.tsx
git commit -m "feat: add AnalyticsFeature with region-aware analytics and data cards"
```

---

### Task 10: BYODFeature + FeaturesCTA

**Files:**
- Create: `src/components/features/BYODFeature.tsx`
- Create: `src/components/features/FeaturesCTA.tsx`

- [ ] **Step 1: Create BYODFeature component**

```tsx
'use client'

import { motion } from 'framer-motion'
import { deviceFloat, staggerContainer, fadeUp } from '@/lib/animations'
import { BYOD_CONTENT } from '@/lib/features-content'

export function BYODFeature() {
  const devices = [
    { emoji: '📱', label: 'Phone', delay: 0, x: -80, y: -40 },
    { emoji: '📟', label: 'Tablet', delay: 0.3, x: 80, y: 20 },
    { emoji: '🖥️', label: 'TV/Monitor', delay: 0.6, x: 0, y: 60 },
  ]

  return (
    <section className="bg-midnight py-28 md:py-36 px-4 overflow-hidden relative">
      <div className="max-w-3xl mx-auto text-center relative" style={{ perspective: '800px' }}>
        {/* Floating devices in a subtle orbit */}
        <div className="relative h-32 mb-8">
          {devices.map((device, i) => (
            <motion.div
              key={i}
              variants={deviceFloat}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(calc(-50% + ${device.x}px), calc(-50% + ${device.y}px))`,
              }}
              animate={{
                y: [device.y, device.y - 10, device.y],
                x: [device.x, device.x + 5, device.x],
              }}
              transition={{ repeat: Infinity, duration: 4, delay: device.delay, ease: 'easeInOut' }}
            >
              <span className="text-3xl block">{device.emoji}</span>
              <span className="text-[10px] font-mono text-stone/50 mt-1 block">{device.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className="text-[10px] font-mono tracking-widest text-gold uppercase mb-3 block text-center">
            Bring Your Own Device
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white text-balance leading-tight mb-6">
            {BYOD_CONTENT.headline}
          </h2>
          <p className="text-stone text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
            {BYOD_CONTENT.subtext}
          </p>
          <motion.ul variants={staggerContainer} className="space-y-2 max-w-sm mx-auto text-left">
            {BYOD_CONTENT.bullets.map((bullet, j) => (
              <motion.li key={j} variants={fadeUp} className="flex items-start gap-2 text-stone/80 text-sm">
                <span className="text-gold mt-0.5 flex-shrink-0">&#10003;</span>
                {bullet}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create FeaturesCTA component**

```tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { RegionLinkButton } from '@/components/ui/RegionLinkButton'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { useRegion } from '@/lib/region-context'
import { ctaEntry } from '@/lib/animations'
import { CTA_CONTENT } from '@/lib/features-content'

export function FeaturesCTA() {
  const region = useRegion()

  return (
    <section className="relative py-20 sm:py-28 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-carbon/80 to-midnight pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(232,116,42,0.06)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl mx-auto">
        <motion.h2
          variants={ctaEntry}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-8 text-balance leading-tight"
        >
          {CTA_CONTENT.headline}
        </motion.h2>
        <motion.div
          variants={ctaEntry}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <RegionLinkButton slug="demo" className="w-full sm:w-auto justify-center py-4 text-base">
            Book a Free Demo
          </RegionLinkButton>
          <WhatsAppButton className="w-full sm:w-auto justify-center py-4" />
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify both compile**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/components/features/BYODFeature.tsx src/components/features/FeaturesCTA.tsx
git commit -m "feat: add BYODFeature and FeaturesCTA sections"
```

---

### Task 11: FeaturesClient Orchestrator + Barrel + Page Shell

**Files:**
- Create: `src/components/features/FeaturesClient.tsx`
- Create: `src/components/features/index.ts`
- Modify: `src/app/_features/page.tsx`

- [ ] **Step 1: Create barrel exports**

```ts
// src/components/features/index.ts
export { FeaturesHero } from './FeaturesHero'
export { TimelineOverview } from './TimelineOverview'
export { OrderingFeature } from './OrderingFeature'
export { KitchenFeature } from './KitchenFeature'
export { PaymentFeature } from './PaymentFeature'
export { ManagementFeature } from './ManagementFeature'
export { AnalyticsFeature } from './AnalyticsFeature'
export { BYODFeature } from './BYODFeature'
export { FeaturesCTA } from './FeaturesCTA'
```

- [ ] **Step 2: Create FeaturesClient orchestrator**

```tsx
'use client'

import { FeaturesHero } from './FeaturesHero'
import { TimelineOverview } from './TimelineOverview'
import { OrderingFeature } from './OrderingFeature'
import { KitchenFeature } from './KitchenFeature'
import { PaymentFeature } from './PaymentFeature'
import { ManagementFeature } from './ManagementFeature'
import { AnalyticsFeature } from './AnalyticsFeature'
import { BYODFeature } from './BYODFeature'
import { FeaturesCTA } from './FeaturesCTA'

export function FeaturesClient() {
  return (
    <>
      <FeaturesHero />
      <TimelineOverview />
      <OrderingFeature />
      <KitchenFeature />
      <PaymentFeature />
      <ManagementFeature />
      <AnalyticsFeature />
      <BYODFeature />
      <FeaturesCTA />
    </>
  )
}
```

- [ ] **Step 3: Update page.tsx page shell**

Replace existing content with:

```tsx
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FeaturesClient } from '@/components/features'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Every RestOS feature translated into outcomes for your restaurant: QR code ordering, kitchen display system, payments, management dashboard, and real-time analytics.',
  openGraph: {
    title: 'RestOS Features — QR Ordering, KDS, Payments & Analytics',
    description:
      'QR code ordering, kitchen display system, payments, management dashboard, and real-time analytics — all connected.',
    url: 'https://restos.in/features',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RestOS Features' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RestOS Features — QR Ordering, KDS, Payments & Analytics',
    description: 'Every RestOS feature explained: QR ordering, kitchen display, payments, management, and analytics.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://restos.in/features' },
}

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://restos.in/' },
              { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://restos.in/features' },
            ],
          }),
        }}
      />
      <main className="bg-midnight min-h-screen">
        <FeaturesClient />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 5: Run the dev server to verify rendering**

Run: `npm run dev`
Expected: Dev server starts without errors. Navigate to `/features` and see all sections rendered.

- [ ] **Step 6: Commit**

```bash
git add src/components/features/ src/app/_features/page.tsx
git commit -m "feat: wire up features page with 3D storytelling sections"
```

---

## Self-Review

**1. Spec coverage check:**
- Hero (Section 1) -> Task 3 ✓
- Timeline (Section 2) -> Task 4 ✓
- OrderingFeature (Section 3) -> Task 5 ✓
- KitchenFeature (Section 4) -> Task 6 ✓
- PaymentFeature (Section 5) -> Task 7 ✓
- ManagementFeature (Section 6) -> Task 8 ✓
- AnalyticsFeature (Section 7) -> Task 9 ✓
- BYODFeature (Section 8) -> Task 10 ✓
- FeaturesCTA (Section 9) -> Task 10 ✓
- FeatureCard3D shared wrapper -> Task 2 ✓
- Content data file -> Task 1 ✓
- Region-aware content -> Tasks 7, 9 using existing components ✓
- Page shell -> Task 11 ✓
- Animation variants -> Task 1 ✓
- Responsive: handled by Tailwind classes and FeatureCard3D reduced motion ✓

**2. Placeholder scan:** No TBD, TODO, or placeholder patterns found ✓

**3. Type consistency:** All imports reference files created in earlier tasks. Imports match barrel exports in Task 11 ✓
