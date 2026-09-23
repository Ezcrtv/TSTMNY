import type { MetadataRoute } from 'next'
import { getStories } from '@/lib/stories/repository'
import { absoluteUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stories = await getStories()
  const pages = ['/', '/testimony', '/about', '/donate', '/contact'].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }))
  const storyPages = stories
    .filter((s) => !s.placeholder)
    .map((s) => ({ url: absoluteUrl(`/testimony/${s.slug}`), lastModified: s.date, priority: 0.7 }))
  return [...pages, ...storyPages]
}
