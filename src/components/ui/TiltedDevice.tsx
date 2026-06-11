'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, type MotionValue } from 'framer-motion'

interface TiltedDeviceProps {
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  videoSrc?: string
}

export function TiltedDevice({ rotateX, rotateY, videoSrc = '/video/omniviya-flow.mp4' }: TiltedDeviceProps) {
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
        {/* Device body — mobile phone shape */}
        <div
          className="relative rounded-3xl border border-wire/50 bg-carbon shadow-2xl shadow-ember/10 overflow-hidden w-3/5 mx-auto"
          style={{
            transform: 'translateZ(40px)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,116,42,0.08)',
          }}
        >
          {/* Side padding for phone bezels */}
          <div className="px-2 pt-1 pb-2">
            {/* Dynamic Island */}
            <div className="flex items-center justify-center h-6 relative mb-1">
              <div className="w-24 h-[22px] rounded-full bg-black flex items-center justify-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-wire/30" />
                <div className="w-2 h-2 rounded-full bg-wire/20" />
              </div>
            </div>

            {/* Screen area */}
            <div className="relative aspect-[9/16] bg-midnight overflow-hidden rounded-sm">
              <video
                key={videoSrc}
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={videoSrc} type="video/mp4" />
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

            {/* Bottom bezel with home indicator */}
            <div className="h-5 flex items-center justify-center">
              <div className="w-28 h-[3px] rounded-full bg-wire/25" />
            </div>
          </div>
        </div>

        {/* 3D thickness strip on the bottom edge */}
        <div
          className="absolute -bottom-2 left-0 right-0 h-2 rounded-b-3xl pointer-events-none"
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
