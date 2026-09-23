# TSTMNY Editorial Redesign — Design Spec

Date: 2026-09-22
Branch: `redesign`
Supersedes visual direction of `2026-06-12-tstmny-design.md`. Backend integrations (Sanity, Stripe, Resend) are preserved.

## Concept

"The moments nobody sees." A quiet editorial archive of athlete testimony. Voice: the Locker-Room Confidant — intimate, restrained, human. Emotional arc: curiosity → intimacy → reflection → connection → action.

Reference (noahmiles.framer.website) principles reused, not cloned: tiny three-part nav, giant wordmark hero with offset paragraph and corner metadata, two-up full-bleed tiles with overlaid titles, sticky small label + large indented text, index table, oversized headings over small-caps lists.

## Stack (unchanged)

Next.js 16 App Router, React 19, TypeScript, Tailwind 4 (utility use kept minimal; design system lives in CSS custom properties), Sanity 6, Stripe Checkout, Resend. No new runtime dependencies.

## Design system

- Fonts: Instrument Serif (display, statements, quotes) and Mona Sans (UI, body, meta) via `next/font/google`.
- Colors (semantic tokens in `app/globals.css`): paper `#EDE7DA`, paper-2 `#E2DACA`, ink `#141512`, olive `#263126`, olive-deep `#1B231C`, bone `#F6F4EE`, muted `#5E5F55`, hairline `rgb(20 21 18 / .14)`. Dark sections set `--color-*` overrides via `.theme-dark`.
- Type scale: fluid `clamp()` tokens — display, h1, h2, h3, eyebrow, body-lg, body, caption, meta, button.
- Spacing: 4px-based scale `--space-1..--space-12` plus section rhythm `--section`.
- Layout: `.container` (max 1680, fluid gutter), 12-col `.grid`, breakpoints 768 / 1024 / 1440.
- Radius: 0 by default, 2px for inputs, 999px for pills only.
- Components: Button (primary / ghost / link), TextLink (underline transition), Eyebrow, Meta, Tag, StoryTile, StoryIndex (table), PullQuote, VideoFacade, Reveal, SectionLabel, Field inputs.

## Information architecture

| Route | Purpose |
|---|---|
| `/` | Hero, featured tiles, mission, pull quote, video, index, CTA |
| `/about` | Opening, Why, Vision, Beliefs (4), closing |
| `/testimony` | Archive with theme filter (`?theme=`), lead story, grid |
| `/testimony/[slug]` | Story template, SSG, JSON-LD |
| `/donate` | Why, what it funds, amount form → Stripe |
| `/donate/success` | Thank you |
| `/contact` | Form → Resend |
| `/testimonies/*` | 308 redirect to `/testimony/*` |
| `/studio` | Sanity Studio (kept) |

Nav: TSTMNY · Stories · About · Contact · Support (CTA). Transparent over hero, solid after scroll, hides on scroll down. Mobile: full-screen menu.

CTA hierarchy: Read the story → Explore stories → Support the work → Share your story.

## Content model

```ts
type Story = {
  slug: string; name: string; sport: string; location: string;
  title: string; excerpt: string; quote: string;
  image: { src: string; alt: string };
  video?: { url: string; poster?: string; captions?: string };
  body: StoryBlock[]; // paragraph | pullquote | heading
  categories: Theme[]; date: string; featured?: boolean;
  placeholder?: boolean;
}
```

Themes: faith, discipline, identity, purpose, failure, recovery, leadership.

`lib/stories/repository.ts` fetches from Sanity when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set and returns mapped results; on missing env, error, or empty result it returns `lib/stories/placeholder-stories.ts`. Sanity `testimony` schema extended with sport, location, quote, excerpt, categories, date (legacy fields kept).

Placeholder stories use fictional names and carry `placeholder: true`, which renders a visible "Sample story" tag. Photos from `Images thumbnails/` are optimized into `public/images/stories/` and used as imagery only.

## Integrations

- Donate: existing Stripe route; returns 503 with clear message when `STRIPE_SECRET_KEY` missing. Stripe client instantiated lazily.
- Contact: Resend route extended with `organization`, `reason`; validation; 503 when not configured. Frontend in `components/forms/ContactForm.tsx`, submission handler isolated in `lib/forms/submit.ts`.

## Motion

No animation library. `Reveal` (IntersectionObserver adds `.is-in`), CSS clip/opacity reveals, image hover scale (1.03, 900ms), nav hide/show, CSS cross-document view transitions. All disabled under `prefers-reduced-motion`.

## Video

`VideoFacade`: poster + play button; on click mounts YouTube/Vimeo iframe (autoplay after user gesture) or native `<video controls>` with `<track>` captions. 16:9 aspect-ratio box, lazy poster.

## SEO

Per-page `metadata` (title template `%s — TSTMNY`), OG tags, `sitemap.ts`, `robots.ts`, JSON-LD Organization (layout) and Article/Person/VideoObject (story page).

## Accessibility

Semantic landmarks, skip link, one h1 per page, visible `:focus-visible` ring, labeled fields with `aria-describedby` errors and `aria-live` status, 44px touch targets, AA contrast.

## Testing / QA

`npm run build` + `npm run lint` pass. Browser QA at 1440, 1024, 768, 375: no horizontal overflow, keyboard traversal, reduced motion.

## Missing assets (to be supplied)

Logo, real athlete photography/video, real testimonies, social links, contact email, org address, Stripe/Resend/Sanity env keys for this checkout.
