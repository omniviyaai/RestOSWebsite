'use client'

import { motion } from 'framer-motion'
import { LiteYoutube } from '@/components/ui/LiteYoutube'
import { YOUTUBE_VIDEO_ID } from '@/lib/constants'

const callouts = [
  'QR ordering live in 60 seconds',
  'Kitchen display — no paper KOTs',
  'Admin dashboard — from anywhere',
]

export function DemoVideo() {
  return (
    <section className="bg-carbon/20 py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white text-balance">
            See It Running In A Real Restaurant
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 28 }}
        >
          <LiteYoutube videoId={YOUTUBE_VIDEO_ID} title="RestOS Product Demo" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-6"
        >
          {callouts.map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" aria-hidden="true" />
              <p className="text-stone text-xs sm:text-sm">{text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
