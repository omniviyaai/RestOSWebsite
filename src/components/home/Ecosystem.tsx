'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring, useScroll, useTransform } from 'framer-motion'
import { ecosystemNode, ecosystemLine } from '@/lib/animations'
import { normaliseMousePos, mapMouseToRotation, springs } from '@/lib/parallax'
import { useRegion } from '@/lib/region-context'

const BASE_NODES = [
  { id: 'customer', label: 'Customer Phone', desc: 'Scans QR, browses menu', accent: 'border-stone/40 bg-stone/5', labelColor: 'text-stone', zDepth: 0 },
  { id: 'menu', label: 'QR Menu', desc: 'Orders instantly, no app', accent: 'border-ember/40 bg-ember/5', labelColor: 'text-ember', zDepth: 2 },
  { id: 'order', label: 'Live Order', desc: 'Confirmed in real time', accent: 'border-warm-white/30 bg-warm-white/5', labelColor: 'text-warm-white', zDepth: 4 },
  { id: 'kitchen', label: 'Kitchen Display', desc: 'Kitchen sees it immediately', accent: 'border-teal/40 bg-teal/5', labelColor: 'text-teal', zDepth: 3 },
  { id: 'waiter', label: 'Waiter App', desc: 'Floor team stays informed', accent: 'border-teal/30 bg-teal/5', labelColor: 'text-teal', zDepth: 2 },
  { id: 'analytics', label: 'Analytics', desc: 'Revenue and trends, live', accent: 'border-ember/30 bg-ember/5', labelColor: 'text-ember', zDepth: 2 },
  { id: 'admin', label: 'You — Admin', desc: 'Full control, from anywhere', accent: 'border-warm-white/30 bg-warm-white/5', labelColor: 'text-warm-white', zDepth: 5 },
]

export function Ecosystem() {
  const region = useRegion()
  const nodes = [
    ...BASE_NODES.slice(0, 5),
    { id: 'payment', label: 'Payment', desc: region.paymentEcosystemDesc, accent: 'border-gold/40 bg-gold/5', labelColor: 'text-gold', zDepth: 3 },
    ...BASE_NODES.slice(5),
  ]
  const sectionRef = useRef<HTMLElement>(null)
  const rotateX = useSpring(0, springs.ecosystem)
  const rotateY = useSpring(0, springs.ecosystem)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const sectionRotate = useTransform(scrollYProgress, [0, 1], [-1, 1])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(
      e.clientX - rect.left,
      e.clientY - rect.top,
      rect.width,
      rect.height
    )
    rotateX.set(mapMouseToRotation(-pos.y, 2))
    rotateY.set(mapMouseToRotation(pos.x, 2))
  }, [rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0); rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-carbon/15 py-20 md:py-28 px-4 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div className="max-w-lg mx-auto">
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

        {/* Node chain — 3D rotation on scroll + mouse */}
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
              {/* Node */}
              <motion.div
                variants={ecosystemNode}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{
                  scale: 1.04,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className={`w-full rounded-xl border ${node.accent} bg-carbon px-5 py-4 text-center cursor-default relative`}
                style={{
                  translateZ: `${node.zDepth * 4}px`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Pulsing ring on the "Live Order" node */}
                {i === 2 && (
                  <div className="absolute -inset-1 rounded-xl border border-warm-white/10 animate-breathing opacity-50 pointer-events-none" />
                )}
                <p className={`font-display font-semibold text-sm sm:text-base ${node.labelColor}`}>
                  {node.label}
                </p>
                <p className="text-stone text-xs mt-0.5">{node.desc}</p>

                {/* Activation indicator */}
                <motion.div
                  className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-current"
                  style={{ color: 'inherit' }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.15 }}
                />
              </motion.div>

              {/* Animated connector */}
              {i < nodes.length - 1 && (
                <motion.div
                  variants={ecosystemLine}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="w-px h-7 bg-gradient-to-b from-teal/50 to-teal/0 origin-top flex-shrink-0 relative overflow-hidden"
                >
                  {/* Traveling data dot */}
                  <motion.div
                    className="absolute w-full h-1.5 bg-teal/60 rounded-full"
                    animate={{ y: [-6, 28] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
