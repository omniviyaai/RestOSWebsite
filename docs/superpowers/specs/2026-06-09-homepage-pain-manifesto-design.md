# Homepage: Pain Rewrite + Manifesto Beat — Design Spec

**Date:** 2026-06-09
**Status:** Approved (pending written-spec review)
**Area:** Marketing homepage, the section sequence after the Hero.

## Goal

Make the post-Hero homepage connect with real restaurant owners by (1) rewriting the Pain statements to mirror an owner's actual day — region-aware for India and the UK — and (2) introducing a short **Manifesto** beat that states *how RestOS thinks* before the Before/After comparison proves it.

## Narrative

The Hero headline is *"Your Restaurant Is Running You."* The section sequence becomes a three-beat story:

1. **Pain** — *here's your day* (sharpened, region-aware quotes, now with an opening heading)
2. **Manifesto** — *here's how we think* (new universal beat; the answer to Pain's closing line "There is a better way.")
3. **Before/After** — *here's the difference* (existing Transformation grid, now headed as the proof)

New homepage order: **Hero → Pain → Manifesto → Transformation → Ecosystem → RevenueShowcase → ProductHighlights → FoundingBanner → TrustSection → FinalCTA.**

## Decisions (from brainstorming)

- Pain arc: **moment → cost → emotional toll**, building tension before the "better way" break.
- Pain statements are **region-aware** (IN vs UK); the Manifesto is **universal**.
- Manifesto appears as a **standalone block** between Pain and Before/After.
- Scope: **content + light polish** — keep existing scroll animations/grid; give the Manifesto its own typographic treatment; add a small kicker heading to the Before/After grid. No layout overhaul.

---

## Section 1 — Pain (rewrite + new heading)

**New opening heading** (Pain currently has none):
- Eyebrow: `THE REALITY`
- Heading: **"You know how this goes."** (time-of-day neutral — works for cafés, takeaways, dine-in)

**Region-aware quotes** (5 each, same arc; lines 1/2/4 carry local texture, 3/5 shared):

**🇮🇳 India**
1. "Friday rush. A paper KOT slips off the rail — and that table's order never reaches the kitchen."
2. "A customer paid on UPI. You're three screenshots deep and still can't match it to the right bill."
3. "At closing you spot it: two tables under-billed. Again. There goes tonight's profit, quietly."
4. "You're finally home — still refreshing the staff WhatsApp group, because it's the only window into your own restaurant."
5. "A regular walked out; the queue was too long. You found out a day too late to make it right."

**🇬🇧 UK**
1. "Friday rush. A paper ticket goes missing — and that table's order never reaches the kitchen."
2. "A card payment lands, but which table? You're scrolling the terminal instead of running the floor."
3. "At closing you spot it: two tables under-charged. Again. There goes tonight's profit, quietly."
4. "You're finally home — still glued to the team's group chat, because it's the only window into your own restaurant."
5. "A regular walked out; the queue was too long. You found out a day too late to make it right."

**Closer** (existing, unchanged): "This is what running a restaurant feels like today." + "There is a better way."

---

## Section 2 — Manifesto (new, universal)

- Eyebrow: `OUR APPROACH`
- Headline: **"We don't sell features. We solve what breaks your day."**
- Three principles (term + supporting line):
  1. **Fewer steps.** — "Less to learn, less that can go wrong."
  2. **What actually matters.** — "We fix what costs you time and money, not what looks good in a demo."
  3. **Built on ground reality.** — "How restaurants really run, on devices you already own."

**Light polish:** large display headline; the three principles as a short stacked list with a teal marker per item; generous vertical spacing so it reads as a "statement" beat, distinct from the card grids around it. It sits on `bg-midnight`, bridging Pain's closer into the Before/After proof.

---

## Section 3 — Before/After (light polish only)

Add a small kicker heading above the existing grid (which currently has none beyond the column labels):
- Kicker: **"Same floor. Fewer fires."**

The Before / "After RestOS" columns, rows, animations, and region-aware last row stay exactly as they are.

---

## Architecture / file changes

- **`src/lib/region-config.ts`** — add `painStatements: readonly string[]` to the `RegionConfig` interface and populate both `in` and `uk` with the 5 quotes above.
- **`src/lib/constants.ts`** — remove `PAIN_STATEMENTS` (its only consumer is `PainSection`; it moves to region config).
- **`src/components/home/PainSection.tsx`** — call `useRegion()`, render the new eyebrow + heading, and map `region.painStatements`. Drive the existing scroll-reveal math off the array length (already does, via `PAIN_STATEMENTS.length` → `region.painStatements.length`). `rotations` stays length-5.
- **`src/components/home/Manifesto.tsx`** — new universal component (copy can live inline as a local const; not region-aware).
- **`src/components/home/Transformation.tsx`** — add the "Same floor. Fewer fires." kicker above the grid.
- **`src/app/page.tsx`** — import and insert `<Manifesto />` between `<PainSection />` and `<Transformation />`.

## Constraints / non-goals

- No new dependencies; reuse framer-motion + existing Tailwind tokens (`ember`, `teal`, `stone`, `warm-white`, `midnight`, `carbon`, `wire`, font-display/font-mono).
- Verification: `npm run build` (type-check + static generation of `/in` and `/uk`, which exercises the new region field) — consistent with the project's no-test-runner setup.
- The Manifesto is universal; if region-specific manifesto copy is ever wanted, that's a follow-up, not this spec.

## Success criteria

- An India owner reads UPI/WhatsApp/KOT texture; a UK owner reads card-terminal/ticket/team-chat texture — neither sees the other's terms.
- The Pain section opens with a heading and closes into a Manifesto that directly answers "There is a better way."
- Existing animations and the Before/After grid are visually intact; the Manifesto reads as a distinct statement beat.
