# RestOS Features Page: 3D Parallax Storytelling Redesign

**Date:** 2026-06-07
**Status:** Design Spec (pre-implementation)
**Region Support:** IN / UK via existing region-aware components

## 1. Overview

Replace the current flat, alternating-layout features page with a scroll-driven 3D storytelling experience. Each feature is a floating 3D card that reveals a problem->solution narrative as the user scrolls. The page follows the journey of a single order through the restaurant, using a visual timeline spine as connective tissue.

### Design Dials

- DESIGN_VARIANCE: 8 (asymmetric layouts, each section unique, 3D perspective shifts)
- MOTION_INTENSITY: 7 (scroll-triggered reveals, mouse parallax, staggered entry)
- VISUAL_DENSITY: 3 (airy, premium whitespace, each element breathes)

### Core Narrative Device

A single order's journey through a restaurant: Customer Phone -> QR Menu -> Live Order -> Kitchen Display -> Payment -> Admin Dashboard -> Analytics. This timeline is the visual spine of the page.

### Emotional Arc

Problem (tension) -> Solution (release). Each feature section starts with the restaurant pain point, then scroll-reveals the RestOS solution. The design sells outcomes, not features.

## 2. Page Architecture

### Section Structure (9 sections, in order)

| # | Section | Height | Layout Type | Key Animation |
|---|---------|--------|-------------|---------------|
| 1 | Hero | ~100dvh | 3D centered intro | Letter-by-letter + ambient orbs + tagline fade |
| 2 | Timeline | ~100dvh | Interactive 3D node chain | Scroll-pinned vertical chain with animated connectors |
| 3 | Ordering | ~80dvh | Full-width floating card | Problem -> Solution rotateX reveal |
| 4 | Kitchen | ~80dvh | Split with device mockup | Before/after card flip + timer pulse |
| 5 | Payments | ~80dvh | Asymmetric split | Region-aware payment methods stagger |
| 6 | Management | ~80dvh | Tilted dashboard mockup | Dashboard UI scroll-reveal |
| 7 | Analytics | ~80dvh | Data visualization card | Animated number counters + chart reveals |
| 8 | BYOD | ~60dvh | Minimalist statement | Floating device icons orbit + pulse |
| 9 | CTA | ~60dvh | Full-width immersive | Gradient background + depth CTAs |

### Layout Diversification Rules

Every section uses a different layout composition. No two adjacent sections share the same layout pattern. Rules enforced:

1. No alternating zigzag (left/right image-text split) - max 0 consecutive sections with this pattern
2. Max 1 full-width centered layout (Hero only)
3. Max 1 split-screen layout (Kitchen)
4. Max 1 card-grid layout (Timeline uses node chain, not grid)
5. Each feature section (3-7) uses a unique compositional approach

### Color Palette (existing RestOS theme, preserved)

| Token | Value | Usage |
|-------|-------|-------|
| midnight | #0B1020 | Page background |
| carbon | #151B2E | Card/section surfaces |
| ember | #E8742A | Primary accent (problems, CTAs) |
| teal | #0E8C84 | Solution/positive indicators |
| gold | #C6A35B | Premium accents (BYOD section) |
| warm-white | #F3EFE7 | Primary text |
| stone | #9CA3AF | Secondary text |
| wire | #1E2640 | Borders, dividers |

### Typography (existing RestOS theme, preserved)

- Display: Space Grotesk (font-display) - headings
- Body: Inter (font-sans) - body text
- Mono: Space Mono (font-mono) - labels, badges, timers

## 3. Component Tree

### New Components to Build

```
src/app/_features/
├── page.tsx                          # Updated page shell (server component)
│                                     # Imports all feature sections
│
src/components/features/
├── FeaturesHero.tsx                   # Section 1: 3D hero
├── TimelineOverview.tsx               # Section 2: Interactive journey map
├── FeatureCard3D.tsx                  # Shared 3D card wrapper (perspective, tilt, scroll-reveal)
├── OrderingFeature.tsx                # Section 3: Ordering problem->solution
├── KitchenFeature.tsx                 # Section 4: Kitchen KDS story
├── PaymentFeature.tsx                 # Section 5: Region-aware payments
├── ManagementFeature.tsx              # Section 6: Admin dashboard
├── AnalyticsFeature.tsx               # Section 7: Region-aware analytics
├── BYODFeature.tsx                    # Section 8: Bring Your Own Device
├── FeaturesCTA.tsx                    # Section 9: Call to action
└── index.ts                          # Barrel exports
```

### FeatureCard3D (shared wrapper)

