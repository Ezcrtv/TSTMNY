import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'
import StoryTile from '@/components/story/StoryTile'
import TestimonialList from '@/components/story/TestimonialList'
import ImageLink from '@/components/sections/ImageLink'
import { getStories } from '@/lib/stories/repository'
import { allTestimoniesImage, site } from '@/lib/site'
import type { Story } from '@/lib/stories/types'

/**
 * Optional full-bleed interlude image (e.g. an empty pitch). Drop a file at
 * public/images/home/field.jpg and the section appears; until then it's skipped.
 */
const FIELD_IMAGE = '/images/home/field.jpg'
const hasFieldImage = fs.existsSync(path.join(process.cwd(), 'public', FIELD_IMAGE))

/** Tile rhythm from the reference: two, one wide, two. */
function layout(stories: Story[]) {
  return stories.slice(0, 5).map((story, i) => ({
    story,
    wide: i === 2,
  }))
}

export default async function Home() {
  const stories = await getStories()
  const tiles = layout(stories)
  const quoted = stories.filter((s) => s.quote).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero__block">
          <h1 id="hero-title" className="t-wordmark hero__wordmark">
            <span className="rise">
              <span>{site.name}</span>
            </span>
          </h1>
          <p className="hero__intro t-caption fade-in" style={{ '--fade-delay': '400ms' } as React.CSSProperties}>
            {site.intro}
          </p>
        </div>
      </section>

      {/* Stories */}
      <section aria-labelledby="works-title">
        <div className="container section-head">
          <h2 id="works-title" className="t-caption">
            Based in {site.basedIn}
          </h2>
          <span className="t-caption" aria-hidden="true">
            ↓
          </span>
        </div>
        <div className="container">
          <div className="tiles tiles--2">
            {tiles.map(({ story, wide }, i) => (
              <div key={story.slug} className={wide ? 'tiles__full' : undefined}>
                <StoryTile
                  story={story}
                  ratio={wide ? 'landscape' : 'tall'}
                  sizes={wide ? '100vw' : '(min-width: 768px) 50vw, 100vw'}
                  priority={i < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container section" aria-labelledby="about-title">
        <div className="split">
          <div className="split__label">
            <h2 id="about-title" className="t-meta">
              About
            </h2>
          </div>
          <div className="split__body--half split__body stack-7">
            <Reveal className="about-statement stack-5">
              <p>
                <strong>{site.name}</strong> was founded with one singular, unwavering mission:{' '}
                <strong>to share authentic, powerful testimonies that point people directly to Jesus Christ.</strong>
              </p>
              <p>
                We believe that a personal story of faith is one of the most undeniable forces on earth. Because of
                this, every testimony we produce and share is offered <strong>completely free</strong> — to the people
                who trust us to film their stories, and to everyone watching around the world.
              </p>
            </Reveal>
            <Reveal variant="media" className="media media--portrait about-image">
              <Image
                src="/images/stories/story-06.jpg"
                alt="A goalkeeper kneels on the pitch with his gloved hands open in prayer."
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {hasFieldImage && (
        <Reveal variant="media" className="media media--cinema">
          <Image src={FIELD_IMAGE} alt="" fill sizes="100vw" />
        </Reveal>
      )}

      {/* Written testimonials */}
      {quoted.length > 0 && (
        <section className="container section" aria-labelledby="written-title">
          <div className="split">
            <div className="split__label stack-4">
              <h2 id="written-title" className="t-meta">
                Written testimonials
              </h2>
              <p className="t-caption muted" style={{ maxWidth: '20rem' }}>
                In their own words — short reflections from athletes on faith, doubt, and what carried them.
              </p>
            </div>
            <div className="split__body--half split__body">
              <TestimonialList stories={quoted} />
            </div>
          </div>
        </section>
      )}

      <ImageLink href="/testimony" label="All testimonies" image={allTestimoniesImage} />
    </>
  )
}
