# Omniviya Rebrand (finishing) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the RestOS→Omniviya rebrand of the marketing site: fix the broken video references, move all page URLs from the apex `omniviya.in` to the product subdomain `restaurants.omniviya.in` (preserving the agency-apex brand references), wire the marketing→app CTAs to `app.omniviya.in`, and rename the package.

**Architecture:** Brand strings and both logos (`Logo.tsx`, `MotionLogo.tsx`) are **already rebranded** — out of scope. This plan only touches: `public/video/*` filenames, SEO/schema URLs in the layouts + shared `_` pages + region wrappers, `Navbar.tsx` + `region-config.ts` for app CTAs, and `package.json`. The product site lives at `restaurants.omniviya.in`; the Organization schema entity and the About-page "Website" link stay anchored at the brand apex `omniviya.in`.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, Tailwind, framer-motion. No unit-test runner — **verification is `npm run build` + `Grep` URL audits + confirming `public/video` filenames match config.**

---

## Current state (verified)
- ✅ Zero `RestOS`/`restos` literals in `src/`; `siteName: 'Omniviya'`.
- ✅ `Logo.tsx` (both variants) and `MotionLogo.tsx` render `OMNI`/`VIYA`.
- 🔴 `region-config.ts` `heroVideo` → `/video/omniviya-vertical-{inr,gbp}.mp4`; `TiltedDevice.tsx` default → `/video/omniviya-flow.mp4` — **but disk files are `restos-vertical-*.mp4` / `restos-flow.mp4`** (broken).
- ⏳ All page URLs are `https://omniviya.in/...` (apex) incl. `metadataBase`, canonicals, hreflang, OG urls, breadcrumb items, and the `_features/_pricing/_founding` `const base`.
- ⏳ No `appUrl`; Navbar primary CTA is "Book Demo".
- ⏳ `package.json` `name: "restos"`.

---

## File Structure
- **Rename** `public/video/restos-vertical-inr.mp4` → `omniviya-vertical-inr.mp4`, `…-gbp.mp4` → `omniviya-vertical-gbp.mp4`, `public/video/restos-flow.mp4` → `omniviya-flow.mp4`, `public/restos-flow.webm` → `omniviya-flow.webm`.
- **Modify** `src/lib/region-config.ts` — add `appUrl` to interface + both regions.
- **Modify** `src/components/layout/Navbar.tsx` — "Log in" link + "Get Started" CTA.
- **Modify** URL set: `src/app/in/layout.tsx`, `src/app/uk/layout.tsx`, `src/app/_features/page.tsx`, `src/app/_pricing/page.tsx`, `src/app/_founding/page.tsx`, `src/app/_about/page.tsx`, `src/app/_demo/page.tsx`, and the region wrappers under `src/app/{in,uk}/{features,pricing,founding,about,demo,privacy,cookies}/page.tsx`.
- **Modify** `package.json` — `name`.

---

## Task 1: Reconcile broken video filenames

**Files:** `public/video/*`, `public/restos-flow.webm`

- [ ] **Step 1: Rename the tracked video files with git.**

```bash
cd "c:/Users/sesha/Downloads/RestOS"
git mv public/video/restos-vertical-inr.mp4 public/video/omniviya-vertical-inr.mp4
git mv public/video/restos-vertical-gbp.mp4 public/video/omniviya-vertical-gbp.mp4
git mv public/video/restos-flow.mp4 public/video/omniviya-flow.mp4
git mv public/restos-flow.webm public/omniviya-flow.webm
```

- [ ] **Step 2: Verify every referenced path now exists.**

Run: `Grep` for `/video/omniviya` in `src/` → expect `region-config.ts` (2 hits) + `TiltedDevice.tsx` (1 hit). Then confirm files exist:

```bash
ls public/video/
```
Expected: `omniviya-vertical-inr.mp4`, `omniviya-vertical-gbp.mp4`, `omniviya-flow.mp4` (no `restos-*` remaining).

- [ ] **Step 3: Confirm no `restos-` media references remain.**

Run: `Grep` for `restos-` in `src/` and `public/` → expected: **no matches**.

- [ ] **Step 4: Commit.**

```bash
git commit -m "fix(rebrand): rename video assets restos-* -> omniviya-* to match config paths"
```

> Note (owner action, not code): the **on-screen branding baked into these videos + `og-image.png` still shows RestOS** and must be re-rendered in your design/video tool. Renaming only fixes the path.

---

## Task 2: Marketing → app CTAs

**Files:** `src/lib/region-config.ts`, `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Add `appUrl` to the `RegionConfig` interface.** In `src/lib/region-config.ts`, add after the `phonePrefix` line in the interface:

```ts
  /** Base URL of the SaaS product app (restaurant-os) for sign-up / login CTAs */
  appUrl: string
```

- [ ] **Step 2: Set `appUrl` in both regions.** Add to the `in` object (e.g. after its `phonePrefix`):

```ts
    appUrl: 'https://app.omniviya.in',
