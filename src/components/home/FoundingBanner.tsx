'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SpotCounter } from '@/components/ui/SpotCounter'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { useRegion } from '@/lib/region-context'

const perks = [
  'Omniviya completely free for 90 days',
  'Direct WhatsApp line to the founding team',
  'Your feedback shapes the product roadmap',
  'Founding Partner badge on your restaurant profile',
  'First access to every new feature',
]

export function FoundingBanner() {
  const region = useRegion()
  return (
    <section className="bg-midnight py-20 md:py-28 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative rounded-2xl border border-gold/30 bg-carbon p-7 sm:p-10 md:p-12 text-center overflow-hidden"
        >
          {/* Gold shimmer border */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
            <div
              className="absolute inset-0 opacity-25 animate-shimmer"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(198,163,91,0.4) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
              }}
            />
          </div>

          {/* Bottom inner glow */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />

          <motion.div variants={fadeUp}>
            <span className="inline-block px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-[10px] font-mono tracking-widest uppercase mb-5">
              Limited Offer
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white mb-3 text-balance"
          >
            We&apos;re Looking For{' '}
            <span className="text-gold">10 Founding Partners</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-stone text-sm sm:text-base mb-8 leading-relaxed max-w-md mx-auto">
            Not customers. Partners. The restaurants that shape how Omniviya works
            get 3 months free — and direct access to the founders.
          </motion.p>

          <motion.ul variants={staggerContainer} className="space-y-2 text-left max-w-xs mx-auto mb-8">
            {perks.map((perk, i) => (
              <motion.li key={i} variants={fadeUp} className="flex items-start gap-2.5">
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 + i * 0.07 }}
                  className="text-gold text-sm mt-0.5 flex-shrink-0 inline-block"
                >
                  ✓
                </motion.span>
                <span className="text-warm-white text-sm">{perk}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-5">
            <SpotCounter />
            <Button href={`/${region.key}/founding/`} variant="primary" className="w-full sm:w-auto px-8 py-4 text-base justify-center">
              Apply To Be A Founding Partner
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
