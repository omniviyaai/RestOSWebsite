'use client'

import { useRef, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { springs } from '@/lib/parallax'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number   // 0-1 pull strength
  radius?: number     // px activation radius
  as?: 'button' | 'a' | 'div'
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  radius = 80,
  as: Tag = 'div',
  href,
  onClick,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, springs.magnetic)
  const y = useSpring(0, springs.magnetic)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < radius) {
        x.set(dx * strength)
        y.set(dy * strength)
      }
    },
    [x, y, strength, radius]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const props: Record<string, unknown> = {
    href,
    onClick,
    target,
    rel,
    className,
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex"
    >
      <motion.div style={{ x, y }} className="inline-flex">
        {Tag === 'a' ? (
          <a {...props}>{children}</a>
        ) : Tag === 'button' ? (
          <button {...props}>{children}</button>
        ) : (
          <div {...props}>{children}</div>
        )}
      </motion.div>
    </div>
  )
}