```

and identically to the `uk` object:

```ts
    appUrl: 'https://app.omniviya.in',
```

- [ ] **Step 3: Verify config type-checks.** Run: `npm run build` — expect no "Property 'appUrl' is missing" error.

- [ ] **Step 4: Add "Log in" + "Get Started" to the desktop navbar.** In `src/components/layout/Navbar.tsx`, replace the desktop CTA cluster:

```tsx
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.4 }}
          >
            <WhatsAppButton />
            <Button href={`/${region.key}/demo/`} variant="primary">Book Demo</Button>
          </motion.div>
```

with:

```tsx
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.4 }}
          >
            <a
              href={`${region.appUrl}/login`}
              className="text-stone text-sm hover:text-warm-white transition-colors duration-150"
            >
              Log in
            </a>
            <Button href={`/${region.key}/demo/`} variant="ghost">Book Demo</Button>
            <Button href={`${region.appUrl}/register`} variant="primary" external>Get Started</Button>
          </motion.div>
```

- [ ] **Step 5: Add "Log in" + "Get Started" to the mobile menu.** In the mobile menu's bottom CTA block, replace:

```tsx
            <div className="p-6 flex flex-col gap-3 mt-auto">
              <WhatsAppButton className="w-full justify-center text-base py-4" />
              <Button href={`/${region.key}/demo/`} variant="primary" className="w-full justify-center text-base py-4">Book Demo</Button>
            </div>
```

with:

```tsx
            <div className="p-6 flex flex-col gap-3 mt-auto">
              <a
                href={`${region.appUrl}/login`}
                onClick={() => setMobileOpen(false)}
                className="text-center text-stone text-base py-2 hover:text-warm-white transition-colors"
              >
                Log in
              </a>
              <Button href={`/${region.key}/demo/`} variant="ghost" className="w-full justify-center text-base py-4">Book Demo</Button>
              <Button href={`${region.appUrl}/register`} external className="w-full justify-center text-base py-4">Get Started</Button>
            </div>
```

- [ ] **Step 6: Verify the Button `variant="ghost"` and `external` props exist.** Run: `Grep` for `variant` and `external` in `src/components/ui/Button.tsx` — confirm `ghost` is a supported variant and `external` is a prop. If `ghost` is not a variant, use `variant="secondary"` (whatever the file defines for a non-primary style); if `external` is absent, render the demo/app links as plain `<a href target="_blank" rel="noopener noreferrer">`.

- [ ] **Step 7: Build + commit.**

```bash
npm run build
git add src/lib/region-config.ts src/components/layout/Navbar.tsx
git commit -m "feat(rebrand): wire marketing->app CTAs (Get Started -> app.omniviya.in/register, Log in -> /login)"
```

---

## Task 3: Move page URLs to the product subdomain

**Rule:** every **page** URL `https://omniviya.in/<path>` → `https://restaurants.omniviya.in/<path>`.
**Preserve at apex (do NOT change):** the schema `Organization` `@id` (`https://omniviya.in/#organization`), its `url` (`https://omniviya.in`), its `sameAs` (`['https://omniviya.in']`), and the About page's "Website" link (`href: 'https://omniviya.in'`). The Organization `logo` **does** move to the subdomain (that's where `og-image.png` is served).

**Files:** `src/app/in/layout.tsx`, `src/app/uk/layout.tsx`

- [ ] **Step 1: Layouts — metadataBase, canonical, hreflang, OG url.** In **both** `in/layout.tsx` and `uk/layout.tsx`, change:
  - `metadataBase: new URL('https://omniviya.in')` → `new URL('https://restaurants.omniviya.in')`
  - `canonical: 'https://omniviya.in/in'` (or `/uk`) → `'https://restaurants.omniviya.in/in'` (or `/uk`)
  - the three `languages` values (`en-in`, `en-gb`, `x-default`) `https://omniviya.in/in|uk` → `https://restaurants.omniviya.in/in|uk`
  - OG `url: 'https://omniviya.in/in'` (or `/uk`) → `'https://restaurants.omniviya.in/in'` (or `/uk`)

- [ ] **Step 2: Layouts — Organization logo to subdomain, keep @id/url/sameAs apex.** In the `jsonLd` Organization of **both** layouts, change only:
  - `logo: 'https://omniviya.in/og-image.png'` → `'https://restaurants.omniviya.in/og-image.png'`
  Leave `@id`, `url`, and `sameAs` as `https://omniviya.in`.

- [ ] **Step 3: Shared content pages — the `base` constant.** In `src/app/_features/page.tsx`, `src/app/_pricing/page.tsx`, `src/app/_founding/page.tsx`, change:
  - `const base = \`https://omniviya.in/${region}\`` → `const base = \`https://restaurants.omniviya.in/${region}\``

