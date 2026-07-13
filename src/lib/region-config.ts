export type Region = 'in' | 'uk'

export interface PaymentMethod {
  label: string
  sub: string
}

export interface ExampleStats {
  /** Headline daily revenue figure, in major currency units */
  revenue: number
  /** Average order value, in major currency units */
  avgOrder: number
  /** Orders processed today */
  ordersToday: number
  /** Rolling 30-day revenue, in major currency units */
  monthlyRevenue: number
}

export interface LegalSection {
  heading: string
  body: string
}

export interface LegalDoc {
  title: string
  updated: string
  intro: string
  sections: readonly LegalSection[]
}

export interface RegionConfig {
  key: Region
  currency: string
  currencyCode: string
  /** BCP-47 locale tag used for Intl.NumberFormat / Intl.DateTimeFormat */
  localeTag: string
  phonePrefix: string
  paymentGateways: string[]
  siteName: string
  locales: string[]
  badge: string
  tagline: string
  description: string
  heroVideo: string
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
  taxTerm: string
  paymentCurrencyTerm: string
  billingAfterText: string
  paymentFeatureHeadline: string
  paymentFeatureDescription: string
  paymentFeatureBullets: readonly string[]
  analyticsDescription: string
  paymentFaqAnswer: string
  /** Short inline phrase listing accepted payment methods, used in body copy/FAQ */
  paymentPhrase: string
  /** SaaS app base URL for sign-up / trial CTAs */
  appUrl: string
  /** Pricing comparison "payments" row label */
  paymentRowLabel: string
  /** Pricing comparison "tax" row label */
  taxExportLine: string
  /** Structured payment methods rendered as icon cards on the features page */
  paymentMethods: readonly PaymentMethod[]
  /** Sample dashboard figures shown in the revenue showcase */
  exampleStats: ExampleStats
  byodComparisons: readonly { item: string; oldWay: string; newWay: string }[]
  missionHeadline: string
  missionBody: string
  whatWeBuiltBody: string
  aboutCompanyText: string
  foundingMissionText: string
  // Homepage pain section (moment → cost → emotional toll)
  painStatements: readonly string[]
  // SEO
  seoKeywords: readonly string[]
  // Compliance
  legalFramework: string
  consentIntro: string
  privacyDoc: LegalDoc
  cookieDoc: LegalDoc
}

const sharedCookieSections: readonly LegalSection[] = [
  {
    heading: 'What are cookies?',
    body: 'Cookies are small text files stored on your device when you visit a website. They let the site remember your choices and understand how it is being used.',
  },
  {
    heading: 'Essential cookies',
    body: 'We use one essential cookie (“region”) to remember whether you are viewing the India or UK version of the site, so we can show you the right prices, payment methods, and tax terminology. This cookie is required for the site to work and cannot be switched off.',
  },
  {
    heading: 'Analytics cookies',
    body: 'With your consent, we use analytics cookies to understand which pages are visited and how the site performs. These are never set before you accept them. You can decline or withdraw consent at any time using “Cookie Settings”.',
  },
  {
    heading: 'Marketing cookies',
    body: 'With your consent, we may use marketing cookies to measure the effectiveness of campaigns and show relevant content. These are never set before you accept them.',
  },
  {
    heading: 'Managing your choices',
    body: 'Open “Cookie Settings” at the bottom of any page to change or withdraw your consent at any time. You can also clear cookies through your browser settings.',
  },
]

