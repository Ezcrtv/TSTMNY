# TSTMNY — Design Spec
**Date:** 2026-06-12

## Overview

TSTMNY (Testimony) is a public-facing video testimony platform with an evangelism focus. Its purpose is to reach the general public with real stories of faith through curated video testimonies. Non-technical editors manage all content through Sanity Studio. The site includes a donation flow (Stripe) and a contact/submission form (Resend).

---

## Architecture

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| CMS | Sanity v3 |
| Styling | Tailwind CSS |
| Payments | Stripe Checkout |
| Email | Resend |
| Deployment | Vercel |
| Video | YouTube / Vimeo embeds |

**Data flow:**
1. Editor adds/approves a testimony in Sanity Studio
2. Next.js fetches content via GROQ queries to the Sanity Content API
3. Pages are statically generated (ISR) — fast load, SEO-indexed
4. Visitor shares a testimony link; Open Graph metadata ensures rich previews on social media

---

## Pages

### `/` — Home
- Hero section: bold headline, subheading, and a primary CTA button
- Featured testimony: full embedded video of a pinned testimony
- Recent testimonies grid: latest approved testimonies (thumbnail, name, one-liner)

### `/about` — About / Vision
- Story of TSTMNY: why it exists, its mission
- Vision statement
- Content managed via the `siteSettings` Sanity singleton

### `/testimonies` — All Testimonies
- Browsable grid of all approved testimonies
- Client-side filter by category: Salvation / Healing / Restoration / Other
- Each card: thumbnail, person's name, category tag, short description

### `/testimonies/[slug]` — Individual Testimony
- Full embedded video player (YouTube / Vimeo)
- Person's name and optional photo
- Written story (rich text from Sanity)
- Share button
- Open Graph metadata per page for social sharing

### `/donate` — Donate
- Preset donation amounts: $10 / $25 / $50 + custom amount field
- "Donate" button triggers Stripe Checkout redirect
- `/donate/success` confirmation page on return

### `/contact` — Contact
- Two sections: a general contact form (name, email, message) and a testimony submission form (name, email, story, optional video URL)
- Both submissions sent via Resend to a designated TSTMNY email address
- Testimony submissions also create a `pending` document in Sanity for admin review

### `/studio` — Sanity Studio (Admin)
- Embedded Sanity Studio; accessible only to authenticated editors
- Used to review pending testimony submissions, manage content, and configure site settings

---

## Sanity Content Schema

### `testimony` document
| Field | Type | Notes |
|---|---|---|
| `title` | string | Testimony title |
| `slug` | slug | Auto-generated from title |
| `person` | object | name (string) + photo (image, optional) |
| `videoUrl` | url | YouTube or Vimeo URL |
| `thumbnail` | image | Manual upload or pulled from video |
| `story` | block content | Rich text written story |
| `category` | select | Salvation / Healing / Restoration / Other |
| `status` | select | `pending` or `approved` — controls public visibility |
| `featured` | boolean | Pins testimony to the home page hero |
| `publishedAt` | datetime | Publication date |

### `siteSettings` document (singleton)
| Field | Type |
|---|---|
| Hero headline | string |
| Hero subheading | string |
| CTA button text + link | string |
| About/Vision page content | block content |
| Social links | array of URLs |

---

## Integrations

### Stripe (Donations)
- Preset amounts ($10, $25, $50) + custom field on the Donate page
- Clicking "Donate" calls a Next.js API route (`/api/stripe/checkout`) that creates a Stripe Checkout session
- User is redirected to Stripe's hosted payment page
- On success, Stripe redirects back to `/donate/success`
- No card data touches the Next.js server

### Resend (Email)
- Contact form submissions POST to `/api/contact` → Resend sends email to the designated TSTMNY address
- Testimony submissions POST to `/api/submit` → Resend sends notification email + Sanity API creates a `pending` testimony document in Studio

### SEO
- Each `/testimonies/[slug]` page exports Open Graph metadata: title, description, and thumbnail image
- Enables rich link previews when testimonies are shared on social media

---

## Repo Structure

```
tstmny/
├── app/
│   ├── page.tsx                  # Home
│   ├── about/page.tsx
│   ├── testimonies/
│   │   ├── page.tsx              # All testimonies
│   │   └── [slug]/page.tsx       # Individual testimony
│   ├── donate/
│   │   ├── page.tsx
│   │   └── success/page.tsx
│   ├── contact/page.tsx
│   ├── studio/[[...tool]]/page.tsx  # Sanity Studio
│   └── api/
│       ├── stripe/checkout/route.ts
│       ├── contact/route.ts
│       └── submit/route.ts
├── sanity/
│   ├── schemaTypes/
│   │   ├── testimony.ts
│   │   └── siteSettings.ts
│   └── lib/client.ts
├── components/
│   ├── TestimonyCard.tsx
│   ├── TestimonyGrid.tsx
│   ├── VideoPlayer.tsx
│   ├── CategoryFilter.tsx
│   ├── DonateForm.tsx
│   └── ContactForm.tsx
├── lib/
│   ├── sanity.ts                 # GROQ queries
│   ├── stripe.ts
│   └── resend.ts
└── public/
```

---

## Submission & Approval Workflow

1. Visitor fills out the testimony submission form (name, email, story, optional video link)
2. `/api/submit` creates a `status: pending` testimony document in Sanity and sends a notification email via Resend
3. Admin logs into Sanity Studio at `/studio`, reviews the submission
4. Admin sets `status` to `approved` — the testimony becomes publicly visible
5. Admin can optionally set `featured: true` to pin it to the home page hero

---

## Success Criteria

- Non-technical editors can add and approve testimonies without touching code
- Individual testimony pages are shareable with rich social previews
- Donations are processed securely via Stripe with zero card data on the server
- Site loads fast and is fully SEO-indexed
- Contact and submission forms reliably deliver to the designated inbox