The core 3D carousel component. Each feature section wraps its content in this.

Props:
- `children`: ReactNode (inner content)
- `className`: string
- `id`: string
- `perspective`: 'shallow' | 'deep' (controls perspective value: 1200px vs 1600px)
- `tiltIntensity`: number (default 2, controls rotateX/Y range)

Behavior:
- Wraps content in a container with `perspective: 1200px` on the parent
- Inner motion.div uses `useSpring` for mouse-driven rotateX/Y (springs.ecosystem config)
- `useScroll` drives a subtle rotateX based on scroll progress through the section
- Content layers use `translateZ` for depth (background further, foreground closer)
- `whileInView` triggers stagger-reveal of inner content
- Respects `prefers-reduced-motion`: collapses all 3D transforms on reduced motion

### Scroll-Reveal Pattern (Problem -> Solution)

Each FeatureCard3D contains two phases:

**Phase 1: Problem (entry)**
- Large emoji/icon representing the pain point
- Pain statement headline (e.g. "Customers waiting for a waiter")
- 3-5 problem bullets in amber/ember tones
- Card has slight negative rotateX (-3deg) - tilted away
- Red/orange ambient glow behind

**Phase 2: Solution (scroll reveal)**
- As user scrolls further, the problem content tilts/fades via `useTransform` on scrollYProgress
- Solution content slides up from below (translateY: 20 -> 0 + opacity: 0 -> 1)
- Card levels to flat (rotateX: -3 -> 0)
- Feature headline in teal/warm-white
- Benefit bullets in teal
- Subtle teal/green ambient glow replaces the red glow
- Optional device mockup or visual element

Transition timing:
- Problem phase: 0 to 40% of section scroll progress
- Transition: 40% to 60% (overlap)
- Solution phase: 60% to 100%

### Region-Aware Content

Sections 5 (Payments) and 7 (Analytics) use region-specific content in the Solution phase. The Problem phase remains consistent across regions.

**Section 5 (Payments):** The Problem phase is hardcoded (universal payment pain points). The Solution phase wraps the existing `<RegionPaymentFeature />` component which renders region-specific headline, description, and bullet benefits from `region-config.ts`.

**Section 7 (Analytics):** The Problem phase is hardcoded. The Solution phase uses `<RegionAnalyticsDescription />` for the region-specific description text, with hardcoded benefit bullets around it.

The FeatureCard3D wrapper remains the same for all regions; only the solution content children vary based on `useRegion()` context.

## 4. Section-by-Section Detail

### Section 1: FeaturesHero

```
Layout: Full viewport, centered content + ambient background
```

- Reuses letter-by-letter animation pattern from home/Hero.tsx (heroLetter variants)
- Headline: "Everything Your Restaurant Needs"
- Subhead: "Less Waiting. Less Confusion. Less Hardware. More Revenue."
- Two CTAs: "Book a Free Demo" (primary), "WhatsApp Us" (ghost)
- Background: Ambient ember/teal orbs (reuse from Hero.tsx) + dot grid pattern
- Founding partner note (reuse constants)
- Timeline spine preview: a subtle vertical line with pulsing dot at bottom as scroll hint

### Section 2: TimelineOverview

```
Layout: Centered vertical node chain with 3D perspective
```

Builds on existing Ecosystem.tsx component. 7 nodes connected by animated lines:

| Node | Label | Description | Color |
|------|-------|-------------|-------|
| 1 | Customer Phone | Scans QR, browses menu | stone |
| 2 | QR Menu | Orders instantly, no app | ember |
| 3 | Live Order | Confirmed in real time | warm-white |
| 4 | Kitchen Display | Kitchen sees it immediately | teal |
| 5 | Payment | Settled from the table | gold |
| 6 | Admin Dashboard | Full control, from anywhere | ember |
| 7 | Analytics | Revenue and trends, live | teal |

- Each node is clickable (anchors to the corresponding section below)
- Mouse parallax tilts the whole chain (reuse mouse handler pattern from Ecosystem)
- Traveling data dots animate along connector lines
- Heading: "One Order. One Timeline. Visible To Everyone."
- Subtext: "From customer phone to your dashboard, every step is connected."

### Section 3: OrderingFeature

```
Layout: Full-width floating card with ember accent
```

Problem (Phase 1):
- "Customers wait for a waiter just to place an order"
- Bullets: waiting for waiter, feeling rushed, wrong orders, wasted staff time, queues

Solution (Phase 2):
- "Customers order when they're ready"
- Show QR code visual + phone mockup
- Bullets: every table has QR, customers use own phone, order instantly, no miscommunication
- CTA inline: "See it in action"

