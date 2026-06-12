# Pricing Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the pre-launch pricing page with a region-aware launch page — Free/Premium/Elite tiers, a Monthly/6-mo/12-mo billing toggle with live savings, an honest-pricing bar, a full comparison table, FAQ, and CTA band — with a slim Founding Partner promo strip kept on top.

**Architecture:** All pricing data (prices, discounts, plan feature lists, comparison matrix) lives in a new `src/lib/pricing-content.ts`. `_pricing/page.tsx` becomes a server shell (Founding strip + region-correct JSON-LD) that mounts a `PricingClient` island holding the billing-cycle state; small presentational sub-components render cards/table/etc. Prices render through the existing `formatCurrency`; payments/tax content comes from `regionConfig`.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, Tailwind, framer-motion. No unit-test runner — **verification is `npm run build` + dev-server visual checks + `Grep` audits.**

---

## File Structure
- **Modify** `src/lib/region-config.ts` — add `appUrl`, `paymentRowLabel`, `taxExportLine` to `RegionConfig` + both regions.
- **Create** `src/lib/pricing-content.ts` — types, `CYCLE_DISCOUNT`, `PLAN_PRICES`, `priceFor`, `PLANS`, `COMPARISON`, text resolvers.
- **Create** `src/components/pricing/icons.tsx` — `Check`, `Cross` SVG helpers.
- **Create** `src/components/pricing/BillingToggle.tsx`, `PlanCard.tsx`, `HonestBar.tsx`, `ComparisonTable.tsx`, `PricingFAQ.tsx`, `PricingCTA.tsx`, `FoundingStrip.tsx`, `PricingClient.tsx`.
- **Modify** `src/app/_pricing/page.tsx` — server shell + region-correct schema mounting `PricingClient`.

---

## Task 1: Region config fields

**Files:** `src/lib/region-config.ts`

- [ ] **Step 1: Add interface fields.** In the `RegionConfig` interface, after `paymentPhrase`, add:

```ts
  /** SaaS app base URL for sign-up / trial CTAs */
  appUrl: string
  /** Pricing comparison "payments" row label */
  paymentRowLabel: string
  /** Pricing comparison "tax" row label */
  taxExportLine: string
```

- [ ] **Step 2: Populate India.** In the `in` object (after `paymentPhrase`):

```ts
    appUrl: 'https://app.omniviya.in',
    paymentRowLabel: 'UPI, Razorpay, Cashfree',
    taxExportLine: 'GST billing + GSTR-1 export',
```

- [ ] **Step 3: Populate UK.** In the `uk` object (after `paymentPhrase`):

```ts
    appUrl: 'https://app.omniviya.in',
    paymentRowLabel: 'Card, contactless, Apple Pay, Stripe',
    taxExportLine: 'VAT billing + MTD-ready export',
```

- [ ] **Step 4: Verify.** Run: `npm run build` → expect no "missing property" type errors.

---

## Task 2: Pricing data module

**Files:** Create `src/lib/pricing-content.ts`

- [ ] **Step 1: Write the full module.**

