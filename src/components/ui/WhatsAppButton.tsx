'use client'

import { useRegion } from '@/lib/region-context'
import { Button } from './Button'

interface WhatsAppButtonProps {
  variant?: 'primary' | 'ghost'
  className?: string
  children?: React.ReactNode
}

export function WhatsAppButton({ variant = 'ghost', className, children }: WhatsAppButtonProps) {
  const region = useRegion()
  const url = `https://wa.me/${region.whatsappNumber}?text=${encodeURIComponent('Hi, I want to know more about RestOS')}`
  return (
    <Button href={url} variant={variant} external className={className}>
      {children || 'WhatsApp Us'}
    </Button>
  )
}
