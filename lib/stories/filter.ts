import type { Story, Topic } from './types.ts'
import { compareTopics, slugify } from './topics.ts'

export type StoryFilters = { topic?: string; sport?: string }

/** Archive URL for a set of filters, e.g. /testimony?topic=faith&sport=football */
export function archiveHref(filters: StoryFilters = {}): string {
  const query = new URLSearchParams()
  if (filters.topic) query.set('topic', filters.topic)
  if (filters.sport) query.set('sport', filters.sport)
  const qs = query.toString()
  return qs ? `/testimony?${qs}` : '/testimony'
}

/** Stories matching every filter that's set. Unknown values simply match nothing. */
export function filterStories(stories: Story[], { topic, sport }: StoryFilters = {}): Story[] {
  return stories.filter(
    (story) =>
      (!topic || story.topics.some((t) => t.slug === topic)) &&
      (!sport || slugify(story.sport) === sport),
  )
}

export type FilterOption = Topic & { count: number }

/** Topics that have at least one story, in display order, with counts. */
export function topicOptions(stories: Story[]): FilterOption[] {
  const options = new Map<string, FilterOption>()
  for (const topic of stories.flatMap((s) => s.topics)) {
    const option = options.get(topic.slug) ?? { ...topic, count: 0 }
    option.count++
    options.set(topic.slug, option)
  }
  return [...options.values()].sort(compareTopics)
}

/** Sports that have at least one story, alphabetically, with counts. */
export function sportOptions(stories: Story[]): FilterOption[] {
  const options = new Map<string, FilterOption>()
  for (const title of stories.map((s) => s.sport).filter(Boolean)) {
    const slug = slugify(title)
    const option = options.get(slug) ?? { slug, title, count: 0 }
    option.count++
    options.set(slug, option)
  }
  return [...options.values()].sort((a, b) => a.title.localeCompare(b.title))
}

/** Other stories, those sharing the most topics first, then newest. */
export function relatedStories(stories: Story[], current: Story, limit = 3): Story[] {
  const currentTopics = new Set(current.topics.map((t) => t.slug))
  const shared = (story: Story) => story.topics.filter((t) => currentTopics.has(t.slug)).length

  return stories
    .filter((story) => story.slug !== current.slug)
    .map((story, index) => ({ story, score: shared(story), index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ story }) => story)
}
