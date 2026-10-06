import type { Metadata } from 'next'
import Link from 'next/link'
import PageHead from '@/components/sections/PageHead'
import StoryTile from '@/components/story/StoryTile'
import StoryCard from '@/components/story/StoryCard'
import ThemeFilter from '@/components/story/ThemeFilter'
import { getStories } from '@/lib/stories/repository'
import { filterByTheme } from '@/lib/stories/filter'
import { THEME_LABELS, isTheme } from '@/lib/stories/themes'
import { THEMES, type Theme } from '@/lib/stories/types'

type Props = { searchParams: Promise<{ theme?: string | string[] }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { theme } = await searchParams
  const label = isTheme(theme) ? THEME_LABELS[theme] : null
  return {
    title: label ? `Stories of ${label.toLowerCase()}` : 'Stories',
    description:
      'The TSTMNY archive: filmed and written testimony from athletes about faith, discipline, identity, failure, and recovery.',
    alternates: { canonical: label ? `/testimony?theme=${theme}` : '/testimony' },
  }
}

export default async function TestimonyArchive({ searchParams }: Props) {
  const { theme: rawTheme } = await searchParams
  const theme = isTheme(rawTheme) ? rawTheme : undefined
  const stories = await getStories()
  const filtered = filterByTheme(stories, theme)

  const counts = Object.fromEntries(
    THEMES.map((t) => [t, stories.filter((s) => s.categories.includes(t)).length]),
  ) as Record<Theme, number>

  const [lead, ...rest] = theme ? [undefined, ...filtered] : filtered

  return (
    <>
      <PageHead
        eyebrow="The archive"
        title="Every story, told from outside the frame."
        aside={
          <p>
            Filmed and written testimony from athletes. Start anywhere — each one stands on its own.
          </p>
        }
      />

      <section className="container" aria-label="Filter">
        <div style={{ paddingBottom: 'var(--space-7)', borderBottom: '1px solid var(--color-border)' }}>
          <ThemeFilter active={theme} counts={counts} total={stories.length} />
        </div>
      </section>

      <section className="container section--tight" aria-labelledby="results-title">
        <h2 id="results-title" className="sr-only">
          {theme ? `Stories about ${THEME_LABELS[theme].toLowerCase()}` : 'All stories'}
        </h2>
        <p className="sr-only" role="status">
          {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
        </p>

        {lead && (
          <div style={{ marginBottom: 'var(--space-9)' }}>
            <StoryTile story={lead} ratio="cinema" sizes="100vw" priority headingLevel="h3" />
            <p className="t-body-lg muted" style={{ maxWidth: '40rem', marginTop: 'var(--space-5)' }}>
              {lead.excerpt}
            </p>
          </div>
        )}

        {rest.length > 0 && (
          <div className="cards cards--3">
            {rest.map((story) => story && <StoryCard key={story.slug} story={story} />)}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="stack-5" style={{ paddingBlock: 'var(--space-9)' }}>
            <p className="t-h2">No stories here yet.</p>
            <p className="t-body-lg muted">
              <Link href="/testimony" className="link">
                See every story
              </Link>{' '}
              or{' '}
              <Link href="/contact?reason=testimony" className="link">
                share one of your own
              </Link>
              .
            </p>
          </div>
        )}
      </section>

      <div style={{ paddingBottom: 'var(--section)' }} />
    </>
  )
}