### Section 4: KitchenFeature

```
Layout: Split screen - left problem, right solution device mockup
```

Uses the scroll-reveal but in a split format. Left side shows the problem/solution text. Right side shows a TiltedDevice-like mockup with the KDS screen.

Problem (Phase 1):
- "Lost paper KOTs, illegible handwriting, frustrated staff"
- Amber pulses for "orders over 10 minutes"

Solution (Phase 2):
- "Kitchen never misses an order"
- KDS display appears on right with animated order cards
- Color-coded status badges: New (teal) -> Confirmed (gold) -> Completed (stone) -> Served (warm-white)
- Timer pulses amber at 10min, red at 20min

### Section 5: PaymentFeature

```
Layout: Asymmetric - solution dominates, problem is smaller inset
```

Uses `<RegionPaymentFeature />` for inner content. Wraps in FeatureCard3D.

Problem (Phase 1):
- "Waiting for the bill, queuing to pay, running card machines"
- Region-specific payment pains

Solution (Phase 2):
- "Get paid without the hassle"
- Animated payment method icons: UPI, Cards, Wallet, Net Banking, Cash
- Region-specific payment benefits
- Direct settlement note

### Section 6: ManagementFeature

```
Layout: Dashboard preview card with device mockup
```

Problem (Phase 1):
- "Jumping between multiple systems, not knowing what's happening"
- Admin pain points: manual updates, limited visibility

Solution (Phase 2):
- "Run your restaurant from one screen"
- Tilted tablet/laptop mockup with dashboard UI
- Animated data: revenue counter, order count, table status
- Bullets: full visibility, faster updates, better table management

### Section 7: AnalyticsFeature

```
Layout: Data visualization card with animated counters
```

Uses `<RegionAnalyticsDescription />` for region-specific description text.

Problem (Phase 1):
- "Guessing which dishes are profitable, over/under staffing"
- Data pain points

Solution (Phase 2):
- "Know what makes money"
- Animated counter numbers (best-sellers, revenue trends, peak hours)
- Mini bar chart or line chart (CSS-only, SVG)
- Bullets: best-sellers, underperformers, peak hours, trend tracking

### Section 8: BYODFeature

```
Layout: Minimalist, centered. High whitespace.
```

- Large headline: "The restaurant software that doesn't force you to buy hardware"
- Three floating device silhouettes (phone, tablet, TV/monitor) in a subtle orbit around the text
- Each device uses CSS `animation: float` with different delays
- Clean bullet list: Customers use own phones, Staff use existing devices, Kitchen uses existing screens
- No hardware lock-in
- Lower setup costs

Color: Gold accent (premium/unique value proposition)

### Section 9: FeaturesCTA

```
Layout: Full-width, gradient background (midnight -> carbon)
```

- Headline: "See all of this in your restaurant."
- Two CTAs: "Book a Free Demo" (ember primary), "WhatsApp Us" (ghost)
- No other visual elements - clean, focused close
- Reuses existing Button, RegionLinkButton, and WhatsAppButton components

## 5. Animation Specifications

### Shared 3D Card (FeatureCard3D)

```typescript
// Mouse parallax
const rotateX = useSpring(0, springs.ecosystem)
const rotateY = useSpring(0, springs.ecosystem)

// Scroll-driven rotation
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start end', 'end start'],
})
const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2])
const scrollOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.6])
```

### Scroll-Reveal (Problem -> Solution)

```typescript
// Problem phase
const problemOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
const problemY = useTransform(scrollYProgress, [0, 0.35], [0, -20])

// Solution phase
const solutionOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1])
const solutionY = useTransform(scrollYProgress, [0.4, 0.65], [20, 0])

// Card rotation based on scroll
const cardRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -2])
```

### Stagger Reveal

Content within each phase staggers in using framer-motion variants:

```typescript
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const fadeUpChild = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
}
```

### Reduced Motion

Every animated element wraps in `useReducedMotion()` check. Under reduced motion:
- All 3D transforms collapse to flat (rotateX/Y = 0, translateZ = 0)
- Scroll-reveal becomes simple fade-in opacity
- Mouse parallax is disabled
- Floating/pulsing ambient animations are disabled
- Stagger delays collapse to 0

### Timing References

| Animation | Duration | Easing |
|-----------|----------|--------|
| Card scroll-rotate | 0.6s | spring (80, 15) |
| Problem->Solution crossfade | 0.4s | ease-out |
| Stagger children | 0.06s gap | spring (300, 30) |
| Mouse parallax settle | spring (150, 20) | n/a |
| Timeline node entry | 0.15s stagger | spring (150, 20) |
| Counter animation | 0.8s per digit | ease-out |
| BYOD float | 4s loop | ease-in-out |

