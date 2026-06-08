'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useRegion } from '@/lib/region-context'
import { normaliseMousePos, mapMouseToRotation, mapMouseToOffset, springs } from '@/lib/parallax'
import { heroLetter, heroEntry } from '@/lib/animations'
import { HERO_CONTENT } from '@/lib/features-content'

const HEADLINE_WORDS = HERO_CONTENT.headline.split(' ')

const TAGLINE_WORDS = HERO_CONTENT.tagline.split(' ')

export function FeaturesHero() {
  const region = useRegion()
  const containerRef = useRef<HTMLElement>(null)

  const contentRotateX = useSpring(0, springs.hero)
  const contentRotateY = useSpring(0, springs.hero)
  const orbX = useSpring(0, { stiffness: 40, damping: 20 })
  const orbY = useSpring(0, { stiffness: 40, damping: 20 })
  const orb2X = useSpring(0, { stiffness: 30, damping: 18 })
  const orb2Y = useSpring(0, { stiffness: 30, damping: 18 })

  const reduceMotion = useReducedMotion()

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || !containerRef.current) return
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
  const headlineLetters = HEADLINE_WORDS.map((word) => word.split('').map(() => letterIdx++))
  const taglineLetters = TAGLINE_WORDS.map((word) => word.split('').map(() => letterIdx++))

  const headlineParts = HEADLINE_WORDS.reduce<{ text: string; color: string }[][]>((acc, word, i) => {
    if (word === 'In' || word === 'One' || word === 'System.') {
      if (acc.length === 0) acc.push([])
      acc[acc.length - 1].push({ text: word, color: 'text-warm-white' })
    } else {
      if (word === 'Restaurant') {
        acc.push([], [{ text: word, color: 'text-ember' }])
      } else {
        acc.push([{ text: word, color: 'text-warm-white' }])
      }
    }
    return acc
  }, [] as { text: string; color: string }[][])

  const taglineColors: Record<string, string> = {
    'Less': 'text-teal',
    'Waiting.': 'text-warm-white',
    'Confusion.': 'text-warm-white',
    'Hardware.': 'text-warm-white',
    'More': 'text-teal',
    'Revenue.': 'text-ember',
  }

  return (
    <section
      aria-label="Hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden bg-midnight perspective-feature"
    >
      <motion.div style={{ x: orbX, y: orbY }} className="absolute top-[15%] left-[10%] w-80 h-80 rounded-full pointer-events-none">
        <div className="w-full h-full rounded-full bg-ember/8 blur-3xl animate-breathing" />
      </motion.div>
      <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute bottom-[20%] right-[8%] w-96 h-96 rounded-full pointer-events-none">
        <div className="w-full h-full rounded-full bg-teal/8 blur-3xl animate-breathing" style={{ animationDelay: '1.5s' }} />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none text-stone/10 bg-dot-grid bg-dot-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-1 h-8 rounded-full bg-gradient-to-b from-teal/40 to-transparent" />
      </motion.div>

      <motion.div
        style={{ rotateX: contentRotateX, rotateY: contentRotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 text-center max-w-3xl mx-auto px-4"
      >
        <div style={{ perspective: '800px' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-display font-bold leading-[1.1] text-balance">
            {HEADLINE_WORDS.map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={`${wi}-${ci}`}
                    variants={heroLetter}
                    custom={headlineLetters[wi][ci]}
                    initial="hidden"
                    animate="visible"
                    className={`inline-block ${
                      word === 'Restaurant' ? 'text-ember' :
                      word === 'In' || word === 'One' || word === 'System.' ? 'text-warm-white' :
                      'text-warm-white'
                    }`}
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

        <motion.p
          variants={heroEntry} custom={0.9} initial="hidden" animate="visible"
          className="text-lg sm:text-xl md:text-2xl font-display font-medium text-stone mt-4 mb-6"
        >
          {TAGLINE_WORDS.map((word, wi) => (
            <span key={wi} className={taglineColors[word] || 'text-warm-white'}>{word} </span>
          ))}
        </motion.p>

        <motion.p
          variants={heroEntry} custom={0.95} initial="hidden" animate="visible"
          className="text-stone/70 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed"
        >
          {HERO_CONTENT.description}
        </motion.p>

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

        <motion.p
          variants={heroEntry} custom={1.15} initial="hidden" animate="visible"
          className="text-stone/40 text-[10px] font-mono tracking-wide mt-5"
        >
          Used by restaurants across India
        </motion.p>
      </motion.div>
    </section>
  )
}
