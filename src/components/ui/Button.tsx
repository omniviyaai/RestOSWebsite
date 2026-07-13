'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'ghost'

interface ButtonProps {
  children: React.ReactNode
  href: string
  variant?: ButtonVariant
  className?: string
  external?: boolean
}

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  external = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display font-semibold text-sm cursor-pointer select-none'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-ember text-white shadow-lg shadow-ember/20 min-h-[44px]',
    ghost:
      'border border-wire text-warm-white min-h-[44px]',
  }

  const springTap = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={springTap}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={springTap}
    >
      <Link href={href} className={classes}>
        {children}
      </Link>
    </motion.div>
  )
}
