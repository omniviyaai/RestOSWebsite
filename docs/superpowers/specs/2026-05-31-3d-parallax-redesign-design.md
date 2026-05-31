# RestOS 3D Parallax Redesign — Design Spec

## Overview

Transform RestOS from a functional static site into a cinematic, parallax-driven 3D experience. Every section has a unique animation personality. The site should feel like a premium startup experience — not a template.

**Stack:** Next.js 16 + React 19 + Framer Motion 12 + Tailwind CSS + Lenis (smooth scroll)

**Core principle:** Each section has its own motion language. No repeated animation patterns.

---

## Architecture

### New Dependencies

| Package | Purpose | Size |
|---------|---------|------|
| `lenis` | Smooth scroll for buttery parallax | ~15KB |
| `react-use` | `useMousePosition`, `useWindowSize` hooks | ~8KB |

### Core Systems (New Files)

1. **`src/lib/parallax.ts`** — Shared parallax utilities, spring configs, easing curves
2. **`src/components/ui/PerspectiveContainer.tsx`** — Wraps sections with `perspective` + `transform-style: preserve-3d`
3. **`src/components/ui/FloatingElement.tsx`** — Reusable 3D tilt/float with mouse tracking
4. **`src/components/ui/MagneticButton.tsx`** — Cursor-attracted buttons with spring physics
5. **`src/components/ui/ParallaxLayer.tsx`** — Depth-based parallax wrapper
6. **`src/components/ui/ScrollProgress.tsx`** — Global scroll progress provider

### Updated Systems

- **`src/lib/animations.ts`** — Add section-specific variants (pain, transformation, ecosystem, etc.)
- **`src/app/layout.tsx`** — Wrap in Lenis smooth scroll + ParallaxProvider

---

## Section Designs

### 1. Hero — "Immersion"

**Emotion:** "This is different."

**3D Layer Stack:**
- z-200: Ambient gradient orbs (ember + teal) drifting with mouse, 0.3x inverse speed
- z-100: Dot grid pattern shifting on scroll, 0.5x speed
- z-0: Main content with perspective tilt (rotateX/Y mapped to mouse)
- z+50: Floating dashboard preview with 3D rotation toward cursor

**Mouse interactions:**
- Container: `perspective: 1200px`
- Content: `rotateY(-2deg to 2deg)`, `rotateX(1deg to -1deg)` mapped to cursor
- Dashboard card: tilts toward cursor with spring (stiffness: 80, damping: 15)
- Background orbs: inverted parallax (opposite to cursor direction)

**Scroll behavior:**
- Content fades + translates up on scroll-past
- Background layers at 0.5x scroll speed
- Dashboard scales down + tilts away (3D perspective exit)

**Micro-animations:**
- Headline letters stagger in from `rotateX(-15deg)` with 30ms delay each
- Badge: subtle `scale(1)` → `scale(1.02)` breathing loop
- CTAs: magnetic pull toward cursor (15px radius)
- "Live" dot: pulsing glow animation

**Entry animation (on page load):**
- Orbs fade in first (0-400ms)
- Dot grid fades in (200-600ms)
- Badge slides up (400-700ms)
- Headline letters cascade (600-1200ms)
- Tagline fades up (900-1200ms)
- Description fades up (1000-1300ms)
- CTAs slide up (1100-1400ms)
- Dashboard card scales in from 0.9 (1200-1600ms)

---

### 2. PainSection — "Tension"

**Emotion:** "This feels like restaurant chaos."

**3D Layer Stack:**
- Dark gradient background that deepens on scroll (CSS var driven)
- Pain statements at different z-depths (staggered perspective)
- Each quote has slight rotateY based on scroll position

**Scroll behavior:**
- Each statement enters from a different angle (alternating left/right/center)
- Opacity + Y transform driven by scroll progress (enhanced from current)
- NEW: Each statement gets `rotateY(-3deg → 0)` on entry
- NEW: Background darkens progressively via CSS variable
- Closing statement: "light break" gradient appears from bottom

**Micro-animations:**
- Text-shadow intensifies on scroll (from `none` to `0 0 40px rgba(232,116,42,0.15)`)
- Border lines between quotes: width animates from 0% to 100%
- Mouse proximity: quotes tilt slightly toward cursor (2deg range)

**Directional conflicts:**
- Statements alternate entry direction (left-right-left-right)
- Slight rotation conflicts create unease
- No two statements animate the same way

---

### 3. Transformation — "Release"

**Emotion:** "Everything is coming together."

**3D Layer Stack:**
- Before cards: `rotateY(-1deg)`, darker, slightly recessed
- After cards: `rotateY(1deg)`, brighter, teal glow
- Arrow/connector: animated path drawing between them

**Scroll behavior:**
- Before cards slide from left with 3D perspective
- After cards slide from right with 3D perspective
- They "snap" together with spring physics (stiffness: 300, damping: 25)
- Each row staggered (0.1s delay between rows)

