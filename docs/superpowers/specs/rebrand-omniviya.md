# Rebrand: RestOS → Omniviya — Design Spec

**Date:** 2026-06-11
**Status:** Draft — awaiting user review

## Context

RestOS is a pre-launch restaurant operating system (marketing site in this repo + a separate
SaaS product app). Historically a two-tier brand: **Omniviya** (company) / **RestOS** (product).

New facts that shape this rebrand:
- **`omniviya.in` (apex) is a LIVE agency website** — it must not be disturbed.
- There is a **separate Next.js SaaS app** (the actual product) to host alongside this marketing site.

Decision: collapse to a **single unified brand — everything restaurant-side becomes "Omniviya"** —
and host the three web properties as siblings under the apex via subdomains.

## Locked decisions

| Decision | Choice |
|---|---|
| Brand architecture | Single unified brand — the restaurant product is also "Omniviya" |
| Apex `omniviya.in` | Untouched — stays the live agency site |
| Marketing site (this repo) | **`restaurants.omniviya.in`** (static export → Netlify) |
| SaaS product app (other repo) | **`app.omniviya.in`** (separate deploy) |
| Marketing → app handoff | Yes — wire CTAs to `app.omniviya.in`, URL stored in region-config |
| Logo wordmark | All-caps `OMNI` (white, 700) + `VIYA` (orange `#E8742A`, **700**) |
| Tagline | Keep "RESTAURANT OPERATING SYSTEM" (descriptor) |
| Mortar & pestle icon | Keep (carries the "restaurant" signal) |
| siteName | Flat "Omniviya" (no region suffix) |

**Open (non-blocking):** registered legal entity name for the privacy/cookie docs (placeholder for now).

## Property / DNS architecture

| Property | Host (URL) | Hosting | DNS |
|---|---|---|---|
| Agency site (live) | `omniviya.in` | existing host | unchanged |
| Marketing site (this repo) | `restaurants.omniviya.in` | Netlify | `CNAME restaurants → Netlify` |
| SaaS product app | `app.omniviya.in` | its own host | `CNAME app → that host` |

Independent deploys, independent SSL. The marketing site links to the app for sign-up/login;
the app subdomain should be `noindex`. DNS + custom-domain binding are dashboard actions, **not repo changes**.

---

## Current state (already applied in the working tree)

Rebrand edits are partly done already (by the user, in parallel):
- ✅ Brand strings → "Omniviya" in `region-config.ts`, `features-content.ts`, layouts, footer, cookie banner, privacy/cookie pages, and the `_features/_pricing/_founding` content + region wrappers.
- ✅ `siteName: 'Omniviya'`; `heroVideo` paths renamed to `/video/omniviya-vertical-*.mp4`.
- ⚠️ URLs were set to the **apex** `https://omniviya.in/...` — these must move to **`https://restaurants.omniviya.in/...`** (see Bucket 3).
- ❌ Logo (`Logo.tsx`, `MotionLogo.tsx`) still renders "Rest/OS".
- ❌ Video **files** in `public/video/` are still named `restos-vertical-*.mp4`, so the renamed config paths currently point at missing files — must reconcile.

---

## Work buckets

### Bucket 1 — Finish brand strings + single-brand narrative

- Sweep any remaining "RestOS" literals to "Omniviya" (verify with grep; target zero in `src/`).
- **About narrative rewrite** ([region-config.ts](src/lib/region-config.ts) `aboutCompanyText`, `missionBody`, `whatWeBuiltBody`): today it tells a "company Omniviya makes product RestOS" story — rewrite into one brand ("Omniviya is the complete operating system for restaurants…").
- **Legal docs** (`privacyDoc`/`cookieDoc`): "RestOS is a product of Omniviya" → "Omniviya is operated by [legal entity]"; keep `hello@omniviya.in`. Add a placeholder registered-entity name.
- FAQ already updated; re-verify "What is Omniviya?" reads cleanly.
- Keep tagline + mortar/pestle.

**Files:** `src/lib/region-config.ts`, `src/lib/features-content.ts`, `src/app/_about/page.tsx` (+ region wrappers), any stragglers found by grep.

### Bucket 2 — Logo: static (`Logo.tsx`)

- Wordmark `Rest`/`OS` → `OMNI`/`VIYA`, **all-caps**, OMNI white 700 / VIYA orange `#E8742A` 700.
- **Re-size:** `OMNIVIYA` (8 caps) is far wider than `RestOS` (6 mixed) at `fontSize:40` from `x=118` in `viewBox="0 0 310 104"` (compact) and `0 0 360 120` (full) → widen viewBox and/or reduce fontSize and/or add letter-spacing so it doesn't overflow. Apply to **both** variants.
- `aria-label`: "RestOS" → "Omniviya". Mortar/pestle + tagline unchanged.

