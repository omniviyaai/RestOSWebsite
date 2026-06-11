'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface MotionLogoProps {
  onComplete?: () => void
  width?: number
}

// Seeded random for deterministic particles
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

interface Particle {
  id: number
  angle: number
  speed: number
  size: number
  delay: number
  swirlOffset: number
}

const PARTICLE_COUNT = 18

export function MotionLogo({ onComplete, width = 240 }: MotionLogoProps) {
  // Stable ref so the animation loop never restarts when onComplete changes
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete })

  // Particle definitions (memoized)
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      angle: seededRandom(i * 1) * Math.PI * 2,
      speed: 0.3 + seededRandom(i * 3) * 0.5,
      size: 4 + seededRandom(i * 4) * 5,
      delay: seededRandom(i * 5) * 10,
      swirlOffset: seededRandom(i * 6) * Math.PI * 2,
    }))
  }, [])

  // Motion values for continuous animations
  const pestleRotation = useMotionValue(35)
  const omniOpacity = useMotionValue(0)
  const viyaOpacity = useMotionValue(0)
  const viyaGlow = useMotionValue(0)
  const viyaScale = useMotionValue(1)
  const taglineOpacity = useMotionValue(0)
  const highlightX = useMotionValue(-100)

  // Derived: highlight percentage for CSS
  const highlightPct = useTransform(highlightX, (v) => `${v}%`)

  // Particle positions (computed per-frame via state)
  const [particleStates, setParticleStates] = useState<
    { x: number; y: number; size: number; opacity: number; borderRadius: number }[]
  >([])

  useEffect(() => {
    let cancelled = false
    const start = performance.now()
    const fps = 30

    // Scene timing in seconds
    const s1 = 0.5
    const s2 = 1.2
    const s3 = 2.0
    const s4 = 2.7
    const s5 = 3.5
    const s6 = 4.0
    const s7 = 4.5

    function interpolate(
      t: number,
      inputRange: number[],
      outputRange: number[],
      easing?: (t: number) => number
    ): number {
      if (t <= inputRange[0]) return outputRange[0]
      if (t >= inputRange[inputRange.length - 1]) return outputRange[outputRange.length - 1]

      // Find segment
      let i = 0
      while (i < inputRange.length - 1 && t > inputRange[i + 1]) i++

      const segT = (t - inputRange[i]) / (inputRange[i + 1] - inputRange[i])
      const easedT = easing ? easing(segT) : segT
      return outputRange[i] + (outputRange[i + 1] - outputRange[i]) * easedT
    }

    function bezier(t: number): number {
      // Cubic bezier approximation for the curves we need
      // Using a simple power curve for most
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    }

    function tick() {
      if (cancelled) return
      const elapsed = (performance.now() - start) / 1000

      // --- Pestle rotation ---
      // Center: 0.5s → 0.7s
      const pestleCenter = interpolate(elapsed, [s1, s1 + 0.2], [0, 1], bezier)
      // Shake: 0.7s → 1.0s
      const shakeT = interpolate(elapsed, [s1 + 0.2, s1 + 0.6], [0, 1])
      const pestleShake =
        shakeT < 0.33
          ? interpolate(shakeT, [0, 0.33], [0, 5])
          : shakeT < 0.66
            ? interpolate(shakeT, [0.33, 0.66], [5, -3])
            : interpolate(shakeT, [0.66, 1], [-3, 0])
      // Return: 1.0s → 1.5s (damped settle)
      const returnT = interpolate(elapsed, [s1 + 0.6, s1 + 1.0], [0, 1])
      const returnFast = interpolate(returnT, [0, 0.3], [1, 0.15])
      const returnOvershoot = interpolate(returnT, [0.3, 0.6, 1], [0, -0.08, 0])
      const returnSettle = interpolate(returnT, [0.6, 1], [0.15, 0])
      const pestleReturn = returnFast + returnOvershoot + returnSettle

      const baseTilt = interpolate(pestleCenter * pestleReturn, [0, 1], [35, 0])
      const finalRotation = baseTilt + pestleShake * pestleCenter * pestleReturn
      pestleRotation.set(finalRotation)

      // --- Text reveals ---
      // "OMNI" fade: 2.7s → 3.2s
      omniOpacity.set(interpolate(elapsed, [s4, s4 + 0.5], [0, 1]))
      // "VIYA" fade: slightly after OMNI
      viyaOpacity.set(interpolate(elapsed, [s4 + 0.17, s4 + 0.67], [0, 1]))
      // VIYA glow: 3.5s → 4.2s (held slightly longer for a wider word)
      viyaGlow.set(interpolate(elapsed, [s5, s5 + 0.5, s5 + 0.7], [0, 1, 0.4]))
      // VIYA scale: 3.5s → 4.2s
      viyaScale.set(interpolate(elapsed, [s5, s5 + 0.4, s5 + 0.7], [1, 1.08, 1]))
      // Tagline: 4.0s → 4.5s
      taglineOpacity.set(interpolate(elapsed, [s6, s6 + 0.4], [0, 1]))
      // Highlight sweep: 4.17s → 4.5s
      highlightX.set(interpolate(elapsed, [s6 + 0.17, s7], [-100, 110]))

      // --- Particles ---
      if (elapsed >= s2) {
        const newStates = particles.map((p) => {
          const particleTime = elapsed - p.delay / fps
          if (particleTime < s2) return { x: 90, y: 105, size: 0, opacity: 0, borderRadius: 50 }

          // Emerge from mortar
          const emergeT = interpolate(particleTime, [s2, s2 + 0.5], [0, 1])
          const swirl = elapsed * 0.03 * p.speed + p.swirlOffset
          const riseY = emergeT * -55
          const swirlRadius = interpolate(emergeT, [0, 0.4, 1], [8, 18, 30])

          let x = 90 + Math.cos(p.angle + swirl) * swirlRadius
          let y = 105 + riseY + Math.sin(p.angle + swirl) * swirlRadius * 0.5

          // Flow toward VIYA (scene 5)
          if (elapsed >= s4) {
            const flowEased = interpolate(elapsed, [s4, s5], [0, 1])
            const finalX = 420 + seededRandom(p.id * 7) * 25
            const finalY = -8 + seededRandom(p.id * 8) * 15 - 7
            x = x + (finalX - x) * flowEased
            y = y + (finalY - y) * flowEased
          }

          // Digital transform (scene 4)
          const digitalT = interpolate(elapsed, [s3, s4], [0, 1])
          const size = interpolate(digitalT, [0, 1], [p.size, p.size * 0.5])
          const borderRadius = interpolate(digitalT, [0, 1], [50, 1])

          // Fade out after scene 5
          const fadeOut = interpolate(elapsed, [s5 - 0.17, s5 + 0.33], [1, 0])
          const opacity = emergeT * fadeOut

          return { x, y, size, opacity, borderRadius }
        })
        setParticleStates(newStates)
      }

      // Continue until animation complete
      if (elapsed < s7 + 0.1) {
        requestAnimationFrame(tick)
      } else {
        onCompleteRef.current?.()
      }
    }

    requestAnimationFrame(tick)
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pestleRotation, omniOpacity, viyaOpacity, viyaGlow, viyaScale, taglineOpacity, highlightX, particles])

  // Scale factor for responsive sizing
  const scale = width / 500 // 500 is the full composition width

  return (
    <div
      style={{
        position: 'relative',
        width: 500 * scale,
        height: 180 * scale,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 28 * scale,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Mortar & Pestle */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          {/* MORTAR */}
          <path d="M30 60 Q30 140 90 145 Q150 140 150 60 Z" fill="#151B2E" stroke="#E8742A" strokeWidth="1.5" />
          <path d="M45 66 Q45 128 90 132 Q135 128 135 66 Z" fill="#0B1020" />
          <line x1="30" y1="60" x2="150" y2="60" stroke="#E8742A" strokeWidth="1.5" />
          <rect x="65" y="144" width="50" height="8" rx="4" fill="#E8742A" />

          {/* PESTLE — animated rotation */}
          <motion.g
            style={{
              transformOrigin: '90px 60px',
              rotate: pestleRotation,
            }}
          >
            {/* Bottom bulb */}
            <ellipse cx="90" cy="118" rx="15" ry="13.5" fill="#F3EFE7" />
            {/* Shaft */}
            <path d="M75 118 L79.5 32 L100.5 32 L105 118 Z" fill="#F3EFE7" />
            {/* Top bulb */}
            <ellipse cx="90" cy="32" rx="10.5" ry="9" fill="#F3EFE7" />
          </motion.g>
        </svg>

        {/* Wordmark */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {/* Main wordmark */}
          <div style={{ display: 'flex', alignItems: 'baseline', position: 'relative' }}>
            {/* "OMNI" */}
            <motion.span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 72,
                fontWeight: 700,
                color: '#F3EFE7',
                letterSpacing: -2,
                opacity: omniOpacity,
              }}
            >
              OMNI
            </motion.span>

            {/* "VIYA" */}
            <motion.span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 72,
                fontWeight: 700,
                color: '#E8742A',
                letterSpacing: -2,
                scale: viyaScale,
                transformOrigin: 'left bottom',
                position: 'relative',
                display: 'inline-block',
                opacity: viyaOpacity,
              }}
            >
              VIYA
              {/* Glow effect */}
              <motion.span
                style={{
                  position: 'absolute',
                  inset: -8,
                  background: 'radial-gradient(circle, rgba(232,116,42,0.4) 0%, transparent 70%)',
                  opacity: viyaGlow,
                  pointerEvents: 'none',
                  filter: 'blur(8px)',
                }}
              />
            </motion.span>

            {/* Highlight sweep */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, transparent calc(var(--hl-x) - 15%), rgba(232,116,42,0.15) var(--hl-x), transparent calc(var(--hl-x) + 15%))`,
                pointerEvents: 'none',
                '--hl-x': highlightPct,
              } as React.CSSProperties}
            />
          </div>

          {/* Tagline */}
          <motion.span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 14,
              color: '#9CA3AF',
              letterSpacing: 4,
              marginTop: 4,
              opacity: taglineOpacity,
            }}
          >
            RESTAURANT OPERATING SYSTEM
          </motion.span>
        </div>

        {/* Particles — SVG overlay */}
        <svg
          width="500"
          height="180"
          viewBox="0 0 500 180"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            overflow: 'visible',
          }}
        >
          {particleStates.map((p, i) => {
            if (p.opacity <= 0) return null
            return (
              <rect
                key={i}
                x={p.x - p.size / 2}
                y={p.y - p.size / 2}
                width={p.size}
                height={p.size}
                rx={p.borderRadius}
                fill="#E8742A"
                opacity={p.opacity}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}
