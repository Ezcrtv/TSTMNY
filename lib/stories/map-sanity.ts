import type { Story, StoryBlock, Theme } from './types.ts'
import { isTheme } from './themes.ts'

export const FALLBACK_IMAGE = '/images/stories/placeholder.jpg'

type PortableBlock = {
  _type?: string
  style?: string
  children?: { text?: string }[]
}

export type SanityStoryDoc = {
  title?: string
  slug?: { current?: string }
  person?: { name?: string }
  sport?: string
  location?: string
  excerpt?: string
  shortDescription?: string
  quote?: string
  categories?: string[]
  publishedAt?: string
  _createdAt?: string
  imageUrl?: string
  imageAlt?: string
  videoUrl?: string
  featured?: boolean
  story?: PortableBlock[]
}

function toBlock(block: PortableBlock): StoryBlock | null {
  if (block._type !== 'block') return null
  const text = (block.children ?? []).map((child) => child.text ?? '').join('').trim()
  if (!text) return null
  if (block.style === 'blockquote') return { type: 'pullquote', text }
  if (block.style && /^h[1-6]$/.test(block.style)) return { type: 'heading', text }
  return { type: 'paragraph', text }
}

export function mapSanityStory(doc: SanityStoryDoc): Story | null {
  const slug = doc.slug?.current
  if (!slug) return null

  const name = doc.person?.name?.trim() || 'Unnamed'
  const body = (doc.story ?? []).map(toBlock).filter((b): b is StoryBlock => b !== null)
  const excerpt = doc.excerpt ?? doc.shortDescription ?? ''
  const categories = (doc.categories ?? []).filter(isTheme) as Theme[]
  const date = (doc.publishedAt ?? doc._createdAt ?? '').slice(0, 10)

  return {
    slug,
    name,
    sport: doc.sport ?? '',
    location: doc.location ?? '',
    title: doc.title ?? '',
    excerpt,
    quote: doc.quote ?? '',
    image: { src: doc.imageUrl ?? FALLBACK_IMAGE, alt: doc.imageAlt ?? `Portrait of ${name}` },
    video: doc.videoUrl ? { url: doc.videoUrl } : undefined,
    body,
    categories,
    date,
    featured: doc.featured ?? false,
  }
}
