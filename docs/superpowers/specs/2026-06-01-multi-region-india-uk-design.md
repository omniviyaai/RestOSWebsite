# RestOS Multi-Region (India / UK) — Design Spec
**Date:** 2026-06-01
**Status:** Draft

---

## 1. OVERVIEW

RestOS currently serves a single region (India). This spec extends the website to support two
regional variants — **India** and **United Kingdom** — served from the same domain (`restos.in`)
with automatic geo-detection and a manual region picker override.

**Trigger:** The hero video, pricing, currency, payment gateways, phone numbers, and copy differ
between regions. Features and product functionality remain identical.

---

## 2. ARCHITECTURE

### 2.1 Approach: Edge Function Routing (Recommended)

A Netlify Edge Function detects the visitor's country via `context.geo.country` and rewrites the
request to a region-prefixed path. Each region is a separate Next.js route group, built once into
static HTML files.

```
Visitor → restos.in
  │
  ▼
Netlify Edge Function (Deno)
  │  Reads: context.geo.country
  │  Checks: region cookie (manual override)
  │
  ├── IN → Rewrite to /in/{path}
  ├── GB → Rewrite to /uk/{path}
  └── Other → Default to /in/{path}
```

### 2.2 Why Not Other Approaches

| Approach | Rejected Because |
|----------|-----------------|
| Next.js SSR + Geo Middleware | Higher cost, slower TTFB, more complex than needed |
| Client-Side Detection | Flash of wrong content, poor SEO, no server-side hreflang |
| Separate Domains (restos.in / restos.co.uk) | Double the infra, worse brand consolidation |

---

## 3. URL STRUCTURE

Symmetrical prefixes for both regions under the same domain:

| Region | Homepage | Pricing | Features |
|--------|----------|---------|----------|
| India | `restos.in/in/` | `restos.in/in/pricing/` | `restos.in/in/features/` |
| UK | `restos.in/uk/` | `restos.in/uk/pricing/` | `restos.in/uk/features/` |

Root (`restos.in/`) geo-detects and rewrites. Direct access to `/in/` or `/uk/` works without
any redirect — the Edge Function passes through requests already under a region prefix.

---

## 4. CONTENT CONFIGURATION

### 4.1 Region Config File

A single TypeScript file holds all region-specific values. Components consume it via React Context.

```typescript
// src/lib/region-config.ts
export const regionConfig = {
  in: {
    currency: '₹',
    currencyCode: 'INR',
    phonePrefix: '+91',
    paymentGateways: ['Razorpay', 'Cashfree'],
    siteName: 'RestOS India',
    locales: ['en_IN', 'hi'],
    badge: 'NOW LAUNCHING IN INDIA',
    whatsappNumber: '919XXXXXXXXX',
    heroVideo: '/video/restos-vertical-inr.mp4',
    tagline: 'Built For India. Built To Last.',
    socialProof: 'Trusted by Indian restaurants...',
  },
  uk: {
    currency: '£',
    currencyCode: 'GBP',
    phonePrefix: '+44',
    paymentGateways: ['Stripe'],
    siteName: 'RestOS UK',
    locales: ['en_GB'],
    badge: 'NOW AVAILABLE IN THE UK',
    whatsappNumber: '447XXXXXXXXX',
    heroVideo: '/video/restos-vertical-gbp.mp4',
    tagline: 'Built For UK Restaurants.',
    socialProof: 'Trusted by UK restaurants...',
  }
}
```

### 4.2 Region Context

A React Context (`RegionProvider` / `useRegion`) delivers the current region's config to any
component in the tree. Each route group's layout wraps content with the appropriate provider.

```typescript
// src/lib/region-context.tsx
const RegionContext = createContext<RegionConfig>(regionConfig.in)

export function RegionProvider({ region, children }) {
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

---

## 5. ROUTE GROUPS

Next.js route groups generate both region variants from a single build.

```
src/app/
├── (in)/
│   ├── layout.tsx          ← wraps with <RegionProvider region="in">
│   ├── page.tsx            ← re-exports HomePage
│   ├── pricing/page.tsx
│   ├── features/page.tsx
│   ├── founding/page.tsx
│   ├── about/page.tsx
│   └── demo/page.tsx
├── (uk)/
│   ├── layout.tsx          ← wraps with <RegionProvider region="uk">
│   ├── page.tsx
│   ├── pricing/page.tsx
│   ├── features/page.tsx
│   ├── founding/page.tsx
│   ├── about/page.tsx
│   └── demo/page.tsx
└── layout.tsx              ← shared root layout (fonts, metadata template)
```

Each route group page is a thin wrapper:

```typescript
// src/app/(in)/page.tsx
export { HomePage as default } from '@/components/home/HomePage'

