'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { LiteYoutube } from '@/components/ui/LiteYoutube'
import { YOUTUBE_VIDEO_ID } from '@/lib/constants'
import { normaliseMousePos, mapMouseToRotation, springs } from '@/lib/parallax'

const callouts = [
  { text: 'QR ordering live in 60 seconds', delay: 0 },
  { text: 'Kitchen display — no paper KOTs', delay: 0.1 },
  { text: 'Admin dashboard — from anywhere', delay: 0.2 },
]

export function DemoVideo() {
  const playerRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, springs.hero)
  const rotateY = useSpring(0, springs.hero)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return
    const rect = playerRef.current.getBoundingClientRect()
    const pos = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    rotateX.set(mapMouseToRotation(-pos.y, 3))
    rotateY.set(mapMouseToRotation(pos.x, 3))
  }, [rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0); rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <section className="bg-carbon/20 py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-warm-white text-balance">
            See It Running In A Real Restaurant
          </h2>
        </motion.div>

        {/* Video player — 3D tilt on mouse, floats on entry */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 28 }}
          style={{ perspective: '800px' }}
        >
          <motion.div
            ref={playerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="rounded-xl overflow-hidden shadow-2xl shadow-black/50"
          >
            <LiteYoutube videoId={YOUTUBE_VIDEO_ID} title="RestOS Product Demo" />
          </motion.div>
        </motion.div>

        {/* Callouts */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-8">
          {callouts.map(({ text, delay }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, delay }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0 animate-pulse" />
              <p className="text-stone text-xs sm:text-sm">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