**Micro-animations:**
- Before cards: subtle "shake" on hover (representing chaos)
- After cards: smooth "glow pulse" on hover (representing order)
- Hover any row: before card gets `blur(1px)`, after card brightens
- Row dividers animate from center outward

**Snap moment:**
- When both sides meet, a brief `scale(1.02)` pulse on the combined row
- Teal glow intensifies for 200ms
- Creates satisfying "click into place" feeling

---

### 4. Ecosystem — "Intelligence"

**Emotion:** "This is a living operating system."

**This is the most technically impressive section.**

**3D Layer Stack:**
- Nodes at different z-depths (Admin front, Analytics mid, others back)
- Connecting lines in 3D perspective space
- Background: orbiting CSS-only particles (no canvas)
- Flowing data particles along connection lines

**Scroll behavior:**
- Nodes enter from different directions based on position
- Connecting lines draw themselves (stroke-dashoffset)
- Entire ecosystem has slow `rotateY` (2deg range) on scroll

**Micro-animations:**
- Node hover: `translateZ(20px) + scale(1.05)` lift
- Active node: pulsing ring animation
- Mouse proximity: nearby nodes pull toward cursor
- Connection lines: traveling dot animation (data flowing)
- Particle system: small dots orbit the ecosystem slowly

**Node activation sequence:**
1. Customer Phone lights up (entry)
2. QR Menu activates (0.2s delay)
3. Live Order pulses (0.4s delay)
4. Kitchen Display ignites (0.6s delay)
5. Waiter App connects (0.8s delay)
6. Payment processes (1.0s delay)
7. Analytics generates (1.2s delay)
8. Admin controls (1.4s delay)

Each activation has a "ripple" effect that travels to the next node.

---

### 5. ProductHighlights — "Discovery"

**Emotion:** "There is more to uncover."

**3D Layer Stack:**
- Cards in 3D carousel-like arrangement
- Each card at different z-depth (front larger, back smaller)
- Background grid that shifts with mouse

**Scroll behavior:**
- Cards enter with "deal card" animation (scale 0.8 + rotateY)
- Staggered entry (80ms delays)
- On scroll-past: cards tilt away in 3D (perspective exit)

**Micro-animations:**
- Hover: card lifts (`translateY(-8px) + translateZ(30px)`) with spring
- Hover: neighboring cards shift slightly (magnetic repulsion)
- Icon on each card: subtle bounce on card enter
- Card borders: animate from wire to ember on hover

**Spotlight effect:**
- On hover, a radial gradient follows the cursor within the card
- Creates "flashlight revealing content" feel
- Uses CSS `radial-gradient` + `background-position` animated via JS

---

### 6. DemoVideo — "Curiosity"

**Emotion:** "I want to see this product."

**3D Layer Stack:**
- Video player: "floating window" (translateZ + shadow depth)
- Callout labels: orbit slightly around player
- Background: subtle noise texture that shifts

**Scroll behavior:**
- Player enters with 3D rotation (`rotateX -5deg → 0`)
- Scale from 0.95 to 1
- Callout labels stagger in from different angles

**Micro-animations:**
- Play button: pulsing ring animation
- Hover on player: subtle tilt toward cursor
- Callout dots: breathing animation
- Border glow: shifts from teal to ember on hover

**Floating behavior:**
- Video player has a gentle `translateY` oscillation (sin wave, ±3px)
- Creates "suspended in space" feeling
- Pauses on hover (user is interacting)

---

### 7. FoundingBanner — "Exclusivity"

**Emotion:** "I want to be part of this."

**3D Layer Stack:**
- Card with depth via inner shadow layers
- Gold accent with shimmer effect (gradient animation)
- Perks list items with individual depth

**Scroll behavior:**
- Card enters with scale + opacity from 0.9
- Gold badge: "stamp" animation (scale 1.2 + rotate)
- Perks stagger in from left with 3D tilt

**Micro-animations:**
- Gold border: traveling shimmer (gradient loop)
- Checkmarks: "draw" effect (scale + rotation)
- SpotCounter: mechanical flip animation
- CTA: magnetic pull + ember glow on hover

**Prestige feel:**
- Gold shimmer travels along border every 3s
- Card has a subtle inner glow that pulses
- Perks have a "reveal" effect (clip-path from left)

---

### 8. TrustSection — "Precision"

**Emotion:** "This is professionally engineered."

**3D Layer Stack:**
- 4 signals in shallow 3D grid
- Each with subtle depth based on position
- Background: faint geometric pattern that shifts

**Scroll behavior:**
- Signals enter in wave pattern (top-left to bottom-right)
- Each has slight rotateX entry
- Final state: all aligned with subtle floating animation

**Micro-animations:**
- Hover: signal lifts + glow shadow
- Icon/heading: subtle scale pulse on hover
- Connecting lines (if visible): animate on scroll
- Geometric background: slow rotation

