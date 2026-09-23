import Image from 'next/image'
import Link from 'next/link'
import type { Story } from '@/lib/stories/types'

/** Written testimonials: small portrait, name, sport, and the story's pull quote. */
export default function TestimonialList({ stories }: { stories: Story[] }) {
  return (
    <ul className="testimonials">
      {stories.map((story) => (
        <li key={story.slug} className="testimonial">
          <span className="testimonial__avatar">
            <Image
              src={story.image.src}
              alt=""
              fill
              sizes="40px"
              style={{ objectPosition: story.image.position ?? '50% 30%' }}
            />
          </span>
          <div className="testimonial__body">
            <p className="t-meta">
              <Link href={`/testimony/${story.slug}`} className="testimonial__link">
                {story.name}
              </Link>
            </p>
            <p className="t-caption muted">
              {[story.sport, story.location].filter(Boolean).join(' · ')}
              {story.placeholder && ' · Sample'}
            </p>
            <blockquote className="testimonial__quote">
              <p>“{story.quote}”</p>
            </blockquote>
          </div>
        </li>
      ))}
    </ul>
  )
}
