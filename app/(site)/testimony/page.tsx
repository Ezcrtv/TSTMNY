import type { Metadata } from 'next'
import Link from 'next/link'
import PageHead from '@/components/sections/PageHead'
import StoryTile from '@/components/story/StoryTile'
import StoryCard from '@/components/story/StoryCard'
import StoryFilter from '@/components/story/StoryFilter'
import { getStories } from '@/lib/stories/repository'
import { archiveHref, filterStories, sportOptions, topicOptions, type StoryFilters } from '@/lib/stories/filter'

type Props = { searchParams: Promise<{ topic?: string | string[]; sport?: string | string[] }> }

function single(value: string | string[] | undefined) {
  return typeof value === 'string' && value ? value : undefined
}

async function resolveFilters(searchParams: Props['searchParams']) {
  const params = await searchParams
  const stories = await getStories()
  const topics = topicOptions(stories)
  const sports = sportOptions(stories)
  const topic = topics.find((t) => t.slug === single(params.topic))
  const sport = sports.find((s) => s.slug === single(params.sport))
  return { stories, topic, sport, filters: { topic: topic?.slug, sport: sport?.slug } satisfies StoryFilters }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { topic, sport, filters } = await resolveFilters(searchParams)
  const label = [topic?.title, sport?.title].filter(Boolean).join(' · ')
  return {
    title: label ? `Testimonies: ${label}` : 'Testimonies',
    description:
      'The TSTMNY archive: filmed and written testimonies of what God has done — find one by topic, like faith, injury, or identity, or by sport.',
    alternates: { canonical: archiveHref(filters) },
  }
}

export default async function TestimonyArchive({ searchParams }: Props) {
  const { stories, topic, sport, filters } = await resolveFilters(searchParams)
  const filtered = filterStories(stories, filters)

  // Each row's counts respect the other row's selection.
  const byTopic = filterStories(stories, { topic: filters.topic })
  const bySport = filterStories(stories, { sport: filters.sport })
  const sports = sportOptions(byTopic)

  const isFiltered = Boolean(topic || sport)
  const [lead, ...rest] = isFiltered ? [undefined, ...filtered] : filtered
  const resultsLabel = [topic?.title, sport?.title].filter(Boolean).join(' · ')

  return (
    <>
      <PageHead
        eyebrow="Testimonies"
        title="What God has done, in their own words."
        aside={
          <p>
            Filmed and written testimonies of faith. Find one by topic or sport — each one stands on its own.
          </p>
        }
      />

      <section className="container" aria-label="Filter">
        <div style={{ paddingBottom: 'var(--space-7)', borderBottom: '1px solid var(--color-border)' }}>
          <StoryFilter param="topic" label="Topic" options={topicOptions(bySport)} active={filters} total={bySport.length} />
          {/* A sport row only helps once there's more than one sport to choose from. */}
          {(sports.length > 1 || sport) && (
            <StoryFilter param="sport" label="Sport" options={sports} active={filters} total={byTopic.length} />
          )}
        </div>
      </section>

      <section className="container section--tight" aria-labelledby="results-title">
        <h2 id="results-title" className="sr-only">
          {resultsLabel ? `Testimonies: ${resultsLabel}` : 'All testimonies'}
        </h2>
        <p className="sr-only" role="status">
          {filtered.length} {filtered.length === 1 ? 'testimony' : 'testimonies'}
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
            <p className="t-h2">No testimonies here yet.</p>
            <p className="t-body-lg muted">
              {isFiltered && (
                <>
                  <Link href="/testimony" className="link">
                    See every testimony
                  </Link>{' '}
                  or{' '}
                </>
              )}
              <Link href="/contact?reason=testimony" className="link">
                {isFiltered ? 'share your own' : 'Share your testimony'}
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
