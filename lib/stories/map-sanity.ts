import type { Story, StoryBlock, Topic } from './types.ts'
import { topicsFor } from './topics.ts'

export const FALLBACK_IMAGE = '/images/stories/placeholder.svg'

/** Without a hotspot, favour the upper part of the photo, where faces usually are. */
export const DEFAULT_IMAGE_POSITION = '50% 30%'

type Hotspot = { x?: number; y?: number }

/** Sanity hotspot (0–1 from the top-left) → CSS object-position, so crops keep the subject in frame. */
function toPosition(hotspot?: Hotspot | null): string {
  if (typeof hotspot?.x !== 'number' || typeof hotspot?.y !== 'number') return DEFAULT_IMAGE_POSITION
  const pct = (n: number) => `${Math.round(Math.min(Math.max(n, 0), 1) * 100)}%`
  return `${pct(hotspot.x)} ${pct(hotspot.y)}`
}

type PortableBlock = {
  _type?: string
  style?: string
  children?: { text?: string }[]
}

export type SanityStoryDoc = {
  title?: string
  slug?: { current?: string }
  person?: { name?: string }
  /** Title of the referenced sport document. */
  sportTitle?: string
  /** Legacy free-text sport, used until the story is linked to a sport document. */
  sport?: string
  location?: string
  excerpt?: string
  shortDescription?: string
  quote?: string
  /** Referenced topic documents. */
  topics?: { slug?: string; title?: string }[] | null
  /** Legacy theme strings, used until the story is linked to topic documents. */
  categories?: string[]
  publishedAt?: string
  _createdAt?: string
  imageUrl?: string
  imageAlt?: string
  imageHotspot?: Hotspot | null
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
  const linked = (doc.topics ?? []).filter((t): t is Topic => Boolean(t?.slug && t.title))
  const topics = linked.length > 0 ? linked : topicsFor(doc.categories ?? [])
  const date = (doc.publishedAt ?? doc._createdAt ?? '').slice(0, 10)

  return {
    slug,
    name,
    sport: doc.sportTitle ?? doc.sport ?? '',
    location: doc.location ?? '',
    title: doc.title ?? '',
    excerpt,
    quote: doc.quote ?? '',
    image: {
      src: doc.imageUrl ?? FALLBACK_IMAGE,
      alt: doc.imageAlt ?? `Portrait of ${name}`,
      position: toPosition(doc.imageHotspot),
    },
    video: doc.videoUrl ? { url: doc.videoUrl } : undefined,
    body,
    topics,
    date,
    featured: doc.featured ?? false,
  }
}
