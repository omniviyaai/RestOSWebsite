# Homepage Pain Rewrite + Manifesto Beat — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sharpen the homepage Pain section into region-aware, on-the-ground owner moments (with a new opening heading), and add a universal Manifesto beat between Pain and the Before/After comparison.

**Architecture:** Pain statements move from `constants.ts` into `region-config.ts` as a per-region `painStatements` array (same localization pattern used across the site), and `PainSection` reads them via `useRegion()`. A new universal `Manifesto` component is inserted in the home page between `PainSection` and `Transformation`. `Transformation` gains a small kicker heading. No new dependencies; reuse framer-motion + existing Tailwind tokens.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, framer-motion, Tailwind. No unit-test runner configured — **verification is `npm run build` (type-check + static generation of `/in` and `/uk`) plus a `Grep` check that region texture lands on the right region.**

---

## File Structure

- **Modify** `src/lib/region-config.ts` — add `painStatements: readonly string[]` to `RegionConfig` interface + both regions (India and UK copy from the spec).
- **Modify** `src/lib/constants.ts` — remove `PAIN_STATEMENTS` (moves to region config; only consumer is `PainSection`).
- **Modify** `src/components/home/PainSection.tsx` — `useRegion()`, new eyebrow + heading, map `region.painStatements`.
- **Create** `src/components/home/Manifesto.tsx` — universal "Our Approach" statement beat.
- **Modify** `src/components/home/Transformation.tsx` — add "Same floor. Fewer fires." kicker.
- **Modify** `src/app/page.tsx` — insert `<Manifesto />` between `<PainSection />` and `<Transformation />`.

---

## Task 1: Region-aware pain statements (data)

**Files:**
- Modify: `src/lib/region-config.ts`

- [ ] **Step 1: Add the interface field.** In the `RegionConfig` interface, after the `// SEO` block's `seoKeywords` line (or anywhere in the interface), add:

```ts
  // Homepage pain section (moment → cost → emotional toll)
  painStatements: readonly string[]
```

- [ ] **Step 2: Populate India.** In the `in:` config object, add this property (place it near the other homepage copy, e.g. after `foundingMissionText`):

```ts
    painStatements: [
      "Friday rush. A paper KOT slips off the rail — and that table's order never reaches the kitchen.",
      "A customer paid on UPI. You're three screenshots deep and still can't match it to the right bill.",
      "At closing you spot it: two tables under-billed. Again. There goes tonight's profit, quietly.",
      "You're finally home — still refreshing the staff WhatsApp group, because it's the only window into your own restaurant.",
      "A regular walked out; the queue was too long. You found out a day too late to make it right.",
    ],
```

- [ ] **Step 3: Populate UK.** In the `uk:` config object, add:

```ts
    painStatements: [
      "Friday rush. A paper ticket goes missing — and that table's order never reaches the kitchen.",
      "A card payment lands, but which table? You're scrolling the terminal instead of running the floor.",
      "At closing you spot it: two tables under-charged. Again. There goes tonight's profit, quietly.",
      "You're finally home — still glued to the team's group chat, because it's the only window into your own restaurant.",
      "A regular walked out; the queue was too long. You found out a day too late to make it right.",
    ],
```

- [ ] **Step 4: Verify type-check.** Run: `npm run build` — expected: TypeScript passes (both regions now satisfy the interface). If it fails with "Property 'painStatements' is missing", a region object is missing the field — add it.

---

## Task 2: PainSection reads region statements + new heading

**Files:**
- Modify: `src/components/home/PainSection.tsx`

- [ ] **Step 1: Swap the import for region context.** Replace:

```ts
import { PAIN_STATEMENTS } from '@/lib/constants'
```

with:

```ts
import { useRegion } from '@/lib/region-context'
```

- [ ] **Step 2: Read statements from region inside the component.** At the top of `export function PainSection()`, immediately after `const containerRef = useRef<HTMLDivElement>(null)`, add:

```ts
  const region = useRegion()
  const painStatements = region.painStatements
```

