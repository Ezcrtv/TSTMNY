import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import StoryImage from './StoryImage'
import SampleTag from './SampleTag'
import { formatYear } from '@/lib/format'
import type { Story } from '@/lib/stories/types'

type Props = {
  story: Story
  sizes?: string
  headingLevel?: 'h2' | 'h3'
}

/** Archive card: image above, editorial text below. */
export default function StoryCard({
  story,
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  headingLevel: Heading = 'h3',
}: Props) {
  return (
    <article>
      <Link href={`/testimony/${story.slug}`} className="card hover-zoom">
        <Reveal variant="media" className="media media--portrait">
          <StoryImage image={story.image} sizes={sizes} decorative />
        </Reveal>
        <div className="card__body">
          <p className="eyebrow">
            {[story.name, story.sport].filter(Boolean).join(' · ')}
          </p>
          <Heading className="card__title">{story.title}</Heading>
          <p className="t-body muted" style={{ maxWidth: '34rem' }}>
            {story.excerpt}
          </p>
          <p className="t-caption muted" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'center', marginTop: 'var(--space-2)' }}>
            {story.topics.slice(0, 2).map((t) => (
              <span key={t.slug} className="tag">
                {t.title}
              </span>
            ))}
            <span>{formatYear(story.date)}</span>
            {story.placeholder && <SampleTag />}
          </p>
        </div>
      </Link>
    </article>
  )
}
