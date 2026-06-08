'use client'

import { motion } from 'framer-motion'

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="2" width="14" height="24" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <motion.g
        animate={{ scale: [1, 1.35, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '14px 21px' }}
      >
        <circle cx="14" cy="21" r="1.5" fill="currentColor" opacity="0.6" />
      </motion.g>
      <motion.path
        d="M10 10l4 3 4-3"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export function KitchenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <path d="M6 22h16l-2-8H8l-2 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="12" y="14" width="4" height="4" rx="1" fill="currentColor" opacity="0.3" />
      <motion.path
        d="M10 8l1 3"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
      />
      <motion.path
        d="M14 6l1 5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.path
        d="M18 8l-1 3"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
    </svg>
  )
}

export function BellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <motion.g
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '14px 6px' }}
      >
        <path d="M8 18l-2 3h16l-2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 18V12a6 6 0 0112 0v6" stroke="currentColor" strokeWidth="1.5" />
      </motion.g>
      <motion.g
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '14px 5.5px' }}
      >
        <circle cx="14" cy="5.5" r="1.5" fill="currentColor" />
      </motion.g>
    </svg>
  )
}

export function RupeeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <motion.g
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '14px 14px' }}
      >
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5" />
      </motion.g>
      <motion.g
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '14px 14px' }}
      >
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </motion.g>
      <text x="14" y="18" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="bold" fontFamily="sans-serif">₹</text>
    </svg>
  )
}

export function ChartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <motion.rect
        x="10" y="10" width="4" height="10" rx="0.75"
        fill="currentColor"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
      />
      <motion.rect
        x="16" y="6" width="4" height="14" rx="0.75"
        fill="currentColor"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.rect
        x="22" y="8" width="4" height="12" rx="0.75"
        fill="currentColor"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
      <motion.path
        d="M2 24l8-6 6 2 8-5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
      />
    </svg>
  )
}

export function DevicesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="10" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <motion.rect
        x="4" y="7" width="8" height="11" rx="0.5"
        fill="currentColor"
        animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <rect x="15" y="3" width="10" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <motion.rect
        x="16" y="5" width="8" height="15" rx="0.5"
        fill="currentColor"
        animate={{ opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <circle cx="20" cy="21" r="0.8" fill="currentColor" />
    </svg>
  )
}
