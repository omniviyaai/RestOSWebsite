'use client'

import { motion } from 'framer-motion'

declare global {
  interface Window {
    MIVI?: {
      open: () => void
      close: () => void
      toggle: () => void
    }
  }
}

interface TalkToMiviButtonProps {
  variant?: 'primary' | 'ghost'
  className?: string
  children?: React.ReactNode
}

export function TalkToMiviButton({ variant = 'primary', className = '', children }: TalkToMiviButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display font-semibold text-sm cursor-pointer select-none'
  const variants = {
    primary: 'bg-ember text-white shadow-lg shadow-ember/20 min-h-[44px]',
    ghost: 'border border-wire text-warm-white min-h-[44px]',
  }

  return (
    <motion.button
      type="button"
      onClick={() => window.MIVI?.open?.()}
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children || 'Talk to MIVI'}
    </motion.button>
  )
}
