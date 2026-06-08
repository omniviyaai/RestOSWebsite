import type { Region } from './region-config'
import { regionConfig } from './region-config'

export interface FeatureProblem {
  icon: string
  headline: string
  bullets: string[]
}

export interface FeatureSolution {
  icon: string
  headline: string
  description: string
  bullets: string[]
}

export interface FeatureSection {
  id: string
  category: string
  problem: FeatureProblem
  solution: FeatureSolution
}

export const FEATURE_SECTIONS: FeatureSection[] = [
  {
    id: 'ordering',
    category: 'Ordering',
    problem: {
      icon: '⏳',
      headline: 'Wrong orders cost you money. Slow service costs you customers.',
      bullets: [
        'Customers wait for a waiter just to place an order',
        'Orders get misheard, then remade — wasting food',
        'Staff writes orders instead of serving or hosting',
        'Rush hour becomes chaos instead of profit',
      ],
    },
    solution: {
      icon: '📱',
      headline: 'Customers order from their phone. Your kitchen gets it instantly.',
      description: 'Every table gets a QR code. Customers scan, browse your menu, customise, and order. No waiter needed for the first step.',
      bullets: [
        'Customers order at their own pace, no pressure',
        'They see exactly what they ordered before confirming',
        'Fewer mistakes, fewer remakes, less waste',
        'Staff focuses on hospitality, not data entry',
        'Works for dine-in, takeaway, and staff-assisted orders',
      ],
    },
  },
  {
    id: 'kitchen',
    category: 'Kitchen',
    problem: {
      icon: '📝',
      headline: 'Lost tickets. Burnt dishes. Furious customers.',
      bullets: [
        'Paper KOTs get lost or thrown away by mistake',
        'Handwriting is illegible — wrong dishes go out',
        'Kitchen has no idea which order is urgent',
        'Waiters keep walking back to ask "Is it ready?"',
      ],
    },
    solution: {
      icon: '🖥️',
      headline: 'Every order reaches the kitchen. Instantly.',
      description: 'Orders appear on the kitchen display the moment they are placed. Colour-coded by status. Timer shows how long each order has been waiting.',
      bullets: [
        'Orders arrive with an audio alert — no checking required',
        'Timer turns amber at 10 minutes, red at 20',
        'Special instructions highlighted so nothing is missed',
        'No paper tickets to lose, ever',
        'Works on any tablet or TV you already own',
      ],
    },
  },
  {
    id: 'payment',
    category: 'Payments',
    problem: {
      icon: '💳',
      headline: 'Customers wait for the bill. You run card machines. Revenue walks out.',
      bullets: [
        'Customers sit idle waiting for the bill after their meal',
        'Staff runs between tables with card machines',
        'Queues form at the counter during peak hours',
        'Some customers leave without paying — lost revenue',
      ],
    },
    solution: {
      icon: '📱',
      headline: 'Customers pay from their phone. Tables turn faster.',
      description: 'Every bill is digital. Customers see their bill on their phone, split it with their group, and pay with any method — UPI, card, or cash.',
      bullets: [
        'Customers pay themselves using QR/UPI from their phone',
        'No card machines need to reach their table',
        'Split bills between friends, no mental math',
        'Fast, secure settlements tracked in real time',
        'Every rupee is accounted for',
      ],
    },
  },
  {
    id: 'analytics',
    category: 'Analytics',
    problem: {
      icon: '📉',
      headline: 'You guess what sells. You staff blind. You lose money.',
      bullets: [
        'You guess which dishes are actually profitable',
        'You overstaff on slow days and understaff during rushes',
        "You don't know where your revenue comes from",
        'Business decisions made on vibes, not data',
      ],
    },
    solution: {
      icon: '📊',
      headline: 'Know exactly what makes money. And what does not.',
      description: 'Live revenue tracking, best-seller reports, peak hour patterns, and profit per dish. Real data you can act on.',
      bullets: [
        'See which dishes earn the most, in real time',
        'Know your peak hours so you staff perfectly',
        'Revenue breakdown: dine-in vs takeaway vs delivery',
        'Export-ready reports for accounting and GST',
        'Data refreshes live — no waiting for end of day',
      ],
    },
  },
  {
    id: 'management',
    category: 'Management',
    problem: {
      icon: '🔄',
      headline: 'Costly hardware. Vendor lock-in. Painful switching.',
      bullets: [
        'POS terminals cost ₹30,000–₹1,00,000 each',
        'Self-ordering kiosks cost lakhs to install',
        'Vibrating pagers break and need replacing',
        'Once you buy in, switching is impossible',
      ],
    },
    solution: {
      icon: '📊',
      headline: 'Run your whole restaurant from any device you already own.',
      description: 'Orders, tables, revenue, staff, and menu — all managed from a single dashboard on any phone, tablet, or laptop.',
      bullets: [
        'Full control from any device, anywhere',
        'Menu changes go live instantly at every table',
        'Open and close tables with one tap',
        'Staff access controls for different roles',
        'Zero hardware to buy, install, or maintain',
      ],
    },
  },
]

