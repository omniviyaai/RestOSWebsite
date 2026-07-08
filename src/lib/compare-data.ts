export interface CompareData {
  slug: string
  competitor: string
  competitorType: string
  title: string
  description: string
  summary: string
  comparisonRows: { feature: string; us: string; them: string; winner: 'us' | 'them' | 'tie' }[]
  verdict: string
  bestFor: string
  worstFor: string
}

export const COMPARISONS: CompareData[] = [
  {
    slug: 'petpooja',
    competitor: 'Petpooja',
    competitorType: 'Traditional POS',
    title: 'Omniviya vs Petpooja — Restaurant Software Comparison India',
    description: 'Detailed comparison of Omniviya and Petpooja for Indian restaurants: pricing, hardware requirements, QR ordering, kitchen display, and ease of use.',
    summary:
      'Petpooja is one of India\'s most widely-used restaurant POS systems. It does a lot — but it comes with hardware requirements, complex onboarding, and a pricing model that can surprise you. Here is an honest comparison.',
    comparisonRows: [
      { feature: 'Setup time', us: 'Under 1 hour', them: '2–5 days (installation required)', winner: 'us' },
      { feature: 'Hardware required', us: 'None — use devices you own', them: 'Touchscreen terminal, printer, router package', winner: 'us' },
      { feature: 'Upfront cost', us: '₹0', them: '₹60,000–1,50,000+', winner: 'us' },
      { feature: 'Monthly subscription', us: 'Free–₹2,499/month', them: '₹1,500–4,000/month + AMC', winner: 'us' },
      { feature: 'Platform fee on orders', us: '0%', them: '0% (check your contract for add-ons)', winner: 'tie' },
      { feature: 'QR code ordering', us: 'Built in on all plans', them: 'Add-on, additional cost', winner: 'us' },
      { feature: 'Kitchen Display System', us: 'Built in', them: 'Available, hardware required', winner: 'us' },
      { feature: 'UPI payment integration', us: 'Native (Razorpay + Cashfree)', them: 'Available via integrations', winner: 'tie' },
      { feature: 'Works on own devices', us: 'Yes — any phone, tablet, laptop', them: 'Limited — primarily on dedicated hardware', winner: 'us' },
      { feature: 'Multi-branch support', us: 'All paid plans', them: 'Yes, with enterprise pricing', winner: 'tie' },
      { feature: 'Cloud kitchen support', us: 'Yes — built-in', them: 'Yes', winner: 'tie' },
      { feature: 'Analytics', us: 'Real-time, browser-based', them: 'Available, report-based', winner: 'us' },
      { feature: 'Support', us: 'Chat + WhatsApp', them: 'Phone, email, field technician', winner: 'tie' },
      { feature: 'Software updates', us: 'Automatic (cloud-based)', them: 'Manual or version-dependent', winner: 'us' },
    ],
    verdict:
      'Petpooja is a mature, feature-rich system that works well for restaurants with IT staff, dedicated hardware, and the budget for a traditional POS setup. Omniviya is the better choice for independent restaurants, cloud kitchens, and small chains that want to get started quickly, without hardware investment, and at lower cost.',
    bestFor: 'Large restaurant chains and hotels that have IT staff and need deep customisation',
    worstFor: 'Independent restaurants looking for fast, low-cost setup',
  },
  {
    slug: 'traditional-pos',
    competitor: 'Traditional POS Systems',
    competitorType: 'On-premise POS',
    title: 'Omniviya vs Traditional POS Systems — Which is Right for Your Restaurant?',
    description: 'How cloud-based restaurant management software compares to traditional POS hardware in India — cost, reliability, features, and the hidden costs of each.',
    summary:
      'Traditional POS systems (touchscreen terminals, receipt printers, dedicated hardware) have been the standard for Indian restaurants for 15 years. But the landscape has changed significantly. Here is an honest look at how the two approaches compare in 2026.',
    comparisonRows: [
      { feature: 'Initial cost', us: '₹0 hardware, ₹0 setup', them: '₹80,000–3,00,000 for hardware + installation', winner: 'us' },
      { feature: 'Monthly cost', us: '₹0–2,499/month subscription', them: '₹1,500–5,000/month subscription + AMC', winner: 'us' },
      { feature: 'Hardware failure risk', us: 'Low — replace a ₹10,000 tablet same day', them: 'High — proprietary terminals cost ₹40,000+ to replace', winner: 'us' },
      { feature: 'Software updates', us: 'Automatic, included', them: 'Manual, sometimes chargeable', winner: 'us' },
      { feature: 'QR ordering', us: 'Included', them: 'Add-on or separate product', winner: 'us' },
      { feature: 'Works offline', us: 'Partial (with cached data)', them: 'Full offline capability on most systems', winner: 'them' },
      { feature: 'Payment terminal integration', us: 'Software-based (UPI, card links)', them: 'Direct card swipe terminal integration', winner: 'tie' },
      { feature: 'Depth of integrations', us: 'Growing — delivery aggregators, accounting', them: 'Mature ecosystem with many integrations', winner: 'them' },
      { feature: 'Remote access', us: 'Full — any browser, any device', them: 'Limited — typically on-site only', winner: 'us' },
      { feature: 'Multi-branch consolidation', us: 'Real-time, cloud dashboard', them: 'Varies — often requires server setup', winner: 'us' },
      { feature: 'Support model', us: 'Chat/WhatsApp', them: 'Field technician (2–5 day SLA)', winner: 'us' },
      { feature: 'Staff training time', us: '1–2 hours', them: '1–3 days', winner: 'us' },
    ],
    verdict:
      'Traditional POS systems made sense when restaurants needed local processing, dedicated hardware for reliability, and deep integrations with legacy suppliers. In 2026, cloud-based restaurant management software solves all of these needs at a fraction of the cost — with the additional advantages of remote access, automatic updates, and hardware flexibility. The main remaining advantage of traditional POS is deep offline capability for restaurants with genuinely unreliable internet.',
    bestFor: 'Restaurants in areas with unreliable internet, or large chains with complex integration needs',
    worstFor: 'Independent restaurants, cloud kitchens, and restaurants looking to reduce overhead costs',
  },
]

export function getComparison(slug: string): CompareData | undefined {
  return COMPARISONS.find((c) => c.slug === slug)
}
