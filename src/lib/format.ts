import type { Region } from './region-config'
import { regionConfig } from './region-config'

/**
 * Locale-aware currency formatter. Never hardcode currency symbols — call this.
 * formatCurrency('in', 42580) -> "₹42,580"
 * formatCurrency('uk', 4258)  -> "£4,258"
 */
export function formatCurrency(
  region: Region,
  amount: number,
  opts: { decimals?: number } = {},
): string {
  const { localeTag, currencyCode } = regionConfig[region]
  return new Intl.NumberFormat(localeTag, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: opts.decimals ?? 0,
    maximumFractionDigits: opts.decimals ?? 0,
  }).format(amount)
}

/**
 * Compact form for large figures.
 * formatCompactCurrency('in', 1284500) -> locale compact (e.g. "₹12.8L")
 * formatCompactCurrency('uk', 128400)  -> locale compact (e.g. "£128K")
 */
export function formatCompactCurrency(region: Region, amount: number): string {
  const { localeTag, currencyCode } = regionConfig[region]
  return new Intl.NumberFormat(localeTag, {
    style: 'currency',
    currency: currencyCode,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount)
}
