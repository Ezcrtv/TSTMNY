import type { Story } from './types.ts'
import { isTheme } from './themes.ts'

export function filterByTheme(stories: Story[], theme?: string): Story[] {
  if (!isTheme(theme)) return stories
  return stories.filter((story) => story.categories.includes(theme))
}

/** Other stories, those sharing the most themes first, then newest. */
export function relatedStories(stories: Story[], current: Story, limit = 3): Story[] {
  const shared = (story: Story) =>
    story.categories.filter((c) => current.categories.includes(c)).length

  return stories
    .filter((story) => story.slug !== current.slug)
    .map((story, index) => ({ story, score: shared(story), index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ story }) => story)
}
