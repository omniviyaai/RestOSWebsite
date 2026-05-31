'use client'

import { useEffect } from 'react'

export function LenisProvider() {
  useEffect(() => {
    let rafId: number

    async function init() {
      const { default: Lenis } = await import('lenis')
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)

      return lenis
    }

    let lenisInstance: { destroy: () => void } | null = null
    init().then(l => { lenisInstance = l })

    return () => {
      cancelAnimationFrame(rafId)
      lenisInstance?.destroy()
    }
  }, [])

  return null
}