- [ ] **Step 4: `_about/page.tsx` + `_demo/page.tsx` — swap canonical/OG/breadcrumb only.** In `src/app/_about/page.tsx`: change the OG `url`, `alternates.canonical`, and the breadcrumb `item` from `https://omniviya.in/about` → `https://restaurants.omniviya.in/about`. **Do NOT touch** the contact "Website" link `{ label: 'Website', href: 'https://omniviya.in', text: 'omniviya.in' }`. In `src/app/_demo/page.tsx`: change OG `url`, `canonical`, and breadcrumb `item` `https://omniviya.in/demo` → `https://restaurants.omniviya.in/demo`.

- [ ] **Step 5: Region wrappers — canonical + OG url (14 files).** In each of `src/app/{in,uk}/{features,pricing,founding,about,demo,privacy,cookies}/page.tsx`, change every `https://omniviya.in/<region>/<slug>` literal (in `openGraph.url` and `alternates.canonical`) to `https://restaurants.omniviya.in/<region>/<slug>`. (Note: `privacy` and `cookies` wrappers only have `canonical`; the rest have both `url` and `canonical`.)

- [ ] **Step 6: Build.** Run: `npm run build` — expect success, all routes generate.

- [ ] **Step 7: URL audit.**
  - Run: `Grep -n` for `https://omniviya\.in/(in|uk|about|demo|features|pricing|founding)` in `src/` → expected: **no matches** (all page URLs are now the subdomain).
  - Run: `Grep -n` for `https://omniviya\.in` in `src/` → expected matches **only**: each layout's Organization `@id`/`url`/`sameAs` (apex, intended) and `_about`'s "Website" link. Nothing else.

- [ ] **Step 8: Commit.**

```bash
git add src/app
git commit -m "feat(seo): move page URLs to restaurants.omniviya.in; keep Organization + brand link at apex"
```

---

## Task 4: Package name + final verification

**Files:** `package.json`

- [ ] **Step 1: Rename the package.** In `package.json`, change `"name": "restos"` → `"name": "omniviya"`.

- [ ] **Step 2: Full build.** Run: `npm run build` — expect all routes (incl. `/in/privacy`, `/uk/cookies`, etc.) generate with no errors.

- [ ] **Step 3: Final rebrand audit.**
  - `Grep` `RestOS|restos` in `src/` and `public/` → **no matches**.
  - `Grep` `/video/omniviya` in `src/` resolves to existing files in `public/video/`.
  - `Grep` `restaurants.omniviya.in` present in layouts + page metadata; apex `omniviya.in` only on Organization fields + About "Website" link.

- [ ] **Step 4: Commit.**

```bash
git add package.json
git commit -m "chore(rebrand): rename package restos -> omniviya"
```

---

## Task 5: Visual verification (dev server)

- [ ] **Step 1:** `npm run dev` → open `http://localhost:3000/in` and `/uk`.
- [ ] **Step 2:** Confirm: page loader plays the OMNI|VIYA animation; navbar/footer show the OMNI(white)|VIYA(orange) wordmark without overflow; the hero device video plays (no broken/missing video); navbar shows **Log in** + **Get Started**; `/in` still ₹/UPI/GST, `/uk` still £/contactless/VAT.
- [ ] **Step 3:** Hover "Get Started" → points at `app.omniviya.in/register`; "Log in" → `app.omniviya.in/login`.

---

## Self-Review

**Spec coverage:**
- Bucket 1 (brand strings) — already done; audited in Task 4 Step 3. ✅
- Bucket 2/3 (static + motion logo) — already done (verified OMNI/VIYA); visual check Task 5. ✅
- Bucket 4 (apex → subdomain URLs, Organization stays apex, logo → subdomain) — Task 3. ✅
- Bucket 5 (app CTAs via `region.appUrl`, Get Started→/register, Log in→/login) — Task 2. ✅
- Bucket 6 (video file reconcile, package.json) — Tasks 1 & 4; baked-media re-render flagged as owner action. ✅
- Out of scope (DNS, SaaS app rebrand, video/og re-render) — untouched. ✅

**Placeholder scan:** No TBD/TODO; every step shows the exact change. The one conditional (Task 2 Step 6) is a real verify-then-branch instruction with both branches specified, not a placeholder.

**Type consistency:** `appUrl: string` defined in Task 2 Step 1 matches `region.appUrl` usage in Step 4/5. Video paths renamed in Task 1 match the existing `region-config.ts`/`TiltedDevice.tsx` references (confirmed present). URL exceptions (Organization `@id`/`url`/`sameAs`, About "Website") are called out consistently in Task 3 Steps 2/4/7.

**Note (optional future DRY, not in scope):** the domain has now changed twice; a follow-up could centralise `SITE_URL`/`BRAND_URL` in `src/lib/seo.ts` so the next change is one edit. Deliberately omitted to match the codebase's current hardcoded-URL pattern and keep this plan low-risk.
