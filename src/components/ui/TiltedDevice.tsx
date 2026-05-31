'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, type MotionValue } from 'framer-motion'

interface TiltedDeviceProps {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
}

export function TiltedDevice({ rotateX, rotateY }: TiltedDeviceProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (videoRef.current && !reducedMotion) {
      videoRef.current.play().catch(() => {})
    }
  }, [reducedMotion])

  return (
    <div
      className="relative w-full"
      style={{ perspective: '1600px' }}
    >
      {/* Glow behind device */}
      <div
        className="absolute -inset-12 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(232,116,42,0.18) 0%, rgba(14,140,132,0.1) 40%, transparent 70%)',
        }}
      />

      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
        }}
      >
        {/* Device body — laptop-like with depth */}
        <div
          className="relative rounded-2xl border border-wire/50 bg-carbon shadow-2xl shadow-ember/10 overflow-hidden"
          style={{
            transform: 'translateZ(40px)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,116,42,0.08)',
          }}
        >
          {/* Top bezel bar with camera dot */}
          <div className="flex items-center justify-center h-8 bg-carbon border-b border-wire/30 relative">
            <div className="w-2 h-2 rounded-full bg-wire/40" />
            <div className="absolute left-4 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-ember/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-teal/40" />
            </div>
          </div>

          {/* Screen area — zoomed in so animations are clearly visible */}
          <div className="relative aspect-video bg-midnight overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: 'brightness(0.85) saturate(0.9)',
              }}
            >
              <source src="/video/restos-flow.mp4" type="video/mp4" />
              <source src="/video/restos-flow.webm" type="video/webm" />
            </video>

            {/* Screen glare overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(0,0,0,0.08) 80%)',
              }}
            />
          </div>

          {/* Bottom chin */}
          <div className="h-4 bg-carbon border-t border-wire/20" />
        </div>

        {/* 3D thickness strip on the bottom edge */}
        <div
          className="absolute -bottom-2 left-0 right-0 h-2 rounded-b-2xl pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #151B2E 0%, #0B1020 100%)',
            transform: 'translateZ(20px) rotateX(-2deg)',
            transformOrigin: 'top center',
          }}
        />

        {/* Base / shadow beneath device for grounded feel */}
        <div
          className="absolute -bottom-6 left-[5%] right-[5%] h-8 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 70%)',
            transform: 'translateZ(-30px)',
            filter: 'blur(6px)',
          }}
        />
      </motion.div>
    </div>
  )
}
