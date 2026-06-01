export type Region = 'in' | 'uk'

export interface RegionConfig {
  currency: string
  currencyCode: string
  phonePrefix: string
  paymentGateways: string[]
  siteName: string
  locales: string[]
  badge: string
  tagline: string
  description: string
  heroVideo: string
  whatsappNumber: string
  geoRegion: string
  geoPlaceName: string
  ogLocale: string
  htmlLang: string
  ogTitle: string
  ogDescription: string
  twitterTitle: string
  twitterDescription: string
  youtubeVideoId: string
}

export const regionConfig: Record<Region, RegionConfig> = {
  in: {
    currency: '\u20B9',
    currencyCode: 'INR',
    phonePrefix: '+91',
    paymentGateways: ['Razorpay', 'Cashfree'],
    siteName: 'RestOS by Omniviya',
    locales: ['en_IN', 'hi'],
    badge: 'NOW LAUNCHING IN INDIA',
    tagline: 'Built For India. Built To Last.',
    description: 'Built for India. The complete operating system for restaurants of every size.',
    heroVideo: '/video/restos-vertical-inr.mp4',
    whatsappNumber: '919XXXXXXXXX',
    geoRegion: 'IN',
    geoPlaceName: 'India',
    ogLocale: 'en_IN',
    htmlLang: 'en',
    ogTitle: 'RestOS \u2014 The Operating System For Indian Restaurants',
    ogDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all connected, all in real time, all on devices you already own.',
    twitterTitle: 'RestOS \u2014 The Operating System For Indian Restaurants',
    twitterDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all in real time.',
    youtubeVideoId: 'REPLACE_WITH_YOUR_VIDEO_ID',
  },
  uk: {
    currency: '\u00A3',
    currencyCode: 'GBP',
    phonePrefix: '+44',
    paymentGateways: ['Stripe'],
    siteName: 'RestOS UK',
    locales: ['en_GB'],
    badge: 'NOW AVAILABLE IN THE UK',
    tagline: 'Built For UK Restaurants.',
    description: 'Built for the UK. The complete operating system for restaurants of every size.',
    heroVideo: '/video/restos-vertical-gbp.mp4',
    whatsappNumber: '447XXXXXXXXX',
    geoRegion: 'GB',
    geoPlaceName: 'United Kingdom',
    ogLocale: 'en_GB',
    htmlLang: 'en',
    ogTitle: 'RestOS \u2014 The Operating System For UK Restaurants',
    ogDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all connected, all in real time.',
    twitterTitle: 'RestOS \u2014 The Operating System For UK Restaurants',
    twitterDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics \u2014 all in real time.',
    youtubeVideoId: 'REPLACE_WITH_UK_VIDEO_ID',
  },
}
