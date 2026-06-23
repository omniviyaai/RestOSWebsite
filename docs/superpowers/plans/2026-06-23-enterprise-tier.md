# Enterprise Tier Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an Enterprise pricing card to the pricing page that opens a modal containing an embedded Google Form for lead capture.

**Architecture:** A single self-contained `EnterpriseCard` component holds both the card UI and the modal with the Google Form iframe. Modal open/close state lives inside the component. `PricingClient` renders it as a 4th card by widening the grid from 3 to 4 columns.

**Tech Stack:** Next.js 14 (static export), React, TypeScript, Tailwind CSS, Framer Motion (already used by `PlanCard`)

---

## File Map

| Action | File | What changes |
|--------|------|-------------|
| **Create** | `src/components/pricing/EnterpriseCard.tsx` | New component: card UI + modal + iframe |
| **Modify** | `src/components/pricing/PricingClient.tsx` | Import `EnterpriseCard`, widen grid to 4-col, expand container to `max-w-6xl` |

---

### Task 1: Create EnterpriseCard component

**Files:**
- Create: `src/components/pricing/EnterpriseCard.tsx`

- [ ] **Step 1: Create the file with this exact content**

```tsx
'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from './icons'

// TODO: Replace with your Google Form embed URL once created.
// In Google Forms: Send → Embed (</>) → copy the src URL from the <iframe> tag.
// Example: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform'
const ENTERPRISE_FORM_URL = ''

const FEATURES = [
  'Unlimited Branches',
  'Centralized Admin Dashboard',
  'Dedicated Cloud Environment',
  'Custom POS & Third-Party Integrations',
  'Enterprise SLA & Dedicated Account Manager',
]

export function EnterpriseCard() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        className="relative flex flex-col rounded-2xl p-6 sm:p-7 border border-amber-700/50 bg-gradient-to-b from-[#0F0E0A] to-carbon"
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-amber-600/70 mb-2">Enterprise</p>
        <h3 className="text-xl font-display font-bold text-warm-white mb-1">Custom Pricing</h3>
        <p className="text-sm text-stone leading-relaxed mb-5 min-h-[40px]">For chains, groups &amp; franchises</p>

        <div className="mb-1">
          <span className="text-4xl font-display font-bold text-warm-white tracking-tight">Tailored</span>
        </div>
        <p className="text-xs text-stone/60 mb-6 min-h-[18px]">to your scale &amp; requirements</p>

        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="w-full text-center py-3 rounded-lg text-sm font-display font-medium mb-6 transition bg-amber-700/20 text-amber-400 border border-amber-700/40 hover:bg-amber-700/30 cursor-pointer"
        >
          Request a Quote
        </motion.button>

        <hr className="border-wire mb-5" />
        <div className="mb-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-stone/60 mb-2 mt-3 first:mt-0">
            What&apos;s included
          </p>
          {FEATURES.map((feat) => (
            <div key={feat} className="flex items-start gap-2 text-[13px] py-1 leading-snug text-stone">
              <span className="flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-teal" />
              </span>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: 40, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-carbon border border-wire/30 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="flex items-start justify-between p-5 border-b border-wire/20 flex-shrink-0">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-amber-600/70 mb-1">
                    Omniviya Enterprise
                  </p>
                  <h2 className="text-lg font-display font-bold text-warm-white">
                    For Restaurant Groups, Chains &amp; Franchises
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                  className="text-stone/50 hover:text-warm-white transition-colors ml-4 mt-0.5 text-2xl leading-none cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                {ENTERPRISE_FORM_URL ? (
                  <iframe
                    src={`${ENTERPRISE_FORM_URL}?embedded=true`}
                    className="w-full h-full min-h-[600px]"
                    frameBorder="0"
                    title="Enterprise Inquiry Form"
                  >
                    Loading…
                  </iframe>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8">
                    <p className="text-stone/60 text-sm mb-2">Form coming soon</p>
                    <p className="text-stone/40 text-xs">
                      In the meantime, reach us at{' '}
                      <a href="mailto:hello@omniviya.in" className="text-amber-500 hover:underline">
                        hello@omniviya.in
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see `Cannot find module './icons'` — check that `src/components/pricing/icons.tsx` (or `.ts`) exists. It is already used by `PlanCard.tsx` so it must exist.

- [ ] **Step 3: Commit**

```bash
git add src/components/pricing/EnterpriseCard.tsx
git commit -m "feat(pricing): add EnterpriseCard component with Google Form modal"
```

---

### Task 2: Wire EnterpriseCard into PricingClient

**Files:**
- Modify: `src/components/pricing/PricingClient.tsx`

- [ ] **Step 1: Replace the file with this content**

```tsx
'use client'
import { useState } from 'react'
import { PLANS, type BillingCycle } from '@/lib/pricing-content'
import { BillingToggle } from './BillingToggle'
import { PlanCard } from './PlanCard'
import { EnterpriseCard } from './EnterpriseCard'
import { HonestBar } from './HonestBar'
import { ComparisonTable } from './ComparisonTable'
import { PricingFAQ } from './PricingFAQ'
import { PricingCTA } from './PricingCTA'

export function PricingClient() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')
  return (
    <>
      <div className="pt-20 pb-10 px-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-widest text-ember block mb-4">Pricing</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-3">
          Honest pricing. <span className="text-ember">No surprises.</span>
        </h1>
        <p className="text-stone text-base">We never take a percentage of your orders. No hidden fees, no setup costs. Everything your restaurant needs — in one plan.</p>
      </div>

      <BillingToggle cycle={cycle} onChange={setCycle} />

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => <PlanCard key={plan.id} plan={plan} cycle={cycle} />)}
          <EnterpriseCard />
        </div>
      </div>

      <HonestBar />
      <ComparisonTable />
      <PricingFAQ />
      <PricingCTA />
    </>
  )
}
```

Key changes from original:
- `max-w-5xl` → `max-w-6xl` (container wider to fit 4 cards)
- `grid-cols-1 md:grid-cols-3` → `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Added `import { EnterpriseCard } from './EnterpriseCard'`
- Added `<EnterpriseCard />` after the mapped plan cards

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Run dev server and verify visually**

```bash
npm run dev
```

Open `http://localhost:3000/in/pricing` and verify:
- 4 cards render in a row on large screens, 2×2 on tablet, 1-column on mobile
- Enterprise card has darker styling and amber/gold border distinct from the others
- Clicking "Request a Quote" opens the modal overlay
- Modal shows the placeholder message (since `ENTERPRISE_FORM_URL` is empty)
- Clicking the × button closes the modal
- Clicking outside the modal (on the dark backdrop) closes it
- Pressing ESC closes the modal
- Check `/uk/pricing` as well — Enterprise card should appear identically

- [ ] **Step 4: Commit**

```bash
git add src/components/pricing/PricingClient.tsx
git commit -m "feat(pricing): wire EnterpriseCard into pricing grid as 4th tier"
```

---

## After You Create the Google Form

1. Go to [Google Forms](https://forms.google.com) and create the form with the fields listed in the spec
2. Click **Send → Embed (`</>`)** — copy the URL from the `src` attribute of the `<iframe>` tag
3. Open `src/components/pricing/EnterpriseCard.tsx` and replace the empty string:
   ```ts
   const ENTERPRISE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform'
   ```
4. Run `npx tsc --noEmit`, then commit:
   ```bash
   git add src/components/pricing/EnterpriseCard.tsx
   git commit -m "feat(pricing): wire live Google Form into Enterprise modal"
   ```
