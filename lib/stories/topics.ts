import type { Topic } from './types.ts'

/**
 * Default topic list. Topics are managed in Sanity (Studio → Topic); this list
 * only sets the display order on the archive and labels local sample stories.
 * A topic created in Sanity that isn't listed here still works — it's shown
 * after these, alphabetically.
 */
export const DEFAULT_TOPICS: Topic[] = [
  { slug: 'faith', title: 'Faith' },
  { slug: 'purpose', title: 'Purpose' },
  { slug: 'identity', title: 'Identity' },
  { slug: 'injury', title: 'Injury' },
  { slug: 'failure', title: 'Failure' },
  { slug: 'family', title: 'Family' },
  { slug: 'health', title: 'Health' },
  { slug: 'addiction', title: 'Addiction' },
  { slug: 'breakthrough', title: 'Breakthrough' },
  { slug: 'recovery', title: 'Recovery' },
  { slug: 'discipline', title: 'Discipline' },
  { slug: 'leadership', title: 'Leadership' },
]

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Topics for the given slugs, labelled from the default list. */
export function topicsFor(slugs: string[]): Topic[] {
  return slugs.map((slug) => DEFAULT_TOPICS.find((t) => t.slug === slug) ?? { slug, title: titleCase(slug) })
}

function titleCase(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

/** Sort by the default order, then alphabetically for topics added in Sanity. */
export function compareTopics(a: Topic, b: Topic): number {
  const rank = (t: Topic) => {
    const i = DEFAULT_TOPICS.findIndex((d) => d.slug === t.slug)
    return i === -1 ? DEFAULT_TOPICS.length : i
  }
  return rank(a) - rank(b) || a.title.localeCompare(b.title)
}