- [ ] **Step 3: Replace the two `PAIN_STATEMENTS` references with `painStatements`.** There are two usages:
  - In the map: `{PAIN_STATEMENTS.map((statement, i) => {` → `{painStatements.map((statement, i) => {`
  - Inside that callback: `const count = PAIN_STATEMENTS.length` → `const count = painStatements.length`
  - And the border condition near the bottom of `PainStatement` uses `PAIN_STATEMENTS.length`. The `PainStatement` child component is rendered with `index` and currently checks `index < PAIN_STATEMENTS.length - 1`. Pass the count down instead: add a `count` prop.

  Concretely, update the `<PainStatement ... />` call to add `count={painStatements.length}`:

```tsx
            <PainStatement
              key={i}
              text={statement}
              scrollProgress={scrollYProgress}
              start={start}
              peak={peak}
              end={end}
              index={i}
              count={painStatements.length}
              rotation={rotations[i]}
            />
```

- [ ] **Step 4: Update `PainStatement` signature + border check.** In the `function PainStatement({ ... })` destructure, add `count`:

```tsx
function PainStatement({
  text,
  scrollProgress,
  start,
  peak,
  end,
  index,
  count,
  rotation,
}: {
  text: string
  scrollProgress: MotionValue<number>
  start: number
  peak: number
  end: number
  index: number
  count: number
  rotation: number
}) {
```

  And change the border condition:

```tsx
      {index < count - 1 && (
```

- [ ] **Step 5: Add the opening eyebrow + heading.** Inside the `<div className="relative max-w-2xl mx-auto px-4 text-center" ...>`, immediately before the `{painStatements.map(...)}` block, insert:

```tsx
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-ember/70 uppercase block mb-4">
            The Reality
          </span>
          <p className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white text-balance">
            You know how this goes.
          </p>
        </motion.div>
```

- [ ] **Step 6: Verify build.** Run: `npm run build` — expected: success; no remaining reference to `PAIN_STATEMENTS` in this file.

---

## Task 3: Remove PAIN_STATEMENTS from constants

**Files:**
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: Delete the now-unused export.** Remove this block from `src/lib/constants.ts`:

```ts
export const PAIN_STATEMENTS = [
  'A customer complained their order never reached the kitchen.',
  'Your waiter wrote it down wrong. Again.',
  'You found out at closing that 3 tables had billing errors.',
  'You were at home and had no idea what was happening inside.',
  'You lost a regular because the queue was too long.',
] as const
```

- [ ] **Step 2: Verify no other consumer.** Run: `Grep` for `PAIN_STATEMENTS` across `src/` — expected: **no matches** (PainSection now uses region config).

- [ ] **Step 3: Verify build.** Run: `npm run build` — expected: success.

- [ ] **Step 4: Commit.** Run:

```bash
git add src/lib/region-config.ts src/lib/constants.ts src/components/home/PainSection.tsx
git commit -m "feat(home): region-aware pain statements + 'You know how this goes.' heading"
```

---

## Task 4: Manifesto component

**Files:**
- Create: `src/components/home/Manifesto.tsx`

- [ ] **Step 1: Create the component.** Write `src/components/home/Manifesto.tsx`:

```tsx
'use client'

import { motion } from 'framer-motion'

const PRINCIPLES = [
  { term: 'Fewer steps.', body: 'Less to learn, less that can go wrong.' },
  { term: 'What actually matters.', body: 'We fix what costs you time and money, not what looks good in a demo.' },
  { term: 'Built on ground reality.', body: 'How restaurants really run, on devices you already own.' },
]

export function Manifesto() {
  return (
    <section className="bg-midnight py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-[10px] sm:text-xs font-mono tracking-widest text-teal/80 uppercase block mb-5"
        >
          Our Approach
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.08 }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white text-balance leading-tight mb-12 md:mb-16"
        >
          We don&apos;t sell features. We solve what breaks your day.
        </motion.h2>

        <div className="space-y-7 sm:space-y-8 max-w-xl mx-auto text-left">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.term}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <span className="mt-2 w-2 h-2 rounded-full bg-teal flex-shrink-0" aria-hidden="true" />
              <p className="text-base sm:text-lg leading-relaxed">
                <span className="font-display font-semibold text-warm-white">{p.term}</span>{' '}
                <span className="text-stone">{p.body}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify build.** Run: `npm run build` — expected: success (component compiles; not yet rendered).

---

## Task 5: Wire Manifesto into the home page + Before/After kicker

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/home/Transformation.tsx`

