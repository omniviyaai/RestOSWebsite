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
      headline: 'Customers wait for a waiter just to place an order',
      bullets: [
        'Customers feeling rushed into ordering quickly',
        'Wrong orders caused by miscommunication',
        'Staff spending valuable time writing down orders',
        'Long queues at counters during busy hours',
      ],
    },
    solution: {
      icon: '📱',
      headline: 'Customers order when they are ready',
      description: 'Every table gets its own QR code. Customers scan, browse your menu, customize their order, and pay from their own phone.',
      bullets: [
        'Customers order immediately when they are ready',
        'Customers see exactly what they are ordering before confirming',
        'Fewer ordering mistakes and fewer disputes',
        'Staff focus on hospitality instead of data entry',
        'Works for dine-in, takeaway, and staff-assisted orders',
      ],
    },
  },
  {
    id: 'kitchen',
    category: 'Kitchen',
    problem: {
      icon: '📝',
      headline: 'Lost paper tickets, illegible handwriting, frustrated kitchen',
      bullets: [
        'Lost paper KOTs that never reach the kitchen',
        'Illegible handwriting causing wrong dishes',
        'Waiters repeatedly asking the kitchen for updates',
        'Customers constantly asking "Where is my order?"',
      ],
    },
    solution: {
      icon: '🖥️',
      headline: 'Kitchen never misses an order',
      description: 'Every order appears on the kitchen display the moment it is placed. Color-coded by status. Timer shows how long each order has been waiting.',
      bullets: [
        'Orders arrive instantly in the kitchen with audio alert',
        'No paper tickets to lose ever again',
        'Orders over 10 minutes pulse amber, over 20 pulse red',
        'Special instructions highlighted so nothing gets missed',
        'Works on any tablet or TV you already own',
      ],
    },
  },
  {
    id: 'management',
    category: 'Management',
    problem: {
      icon: '🔄',
      headline: 'Jumping between multiple systems, guessing what is happening',
      bullets: [
        'Not knowing what is happening on the floor right now',
        'Time wasted updating menus manually across platforms',
        'Limited visibility into daily operations and staff performance',
        'No single source of truth for table status or reservations',
      ],
    },
    solution: {
      icon: '📊',
      headline: 'Run your entire restaurant from one screen',
      description: 'Orders, tables, revenue, staff, menus, reservations, and customer activity all managed from a single dashboard. Accessible from any device.',
      bullets: [
        'Full operational visibility from any phone, tablet, or laptop',
        'Menu updates go live instantly across all tables and online',
        'Better table management with open/close session control',
        'Staff management with role-based access controls',
        'Less manual work, more time focused on customers',
      ],
    },
  },
]

export const HERO_CONTENT = {
  headline: 'Everything Your Restaurant Needs',
  tagline: 'Less Waiting. Less Confusion. Less Hardware. More Revenue.',
}

export const TIMELINE_CONTENT = {
  headline: 'One Order. One Timeline. Visible To Everyone.',
  subtext: 'From customer phone to your dashboard, every step is connected.',
  nodes: [
    { id: 'ordering', label: 'Customer Phone', desc: 'Scans QR, browses menu', color: 'text-stone', accent: 'border-stone/40 bg-stone/5' },
    { id: 'ordering', label: 'QR Menu', desc: 'Orders instantly, no app', color: 'text-ember', accent: 'border-ember/40 bg-ember/5' },
    { id: 'ordering', label: 'Live Order', desc: 'Confirmed in real time', color: 'text-warm-white', accent: 'border-warm-white/30 bg-warm-white/5' },
    { id: 'kitchen', label: 'Kitchen Display', desc: 'Kitchen sees it immediately', color: 'text-teal', accent: 'border-teal/40 bg-teal/5' },
    { id: 'payment', label: 'Payment', desc: 'Settled from the table', color: 'text-gold', accent: 'border-gold/40 bg-gold/5' },
    { id: 'management', label: 'Admin Dashboard', desc: 'Full control, from anywhere', color: 'text-ember', accent: 'border-ember/30 bg-ember/5' },
    { id: 'analytics', label: 'Analytics', desc: 'Revenue and trends, live', color: 'text-teal', accent: 'border-teal/30 bg-teal/5' },
  ],
}

export const BYOD_CONTENT = {
  headline: 'The restaurant software that does not force you to buy hardware',
  subtext: 'Most restaurant systems want you to buy POS terminals, self-ordering kiosks, kitchen printers, and pager devices. RestOS works with what you already own.',
  bullets: [
    'Customers use their own phones to order and pay',
    'Staff use existing phones, tablets, or computers',
    'Kitchen uses existing tablets or TVs you already have',
    'No hardware lock-ins. No expensive setup costs.',
    'Easier staff training. Faster rollout.',
  ],
}

export const CTA_CONTENT = {
  headline: 'See all of this in your restaurant.',
}
