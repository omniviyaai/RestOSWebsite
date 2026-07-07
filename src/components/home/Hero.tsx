'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import { TiltedDevice } from '@/components/ui/TiltedDevice'
import { useRegion } from '@/lib/region-context'
import { normaliseMousePos, mapMouseToRotation, mapMouseToOffset, springs } from '@/lib/parallax'
import { heroLetter, heroEntry } from '@/lib/animations'

/* ─── Floating restaurant notification pills ──────────────────── */
type Pill = {
  id: number
  icon: string
  label: string
  value: string
  color: 'ember' | 'teal' | 'gold' | 'green'
  position: { top?: string; bottom?: string; left?: string; right?: string }
  animClass: string
  delay: string
}

const PILLS_IN: Pill[] = [
  {
    id: 1,
    icon: '🔔',
    label: 'Table 4 · Order placed',
    value: '₹850',
    color: 'ember',
    position: { top: '22%', right: '-2%' },
    animClass: 'animate-order-in',
    delay: '1.8s',
  },
  {
    id: 2,
    icon: '🍳',
    label: 'KOT #47 · Kitchen',
    value: 'Sent',
    color: 'teal',
    position: { top: '10%', left: '8%' },
    animClass: 'animate-ticket-drop',
    delay: '2.4s',
  },
  {
    id: 3,
    icon: '💳',
    label: 'Payment confirmed',
    value: '₹1,240',
    color: 'green',
    position: { bottom: '28%', right: '0%' },
    animClass: 'animate-order-in',
    delay: '3.0s',
  },
  {
    id: 4,
    icon: '📊',
    label: 'Revenue today',
    value: '₹18,470',
    color: 'gold',
    position: { bottom: '18%', left: '4%' },
    animClass: 'animate-fade-up',
    delay: '3.6s',
  },
  {
    id: 5,
    icon: '✅',
    label: 'Table 7 cleared',
    value: '2 min ago',
    color: 'teal',
    position: { top: '55%', right: '-4%' },
    animClass: 'animate-order-in',
    delay: '4.2s',
  },
]

const PILL_COLOR_MAP = {
  ember: 'glass-ember border-ember/30 text-ember',
  teal:  'glass-teal border-teal/30 text-teal',
  gold:  'glass-gold border-gold/30 text-gold',
  green: 'backdrop-blur-xl bg-green-500/10 border border-green-500/30 text-green-400',
}

/* ─── Headline words ──────────────────────────────────────────── */
const LINE1 = [{ text: 'Your', color: 'text-warm-white' }, { text: 'Restaurant', color: 'text-warm-white' }]
const LINE2 = [{ text: 'Is', color: 'text-ember' }, { text: 'Running', color: 'text-ember' }, { text: 'You.', color: 'text-ember' }]

/* ─── Live order counter (cycles through realistic numbers) ───── */
const ORDER_COUNTS = [43, 47, 52, 58, 61, 67, 71]

