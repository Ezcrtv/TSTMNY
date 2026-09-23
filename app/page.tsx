import type { CSSProperties } from 'react'
import ArrowLink from '@/components/ui/ArrowLink'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import StoryTile from '@/components/story/StoryTile'
import StoryIndex from '@/components/story/StoryIndex'
import PullQuote from '@/components/story/PullQuote'
import VideoFacade from '@/components/media/VideoFacade'
import CtaTriad from '@/components/sections/CtaTriad'
import { getFeaturedStories, getStories } from '@/lib/stories/repository'
import { featuredFilm, site } from '@/lib/site'

export default async function Home() {
  const [featured, stories] = await Promise.all([getFeaturedStories(2), getStories()])
  const quoteStory = stories.find((s) => s.quote && !featured.includes(s)) ?? stories[0]

  return (
    <>
      {/* Hero */}
      <section className="hero container" aria-labelledby="hero-title">
        <p className="hero__meta-top t-meta fade-in">
          <span>A storytelling archive</span>
          <span className="muted">Est. {site.founded}</span>
        </p>

        <div className="hero__lede">
          <p className="t-statement fade-in" style={{ '--fade-delay': '350ms' } as CSSProperties}>
            Stories of faith, discipline, and <em>the moments nobody sees.</em>
          </p>
          <p className="t-body muted fade-in" style={{ '--fade-delay': '550ms', maxWidth: '26rem' } as CSSProperties}>
            Real testimony from athletes — told from outside the frame of the match.
          </p>
        </div>

        <h1 id="hero-title" className="t-wordmark hero__wordmark">
          <span className="rise">
            <span>{site.name}</span>
          </span>
        </h1>

        <p className="hero__meta-bottom t-meta muted fade-in" style={{ '--fade-delay': '800ms' } as CSSProperties}>
          <span>Faith · Discipline · Identity · Purpose</span>
          <span aria-hidden="true">Scroll</span>
        </p>
      </section>

      {/* The moments nobody sees */}
      <section className="container section" aria-labelledby="intro-title">
        <div className="split">
          <div className="split__label">
            <SectionLabel index="01">Pull up a chair</SectionLabel>
          </div>
          <div className="split__body stack-6">
            <Reveal as="h2" id="intro-title" className="t-statement">
              Behind every hard-fought ninety minutes is a quiet morning of prayer you’ll never see on television.
              <span className="muted"> We’re here for those mornings.</span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Featured stories */}
      <section aria-labelledby="featured-title" style={{ paddingBottom: 'var(--section)' }}>
        <div className="container section-head">
          <h2 id="featured-title" className="eyebrow">
            Featured stories
          </h2>
          <ArrowLink href="/testimony">Explore all stories</ArrowLink>
        </div>
        <div className="container">
          <div className="tiles tiles--2">
            {featured.map((story, i) => (
              <StoryTile key={story.slug} story={story} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="theme-dark section" aria-labelledby="why-title">
        <div className="container split">
          <div className="split__label">
            <SectionLabel index="02">Why we exist</SectionLabel>
          </div>
          <div className="split__body stack-7">
            <Reveal as="h2" id="why-title" className="t-h1">
              The scoreboard tells you what happened. It rarely tells you why.
            </Reveal>
            <Reveal className="two-col t-body-lg muted" delay={120}>
              <p>
                Athletes are photographed at their loudest moments — the goal, the trophy, the celebration. The parts
                that shaped them happen somewhere else: early mornings, injuries, doubt, prayer, family, the long drive
                home.
              </p>
              <p>
                {site.name} is a nonprofit home for those stories. We film them, write them down, and keep them in one
                calm place — so someone who needs to hear one can find it.
              </p>
            </Reveal>
            <ArrowLink href="/about">Read our vision</ArrowLink>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      {quoteStory && (
        <section className="theme-surface section" aria-label="From the archive">
          <div className="container split">
            <div className="split__label">
              <SectionLabel index="03">In their words</SectionLabel>
            </div>
            <div className="split__body--narrow split__body stack-6">
              <PullQuote
                quote={quoteStory.quote}
                name={quoteStory.name}
                detail={`${quoteStory.sport}${quoteStory.placeholder ? ' · Sample story' : ''}`}
              />
              <ArrowLink href={`/testimony/${quoteStory.slug}`}>Read the story</ArrowLink>
            </div>
          </div>
        </section>
      )}

      {/* Film */}
      <section className="theme-dark section" aria-labelledby="film-title">
        <div className="container stack-6">
          <div className="section-head" style={{ paddingInline: 0 }}>
            <h2 id="film-title" className="eyebrow">
              04 — Film
            </h2>
            <p className="t-caption muted" style={{ maxWidth: '28rem' }}>
              {featuredFilm.caption}
            </p>
          </div>
          <Reveal variant="media">
            <VideoFacade
              url={featuredFilm.url}
              poster={featuredFilm.poster}
              posterAlt={featuredFilm.posterAlt}
              title={featuredFilm.title}
              label={featuredFilm.title}
            />
          </Reveal>
        </div>
      </section>

      {/* Archive index */}
      <section className="container section" aria-labelledby="index-title">
        <div className="split">
          <div className="split__label stack-4">
            <SectionLabel index="05">The archive</SectionLabel>
            <h2 id="index-title" className="t-h3">
              Every story, in one quiet place.
            </h2>
          </div>
          <div className="split__body stack-6">
            <StoryIndex stories={stories.slice(0, 6)} caption="Recent stories in the archive" />
            <ArrowLink href="/testimony">Browse the archive</ArrowLink>
          </div>
        </div>
      </section>

      <CtaTriad />
    </>
  )
}
