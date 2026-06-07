'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useRegion } from '@/lib/region-context'
import { normaliseMousePos, mapMouseToRotation, mapMouseToOffset, springs } from '@/lib/parallax'
import { heroLetter, heroEntry } from '@/lib/animations'
import { FOUNDING_SPOTS_TOTAL } from '@/lib/constants'
import { HERO_CONTENT } from '@/lib/features-content'

const HEADLINE_WORDS = [
  { text: 'Everything', color: 'text-warm-white' },
  { text: 'Your', color: 'text-warm-white' },
  { text: 'Restaurant', color: 'text-ember' },
]

const TAGLINE_WORDS = [
  { text: 'Less', color: 'text-teal' },
  { text: 'Waiting.', color: 'text-warm-white' },
  { text: 'Less', color: 'text-teal' },
  { text: 'Confusion.', color: 'text-warm-white' },
  { text: 'Less', color: 'text-teal' },
  { text: 'Hardware.', color: 'text-warm-white' },
  { text: 'More', color: 'text-teal' },
  { text: 'Revenue.', color: 'text-ember' },
]

export function FeaturesHero() {
  const region = useRegion()
  const containerRef = useRef<HTMLElement>(null)

  const contentRotateX = useSpring(0, springs.hero)
  const contentRotateY = useSpring(0, springs.hero)
  const orbX = useSpring(0, { stiffness: 40, damping: 20 })
  const orbY = useSpring(0, { stiffness: 40, damping: 20 })
  const orb2X = useSpring(0, { stiffness: 30, damping: 18 })
  const orb2Y = useSpring(0, { stiffness: 30, damping: 18 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    contentRotateX.set(mapMouseToRotation(-pos.y, 1.2))
    contentRotateY.set(mapMouseToRotation(pos.x, 1.2))
    orbX.set(mapMouseToOffset(-pos.x, 25))
    orbY.set(mapMouseToOffset(-pos.y, 25))
    orb2X.set(mapMouseToOffset(pos.x, 18))
    orb2Y.set(mapMouseToOffset(pos.y, 18))
  }, [contentRotateX, contentRotateY, orbX, orbY, orb2X, orb2Y])

  const handleMouseLeave = useCallback(() => {
    contentRotateX.set(0); contentRotateY.set(0)
    orbX.set(0); orbY.set(0); orb2X.set(0); orb2Y.set(0)
  }, [contentRotateX, contentRotateY, orbX, orbY, orb2X, orb2Y])

  let letterIdx = 0
  const headlineLetters = HEADLINE_WORDS.map((word) => word.text.split('').map(() => letterIdx++))
  const taglineLetters = TAGLINE_WORDS.map((word) => word.text.split('').map(() => letterIdx++))

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden bg-midnight"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient orbs */}
      <motion.div style={{ x: orbX, y: orbY }} className="absolute top-[15%] left-[10%] w-80 h-80 rounded-full pointer-events-none">
        <div className="w-full h-full rounded-full bg-ember/8 blur-3xl animate-breathing" />
      </motion.div>
      <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute bottom-[20%] right-[8%] w-96 h-96 rounded-full pointer-events-none">
        <div className="w-full h-full rounded-full bg-teal/8 blur-3xl animate-breathing" style={{ animationDelay: '1.5s' }} />
      </motion.div>

      {/* Dot grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: 'radial-gradient(circle, #9CA3AF 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Scroll hint - pulsing dot at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-1 h-8 rounded-full bg-gradient-to-b from-teal/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ rotateX: contentRotateX, rotateY: contentRotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 text-center max-w-3xl mx-auto px-4"
      >
        {/* Badge */}
        <motion.div
          variants={heroEntry} custom={0.4} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="px-3 py-1.5 rounded-full border border-teal/30 bg-teal/10 text-teal text-xs font-mono tracking-wider">
            {region.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <div style={{ perspective: '800px' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] text-balance">
            {HEADLINE_WORDS.map((word, wi) => (
              <span key={wi}>
                {word.text.split('').map((char, ci) => (
                  <motion.span
                    key={`${wi}-${ci}`}
                    variants={heroLetter}
                    custom={headlineLetters[wi][ci]}
                    initial="hidden"
                    animate="visible"
                    className={`inline-block ${word.color}`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wi < HEADLINE_WORDS.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          variants={heroEntry} custom={0.9} initial="hidden" animate="visible"
          className="text-lg sm:text-xl md:text-2xl font-display font-medium text-stone mt-4 mb-8"
        >
          {TAGLINE_WORDS.map((word, wi) => (
            <span key={wi} className={word.color}>{word.text} </span>
          ))}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroEntry} custom={1.1} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button href={`/${region.key}/demo/`} variant="primary" className="text-base px-8 py-4 min-h-[52px] justify-center">
            Book a Free Demo
          </Button>
          <Button
            href={`https://wa.me/${region.whatsappNumber}?text=${encodeURIComponent('Hi, I want to know more about RestOS')}`}
            variant="ghost" external className="text-base px-8 py-4 min-h-[52px] justify-center"
          >
            WhatsApp Us
          </Button>
        </motion.div>

        {/* Founding note */}
        <motion.p
          variants={heroEntry} custom={1.15} initial="hidden" animate="visible"
          className="text-stone/60 text-xs font-mono tracking-wide mt-6"
        >
          {FOUNDING_SPOTS_TOTAL} Founding Partner spots &middot; First 3 months completely free
        </motion.p>
      </motion.div>
    </section>
  )
}
