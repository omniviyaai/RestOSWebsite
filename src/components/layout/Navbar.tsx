'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { Menu, X, User, Lock, UserPlus } from 'lucide-react'
import { NAV_SLUGS } from '@/lib/constants'
import { useRegion } from '@/lib/region-context'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { Logo } from '@/components/ui/Logo'
import { normaliseMousePos, mapMouseToRotation, springs } from '@/lib/parallax'

const ADMIN_LOGIN  = 'https://restos.omniviya.in/admin/login'
const STAFF_LOGIN  = 'https://restos.omniviya.in/staff/login'
const ADMIN_REGISTER = 'https://restos.omniviya.in/admin/register'

export function Navbar() {
  const region = useRegion()
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

          {/* Logo */}
          <Link
            href="/"
            aria-label="Omniviya — Home"
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
            style={{ display: 'inline-block', perspective: '400px' }}
          >
            <motion.div
              layoutId="omniviya-logo"
              data-nav-logo
              transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 1.2 }}
              style={{ rotateX: logoRotateX, rotateY: logoRotateY }}
            >
              <Logo variant="compact" />
            </motion.div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Link
              href={`/${region.key}/`}
              className="relative text-stone text-sm hover:text-warm-white transition-colors duration-150 group"
            >
              Home
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
            {NAV_SLUGS.map(({ label, slug }, i) => (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 + i * 0.07 }}
              >
                <Link
                  href={`/${region.key}/${slug}/`}
                  className="relative text-stone text-sm hover:text-warm-white transition-colors duration-150 group"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-full h-px bg-ember scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Region switcher */}
          <div className="hidden md:flex items-center gap-1 mr-2 border-r border-wire/30 pr-3">
            <a href="/in/" className="px-2 py-1 text-[11px] font-mono rounded transition-colors text-stone hover:text-ember">🇮🇳 IN</a>
            <a href="/uk/" className="px-2 py-1 text-[11px] font-mono rounded transition-colors text-stone hover:text-ember">🇬🇧 UK</a>
          </div>

          {/* Desktop right — WhatsApp + segmented login pill */}
          <motion.div
            className="hidden md:flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.4 }}
          >
            <WhatsAppButton />

            <div className="flex items-stretch border border-wire/40 rounded-lg overflow-hidden bg-carbon" role="group" aria-label="Account">
              <a
                href={STAFF_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-display font-medium text-stone hover:text-warm-white hover:bg-wire/20 transition-colors border-r border-wire/40"
              >
                <User size={13} strokeWidth={2} />
                Staff
              </a>
              <a
                href={ADMIN_LOGIN}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-display font-semibold text-ember hover:text-ember/80 hover:bg-ember/5 transition-colors border-r border-wire/40"
              >
                <Lock size={13} strokeWidth={2} />
                Admin
              </a>
              <a
                href={ADMIN_REGISTER}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-display font-semibold text-teal hover:text-teal/80 hover:bg-teal/5 transition-colors"
              >
                <UserPlus size={13} strokeWidth={2} />
                Register
              </a>
            </div>
          </motion.div>

          {/* Mobile hamburger */}
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

      {/* Mobile menu */}
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
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0 }}
              >
                <Link
                  href={`/${region.key}/`}
                  onClick={() => setMobileOpen(false)}
                  className="text-warm-white text-2xl font-display font-semibold py-4 border-b border-wire/40 block hover:text-ember transition-colors"
                >
                  Home
                </Link>
              </motion.div>
              {NAV_SLUGS.map(({ label, slug }, i) => (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30, delay: i * 0.06 }}
                >
                  <Link
                    href={`/${region.key}/${slug}/`}
                    onClick={() => setMobileOpen(false)}
                    className="text-warm-white text-2xl font-display font-semibold py-4 border-b border-wire/40 block hover:text-ember transition-colors"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Region switcher */}
            <div className="flex gap-2 py-4 px-6 border-b border-wire/40">
              <a href="/in/" className="text-stone text-sm hover:text-ember transition-colors">🇮🇳 India</a>
              <span className="text-wire">|</span>
              <a href="/uk/" className="text-stone text-sm hover:text-ember transition-colors">🇬🇧 UK</a>
            </div>

            {/* Mobile login section */}
            <div className="px-6 py-5 border-b border-wire/40">
              <p className="text-[10px] font-mono uppercase tracking-widest text-stone/50 mb-3">Login</p>
              <div className="flex flex-col gap-2">
                <a
                  href={STAFF_LOGIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-wire/40 bg-carbon text-warm-white font-display font-medium hover:border-wire/80 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <User size={15} strokeWidth={2} className="text-stone" />
                    Staff Login
                  </span>
                  <span className="text-stone text-xs">→</span>
                </a>
                <a
                  href={ADMIN_LOGIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg bg-ember/10 border border-ember/30 text-ember font-display font-semibold hover:bg-ember/15 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Lock size={15} strokeWidth={2} />
                    Admin Login
                  </span>
                  <span className="text-xs">→</span>
                </a>
                <a
                  href={ADMIN_REGISTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-teal/30 bg-teal/5 text-teal font-display font-semibold hover:bg-teal/10 transition-colors"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <UserPlus size={15} strokeWidth={2} />
                    Register Restaurant
                  </span>
                  <span className="text-xs">→</span>
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="p-6 mt-auto">
              <WhatsAppButton className="w-full justify-center text-base py-4" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
