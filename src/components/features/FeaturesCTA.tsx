'use client'

import { motion } from 'framer-motion'
import { useRegion } from '@/lib/region-context'
import { RegionLinkButton } from '@/components/ui/RegionLinkButton'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { ctaEntry } from '@/lib/animations'
import { CTA_CONTENT } from '@/lib/features-content'

export function FeaturesCTA() {
  const region = useRegion()

  return (
    <section aria-label="Call to action" className="relative py-14 sm:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-carbon/80 to-midnight pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(232,116,42,0.06)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl mx-auto">
        <motion.h2
          variants={ctaEntry}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-3 text-balance leading-tight"
        >
          {CTA_CONTENT.headline}
        </motion.h2>
        <motion.p
          variants={ctaEntry}
          custom={0.5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-stone/70 text-sm sm:text-base mb-8"
        >
          Zero hardware. Zero hassle. See what Omniviya can do for your restaurant.
        </motion.p>
        <motion.div
          variants={ctaEntry}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <RegionLinkButton slug="demo" className="w-full sm:w-auto justify-center py-4 text-base">
            Book a Free Demo
          </RegionLinkButton>
          <WhatsAppButton className="w-full sm:w-auto justify-center py-4" />
        </motion.div>
      </div>
    </section>
  )
}
