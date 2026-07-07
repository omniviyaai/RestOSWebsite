# World-Class Redesign — Implementation Plan

> Restaurant Rush Hour Psychology. Every pixel earns its place.

**Goal:** Transform Omniviya's marketing site into a $10B SaaS experience that makes restaurant owners feel the chaos of manual operations dissolving as they scroll.

**Emotional Journey:** Hero → Curiosity → Understanding → Excitement → Trust → Authority → Desire → Proof → Urgency → Action

**Design Codename:** RUSH HOUR

---

## Design System Decisions

### Visual Language
- **Atmosphere**: Dark, cinematic, premium. The restaurant is alive at midnight.  
- **Depth system**: 4 layers — background mesh → ambient glows → surface cards → floating elements
- **Motion philosophy**: Everything breathes. Nothing is static. But motion serves information, not decoration.
- **Typography**: Space Grotesk stays (display), Inter OUT → replaced with `DM Sans` for body (more organic, less SaaS-generic). `Space Mono` stays for data/mono.

### New CSS Utilities (globals.css)
- `.glass` — `backdrop-blur-xl bg-white/5 border border-white/10`
- `.glass-ember` — ember-tinted glass panel
- `.glass-teal` — teal-tinted glass panel
- `.mesh-gradient` — animated 3-stop conic mesh with ember/teal/gold
- `.aurora` — slow-moving aurora animation background
- `.noise` — `url("data:image/svg+xml...")` subtle grain overlay
- `.glow-ember` — `box-shadow: 0 0 40px rgba(232,116,42,0.3)`
- `.glow-teal` — `box-shadow: 0 0 40px rgba(14,140,132,0.3)`
- `.text-gradient-ember` — (text fill, not background-clip gradient — single color ramp)
- `.magnetic` — marker class for JS magnetic effect

### New Tailwind Animations
- `aurora` — 8s hue-shift + scale oscillation
- `float-slow` — 6s gentle float
- `float-fast` — 2.5s fast float  
- `order-in` — slide in from right (order notification)
- `ticket-drop` — slide in from top (KOT ticket)
- `pulse-dot` — small status dot pulse
- `count-up` — number counting animation via CSS counter
- `scan-line` — horizontal scan line across hero

---

## Phase 1: Global Design System

**Files:** `src/app/globals.css`, `tailwind.config.ts`

Changes:
- Add DM Sans to Google Fonts import
- Replace `font-sans: Inter` with `DM Sans` in Tailwind
- Add glass utility classes
- Add mesh/aurora/noise utilities  
- Add new animation keyframes
- Add `--glow-*` CSS custom properties

---

## Phase 2: Hero Rewrite

**File:** `src/components/home/Hero.tsx`

Concept — "The Rush Hour":
The hero visually simulates a restaurant at peak service. Floating order notification pills stream in from edges. Kitchen ticket snippets appear and disappish. A central headline anchors it:

```
47 orders today.
Your Restaurant
Is Running You.
```
*pause beat*
```
Not anymore.
```

Sub-headline: Real-time operational copy that changes by region (IN: "₹2,847 average daily revenue recovered by Omniviya restaurants")

Visual layers:
1. **Background**: Deep midnight with animated aurora mesh (ember top-left, teal bottom-right)  
2. **Floating UI elements**: 6-8 restaurant UI pills orbiting the central device
   - "🔔 Table 4 — Order placed" (slides in)
   - "🍳 KOT #47 — Sent to kitchen" (drops from top)  
   - "💳 Payment received ₹850" (fades in)
   - "📊 Peak hour: 7–9PM" (pulses)
3. **Central device**: Enhanced `TiltedDevice` with deeper 3D perspective
4. **CTAs**: Magnetic ember button ("See it live →") + ghost register button

---

## Phase 3: PainSection Enhancement

**File:** `src/components/home/PainSection.tsx`

Current: good scroll-driven opacity/rotation per statement.  
Enhancement:
- Add per-statement ambient color shift (midnight → dark ember glow → back)
- Add kinetic typography (words scale slightly on focus)
- Add "restaurant chaos" micro-elements per pain point (a spinning loading icon for "waiting", a crossed-out clock for "manual", etc.)

---

## Phase 4: Manifesto + Transformation

**Files:** `src/components/home/Manifesto.tsx`, `src/components/home/Transformation.tsx`

Manifesto:
- 3 principles rendered as large typographic statements, not cards
- Each principle gets a single ambient glow color (ember, teal, gold)
- Timeline connector between them

Transformation:
- Current Before/After is good — add glass treatment to "After" cards
- Add live-feeling micro-animation to After cards (a blinking cursor, a counting number)
- "After" cards get teal glow, "Before" cards get a subtle red/stone treatment

---

## Phase 5: Ecosystem

**File:** `src/components/home/Ecosystem.tsx`

Enhancement:
- Wrap each node in glass pill
- Add status badge to each node (green dot pulsing)
- The traveling data dot becomes multiple dots in sequence
- Add real order data labels on connector lines ("~2.1s avg", "instant", etc.)

---

## Phase 6: Stats + ProductHighlights

**Files:** `src/components/home/RevenueShowcase.tsx`, `src/components/home/ProductHighlights.tsx`

RevenueShowcase:
- Replace static numbers with count-up animation on scroll enter
- Add sparkline SVG paths to each stat card
- Glass card treatment with ember/teal accent glow

ProductHighlights:
- Keep 3D tilt — enhance with glass treatment
- Add animated background per card (subtle gradient shift on hover)
- Icon animates on hover (scale + glow)

---

## Phase 7: Trust + FinalCTA

**Files:** `src/components/home/TrustSection.tsx`, `src/components/home/FinalCTA.tsx`

TrustSection:
- Add "animated customer counter" — "127 restaurants live on Omniviya"
- Add live-feeling deployment map (SVG India/UK map with pulsing dots)
- Glass card treatment

FinalCTA:
- Premium magnetic CTA button with gradient shimmer sweep on hover
- Background: aurora mesh
- Add urgency signal (founding spots counter)

---

## Phase 8: Footer

**File:** `src/components/layout/Footer.tsx`

- Full redesign with proper 4-column grid
- Add region-aware contact info  
- Add "Built with pride" developer credit
- Glass top border treatment
- Add social links

---

## Phase 9: Pricing Page

**File:** `src/components/pricing/PricingClient.tsx` + all pricing components

- PlanCard: glass morphism with depth — carbon base + glass overlay + ember/teal/gold accent per plan
- BillingToggle: pill-style toggle with spring animation
- HonestBar: horizontal scrolling marquee treatment
- ComparisonTable: frosted glass header rows

---

## Phase 10: Verification

- `npx tsc --noEmit`
- `npm run build`  
- Playwright screenshot of home, pricing, features pages
- Lighthouse check (target 90+)

---

## Preserved Throughout

- Brand identity (mortar & pestle, ember/teal/gold)
- Region system (in/uk)
- All existing SEO/schema markup
- Lenis smooth scroll
- PageLoader FLIP animation
- Accessibility (focus visible, reduced motion, semantic HTML)
- WhatsApp floating badge
