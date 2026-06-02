'use client'

import { useEffect } from 'react'
import type { Region } from '@/lib/region-config'

export function RegionCookieSetter({ region }: { region: Region }) {
  useEffect(() => {
    document.cookie = `region=${region}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
  }, [region])
  return null
}
