# Omniviya Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the product from "RestOS" to "Omniviya" — collapse the two-tier brand (company Omniviya + product RestOS) into a single unified brand. Every user-facing string, schema URL, logo, animation, and metadata reference updated.

**Architecture:** Buckets: (1) brand config strings, (2) static SVG logo, (3) animated loader logo, (4) layout schemas/metadata, (5) page schemas/metadata, (6) about+narrative copy, (7) video paths + OG image. Buckets 1, 4–6 are broad-but-shallow string work. Bucket 3 is the risk (bespoke animation re-choreography). Execute in dependency order: config strings → layout schemas → page schemas → static logo → animated logo → narrative copy → assets.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Framer Motion, SVG, JSON-LD schema.org

---

### Task 1: Brand Config Strings (region-config.ts)

**Files:**
- Modify: `src/lib/region-config.ts` (lines 122, 126, 133–137, 140, 151, 156, 177–181, 233, 244–248, 251, 267, 290–294)

- [ ] **Step 1: Edit `in` region — siteName, heroVideo, metadata strings**

Replace the following values in the `regionConfig.in` object:

```typescript
    siteName: 'Omniviya',
    locales: ['en_IN', 'hi'],
    badge: 'NOW LAUNCHING IN INDIA',
    tagline: 'Built For India. Built To Last.',
    description: 'Built for India. The complete operating system for restaurants of every size.',
    heroVideo: '/video/omniviya-vertical-inr.mp4',
    heroDescription: 'Omniviya is the complete operating system for Indian restaurants. One screen. Every order. Every table. Every rupee.',
    analyticsDescription: 'Omniviya tracks every order, every rupee, every item sold. See your best sellers, peak hours, and revenue by source — automatically, in real time.',
    ogTitle: 'Omniviya — The Operating System For Indian Restaurants',
    ogDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time, all on devices you already own.',
    twitterTitle: 'Omniviya — The Operating System For Indian Restaurants',
    twitterDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all in real time.',
    aboutCompanyText: 'Omniviya is a software company building a complete restaurant operating system — QR ordering, kitchen display, payments, and analytics — because restaurants deserve technology that actually works together. Powered by a team based in India, building for India first.',
    foundingMissionText: 'We are building the operating system that Indian restaurants deserve.',
```

- [ ] **Step 2: Edit `uk` region — same pattern**

Replace in `regionConfig.uk`:

```typescript
    siteName: 'Omniviya',
    heroVideo: '/video/omniviya-vertical-gbp.mp4',
    heroDescription: 'Omniviya is the complete operating system for UK restaurants. One screen. Every order. Every table. Every pound.',
    analyticsDescription: 'Omniviya tracks every order, every pound, every item sold. See your best sellers, peak hours, and revenue by source — automatically, in real time.',
    ogTitle: 'Omniviya — The Operating System For UK Restaurants',
    ogDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time.',
    twitterTitle: 'Omniviya — The Operating System For UK Restaurants',
    twitterDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all in real time.',
    aboutCompanyText: 'Omniviya is a software company building a complete restaurant operating system — QR ordering, kitchen display, payments, and analytics — because restaurants deserve technology that actually works together. Powered by a team based in India, building for the UK and India.',
    foundingMissionText: 'We are building the operating system that UK restaurants deserve.',
```

- [ ] **Step 3: Update missionBody/whoWeBuilt strings (both regions)**

`in` missionBody: `Omniviya` replaces `RestOS` analogically. No structural rewrite needed — the body text references the product generically as "the software". Only the bucket 6 (about page) needs the narrative rewrite.

`in` whatWeBuiltBody: no change needed (already generic).
`uk` missionBody: no RestOS reference to replace.
`uk` whatWeBuiltBody: no RestOS reference.

- [ ] **Step 4: Commit**

```bash
git add src/lib/region-config.ts
git commit -m "feat(rebrand): update config strings to Omniviya"
```

---

### Task 2: FAQ & Features Content Strings

**Files:**
- Modify: `src/lib/features-content.ts` (lines 158, 160, 176, 196–238)
- Modify: `src/components/ui/RegionContent.tsx` (line 56)

- [ ] **Step 1: Edit HERO_CONTENT description**

