'use client'

import { useRegion } from '@/lib/region-context'
import { Button } from './Button'
import { WhatsAppIcon } from './WhatsAppIcon'

interface WhatsAppButtonProps {
  variant?: 'whatsapp' | 'ghost'
  className?: string
  children?: React.ReactNode
}

export function WhatsAppButton({ variant = 'whatsapp', className, children }: WhatsAppButtonProps) {
  const region = useRegion()
  const url = `https://wa.me/${region.whatsappNumber}?text=${encodeURIComponent('Hi, I want to know more about Omniviya')}`
  return (
    <Button href={url} variant={variant} external className={className}>
      <WhatsAppIcon className="w-5 h-5" />
      {children || 'WhatsApp Us'}
    </Button>
  )
}
