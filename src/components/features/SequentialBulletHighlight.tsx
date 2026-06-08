'use client'

import { useEffect, useMemo, useState } from 'react'

export function SequentialBulletHighlight({
  bullets,
  intervalMs = 1000,
  activeClassName = 'text-warm-white',
  inactiveClassName = 'text-stone',
  bulletIconActive = '✓',
  bulletIconInactive = '•',
  className = 'space-y-1.5',
}: {
  bullets: readonly string[]
  intervalMs?: number
  activeClassName?: string
  inactiveClassName?: string
  bulletIconActive?: string
  bulletIconInactive?: string
  className?: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  const safeBullets = useMemo(() => Array.from(bullets), [bullets])

  useEffect(() => {
    if (safeBullets.length <= 1) return
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % safeBullets.length)
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [safeBullets.length, intervalMs])

  return (
    <ul className={className}>
      {safeBullets.map((bullet, j) => {
        const isActive = j === activeIndex
        return (
          <li
            key={j}
            className={`flex items-start gap-2 text-sm ${isActive ? activeClassName : inactiveClassName}`}
          >
            <span className={`mt-0.5 flex-shrink-0 ${isActive ? 'text-teal' : 'text-teal/60'}`}>
              {isActive ? bulletIconActive : bulletIconInactive}
            </span>
            {bullet}
          </li>
        )
      })}
    </ul>
  )
}
