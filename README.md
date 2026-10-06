# TSTMNY

Real stories. Real faith. Real impact. A nonprofit home for testimonies of what God has done — shared so they can give hope, strengthen faith, and inspire others.

Built with Next.js 16 (App Router), React 19, TypeScript, Sanity, Stripe Checkout, and Resend. No animation or UI libraries; the design system lives in `app/globals.css`.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values you have
npm run dev
```

The site runs without any environment variables: without Sanity configured, stories fall back to local placeholder content, and the donate/contact forms show a clear "not connected yet" message.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (`node:test`, no extra dependencies) |

## Environment

| Variable | Used by |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Story content, `/studio` |
| `SANITY_API_TOKEN` | Saving story submissions from `/contact` |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | `/api/stripe/checkout`, `/api/stripe/webhook` |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` | Contact and story submission emails |
| `NEXT_PUBLIC_BASE_URL` | Canonical URLs, sitemap, Stripe redirects |

## Structure

```
app/                  Routes: /, /about, /testimony, /testimony/[slug], /donate, /contact, /studio
components/
  layout/             Nav, Footer
  sections/           PageHead, CtaTriad
  story/              StoryTile, StoryCard, StoryIndex, StoryBody, PullQuote, StoryFilter, SampleTag
  media/              VideoFacade (click-to-load YouTube / Vimeo / file)
  forms/              ContactForm, DonateForm, Field
  ui/                 Reveal, ArrowLink, SectionLabel
lib/
  stories/            Story type, topics, filtering, Sanity mapping, repository, placeholder stories
  forms/              Contact validation, JSON submission helper
  donations.ts        Donation presets + provider call (swap here to change provider)
  site.ts             Site constants, nav, social links, featured film
sanity/               Studio schema (testimony, topic, sport, siteSettings)
public/images/        Images (stories/ holds temporary stand-ins)
public/videos/        Self-hosted video files (optional)
tests/                Unit tests
```

## Content

Testimonies come from Sanity (`testimony` documents with status **Approved**), linked to **Topic** and **Sport** documents that the team manages in Studio. Adding a new sport or topic is a Studio entry, not a code change. If Sanity isn't configured or can't be reached, `lib/stories/placeholder-stories.ts` is used instead. Once Sanity is connected, an empty dataset shows an empty archive. Placeholder stories are fictional, display a "Sample story" tag, are marked `noindex`, and are excluded from the sitemap and structured data.

See [docs/content-guide.md](docs/content-guide.md) for adding testimonies, sports, and topics, the approval workflow, and the plan for community testimonies.

## Before launch — still needed

- Logo / brand assets (the wordmark is set in Instrument Serif for now)
- Real athlete photography (≥ 2400px wide) and consented stories — the current images in `public/images/stories/` are temporary stand-ins
- Featured film URL and poster (`lib/site.ts → featuredFilm`)
- Social profile URLs (`lib/site.ts → socialLinks`)
- Nonprofit registration / EIN text on `/donate`
- Environment variables above for this deployment
