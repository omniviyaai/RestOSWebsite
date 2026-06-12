# Omniviya — Brand Configuration

## Logo (Wordmark)

```
OMNI|VIYA
```

| Property | OMNI | VIYA |
|----------|------|------|
| Font | Space Grotesk | Space Grotesk |
| Weight | 700 (Bold) | 700 (Bold) |
| Color | `#F3EFE7` (warm-white) | `#E8742A` (ember) |
| Size (base) | 36px / 72px (animated) | 36px / 72px (animated) |
| Letter-spacing | -1 / -2 (animated) | -1 / -2 (animated) |
| Case | ALL-CAPS | ALL-CAPS |

**Always**: No space between OMNI and VIYA. Zero-width gap. The `/` in `OMNI|VIYA` is a visual guide — in production the wordmark is `OMNIVIYA` with color split.

**Never**: OMNIVIYA in a single color, lowercase ("OmniViya"), or separated by a literal pipe character.

## Tagline

```
RESTAURANT OPERATING SYSTEM
```

| Property | Value |
|----------|-------|
| Font | Space Mono |
| Weight | 400 / 700 |
| Color | `#9CA3AF` (stone) |
| Size | 9.5px / 14px (animated) |
| Letter-spacing | 2.5 / 4 (animated) |
| Case | ALL-CAPS |

## Icon

Mortar & pestle — the mortar is dark `#151B2E` (carbon) with `#E8742A` (ember) stroke and rim; the pestle is `#F3EFE7` (warm-white). Represents mixing/grinding ingredients — the act of preparing food, not the food itself.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **midnight** | `#0B1020` | Page background, body bg |
| **carbon** | `#151B2E` | Surfaces, cards, mortar body |
| **wire** | `#1E2640` | Borders, dividers, subtle separators |
| **ember** | `#E8742A` | Brand accent, VIYA, icons, CTAs, highlights |
| **ember-accent** | `#e8896e` | Ember hover/variant |
| **teal** | `#0E8C84` | Secondary accent, success states |
| **teal-accent** | `#6cc8b5` | Teal hover/variant |
| **gold** | `#C6A35B` | Tertiary accent, highlights |
| **warm-white** | `#F3EFE7` | Body text, OMNI, headings, primary copy |
| **warm-white-dim** | `#c8c5ba` | Muted text, secondary copy |
| **stone** | `#9CA3AF` | Tagline, tertiary text, metadata |

## Typography

| Role | Font | Stack |
|------|------|-------|
| Display / headings | Space Grotesk | `'Space Grotesk', sans-serif` |
| Body / UI | Inter | `'Inter', sans-serif` |
| Monospace / tagline | Space Mono | `'Space Mono', monospace` |

### Font loading

Weights loaded: Space Grotesk (400, 500, 600, 700), Inter (400, 500, 600), Space Mono (400, 700).

## Site Name

Flat `Omniviya` across all regions — no region suffix (`Omniviya India` / `Omniviya UK`).

## Regional Taglines

| Region | Tagline |
|--------|---------|
| India in) | "Built For India. Built To Last." |
| UK (uk) | "Built For UK Restaurants." |

## Domain

`omniviya.in`

## Video Assets

| File | Region | Format |
|------|--------|--------|
| `/video/omniviya-vertical-inr.mp4` | India | Vertical (9:16), 3.9 MB |
| `/video/omniviya-vertical-gbp.mp4` | UK | Vertical (9:16), 3.9 MB |
| `/video/omniviya-flow.mp4` | Both | Landscape, 1.5 MB |

## Design Principles

1. **Dark-first**. Midnight backgrounds. Light text. No light mode. The brand lives in darkness — warm, not cold.
2. **Ember accent**. `#E8742A` is the single brand color. Everything else (teal, gold) is secondary utility. Ember draws the eye.
3. **Space Grotesk for weight**. All headings and the wordmark use Space Grotesk's bold weight for presence. Inter handles body copy — readable, neutral, gets out of the way.
4. **Warm over cool**. The whites are warm (`#F3EFE7`, not `#FFFFFF`). The darks lean blue-black rather than pure black. The orange is burnt, not neon.
5. **Substance first**. Analytics, KDS, QR ordering, payments — the product is complex. The design should feel like a tool, not a toy. Every decorative element earns its place.
6. **BYOD philosophy**. The UI never pretends to be hardware. It lives on phones, tablets, and screens restaurants already own.

## Motion

| Animation | Timing | Purpose |
|-----------|--------|---------|
| float | 4s ease-in-out infinite | Gentle hover on cards/elements |
| pulse-glow | 2s ease-in-out infinite | Attention on CTAs |
| shimmer | 3s linear infinite | Loading/skeleton states |
| breathing | 3s ease-in-out infinite | Logo loader scale pulse |
| Hero scene | ~4.5s total | Logo: pestle grinds → particles become digital → OMNI fades → VIYA glows → tagline reveals |

## Perspective (3D)

- hero: 1200px
- feature: 1200px
- deep: 1600px
- shallow: 800px

## Background Patterns

- `gradient-radial`: Standard radial gradient utility
- `dot-grid`: `radial-gradient(circle, currentColor 1px, transparent 1px)` at `32px 32px`

## SEO Defaults

| Field | India | UK |
|-------|-------|-----|
| ogTitle | Omniviya — The Operating System For Indian Restaurants | Omniviya — The Operating System For UK Restaurants |
| ogDescription | QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time, all on devices you already own. | QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time. |

## Icon Set

Icons from **Lucide** — see `src/components/ui/icons.tsx`. Consistent stroke width, same visual weight as Inter body text.

## Implementation Files

- `tailwind.config.ts` — design tokens (colors, fonts, animations, perspectives)
- `src/app/globals.css` — custom properties, base styles, font import
- `src/components/ui/Logo.tsx` — static SVG logo (compact + full variants)
- `src/components/ui/MotionLogo.tsx` — animated logo loader (Framer Motion)
- `src/lib/region-config.ts` — regionalized brand strings, site name, taglines, SEO
