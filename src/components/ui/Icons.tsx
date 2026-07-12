'use client'

/**
 * Micro-animated SVG icons.
 * All icons use currentColor and accept a className prop.
 * Animations are CSS-keyframe driven (no layout thrash, works SSR).
 */

import { motion } from 'framer-motion'

interface IconProps {
  className?: string
  size?: number
}

/* ─── Utility ────────────────────────────────────────────────── */
const ring = {
  animate: { rotate: [0, -8, 8, -4, 4, 0] },
  transition: { duration: 0.6, delay: 1, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' as const },
}

/* ─── Bell / Order notification ─────────────────────────────── */
export function BellIcon({ className = '', size = 20 }: IconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
      animate={ring.animate}
      transition={ring.transition}
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <motion.circle cx="18" cy="6" r="3" fill="currentColor" stroke="none"
        animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-ember"
      />
    </motion.svg>
  )
}

/* ─── Flame / Kitchen ────────────────────────────────────────── */
export function FlameIcon({ className = '', size = 20 }: IconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
      animate={{ scaleY: [1, 1.05, 0.97, 1.02, 1], scaleX: [1, 0.97, 1.03, 0.98, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ originX: '50%', originY: '100%' }}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </motion.svg>
  )
}

/* ─── Ticket / Paper KOT ─────────────────────────────────────── */
export function TicketIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
      <line x1="9" y1="15" x2="13" y2="15" />
    </svg>
  )
}

/* ─── Credit Card ────────────────────────────────────────────── */
export function CardIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="7" y1="15" x2="10" y2="15" />
    </svg>
  )
}

/* ─── Bar Chart / Revenue ────────────────────────────────────── */
export function BarChartIcon({ className = '', size = 20 }: IconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6"  y1="20" x2="6"  y2="16" />
      <line x1="3"  y1="20" x2="21" y2="20" />
    </motion.svg>
  )
}

/* ─── Check Circle / Confirmed ───────────────────────────────── */
export function CheckCircleIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  )
}

/* ─── Trend Down / Loss ──────────────────────────────────────── */
export function TrendDownIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  )
}

/* ─── Message / Chat ─────────────────────────────────────────── */
export function MessageIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="13" x2="13" y2="13" />
    </svg>
  )
}

/* ─── Person Walking Out / Exit ──────────────────────────────── */
export function ExitPersonIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <path d="M13 4h3a2 2 0 0 1 2 2v14" />
      <path d="M2 20h3" />
      <path d="M13 20h9" />
      <path d="M10 12v.01" />
      <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561z" />
    </svg>
  )
}

/* ─── Shield / Data Security ─────────────────────────────────── */
export function ShieldIcon({ className = '', size = 20 }: IconProps) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
      animate={{ scaleY: [1, 1.04, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </motion.svg>
  )
}

/* ─── Lock / Isolation ───────────────────────────────────────── */
export function LockIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ─── Devices / Works Everywhere ─────────────────────────────── */
export function DevicesIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/* ─── QR Scan / No App Download ──────────────────────────────── */
export function QrScanIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <rect x="3"  y="3"  width="7" height="7" rx="1" />
      <rect x="14" y="3"  width="7" height="7" rx="1" />
      <rect x="3"  y="14" width="7" height="7" rx="1" />
      <rect x="5"  y="5"  width="3" height="3" fill="currentColor" stroke="none" />
      <rect x="16" y="5"  width="3" height="3" fill="currentColor" stroke="none" />
      <rect x="5"  y="16" width="3" height="3" fill="currentColor" stroke="none" />
      <path d="M14 14h3v3" />
      <path d="M14 20h7" />
      <path d="M20 14v7" />
    </svg>
  )
}

/* ─── Bank / Your Money ──────────────────────────────────────── */
export function BankIcon({ className = '', size = 20 }: IconProps) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className}
    >
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6"  y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  )
}

/* ─── Checkmark (inline text, not an icon block) ─────────────── */
export function CheckMark({ className = '' }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden
    >
      <path d="M2 6l3 3 5-5" />
    </svg>
  )
}
