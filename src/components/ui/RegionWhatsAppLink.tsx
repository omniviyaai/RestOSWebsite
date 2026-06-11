'use client'

import { useRegion } from '@/lib/region-context'

export function RegionWhatsAppLink({ className }: { className?: string }) {
  const region = useRegion()
  const href = `https://wa.me/${region.whatsappNumber}?text=${encodeURIComponent('Hi, I want to know more about Omniviya')}`
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      Message us directly
    </a>
  )
}
