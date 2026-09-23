# TSTMNY Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the TSTMNY site as a quiet editorial storytelling archive per `docs/superpowers/specs/2026-09-22-tstmny-editorial-redesign-design.md`.

**Architecture:** Keep Next.js 16 App Router + Sanity + Stripe + Resend. Add a story repository (Sanity first, local placeholder fallback), a CSS-token design system in `app/globals.css`, and small focused components. No new runtime dependencies.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind 4 (base only), next/font (Instrument Serif, Mona Sans), node:test with native type stripping for pure-logic tests.

---

## File map

| Path | Responsibility |
|---|---|
| `app/globals.css` | Tokens, base, typography, layout, components, motion |
| `app/layout.tsx` | Fonts, metadata defaults, skip link, Nav, Footer, Organization JSON-LD |
| `app/template.tsx` | Route-change fade |
| `app/page.tsx` | Home |
| `app/about/page.tsx` | About / Vision |
| `app/testimony/page.tsx` | Archive + theme filter |
| `app/testimony/[slug]/page.tsx` | Story template + JSON-LD |
| `app/donate/page.tsx`, `app/donate/success/page.tsx` | Donation |
| `app/contact/page.tsx` | Contact |
| `app/not-found.tsx` | 404 |
| `app/sitemap.ts`, `app/robots.ts` | SEO |
| `app/api/contact/route.ts` | Resend handler (validated, 503 when unconfigured) |
| `app/api/stripe/checkout/route.ts` | Stripe handler (lazy client, 503 when unconfigured) |
| `next.config.ts` | `/testimonies` redirects, image config |
| `lib/site.ts` | Site constants: name, nav, socials (placeholders), base URL |
| `lib/stories/types.ts` | `Story`, `Theme`, `StoryBlock` |
| `lib/stories/themes.ts` | Theme list + labels, `isTheme` |
| `lib/stories/filter.ts` | `filterByTheme`, `relatedStories` (pure) |
| `lib/stories/map-sanity.ts` | Sanity doc → `Story` (pure) |
| `lib/stories/placeholder-stories.ts` | Fictional sample stories |
| `lib/stories/repository.ts` | `getStories`, `getStory`, `getFeaturedStories` |
| `lib/forms/contact.ts` | Contact reasons + `validateContact` (pure) |
| `lib/forms/submit.ts` | `postJSON` client submission helper |
| `components/layout/Nav.tsx`, `Footer.tsx` | Chrome |
| `components/ui/*` | Button, Reveal, Eyebrow, Tag, SectionLabel |
| `components/story/*` | StoryTile, StoryIndex, PullQuote, StoryBody, ThemeFilter |
| `components/media/VideoFacade.tsx` | Click-to-load video |
| `components/forms/ContactForm.tsx`, `DonateForm.tsx` | Forms |
| `sanity/schemaTypes/testimony.ts` | Extended schema |
| `public/images/stories/*` | Optimized story imagery |
| `tests/*.test.ts` | node:test unit tests |

## Tasks

### Task 1: Pure logic with tests
- [ ] Write `tests/filter.test.ts`, `tests/map-sanity.test.ts`, `tests/contact.test.ts` covering: theme filtering (all / specific / invalid), related stories exclude current and prefer shared themes, Sanity mapping with missing optional fields, contact validation (missing fields, bad email, bad reason, valid).
- [ ] Run `node --test tests/` — expect FAIL (modules missing).
- [ ] Implement `lib/stories/types.ts`, `themes.ts`, `filter.ts`, `map-sanity.ts`, `lib/forms/contact.ts`.
- [ ] Run `node --test tests/` — expect PASS. Add `"test": "node --test tests/"` to package.json.
- [ ] Commit.

### Task 2: Content + repository
- [ ] Optimize `Images thumbnails/*` into `public/images/stories/*.jpg` (max 1600px, `sips`).
- [ ] Write `placeholder-stories.ts` (6 fictional stories, `placeholder: true`).
- [ ] Write `repository.ts` (Sanity when env set, fallback on error/empty). Remove `lib/sanity.ts` consumers.
- [ ] Extend Sanity schema. Commit.

### Task 3: Design system + layout chrome
- [ ] Rewrite `globals.css` with tokens and component classes.
- [ ] `layout.tsx` fonts/metadata/skip link/JSON-LD; `template.tsx`; Nav (scroll state, mobile menu); Footer. Commit.

### Task 4: Shared components
- [ ] Reveal, Button, Tag, SectionLabel, StoryTile, StoryIndex, PullQuote, StoryBody, ThemeFilter, VideoFacade. Commit.

### Task 5: Pages
- [ ] Home, About, Testimony archive, Story template, Donate (+success), Contact, 404, sitemap, robots, redirects. Delete old `app/testimonies`, old components. Commit per page group.

### Task 6: API hardening
- [ ] Contact route uses `validateContact`, sends org/reason, 503 when unconfigured. Stripe lazy client, 503. Commit.

### Task 7: QA
- [ ] `npm test`, `npm run lint`, `npm run build` pass.
- [ ] Browser QA at 1440 / 1024 / 768 / 375: overflow check via `document.documentElement.scrollWidth > innerWidth`, keyboard focus, reduced motion. Fix issues. Commit.
