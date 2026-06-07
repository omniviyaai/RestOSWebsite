import { Variants } from 'framer-motion'

// Base spring (Emil Kowalski style)
const spring = { type: 'spring' as const, stiffness: 300, damping: 30 }
const springGentle = { type: 'spring' as const, stiffness: 200, damping: 25 }

// ─── Global variants ──────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: spring },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: springGentle },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: spring },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: spring },
}

// ─── Hero "Immersion" ─────────────────────────────────────────────────────────

export const heroLetter: Variants = {
  hidden: { opacity: 0, rotateX: -15, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delay: 0.6 + i * 0.03,
    },
  }),
}

export const heroEntry: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15, delay },
  }),
}

export const heroDashboard: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 40, rotateX: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15, delay: 1.2 },
  },
}

// ─── Pain "Tension" ───────────────────────────────────────────────────────────

export const painLeft: Variants = {
  hidden: { opacity: 0, x: -40, rotateY: -3 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 200, damping: 30 },
  },
}

export const painRight: Variants = {
  hidden: { opacity: 0, x: 40, rotateY: 3 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { type: 'spring', stiffness: 200, damping: 30 },
  },
}

export const painCenter: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 30 },
  },
}

// ─── Transformation "Release" ─────────────────────────────────────────────────

export const transformBefore: Variants = {
  hidden: { opacity: 0, x: -60, rotateY: -8, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotateY: -1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      delay: i * 0.1,
    },
  }),
}

export const transformAfter: Variants = {
  hidden: { opacity: 0, x: 60, rotateY: 8, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    rotateY: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      delay: i * 0.1 + 0.05,
    },
  }),
}

// ─── Ecosystem "Intelligence" ─────────────────────────────────────────────────

export const ecosystemNode: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      delay: i * 0.15,
    },
  }),
}

export const ecosystemLine: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      delay: i * 0.15 + 0.1,
    },
  }),
}

// ─── FinalCTA "Momentum" ──────────────────────────────────────────────────────

export const ctaEntry: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 20,
      delay: i * 0.12,
    },
  }),
}

// ─── Feature section "Scroll-Reveal" ──────────────────────────────────────────

export const problemFade: Variants = {
  hidden: { opacity: 0, y: -12, transition: { duration: 0.3, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const solutionSlide: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
}

export const counterUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 150, damping: 20, delay: i * 0.08 },
  }),
}

export const deviceFloat: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15, delay: i * 0.15 },
  }),
}
