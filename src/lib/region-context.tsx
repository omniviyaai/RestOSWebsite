'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Region, RegionConfig } from './region-config'
import { regionConfig } from './region-config'

const RegionContext = createContext<RegionConfig | null>(null)

export function RegionProvider({
  region,
  children,
}: {
  region: Region
  children: ReactNode
}) {
  return (
    <RegionContext.Provider value={regionConfig[region]}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion() {
  const ctx = useContext(RegionContext)
  if (!ctx) throw new Error('useRegion must be used within a RegionProvider')
  return ctx
}
