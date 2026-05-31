'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { WHATSAPP_URL, DEMO_PAGE_URL, FOUNDING_SPOTS_TOTAL } from '@/lib/constants'
import { fadeUp, staggerContainer } from '@/lib/animations'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-gradient-radial from-teal/8 via-midnight to-midnight" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-ember/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto pt-20 pb-16"
      >
        {/* Launch badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-8">
          <span className="px-3 py-1.5 rounded-full border border-teal/30 bg-teal/10 text-teal text-xs font-mono tracking-wider">
            NOW LAUNCHING IN INDIA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-warm-white leading-[1.08] text-balance mb-4"
        >
          Your Restaurant
          <br />
          <span className="text-ember">Is Running You.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl md:text-2xl font-display font-medium text-stone mb-8"
        >
          It&apos;s time to flip that.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-stone text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          RestOS is the complete operating system for Indian restaurants.
          One screen. Every order. Every table. Every rupee.
        </motion.p>

        {/* CTAs — stacked on mobile, side by side on sm+ */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Button href={DEMO_PAGE_URL} variant="primary" className="w-full sm:w-auto text-base px-8 py-4 min-h-[52px] justify-center">
            Book a Free Demo
          </Button>
          <Button href={WHATSAPP_URL} variant="ghost" external className="w-full sm:w-auto text-base px-8 py-4 min-h-[52px] justify-center">
            WhatsApp Us
          </Button>
        </motion.div>

        {/* Founding note */}
        <motion.p variants={fadeUp} className="mt-5 text-stone/70 text-xs font-mono tracking-wide">
          {FOUNDING_SPOTS_TOTAL} Founding Partner spots &middot; First 3 months completely free
        </motion.p>

        {/* Product preview window */}
        <motion.div
          variants={fadeUp}
          className="mt-16"
        >
          <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent mb-8" aria-hidden="true" />
          <div className="rounded-2xl border border-wire/50 bg-carbon/60 backdrop-blur-sm p-2 shadow-2xl shadow-black/50">
            {/* Fake browser chrome */}
            <div className="rounded-xl bg-carbon border border-wire/30 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-wire/30 bg-midnight/40">
                <div className="w-2.5 h-2.5 rounded-full bg-wire" />
                <div className="w-2.5 h-2.5 rounded-full bg-wire" />
                <div className="w-2.5 h-2.5 rounded-full bg-wire" />
                <div className="flex-1 mx-4 h-5 rounded bg-wire/30" />
              </div>
              <div className="h-48 sm:h-64 md:h-80 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-2 h-2 rounded-full bg-teal mx-auto mb-3"
                  />
                  <p className="text-stone text-sm font-mono">Admin Dashboard &middot; Live</p>
                  <p className="text-stone/40 text-xs mt-1 font-mono">Replace with actual screenshot</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