## 6. Code Architecture

### Page Shell (`src/app/_features/page.tsx`)

Server component that provides metadata and imports the client component:

```tsx
// Server component (metadata + layout shell)
export const metadata: Metadata = { ... }

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" ... />
      <main>
        <FeaturesClient />
      </main>
      <Footer />
    </>
  )
}
```

### Client Wrapper (`FeaturesClient.tsx`)

Orchestrates all sections, provides section-level scroll tracking if needed.

### Constants

All feature content (copy, bullets, icons) lives in a `src/lib/features-content.ts` file for clean separation. Region-specific content uses the existing `region-config.ts` approach.

### Imports

Reuses from existing codebase:
- `@/lib/animations` - animation variants
- `@/lib/parallax` - spring configs, mouse normalisation
- `@/lib/constants` - founding spots, etc.
- `@/lib/region-context` - region-aware content
- `@/components/ui/Button`, `WhatsAppButton`, `RegionPaymentFeature`, `RegionAnalyticsDescription`
- `@/components/layout/Navbar`, `Footer`

## 7. Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| < 640px (mobile) | Single column. 3D perspective reduces. Scroll-reveal becomes simple opacity fade. Feature sections stack vertically. Device mockups smaller. |
| 640-1024px (tablet) | Most 3D effects preserved but subtler. Sections adapt grid to 1-2 columns. |
| > 1024px (desktop) | Full 3D experience. All animations active. Section layouts at maximum composition. |

Key responsive rules:
- FeatureCard3D perspective reduces from 1200px to 800px on mobile
- Timeline overview collapses to simpler vertical list on mobile
- Split layouts (Kitchen) stack on mobile
- Mouse parallax only fires on devices with `@media (hover: hover) and (pointer: fine)`

## 8. Empty / Loading / Error States

Since this is a static marketing page (not an app), loading states are minimal:
- Page load: Navbar loads immediately, sections fade in via `whileInView` as user scrolls
- Image load: Mockup areas use `loading="lazy"` with a placeholder skeleton pulse
- Video load: TiltedDevice video has poster frame fallback
- Region content failure: Falls through to default IN content (existing pattern)

## 9. Performance Considerations

- FeatureCard3D uses `useSpring` (not `useState`) for mouse tracking to avoid React re-renders on scroll
- All scroll-driven transforms use `useTransform` (runs on animation frame, not React render)
- Images lazy-loaded via Next.js `<Image>` or native `loading="lazy"`
- Videos have `preload="metadata"`
- No `window.addEventListener('scroll')` anywhere (framer-motion useScroll handles this)
- Device mockup videos only play when in viewport (IntersectionObserver check)
- CSS transform animations for BYOD floating devices (GPU composited)
- Respects `prefers-reduced-motion` and `prefers-reduced-transparency`

## 10. Accessibility

- All sections use semantic HTML (`<section>`, `<h2>`, `<h3>`, `<ul>`, `<li>`)
- All interactive elements have focus styles
- Reduced motion mode collapses all 3D transforms, scroll-reveal, and parallax
- Color contrast: Body text (#9CA3AF on #0B1020) passes WCAG AA
- Ember (#E8742A) on midnight passes for large text
- Keyboard navigation: Timeline nodes are keyboard-focusable with Enter activation
- Screen readers: aria-labels on decorative elements, proper heading hierarchy
- Cards use `role="region"` with aria-labelledby referencing their heading

## 11. Implementation Order

1. Create `src/lib/features-content.ts` with all copy and content data
2. Build `FeatureCard3D` shared wrapper component
3. Build `FeaturesHero` (Section 1)
4. Build `TimelineOverview` (Section 2) - enhanced from Ecosystem.tsx
5. Build `OrderingFeature` (Section 3)
6. Build `KitchenFeature` (Section 4)
7. Build `PaymentFeature` (Section 5)
8. Build `ManagementFeature` (Section 6)
9. Build `AnalyticsFeature` (Section 7)
10. Build `BYODFeature` (Section 8)
11. Build `FeaturesCTA` (Section 9)
12. Create `FeaturesClient.tsx` wrapper
13. Update `page.tsx` page shell
14. Add animations to `src/lib/animations.ts` if needed
15. Verify region routes (in/features, uk/features) still work
16. Test reduced motion
17. Test responsive across breakpoints
