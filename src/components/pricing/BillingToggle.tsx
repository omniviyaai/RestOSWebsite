'use client'
import { motion, AnimatePresence } from 'framer-motion'
import type { BillingCycle } from '@/lib/pricing-content'
import { BILLING_CYCLES, CYCLE_DISCOUNT } from '@/lib/pricing-content'

export function BillingToggle({ cycle, onChange }: { cycle: BillingCycle; onChange: (c: BillingCycle) => void }) {
  return (
    <div className="flex flex-col items-center gap-4 mb-12">
      {/* Headline badge */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
        <span className="text-gold text-[10px]" aria-hidden="true">✦</span>
        <span className="text-gold text-xs font-medium tracking-wide">Save more with long-term plans</span>
      </div>
      <p className="text-stone/70 text-xs sm:text-sm leading-relaxed max-w-sm text-center">
        14-day free trial. No credit card. Start using, drop off any time.{' '}
        <span className="text-warm-white font-medium">No strings attached.</span>
      </p>

      {/* Pill toggle */}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <div
          role="radiogroup"
          aria-label="Billing cycle"
          className="relative flex glass border-wire/50 rounded-xl p-1 gap-0.5"
        >
          {BILLING_CYCLES.map((c) => (
            <button
              key={c.id}
              role="radio"
              aria-checked={cycle === c.id}
              onClick={() => onChange(c.id)}
              className="relative text-sm font-display font-medium px-5 py-2 rounded-lg min-h-[40px] transition-colors z-10"
              style={{ color: cycle === c.id ? '#fff' : undefined }}
            >
              {/* Animated background pill */}
              {cycle === c.id && (
                <motion.div
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-lg bg-ember"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className={`relative z-10 ${cycle === c.id ? 'text-white' : 'text-stone hover:text-warm-white transition-colors'}`}>
                {c.label}
              </span>
            </button>
          ))}
        </div>

        {/* Savings badge — animated in/out */}
        <AnimatePresence>
          {cycle !== 'monthly' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="text-xs font-medium px-3 py-1.5 rounded-full glass-teal text-teal"
            >
              Save up to {Math.round(Math.max(...Object.values(CYCLE_DISCOUNT)) * 100)}%
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
