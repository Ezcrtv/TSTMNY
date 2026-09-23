import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'
import StoryImage from './StoryImage'
import SampleTag from './SampleTag'
import type { Story } from '@/lib/stories/types'

type Props = {
  story: Story
  ratio?: 'portrait' | 'landscape' | 'cinema'
  sizes?: string
  priority?: boolean
  headingLevel?: 'h2' | 'h3'
}

/** Full-bleed image tile with the title laid over the bottom-left and athlete details on the right. */
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
        <StoryImage image={story.image} sizes={sizes} priority={priority} />
      </Reveal>
      <span className="tile__shade" aria-hidden="true" />
      {story.placeholder && <SampleTag className="tile__sample" />}
      <span className="tile__caption">
        <Heading className="tile__title">{story.title}</Heading>
        <span className="tile__meta">
          {story.name}
          <br />
          <span className="muted-on-image">{story.sport}{story.location ? ` · ${story.location}` : ''}</span>
        </span>
      </span>
    </Link>
  )
}