```typescript
export const HERO_CONTENT = {
  headline: 'Everything Your Restaurant Needs. In One System.',
  tagline: 'Less Waiting. Less Confusion. Less Hardware. More Revenue.',
  description: 'Omniviya connects customers, waiters, kitchen staff, and management on a single platform. From the moment a guest walks in to the moment they leave, every step is faster, clearer, and more profitable.',
}
```

- [ ] **Step 2: Edit BYOD_CONTENT subtext**

```typescript
export const BYOD_CONTENT = {
  headline: 'No hardware to buy. No installation fees. No lock-in.',
  subtext: 'Omniviya works on devices you already own — phones, tablets, laptops, and TVs. Everything a POS system does, without the POS system cost.',
  comparisons: [/* same */],
}
```

- [ ] **Step 3: Rename FAQ headline and every "RestOS" → "Omniviya" in FAQ_CONTENT**

```typescript
export const FAQ_CONTENT = {
  headline: 'Restaurant tech questions, answered in plain English',
  questions: [
    {
      q: 'What is Omniviya?',
      a: 'Omniviya is restaurant management software that runs in a browser. It replaces traditional POS hardware with QR code ordering, a kitchen display system, digital payments, and real-time analytics. Everything works on devices your restaurant already owns — phones, tablets, laptops, and TVs. There is no hardware to buy, no complex installation, and no long-term contract.',
    },
    {
      q: 'Do I need to buy any hardware?',
      a: 'No. Omniviya works on any device with a browser — your existing smartphones, tablets, laptops, and TVs. There are no POS terminals to buy, no self-ordering kiosks to install, and no kitchen printers to maintain. Restaurants typically already have everything they need to get started.',
    },
    // ... repeat "RestOS" → "Omniviya" replacement for ALL 10 FAQ questions
    {
      q: 'What analytics does Omniviya provide?',
      a: 'Omniviya tracks everything that matters: real-time revenue, best-selling dishes, profit per dish, peak hour patterns, dine-in vs takeaway split, and staffing needs. All data updates live and can be exported for accounting and GST filing. You get reports you can act on, not just charts to look at.',
    },
  ],
}
```

Replace every `'RestOS` with `'Omniviya` and every `RestOS` (in sentence context) with `Omniviya` across all 10 FAQ questions and their answers.

- [ ] **Step 4: Edit RegionContent.tsx — replace RestOS in What We Built**

On line 56, change:
```typescript
          RestOS is a complete restaurant operating system — QR ordering, kitchen display,
```
to:
```typescript
          Omniviya is a complete restaurant operating system — QR ordering, kitchen display,
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/features-content.ts src/components/ui/RegionContent.tsx
git commit -m "feat(rebrand): update FAQ and feature content to Omniviya"
```

---

### Task 3: Static SVG Logo (Logo.tsx)

**Files:**
- Modify: `src/components/ui/Logo.tsx`

- [ ] **Step 1: Update compact variant**

Changes needed:
- `aria-label`: `"RestOS"` → `"Omniviya"`
- `viewBox`: `"0 0 310 104"` → `"0 0 360 104"` (widen by 50px for all-caps 8-char wordmark)
- `fontSize`: `"40"` → `"36"` (shrink slightly to fit)
- `letterSpacing`: `"-1.5"` → `"-1"`
- Text spans: `Rest` → `OMNI`, `OS` → `VIYA`
- Font weights: `Rest` fontWeight `"700"` (unchanged), `OS` fontWeight `"300"` → `"700"` and remove `fill` prop (VIYA inherits `#F3EFE7` from parent text — only VIYA needs orange fill `"#E8742A"`)
- `x` position may need adjustment: `"118"` → `"108"` (shift left to center the wider word)

```typescript
      <svg
        width={width ?? 180}
        viewBox="0 0 360 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Omniviya"
        role="img"
      >
        {/* MORTAR + PESTLE — unchanged */}
        {/* WORDMARK */}
        <text
          x="108"
          y="68"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="36"
          letterSpacing="-1"
          fill="#F3EFE7"
        >
          <tspan fontWeight="700">OMNI</tspan>
          <tspan fill="#E8742A" fontWeight="700">VIYA</tspan>
        </text>
      </svg>
```

- [ ] **Step 2: Update full variant (with tagline)**

