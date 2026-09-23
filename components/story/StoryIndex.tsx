import Link from 'next/link'
import { THEME_LABELS } from '@/lib/stories/themes'
import { formatYear } from '@/lib/format'
import type { Story } from '@/lib/stories/types'

/** Tabular index of stories. Each row links to the story. */
export default function StoryIndex({ stories, caption }: { stories: Story[]; caption: string }) {
  return (
    <table className="index">
      <caption className="sr-only">{caption}</caption>
      <thead className="index__head t-meta">
        <tr>
          <th scope="col">Story</th>
          <th scope="col" className="index__col--hide-sm">Athlete</th>
          <th scope="col" className="index__col--hide-sm">Theme</th>
          <th scope="col" style={{ textAlign: 'right' }}>Year</th>
        </tr>
      </thead>
      <tbody>
        {stories.map((story) => (
          <tr key={story.slug} className="index__row">
            <td>
              <span className="index__title">
                <Link href={`/testimony/${story.slug}`}>{story.title}</Link>
              </span>
              <span className="t-caption muted" style={{ display: 'block', marginTop: 'var(--space-1)' }}>
                <span className="index-inline-name">{story.name} · </span>
                {story.sport}
                {story.placeholder ? ' · Sample' : ''}
              </span>
            </td>
            <td className="index__col--hide-sm t-body">{story.name}</td>
            <td className="index__col--hide-sm t-body muted">
              {story.categories.map((c) => THEME_LABELS[c]).join(', ')}
            </td>
            <td className="t-body" style={{ textAlign: 'right' }}>
              {formatYear(story.date)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