export const HERO_CONTENT = {
  headline: 'Everything Your Restaurant Needs. In One System.',
  tagline: 'Less Waiting. Less Confusion. Less Hardware. More Revenue.',
  description: 'RestOS connects customers, waiters, kitchen staff, and management on a single platform. From the moment a guest walks in to the moment they leave, every step is faster, clearer, and more profitable.',
}

export const TIMELINE_CONTENT = {
  headline: 'One Order. Visible To Everyone.',
  subtext: 'Four touchpoints. One connected system. Your whole team stays in sync.',
  nodes: [
    { id: 'ordering', label: 'Customer Phone', icon: 'phone', desc: 'Scan QR, browse menu, order, pay', color: 'text-warm-white' },
    { id: 'management', label: 'Waiter App', icon: 'waiter', desc: 'Live order updates, table status, floor alerts', color: 'text-ember' },
    { id: 'kitchen', label: 'Kitchen Display', icon: 'monitor', desc: 'Orders appear instantly, colour-coded, timed', color: 'text-teal' },
    { id: 'analytics', label: 'Analytics & Dashboard', icon: 'chart', desc: 'Revenue, orders, tables, trends — all live', color: 'text-gold' },
  ],
}

export const BYOD_CONTENT = {
  headline: 'No hardware to buy. No installation fees. No lock-in.',
  subtext: 'RestOS works on devices you already own — phones, tablets, laptops, and TVs. Everything a POS system does, without the POS system cost.',
  comparisons: [
    { item: 'POS terminals', oldWay: '₹30,000 – ₹1,00,000 each', newWay: 'Not needed' },
    { item: 'Self-ordering kiosks', oldWay: '₹1,50,000 – ₹5,00,000 each', newWay: 'Not needed' },
    { item: 'Kitchen printers', oldWay: '₹15,000 – ₹40,000 each', newWay: 'Not needed' },
    { item: 'Vibrating pagers', oldWay: '₹5,000 – ₹15,000 each', newWay: 'Not needed' },
    { item: 'Setup & training', oldWay: 'Weeks of installation and training', newWay: 'Hours, not days' },
  ],
}

export const CTA_CONTENT = {
  headline: 'Built For Modern Restaurants',
}

export interface FAQItem {
  q: string
  a: string
}