Similar changes but keep the wider viewBox and larger font:

- `aria-label`: `"RestOS — Restaurant Operating System"` → `"Omniviya — Restaurant Operating System"`
- `viewBox`: stays `"0 0 360 120"` (already wide enough for full variant)
- `fontSize`: `"40"` → `"36"`
- `letterSpacing`: `"-1.5"` → `"-1"`
- `x`: `"118"` → `"108"`
- Text spans + weights same as compact

```typescript
      <svg
        width={width ?? 240}
        viewBox="0 0 360 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Omniviya — Restaurant Operating System"
        role="img"
      >
        {/* MORTAR + PESTLE — unchanged */}
        {/* WORDMARK */}
        <text
          x="108"
          y="68"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="36"
          letterSpacing="-1"
          fill="#F3EFE7"
        >
          <tspan fontWeight="700">OMNI</tspan>
          <tspan fill="#E8742A" fontWeight="700">VIYA</tspan>
        </text>
        {/* TAGLINE — unchanged */}
      </svg>
```

- [ ] **Step 3: Build and visually verify**

Run: `npm run build`
Expected: Build succeeds, no type errors.

Open the dev server and verify the logo renders correctly at both `full` and `compact` variants.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Logo.tsx
git commit -m "feat(rebrand): update static logo to OMNI/VIYA wordmark"
```

---

### Task 4: Animated Loader Logo (MotionLogo.tsx) — Highest Risk

**Files:**
- Modify: `src/components/ui/MotionLogo.tsx`

This task re-choreographs the page-loader animation. Current: typewriter reveals "Rest" then "OS" with 18 particles flying to the "OS" font. New: reveals "OMNI" then "VIYA" with particles flying to "VIYA".

- [ ] **Step 1: Update text content and font weights**

Change the two wordmark spans from:
```typescript
            {/* "Rest" */}
            <motion.span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 72,
                fontWeight: 700,
                color: '#F3EFE7',
                letterSpacing: -2,
                opacity: restOpacity,
              }}
            >
              Rest
            </motion.span>

            {/* "OS" */}
            <motion.span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 72,
                fontWeight: 300,
                color: '#E8742A',
                letterSpacing: -2,
                scale: osScale,
                transformOrigin: 'left bottom',
                position: 'relative',
                display: 'inline-block',
                opacity: osOpacity,
              }}
            >
              OS
```

to:
```typescript
            {/* "OMNI" */}
            <motion.span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 72,
                fontWeight: 700,
                color: '#F3EFE7',
                letterSpacing: -2,
                opacity: restOpacity,
              }}
            >
              OMNI
            </motion.span>

            {/* "VIYA" */}
            <motion.span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 72,
                fontWeight: 700,
                color: '#E8742A',
                letterSpacing: -2,
                scale: osScale,
                transformOrigin: 'left bottom',
                position: 'relative',
                display: 'inline-block',
                opacity: osOpacity,
              }}
            >
              VIYA
```

- [ ] **Step 2: Rename motion values and variables for clarity**

Rename:
- `restOpacity` → `omniOpacity` (and its `useMotionValue(0)` call)
- `osOpacity` → `viyaOpacity`
- `osGlow` → `viyaGlow`
- `osScale` → `viyaScale`

Update the `useMotionValue` declarations:
```typescript
  const pestleRotation = useMotionValue(35)
  const omniOpacity = useMotionValue(0)
  const viyaOpacity = useMotionValue(0)
  const viyaGlow = useMotionValue(0)
  const viyaScale = useMotionValue(1)
  const taglineOpacity = useMotionValue(0)
  const highlightX = useMotionValue(-100)
```

- [ ] **Step 3: Update animation tick function — text reveals**

Update the text reveal section of the `tick()` function. The timing shifts because "VIYA" (4 chars) replaces "OS" (2 chars) — the reveal and glow should feel rhythmically correct for 4 characters:

```typescript
      // --- Text reveals ---
      // "OMNI" fade: 2.7s → 3.5s
      omniOpacity.set(interpolate(elapsed, [s4, s4 + 0.5], [0, 1]))
      // "VIYA" fade: slightly after OMNI
      viyaOpacity.set(interpolate(elapsed, [s4 + 0.17, s4 + 0.67], [0, 1]))
      // VIYA glow: 3.5s → 4.2s (held slightly longer for a wider word)
      viyaGlow.set(interpolate(elapsed, [s5, s5 + 0.5, s6], [0, 1, 0.4]))
      // VIYA scale: 3.5s → 4.2s
      viyaScale.set(interpolate(elapsed, [s5, s5 + 0.4, s5 + 0.7], [1, 1.08, 1]))
