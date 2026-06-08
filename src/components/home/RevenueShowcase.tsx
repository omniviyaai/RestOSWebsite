'use client'

import { motion } from 'framer-motion'
import { useRegion } from '@/lib/region-context'
import { formatCurrency } from '@/lib/format'

export function RevenueShowcase() {
  const region = useRegion()
  const s = region.exampleStats

  const stats = [
    { label: 'Revenue today', value: formatCurrency(region.key, s.revenue) },
    { label: 'Average order', value: formatCurrency(region.key, s.avgOrder) },
    { label: 'Orders today', value: String(s.ordersToday) },
    { label: `${region.taxTerm}-ready reports`, value: 'Auto' },
  ]

  return (
    <section className="bg-midnight py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-teal/80">Live Dashboard</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white mt-2 text-balance leading-tight">
            Every {region.paymentCurrencyTerm}, tracked in real time.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 24 }}
              className="rounded-2xl border border-wire bg-carbon p-5 sm:p-6"
            >
              <p className="text-2xl sm:text-3xl font-display font-bold text-warm-white tabular-nums">{stat.value}</p>
              <p className="text-stone text-xs sm:text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-stone/50 text-xs mt-6 font-mono">
          Sample figures shown in {region.currencyCode}. {region.taxTerm} calculated automatically on every order.
        </p>
      </div>
    </section>
  )
}
