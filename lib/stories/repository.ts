import { cache } from 'react'
import { client } from '@/sanity/lib/client'
import { mapSanityStory, type SanityStoryDoc } from './map-sanity.ts'
import { placeholderStories } from './placeholder-stories.ts'
import type { Story } from './types.ts'

const STORY_QUERY = `*[_type == "testimony" && status == "approved"] | order(coalesce(publishedAt, _createdAt) desc){
  _createdAt,
  title,
  slug,
  person,
  sport,
  location,
  excerpt,
  shortDescription,
  quote,
  categories,
  publishedAt,
  featured,
  videoUrl,
  story,
  "imageUrl": coalesce(thumbnail.asset->url, person.photo.asset->url),
  "imageAlt": thumbnail.alt
}`

/**
 * All published stories, newest first.
 * Reads Sanity when configured; falls back to local placeholder stories when
 * Sanity is unconfigured, unreachable, or has no approved stories yet.
 */
export const getStories = cache(async (): Promise<Story[]> => {
  if (!client) return placeholderStories

  try {
    const docs = await client.fetch<SanityStoryDoc[]>(STORY_QUERY, {}, { next: { revalidate: 60 } })
    const stories = docs.map(mapSanityStory).filter((s): s is Story => s !== null)
    return stories.length > 0 ? stories : placeholderStories
  } catch (error) {
    console.error('[stories] Sanity fetch failed, using placeholder stories.', error)
    return placeholderStories
  }
})

export async function getStory(slug: string): Promise<Story | undefined> {
  const stories = await getStories()
  return stories.find((story) => story.slug === slug)
}

/** Featured stories first, topped up with the newest so the homepage always has `count`. */
export async function getFeaturedStories(count = 2): Promise<Story[]> {
  const stories = await getStories()
  const featured = stories.filter((s) => s.featured)
  const rest = stories.filter((s) => !s.featured)
  return [...featured, ...rest].slice(0, count)
}
