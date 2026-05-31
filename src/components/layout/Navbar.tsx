'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, WHATSAPP_URL, DEMO_PAGE_URL } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { normaliseMousePos, mapMouseToRotation, springs } from '@/lib/parallax'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const logoRotateX = useSpring(0, springs.magnetic)
  const logoRotateY = useSpring(0, springs.magnetic)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleLogoMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = normaliseMousePos(e.clientX - rect.left, e.clientY - rect.top, rect.width, rect.height)
    logoRotateX.set(mapMouseToRotation(-pos.y, 8))
    logoRotateY.set(mapMouseToRotation(pos.x, 8))
  }, [logoRotateX, logoRotateY])

  const handleLogoMouseLeave = useCallback(() => {
    logoRotateX.set(0); logoRotateY.set(0)
  }, [logoRotateX, logoRotateY])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'bg-midnight/95 backdrop-blur-md border-b border-wire shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            aria-label="RestOS — Home"
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
            style={{ display: 'inline-block', perspective: '400px' }}
          >
            {/* layoutId="restos-logo" — FLIP target: loader logo animates here on exit */}
            <motion.div
              layoutId="restos-logo"
              data-nav-logo
              transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 1.2 }}
              style={{ rotateX: logoRotateX, rotateY: logoRotateY }}
            >
              <Logo variant="compact" />
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 + i * 0.07 }}
              >
                <Link
                  href={link.href}
                  className="relative text-stone text-sm hover:text-warm-white transition-colors duration-150 group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.4 }}
          >
            <Button href={WHATSAPP_URL} variant="ghost" external>WhatsApp Us</Button>
            <Button href={DEMO_PAGE_URL} variant="primary">Book Demo</Button>
          </motion.div>

          <motion.button
            className="md:hidden text-warm-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed inset-0 z-40 bg-midnight flex flex-col pt-16 overflow-y-auto"
          >
            <nav className="flex flex-col p-6" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30, delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-warm-white text-2xl font-display font-semibold py-4 border-b border-wire/40 block hover:text-ember transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="p-6 flex flex-col gap-3 mt-auto">
              <Button href={WHATSAPP_URL} variant="ghost" external className="w-full justify-center text-base py-4">WhatsApp Us</Button>
              <Button href={DEMO_PAGE_URL} variant="primary" className="w-full justify-center text-base py-4">Book Demo</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
