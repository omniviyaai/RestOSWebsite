'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useRegion } from '@/lib/region-context'
import { ctaEntry } from '@/lib/animations'
import { normaliseMousePos } from '@/lib/parallax'

const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: 2 + (i % 3),
  left: `${10 + i * 12}%`,
  top: `${20 + (i % 4) * 18}%`,
  duration: `${3 + i * 0.5}s`,
  delay: `${i * 0.4}s`,
}))

export function FinalCTA() {
  const region = useRegion()
  const sectionRef = useRef<HTMLElement>(null)
  const orbX = useSpring(0, { stiffness: 60, damping: 20 })
  const orbY = useSpring(0, { stiffness: 60, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    orbX.set(pos.x * 40)
    orbY.set(pos.y * 40)
  }, [orbX, orbY])

  const handleMouseLeave = useCallback(() => {
    orbX.set(0); orbY.set(0)
  }, [orbX, orbY])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-midnight py-24 md:py-36 px-4 relative overflow-hidden"
    >
      {/* Mouse-following orb */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-ember/6 blur-3xl pointer-events-none"
      />

      {/* CSS particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-ember/20 animate-float pointer-events-none"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}

      <div className="relative max-w-xl mx-auto text-center">
        <motion.h2
          variants={ctaEntry}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white mb-4 text-balance"
        >
          Ready to see RestOS in your restaurant?
        </motion.h2>

        <motion.p
          variants={ctaEntry}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-stone text-sm sm:text-base mb-10 leading-relaxed"
        >
          No commitment. No credit card. Just a conversation.
        </motion.p>

        <motion.div
          variants={ctaEntry}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button href={`/${region.key}/demo/`} variant="primary" className="w-full sm:w-auto text-base px-8 py-4 min-h-[52px] justify-center">
            Book a 20-Minute Demo
          </Button>
          <Button href={`https://wa.me/${region.whatsappNumber}?text=${encodeURIComponent('Hi, I want to know more about RestOS')}`} variant="ghost" external className="w-full sm:w-auto text-base px-8 py-4 min-h-[52px] justify-center">
            WhatsApp Us Now
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