**Precision feel:**
- Clean, minimal motion
- Everything aligns to grid
- No playful elements — pure engineering

---

### 9. FinalCTA — "Momentum"

**Emotion:** "I'm ready to take action."

**3D Layer Stack:**
- Headline at z:0, description at z:-50, buttons at z:50
- Background gradient orb following mouse
- Floating particles (CSS keyframes)

**Scroll behavior:**
- Everything enters with dramatic stagger (120ms delays)
- Headline letters: individual 3D rotation entry
- Buttons: "launch" effect (scale 0.8 + translateY)

**Micro-animations:**
- Headline: subtle 3D text-shadow shifting with mouse
- Buttons: magnetic pull (20px radius)
- Background orb: follows cursor with spring physics
- "No commitment" text: gentle float animation

**Energy focus:**
- All motion converges toward the CTA buttons
- Background orb gets brighter near buttons
- Particle density increases near CTAs

---

### 10. Navbar — "The Guide"

**Emotion:** Subtle, functional, premium.

**3D Layer Stack:**
- Fixed position with `backdrop-blur` + depth shadow
- Logo with subtle 3D tilt on hover
- Nav links with underline animations

**Scroll behavior:**
- Background opacity: 0 → 0.9 on scroll
- Logo scales down slightly on scroll
- Links stagger in on mount

**Micro-animations:**
- Logo: tilts toward cursor on hover
- Nav links: clip-path underline animation
- CTA button: magnetic pull
- Scroll indicator: fades out on scroll

---

## Technical Implementation Notes

### Spring Configurations

```typescript
// Section-specific springs
const heroSpring = { type: 'spring', stiffness: 80, damping: 15 } // Floaty, dreamy
const painSpring = { type: 'spring', stiffness: 200, damping: 30 } // Heavy, weighted
const transformSpring = { type: 'spring', stiffness: 300, damping: 25 } // Snappy, precise
const ecosystemSpring = { type: 'spring', stiffness: 150, damping: 20 } // Flowing, organic
const ctaSpring = { type: 'spring', stiffness: 250, damping: 20 } // Energetic, bouncy
```

### Easing Curves

```css
--ease-hero: cubic-bezier(0.23, 1, 0.32, 1); /* Strong ease-out */
--ease-pain: cubic-bezier(0.77, 0, 0.175, 1); /* Heavy ease-in-out */
--ease-transform: cubic-bezier(0.32, 0.72, 0, 1); /* iOS-like snap */
--ease-ecosystem: cubic-bezier(0.45, 0, 0.55, 1); /* Smooth flow */
--ease-cta: cubic-bezier(0.22, 1, 0.36, 1); /* Punchy exit */
```

### Performance Rules

- All transforms on GPU (no layout thrashing)
- `will-change: transform` on parallax layers
- `prefers-reduced-motion` respected throughout
- CSS animations for predetermined sequences
- Framer Motion for dynamic/interruptible interactions
- No canvas/WebGL (CSS 3D only)

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  /* Keep opacity transitions */
  /* Remove transform-based motion */
  /* Keep color transitions for state indication */
}
```

---

## File Changes Summary

### New Files
- `src/lib/parallax.ts` — Parallax utilities
- `src/components/ui/PerspectiveContainer.tsx`
- `src/components/ui/FloatingElement.tsx`
- `src/components/ui/MagneticButton.tsx`
- `src/components/ui/ParallaxLayer.tsx`
- `src/components/ui/ScrollProgress.tsx`

### Modified Files
- `src/app/layout.tsx` — Add Lenis + ParallaxProvider
- `src/lib/animations.ts` — Add section-specific variants
- `src/components/home/Hero.tsx` — Full rewrite with 3D layers
- `src/components/home/PainSection.tsx` — Add tension animations
- `src/components/home/Transformation.tsx` — Add snap + convergence
- `src/components/home/Ecosystem.tsx` — Add flowing particles + node activation
- `src/components/home/ProductHighlights.tsx` — Add carousel depth + spotlight
- `src/components/home/DemoVideo.tsx` — Add floating window + orbiting labels
- `src/components/home/FoundingBanner.tsx` — Add shimmer + prestige
- `src/components/home/TrustSection.tsx` — Add geometric precision
- `src/components/home/FinalCTA.tsx` — Add orb + momentum
- `src/components/layout/Navbar.tsx` — Add scroll-reactive depth
- `tailwind.config.ts` — Add animation utilities
- `package.json` — Add lenis, react-use

---

## Success Criteria

1. Every section has a unique animation personality (no copy-paste)
2. Scroll feels like a cinematic journey (parallax depth throughout)
3. Mouse interactions feel premium (spring physics, magnetic pull)
4. All animations respect `prefers-reduced-motion`
5. No layout thrashing (GPU-only transforms)
6. Bundle increase < 30KB
7. Lighthouse performance score > 90
