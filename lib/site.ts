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
  basedIn: 'Switzerland',
  intro:
    'We’re building a calm, curated home for real stories of faith and discipline from athletes on and off the pitch. We’re just getting started, and the stories are already worth telling.',
  locale: 'en_US',
  ogImage: '/images/stories/story-06.jpg',
}

export const primaryNav = [
  { href: '/', label: 'Home' },
  { href: '/testimony', label: 'Testimonies' },
  { href: '/about', label: 'About' },
  { href: '/donate', label: 'Donation' },
] as const

export const contactLink = { href: '/contact', label: 'Contact' } as const

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

/** PLACEHOLDER — image behind the "All testimonies" link on the homepage. */
export const allTestimoniesImage = { src: '/images/stories/story-03.jpg', position: '70% 35%' }

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}