export const FAQ_CONTENT = {
  headline: 'Restaurant tech questions, answered in plain English',
  questions: [
    {
      q: 'What is RestOS?',
      a: 'RestOS is restaurant management software that runs in a browser. It replaces traditional POS hardware with QR code ordering, a kitchen display system, digital payments, and real-time analytics. Everything works on devices your restaurant already owns — phones, tablets, laptops, and TVs. There is no hardware to buy, no complex installation, and no long-term contract.',
    },
    {
      q: 'Do I need to buy any hardware?',
      a: 'No. RestOS works on any device with a browser — your existing smartphones, tablets, laptops, and TVs. There are no POS terminals to buy, no self-ordering kiosks to install, and no kitchen printers to maintain. Restaurants typically already have everything they need to get started.',
    },
    {
      q: 'How does QR code ordering actually work?',
      a: 'Each table in your restaurant gets a unique QR code. When a customer scans it with their phone camera, they see your full menu. They can browse items, customise their order, and send it directly to the kitchen — all without waiting for a waiter. The kitchen receives the order instantly on its display screen.',
    },
    {
      q: 'Can customers pay from their phone?',
      a: 'Yes. Customers can view their bill, split it with their group, and pay using UPI, credit or debit card. The payment is processed directly from their phone — no card machine needs to reach their table. Cash payments are also supported and tracked in the system.',
    },
    {
      q: 'Is RestOS suitable for small restaurants?',
      a: 'Yes. RestOS works for restaurants of any size — from a 10-table cafe to a 100-table fine dining restaurant. There are no minimum commitments, and you only pay for what you use. Small restaurants benefit the most because RestOS eliminates the hardware costs that make traditional POS systems unaffordable.',
    },
    {
      q: 'How long does setup take?',
      a: 'Most restaurants go live within 48 hours. Upload your menu (or we can do it for you), print QR codes for your tables, connect a display in the kitchen — and you are ready to take orders. No onsite installation or training sessions are required.',
    },
    {
      q: 'What analytics does RestOS provide?',
      a: 'RestOS tracks everything that matters: real-time revenue, best-selling dishes, profit per dish, peak hour patterns, dine-in vs takeaway split, and staffing needs. All data updates live and can be exported for accounting and GST filing. You get reports you can act on, not just charts to look at.',
    },
    {
      q: 'How do I update my menu?',
      a: 'Menu changes are made from the RestOS dashboard. Add, remove, or change prices on any item, and the update goes live instantly across all QR codes — every table sees the new menu immediately. No reprinting of physical menus required.',
    },
    {
      q: 'Does RestOS support table management?',
      a: 'Yes. RestOS tracks every table in your restaurant — open, occupied, or reserved. You can see table status at a glance from the dashboard, open and close sessions, and manage floor layout. The waiter app shows real-time table status so staff always knows which tables need attention.',
    },
    {
      q: 'How is RestOS different from a traditional POS system?',
      a: 'Traditional POS systems require expensive hardware, onsite installation, and long-term contracts. RestOS runs entirely on devices you already own. There is no hardware to buy, no software to install, and no lengthy training required. Updates and maintenance are handled automatically — nothing for you to manage.',
    },
  ],
}

/**
 * Feature sections with region-correct payment, management, and analytics copy.
 * Single source of truth — components MUST use this instead of patching FEATURE_SECTIONS inline.
 */
export function getFeatureSections(region: Region): FeatureSection[] {
  const cfg = regionConfig[region]
  const ecosystem = cfg.paymentEcosystemDesc.replace(/\s*—.*$/, '').toLowerCase()
  return FEATURE_SECTIONS.map((section) => {
    if (section.id === 'payment') {
      return {
        ...section,
        solution: {
          ...section.solution,
          description: `Every bill is digital. Customers see their bill on their phone, split it with their group, and pay with any method — ${ecosystem}.`,
          bullets: [
            'Customers pay directly from their phone',
            'No card machines need to reach their table',
            'Split bills between friends, no mental math',
            'Fast, secure settlements tracked in real time',
            `Every ${cfg.paymentCurrencyTerm} is accounted for`,
          ],
        },
      }
    }
    if (section.id === 'management') {
      return {
        ...section,
        problem: {
          ...section.problem,
          bullets: [
            `POS terminals cost ${cfg.byodComparisons[0].oldWay}`,
            'Self-ordering kiosks cost a fortune to install',
            'Vibrating pagers break and need replacing',
            'Once you buy in, switching is impossible',
          ],
        },
      }
    }
    if (section.id === 'analytics') {
      return {
        ...section,
        solution: {
          ...section.solution,
          bullets: section.solution.bullets.map((b) => b.replace(/\bGST\b/g, cfg.taxTerm)),
        },
      }
    }
    return section
  })
}

/** FAQ content with region-correct payment and tax answers. */
export function getFaqContent(region: Region): typeof FAQ_CONTENT {
  const cfg = regionConfig[region]
  return {
    ...FAQ_CONTENT,
    questions: FAQ_CONTENT.questions.map((item) => {
      if (item.q === 'Can customers pay from their phone?') {
        return {
          ...item,
          a: `Yes. Customers can view their bill, split it with their group, and pay using ${cfg.paymentPhrase}. The payment is processed directly from their phone — no card machine needs to reach their table. Cash payments are also supported and tracked in the system.`,
        }
      }
      if (item.q.startsWith('What analytics')) {
        return { ...item, a: item.a.replace(/\bGST\b/g, cfg.taxTerm) }
      }
      return item
    }),
  }
}