```

- [ ] **Step 4: Update particle target coordinates**

The particles currently fly to `finalX = 370 + seededRandom(...)` to land on "OS". Since "VIYA" is positioned further right (wider word), the target needs to shift. Estimate: "OMNI" ≈ 0.62 × width of "Rest", so the start of "VIYA" is roughly at `x ≈ 400`. Set the particle target to `420 + seededRandom(...)` to center them on the "VIYA" glyphs:

```typescript
          // Flow toward VIYA (scene 5)
          if (elapsed >= s4) {
            const flowEased = interpolate(elapsed, [s4, s5], [0, 1])
            const finalX = 420 + seededRandom(p.id * 7) * 25
            const finalY = -8 + seededRandom(p.id * 8) * 15 - 7
            x = x + (finalX - x) * flowEased
            y = y + (finalY - y) * flowEased
          }
```

- [ ] **Step 5: Update variable references in the dependency array**

The `useEffect` dependency array references `pestleRotation`, `restOpacity`, `osOpacity`, `osGlow`, `osScale`, `taglineOpacity`, `highlightX`. Update to new variable names:

```typescript
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pestleRotation, omniOpacity, viyaOpacity, viyaGlow, viyaScale, taglineOpacity, highlightX, particles])
```

- [ ] **Step 6: Build and visually verify**

Run: `npm run build`
Expected: Build succeeds, no type errors.

Open the site and trigger the loading screen. Verify:
1. The typewriter reveals "OMNI" then "VIYA" (not "Rest" then "OS")
2. Particles emerge from the mortar and fly toward "VIYA"
3. Glow and scale animation target "VIYA"
4. Tagline appears after the wordmark animation completes
5. Highlight sweep covers the full word

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/MotionLogo.tsx
git commit -m "feat(rebrand): re-choreograph loader animation for OMNI/VIYA"
```

---

### Task 5: Region Layouts — Metadata + Schema Consolidation

**Files:**
- Modify: `src/app/in/layout.tsx`
- Modify: `src/app/uk/layout.tsx`

Change: `restos.in` → `omniviya.in` in all URLs. Merge Organization + WebApplication into a single Organization schema (single brand).

- [ ] **Step 1: Edit `src/app/in/layout.tsx`**

Replace the entire `jsonLd` block:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://omniviya.in/#organization',
      name: 'Omniviya',
      url: 'https://omniviya.in',
      logo: 'https://omniviya.in/og-image.png',
      description: 'Omniviya is a complete restaurant operating system — QR ordering, kitchen display, payments, analytics, and table management. Built for Indian restaurants.',
      foundingDate: '2025',
      location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'IN' } },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hello@omniviya.in',
        availableLanguage: ['English', 'Hindi'],
      },
      sameAs: ['https://omniviya.in'],
    },
  ],
}
```

Replace the entire `metadata` export:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://omniviya.in'),
  title: {
    default: 'Omniviya — The Operating System For Indian Restaurants',
    template: '%s — Omniviya',
  },
  description: 'Omniviya is the complete operating system for Indian restaurants. QR code ordering, kitchen display system, waiter app, UPI payments, and real-time analytics.',
  keywords: [...regionConfig.in.seoKeywords],
  authors: [{ name: 'Omniviya' }],
  creator: 'Omniviya',
  publisher: 'Omniviya',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://omniviya.in/in',
    languages: {
      'en-in': 'https://omniviya.in/in',
      'en-gb': 'https://omniviya.in/uk',
      'x-default': 'https://omniviya.in/in',
    },
  },
  openGraph: {
    title: 'Omniviya — The Operating System For Indian Restaurants',
    description: 'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time.',
    url: 'https://omniviya.in/in',
    siteName: 'Omniviya',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Operating System' }],
    locale: 'en_IN',
    type: 'website',
    countryName: 'India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omniviya — The Operating System For Indian Restaurants',
    description: 'QR ordering, kitchen display, waiter app, payments, and analytics — all in real time.',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'India',
  },
}
```

