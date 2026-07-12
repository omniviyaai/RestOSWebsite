'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { useRegion } from '@/lib/region-context'
import { ctaEntry } from '@/lib/animations'
import { normaliseMousePos } from '@/lib/parallax'
import { CheckMark } from '@/components/ui/Icons'

const particles = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: 2 + (i % 3),
  left: `${8 + i * 9}%`,
  top:  `${15 + (i % 5) * 16}%`,
  duration: `${3 + i * 0.4}s`,
  delay:    `${i * 0.35}s`,
}))

export function FinalCTA() {
  const region    = useRegion()
  const sectionRef = useRef<HTMLElement>(null)
  const orbX = useSpring(0, { stiffness: 60, damping: 20 })
  const orbY = useSpring(0, { stiffness: 60, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const pos  = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    orbX.set(pos.x * 50)
    orbY.set(pos.y * 50)
  }, [orbX, orbY])

  const handleMouseLeave = useCallback(() => {
    orbX.set(0)
    orbY.set(0)
  }, [orbX, orbY])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="mesh-bg py-28 md:py-40 px-4 relative overflow-hidden"
    >
      {/* Aurora shift layer */}
      <div className="absolute inset-0 aurora-bg opacity-60 pointer-events-none" />

      {/* Mouse-following ember orb */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-ember/8 blur-[80px] animate-breathing" />
      </motion.div>

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-ember/15 animate-float pointer-events-none"
          style={{
            width:           `${p.size}px`,
            height:          `${p.size}px`,
            left:            p.left,
            top:             p.top,
            animationDuration: p.duration,
            animationDelay:  p.delay,
          }}
        />
      ))}

      {/* Scan line for premium feel */}
      <div className="absolute inset-0 scan-line pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        {/* Urgency badge */}
        <motion.div
          variants={ctaEntry}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-ember/20 mb-6"
        >
          <span className="status-dot-live" />
          <span className="text-xs font-mono text-ember/80 tracking-wider">14-DAY FREE TRIAL · NO CARD NEEDED</span>
        </motion.div>

        <motion.h2
          variants={ctaEntry}
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-4 text-balance"
        >
          Ready to see Omniviya in your restaurant?
        </motion.h2>

        <motion.p
          variants={ctaEntry}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-stone text-sm sm:text-base mb-10 leading-relaxed"
        >
          No commitment. No credit card. Just a conversation.
        </motion.p>

        <motion.div
          variants={ctaEntry}
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          {/* Premium ember CTA with shimmer */}
          <motion.a
            href={`/${region.key}/demo/`}
            whileHover={{ scale: 1.04, boxShadow: 'var(--glow-ember)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="btn-shimmer relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-ember text-white font-display font-semibold text-base min-h-[52px] overflow-hidden cursor-pointer w-full sm:w-auto"
          >
            Book a 20-Minute Demo
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.a>

          <WhatsAppButton className="w-full sm:w-auto text-base px-8 py-4 min-h-[52px] justify-center">
            WhatsApp Us Now
          </WhatsAppButton>
        </motion.div>

        {/* Secondary trust strip */}
        <motion.div
          variants={ctaEntry}
          custom={0.4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 mt-8"
        >
          {['No setup fee', 'Cancel anytime', '0% platform fee', '14-day free trial'].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 text-stone/50 text-xs font-mono">
              <CheckMark className="text-teal flex-shrink-0" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
