# UK & India Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every currency, tax, payment, content, SEO, and compliance reference on the RestOS marketing site adapt automatically to India (🇮🇳 ₹/GST/UPI) or the UK (🇬🇧 £/VAT/contactless), so each market feels natively built-for.

**Architecture:** A single source of truth (`region-config.ts`) holds all region-variant data. A client `RegionProvider`/`useRegion` already distributes it; shared `_`-prefixed App-Router pages are converted from default-export re-exports into region-prop content components so server-rendered JSON-LD becomes region-correct. Region-variant content lives in config/content selectors instead of scattered inline `region.key === 'uk' ? …` ternaries. A locale currency helper (`Intl.NumberFormat`) drives all money rendering.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, framer-motion, Tailwind. Netlify edge function for geo-routing. No unit-test runner is configured — **verification is `npm run build` (type-check + compile) plus `Grep` assertions that no region term leaks into the wrong place.**

---

## File Structure

**New files**
- `src/lib/format.ts` — `formatCurrency(region, amount, opts?)` + `formatCompactCurrency` via `Intl.NumberFormat`.
- `src/components/home/RevenueShowcase.tsx` — region-aware dashboard-style stats widget (the brief's flagship ₹42,580 / £4,258 examples).
- `src/components/ui/LegalContent.tsx` — client component rendering `region.privacyDoc` / `region.cookieDoc`.
- `src/app/_privacy/page.tsx`, `src/app/_cookies/page.tsx` — shared legal page content components (region-prop).
- `src/app/in/privacy/page.tsx`, `src/app/uk/privacy/page.tsx`, `src/app/in/cookies/page.tsx`, `src/app/uk/cookies/page.tsx` — region wrappers with metadata.

**Modified files**
- `src/lib/region-config.ts` — ✅ DONE (localeTag, paymentMethods, exampleStats, seoKeywords, paymentPhrase, legalFramework, consentIntro, privacyDoc, cookieDoc).
- `src/lib/features-content.ts` — region-aware selectors `getFeatureSections(region)`, `getFaqContent(region)`.
- `src/components/features/PaymentFeature.tsx`, `ManagementFeature.tsx`, `AnalyticsFeature.tsx`, `FAQAccordion.tsx` — consume selectors; drop inline ternaries / regex hacks.
- `src/components/home/HighlightIcons.tsx` — `CurrencyGlyphIcon({symbol})` replaces hardcoded `RupeeIcon` ₹.
- `src/components/home/ProductHighlights.tsx` — pass `region.currency` to glyph; add `RevenueShowcase` import is in page.
- `src/app/page.tsx` — insert `<RevenueShowcase />`.
- `src/app/layout.tsx` — remove region-locked global components from root.
- `src/app/in/layout.tsx`, `src/app/uk/layout.tsx` — host `CookieConsentBanner` + `WhatsAppFloatingBadge` inside region provider; add x-default hreflang + region `seoKeywords`.
- `src/app/_features/page.tsx`, `src/app/_pricing/page.tsx`, `src/app/_founding/page.tsx` — convert to `({region})` content components with region-correct schema.
- `src/app/in/features|pricing|founding/page.tsx`, `src/app/uk/features|pricing|founding/page.tsx` — render content component with region.
- `src/components/features/CookieConsentBanner.tsx` — region-aware copy; `openCookieSettings()` reopen API; analytics gating helper `hasConsent(category)`.
- `src/components/layout/Footer.tsx` — Privacy / Cookies links + "Cookie Settings" reopen + region legal note.

---

## Task 1: Region config data — ✅ COMPLETE

**Files:** Modify `src/lib/region-config.ts`

Already implemented: added `localeTag`, `paymentPhrase`, `paymentMethods`, `exampleStats`, `seoKeywords`, `legalFramework`, `consentIntro`, `privacyDoc`, `cookieDoc` to the `RegionConfig` interface and both region objects; replaced unicode escapes with literal `₹`/`£`.

- [ ] **Step 1: Verify it type-checks**

Run: `npm run build`
Expected: compiles past `region-config.ts` (other files may still error until later tasks — that's fine for this checkpoint; confirm no error originates in `region-config.ts`).

---

## Task 2: Locale currency formatter

**Files:** Create `src/lib/format.ts`

- [ ] **Step 1: Write the utility**

```ts
import type { Region } from './region-config'
import { regionConfig } from './region-config'

/**
 * Locale-aware currency formatter. Never hardcode currency symbols — call this.
 * formatCurrency('in', 42580) -> "₹42,580"
 * formatCurrency('uk', 4258)  -> "£4,258"
 */
export function formatCurrency(
  region: Region,
  amount: number,
  opts: { decimals?: number } = {},
): string {
  const { localeTag, currencyCode } = regionConfig[region]
  return new Intl.NumberFormat(localeTag, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: opts.decimals ?? 0,
    maximumFractionDigits: opts.decimals ?? 0,
  }).format(amount)
}

/** Compact form for large figures: formatCompactCurrency('in', 1284500) -> "₹12.8L"-style locale compact. */
export function formatCompactCurrency(region: Region, amount: number): string {
  const { localeTag, currencyCode } = regionConfig[region]
  return new Intl.NumberFormat(localeTag, {
    style: 'currency',
    currency: currencyCode,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount)
}
```

- [ ] **Step 2: Verify build** — `npm run build`, expected: no error in `format.ts`.
- [ ] **Step 3: Commit** — `git add src/lib/format.ts src/lib/region-config.ts && git commit -m "feat(i18n): region config localization data + locale currency formatter"`

---

## Task 3: Region-aware features content selectors

**Files:** Modify `src/lib/features-content.ts`

Problem: `FEATURE_SECTIONS` and `FAQ_CONTENT` are India-hardcoded (₹, UPI, GST) and shared by both regions. Replace inline component patches with selectors keyed by region, templated off `regionConfig`.

- [ ] **Step 1:** At top of file add import:

```ts
import type { Region } from './region-config'
import { regionConfig } from './region-config'
```

- [ ] **Step 2:** Append selector functions at the end of the file:

```ts
/** Feature sections with region-correct payment + management + analytics copy. */
export function getFeatureSections(region: Region): FeatureSection[] {
  const cfg = regionConfig[region]
  return FEATURE_SECTIONS.map((section) => {
    if (section.id === 'payment') {
      return {
        ...section,
        solution: {
          ...section.solution,
          description: `Every bill is digital. Customers see their bill on their phone, split it with their group, and pay with any method — ${cfg.paymentEcosystemDesc.replace(' — all tracked', '').toLowerCase()}.`,
          bullets: [
            'Customers pay directly from their phone',
            'No card machines need to reach their table',
            'Split bills between friends, no mental math',
            'Fast, secure settlements tracked in real time',
            `Every ${cfg.paymentCurrencyTerm} is accounted for`,
          ],
        },
      }
    }
    if (section.id === 'management') {
      return {
        ...section,
        problem: {
          ...section.problem,
          bullets: [
            `POS terminals cost ${cfg.byodComparisons[0].oldWay}`,
            'Self-ordering kiosks cost a fortune to install',
            'Vibrating pagers break and need replacing',
            'Once you buy in, switching is impossible',
          ],
        },
      }
    }
    if (section.id === 'analytics') {
      return {
        ...section,
        solution: {
          ...section.solution,
          bullets: section.solution.bullets.map((b) => b.replace(/\bGST\b/g, cfg.taxTerm)),
        },
      }
    }
    return section
  })
}

/** FAQ with region-correct payment + tax answers. */
export function getFaqContent(region: Region): typeof FAQ_CONTENT {
  const cfg = regionConfig[region]
  return {
    ...FAQ_CONTENT,
    questions: FAQ_CONTENT.questions.map((item) => {
      if (item.q === 'Can customers pay from their phone?') {
        return { ...item, a: `Yes. Customers can view their bill, split it with their group, and pay using ${cfg.paymentPhrase}. The payment is processed directly from their phone — no card machine needs to reach their table. Cash payments are also supported and tracked in the system.` }
      }
      if (item.q.startsWith('What analytics')) {
        return { ...item, a: item.a.replace(/\bGST\b/g, cfg.taxTerm) }
      }
      return item
    }),
  }
}
```

- [ ] **Step 3: Verify build** — `npm run build`, expected: no error in `features-content.ts`.

---

## Task 4: Consolidate feature components onto selectors

**Files:** Modify `PaymentFeature.tsx`, `ManagementFeature.tsx`, `AnalyticsFeature.tsx`, `FAQAccordion.tsx`

- [ ] **Step 1 — PaymentFeature.tsx:** Replace the local `UpiIcon`/inline-ternary logic. Use `getFeatureSections(region.key)[2]` for content and render `region.paymentMethods` (from config) as the icon grid. Replace the three bespoke SVG icon components with a single generic `MethodIcon` that shows the method `label` initial(s) in a rounded tile (keeps the visual, removes UPI hardcoding). Payment methods grid maps `region.paymentMethods`; grid columns = `Math.min(region.paymentMethods.length, 3)` responsive.

```tsx
const sections = getFeatureSections(region.key)
const feature = sections[2]
const methods = region.paymentMethods
// ...grid:
<div className={`grid gap-3 max-w-xl mx-auto ${methods.length > 3 ? 'grid-cols-3 sm:grid-cols-5' : 'grid-cols-3'}`}>
  {methods.map((m) => (
    <div key={m.label} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-wire bg-carbon/50 text-center">
      <MethodIcon label={m.label} />
      <span className="text-xs font-medium text-warm-white">{m.label}</span>
      <span className="text-[10px] text-stone/60">{m.sub}</span>
    </div>
  ))}
</div>
```

`description`/`bullets` come from `feature.solution`. Remove the `isUk` branches.

- [ ] **Step 2 — ManagementFeature.tsx:** Replace `const feature = FEATURE_SECTIONS[4]` + UK ternary with `const feature = getFeatureSections(region.key)[4]`; use `feature.problem.bullets` directly (now region-correct). Remove `regionConfig`/ternary import if unused.

- [ ] **Step 3 — AnalyticsFeature.tsx:** Replace `FEATURE_SECTIONS[3]` + `.replace(/GST/)` with `const feature = getFeatureSections(region.key)[3]`; use `feature.solution.bullets` directly. Remove now-unused `regionConfig` import.

- [ ] **Step 4 — FAQAccordion.tsx:** Replace `FAQ_CONTENT` + index-based hacks (`index === 3`, `index === 6`) with `const faq = getFaqContent(region.key)`; map `faq.questions` rendering `item.a` directly. Use `faq.headline`.

- [ ] **Step 5: Verify build** — `npm run build`, expected: success for these files.

- [ ] **Step 6: Verify no UK leak** —
Run: `Grep` for `UPI|GST|rupee|₹` in `src/components/features/` — expected only matches are inside `getFeatureSections`/`getFaqContent` callers via config, **not literal** in PaymentFeature/Management/Analytics/FAQAccordion.

- [ ] **Step 7: Commit** — `git commit -am "refactor(i18n): drive feature sections + FAQ from region selectors, expand UK payment methods"`

---

## Task 5: Region-aware currency glyph (fix C4)

**Files:** Modify `src/components/home/HighlightIcons.tsx`, `src/components/home/ProductHighlights.tsx`

- [ ] **Step 1 — HighlightIcons.tsx:** Replace `RupeeIcon` with a parametrised glyph:

```tsx
export function CurrencyGlyphIcon({ className, symbol }: { className?: string; symbol: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '14px 14px' }}>
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
      </motion.g>
      <motion.g animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '14px 14px' }}>
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </motion.g>
      <text x="14" y="18" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="bold" fontFamily="sans-serif">{symbol}</text>
    </svg>
  )
}
```

- [ ] **Step 2 — ProductHighlights.tsx:** Change import to `CurrencyGlyphIcon`; render `<CurrencyGlyphIcon symbol={region.currency} className="w-7 h-7 text-ember" />`.

- [ ] **Step 3: Verify** — `npm run build`; then `Grep` `RupeeIcon` in `src/` → expected: **no matches**.
- [ ] **Step 4: Commit** — `git commit -am "fix(i18n): region-aware currency glyph (no hardcoded ₹)"`

---

## Task 6: RevenueShowcase widget

**Files:** Create `src/components/home/RevenueShowcase.tsx`; Modify `src/app/page.tsx`

- [ ] **Step 1:** Create the widget (client component, `useRegion` + `formatCurrency`). Renders a dashboard-style card with: today's revenue (`exampleStats.revenue`), average order (`avgOrder`), orders today (`ordersToday`), and a `taxTerm`-ready reports line. All money via `formatCurrency(region.key, …)`.

```tsx
'use client'
import { motion } from 'framer-motion'
import { useRegion } from '@/lib/region-context'
import { formatCurrency } from '@/lib/format'

export function RevenueShowcase() {
  const region = useRegion()
  const s = region.exampleStats
  const stats = [
    { label: 'Revenue today', value: formatCurrency(region.key, s.revenue) },
    { label: 'Average order', value: formatCurrency(region.key, s.avgOrder) },
    { label: 'Orders today', value: String(s.ordersToday) },
    { label: `${region.taxTerm}-ready reports`, value: 'Auto' },
  ]
  return (
    <section className="bg-midnight py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-teal/80">Live Dashboard</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white mt-2 text-balance">
            Every {region.paymentCurrencyTerm}, tracked in real time.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 24 }}
              className="rounded-2xl border border-wire bg-carbon p-5 sm:p-6">
              <p className="text-2xl sm:text-3xl font-display font-bold text-warm-white">{stat.value}</p>
              <p className="text-stone text-xs sm:text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-stone/50 text-xs mt-6 font-mono">
          Sample figures shown in {region.currencyCode}. {region.taxTerm} calculated automatically on every order.
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2:** In `src/app/page.tsx` import `RevenueShowcase` and place it after `<Ecosystem />`.
- [ ] **Step 3: Verify build** — `npm run build`.
- [ ] **Step 4: Commit** — `git commit -am "feat(i18n): region-aware live revenue showcase (₹/£ locale-formatted)"`

---

## Task 7: Fix global-component region leak (C1)

**Files:** Modify `src/app/layout.tsx`, `src/app/in/layout.tsx`, `src/app/uk/layout.tsx`

- [ ] **Step 1 — root layout.tsx:** Remove `<CookieConsentBanner />` and `<WhatsAppFloatingBadge />` (and their imports) from inside `RegionProvider region="in"`. Keep `RegionProvider region="in"` wrapping `{children}` only (safe default for the rare bare `/` hit).

- [ ] **Step 2 — in/layout.tsx & uk/layout.tsx:** Inside the existing `<RegionProvider region="…">`, render the banner + badge alongside `{children}`:

```tsx
import { CookieConsentBanner } from '@/components/features/CookieConsentBanner'
import { WhatsAppFloatingBadge } from '@/components/ui/WhatsAppFloatingBadge'
// ...
<RegionProvider region="uk">
  {children}
  <CookieConsentBanner />
  <WhatsAppFloatingBadge />
</RegionProvider>
```

- [ ] **Step 3: Verify** — `npm run build`. Manual reasoning check: `/uk/*` now resolves `useRegion()` to `uk` for the badge → WhatsApp number `447…`.
- [ ] **Step 4: Commit** — `git commit -am "fix(i18n): render floating WhatsApp + cookie banner inside correct region provider"`

---

## Task 8: Region-correct SEO schema on shared pages (C3)

**Files:** Modify `_features/page.tsx`, `_pricing/page.tsx`, `_founding/page.tsx` and their `in/`+`uk/` wrappers

Pattern: rename each shared default export to a named content component taking `region: Region`, build JSON-LD from `regionConfig[region]` + `getFaqContent(region)`. The `_` folder is a Next.js private folder (not routable), so a named non-page export is safe.

- [ ] **Step 1 — _features/page.tsx:** Change `export default function FeaturesPage()` to `export function FeaturesPageContent({ region }: { region: Region })`. Replace hardcoded `priceCurrency: 'INR'` with `regionConfig[region].currencyCode`; replace `featureList` entries `'Digital payments with UPI'` → `` `Digital payments (${regionConfig[region].paymentPhrase})` `` and `'GST-ready reports'` → `` `${regionConfig[region].taxTerm}-ready reports` ``; build FAQ schema from `getFaqContent(region).questions`; set breadcrumb/canonical URLs to `/${region}/features`.

- [ ] **Step 2 — in/features/page.tsx & uk/features/page.tsx:** Replace the `export { default } from '@/app/_features/page'` line with:

```tsx
import { FeaturesPageContent } from '@/app/_features/page'
export default function Page() { return <FeaturesPageContent region="uk" /> }
```

(keep each file's existing `metadata` export — already region-correct).

- [ ] **Step 3 — _pricing/page.tsx:** Convert to `PricingPageContent({ region })`. Build `faqSchema` payment answer from `regionConfig[region].paymentFaqAnswer`; URLs `/${region}/pricing`. Wire `in/pricing` + `uk/pricing` like Step 2.

- [ ] **Step 4 — _founding/page.tsx:** Convert to `FoundingPageContent({ region })`. Replace `priceCurrency: 'INR'` → `regionConfig[region].currencyCode`; `brand.name` → `regionConfig[region].siteName`; URLs `/${region}/founding`. Wire `in/founding` + `uk/founding`.

- [ ] **Step 5: Verify** — `npm run build`; then `Grep` `INR|UPI|GST` in `src/app/_features` `src/app/_pricing` `src/app/_founding` → expected: matches only inside region-driven expressions, **no literal** `'INR'`/`'GST-ready reports'`/`'…UPI…'` constants.
- [ ] **Step 6: Commit** — `git commit -am "fix(seo): region-correct JSON-LD schema on features/pricing/founding"`

---

## Task 9: SEO metadata — hreflang x-default + region keywords

**Files:** Modify `src/app/in/layout.tsx`, `src/app/uk/layout.tsx`

- [ ] **Step 1:** In both layouts, add `'x-default': 'https://restos.in/in'` to `alternates.languages`.
- [ ] **Step 2:** Replace the hardcoded `keywords` array in each with `regionConfig['in'].seoKeywords` / `regionConfig['uk'].seoKeywords` (import `regionConfig`). Keep the array literal if simpler, but it must match the config set.
- [ ] **Step 3: Verify** — `npm run build`.
- [ ] **Step 4: Commit** — `git commit -am "feat(seo): x-default hreflang + region-specific keyword sets"`

---

## Task 10: Region-aware cookie consent + gating + reopen (P1, P2, P4)

**Files:** Modify `src/components/features/CookieConsentBanner.tsx`

- [ ] **Step 1:** Make banner copy region-aware: `const region = useRegion()` → render `region.consentIntro` and a line "We process data in line with {region.legalFramework}."
- [ ] **Step 2:** Export a reopen API + consent reader for gating:

```ts
const OPEN_EVENT = 'restos:open-cookie-settings'
export function openCookieSettings() { window.dispatchEvent(new Event(OPEN_EVENT)) }
export function hasConsent(category: 'analytics' | 'marketing'): boolean {
  const saved = loadConsent()
  return !!saved?.preferences[category]
}
```
Add a `useEffect` listener for `OPEN_EVENT` that sets `view('settings')` so the modal can be reopened after dismissal.

- [ ] **Step 3:** Confirm gating contract is documented: the banner already blocks-by-absence (no analytics script ships). Add a top-of-file comment: "Any future analytics/marketing script MUST be gated behind `hasConsent('analytics')` and re-checked on the OPEN_EVENT." (No script to gate today — leaving a load-bearing hook, not dead code.)
- [ ] **Step 4: Verify build** — `npm run build`.

---

## Task 11: Privacy & Cookie policy pages (P3)

**Files:** Create `LegalContent.tsx`, `_privacy/page.tsx`, `_cookies/page.tsx`, and 4 region wrappers

- [ ] **Step 1 — LegalContent.tsx (client):**

```tsx
'use client'
import { useRegion } from '@/lib/region-context'
export function LegalContent({ doc }: { doc: 'privacyDoc' | 'cookieDoc' }) {
  const region = useRegion()
  const d = region[doc]
  return (
    <div className="max-w-2xl mx-auto px-4 pt-28 pb-24">
      <h1 className="text-3xl sm:text-4xl font-display font-bold text-warm-white mb-2">{d.title}</h1>
      <p className="text-stone/50 text-xs font-mono mb-6">Last updated {d.updated} · Applies to visitors in {region.geoPlaceName}</p>
      <p className="text-stone text-sm leading-relaxed mb-10">{d.intro}</p>
      {d.sections.map((s) => (
        <section key={s.heading} className="mb-8">
          <h2 className="font-display font-semibold text-warm-white text-lg mb-2">{s.heading}</h2>
          <p className="text-stone text-sm leading-relaxed">{s.body}</p>
        </section>
      ))}
      <p className="text-stone/40 text-xs mt-10">Governed by {region.legalFramework}.</p>
    </div>
  )
}
```

- [ ] **Step 2 — _privacy/page.tsx & _cookies/page.tsx:** Each renders `<Navbar/>`, `<main>` with `<LegalContent doc="privacyDoc"/>` (or `cookieDoc`), `<Footer/>`. Export named `PrivacyPageContent` / `CookiesPageContent` (no region prop needed — `LegalContent` reads context). Actually export `default` is fine since no region-variant server schema; keep as default and re-export.

- [ ] **Step 3 — region wrappers:** `in/privacy/page.tsx`, `uk/privacy/page.tsx`, `in/cookies/page.tsx`, `uk/cookies/page.tsx` each:

```tsx
import type { Metadata } from 'next'
export { default } from '@/app/_privacy/page'
export const metadata: Metadata = {
  title: 'Privacy Policy',
  alternates: { canonical: 'https://restos.in/uk/privacy' },
}
```

- [ ] **Step 4: Verify build** — `npm run build` (routes `/in/privacy`, `/uk/privacy`, `/in/cookies`, `/uk/cookies` compile).
- [ ] **Step 5: Commit** — `git commit -am "feat(compliance): region-aware consent (DPDP/UK-GDPR) + privacy & cookie pages + reopen API"`

---

## Task 12: Footer legal links + reopen consent

**Files:** Modify `src/components/layout/Footer.tsx`

- [ ] **Step 1:** Add a "Legal" column (or append to Navigation) with region links to `/${region.key}/privacy/` and `/${region.key}/cookies/`, plus a button calling `openCookieSettings()` ("Cookie Settings"). Add a small line: "Operating under {region.legalFramework}." Import `openCookieSettings` from the banner.
- [ ] **Step 2: Verify build** — `npm run build`.
- [ ] **Step 3: Commit** — `git commit -am "feat(compliance): footer privacy/cookie links + reopen consent settings"`

---

## Task 13: Final verification sweep

- [ ] **Step 1:** `npm run build` — full success, all routes compile.
- [ ] **Step 2: Leak grep (UK pages must not contain India terms as literals):**
Run `Grep -i` for `\bUPI\b|\bGST\b|rupee|₹|razorpay|cashfree` across `src/` and confirm every remaining hit is either (a) inside the `in` branch of `region-config.ts`, or (b) a region-driven expression — never a literal rendered to all regions.
- [ ] **Step 3: Reverse grep:** `\bVAT\b|contactless|Apple Pay|£` hits confined to `uk` config / region-driven expressions.
- [ ] **Step 4:** Confirm `RupeeIcon` and literal `priceCurrency: 'INR'` constants are gone (Grep → no matches).
- [ ] **Step 5: Commit any cleanup** and report results.

---

## Self-Review (against the brief)

- **Currency dynamic formatting** → Task 2 (`formatCurrency`), Task 6 (showcase), Task 5 (glyph), Task 1 (BYOD already region-keyed). ✅
- **Tax terminology (GST/VAT)** → Tasks 3, 4, 6, 8 (`taxTerm` everywhere; schema). ✅
- **Payment method localization** → Task 1 (`paymentMethods`), Task 4 (icon grid incl. Apple/Google Pay/Contactless for UK; UPI/PhonePe/Paytm for IN). ✅
- **Content localization (never UPI to UK / VAT to IN)** → Tasks 3, 4, 8 + Task 13 leak grep. ✅
- **SEO: hreflang, locale metadata, localized schema** → Tasks 8, 9. ✅
- **Cookie/privacy compliance (UK GDPR/PECR, DPDP), withdrawal, no dark patterns** → Tasks 10, 11, 12. ✅
- **Manual country selector + persistence** → already present (Navbar switcher + RegionCookieSetter cookie); unchanged. ✅
- **Geo + locale auto-adaptation** → already present (edge `geo-route.ts`); unchanged. ✅
- **Screenshots/mockups with currency** → no real screenshot assets exist; the live RevenueShowcase (Task 6) is the region-variant "mockup". Noted; no image variants needed.

**Type consistency:** `getFeatureSections`/`getFaqContent` (Task 3) match callers (Task 4); `formatCurrency(region, amount)` signature consistent (Tasks 2, 6); `openCookieSettings`/`hasConsent` (Task 10) match Footer import (Task 12); `FeaturesPageContent`/`PricingPageContent`/`FoundingPageContent` props match wrappers (Task 8).