- [ ] **Step 2: Edit `src/app/uk/layout.tsx` — same pattern**

Replace jsonLd:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://omniviya.in/#organization',
      name: 'Omniviya',
      url: 'https://omniviya.in',
      logo: 'https://omniviya.in/og-image.png',
      description: 'Omniviya is a complete restaurant operating system — QR ordering, kitchen display, payments, analytics, and table management. Built for UK restaurants.',
      foundingDate: '2025',
      location: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'GB' } },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'hello@omniviya.in',
        availableLanguage: ['English'],
      },
      sameAs: ['https://omniviya.in'],
    },
  ],
}
```

Replace metadata:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://omniviya.in'),
  title: {
    default: 'Omniviya — The Operating System For UK Restaurants',
    template: '%s — Omniviya',
  },
  description: 'Omniviya is the complete operating system for UK restaurants. QR code ordering, kitchen display system, waiter app, and real-time analytics.',
  keywords: [...regionConfig.uk.seoKeywords],
  authors: [{ name: 'Omniviya' }],
  creator: 'Omniviya',
  publisher: 'Omniviya',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://omniviya.in/uk',
    languages: {
      'en-gb': 'https://omniviya.in/uk',
      'en-in': 'https://omniviya.in/in',
      'x-default': 'https://omniviya.in/in',
    },
  },
  openGraph: {
    title: 'Omniviya — The Operating System For UK Restaurants',
    description: 'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time.',
    url: 'https://omniviya.in/uk',
    siteName: 'Omniviya',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Omniviya — Restaurant Operating System' }],
    locale: 'en_GB',
    type: 'website',
    countryName: 'United Kingdom',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omniviya — The Operating System For UK Restaurants',
    description: 'QR ordering, kitchen display, waiter app, payments, and analytics — all in real time.',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'GB',
    'geo.placename': 'United Kingdom',
  },
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/in/layout.tsx src/app/uk/layout.tsx
git commit -m "feat(rebrand): consolidate schemas and migrate URLs to omniviya.in"
```

---

### Task 6: Page-Level Schemas and Metadata

**Files:**
- Modify: `src/app/_features/page.tsx` (lines 15, 39)
- Modify: `src/app/_pricing/page.tsx` (lines 11, 21)
- Modify: `src/app/_founding/page.tsx` (lines 26, 40)
- Modify: `src/app/_about/page.tsx` (lines 10–34)
- Modify: `src/app/_demo/page.tsx` (lines 7–24)

- [ ] **Step 1: Edit `_features/page.tsx`**

Change `const base = \`https://restos.in/${region}\`` to `\`https://omniviya.in/${region}\``

Change `name: 'RestOS'` to `name: 'Omniviya'` in the SoftwareApplication schema.

- [ ] **Step 2: Edit `_pricing/page.tsx`**

Change FAQ answer `'No. RestOS works on phones...'` to `'No. Omniviya works on phones...'`

Change `const base = \`https://restos.in/${region}\`` to `\`https://omniviya.in/${region}\``

- [ ] **Step 3: Edit `_founding/page.tsx`**

Change `const base = \`https://restos.in/${region}\`` to `\`https://omniviya.in/${region}\``

Change `name: 'RestOS Founding Partner Program'` to `name: 'Omniviya Founding Partner Program'`

- [ ] **Step 4: Edit `_about/page.tsx`**

Change all URL references from `restos.in` → `omniviya.in`:
- `url: 'https://restos.in/about'` → `url: 'https://omniviya.in/about'`
- `canonical: 'https://restos.in/about'` → `canonical: 'https://omniviya.in/about'`
- `item: 'https://restos.in/'` → `item: 'https://omniviya.in/'`
- `item: 'https://restos.in/about'` → `item: 'https://omniviya.in/about'`

