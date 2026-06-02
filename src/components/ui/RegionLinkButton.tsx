'use client'

import { useRegion } from '@/lib/region-context'
import { Button } from '@/components/ui/Button'

interface RegionLinkButtonProps {
  slug: string
  variant?: 'primary' | 'ghost'
  className?: string
  children: React.ReactNode
}

export function RegionLinkButton({ slug, variant = 'primary', className, children }: RegionLinkButtonProps) {
  const region = useRegion()
  return (
    <Button href={`/${region.key}/${slug}/`} variant={variant} className={className}>
      {children}
    </Button>
  )
}