```ts
import type { Region, RegionConfig } from './region-config'

export type BillingCycle = 'monthly' | 'sixmo' | 'annual'

export const BILLING_CYCLES: { id: BillingCycle; label: string; billed: string }[] = [
  { id: 'monthly', label: 'Monthly', billed: 'billed monthly' },
  { id: 'sixmo', label: '6 months', billed: 'billed every 6 months' },
  { id: 'annual', label: '12 months', billed: 'billed yearly' },
]

/** Same discounts in both regions. */
export const CYCLE_DISCOUNT: Record<BillingCycle, number> = {
  monthly: 0,
  sixmo: 0.10,
  annual: 0.17,
}

/** Base MONTHLY price per region, in major currency units. Free is always 0. */
export const PLAN_PRICES: Record<Region, { premium: number; elite: number }> = {
  in: { premium: 1199, elite: 2499 },
  uk: { premium: 39, elite: 79 },
}

export function priceFor(region: Region, plan: 'premium' | 'elite', cycle: BillingCycle) {
  const base = PLAN_PRICES[region][plan]
  const effectiveMonthly = Math.round(base * (1 - CYCLE_DISCOUNT[cycle]))
  const savingsPerYear = (base - effectiveMonthly) * 12
  return { base, effectiveMonthly, savingsPerYear }
}

// ---- Plan cards ----
export type RegionSlot = 'payments' | 'tax'

export interface PlanFeature {
  text: string
  included: boolean
  region?: RegionSlot
  bold?: boolean
  beta?: boolean
}
export interface PlanGroup { label: string; features: PlanFeature[] }
export interface Plan {
  id: 'free' | 'premium' | 'elite'
  name: string
  tier: string
  tagline: string
  ctaLabel: string
  ctaClass: string
  featured?: boolean
  priced: boolean
  groups: PlanGroup[]
}

const f = (text: string, included = true, extra: Partial<PlanFeature> = {}): PlanFeature => ({ text, included, ...extra })

export const PLANS: Plan[] = [
  {
    id: 'free', name: 'Free', tier: 'Free forever', priced: false,
    tagline: 'Digital presence for your restaurant. Give customers a beautiful menu online — free forever.',
    ctaLabel: 'Get started free', ctaClass: 'border border-wire text-warm-white hover:border-stone',
    groups: [
      { label: 'Digital menu', features: [
        f('Menu categories, items & photos'), f('Variants, modifiers, add-ons'),
        f('Veg / non-veg labels'), f('Public menu URL for your restaurant'), f('Live menu updates — instant'),
      ]},
      { label: 'Not included', features: [
        f('Customer ordering', false), f('Payments', false), f('POS & kitchen display', false),
      ]},
    ],
  },
  {
    id: 'premium', name: 'Premium', tier: 'Launch price', priced: true, featured: true,
    tagline: 'Full restaurant operations. QR ordering, live kitchen, payments — everything to run your shift.',
    ctaLabel: 'Start free trial', ctaClass: 'bg-ember text-white hover:opacity-90',
    groups: [
      { label: 'Everything in Free, plus', features: [
        f('QR self-ordering — customers order from their phone', true, { bold: true }),
        f('Live order management — real-time order board', true, { bold: true }),
        f('POS terminal — waiter-assisted ordering', true, { bold: true }),
        f('Online payments', true, { bold: true, region: 'payments' }),
        f('Kitchen Display System — live KDS on any screen', true, { bold: true }),
        f('Drag-and-drop KOT board with audio alerts'),
        f('Table management — track occupancy live', true, { bold: true }),
        f('Waiter app — staff roles, PIN auth', true, { bold: true }),
        f('Bill splitting & table transfer'),
        f('Bluetooth thermal printing (ESC/POS)'),
        f('Customer real-time order tracking'),
        f('Tax', true, { region: 'tax' }),
        f('Basic analytics & daily snapshot'),
        f('Offline mode — queues orders during outages'),
        f('PWA — installs on any phone or tablet'),
      ]},
    ],
  },
  {
    id: 'elite', name: 'Elite', tier: 'Full access', priced: true,
    tagline: 'Every feature, every beta. The complete platform for ambitious restaurants and growing chains.',
    ctaLabel: 'Start free trial', ctaClass: 'bg-warm-white text-midnight hover:opacity-90',
    groups: [
      { label: 'Everything in Premium, plus', features: [
        f('Inventory management — stock, suppliers, POs', true, { bold: true }),
        f('Recipes — auto-deduct stock on order completion'),
        f('Loyalty program — Bronze / Silver / Gold tiers', true, { bold: true }),
        f('Coupons & discount codes'),
        f('Online reservations — slot intelligence, no-show mgmt', true, { bold: true }),
        f('Floor plan designer — drag-and-drop layout', true, { bold: true }),
        f('Events & ticketing — paid events, QR check-in', true, { bold: true }),
        f('Digital signage — QR-paired screens, playlists', true, { bold: true }),
        f('Online storefront — commission-free ordering page', true, { bold: true }),
        f('Blog & content CMS'),
        f('Staff attendance & clock-in / out'),
        f('Advanced analytics — peak hours, top dishes'),
        f('Multi-brand & multi-outlet management'),
        f('Customer reviews & owner replies'),
        f('Priority support'),
        f('Beta features — early access to everything new', true, { beta: true }),
      ]},
    ],
  },
]

/** Resolve a plan feature's display text, filling region slots from config. */
export function resolveFeatureText(cfg: RegionConfig, feat: PlanFeature): string {
  if (feat.region === 'payments') return `Online payments — ${cfg.paymentRowLabel}`
  if (feat.region === 'tax') return cfg.taxExportLine
  return feat.text
}

// ---- Comparison table ----
export interface CompareRow { feature: string; free: boolean; premium: boolean; elite: boolean; region?: RegionSlot }
export interface CompareSection { section: string; rows: CompareRow[] }

const r = (feature: string, free: boolean, premium: boolean, elite: boolean, region?: RegionSlot): CompareRow =>
  ({ feature, free, premium, elite, region })

export const COMPARISON: CompareSection[] = [
  { section: 'Digital menu', rows: [
    r('Menu categories, items & photos', true, true, true),
    r('Variants, modifiers, add-ons', true, true, true),
    r('Stock tracking & auto-hide', true, true, true),
    r('Public menu URL', true, true, true),
  ]},
  { section: 'Ordering & POS', rows: [
    r('QR self-ordering (customer phone)', false, true, true),
    r('POS terminal (waiter-assisted)', false, true, true),
    r('Takeaway ordering', false, true, true),
    r('Bill splitting', false, true, true),
    r('Table transfer between orders', false, true, true),
    r('Customer real-time order tracking', false, true, true),
    r('Offline mode — queues & auto-syncs', false, true, true),
  ]},
  { section: 'Kitchen & operations', rows: [
    r('Kitchen Display System (KDS)', false, true, true),
    r('Drag-and-drop KOT columns', false, true, true),
    r('Audio alerts on new orders', false, true, true),
    r('TV full-screen KDS mode', false, true, true),
    r('Table management & floor plan', false, true, true),
    r('Bluetooth thermal printing', false, true, true),
  ]},
  { section: 'Payments', rows: [
    r('payments', false, true, true, 'payments'),
    r('Cash & pay-on-counter', false, true, true),
    r('0% transaction fee — always', true, true, true),
    r('tax', false, true, true, 'tax'),
  ]},
  { section: 'Staff & security', rows: [
    r('Staff roles & PIN authentication', false, true, true),
    r('Staff attendance & clock-in / out', false, false, true),
    r('Audit log — every action logged', false, true, true),
    r('Push notifications (web & mobile)', false, true, true),
  ]},
  { section: 'Analytics & reporting', rows: [
    r('Daily snapshot & basic reports', false, true, true),
    r('Peak hour heatmap', false, false, true),
    r('Top dishes & revenue reports', false, false, true),
    r('Payment breakdown by method', false, true, true),
  ]},
  { section: 'Growth & marketing (Elite)', rows: [
    r('Inventory — ingredients, suppliers, POs', false, false, true),
    r('Loyalty program — Bronze / Silver / Gold', false, false, true),
    r('Coupons & discount codes', false, false, true),
    r('Online reservations', false, false, true),
    r('Events & ticketing', false, false, true),
    r('Digital signage — screens & playlists', false, false, true),
    r('Online storefront (commission-free)', false, false, true),
    r('Blog & content CMS', false, false, true),
    r('Multi-brand & multi-outlet', false, false, true),
    r('Customer reviews & owner replies', false, false, true),
  ]},
]

export function resolveRowLabel(cfg: RegionConfig, row: CompareRow): string {
  if (row.region === 'payments') return cfg.paymentRowLabel
  if (row.region === 'tax') return cfg.taxExportLine
  return row.feature
}
```

