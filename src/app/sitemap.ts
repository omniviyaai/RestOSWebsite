import { MetadataRoute } from 'next'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { CITIES } from '@/lib/city-data'
import { COMPARISONS } from '@/lib/compare-data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omniviya.in'
  const entries: MetadataRoute.Sitemap = []

  // Core pages for both regions
  const corePages = ['', 'features', 'pricing', 'founding', 'about', 'demo', 'privacy', 'cookies']
  for (const region of ['in', 'uk'] as const) {
    for (const page of corePages) {
      const path = page ? `/${region}/${page}` : `/${region}`
      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date('2026-07-08'),
        changeFrequency: page ? 'monthly' as const : 'weekly' as const,
        priority: page ? 0.7 : 1.0,
      })
    }
  }

  // Blog index
  entries.push({
    url: `${baseUrl}/in/blog`,
    lastModified: new Date('2026-07-08'),
    changeFrequency: 'weekly',
    priority: 0.8,
  })

  // Blog articles
  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${baseUrl}/in/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  }

  // City landing pages
  for (const city of CITIES) {
    entries.push({
      url: `${baseUrl}/in/cities/${city.slug}`,
      lastModified: new Date('2026-07-08'),
      changeFrequency: 'monthly',
      priority: 0.75,
    })
  }

  // Competitor comparison pages
  for (const comp of COMPARISONS) {
    entries.push({
      url: `${baseUrl}/in/compare/${comp.slug}`,
      lastModified: new Date('2026-07-08'),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