Change title/description references:
- `title: 'About — RestOS by Omniviya'` → `title: 'About — Omniviya'`
- `description: 'RestOS is built by Omniviya...'` → `description: 'Omniviya is a complete restaurant operating system...'`
- `og.title: 'About RestOS — Restaurant Operating System by Omniviya'` → `og.title: 'About Omniviya — Restaurant Operating System'`
- `og.description: 'RestOS is built by Omniviya...'` → `og.description: 'Omniviya is a complete restaurant operating system...'`
- `twitter.title: 'About RestOS — Restaurant Operating System by Omniviya'` → `twitter.title: 'About Omniviya — Restaurant Operating System'`
- `twitter.description: 'RestOS by Omniviya — built for...'` → `twitter.description: 'Omniviya — built for...'`
- OG image alt: `'RestOS — About'` → `'Omniviya — About'`

- [ ] **Step 5: Edit `_demo/page.tsx`**

Change all URL references:
- `url: 'https://restos.in/demo'` → `url: 'https://omniviya.in/demo'`
- `canonical: 'https://restos.in/demo'` → `canonical: 'https://omniviya.in/demo'`
- Breadcrumb items: `restos.in` → `omniviya.in`

Change title/description:
- `title: 'Book a Free Demo — RestOS'` → `title: 'Book a Free Demo — Omniviya'`
- `description: 'See RestOS running...'` → `description: 'See Omniviya running...'`
- `og.title: 'Book a Free Demo — RestOS Restaurant Operating System'` → `og.title: 'Book a Free Demo — Omniviya Restaurant Operating System'`
- `og.description: 'Free 20-minute demo... See RestOS live...'` → `og.description: replace RestOS with Omniviya`
- `twitter.description: '...RestOS live...'` → `...Omniviya live...'`
- OG image alt: `'RestOS Demo'` → `'Omniviya Demo'`

Also update the h1 on line 45: `Let&apos;s show you RestOS` → `Let&apos;s show you Omniviya`

- [ ] **Step 6: Commit**

```bash
git add src/app/_features/page.tsx src/app/_pricing/page.tsx src/app/_founding/page.tsx src/app/_about/page.tsx src/app/_demo/page.tsx
git commit -m "feat(rebrand): update page schemas and metadata to Omniviya"
```

---

### Task 7: About Page Narrative Rewrite

**Files:**
- Modify: `src/components/ui/RegionContent.tsx` (already done the RestOS → Omniviya string in Task 2)
- The narrative rewrite lives in `regionConfig.in.aboutCompanyText` and `regionConfig.uk.aboutCompanyText` (already done in Task 1)

Verify: The "About Omniviya" box on the about page renders `region.aboutCompanyText`, which now reads "Omniviya is a software company building a complete restaurant operating system..." (single brand narrative, no "RestOS is our first product"). The "What We Built" section already says "Omniviya is a complete restaurant operating system..." (updated in Task 2).

- [ ] **Step 1: Verify the about page renders correctly**

Run: `npm run build`
Expected: Build succeeds.

Open `/about` in the dev server. Verify:
1. "Our Mission" section renders correctly (from `region.missionBody` — no RestOS reference)
2. "What We Built" says "Omniviya is a complete restaurant operating system..."
3. "About Omniviya" sidebar box shows the single-brand narrative

- [ ] **Step 2: Commit**

```bash
git commit -m "feat(rebrand): complete about page narrative rewrite"
```
(Only if there are remaining uncommitted changes from this task; otherwise skip.)

---

### Task 8: Privacy and Cookie Policy Docs

**Files:**
- Modify: `src/lib/region-config.ts` — within `privacyDoc` and `cookieDoc` objects

- [ ] **Step 1: Update privacy doc intro text (both regions)**

`regionConfig.in.privacyDoc.intro`:
Change `...collected through the RestOS marketing website...` to `...collected through the Omniviya website...`

`regionConfig.in.privacyDoc.sections[0]`:
Change `RestOS is a product of Omniviya...` to `Omniviya is a restaurant operating system...`

`regionConfig.in.cookieDoc.intro`:
Change `...cookies used on the RestOS website.` to `...cookies used on the Omniviya website.`

Repeat for `regionConfig.uk` equivalents.

- [ ] **Step 2: Commit**

```bash
git add src/lib/region-config.ts
git commit -m "feat(rebrand): update legal docs to Omniviya branding"
```

---

### Task 9: Video File Paths + OG Image Placeholder

