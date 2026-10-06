/** A topic (Faith, Injury, Family…) or sport. Managed in Sanity; `slug` is used in URLs. */
export type Topic = {
  slug: string
  title: string
}

export type StoryBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'pullquote'; text: string }
  | { type: 'heading'; text: string }

export type StoryImage = {
  src: string
  alt: string
  /** CSS object-position, used to keep the subject in frame when cropped. */
  position?: string
}

export type StoryVideo = {
  /** YouTube, Vimeo, or a direct file URL (.mp4 / .webm). */
  url: string
  poster?: string
  /** WebVTT captions file, used for direct video files. */
  captions?: string
}

export type Story = {
  slug: string
  name: string
  /** Display name of the sport, e.g. "Football". Empty when not set. */
  sport: string
  location: string
  title: string
  excerpt: string
  quote: string
  image: StoryImage
  video?: StoryVideo
  body: StoryBlock[]
  topics: Topic[]
  /** ISO date, YYYY-MM-DD */
  date: string
  featured?: boolean
  /** True for sample content that must be replaced before launch. */
  placeholder?: boolean
}
