export type Region = 'in' | 'uk'

export interface RegionConfig {
  key: Region
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
  // Region-specific copy
  heroDescription: string
  paymentEcosystemDesc: string
  paymentHighlightHeadline: string
  paymentHighlightSubtext: string
  billingAfterText: string
  paymentFeatureHeadline: string
  paymentFeatureDescription: string
  paymentFeatureBullets: readonly string[]
  analyticsDescription: string
  paymentFaqAnswer: string
  missionHeadline: string
  missionBody: string
  whatWeBuiltBody: string
  aboutCompanyText: string
  foundingMissionText: string
}

export const regionConfig: Record<Region, RegionConfig> = {
  in: {
    key: 'in' as const,
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
    heroDescription: 'RestOS is the complete operating system for Indian restaurants. One screen. Every order. Every table. Every rupee.',
    paymentEcosystemDesc: 'UPI, card, or cash — all tracked',
    paymentHighlightHeadline: 'Every rupee tracked automatically',
    paymentHighlightSubtext: 'UPI, card, and cash — all in one place, in real time.',
    billingAfterText: 'Every order tracked, every rupee accounted',
    paymentFeatureHeadline: 'Every rupee goes directly to your account',
    paymentFeatureDescription: 'Accept UPI, cards, netbanking, and wallets through Razorpay or Cashfree. Money goes directly to your bank — we never hold it. Credentials are encrypted. Webhooks are verified.',
    paymentFeatureBullets: [
      'Razorpay and Cashfree both supported',
      'UPI payments in seconds',
      'Pay at counter for cash customers',
      'No double charges — duplicate webhooks deduplicated automatically',
      'AES-256-GCM encrypted payment credentials',
    ],
    analyticsDescription: 'RestOS tracks every order, every rupee, every item sold. See your best sellers, peak hours, and revenue by source — automatically, in real time.',
    paymentFaqAnswer: 'UPI, credit/debit cards, netbanking, and wallets via Razorpay and Cashfree. Cash (pay at counter) also supported.',
    missionHeadline: 'Indian restaurants deserve better technology.',
    missionBody: 'Every day, thousands of restaurant owners across India manage their entire operation through WhatsApp groups, paper KOTs, and spreadsheets. Not because they want to — because the software available to them is too expensive, too complicated, or built for someone else entirely.',
    whatWeBuiltBody: 'No expensive hardware. No complicated setup. No per-device fees. Software that works the way Indian restaurants actually work.',
    aboutCompanyText: 'Omniviya is a software company building technology for businesses underserved by existing tools. RestOS is our first product. We are based in India and building for India first.',
    foundingMissionText: 'We are building the operating system that Indian restaurants deserve.',
  },
  uk: {
    key: 'uk' as const,
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
    heroDescription: 'RestOS is the complete operating system for UK restaurants. One screen. Every order. Every table. Every pound.',
    paymentEcosystemDesc: 'Card or cash — all tracked',
    paymentHighlightHeadline: 'Every pound tracked automatically',
    paymentHighlightSubtext: 'Card and cash — all in one place, in real time.',
    billingAfterText: 'Every order tracked, every pound accounted',
    paymentFeatureHeadline: 'Every pound goes directly to your account',
    paymentFeatureDescription: 'Accept debit/credit cards, contactless, and Apple Pay through Stripe. Money goes directly to your bank — we never hold it. Credentials are encrypted. Webhooks are verified.',
    paymentFeatureBullets: [
      'Stripe supported',
      'Contactless, chip & pin, and Apple Pay',
      'Pay at counter for cash customers',
      'No double charges — duplicate webhooks deduplicated automatically',
      'AES-256-GCM encrypted payment credentials',
    ],
    analyticsDescription: 'RestOS tracks every order, every pound, every item sold. See your best sellers, peak hours, and revenue by source — automatically, in real time.',
    paymentFaqAnswer: 'Debit/credit cards, contactless, and Apple Pay via Stripe. Cash (pay at counter) also supported.',
    missionHeadline: 'UK restaurants deserve better technology.',
    missionBody: 'Every day, thousands of restaurant owners across the UK manage their entire operation through WhatsApp groups, paper tickets, and spreadsheets. Not because they want to — because the software available to them is too expensive, too complicated, or built for someone else entirely.',
    whatWeBuiltBody: 'No expensive hardware. No complicated setup. No per-device fees. Software that works the way UK restaurants actually work.',
    aboutCompanyText: 'Omniviya is a software company building technology for businesses underserved by existing tools. RestOS is our first product. We are based in India, building for UK and India.',
    foundingMissionText: 'We are building the operating system that restaurants deserve.',
  },
}
