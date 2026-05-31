// Update WHATSAPP_NUMBER with your actual WhatsApp Business number
export const WHATSAPP_NUMBER = '919XXXXXXXXX'
export const WHATSAPP_MESSAGE = 'Hi, I want to know more about RestOS'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const DEMO_PAGE_URL = '/demo'
export const FOUNDING_PAGE_URL = '/founding'

// Update SPOTS_TAKEN manually as restaurants onboard
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
    description: 'Payments go directly to your Razorpay or Cashfree account. We never touch it.',
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
