'use client'

import { motion } from 'framer-motion'
import { deviceFloat, staggerContainer, fadeUp } from '@/lib/animations'
import { BYOD_CONTENT } from '@/lib/features-content'

export function BYODFeature() {
  const devices = [
    { emoji: '📱', label: 'Phone', delay: 0, x: -80, y: -40 },
    { emoji: '📟', label: 'Tablet', delay: 0.3, x: 80, y: 20 },
    { emoji: '🖥️', label: 'TV/Monitor', delay: 0.6, x: 0, y: 60 },
  ]

  return (
    <section className="bg-midnight py-28 md:py-36 px-4 overflow-hidden relative">
      <div className="max-w-3xl mx-auto text-center relative" style={{ perspective: '800px' }}>
        {/* Floating devices in a subtle orbit */}
        <div className="relative h-32 mb-8">
          {devices.map((device, i) => (
            <motion.div
              key={i}
              variants={deviceFloat}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(calc(-50% + ${device.x}px), calc(-50% + ${device.y}px))`,
              }}
              animate={{
                y: [device.y, device.y - 10, device.y],
                x: [device.x, device.x + 5, device.x],
              }}
              transition={{ repeat: Infinity, duration: 4, delay: device.delay, ease: 'easeInOut' }}
            >
              <span className="text-3xl block">{device.emoji}</span>
              <span className="text-[10px] font-mono text-stone/50 mt-1 block">{device.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className="text-[10px] font-mono tracking-widest text-gold uppercase mb-3 block text-center">
            Bring Your Own Device
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white text-balance leading-tight mb-6">
            {BYOD_CONTENT.headline}
          </h2>
          <p className="text-stone text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
            {BYOD_CONTENT.subtext}
          </p>
          <motion.ul variants={staggerContainer} className="space-y-2 max-w-sm mx-auto text-left">
            {BYOD_CONTENT.bullets.map((bullet, j) => (
              <motion.li key={j} variants={fadeUp} className="flex items-start gap-2 text-stone/80 text-sm">
                <span className="text-gold mt-0.5 flex-shrink-0">&#10003;</span>
                {bullet}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
