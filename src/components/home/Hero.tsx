'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { FloatingElement } from '@/components/ui/FloatingElement'
import { WHATSAPP_URL, DEMO_PAGE_URL, FOUNDING_SPOTS_TOTAL } from '@/lib/constants'
import { normaliseMousePos, mapMouseToRotation, mapMouseToOffset, springs } from '@/lib/parallax'
import { heroLetter, heroEntry, heroDashboard } from '@/lib/animations'

const HEADLINE_WORDS = [
  { text: 'Your', color: 'text-warm-white' },
  { text: 'Restaurant', color: 'text-warm-white' },
]
const HEADLINE_LINE2 = [
  { text: 'Is', color: 'text-ember' },
  { text: 'Running', color: 'text-ember' },
  { text: 'You.', color: 'text-ember' },
]

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  // Mouse-tracked spring values for 3D tilt
  const contentRotateX = useSpring(0, springs.hero)
  const contentRotateY = useSpring(0, springs.hero)
  const orbX = useSpring(0, { stiffness: 40, damping: 20 })
  const orbY = useSpring(0, { stiffness: 40, damping: 20 })
  const orb2X = useSpring(0, { stiffness: 30, damping: 18 })
  const orb2Y = useSpring(0, { stiffness: 30, damping: 18 })
  const dashRotateX = useSpring(0, { stiffness: 60, damping: 12 })
  const dashRotateY = useSpring(0, { stiffness: 60, damping: 12 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(
      e.clientX - rect.left,
      e.clientY - rect.top,
      rect.width,
      rect.height
    )
    // Content tilts toward cursor
    contentRotateX.set(mapMouseToRotation(-pos.y, 1.5))
    contentRotateY.set(mapMouseToRotation(pos.x, 1.5))
    // Orbs move AWAY from cursor (inverse parallax)
    orbX.set(mapMouseToOffset(-pos.x, 30))
    orbY.set(mapMouseToOffset(-pos.y, 30))
    orb2X.set(mapMouseToOffset(pos.x, 20))
    orb2Y.set(mapMouseToOffset(pos.y, 20))
    // Dashboard tilts toward cursor (more dramatic)
    dashRotateX.set(mapMouseToRotation(-pos.y, 4))
    dashRotateY.set(mapMouseToRotation(pos.x, 4))
  }, [contentRotateX, contentRotateY, orbX, orbY, orb2X, orb2Y, dashRotateX, dashRotateY])

  const handleMouseLeave = useCallback(() => {
    contentRotateX.set(0); contentRotateY.set(0)
    orbX.set(0); orbY.set(0); orb2X.set(0); orb2Y.set(0)
    dashRotateX.set(0); dashRotateY.set(0)
  }, [contentRotateX, contentRotateY, orbX, orbY, orb2X, orb2Y, dashRotateX, dashRotateY])

  // Letter index counter for stagger — must be computed before JSX
  let letterIdx = 0
  const line1Letters = HEADLINE_WORDS.map((word) => {
    return word.text.split('').map(() => letterIdx++)
  })
  const line2Letters = HEADLINE_LINE2.map((word) => {
    return word.text.split('').map(() => letterIdx++)
  })

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight"
      style={{ perspective: '1200px' }}
    >
      {/* Layer 1: Ambient orbs — inverse parallax with mouse */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute top-[15%] left-[10%] w-80 h-80 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full h-full rounded-full bg-ember/8 blur-3xl animate-breathing" />
      </motion.div>

      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute bottom-[20%] right-[8%] w-96 h-96 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="w-full h-full rounded-full bg-teal/8 blur-3xl animate-breathing" style={{ animationDelay: '1.5s' }} />
      </motion.div>

      {/* Layer 2: Dot grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          backgroundImage: 'radial-gradient(circle, #9CA3AF 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Layer 3: Main content with perspective tilt */}
      <motion.div
        style={{
          rotateX: contentRotateX,
          rotateY: contentRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto pt-20 pb-16"
      >
        {/* Badge */}
        <motion.div
          variants={heroEntry}
          custom={0.4}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="px-3 py-1.5 rounded-full border border-teal/30 bg-teal/10 text-teal text-xs font-mono tracking-wider animate-breathing">
            NOW LAUNCHING IN INDIA
          </span>
        </motion.div>

        {/* Headline — letter-by-letter 3D entry */}
        <div className="mb-3" style={{ perspective: '800px' }}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold leading-[1.05] text-balance">
            {/* Line 1 */}
            <span className="block">
              {HEADLINE_WORDS.map((word, wi) => (
                <span key={wi}>
                  {word.text.split('').map((char, ci) => (
                    <motion.span
                      key={`${wi}-${ci}`}
                      variants={heroLetter}
                      custom={line1Letters[wi][ci]}
                      initial="hidden"
                      animate="visible"
                      className={`inline-block ${word.color}`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wi < HEADLINE_WORDS.length - 1 && (
                    <span key={`sp${wi}`}>&nbsp;</span>
                  )}
                </span>
              ))}
            </span>
            {/* Line 2 — ember orange */}
            <span className="block">
              {HEADLINE_LINE2.map((word, wi) => (
                <span key={wi}>
                  {word.text.split('').map((char, ci) => (
                    <motion.span
                      key={`l2-${wi}-${ci}`}
                      variants={heroLetter}
                      custom={line2Letters[wi][ci]}
                      initial="hidden"
                      animate="visible"
                      className={`inline-block ${word.color}`}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wi < HEADLINE_LINE2.length - 1 && (
                    <span key={`sp2${wi}`}>&nbsp;</span>
                  )}
                </span>
              ))}
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <motion.p
          variants={heroEntry}
          custom={0.9}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl md:text-2xl font-display font-medium text-stone mb-8"
        >
          It&apos;s time to flip that.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={heroEntry}
          custom={1.0}
          initial="hidden"
          animate="visible"
          className="text-stone text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          RestOS is the complete operating system for Indian restaurants.
          One screen. Every order. Every table. Every rupee.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroEntry}
          custom={1.1}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-5"
        >
          <Button href={DEMO_PAGE_URL} variant="primary" className="w-full sm:w-auto text-base px-8 py-4 min-h-[52px] justify-center">
            Book a Free Demo
          </Button>
          <Button href={WHATSAPP_URL} variant="ghost" external className="w-full sm:w-auto text-base px-8 py-4 min-h-[52px] justify-center">
            WhatsApp Us
          </Button>
        </motion.div>

        {/* Founding note */}
        <motion.p
          variants={heroEntry}
          custom={1.15}
          initial="hidden"
          animate="visible"
          className="text-stone/60 text-xs font-mono tracking-wide"
        >
          {FOUNDING_SPOTS_TOTAL}{' '}Founding Partner spots &middot; First 3 months completely free
        </motion.p>

        {/* Layer 4: Floating dashboard preview — 3D toward cursor */}
        <motion.div
          variants={heroDashboard}
          initial="hidden"
          animate="visible"
          style={{ rotateX: dashRotateX, rotateY: dashRotateY, transformStyle: 'preserve-3d' }}
          className="mt-16"
        >
          <FloatingElement amplitude={5} period={5000}>
            <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent mb-8" />
            <div className="rounded-2xl border border-wire/40 bg-carbon/60 backdrop-blur-md p-2 shadow-2xl shadow-ember/5">
              {/* Fake browser chrome */}
              <div className="rounded-xl bg-carbon border border-wire/30 overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-wire/30 bg-midnight/60">
                  <div className="w-2.5 h-2.5 rounded-full bg-wire/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-wire/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-wire/60" />
                  <div className="flex-1 mx-4 h-5 rounded bg-wire/20" />
                </div>
                <div className="h-48 sm:h-64 md:h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-2 h-2 rounded-full bg-teal mx-auto mb-3 animate-pulse-glow" />
                    <p className="text-stone text-sm font-mono">Admin Dashboard &middot; Live</p>
                    <p className="text-stone/30 text-xs mt-1 font-mono">Add your RestOS screenshot here</p>
                  </div>
                </div>
              </div>
            </div>
          </FloatingElement>
        </motion.div>
      </motion.div>
    </section>
  )
}
