/**
 * Site-wide constants. Items marked PLACEHOLDER must be supplied before launch.
 */
export const site = {
  name: 'TSTMNY',
  /** The mission in one line. Shown in the hero and footer. */
  purpose: 'Real stories. Real faith. Real impact.',
  description:
    'TSTMNY is a nonprofit home for testimonies of what God has done — athletes and believers sharing real stories of faith so they can give hope, strengthen faith, and inspire others.',
  url: (process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  founded: '2026',
  basedIn: 'Switzerland',
  intro:
    'People sharing what God has done in their lives — so their testimony can give hope, strengthen faith, and inspire the next story.',
  locale: 'en_US',
}

/** The loop behind every testimony. Shown on the homepage. */
export const impactCycle = [
  { title: 'Someone shares', text: 'An athlete or everyday believer tells what God has done in their life.' },
  { title: 'Someone hears', text: 'A person who needs it finds that story — often at just the right moment.' },
  { title: 'Hope grows', text: 'It gives them hope, or strengthens a faith that was wavering.' },
  { title: 'The story continues', text: 'One day, their own testimony may be the one someone else needs to hear.' },
]

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
