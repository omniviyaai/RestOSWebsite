# Enterprise Tier — Design Spec
**Date:** 2026-06-23  
**Status:** Approved

## Overview

Add an Enterprise pricing tier to the Omniviya RestOS marketing site. The tier targets restaurant groups, chains, and franchises that need centralized management, dedicated infrastructure, and custom integrations. It does not have a fixed price — instead, a "Request a Quote" CTA opens a modal embedding a Google Form. The user (Omniviya team) receives the submission via Google Forms notification and follows up manually.

## Card Placement

Enterprise is a 4th card added to the existing pricing card row in `PricingClient.tsx`, appearing after Free, Elite, and Premium. It is visually distinct from the other three cards — darker background, gold/amber border, no price shown — signalling it is a different category without breaking the row layout.

The card is not region-specific. It renders identically on `/in/pricing` and `/uk/pricing`.

### Card Contents
- **Label:** `ENTERPRISE`
- **Headline:** `Custom Pricing`
- **Subheading:** `For chains, groups & franchises`
- **Features (5 bullets):**
  - Unlimited Branches
  - Centralized Admin Dashboard
  - Dedicated Cloud Environment
  - Custom POS & Third-Party Integrations
  - Enterprise SLA & Dedicated Account Manager
- **CTA Button:** `Request a Quote`

## Modal

Clicking "Request a Quote" opens a full-screen overlay modal on top of the pricing page. The modal contains:

1. **Branded header:** "Omniviya Enterprise" title + "For Restaurant Groups, Chains & Franchises" subtitle
2. **Google Form iframe:** Full-height embed of the enterprise inquiry form
3. **Close controls:** × button (top-right) and ESC key listener

### Form Fields (defined in Google Form by user)
- Contact: Full Name, Business Email, Phone Number
- Restaurant: Brand Name, Country, Number of Branches, Expected Locations in 12 months
- Requirements: Current POS System, Estimated Monthly Orders, Existing Online Ordering Platform, Required Integrations, Additional Requirements
- Message: Open text field for business goals and challenges
- Submit: "Request Enterprise Demo"

### Form URL
A placeholder constant `ENTERPRISE_FORM_URL` is defined at the top of `EnterpriseCard.tsx`. The user will replace it with the real Google Form embed URL after creating the form. The iframe uses `?embedded=true` query param (required by Google Forms for iframe embedding).

### Submission Handling
Google Forms handles everything — stores responses in Google Sheets, sends email notification to the form owner. No backend code required. User connects with leads manually.

## Architecture

### Self-Contained Component
Modal state (`isOpen: boolean`) lives inside `EnterpriseCard.tsx`. No state is lifted to parent components. This keeps the change isolated — `PricingClient.tsx` only needs one new line to add the card.

### New Files
| File | Purpose |
|------|---------|
| `src/components/pricing/EnterpriseCard.tsx` | Card UI + modal logic + iframe embed |

### Modified Files
| File | Change |
|------|--------|
| `src/components/pricing/PricingClient.tsx` | Import and render `<EnterpriseCard />` after the 3 `<PlanCard />` components |

### No Changes Needed
- `src/lib/pricing-content.ts` — enterprise has no pricing data to configure
- `src/lib/region-config.ts` — enterprise card is region-agnostic
- `src/app/in/pricing/page.tsx` / `src/app/uk/pricing/page.tsx` — no changes, PricingClient is already rendered
- No API routes, no new pages, no routing changes

## Styling Notes

Follow the existing Tailwind + design token conventions used in `PlanCard.tsx`:
- Background: `bg-stone-950` or darker
- Border: `border-amber-700/50` (gold, muted)
- Text: `text-warm-white` for headline, `text-stone-400` for subtext
- CTA button: use existing `Button` component with appropriate variant
- Modal overlay: `fixed inset-0 z-50 bg-black/80 backdrop-blur-sm`
- Modal body: centered, max-width constrained, scrollable on mobile

## Out of Scope

- `/enterprise` dedicated page (not needed — modal approach chosen)
- Region-specific enterprise pricing
- CRM integration or lead database
- Automated email follow-up
- Any backend API routes
