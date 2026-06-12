'use client'
import Link from 'next/link'
import { useRegion } from '@/lib/region-context'
import { SpotCounter } from '@/components/ui/SpotCounter'

export function FoundingStrip() {
  const region = useRegion()
  return (
    <div className="bg-gold/[0.06] border-b border-gold/20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
        <span className="text-xs sm:text-sm text-warm-white font-medium">Founding Partners — first 90 days free.</span>
        <SpotCounter />
        <Link href={`/${region.key}/founding/`} className="text-xs sm:text-sm text-gold hover:text-gold/80 underline underline-offset-2">
          Claim a spot →
        </Link>
      </div>
    </div>
  )
}
