'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

type LenisInstance = {
  raf: (time: number) => void
  scrollTo: (target: number, opts?: { immediate?: boolean }) => void
  destroy: () => void
}

export function LenisProvider() {
  const lenisRef = useRef<LenisInstance | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    let rafId: number
    let destroyed = false

    async function init() {
      const { default: Lenis } = await import('lenis')
      if (destroyed) return
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis as unknown as LenisInstance

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    init()

    return () => {
      destroyed = true
      cancelAnimationFrame(rafId)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  // Reset to the top of the page on every route change so navbar navigation
  // always lands at the start of the destination page (Lenis owns the scroll
  // position, so we must reset it explicitly rather than rely on the browser).
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
