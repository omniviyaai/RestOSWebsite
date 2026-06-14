import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omniviya.in'
  const pages = ['', 'features', 'pricing', 'founding', 'about', 'demo', 'privacy', 'cookies']
  const entries: MetadataRoute.Sitemap = []

  for (const region of ['in', 'uk'] as const) {
    for (const page of pages) {
      const path = page ? `/${region}/${page}` : `/${region}`
      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: page ? 'monthly' as const : 'weekly' as const,
        priority: page ? 0.7 : 1.0,
      })
    }
  }

  return entries
}