- [ ] **Step 2: Verify build.** Run: `npm run build` → no errors in `pricing-content.ts`.
- [ ] **Step 3: Spot-check math (documented expectation).** `priceFor('in','premium','annual')` → `{ base:1199, effectiveMonthly:995, savingsPerYear:2448 }`; `priceFor('uk','elite','sixmo')` → `{ base:79, effectiveMonthly:71, savingsPerYear:96 }`. (No runner; this is the expected output to eyeball against in Task 6 visual check.)
- [ ] **Step 4: Commit.** `git add src/lib/region-config.ts src/lib/pricing-content.ts && git commit -m "feat(pricing): region config fields + pricing data module (plans, prices, comparison)"`

---

## Task 3: Icons + BillingToggle + PlanCard

**Files:** Create `src/components/pricing/icons.tsx`, `BillingToggle.tsx`, `PlanCard.tsx`

- [ ] **Step 1: icons.tsx.**

```tsx
export function Check({ className = 'w-4 h-4 text-teal' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5} className={className} aria-hidden="true">
      <polyline points="2,8 6,12 14,4" />
    </svg>
  )
}
export function Cross({ className = 'w-4 h-4 text-wire' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.5} className={className} aria-hidden="true">
      <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
    </svg>
  )
}
```

- [ ] **Step 2: BillingToggle.tsx.**

