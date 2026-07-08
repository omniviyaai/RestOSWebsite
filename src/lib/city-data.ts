export interface CityData {
  slug: string
  name: string
  state: string
  restaurants: string
  tagline: string
  description: string
  industries: string[]
  testimonial: { quote: string; name: string; restaurant: string; type: string }
  lat: string
  lng: string
}

export const CITIES: CityData[] = [
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    restaurants: '11,000+',
    tagline: 'Restaurant management software for Mumbai restaurants',
    description:
      "Mumbai's restaurant scene is one of the fastest in India — high footfall, slim margins, and customers who expect speed. Omniviya helps Mumbai restaurants manage QR ordering, kitchen display, and UPI payments without POS hardware.",
    industries: ['Dine-in', 'Quick Service Restaurants', 'Cloud Kitchens', 'Cafes', 'Multi-outlet chains'],
    testimonial: {
      quote:
        'We serve 300 covers a day in Bandra. Omniviya cut our average service time from 22 minutes to 11. No other software could handle our pace.',
      name: 'Priya Nair',
      restaurant: 'Spice Garden',
      type: 'Casual dining · Bandra, Mumbai',
    },
    lat: '19.0760',
    lng: '72.8777',
  },
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    restaurants: '9,000+',
    tagline: 'Restaurant management software for Bengaluru restaurants',
    description:
      "Bengaluru's tech-savvy diners expect QR menus and digital payments as standard. Omniviya gives Bengaluru restaurants the technology their customers already use at home — fast, mobile-first, and zero hardware.",
    industries: ['Cafes', 'Cloud Kitchens', 'Microbreweries', 'Fast Casual', 'Dine-in'],
    testimonial: {
      quote:
        "Indiranagar is competitive. Omniviya's analytics showed us our peak was 8–9pm on weekdays — we restructured our prep schedule around it and cut food waste by 30%.",
      name: 'Ravi Sharma',
      restaurant: 'The Tandoor House',
      type: 'Dine-in · Indiranagar, Bengaluru',
    },
    lat: '12.9716',
    lng: '77.5946',
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    state: 'Delhi NCR',
    restaurants: '14,000+',
    tagline: 'Restaurant management software for Delhi NCR restaurants',
    description:
      "Delhi NCR has one of India's highest concentrations of cloud kitchens and delivery-first restaurants. Omniviya helps Delhi restaurants manage multi-channel orders, kitchen display, and own-channel delivery — reducing delivery commission costs.",
    industries: ['Cloud Kitchens', 'Dine-in', 'QSR Chains', 'Dhabas', 'Multi-brand kitchens'],
    testimonial: {
      quote:
        'Running three brands from one kitchen in Noida was chaos before Omniviya. Now all orders hit one KDS — Swiggy, Zomato, and our own app. Night and day.',
      name: 'Amit Kumar',
      restaurant: 'Biryani Box Cloud Kitchen',
      type: 'Cloud kitchen · Noida, Delhi NCR',
    },
    lat: '28.6139',
    lng: '77.2090',
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    restaurants: '7,500+',
    tagline: 'Restaurant management software for Hyderabad restaurants',
    description:
      "Hyderabad's restaurant industry spans traditional dine-in, biryani QSRs, and a growing cloud kitchen segment. Omniviya gives Hyderabad restaurants a technology layer that works in Telugu and English — on any device.",
    industries: ['Dine-in', 'Biryani QSRs', 'Cloud Kitchens', 'Tiffin Centres', 'Cafes'],
    testimonial: {
      quote:
        'My staff learned the waiter app in one afternoon. After trying Petpooja for a year, Omniviya felt like a completely different generation of software.',
      name: 'Meena Krishnan',
      restaurant: 'South Indian Express',
      type: 'QSR · Banjara Hills, Hyderabad',
    },
    lat: '17.3850',
    lng: '78.4867',
  },
]

export function getCity(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug)
}
