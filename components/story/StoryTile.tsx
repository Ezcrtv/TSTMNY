import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import StoryImage from './StoryImage'
import SampleTag from './SampleTag'
import type { Story } from '@/lib/stories/types'

type Props = {
  story: Story
  ratio?: 'portrait' | 'tall' | 'landscape' | 'cinema' | 'square'
  sizes?: string
  priority?: boolean
  headingLevel?: 'h2' | 'h3'
}

/** Full-bleed image tile: athlete name bottom-left, one-line story title bottom-right. */
export default function StoryTile({
  story,
  ratio = 'portrait',
  sizes = '(min-width: 768px) 50vw, 100vw',
  priority,
  headingLevel: Heading = 'h3',
}: Props) {
  return (
    <Link href={`/testimony/${story.slug}`} className="tile hover-zoom">
      <Reveal variant="media" className={`media media--${ratio}`}>
        <StoryImage image={story.image} sizes={sizes} priority={priority} decorative />
      </Reveal>
      <span className="tile__shade" aria-hidden="true" />
      {story.placeholder && <SampleTag className="tile__sample" />}
      <span className="tile__caption">
        <Heading className="tile__title">{story.name}</Heading>
        <span className="tile__meta">{story.title}</span>
      </span>
    </Link>
  )
}