export const regionConfig: Record<Region, RegionConfig> = {
  in: {
    key: 'in' as const,
    currency: '₹',
    currencyCode: 'INR',
    localeTag: 'en-IN',
    phonePrefix: '+91',
    paymentGateways: ['Razorpay', 'Cashfree'],
    siteName: 'Omniviya',
    locales: ['en_IN', 'hi'],
    badge: 'NOW LAUNCHING IN INDIA',
    tagline: 'Built For India. Built To Last.',
    description: 'Built for India. The complete operating system for restaurants of every size.',
    heroVideo: '/video/omniviya-vertical-inr.mp4',
    geoRegion: 'IN',
    geoPlaceName: 'India',
    ogLocale: 'en_IN',
    htmlLang: 'en',
    ogTitle: 'Omniviya — The Operating System For Indian Restaurants',
    ogDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time, all on devices you already own.',
    twitterTitle: 'Omniviya — The Operating System For Indian Restaurants',
    twitterDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all in real time.',
    youtubeVideoId: 'REPLACE_WITH_YOUR_VIDEO_ID',
    heroDescription: 'Omniviya is the complete operating system for Indian restaurants. One screen. Every order. Every table. Every rupee.',
    taxTerm: 'GST',
    paymentCurrencyTerm: 'rupee',
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
    analyticsDescription: 'Omniviya tracks every order, every rupee, every item sold. See your best sellers, peak hours, and revenue by source — automatically, in real time.',
    paymentFaqAnswer: 'UPI, credit/debit cards, netbanking, and wallets via Razorpay and Cashfree. Cash (pay at counter) also supported.',
    paymentPhrase: 'UPI, credit or debit card',
    appUrl: 'https://app.omniviya.in',
    paymentRowLabel: 'UPI, Razorpay, Cashfree',
    taxExportLine: 'GST billing + GSTR-1 export',
    paymentMethods: [
      { label: 'UPI', sub: 'GPay, PhonePe, Paytm' },
      { label: 'Card', sub: 'Credit & debit cards' },
      { label: 'Cash', sub: 'Tracked in system' },
    ],
    exampleStats: {
      revenue: 42580,
      avgOrder: 506,
      ordersToday: 84,
      monthlyRevenue: 1284500,
    },
    byodComparisons: [
      { item: 'POS terminals', oldWay: '₹30,000 – ₹1,00,000 each', newWay: 'Not needed' },
      { item: 'Self-ordering kiosks', oldWay: '₹1,50,000 – ₹5,00,000 each', newWay: 'Not needed' },
      { item: 'Kitchen printers', oldWay: '₹15,000 – ₹40,000 each', newWay: 'Not needed' },
      { item: 'Vibrating pagers', oldWay: '₹5,000 – ₹15,000 each', newWay: 'Not needed' },
      { item: 'Setup & training', oldWay: 'Weeks of installation and training', newWay: 'Hours, not days' },
    ],
    missionHeadline: 'Indian restaurants deserve better technology.',
    missionBody: 'Every day, thousands of restaurant owners across India manage their entire operation through WhatsApp groups, paper KOTs, and spreadsheets. Not because they want to — because the software available to them is too expensive, too complicated, or built for someone else entirely.',
    whatWeBuiltBody: 'No expensive hardware. No complicated setup. No per-device fees. Software that works the way Indian restaurants actually work.',
    aboutCompanyText: 'Omniviya is a software company building a complete restaurant operating system — QR ordering, kitchen display, payments, and analytics — because restaurants deserve technology that actually works together. Powered by a team based in India, building for India first.',
    foundingMissionText: 'We are building the operating system that Indian restaurants deserve.',
    painStatements: [
      "Friday rush. A paper KOT slips off the rail — and that table's order never reaches the kitchen.",
      "A customer paid on UPI. You're three screenshots deep and still can't match it to the right bill.",
      "At closing you spot it: two tables under-billed. Again. There goes tonight's profit, quietly.",
      "You're finally home — still refreshing the staff WhatsApp group, because it's the only window into your own restaurant.",
      "A regular walked out; the queue was too long. You found out a day too late to make it right.",
    ],
    seoKeywords: [
      'restaurant management software India',
      'restaurant operating system India',
      'restaurant QR ordering system India',
      'QR menu for restaurants India',
      'kitchen display system India',
      'restaurant POS India',
      'UPI payments for restaurants',
      'GST-ready restaurant reports',
      'cloud kitchen software India',
      'restaurant analytics platform India',
    ],
    legalFramework: 'India’s Digital Personal Data Protection Act, 2023 (DPDP Act)',
    consentIntro:
      'This site uses a region cookie to show you the right prices, payment methods, and tax terms. With your consent we also use analytics cookies. You can accept or decline — your choice is stored and can be changed any time.',
    privacyDoc: {
      title: 'Privacy Policy',
      updated: 'June 2026',
      intro:
         'This Privacy Policy explains how Omniviya handles personal data collected through the Omniviya website for visitors in India, in line with the Digital Personal Data Protection Act, 2023 (DPDP Act). This is placeholder copy pending legal review.',
      sections: [
        { heading: 'Who we are', body: 'Omniviya is a restaurant operating system based in India. For privacy queries, contact hello@omniviya.in.' },
        { heading: 'What we collect', body: 'On this marketing site we collect only what you choose to share — for example, the message you send us via chat or by email — plus, with your consent, anonymised analytics about how the site is used.' },
        { heading: 'How we use it', body: 'We use your details solely to respond to your enquiry and to improve the website. We do not sell personal data.' },
        { heading: 'Your rights under the DPDP Act', body: 'You have the right to access, correct, and erase your personal data, to withdraw consent, and to nominate another person to exercise your rights. To make a request, contact hello@omniviya.in.' },
        { heading: 'Grievance officer', body: 'For complaints about how your data is handled, write to hello@omniviya.in marked “Grievance Officer”. [Placeholder — appoint a named officer before launch.]' },
        { heading: 'Cookies', body: 'See our Cookie Policy for details of the cookies we use and how to manage them.' },
      ],
    },
    cookieDoc: {
      title: 'Cookie Policy',
      updated: 'June 2026',
      intro:
         'This Cookie Policy explains the cookies used on the Omniviya website. Non-essential cookies are only set after you give consent. This is placeholder copy pending legal review.',
      sections: sharedCookieSections,
    },
  },
  uk: {
    key: 'uk' as const,
    currency: '£',
    currencyCode: 'GBP',
    localeTag: 'en-GB',
    phonePrefix: '+44',
    paymentGateways: ['Stripe'],
    siteName: 'Omniviya',
    locales: ['en_GB'],
    badge: 'NOW AVAILABLE IN THE UK',
    tagline: 'Built For UK Restaurants.',
    description: 'Built for the UK. The complete operating system for restaurants of every size.',
    heroVideo: '/video/omniviya-vertical-gbp.mp4',
    geoRegion: 'GB',
    geoPlaceName: 'United Kingdom',
    ogLocale: 'en_GB',
    htmlLang: 'en',
    ogTitle: 'Omniviya — The Operating System For UK Restaurants',
    ogDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all connected, all in real time.',
    twitterTitle: 'Omniviya — The Operating System For UK Restaurants',
    twitterDescription:
      'QR ordering, kitchen display, waiter app, payments, and analytics — all in real time.',
    youtubeVideoId: 'REPLACE_WITH_UK_VIDEO_ID',
    heroDescription: 'Omniviya is the complete operating system for UK restaurants. One screen. Every order. Every table. Every pound.',
    taxTerm: 'VAT',
    paymentCurrencyTerm: 'pound',
    paymentEcosystemDesc: 'Card, contactless, or cash — all tracked',
    paymentHighlightHeadline: 'Every pound tracked automatically',
    paymentHighlightSubtext: 'Card, contactless, and Apple Pay — all in one place, in real time.',
    billingAfterText: 'Every order tracked, every pound accounted',
    paymentFeatureHeadline: 'Every pound goes directly to your account',
    paymentFeatureDescription: 'Accept debit/credit cards, contactless, Apple Pay, and Google Pay through Stripe. Money goes directly to your bank — we never hold it. Credentials are encrypted. Webhooks are verified.',
    paymentFeatureBullets: [
      'Stripe supported',
      'Contactless, chip & PIN, Apple Pay, and Google Pay',
      'Pay at counter for cash customers',
      'No double charges — duplicate webhooks deduplicated automatically',
      'AES-256-GCM encrypted payment credentials',
    ],
    analyticsDescription: 'Omniviya tracks every order, every pound, every item sold. See your best sellers, peak hours, and revenue by source — automatically, in real time.',
    paymentFaqAnswer: 'Debit/credit cards, contactless, Apple Pay, and Google Pay via Stripe. Cash (pay at counter) also supported.',
    paymentPhrase: 'card, contactless, or Apple Pay',
    appUrl: 'https://app.omniviya.in',
    paymentRowLabel: 'Card, contactless, Apple Pay, Stripe',
    taxExportLine: 'VAT billing + MTD-ready export',
    paymentMethods: [
      { label: 'Card', sub: 'Debit, credit & chip + PIN' },
      { label: 'Contactless', sub: 'Tap to pay' },
      { label: 'Apple Pay', sub: 'From their iPhone' },
      { label: 'Google Pay', sub: 'From their Android' },
      { label: 'Cash', sub: 'Tracked in system' },
    ],
    exampleStats: {
      revenue: 4258,
      avgOrder: 50,
      ordersToday: 85,
      monthlyRevenue: 128400,
    },
    byodComparisons: [
      { item: 'POS terminals', oldWay: '£1,000 – £3,000 each', newWay: 'Not needed' },
      { item: 'Self-ordering kiosks', oldWay: '£4,000 – £12,000 each', newWay: 'Not needed' },
      { item: 'Kitchen printers', oldWay: '£200 – £500 each', newWay: 'Not needed' },
      { item: 'Vibrating pagers', oldWay: '£100 – £300 each', newWay: 'Not needed' },
      { item: 'Setup & training', oldWay: 'Weeks of installation and training', newWay: 'Hours, not days' },
    ],
    missionHeadline: 'UK restaurants deserve better technology.',
    missionBody: 'Every day, thousands of restaurant owners across the UK manage their entire operation through WhatsApp groups, paper tickets, and spreadsheets. Not because they want to — because the software available to them is too expensive, too complicated, or built for someone else entirely.',
    whatWeBuiltBody: 'No expensive hardware. No complicated setup. No per-device fees. Software that works the way UK restaurants actually work.',
    aboutCompanyText: 'Omniviya is a software company building a complete restaurant operating system — QR ordering, kitchen display, payments, and analytics — because restaurants deserve technology that actually works together. Powered by a team based in India, building for the UK and India.',
    foundingMissionText: 'We are building the operating system that UK restaurants deserve.',
    painStatements: [
      "Friday rush. A paper ticket goes missing — and that table's order never reaches the kitchen.",
      "A card payment lands, but which table? You're scrolling the terminal instead of running the floor.",
      "At closing you spot it: two tables under-charged. Again. There goes tonight's profit, quietly.",
      "You're finally home — still glued to the team's group chat, because it's the only window into your own restaurant.",
      "A regular walked out; the queue was too long. You found out a day too late to make it right.",
    ],
    seoKeywords: [
      'restaurant management software UK',
      'restaurant operating system UK',
      'restaurant ordering system UK',
      'QR menu for restaurants UK',
      'kitchen display system UK',
      'restaurant EPOS UK',
      'contactless payments for restaurants',
      'VAT-compliant restaurant reports',
      'restaurant operations platform UK',
      'restaurant analytics platform UK',
    ],
    legalFramework: 'the UK GDPR and the Privacy and Electronic Communications Regulations (PECR)',
    consentIntro:
      'We use a region cookie to show you the right prices, payment methods, and tax terms. With your consent we also use analytics cookies. Non-essential cookies are never set until you accept, and you can withdraw consent at any time.',
    privacyDoc: {
      title: 'Privacy Policy',
      updated: 'June 2026',
      intro:
         'This Privacy Policy explains how Omniviya handles personal data collected through the Omniviya website for visitors in the United Kingdom, in line with the UK GDPR and the Data Protection Act 2018. This is placeholder copy pending legal review.',
      sections: [
        { heading: 'Who we are (the data controller)', body: 'Omniviya is a restaurant operating system. For privacy queries, contact hello@omniviya.in. [Placeholder — add UK registered address / representative before launch.]' },
        { heading: 'What we collect', body: 'On this marketing site we collect only what you choose to share — for example, the message you send us via chat or by email — plus, with your consent, anonymised analytics about how the site is used.' },
        { heading: 'Lawful basis', body: 'We rely on your consent for analytics and marketing cookies, and on legitimate interests for responding to enquiries you initiate.' },
        { heading: 'How we use it', body: 'We use your details solely to respond to your enquiry and to improve the website. We do not sell personal data.' },
        { heading: 'Your rights under UK GDPR', body: 'You have the right to access, rectify, erase, restrict, and port your personal data, to object to processing, and to withdraw consent at any time. You may also complain to the Information Commissioner’s Office (ICO) at ico.org.uk.' },
        { heading: 'Cookies', body: 'See our Cookie Policy for details of the cookies we use and how to manage them.' },
      ],
    },
    cookieDoc: {
      title: 'Cookie Policy',
      updated: 'June 2026',
      intro:
         'This Cookie Policy explains the cookies used on the Omniviya website, in line with PECR and the UK GDPR. Non-essential cookies are only set after you give consent. This is placeholder copy pending legal review.',
      sections: sharedCookieSections,
    },
  },
}