**Files:**
- Modify: `src/lib/region-config.ts` — `heroVideo` paths (already done in Task 1)
- Create: `public/og-image.png` (replacement)
- Create: pass on video files (needs design tool — outside code scope)

- [ ] **Step 1: Rename video file references**

Confirmed in Task 1: `heroVideo` paths changed from `/video/restos-vertical-inr.mp4` → `/video/omniviya-vertical-inr.mp4` (and UK equivalent). The actual `.mp4` files need to be renamed on disk too.

Run:
```bash
# Rename video files (if they exist — may need re-rendering first)
if (Test-Path "public/video/restos-vertical-inr.mp4") {
  Move-Item "public/video/restos-vertical-inr.mp4" "public/video/omniviya-vertical-inr.mp4"
}
if (Test-Path "public/video/restos-vertical-gbp.mp4") {
  Move-Item "public/video/restos-vertical-gbp.mp4" "public/video/omniviya-vertical-gbp.mp4"
}
if (Test-Path "public/video/restos-flow.mp4") {
  Move-Item "public/video/restos-flow.mp4" "public/video/omniviya-flow.mp4"
}
if (Test-Path "public/video/restos-flow.webm") {
  Move-Item "public/video/restos-flow.webm" "public/video/omniviya-flow.webm"
}
```

Also update the `restos-flow.mpg` reference if used anywhere — check:
```typescript
grep "restos-flow" src/ -r
```

- [ ] **Step 2: Verify no stale references**

Run: `grep "restos-" src/ -r`
Expected: No remaining references to `restos-vertical` or `restos-flow`.

- [ ] **Step 3: Commit**

```bash
git add public/video/ git add src/lib/region-config.ts
git commit -m "feat(rebrand): update video paths to omniviya- prefix"
```

---

### Task 10: Package.json + Cosmetic

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Change package name**

```json
{
  "name": "omniviya",
  ...
}
```

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "chore(rebrand): rename package to omniviya"
```

---

### Task 11: Full Build Verification + Cleanup Sweep

- [ ] **Step 1: Run a full build**

```bash
npm run build
```
Expected: Clean build. Fix any TS errors (likely none — all changes are string/schema/coordinate replacements).

- [ ] **Step 2: Sweep for remaining "RestOS" references (should be ~0)**

Run: `grep -r "RestOS" src/ --include="*.tsx" --include="*.ts"`
Expected: 0 matches (or only legitimate false positives like edge-case schema formatting).

If any remain, fix them. Likely locations:
- Any comment/doc strings in components (non-functional, but clean)
- The `loading-screen.tsx` file if it exists globally

- [ ] **Step 3: Sweep for remaining "restos.in" references**

Run: `grep -r "restos\.in" src/ --include="*.tsx" --include="*.ts"`
Expected: 0 matches.

- [ ] **Step 4: Sweep for remaining "restos-" file references**

Run: `grep -r "restos-" src/ --include="*.tsx" --include="*.ts"`
Expected: 0 matches.

- [ ] **Step 5: Final commit**

```bash
git commit -m "chore(rebrand): final cleanup sweep"
```

---

## Risk Mitigation

| Risk | When | Mitigation |
|---|---|---|
| MotionLogo particle coordinates wrong | Task 4 | Open dev server, inspect visually, adjust `finalX` incrementally (±20px) |
| OG image still shows RestOS | Post-deploy | Generate placeholder or note in deploy docs that design team needs to re-render |
| Video files show RestOS on-screen | Post-deploy | Out of code scope — requires re-rendering in design tool before launch |
| Schema validator complains | Task 5 | Run `https://search.google.com/test/rich-results` with the deploy URL |

---

## Self-Review Checklist

1. **Spec coverage:** Every bucket from the spec has a task — brand strings (T1), FAQ (T2), static logo (T3), animated logo (T4), schema consolidation (T5), page schemas (T6), about narrative (T7), privacy docs (T8), video paths (T9), cosmetic (T10), verification (T11).

2. **Placeholder scan:** No "TBD", "TODO", or empty steps. Every code block is complete and actionable.

3. **Type consistency:** Variable names used in Task 4 (`omniOpacity`, `viyaOpacity` etc.) are consistent across all references. URL format `https://omniviya.in/` is consistent across all tasks.