- [ ] **Step 1: Import the Manifesto.** In `src/app/page.tsx`, add the import alongside the other home imports:

```tsx
import { Manifesto } from '@/components/home/Manifesto'
```

- [ ] **Step 2: Insert it between Pain and Transformation.** Change:

```tsx
        <PainSection />
        <Transformation />
```

to:

```tsx
        <PainSection />
        <Manifesto />
        <Transformation />
```

- [ ] **Step 3: Add the Before/After kicker.** In `src/components/home/Transformation.tsx`, inside `<div className="max-w-4xl mx-auto">`, immediately before the `{/* Column headers */}` comment/grid, insert:

```tsx
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center text-xl sm:text-2xl md:text-3xl font-display font-bold text-warm-white text-balance mb-10"
        >
          Same floor. Fewer fires.
        </motion.p>
```

(The existing `motion` import in `Transformation.tsx` covers `motion.p` — no new import needed.)

- [ ] **Step 4: Verify build.** Run: `npm run build` — expected: success; home route `/` and re-exports `/in`, `/uk` all generate.

- [ ] **Step 5: Region texture check.** Run: `Grep -n` for `terminal|under-charged|team's group chat` in `src/lib/region-config.ts` — expected: matches only inside the `uk` block. Run: `Grep -n` for `UPI|KOT|under-billed|WhatsApp group` — expected: the pain-line matches only inside the `in` block.

- [ ] **Step 6: Commit.** Run:

```bash
git add src/components/home/Manifesto.tsx src/app/page.tsx src/components/home/Transformation.tsx
git commit -m "feat(home): add Manifesto beat + 'Same floor. Fewer fires.' before/after heading"
```

---

## Task 6: Visual verification (dev server)

**Files:** none

- [ ] **Step 1: Start dev server** (if not already running): `npm run dev` → http://localhost:3000
- [ ] **Step 2:** Open `http://localhost:3000/in` — confirm: Pain opens with "The Reality / You know how this goes.", quotes show UPI/KOT/WhatsApp, Manifesto appears after the quotes, Before/After shows "Same floor. Fewer fires."
- [ ] **Step 3:** Open `http://localhost:3000/uk` — confirm the same structure with card-terminal/ticket/team-chat texture (no UPI/KOT).
- [ ] **Step 4:** Note any visual spacing issues; if none, done.

---

## Self-Review

**Spec coverage:**
- Pain opening heading (`THE REALITY` / "You know how this goes.") → Task 2 Step 5. ✅
- Region-aware pain quotes (IN/UK) → Task 1 + Task 2. ✅
- Existing Pain closer unchanged → not touched (Tasks only add heading + swap data source). ✅
- Manifesto (universal, eyebrow + headline + 3 principles, light polish) → Task 4. ✅
- Manifesto placed between Pain and Before/After → Task 5 Step 2. ✅
- Before/After kicker "Same floor. Fewer fires." → Task 5 Step 3. ✅
- Architecture: painStatements in region-config, removed from constants, PainSection via useRegion → Tasks 1-3. ✅
- No new deps; build-based verification → all tasks. ✅

**Placeholder scan:** No TBD/TODO; every code step shows complete code. ✅

**Type consistency:** `painStatements: readonly string[]` defined in Task 1 matches `region.painStatements` usage in Task 2; new `count: number` prop added to both the `PainStatement` call (Task 2 Step 3) and its signature (Task 2 Step 4). `PRINCIPLES` shape (`term`/`body`) is local to `Manifesto.tsx` and self-consistent. ✅

**Edge guard:** `rotations` is length 5 and both regions define exactly 5 statements, so `rotations[i]` is always defined. If a region's `painStatements` length ever changes, `rotations` must be extended in lockstep (noted here, not a code change now).