// src/app/(in)/pricing/page.tsx
export { PricingPage as default } from '@/components/pricing/PricingPage'
```

The same component renders for both regions — `useRegion()` handles the differences.

---

## 6. COMPONENT CHANGES

### 6.1 Hero (src/components/home/Hero.tsx)
- Remove hardcoded badge text, tagline
- Use `useRegion()` for badge, tagline, social proof references
- Pass region-specific video source to TiltedDevice

### 6.2 TiltedDevice (src/components/ui/TiltedDevice.tsx)
- Accept optional `videoSrc` prop (defaults to existing `/video/restos-flow.mp4`)
- Fall back to existing file if no prop provided (backward compat)

### 6.3 Pricing (src/components/pricing/PricingSection.tsx)
- Read `region.currency`, `region.currencyCode` for price display
- Use region-specific price amounts

### 6.4 Footer (src/components/layout/Footer.tsx)
- Read `region.phonePrefix` for contact numbers
- Read `region.paymentGateways` for "we accept" section
- Region-specific business addresses

### 6.5 Root Layout (src/app/layout.tsx)
- Metadata (locale, region, currency, geo tags) becomes dynamic via region config
- Insert hreflang alternate links for both regions

### 6.6 Constants (src/lib/constants.ts)
- Remove region-specific values (WHATSAPP_NUMBER, WHATSAPP_MESSAGE, WHATSAPP_URL) — they move to region-config.ts
- DEMO_PAGE_URL, FOUNDING_PAGE_URL, FOUNDING_SPOTS values stay (not region-specific)
- Constants that are truly global stay (e.g., NAV_LINKS, PAIN_STATEMENTS, TRUST_SIGNALS)

---

## 7. VIDEO HANDLING

| Region | File | Path |
|--------|------|------|
| India | `public/video/restos-vertical-inr.mp4` | `/video/restos-vertical-inr.mp4` |
| UK | `public/video/restos-vertical-gbp.mp4` | `/video/restos-vertical-gbp.mp4` |
| Fallback | `public/video/restos-flow.mp4` | `/video/restos-flow.mp4` |

Both files already exist in the project. The TiltedDevice component receives the source path
from the parent (Hero) which reads it from `useRegion().heroVideo`.

---

## 8. EDGE FUNCTION

```typescript
// netlify/edge-functions/geo-route.ts
import type { Context } from 'netlify:edge'

export default async (req: Request, ctx: Context) => {
  const url = new URL(req.url)

  // Pass through if already on a region-specific path
  if (url.pathname.startsWith('/in/') || url.pathname.startsWith('/uk/')) {
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

### 8.1 netlify.toml

```toml
[[edge_functions]]
function = "geo-route"
path = "/*"

[build]
publish = "out/"
command = "npx next build && npx next export"
```

---

## 9. SEO

### 9.1 hreflang Tags

Each page includes alternate links pointing to the corresponding region variant:

```html
<link rel="alternate" hreflang="en-in" href="https://restos.in/in/pricing/" />
<link rel="alternate" hreflang="en-gb" href="https://restos.in/uk/pricing/" />
<link rel="alternate" hreflang="x-default" href="https://restos.in/" />
```

### 9.2 Canonical URLs

Each region variant has a self-referencing canonical URL.

### 9.3 OG Metadata

Open Graph `locale`, `site_name`, and price/currency values come from region config.

---

## 10. REGION PICKER

- A dropdown/toggle in the navbar
- Shows current region flag/text (India/UK)
- On selection, sets a `region=in` or `region=uk` cookie and reloads
- Edge Function checks cookie before geo-detecting
- Cookie persists across sessions

---

## 11. NEW FILES SUMMARY

| File | Purpose |
|------|---------|
| `src/lib/region-config.ts` | All region-specific values |
| `src/lib/region-context.tsx` | RegionProvider component + useRegion hook |
| `src/app/(in)/layout.tsx` | India route group layout |
| `src/app/(in)/page.tsx` | India homepage re-export |
| `src/app/(in)/pricing/page.tsx` | India pricing re-export |
| `src/app/(in)/features/page.tsx` | India features re-export |
| `src/app/(in)/founding/page.tsx` | India founding re-export |
| `src/app/(in)/about/page.tsx` | India about re-export |
| `src/app/(in)/demo/page.tsx` | India demo re-export |
| `src/app/(uk)/layout.tsx` | UK route group layout |
| `src/app/(uk)/page.tsx` | UK homepage re-export |
| `src/app/(uk)/pricing/page.tsx` | UK pricing re-export |
| `src/app/(uk)/features/page.tsx` | UK features re-export |
| `src/app/(uk)/founding/page.tsx` | UK founding re-export |
| `src/app/(uk)/about/page.tsx` | UK about re-export |
| `src/app/(uk)/demo/page.tsx` | UK demo re-export |
| `netlify/edge-functions/geo-route.ts` | Geo routing Edge Function |
| `netlify.toml` | Netlify deployment config |

## 12. MODIFIED FILES SUMMARY

| File | Changes |
|------|---------|
| `src/lib/constants.ts` | Remove India-specific values (moved to region-config) |
| `src/components/home/Hero.tsx` | Use useRegion() for badge, tagline, video src |
| `src/components/ui/TiltedDevice.tsx` | Accept optional videoSrc prop |
| `src/components/pricing/PricingSection.tsx` | Region-based pricing (currency, amount) |
| `src/app/layout.tsx` | Dynamic SEO metadata, hreflang links |
| `src/components/layout/Footer.tsx` | Region-specific contact, addresses |
| `src/components/layout/Navbar.tsx` | Region picker toggle |
| `next.config.ts` | Possibly adjust for Netlify Edge Function compat |

## 13. FUTURE REGIONS

Adding a new region is trivial:
1. Add entry to `region-config.ts`
2. Add route group `(ae)/` etc.
3. Edge Function handles new country code automatically