**Files:** `src/components/ui/Logo.tsx`.

### Bucket 3 — Logo: loader animation (`MotionLogo.tsx`) — hardest

- Two spans `Rest`/`OS` → `OMNI`/`VIYA`; both reveal-timed for 4+4 chars.
- **Re-target the 18 particles** (currently fly to `x≈370` onto "OS") and the glow/scale/highlight onto "VIYA"; recompute final coordinates for the wider word and any viewBox change made in Bucket 2.
- `aria-label` → "Omniviya". Budget real animation-tuning time; verify visually in the page loader.

**Files:** `src/components/ui/MotionLogo.tsx`.

### Bucket 4 — URLs: apex → `restaurants.omniviya.in`

- Re-point **`metadataBase`, every `canonical`, all `hreflang` languages (incl. `x-default`), OG `url`, breadcrumb URLs** from `https://omniviya.in/...` → `https://restaurants.omniviya.in/...`.
- **Schema modeling:** keep the `Organization` entity anchored at the brand home — `@id: https://omniviya.in/#organization`, `url: https://omniviya.in` (the Omniviya brand) — but set the `WebApplication`/page `url` and all page canonicals to the **subdomain**. (Single Organization; pages live on the subdomain.)
- Confirm the dual Organization+WebApplication graph is consolidated to a single coherent brand (already partly done — both layouts now carry one Organization node).

**Files:** `src/app/in/layout.tsx`, `src/app/uk/layout.tsx`, and the shared content pages `src/app/_features/page.tsx`, `src/app/_pricing/page.tsx`, `src/app/_founding/page.tsx`, plus their `in/`+`uk/` wrappers' `canonical`/OG `url`, and `_about/page.tsx`, `_demo/page.tsx`.

### Bucket 5 — Marketing → app handoff

The SaaS app is the separate `restaurant-os` monorepo (admin/staff/menu/api), hosted at
`app.omniviya.in`, with real `/login`, `/register`, `/onboarding` routes in its admin surface.

- Add `appUrl: 'https://app.omniviya.in'` to region-config (same for both regions; single source of truth).
- **"Get Started"** primary CTA → `${appUrl}/register`; **"Log in"** → `${appUrl}/login`. Keep existing WhatsApp + `/demo` CTAs as secondary.
- Only the outbound links live in this repo; the app's own content/rebrand is out of scope (separate effort).

**Files:** `src/lib/region-config.ts` (+ `RegionConfig` interface), `src/components/layout/Navbar.tsx`, optionally `src/components/home/Hero.tsx` / `FinalCTA.tsx`.

### Bucket 6 — Reconcile media + cosmetic

- **Rename** `public/video/restos-vertical-inr.mp4 → omniviya-vertical-inr.mp4`, `…-gbp.mp4 → omniviya-vertical-gbp.mp4` (config already references the new names; files must match or video breaks). Also `restos-flow.mp4`/`.webm` if referenced.
- `package.json` `name: "restos"` → `"omniviya"` (cosmetic; lockfile follows).
- `public/_redirects` review (currently just `/* /index.html 200` — clean).

**Cannot be fixed in code (flagged, owner action):** the **on-screen "RestOS" baked into the videos and `og-image.png`** needs re-rendering in a design/video tool. Renaming files doesn't change pixels. A placeholder OG image can be generated in-code if desired.

---

## Out of scope (this repo)
- Netlify custom-domain + DNS records (dashboard).
- **The SaaS app's own rebrand** — the `restaurant-os` monorepo (admin/staff/menu/api + Capacitor mobile + PWA manifests + icons, ~185 "RestOS" refs) is a **separate brainstorm → spec → plan**, run inside that repo. Deferred per user.
- The apex agency site (separate property) — though it should ideally link to / acknowledge the product so the shared "Omniviya" name isn't confusing.
- Re-rendering product videos / OG artwork.

## Verification
- `npm run build` — static export of all routes compiles.
- Grep: zero `RestOS` / `restos` literals remain in `src/` (except intentional, none expected).
- Grep: zero `https://omniviya.in/` **page** URLs remain in canonicals/OG/hreflang — all are `restaurants.omniviya.in` (the Organization `@id`/`url` deliberately stays `omniviya.in`).
- Visual: page loader shows the OMNI|VIYA animation; navbar/footer logos render without overflow at all breakpoints; `/in` shows ₹/UPI, `/uk` shows £/contactless still intact.

## Risk
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| MotionLogo re-tune breaks visually | Medium | High | Manual tuning + loader QA |
| Video files vs config path mismatch | Certain if unaddressed | High (broken video) | Bucket 6 rename |
| Baked "RestOS" in media | Certain until re-render | Low | Temporary; owner re-renders |
| SEO dip from new host | Low (pre-launch) | Negligible | No rankings to lose; subdomain avoids agency-site conflict |
