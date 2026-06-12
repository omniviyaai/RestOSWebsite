'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRegion } from '@/lib/region-context'

export function FeaturesPricingCTA() {
  const region = useRegion()

  return (
    <section className="py-14 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="max-w-2xl mx-auto rounded-2xl border border-ember/30 bg-ember/5 px-8 py-10 text-center"
      >
        <p className="text-[10px] font-mono tracking-widest text-ember/70 uppercase mb-3">Plans &amp; Pricing</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-warm-white mb-2 text-balance">
          Everything above is included from day one.
        </h2>
        <p className="text-stone text-sm sm:text-base mb-7 max-w-md mx-auto">
          See which plan fits your restaurant — Free, Premium, or Elite. No contracts, no surprises.
        </p>
        <Link
          href={`/${region.key}/pricing/`}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-ember text-white font-display font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-150"
        >
          View Pricing
          <span aria-hidden="true">→</span>
        </Link>
      </motion.div>
    </section>
  )
}
