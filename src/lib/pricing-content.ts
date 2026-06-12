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
