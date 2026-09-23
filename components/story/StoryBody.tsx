import Reveal from '@/components/ui/Reveal'
import type { StoryBlock } from '@/lib/stories/types'

/** Renders story blocks with editorial rhythm: first paragraph as a lede, pull quotes breaking the measure. */
export default function StoryBody({ blocks }: { blocks: StoryBlock[] }) {
  let paragraphIndex = 0

  return (
    <div className="story-body">
      {blocks.map((block, i) => {
        if (block.type === 'pullquote') {
          return (
            <Reveal as="blockquote" key={i} className="story-body__quote">
              <p className="pullquote">{block.text}</p>
            </Reveal>
          )
        }
        if (block.type === 'heading') {
          return (
            <h2 key={i} className="t-h3 story-body__heading">
              {block.text}
            </h2>
          )
        }
        const isLede = paragraphIndex++ === 0
        return (
          <p key={i} className={isLede ? 'story-body__lede' : 't-body-lg'}>
            {block.text}
          </p>
        )
      })}
    </div>
  )
}
