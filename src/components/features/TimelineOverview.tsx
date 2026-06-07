'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { ecosystemNode, ecosystemLine } from '@/lib/animations'
import { normaliseMousePos, springs } from '@/lib/parallax'
import { TIMELINE_CONTENT } from '@/lib/features-content'

export function TimelineOverview() {
  const sectionRef = useRef<HTMLElement>(null)
  const rotateX = useSpring(0, springs.ecosystem)
  const rotateY = useSpring(0, springs.ecosystem)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    rotateX.set(pos.y * -2)
    rotateY.set(pos.x * 2)
  }, [rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0); rotateY.set(0)
  }, [rotateX, rotateY])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-carbon/15 py-20 md:py-28 px-4 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-14"
        >
          <span className="text-[10px] font-mono tracking-widest text-teal uppercase mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-warm-white text-balance leading-tight">
            {TIMELINE_CONTENT.headline}
          </h2>
          <p className="text-stone text-sm sm:text-base mt-4 max-w-md mx-auto">
            {TIMELINE_CONTENT.subtext}
          </p>
        </motion.div>

        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="flex flex-col items-center"
        >
          {TIMELINE_CONTENT.nodes.map((node, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <motion.button
                variants={ecosystemNode}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                whileFocus={{ scale: 1.04 }}
                onClick={() => scrollToSection(node.id)}
                className={`w-full rounded-xl border ${node.accent} bg-carbon px-5 py-4 text-center cursor-pointer relative`}
                style={{ transformStyle: 'preserve-3d', translateZ: `${(i + 1) * 4}px` }}
              >
                <p className={`font-display font-semibold text-sm sm:text-base ${node.color}`}>
                  {node.label}
                </p>
                <p className="text-stone text-xs mt-0.5">{node.desc}</p>
                <motion.div
                  className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-current"
                  style={{ color: 'inherit' }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.15 }}
                />
              </motion.button>

              {i < TIMELINE_CONTENT.nodes.length - 1 && (
                <motion.div
                  variants={ecosystemLine}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="w-px h-7 bg-gradient-to-b from-teal/50 to-teal/0 origin-top flex-shrink-0 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute w-full h-1.5 bg-teal/60 rounded-full"
                    animate={{ y: [-6, 28] }}
                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2, ease: 'easeInOut' }}
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