export function Hero() {
  const region    = useRegion()
  const containerRef = useRef<HTMLElement>(null)
  const [orderCount, setOrderCount] = useState(ORDER_COUNTS[0])
  const [pillsVisible, setPillsVisible] = useState(false)

  /* Stagger pills reveal after hero entrance */
  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 1600)
    return () => clearTimeout(t)
  }, [])

  /* Cycle order count — gives "live" feel */
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % ORDER_COUNTS.length
      setOrderCount(ORDER_COUNTS[i])
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  /* ── Mouse tracking springs ── */
  const contentRotateX = useSpring(0, springs.hero)
  const contentRotateY = useSpring(0, springs.hero)
  const deviceRotateX  = useSpring(0, { stiffness: 60, damping: 12 })
  const deviceRotateY  = useSpring(0, { stiffness: 60, damping: 12 })
  const orbX  = useSpring(0, { stiffness: 40, damping: 20 })
  const orbY  = useSpring(0, { stiffness: 40, damping: 20 })
  const orb2X = useSpring(0, { stiffness: 30, damping: 18 })
  const orb2Y = useSpring(0, { stiffness: 30, damping: 18 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pos  = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    contentRotateX.set(mapMouseToRotation(-pos.y, 1.2))
    contentRotateY.set(mapMouseToRotation(pos.x, 1.2))
    deviceRotateX.set(mapMouseToRotation(-pos.y, 7))
    deviceRotateY.set(mapMouseToRotation(pos.x, 7))
    orbX.set(mapMouseToOffset(-pos.x, 30))
    orbY.set(mapMouseToOffset(-pos.y, 30))
    orb2X.set(mapMouseToOffset(pos.x, 20))
    orb2Y.set(mapMouseToOffset(pos.y, 20))
  }, [contentRotateX, contentRotateY, deviceRotateX, deviceRotateY, orbX, orbY, orb2X, orb2Y])

  const handleMouseLeave = useCallback(() => {
    contentRotateX.set(0); contentRotateY.set(0)
    deviceRotateX.set(0);  deviceRotateY.set(0)
    orbX.set(0); orbY.set(0); orb2X.set(0); orb2Y.set(0)
  }, [contentRotateX, contentRotateY, deviceRotateX, deviceRotateY, orbX, orbY, orb2X, orb2Y])

  /* Letter index tracking for stagger */
  let letterIdx = 0
  const l1idx = LINE1.map(w => w.text.split('').map(() => letterIdx++))
  const l2idx = LINE2.map(w => w.text.split('').map(() => letterIdx++))

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden mesh-bg"
      style={{ perspective: '1200px' }}
      aria-label="Hero"
    >
      {/* ── Volumetric ambient glows ─────────────────────────── */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
      >
        <div className="w-full h-full rounded-full bg-ember/10 blur-[100px] animate-breathing" />
      </motion.div>

      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
      >
        <div className="w-full h-full rounded-full bg-teal/8 blur-[120px] animate-breathing" style={{ animationDelay: '1.5s' }} />
      </motion.div>

      {/* Gold accent top-right */}
      <div className="absolute top-0 right-[20%] w-64 h-64 rounded-full bg-gold/5 blur-[80px] pointer-events-none" />

      {/* ── Dot grid overlay ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: 0.08 }} transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          backgroundImage: 'radial-gradient(circle, #9CA3AF 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Scan line (premium feel) ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none scan-line" aria-hidden />

      {/* ── Main content grid ─────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 xl:gap-16 items-center min-h-[calc(100dvh-6rem)]">

          {/* ── LEFT: Text content ──────────────────────────── */}
          <motion.div
            style={{ rotateX: contentRotateX, rotateY: contentRotateY, transformStyle: 'preserve-3d' }}
            className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            {/* Live badge */}
            <motion.div variants={heroEntry} custom={0.4} initial="hidden" animate="visible" className="inline-flex items-center gap-2.5 mb-7">
              <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border-teal/25 text-teal text-xs font-mono tracking-wider">
                <span className="status-dot-live" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={orderCount}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {orderCount} orders live right now
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="px-3 py-1.5 rounded-full glass border-ember/20 text-ember/80 text-xs font-mono tracking-wider">
                {region.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-4" style={{ perspective: '800px' }}>
              <h1 className="font-display font-bold leading-[1.04] text-balance">
                {/* Line 1: Your Restaurant */}
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem]">
                  {LINE1.map((word, wi) => (
                    <span key={wi} className="inline-block whitespace-nowrap">
                      {word.text.split('').map((char, ci) => (
                        <motion.span
                          key={`l1-${wi}-${ci}`}
                          variants={heroLetter}
                          custom={l1idx[wi][ci]}
                          initial="hidden"
                          animate="visible"
                          className={`inline-block ${word.color}`}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {char}
                        </motion.span>
                      ))}
                      {wi < LINE1.length - 1 && <span className="inline-block">&nbsp;</span>}
                    </span>
                  ))}
                </span>

                {/* Line 2: Is Running You. — ember, slightly larger */}
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem]">
                  {LINE2.map((word, wi) => (
                    <span key={wi} className="inline-block whitespace-nowrap">
                      {word.text.split('').map((char, ci) => (
                        <motion.span
                          key={`l2-${wi}-${ci}`}
                          variants={heroLetter}
                          custom={l2idx[wi][ci]}
                          initial="hidden"
                          animate="visible"
                          className={`inline-block ${word.color}`}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {char}
                        </motion.span>
                      ))}
                      {wi < LINE2.length - 1 && <span className="inline-block">&nbsp;</span>}
                    </span>
                  ))}
                </span>

                {/* Line 3: Not anymore. — teal, appears last */}
                <motion.span
                  className="block text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-teal mt-1"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 1.2 }}
                >
                  Not anymore.
                </motion.span>
              </h1>
            </div>

            {/* Description */}
            <motion.p
              variants={heroEntry} custom={1.0} initial="hidden" animate="visible"
              className="text-stone text-base md:text-lg leading-relaxed max-w-lg mb-8 mx-auto lg:mx-0 text-pretty"
            >
              Orders, kitchen updates, payments, and staff — all in one connected system.
              Stop managing chaos. Start running your restaurant.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroEntry} custom={1.1} initial="hidden" animate="visible"
              className="flex flex-col sm:flex-row gap-3 mb-6 items-center lg:items-start"
            >
              {/* Primary CTA — ember with shimmer */}
              <motion.a
                href={`/${region.key}/demo/`}
                whileHover={{ scale: 1.03, boxShadow: 'var(--glow-ember)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="btn-shimmer relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-ember text-white font-display font-semibold text-base min-h-[52px] cursor-pointer overflow-hidden"
              >
                See it live
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </motion.a>

              {/* Secondary CTA — ghost */}
              <motion.a
                href="https://restos.omniviya.in/admin/register"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-wire/60 text-warm-white/80 hover:text-warm-white font-display font-medium text-base min-h-[52px] transition-colors"
              >
                Register free
              </motion.a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={heroEntry} custom={1.15} initial="hidden" animate="visible"
              className="flex flex-wrap items-center gap-x-5 gap-y-1.5 justify-center lg:justify-start"
            >
              {['No setup fee', '14-day free trial', 'Cancel anytime', '0% platform fee'].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 text-stone/70 text-xs font-mono">
                  <span className="text-teal text-[10px]">✓</span>
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Device + floating pills ──────────────── */}
          <motion.div
            variants={heroEntry} custom={0.6} initial="hidden" animate="visible"
            className="relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-[300px] sm:w-[360px] lg:w-[420px] xl:w-[460px] flex-shrink-0">
              {/* Floating notification pills */}
              {pillsVisible && PILLS_IN.map((pill) => (
                <div
                  key={pill.id}
                  className={`absolute z-20 ${pill.animClass} opacity-0`}
                  style={{
                    ...pill.position,
                    animationDelay: pill.delay,
                    animationFillMode: 'forwards',
                  }}
                >
                  <motion.div
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl ${PILL_COLOR_MAP[pill.color]} shadow-card text-xs font-display font-medium whitespace-nowrap`}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3 + pill.id * 0.4, repeat: Infinity, ease: 'easeInOut', delay: parseFloat(pill.delay) }}
                  >
                    <span className="text-sm">{pill.icon}</span>
                    <div className="flex flex-col leading-tight">
                      <span className="opacity-80 text-[10px]">{pill.label}</span>
                      <span className="font-semibold text-[11px]">{pill.value}</span>
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* Device glow halo */}
              <div className="absolute inset-0 rounded-[40px] bg-ember/10 blur-3xl scale-110 pointer-events-none" />

              {/* The device */}
              <TiltedDevice
                rotateX={deviceRotateX}
                rotateY={deviceRotateY}
                videoSrc={region.heroVideo}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Bottom gradient fade into next section ────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight to-transparent pointer-events-none" />
    </section>
  )
}