```tsx
'use client'
import type { BillingCycle } from '@/lib/pricing-content'
import { BILLING_CYCLES } from '@/lib/pricing-content'

export function BillingToggle({ cycle, onChange }: { cycle: BillingCycle; onChange: (c: BillingCycle) => void }) {
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
      <div className="flex bg-carbon border border-wire rounded-xl p-1 gap-1">
        {BILLING_CYCLES.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            className={`text-sm font-display font-medium px-5 py-2 rounded-lg transition-colors min-h-[40px] ${
              cycle === c.id ? 'bg-ember text-white' : 'text-stone hover:text-warm-white'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      {cycle !== 'monthly' && (
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-teal/15 text-teal border border-teal/30">
          Save up to 17%
        </span>
      )}
    </div>
  )
}
```

- [ ] **Step 3: PlanCard.tsx.**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useRegion } from '@/lib/region-context'
import { formatCurrency } from '@/lib/format'
import { Check, Cross } from './icons'
import { priceFor, resolveFeatureText, type Plan, type BillingCycle } from '@/lib/pricing-content'

export function PlanCard({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) {
  const region = useRegion()
  const price = plan.priced ? priceFor(region.key, plan.id as 'premium' | 'elite', cycle) : null
  const discounted = !!price && cycle !== 'monthly'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      className={`relative flex flex-col rounded-2xl p-6 sm:p-7 border ${
        plan.featured ? 'border-ember bg-gradient-to-b from-[#1C1A12] to-carbon' : 'border-wire bg-carbon'
      }`}
    >
      {plan.featured && <span className="absolute top-0 left-0 right-0 h-0.5 bg-ember rounded-t-2xl" />}
      {plan.featured && (
        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-ember/15 text-ember border border-ember/30">
          Most popular
        </span>
      )}
      <p className="text-[10px] font-mono uppercase tracking-widest text-stone/70 mb-2">{plan.tier}</p>
      <h3 className="text-xl font-display font-bold text-warm-white mb-1">{plan.name}</h3>
      <p className="text-sm text-stone leading-relaxed mb-5 min-h-[40px]">{plan.tagline}</p>

      <div className="mb-1">
        {price ? (
          <>
            {discounted && (
              <span className="text-sm text-stone/60 line-through mr-1.5">{formatCurrency(region.key, price.base)}</span>
            )}
            <span className="text-4xl font-display font-bold text-warm-white tracking-tight">
              {formatCurrency(region.key, price.effectiveMonthly)}
            </span>
            <span className="text-sm text-stone/60 ml-1">/mo</span>
          </>
        ) : (
          <span className="text-4xl font-display font-bold text-teal">{formatCurrency(region.key, 0)}</span>
        )}
      </div>
      <p className="text-xs text-stone/60 mb-1 min-h-[18px]">
        {price ? (
          <>billed {cycle === 'monthly' ? 'monthly' : cycle === 'sixmo' ? 'every 6 months' : 'yearly'}{' '}
            {cycle === 'monthly' && <span className="text-ember">· launch price</span>}</>
        ) : ' '}
      </p>
      {price && price.savingsPerYear > 0 && (
        <p className="text-xs font-medium text-teal bg-teal/10 border border-teal/25 rounded-md px-2.5 py-1.5 mb-3 inline-flex items-center gap-1.5 w-fit">
          <Check className="w-3 h-3 text-teal" /> Save {formatCurrency(region.key, price.savingsPerYear)}/yr
        </p>
      )}

      <a
        href={plan.priced ? `${region.appUrl}/register` : `${region.appUrl}/register`}
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center py-3 rounded-lg text-sm font-display font-medium mb-6 transition ${plan.ctaClass}`}
      >
        {plan.ctaLabel}
      </a>

      <hr className="border-wire mb-5" />
      {plan.groups.map((g) => (
        <div key={g.label} className="mb-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-stone/60 mb-2 mt-3 first:mt-0">{g.label}</p>
          {g.features.map((feat, i) => (
            <div key={i} className={`flex items-start gap-2 text-[13px] py-1 leading-snug ${feat.included ? 'text-stone' : 'text-stone/40'}`}>
              <span className="flex-shrink-0 mt-0.5">{feat.included ? <Check className="w-3.5 h-3.5 text-teal" /> : <Cross className="w-3.5 h-3.5 text-wire" />}</span>
              <span>
                <span className={feat.bold ? 'text-warm-white font-medium' : ''}>{resolveFeatureText(region, feat)}</span>
                {feat.beta && <span className="ml-1 text-[10px] px-1.5 py-px rounded-full bg-gold/15 text-gold border border-gold/25 align-middle">BETA</span>}
              </span>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  )
}
```

- [ ] **Step 4: Verify build.** Run: `npm run build` (components compile; not yet mounted).
- [ ] **Step 5: Commit.** `git add src/components/pricing && git commit -m "feat(pricing): icons, billing toggle, plan card"`

---

## Task 4: HonestBar + ComparisonTable

**Files:** Create `src/components/pricing/HonestBar.tsx`, `ComparisonTable.tsx`

- [ ] **Step 1: HonestBar.tsx.**

```tsx
'use client'
import { useRegion } from '@/lib/region-context'
import { formatCurrency } from '@/lib/format'
import { priceFor } from '@/lib/pricing-content'

export function HonestBar() {
  const region = useRegion()
  const premiumAnnualSaving = priceFor(region.key, 'premium', 'annual').savingsPerYear
  const items = [
    { label: 'Commission on orders', val: '0%', teal: true },
    { label: 'Setup fee', val: 'None', teal: true },
    { label: 'Free trial', val: '14 days' },
    { label: 'Annual lock-in', val: 'None', teal: true },
    { label: 'Hidden add-ons', val: 'None', teal: true },
    { label: 'Hardware required', val: 'None', teal: true },
    { label: 'Premium annual saving', val: `${formatCurrency(region.key, premiumAnnualSaving)}/yr` },
  ]
  return (
    <div className="max-w-5xl mx-auto px-4 mt-8">
      <div className="bg-carbon border border-wire rounded-2xl px-6 py-5 flex flex-wrap gap-6 justify-center items-center">
        {items.map((it) => (
          <div key={it.label} className="text-center">
            <div className="text-[11px] text-stone/60 mb-0.5">{it.label}</div>
            <div className={`text-[15px] font-medium ${it.teal ? 'text-teal' : 'text-warm-white'}`}>{it.val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: ComparisonTable.tsx.**

```tsx
'use client'
import { useRegion } from '@/lib/region-context'
import { Check, Cross } from './icons'
import { COMPARISON, resolveRowLabel } from '@/lib/pricing-content'

function Cell({ on }: { on: boolean }) {
  return <span className="inline-flex justify-center">{on ? <Check /> : <Cross />}</span>
}

export function ComparisonTable() {
  const region = useRegion()
  return (
    <section className="max-w-5xl mx-auto px-4 mt-20">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-warm-white mb-2">Everything, side by side</h2>
        <p className="text-sm text-stone">Every feature across all three plans — no small print.</p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-wire">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3.5 min-w-[200px] bg-carbon border-b border-wire text-stone font-medium text-xs">Feature</th>
              <th className="p-3.5 bg-carbon border-b border-wire text-stone font-medium text-xs">Free</th>
              <th className="p-3.5 bg-carbon border-b border-wire text-ember font-medium text-xs">Premium</th>
              <th className="p-3.5 bg-carbon border-b border-wire text-ember font-medium text-xs">Elite</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((sec) => (
              <FragmentSection key={sec.section} section={sec.section} rows={sec.rows} region={region} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function FragmentSection({ section, rows, region }: { section: string; rows: typeof COMPARISON[number]['rows']; region: ReturnType<typeof useRegion> }) {
  return (
    <>
      <tr>
        <td colSpan={4} className="bg-white/[0.025] border-b border-wire px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-stone/60">{section}</td>
      </tr>
      {rows.map((row, i) => (
        <tr key={i}>
          <td className="text-left p-3 border-b border-white/[0.04] text-warm-white">{resolveRowLabel(region, row)}</td>
          <td className="text-center p-3 border-b border-white/[0.04]"><Cell on={row.free} /></td>
          <td className="text-center p-3 border-b border-white/[0.04] bg-ember/[0.04]"><Cell on={row.premium} /></td>
          <td className="text-center p-3 border-b border-white/[0.04] bg-ember/[0.04]"><Cell on={row.elite} /></td>
        </tr>
      ))}
    </>
  )
}
```

- [ ] **Step 3: Verify build.** Run: `npm run build`.
- [ ] **Step 4: Commit.** `git add src/components/pricing && git commit -m "feat(pricing): honest bar + full comparison table"`

---

## Task 5: FoundingStrip + FAQ + CTA + PricingClient assembly

**Files:** Create `FoundingStrip.tsx`, `PricingFAQ.tsx`, `PricingCTA.tsx`, `PricingClient.tsx`

- [ ] **Step 1: FoundingStrip.tsx.**

```tsx
'use client'
import Link from 'next/link'
import { useRegion } from '@/lib/region-context'
import { SpotCounter } from '@/components/ui/SpotCounter'

export function FoundingStrip() {
  const region = useRegion()
  return (
    <div className="bg-gold/[0.06] border-b border-gold/20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
        <span className="text-xs sm:text-sm text-warm-white font-medium">Founding Partners — first 90 days free.</span>
        <SpotCounter />
        <Link href={`/${region.key}/founding/`} className="text-xs sm:text-sm text-gold hover:text-gold/80 underline underline-offset-2">
          Claim a spot →
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: PricingFAQ.tsx.** Reuse the region-aware FAQ content currently in `_pricing/page.tsx`.

```tsx
'use client'
import { RegionPaymentFaqAnswer } from '@/components/ui/RegionContent'

const faqs = [
  { q: 'Is there a contract?', a: 'No. No lock-in, no minimum term. Stop at any time.' },
  { q: 'Do I need to buy new hardware?', a: 'No. Omniviya works on phones, tablets, and laptops you already own. Customers use their own phones.' },
  { q: 'Do you take a commission on orders?', a: 'Never. 0% on every order, on every plan. You keep all your revenue.' },
  { q: 'Is my data safe?', a: 'Yes. Your restaurant gets its own isolated database. No other restaurant can see your data. Everything is encrypted.' },
  { q: 'Does it work for takeaway-only restaurants?', a: 'Yes. Dine-in, takeaway, and cloud kitchen flows are all built in.' },
  { q: 'What payment methods are supported?', a: null },
] as const

export function PricingFAQ() {
  return (
    <section className="max-w-2xl mx-auto px-4 mt-20">
      <h2 className="text-xl sm:text-2xl font-display font-bold text-warm-white text-center mb-10">Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-wire/50 pb-6">
            <p className="font-display font-semibold text-warm-white text-sm mb-2">{faq.q}</p>
            <p className="text-stone text-sm leading-relaxed">{faq.a ?? <RegionPaymentFaqAnswer />}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: PricingCTA.tsx.**

```tsx
'use client'
import { useRegion } from '@/lib/region-context'
import { Button } from '@/components/ui/Button'

export function PricingCTA() {
  const region = useRegion()
  return (
    <section className="text-center px-4 mt-20 py-20 border-t border-wire">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white mb-3">
        Ready to get started?
      </h2>
      <p className="text-stone text-base mb-8">14-day free trial. No card required. Cancel anytime.</p>
      <div className="flex justify-center gap-3 flex-wrap">
        <Button href={`${region.appUrl}/register`} variant="primary" external>Start free trial</Button>
        <Button href={`/${region.key}/demo/`} variant="ghost">Book a demo</Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: PricingClient.tsx.**

```tsx
'use client'
import { useState } from 'react'
import { PLANS, type BillingCycle } from '@/lib/pricing-content'
import { BillingToggle } from './BillingToggle'
import { PlanCard } from './PlanCard'
import { HonestBar } from './HonestBar'
import { ComparisonTable } from './ComparisonTable'
import { PricingFAQ } from './PricingFAQ'
import { PricingCTA } from './PricingCTA'

export function PricingClient() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')
  return (
    <>
      <div className="pt-20 pb-10 px-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-ember block mb-4">Pricing</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-3">
          Honest pricing. <span className="text-ember">No surprises.</span>
        </h1>
        <p className="text-stone text-base">We never take a percentage of your orders. No hidden fees, no setup costs. Everything your restaurant needs — in one plan.</p>
      </div>

      <BillingToggle cycle={cycle} onChange={setCycle} />

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan) => <PlanCard key={plan.id} plan={plan} cycle={cycle} />)}
        </div>
      </div>

      <HonestBar />
      <ComparisonTable />
      <PricingFAQ />
      <PricingCTA />
    </>
  )
}
```

- [ ] **Step 5: Verify build.** Run: `npm run build`.
- [ ] **Step 6: Commit.** `git add src/components/pricing && git commit -m "feat(pricing): founding strip, FAQ, CTA, PricingClient assembly"`

---

## Task 6: Server shell + schema, build & visual verify

**Files:** `src/app/_pricing/page.tsx`

- [ ] **Step 1: Rewrite the shell.** Replace the body of `PricingPageContent` so it renders `FoundingStrip` + region-correct Product/Offer schema + `PricingClient`, keeping `Navbar`/`Footer` and the breadcrumb. Full file:

```tsx
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FoundingStrip } from '@/components/pricing/FoundingStrip'
import { PricingClient } from '@/components/pricing/PricingClient'
import type { Region } from '@/lib/region-config'
import { regionConfig } from '@/lib/region-config'
import { PLAN_PRICES } from '@/lib/pricing-content'

const faqsForSchema = [
  { q: 'Is there a contract?', a: 'No. No lock-in, no minimum term. Stop at any time.' },
  { q: 'Do I need to buy new hardware?', a: 'No. Omniviya works on phones, tablets, and laptops you already own. Customers use their own phones.' },
  { q: 'Do you take a commission on orders?', a: 'Never. 0% on every order, on every plan. You keep all your revenue.' },
  { q: 'Is my data safe?', a: 'Yes. Your restaurant gets its own isolated database. No other restaurant can see your data. Everything is encrypted.' },
  { q: 'Does it work for takeaway-only restaurants?', a: 'Yes. Dine-in, takeaway, and cloud kitchen flows are all built in.' },
]

export function PricingPageContent({ region }: { region: Region }) {
  const cfg = regionConfig[region]
  const base = `https://restaurants.omniviya.in/${region}`
  const prices = PLAN_PRICES[region]

  const offersSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Omniviya',
    description: 'Restaurant operating system — QR ordering, kitchen display, payments, and analytics.',
    brand: { '@type': 'Brand', name: 'Omniviya' },
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: cfg.currencyCode, availability: 'https://schema.org/InStock' },
      { '@type': 'Offer', name: 'Premium', price: String(prices.premium), priceCurrency: cfg.currencyCode, availability: 'https://schema.org/InStock', url: `${base}/pricing` },
      { '@type': 'Offer', name: 'Elite', price: String(prices.elite), priceCurrency: cfg.currencyCode, availability: 'https://schema.org/InStock', url: `${base}/pricing` },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      ...faqsForSchema.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      { '@type': 'Question', name: 'What payment methods are supported?', acceptedAnswer: { '@type': 'Answer', text: cfg.paymentFaqAnswer } },
    ],
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${base}/pricing` },
    ],
  }

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main className="bg-midnight min-h-screen">
        <FoundingStrip />
        <PricingClient />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Remove now-dead imports.** Confirm the old `SpotCounter`, `RegionLinkButton`, `RegionPaymentFaqAnswer` imports are gone from `_pricing/page.tsx` (they moved into pricing components). Run: `npm run build` → expect success and no unused-import lint error.

- [ ] **Step 3: Grep audit — no hardcoded region terms in pricing components.** Run: `Grep -n` for `₹|£|\bUPI\b|\bGST\b|\bVAT\b` in `src/components/pricing/` → expected: **no matches** (all via `formatCurrency`/`regionConfig`).

- [ ] **Step 4: Visual verify.** `npm run dev`; open `http://localhost:3000/in/pricing` and `/uk/pricing`. Confirm:
  - Founding strip + SpotCounter on top.
  - Toggle Monthly/6-mo/12-mo updates each paid card's price, "was" strikethrough, billed line, and "Save …/yr"; matches Task 2 Step 3 numbers (IN Premium annual → ₹995 /mo, save ₹2,448/yr).
  - `/in` shows ₹ + "UPI, Razorpay, Cashfree" + "GST billing + GSTR-1 export"; `/uk` shows £ + "Card, contactless, Apple Pay, Stripe" + "VAT billing + MTD-ready export".
  - Comparison table renders all sections; scrolls horizontally on a narrow viewport.
  - "Start free trial" → `app.omniviya.in/register`; "Book a demo" → `/{region}/demo/`.

- [ ] **Step 5: Commit.** `git add src/app/_pricing/page.tsx && git commit -m "feat(pricing): launch pricing page shell with region-correct Offer schema"`

---

## Self-Review

**Spec coverage:**
- Founding coexist strip → Task 5 (`FoundingStrip`), mounted Task 6. ✅
- Hero (Space Grotesk, no serif) → Task 5 `PricingClient`. ✅
- Billing toggle + live price/savings → Tasks 2 (`priceFor`), 3 (`BillingToggle`/`PlanCard`). ✅
- Free/Premium/Elite cards + feature lists → Tasks 2 (`PLANS`), 3 (`PlanCard`). ✅
- Honest bar (region annual saving) → Task 4. ✅
- Full comparison table, region payments/tax rows → Tasks 2 (`COMPARISON`), 4. ✅
- FAQ (region payment answer) → Task 5. ✅
- CTA band → app/register → Task 5. ✅
- Region-awareness (formatCurrency, config payments/tax) → throughout; audited Task 6 Step 3. ✅
- Region-correct Offer schema → Task 6. ✅
- Proposed prices in one config object (`PLAN_PRICES`) → Task 2. ✅

**Placeholder scan:** No TBD/TODO; every component shown in full. The Free CTA intentionally also targets `/register` (sign-up entry for the free menu tier).

**Type consistency:** `BillingCycle`, `priceFor`, `PLANS`, `Plan`, `PlanFeature`, `resolveFeatureText`, `COMPARISON`, `resolveRowLabel`, `PLAN_PRICES` defined in Task 2 are imported with matching names/signatures in Tasks 3–6. `region.appUrl`/`paymentRowLabel`/`taxExportLine` defined in Task 1 match usage in Tasks 3–6. `useRegion()` returns the `RegionConfig` (has `.key`, `.appUrl`, `.paymentRowLabel`, `.taxExportLine`) — consistent with `formatCurrency(region.key, …)`.

**Note:** `FragmentSection` receives `region: ReturnType<typeof useRegion>` (the `RegionConfig`) to keep `resolveRowLabel(cfg, row)` typed; matches `resolveRowLabel(cfg: RegionConfig, …)` in Task 2.
