export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: number
  category: string
  excerpt: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-qr-ordering-works-restaurants-india',
    title: 'How QR Code Ordering Works for Restaurants in India — A Complete Guide',
    description: 'Everything you need to know about QR code ordering for Indian restaurants: how it works, what equipment you need, and how to get started in one evening.',
    date: '2026-06-20',
    readTime: 6,
    category: 'Operations',
    excerpt:
      "QR ordering removes the friction between a customer's hunger and their order reaching your kitchen — no waiter needed. Here is exactly how the flow works in practice.",
  },
  {
    slug: 'restaurant-management-software-india-guide',
    title: 'Restaurant Management Software India — Complete 2026 Buyer\'s Guide',
    description: 'How to choose the right restaurant management software in India: key features to look for, what questions to ask vendors, and why most restaurants are over-paying.',
    date: '2026-06-28',
    readTime: 8,
    category: 'Buying Guide',
    excerpt:
      'Most Indian restaurant owners are either stuck with bloated traditional POS systems or piecing together four different apps. This guide cuts through the noise.',
  },
  {
    slug: 'cloud-kitchen-technology-software-guide',
    title: 'Cloud Kitchen Technology: What Software Do You Actually Need?',
    description: 'A practical guide to software for cloud kitchens and dark kitchens in India — from order aggregation and KDS to inventory and analytics.',
    date: '2026-07-01',
    readTime: 5,
    category: 'Cloud Kitchen',
    excerpt:
      'Cloud kitchens have different needs from dine-in restaurants. Here is the technology stack that actually makes sense — and what you can safely skip.',
  },
  {
    slug: 'upi-payments-restaurants-india-setup-guide',
    title: 'UPI Payments for Restaurants: How to Set Up and Avoid Common Mistakes',
    description: 'Step-by-step guide to accepting UPI payments in your restaurant — including Razorpay, Cashfree, and QR code setup — and the common pitfalls to avoid.',
    date: '2026-07-03',
    readTime: 5,
    category: 'Payments',
    excerpt:
      'UPI is how India pays. But setting it up correctly for a restaurant — with reconciliation, settlement tracking, and zero platform fees — requires a few decisions most owners get wrong.',
  },
  {
    slug: 'restaurant-without-traditional-pos-india',
    title: 'Running a Restaurant Without a Traditional POS in India — Is It Possible?',
    description: 'Can Indian restaurants operate without a ₹1–3 lakh POS system? We look at what POS hardware actually does, what you can replace it with, and what you cannot.',
    date: '2026-07-06',
    readTime: 7,
    category: 'Technology',
    excerpt:
      'Traditional POS machines cost ₹1–3 lakh upfront, need annual maintenance contracts, and break down at the worst possible moment. There is a better way.',
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
