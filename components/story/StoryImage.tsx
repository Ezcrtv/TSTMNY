import Image from 'next/image'
import type { StoryImage as StoryImageType } from '@/lib/stories/types'

type Props = {
  image: StoryImageType
  sizes: string
  priority?: boolean
  /** Decorative when the surrounding link/heading already names the story. */
  decorative?: boolean
}

export default function StoryImage({ image, sizes, priority, decorative }: Props) {
  return (
    <Image
      src={image.src}
      alt={decorative ? '' : image.alt}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectPosition: image.position ?? '50% 50%' }}
    />
  )
}
