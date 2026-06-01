// src/lib/constants.ts

export const DEMO_PAGE_URL = '/demo'
export const FOUNDING_PAGE_URL = '/founding'

export const FOUNDING_SPOTS_TOTAL = 10
export const FOUNDING_SPOTS_TAKEN = 0

export const YOUTUBE_VIDEO_ID = 'REPLACE_WITH_YOUR_VIDEO_ID'

export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Founding Partner', href: '/founding' },
  { label: 'About', href: '/about' },
] as const

export const PAIN_STATEMENTS = [
  'A customer complained their order never reached the kitchen.',
  'Your waiter wrote it down wrong. Again.',
  'You found out at closing that 3 tables had billing errors.',
  'You were at home and had no idea what was happening inside.',
  'You lost a regular because the queue was too long.',
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
