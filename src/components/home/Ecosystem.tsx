'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring, useScroll, useTransform } from 'framer-motion'
import { ecosystemNode, ecosystemLine } from '@/lib/animations'
import { normaliseMousePos, mapMouseToRotation, springs } from '@/lib/parallax'
import { useRegion } from '@/lib/region-context'

/* Connector metadata: label shown between nodes */
const CONNECTOR_LABELS = [
  'instant',
  'QR scan',
  '<200ms',
  'live',
  'realtime',
  'synced',
  'live',
  '~2s avg',
]

const BASE_NODES = [
  {
    id: 'customer',
    label: 'Customer Phone',
    desc: 'Scans QR, browses menu',
    accent: 'border-stone/30',
    bg: 'bg-carbon/60',
    labelColor: 'text-stone',
    dotColor: 'bg-green-400',
    zDepth: 0,
  },
  {
    id: 'menu',
    label: 'QR Menu',
    desc: 'Orders instantly, no app',
    accent: 'border-ember/35',
    bg: 'bg-ember/6',
    labelColor: 'text-ember',
    dotColor: 'bg-ember',
    zDepth: 2,
  },
  {
    id: 'order',
    label: 'Live Order',
    desc: 'Confirmed in real time',
    accent: 'border-warm-white/25',
    bg: 'bg-white/4',
    labelColor: 'text-warm-white',
    dotColor: 'bg-green-400',
    zDepth: 5,
  },
  {
    id: 'kitchen',
    label: 'Kitchen Display',
    desc: 'Kitchen sees it immediately',
    accent: 'border-teal/40',
    bg: 'bg-teal/8',
    labelColor: 'text-teal',
    dotColor: 'bg-teal',
    zDepth: 3,
  },
  {
    id: 'waiter',
    label: 'Waiter App',
    desc: 'Floor team stays informed',
    accent: 'border-teal/25',
    bg: 'bg-teal/5',
    labelColor: 'text-teal',
    dotColor: 'bg-teal',
    zDepth: 2,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    desc: 'Revenue and trends, live',
    accent: 'border-ember/30',
    bg: 'bg-ember/5',
    labelColor: 'text-ember',
    dotColor: 'bg-ember',
    zDepth: 2,
  },
  {
    id: 'admin',
    label: 'You — Admin',
    desc: 'Full control, from anywhere',
    accent: 'border-gold/30',
    bg: 'bg-gold/6',
    labelColor: 'text-gold',
    dotColor: 'bg-gold',
    zDepth: 5,
  },
]

export function Ecosystem() {
  const region = useRegion()
  const nodes = [
    ...BASE_NODES.slice(0, 2),
    {
      id: 'payment',
      label: 'Payment',
      desc: region.paymentEcosystemDesc,
      accent: 'border-gold/40',
      bg: 'bg-gold/6',
      labelColor: 'text-gold',
      dotColor: 'bg-gold',
      zDepth: 3,
    },
    ...BASE_NODES.slice(2),
  ]

  const sectionRef = useRef<HTMLElement>(null)
  const rotateX = useSpring(0, springs.ecosystem)
  const rotateY = useSpring(0, springs.ecosystem)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const sectionRotate = useTransform(scrollYProgress, [0, 1], [-1, 1])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const pos = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
      rotateX.set(mapMouseToRotation(-pos.y, 2))
      rotateY.set(mapMouseToRotation(pos.x, 2))
    },
    [rotateX, rotateY]
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-carbon/15 py-20 md:py-28 px-4 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Background teal glow from center */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[600px] opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(14,140,132,0.6) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-sm mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white text-balance leading-tight">
            Every Part of Your Restaurant.
            <br />
            <span className="text-teal">Finally Connected.</span>
          </h2>
        </motion.div>

        {/* Node chain */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            rotateZ: sectionRotate,
            transformStyle: 'preserve-3d',
          }}
          className="flex flex-col items-center"
        >
          {nodes.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center w-full">
              {/* Glass pill node */}
              <motion.div
                variants={ecosystemNode}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className={`w-full rounded-2xl border ${node.accent} ${node.bg} px-5 py-4 cursor-default relative overflow-hidden`}
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  translateZ: `${node.zDepth * 4}px`,
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                {/* Subtle inner highlight on top */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Pulsing ring for the central "Live Order" node */}
                {i === 3 && (
                  <div className="absolute -inset-1 rounded-2xl border border-warm-white/8 animate-breathing opacity-60 pointer-events-none" />
                )}

                <div className="flex items-center gap-3">
                  {/* Status dot */}
                  <span className="relative flex-shrink-0">
                    <span className={`block w-2 h-2 rounded-full ${node.dotColor}`} />
                    <span className={`absolute inset-0 rounded-full ${node.dotColor} opacity-40 animate-ping`}
                      style={{ animationDuration: `${2 + i * 0.3}s`, animationDelay: `${i * 0.2}s` }} />
                  </span>

                  <div>
                    <p className={`font-display font-semibold text-sm sm:text-base ${node.labelColor} leading-tight`}>
                      {node.label}
                    </p>
                    <p className="text-stone/70 text-xs mt-0.5">{node.desc}</p>
                  </div>
                </div>
              </motion.div>

              {/* Connector with multiple traveling dots + latency label */}
              {i < nodes.length - 1 && (
                <motion.div
                  variants={ecosystemLine}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="flex flex-col items-center gap-0 relative"
                >
                  {/* The vertical line with label */}
                  <div className="flex items-center gap-2">
                    <div className="w-px h-7 bg-gradient-to-b from-teal/40 to-teal/10 relative overflow-hidden">
                      {/* 2 traveling data dots per connector */}
                      {[0, 0.6].map((offset, di) => (
                        <motion.div
                          key={di}
                          className="absolute w-full h-1.5 rounded-full bg-teal/70"
                          animate={{ y: [-6, 28] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.0,
                            delay: i * 0.15 + offset,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                    {/* Latency label */}
                    <span className="text-teal/40 text-[9px] font-mono whitespace-nowrap">
                      {CONNECTOR_LABELS[i] ?? 'live'}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
