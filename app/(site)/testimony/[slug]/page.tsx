import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import StoryImage from '@/components/story/StoryImage'
import StoryBody from '@/components/story/StoryBody'
import StoryCard from '@/components/story/StoryCard'
import SampleTag from '@/components/story/SampleTag'
import VideoFacade from '@/components/media/VideoFacade'
import ArrowLink from '@/components/ui/ArrowLink'
import Reveal from '@/components/ui/Reveal'
import JsonLd from '@/components/seo/JsonLd'
import { getStories, getStory } from '@/lib/stories/repository'
import { archiveHref, nextStory, relatedStories } from '@/lib/stories/filter'
import { formatDate } from '@/lib/format'
import { absoluteUrl, site } from '@/lib/site'
import type { Story } from '@/lib/stories/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const stories = await getStories()
  return stories.map((story) => ({ slug: story.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = await getStory(slug)
  if (!story) return {}

  const path = `/testimony/${story.slug}`
  return {
    title: `${story.title} — ${story.name}`,
    description: story.excerpt,
    alternates: { canonical: path },
    // Sample stories are fictional; keep them out of search results.
    robots: story.placeholder ? { index: false, follow: true } : undefined,
    openGraph: {
      type: 'article',
      url: path,
      title: story.title,
      description: story.excerpt,
      publishedTime: story.date,
      images: [{ url: story.image.src, alt: story.image.alt }],
    },
  }
}

function structuredData(story: Story) {
  const url = absoluteUrl(`/testimony/${story.slug}`)
  const person = { '@type': 'Person', name: story.name, ...(story.sport && { knowsAbout: story.sport }) }
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    description: story.excerpt,
    datePublished: story.date,
    image: absoluteUrl(story.image.src),
    url,
    mainEntityOfPage: url,
    about: person,
    publisher: { '@type': 'NGO', name: site.name, url: absoluteUrl('/') },
    ...(story.video && {
      video: {
        '@type': 'VideoObject',
        name: story.title,
        description: story.excerpt,
        thumbnailUrl: absoluteUrl(story.video.poster ?? story.image.src),
        uploadDate: story.date,
        contentUrl: story.video.url,
      },
    }),
  }
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params
  const [story, stories] = await Promise.all([getStory(slug), getStories()])
  if (!story) notFound()

  // The closest match is offered as "watch another"; the rest fill the grid below.
  // Advance through testimonies in order; keep related stories for the grid below.
  const next = nextStory(stories, story)
  const more = relatedStories(stories, story, 4).filter(
    (related) => related.slug !== next?.slug,
  )
  const meta = [
    { label: 'Athlete', value: story.name },
    { label: 'Sport', value: story.sport },
    { label: 'Location', value: story.location },
    { label: 'Published', value: formatDate(story.date) },
  ].filter((m) => m.value)

  return (
    <article>
      {!story.placeholder && <JsonLd data={structuredData(story)} />}

      <header className="container story-hero">
        <p className="eyebrow fade-in" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', alignItems: 'center' }}>
          <Link href="/testimony" className="link link--reveal">
            Testimonies
          </Link>
          <span aria-hidden="true">/</span>
          <span>{story.topics.map((t) => t.title).join(', ') || 'Testimony'}</span>
          {story.placeholder && <SampleTag />}
        </p>

        <h1 className="t-display" style={{ marginTop: 'var(--space-6)', maxWidth: '14ch' }}>
          <span className="rise">
            <span>{story.title}</span>
          </span>
        </h1>

        <p className="t-body-lg muted fade-in" style={{ marginTop: 'var(--space-6)', maxWidth: '40rem', '--fade-delay': '300ms' } as React.CSSProperties}>
          {story.excerpt}
        </p>

        <dl className="story-meta t-body" style={{ marginTop: 'var(--space-8)' }}>
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="eyebrow">{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="container" style={{ marginTop: 'var(--space-5)' }}>
        {story.video ? (
          <VideoFacade
            url={story.video.url}
            poster={story.video.poster ?? story.image.src}
            posterAlt={story.image.alt}
            title={`${story.title} — ${story.name}`}
            label={story.name}
            captions={story.video.captions}
          />
        ) : (
          <Reveal variant="media" className="media media--cinema">
            <StoryImage image={story.image} sizes="100vw" priority />
          </Reveal>
        )}
      </div>

      <section className="container section" aria-label="Story">
        <div className="story-layout">
          <aside className="story-layout__aside stack-5" aria-label="About this story">
            <div className="stack-4">
              <p className="eyebrow">Told by</p>
              <p className="serif" style={{ fontSize: 'var(--text-h3)', lineHeight: 1.1 }}>
                {story.name}
              </p>
              <p className="t-caption muted">{[story.sport, story.location].filter(Boolean).join(' · ')}</p>
            </div>
            {story.topics.length > 0 && (
              <div className="stack-4">
                <p className="eyebrow">Topics</p>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {story.topics.map((t) => (
                    <li key={t.slug}>
                      <Link href={archiveHref({ topic: t.slug })} className="tag">
                        {t.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {story.placeholder && (
              <p className="t-caption muted">
                This is a fictional sample used to preview the layout. Real testimony will replace it.
              </p>
            )}
          </aside>
          <div className="story-layout__body">
            <StoryBody blocks={story.body} />
          </div>
        </div>
      </section>

      {/* Keep people watching: the next testimony comes first, sharing and support after. */}
      <section className="theme-dark section" aria-labelledby="next-title">
        <div className="container split">
          <div className="split__label">
            <p className="eyebrow">Before you go</p>
          </div>
          <div className="split__body stack-6">
            <h2 id="next-title" className="t-h1" style={{ maxWidth: '18ch' }}>
              One testimony can inspire the next.
            </h2>
            {next && (
              <p className="t-body-lg muted" style={{ maxWidth: '36rem' }}>
                Up next: {next.name} — {next.title}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center' }}>
              <ArrowLink href={next ? `/testimony/${next.slug}` : '/testimony'} variant="primary">
                {next ? 'Watch another testimony' : 'See all testimonies'}
              </ArrowLink>
              <ArrowLink href="/contact?reason=testimony">Share your testimony</ArrowLink>
              <ArrowLink href="/donate">Support {site.name}</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="container section" aria-labelledby="related-title">
          <div className="section-head" style={{ paddingInline: 0, paddingBottom: 'var(--space-7)' }}>
            <h2 id="related-title" className="t-h2">
              More testimonies
            </h2>
            <ArrowLink href="/testimony">All testimonies</ArrowLink>
          </div>
          <div className="cards cards--3">
            {more.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
