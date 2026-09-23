export const THEMES = [
  'faith',
  'discipline',
  'identity',
  'purpose',
  'failure',
  'recovery',
  'leadership',
] as const

export type Theme = (typeof THEMES)[number]

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
  sport: string
  location: string
  title: string
  excerpt: string
  quote: string
  image: StoryImage
  video?: StoryVideo
  body: StoryBlock[]
  categories: Theme[]
  /** ISO date, YYYY-MM-DD */
  date: string
  featured?: boolean
  /** True for sample content that must be replaced before launch. */
  placeholder?: boolean
}
