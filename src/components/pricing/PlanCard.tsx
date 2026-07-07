'use client'
import { motion } from 'framer-motion'
import { useRegion } from '@/lib/region-context'
import { formatCurrency } from '@/lib/format'
import { Check, Cross } from './icons'
import { priceFor, resolveFeatureText, type Plan, type BillingCycle } from '@/lib/pricing-content'

export function PlanCard({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) {
  const region = useRegion()
  const price = plan.priced ? priceFor(region.key, plan.id as 'premium' | 'elite', cycle) : null
  const discounted = !!price && cycle !== 'monthly'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      className={`relative flex flex-col rounded-2xl p-6 sm:p-7 border ${
        plan.featured ? 'border-ember bg-gradient-to-b from-[#1C1A12] to-carbon' : 'border-wire bg-carbon'
      }`}
    >
      {plan.featured && <span className="absolute top-0 left-0 right-0 h-0.5 bg-ember rounded-t-2xl" />}
      {plan.featured && (
        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-ember/15 text-ember border border-ember/30">
          Most popular
        </span>
      )}
      <p className="text-[10px] font-mono uppercase tracking-widest text-stone/70 mb-2">{plan.tier}</p>
      <h3 className="text-xl font-display font-bold text-warm-white mb-1">{plan.name}</h3>
      <p className="text-sm text-stone leading-relaxed mb-5 min-h-[40px]">{plan.tagline}</p>

      <div className="mb-1">
        {price ? (
          <>
            {discounted && (
              <span className="text-sm text-stone/60 line-through mr-1.5">{formatCurrency(region.key, price.base)}</span>
            )}
            <span className="text-4xl font-display font-bold text-warm-white tracking-tight">
              {formatCurrency(region.key, price.effectiveMonthly)}
            </span>
            <span className="text-sm text-stone/60 ml-1">/mo</span>
          </>
        ) : (
          <span className="text-4xl font-display font-bold text-teal">{formatCurrency(region.key, 0)}</span>
        )}
      </div>
      <p className="text-xs text-stone/60 mb-1 min-h-[18px]">
        {price ? (
          <>billed {cycle === 'monthly' ? 'monthly' : cycle === 'sixmo' ? 'every 6 months' : 'yearly'}{' '}
            {cycle === 'monthly' && <span className="text-ember">· launch price</span>}</>
        ) : ' '}
      </p>
      {price && price.savingsPerYear > 0 && (
        <p className="text-xs font-medium text-teal bg-teal/10 border border-teal/25 rounded-md px-2.5 py-1.5 mb-3 inline-flex items-center gap-1.5 w-fit">
          <Check className="w-3 h-3 text-teal" /> Save {formatCurrency(region.key, price.savingsPerYear)}/yr
        </p>
      )}

      <a
        href="https://restos.omniviya.in/admin/register"
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center py-3 rounded-lg text-sm font-display font-medium mb-6 transition ${plan.ctaClass}`}
      >
        {plan.ctaLabel}
      </a>

      <hr className="border-wire mb-5" />
      {plan.groups.map((g) => (
        <div key={g.label} className="mb-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-stone/60 mb-2 mt-3 first:mt-0">{g.label}</p>
          {g.features.map((feat) => (
            <div key={feat.text} className={`flex items-start gap-2 text-[13px] py-1 leading-snug ${feat.included ? 'text-stone' : 'text-stone/40'}`}>
              <span className="flex-shrink-0 mt-0.5">{feat.included ? <Check className="w-3.5 h-3.5 text-teal" /> : <Cross className="w-3.5 h-3.5 text-wire" />}</span>
              <span>
                <span className={feat.bold ? 'text-warm-white font-medium' : ''}>{resolveFeatureText(region, feat)}</span>
                {feat.beta && <span className="ml-1 text-[10px] px-1.5 py-px rounded-full bg-gold/15 text-gold border border-gold/25 align-middle">BETA</span>}
              </span>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  )
}
