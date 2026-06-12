# Pricing Page Redesign (Free / Premium / Elite) — Design Spec

**Date:** 2026-06-12
**Status:** Draft — awaiting user review
**Area:** Marketing site `restaurants.omniviya.in/{in,uk}/pricing`

## Goal

Replace the pre-launch pricing page (Founding Partner free + "TBD regular") with a full launch
pricing page — Free / Premium / Elite tiers, a Monthly / 6-month / 12-month billing toggle with
live savings, an honest-pricing bar, a full feature-comparison table, FAQ, and CTA band — fully
region-aware (₹/UPI/GST for India, £/card/VAT for the UK), while **keeping a slim Founding
Partner promo at the very top** (coexistence).

## Locked decisions (from brainstorming)

| Decision | Choice |
|---|---|
| Pricing model | Coexist — slim Founding Partner promo strip on top; Free/Premium/Elite below |
| UK prices | I propose UK-market figures (below); editable in config |
| Discount tiers | Same % in both regions: 6-mo ≈ 10% off, 12-mo ≈ 17% off |
| Typography | Match the site — **Space Grotesk** display (drop Instrument Serif) |
| Comparison table | Full (~40 rows), grouped by section, horizontal-scroll on mobile |
| CTAs | "Start free trial" / "Get started free" → `app.omniviya.in/register`; "Book Demo" secondary |

## Architecture

Data-driven, following the existing `features-content.ts` pattern.

- **`src/lib/pricing-content.ts`** — single source of truth:
  - `BillingCycle = 'monthly' | 'sixmo' | 'annual'` and `CYCLE_DISCOUNT: Record<BillingCycle, number> = { monthly: 0, sixmo: 0.10, annual: 0.17 }`.
  - `PLAN_PRICES: Record<Region, { premium: number; elite: number }>` (base **monthly** price, major units). Free is always 0.
  - `PLANS` — ordered tier metadata (id, name, tier label, tagline, CTA label/style) and per-plan **feature lists** (region-neutral strings + two region-aware slots filled from `regionConfig`: the payments line and the tax line).
  - `COMPARISON` — array of `{ section: string; rows: { feature: string; free: boolean; premium: boolean; elite: boolean; regionAware?: 'payments' | 'tax' }[] }`. `regionAware` rows take their `feature` label from `regionConfig` at render.
  - Helper `priceFor(region, plan, cycle)` → `{ effectiveMonthly, baseMonthly, savingsPerYear }` with `effectiveMonthly = Math.round(base * (1 - CYCLE_DISCOUNT[cycle]))`, `savingsPerYear = (base - effectiveMonthly) * 12`.
- **`PricingPageContent({ region })`** (server) — renders the Founding Partner strip, region-correct Product/Offer JSON-LD (one Offer per paid plan, `priceCurrency` from `regionConfig`), then mounts `<PricingClient region={region} />`.
- **`PricingClient`** (client, `'use client'`) — holds `useState<BillingCycle>('monthly')`; renders billing toggle, plan cards (price via `formatCurrency`), honest bar, comparison table, FAQ, CTA band. Sub-components kept small: `PlanCard`, `BillingToggle`, `ComparisonTable`, `HonestBar`, `PricingFAQ`, `PricingCTA`.

**Files**
- Create: `src/lib/pricing-content.ts`, `src/components/pricing/PricingClient.tsx` (+ small sub-components in the same folder).
- Modify: `src/app/_pricing/page.tsx` (becomes the server shell described above), `src/lib/region-config.ts` (add an `appUrl` if not already present from the rebrand work; add a tax-export phrase if needed).
- Region wrappers `src/app/{in,uk}/pricing/page.tsx` keep their metadata; the schema currency comes from `region`.

## Page structure (top → bottom)
1. **Founding Partner strip** — slim full-width banner: "Founding Partners — first 90 days free · N spots left" + `SpotCounter`, links to `/{region}/founding`. Dismissible is out of scope.
2. **Hero** — "Honest pricing. No surprises." (Space Grotesk display, orange accent on the second clause), sub-line about 0% commission, and the trust row: `0% on every order · No setup fee · 14-day free trial · Cancel anytime · BYOD — no hardware`.
3. **Billing toggle** — Monthly / 6 months / 12 months pills + a "Save up to 17%" tag shown when a discounted cycle is active.
4. **Plan cards** — Free / Premium (featured) / Elite. Each: tier label, name, tagline, price block (strikethrough "was" base when discounted + effective `/mo` + billed-cycle line), 14-day trial note (paid only), CTA, divider, grouped feature list.
5. **Honest bar** — 0% commission · No setup fee · 14-day trial · No lock-in · No hidden add-ons · No hardware · region-aware **Premium annual saving** figure.
6. **Comparison table** — full matrix, sections as sub-headers, ✓ (teal) / ✗ (muted), the two "you" columns (Premium, Elite) tinted; horizontal-scroll wrapper on mobile.
7. **FAQ** — reuse the current region-aware pricing FAQ incl. the payment-methods answer (`RegionPaymentFaqAnswer`).
8. **CTA band** — "Ready to get started?" → primary "Start free trial" (`app.omniviya.in/register`) + ghost "Book a demo" (`/{region}/demo/`).

