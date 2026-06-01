'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { TiltedDevice } from '@/components/ui/TiltedDevice'
import { useRegion } from '@/lib/region-context'
import { WHATSAPP_URL, DEMO_PAGE_URL, FOUNDING_SPOTS_TOTAL } from '@/lib/constants'
import { normaliseMousePos, mapMouseToRotation, mapMouseToOffset, springs } from '@/lib/parallax'
import { heroLetter, heroEntry } from '@/lib/animations'

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
  const region = useRegion()
  const containerRef = useRef<HTMLElement>(null)

  const contentRotateX = useSpring(0, springs.hero)
  const contentRotateY = useSpring(0, springs.hero)
  const deviceRotateX = useSpring(0, { stiffness: 60, damping: 12 })
  const deviceRotateY = useSpring(0, { stiffness: 60, damping: 12 })
  const orbX = useSpring(0, { stiffness: 40, damping: 20 })
  const orbY = useSpring(0, { stiffness: 40, damping: 20 })
  const orb2X = useSpring(0, { stiffness: 30, damping: 18 })
  const orb2Y = useSpring(0, { stiffness: 30, damping: 18 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(
      e.clientX - rect.left,
      e.clientY - rect.top,
      rect.width,
      rect.height
    )
    contentRotateX.set(mapMouseToRotation(-pos.y, 1.2))
    contentRotateY.set(mapMouseToRotation(pos.x, 1.2))
    deviceRotateX.set(mapMouseToRotation(-pos.y, 7))
    deviceRotateY.set(mapMouseToRotation(pos.x, 7))
    orbX.set(mapMouseToOffset(-pos.x, 25))
    orbY.set(mapMouseToOffset(-pos.y, 25))
    orb2X.set(mapMouseToOffset(pos.x, 18))
    orb2Y.set(mapMouseToOffset(pos.y, 18))
  }, [contentRotateX, contentRotateY, deviceRotateX, deviceRotateY, orbX, orbY, orb2X, orb2Y])

  const handleMouseLeave = useCallback(() => {
    contentRotateX.set(0); contentRotateY.set(0)
    deviceRotateX.set(0); deviceRotateY.set(0)
    orbX.set(0); orbY.set(0); orb2X.set(0); orb2Y.set(0)
  }, [contentRotateX, contentRotateY, deviceRotateX, deviceRotateY, orbX, orbY, orb2X, orb2Y])

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
      className="relative min-h-screen flex items-center overflow-hidden bg-midnight"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient orbs */}
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

      {/* Dot grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          backgroundImage: 'radial-gradient(circle, #9CA3AF 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content grid: left text, right device */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-16 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center min-h-[calc(100dvh-8rem)]">
          {/* Left: Text content */}
          <motion.div
            style={{
              rotateX: contentRotateX,
              rotateY: contentRotateY,
              transformStyle: 'preserve-3d',
            }}
            className="text-left"
          >
            {/* Badge */}
            <motion.div
              variants={heroEntry}
              custom={0.4}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="px-3 py-1.5 rounded-full border border-teal/30 bg-teal/10 text-teal text-xs font-mono tracking-wider animate-breathing">
                {region.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-3" style={{ perspective: '800px' }}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] text-balance">
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
              className="text-lg sm:text-xl md:text-2xl font-display font-medium text-stone mb-6"
            >
              {region.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={heroEntry}
              custom={1.0}
              initial="hidden"
              animate="visible"
              className="text-stone text-base md:text-lg max-w-xl leading-relaxed mb-8"
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
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              <Button href={DEMO_PAGE_URL} variant="primary" className="text-base px-8 py-4 min-h-[52px] justify-center">
                Book a Free Demo
              </Button>
              <Button href={WHATSAPP_URL} variant="ghost" external className="text-base px-8 py-4 min-h-[52px] justify-center">
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
              {FOUNDING_SPOTS_TOTAL} Founding Partner spots &middot; First 3 months completely free
            </motion.p>
          </motion.div>

          {/* Right: Tilted device with video */}
          <motion.div
            variants={heroEntry}
            custom={0.6}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center lg:justify-end"
          >
            <TiltedDevice
              rotateX={deviceRotateX}
              rotateY={deviceRotateY}
              videoSrc={region.heroVideo}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
