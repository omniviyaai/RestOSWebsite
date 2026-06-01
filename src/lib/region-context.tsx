'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Region, RegionConfig } from './region-config'
import { regionConfig } from './region-config'

const RegionContext = createContext<RegionConfig>(regionConfig.in)

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
  return useContext(RegionContext)
}