## Region-awareness rules
- Every price rendered through `formatCurrency(region, …)` (₹ / £, locale-grouped).
- Payments feature/row: India → "UPI, Razorpay, Cashfree"; UK → "Card, contactless, Apple Pay, Stripe" (sourced from `regionConfig.paymentMethods`/`paymentFaqAnswer`).
- Tax feature/row: India → "GST billing + GSTR-1 export"; UK → "VAT billing + MTD-ready export" (new region phrase `taxExportLine` in `regionConfig`).
- JSON-LD `priceCurrency` = `regionConfig[region].currencyCode`.
- All other rows region-neutral.

## Proposed prices (editable in `PLAN_PRICES`)
| Plan | India ₹/mo (base) | UK £/mo (base) |
|---|---|---|
| Free | 0 | 0 |
| Premium | 1199 | 39 |
| Elite | 2499 | 79 |

Computed (same discounts both regions; `effective = round(base × (1 − d))`):
- 6-month: d = 0.10 → IN Premium ₹1,079 · Elite ₹2,249; UK Premium £35 · Elite £71.
- 12-month: d = 0.17 → IN Premium ₹995 · Elite ₹2,074; UK Premium £32 · Elite £66.
- Annual saving (Premium): IN ≈ ₹2,448/yr, UK ≈ £84/yr (display rounded to nearest 100 / 10).

## Comparison matrix (sections + rows; Free / Premium / Elite)
Source of truth for exact cells: the user's pricing mockup HTML in this conversation. Captured structure:

- **Digital menu** — categories/items/photos ✓✓✓ · variants/modifiers/add-ons ✓✓✓ · stock tracking & auto-hide ✓✓✓ · public menu URL ✓✓✓
- **Ordering & POS** — QR self-ordering ✗✓✓ · POS terminal ✗✓✓ · takeaway ✗✓✓ · bill splitting ✗✓✓ · table transfer ✗✓✓ · customer order tracking ✗✓✓ · offline mode ✗✓✓
- **Kitchen & operations** — KDS ✗✓✓ · drag-drop KOT ✗✓✓ · audio alerts ✗✓✓ · TV full-screen KDS ✗✓✓ · table management & floor plan ✗✓✓ · Bluetooth thermal printing ✗✓✓
- **Payments** — *[region-aware: payments]* ✗✓✓ · cash & pay-on-counter ✗✓✓ · 0% transaction fee ✓✓✓ · *[region-aware: tax]* ✗✓✓
- **Staff & security** — staff roles & PIN ✗✓✓ · staff attendance & clock-in/out ✗✗✓ · audit log ✗✓✓ · push notifications ✗✓✓
- **Analytics & reporting** — daily snapshot & basic reports ✗✓✓ · peak-hour heatmap ✗✗✓ · top dishes & revenue reports ✗✗✓ · payment breakdown by method ✗✓✓
- **Growth & marketing (Elite)** — inventory (ingredients/suppliers/POs) ✗✗✓ · loyalty program ✗✗✓ · coupons & discount codes ✗✗✓ · online reservations ✗✗✓ · events & ticketing ✗✗✓ · digital signage ✗✗✓ · online storefront (commission-free) ✗✗✓ · blog & content CMS ✗✗✓ · multi-brand & multi-outlet ✗✗✓ · customer reviews & owner replies ✗✗✓ · priority support ✗✗✓ · beta features ✗✗✓

## Plan feature lists (cards)
- **Free** — "Digital menu" group (categories/items/photos, variants/modifiers/add-ons, veg/non-veg labels, public menu URL, instant live updates) + "Not included" (customer ordering, payments, POS & kitchen display).
- **Premium** ("Everything in Free, plus") — QR self-ordering, live order management, POS terminal, online payments *(region payments line)*, KDS, drag-drop KOT + audio, table management, waiter app (roles/PIN), bill splitting & transfer, Bluetooth thermal printing, customer order tracking, *(region tax line)*, basic analytics, offline mode, PWA install.
- **Elite** ("Everything in Premium, plus") — inventory, recipes (auto-deduct), loyalty tiers, coupons, online reservations, floor-plan designer, events & ticketing, digital signage, online storefront, blog/CMS, staff attendance, advanced analytics, multi-brand/outlet, reviews & replies, priority support, beta features (BETA pill).

## Schema (JSON-LD)
`Product`/`Offer` per paid plan with `priceCurrency = regionConfig[region].currencyCode`, monthly price as the reference, `availability` InStock, plus the existing region-aware FAQ `FAQPage` and breadcrumb.

## Out of scope
- The SaaS app's own pricing/billing logic (separate `restaurant-os` repo).
- Real payment/checkout — CTAs deep-link to `app.omniviya.in/register`.
- Persisting the chosen billing cycle across navigation; dismissible founding strip.
- Final legal/price sign-off — proposed numbers are editable in one config object.

## Verification
- `npm run build` — static export of `/in/pricing` and `/uk/pricing` compiles.
- Visual: toggling cycles updates prices + savings; `/in` shows ₹/UPI/GST rows, `/uk` shows £/card/VAT rows; founding strip + SpotCounter render; comparison table scrolls on mobile.
- Grep: no hardcoded ₹/UPI/GST in the pricing components (all via `formatCurrency`/`regionConfig`).
