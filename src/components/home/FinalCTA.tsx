'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { WHATSAPP_URL, DEMO_PAGE_URL } from '@/lib/constants'
import { staggerContainer, fadeUp } from '@/lib/animations'

export function FinalCTA() {
  return (
    <section className="bg-midnight py-24 md:py-36 px-4">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-4 text-balance"
        >
          Ready to see RestOS in your restaurant?
        </motion.h2>

        <motion.p variants={fadeUp} className="text-stone text-sm sm:text-base mb-10 leading-relaxed">
          No commitment. No credit card. Just a conversation.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button href={DEMO_PAGE_URL} variant="primary" className="w-full sm:w-auto text-base px-8 py-4 min-h-[52px] justify-center">
            Book a 20-Minute Demo
          </Button>
          <Button href={WHATSAPP_URL} variant="ghost" external className="w-full sm:w-auto text-base px-8 py-4 min-h-[52px] justify-center">
            WhatsApp Us Now
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
