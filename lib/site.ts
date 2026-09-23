/**
 * Site-wide constants. Items marked PLACEHOLDER must be supplied before launch.
 */
export const site = {
  name: 'TSTMNY',
  tagline: 'Stories of faith, discipline, and the moments nobody sees.',
  description:
    'TSTMNY is a nonprofit archive of real stories from athletes — faith, discipline, struggle, and purpose, told from outside the frame of the match.',
  url: (process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  founded: '2026',
  locale: 'en_US',
  ogImage: '/images/stories/story-06.jpg',
}

export const primaryNav = [
  { href: '/testimony', label: 'Stories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

export const supportLink = { href: '/donate', label: 'Support' } as const

/** PLACEHOLDER — add real profile URLs. Entries with an empty href are not rendered as links. */
export const socialLinks: { label: string; href: string }[] = [
  { label: 'Instagram', href: '' },
  { label: 'YouTube', href: '' },
]

/**
 * PLACEHOLDER — the homepage film. Leave `url` empty until a real film exists;
 * the player then shows a "film in production" state instead of a broken embed.
 * Accepts YouTube, Vimeo, or a direct .mp4/.webm URL (e.g. /videos/film.mp4).
 */
export const featuredFilm = {
  title: 'The quiet before',
  caption: 'A short documentary on the hours athletes spend alone before a match.',
  runtime: '',
  url: '',
  poster: '/images/stories/story-01.jpg',
  posterAlt: 'A bearded man in dark-rimmed glasses listens with a serious expression.',
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}
