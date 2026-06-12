// src/lib/constants.ts

export const FOUNDING_SPOTS_TOTAL = 10
export const FOUNDING_SPOTS_TAKEN = 5

export const YOUTUBE_VIDEO_ID = 'REPLACE_WITH_YOUR_VIDEO_ID'

export const NAV_SLUGS = [
  { label: 'Features', slug: 'features' },
  { label: 'Pricing', slug: 'pricing' },
  { label: 'Founding Partner', slug: 'founding' },
  { label: 'About', slug: 'about' },
] as const

export const TRUST_SIGNALS = [
  {
    title: 'Your money, your account',
    description: 'Payments go directly to your account. We never touch it.',
  },
  {
    title: 'Your data, completely isolated',
    description: 'No other restaurant can ever see your orders, customers, or revenue.',
  },
  {
    title: 'Works on devices you already own',
    description: 'Any phone, tablet, or laptop. No proprietary hardware to buy.',
  },
  {
    title: 'No app download needed',
    description: 'Customers scan a QR code. That is all. No sign-up. No install.',
  },
] as const
