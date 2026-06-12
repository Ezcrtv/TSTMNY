# TSTMNY Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a public-facing video testimony platform with Next.js 14, Sanity v3 CMS, Stripe donations, and Resend email.

**Architecture:** Next.js App Router with statically generated pages (ISR). Sanity v3 serves as both the CMS and admin interface. Video embeds come from YouTube/Vimeo URLs stored in Sanity. API routes handle Stripe Checkout creation and Resend email delivery.

**Tech Stack:** Next.js 14, Sanity v3, Tailwind CSS, Stripe, Resend, Vercel

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout, fonts, global styles |
| `app/page.tsx` | Home — hero, featured testimony, recent grid |
| `app/about/page.tsx` | About/Vision — mission content from siteSettings |
| `app/testimonies/page.tsx` | All testimonies grid with category filter |
| `app/testimonies/[slug]/page.tsx` | Individual testimony — video, story, OG metadata |
| `app/donate/page.tsx` | Donation form with Stripe Checkout |
| `app/donate/success/page.tsx` | Post-donation confirmation |
| `app/contact/page.tsx` | Contact + testimony submission forms |
| `app/studio/[[...tool]]/page.tsx` | Embedded Sanity Studio |
| `app/api/stripe/checkout/route.ts` | Creates Stripe Checkout session |
| `app/api/contact/route.ts` | Sends contact email via Resend |
| `app/api/submit/route.ts` | Creates pending Sanity doc + sends email |
| `sanity/schemaTypes/testimony.ts` | Testimony document schema |
| `sanity/schemaTypes/siteSettings.ts` | Singleton site settings schema |
| `sanity/schemaTypes/index.ts` | Exports all schema types |
| `sanity/lib/client.ts` | Sanity client instance |
| `sanity/lib/image.ts` | Sanity image URL builder |
| `sanity/structure.ts` | Studio sidebar structure (singleton handling) |
| `sanity.config.ts` | Sanity project config |
| `lib/sanity.ts` | GROQ queries |
| `lib/stripe.ts` | Stripe client instance |
| `lib/resend.ts` | Resend client instance |
| `components/TestimonyCard.tsx` | Card: thumbnail, name, category, one-liner |
| `components/TestimonyGrid.tsx` | Grid wrapper + category filter state |
| `components/CategoryFilter.tsx` | Filter buttons: All / Salvation / Healing / Restoration / Other |
| `components/VideoPlayer.tsx` | YouTube/Vimeo iframe embed |
| `components/PortableText.tsx` | Renders Sanity block content as HTML |
| `components/Nav.tsx` | Site navigation |
| `components/Footer.tsx` | Site footer with social links |
| `components/DonateForm.tsx` | Preset amounts + custom field + submit |
| `components/ContactForm.tsx` | General contact form |
| `components/SubmitForm.tsx` | Testimony submission form |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `.env.local.example`, `.gitignore`

- [ ] **Step 1: Scaffold Next.js app**

```bash
cd /Users/isacalmanza/Desktop/TSTMNY
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --yes
```

Expected: Next.js 14 project created in current directory.

- [ ] **Step 2: Install dependencies**

```bash
npm install next-sanity @sanity/image-url @sanity/vision sanity \
  stripe @stripe/stripe-js resend \
  @portabletext/react @tailwindcss/typography
```

- [ ] **Step 3: Create `.env.local.example`**

```bash
cat > .env.local.example << 'EOF'
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@tstmny.com
RESEND_TO_EMAIL=hello@ezcrtv.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
EOF
```

- [ ] **Step 4: Copy to `.env.local` and fill in values**

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in real keys from:
- Sanity: https://sanity.io/manage → create new project → copy project ID + create API token (Editor role)
- Stripe: https://dashboard.stripe.com/test/apikeys
- Resend: https://resend.com/api-keys

- [ ] **Step 5: Add `.env.local` to `.gitignore`**

Verify `.gitignore` already contains `.env.local` (create-next-app adds it). If not, add it.

- [ ] **Step 6: Update `tailwind.config.ts` to include typography plugin**

Open `tailwind.config.ts` and add `require('@tailwindcss/typography')` to the plugins array:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 14 project with dependencies"
```

---

## Task 2: Sanity Configuration

**Files:**
- Create: `sanity.config.ts`, `sanity/structure.ts`, `sanity/schemaTypes/index.ts`, `sanity/lib/client.ts`, `sanity/lib/image.ts`

- [ ] **Step 1: Create `sanity/lib/client.ts`**

```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

- [ ] **Step 2: Create `sanity/lib/image.ts`**

```typescript
import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
```

- [ ] **Step 3: Create `sanity/schemaTypes/index.ts`** (empty for now — tasks 3 and 4 add schemas)

```typescript
export const schemaTypes: any[] = []
```

- [ ] **Step 4: Create `sanity/structure.ts`**

```typescript
import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.documentTypeListItem('testimony').title('Testimonies'),
    ])
```

- [ ] **Step 5: Create `sanity.config.ts`**

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'tstmny',
  title: 'TSTMNY',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
})
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Sanity client config and project structure"
```

---

## Task 3: Testimony Schema

**Files:**
- Create: `sanity/schemaTypes/testimony.ts`
- Modify: `sanity/schemaTypes/index.ts`

- [ ] **Step 1: Create `sanity/schemaTypes/testimony.ts`**

```typescript
import { defineField, defineType } from 'sanity'

export const testimony = defineType({
  name: 'testimony',
  title: 'Testimony',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({
      name: 'person',
      title: 'Person',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() }),
        defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({ name: 'videoUrl', title: 'Video URL (YouTube or Vimeo)', type: 'url' }),
    defineField({ name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'story', title: 'Story', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Salvation', value: 'salvation' },
          { title: 'Healing', value: 'healing' },
          { title: 'Restoration', value: 'restoration' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
        ],
      },
      initialValue: 'pending',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'featured', title: 'Featured (pin to homepage)', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'shortDescription', title: 'Short Description (one-liner for cards)', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'person.name', media: 'thumbnail' },
  },
})
```

- [ ] **Step 2: Update `sanity/schemaTypes/index.ts`**

```typescript
import { testimony } from './testimony'

export const schemaTypes = [testimony]
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add testimony Sanity schema"
```

---

## Task 4: Site Settings Schema

**Files:**
- Create: `sanity/schemaTypes/siteSettings.ts`
- Modify: `sanity/schemaTypes/index.ts`

- [ ] **Step 1: Create `sanity/schemaTypes/siteSettings.ts`**

```typescript
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheading', title: 'Hero Subheading', type: 'string' }),
    defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'CTA Button Link', type: 'string' }),
    defineField({ name: 'aboutContent', title: 'About / Vision Content', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineField({
          name: 'socialLink',
          type: 'object',
          fields: [
            defineField({ name: 'platform', type: 'string', title: 'Platform' }),
            defineField({ name: 'url', type: 'url', title: 'URL' }),
          ],
        }),
      ],
    }),
  ],
})
```

- [ ] **Step 2: Update `sanity/schemaTypes/index.ts`**

```typescript
import { testimony } from './testimony'
import { siteSettings } from './siteSettings'

export const schemaTypes = [testimony, siteSettings]
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add siteSettings Sanity schema"
```

---

## Task 5: GROQ Queries & Lib Helpers

**Files:**
- Create: `lib/sanity.ts`, `lib/stripe.ts`, `lib/resend.ts`

- [ ] **Step 1: Create `lib/sanity.ts`**

```typescript
import { client } from '@/sanity/lib/client'

export async function getFeaturedTestimony() {
  return client.fetch(
    `*[_type == "testimony" && status == "approved" && featured == true][0]{
      _id, title, slug, person, videoUrl, thumbnail, shortDescription, category
    }`
  )
}

export async function getRecentTestimonies(limit = 6) {
  return client.fetch(
    `*[_type == "testimony" && status == "approved"] | order(publishedAt desc) [0...$limit]{
      _id, title, slug, person, thumbnail, shortDescription, category
    }`,
    { limit }
  )
}

export async function getAllTestimonies() {
  return client.fetch(
    `*[_type == "testimony" && status == "approved"] | order(publishedAt desc){
      _id, title, slug, person, thumbnail, shortDescription, category
    }`
  )
}

export async function getTestimonyBySlug(slug: string) {
  return client.fetch(
    `*[_type == "testimony" && slug.current == $slug && status == "approved"][0]{
      _id, title, slug, person, videoUrl, thumbnail, story, category, publishedAt, shortDescription
    }`,
    { slug }
  )
}

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      heroHeadline, heroSubheading, ctaText, ctaLink, aboutContent, socialLinks
    }`
  )
}
```

- [ ] **Step 2: Create `lib/stripe.ts`**

```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})
```

- [ ] **Step 3: Create `lib/resend.ts`**

```typescript
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add GROQ queries and lib helpers"
```

---

## Task 6: Shared Components

**Files:**
- Create: `components/Nav.tsx`, `components/Footer.tsx`, `components/VideoPlayer.tsx`, `components/PortableText.tsx`

- [ ] **Step 1: Create `components/Nav.tsx`**

```tsx
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-xl tracking-widest">TSTMNY</Link>
        <div className="flex gap-8 text-sm text-white/70">
          <Link href="/testimonies" className="hover:text-white transition-colors">Testimonies</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/donate" className="bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-white/90 transition-colors">Donate</Link>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Create `components/Footer.tsx`**

```tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white font-bold text-lg tracking-widest">TSTMNY</p>
        <div className="flex gap-6 text-sm text-white/50">
          <Link href="/testimonies" className="hover:text-white transition-colors">Testimonies</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/donate" className="hover:text-white transition-colors">Donate</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
        <p className="text-white/30 text-xs">© {new Date().getFullYear()} TSTMNY</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Create `components/VideoPlayer.tsx`**

```tsx
'use client'

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return null
}

export default function VideoPlayer({ url }: { url: string }) {
  const embedUrl = getEmbedUrl(url)
  if (!embedUrl) return null
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
      <iframe
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
```

- [ ] **Step 4: Create `components/PortableText.tsx`**

```tsx
import { PortableText as PT } from '@portabletext/react'

export default function PortableText({ value }: { value: any[] }) {
  return (
    <div className="prose prose-invert max-w-none">
      <PT value={value} />
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Nav, Footer, VideoPlayer, PortableText components"
```

---

## Task 7: Root Layout & Global Styles

**Files:**
- Modify: `app/layout.tsx`, `app/globals.css`

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TSTMNY — Real Stories. Real Faith.',
  description: 'A platform sharing video testimonies of faith, healing, and restoration.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        <Nav />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply antialiased;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add root layout with Nav and Footer"
```

---

## Task 8: Testimony Card & Grid Components

**Files:**
- Create: `components/TestimonyCard.tsx`, `components/CategoryFilter.tsx`, `components/TestimonyGrid.tsx`

- [ ] **Step 1: Create `components/TestimonyCard.tsx`**

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

type Props = {
  testimony: {
    slug: { current: string }
    title: string
    person: { name: string; photo?: any }
    thumbnail?: any
    shortDescription?: string
    category: string
  }
}

const categoryLabels: Record<string, string> = {
  salvation: 'Salvation',
  healing: 'Healing',
  restoration: 'Restoration',
  other: 'Other',
}

export default function TestimonyCard({ testimony }: Props) {
  const { slug, title, person, thumbnail, shortDescription, category } = testimony
  return (
    <Link href={`/testimonies/${slug.current}`} className="group block">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 mb-3">
        {thumbnail && (
          <Image
            src={urlFor(thumbnail).width(640).height(360).url()}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <span className="absolute top-2 left-2 text-xs bg-black/60 text-white/80 px-2 py-0.5 rounded-full">
          {categoryLabels[category] ?? category}
        </span>
      </div>
      <p className="font-semibold text-white group-hover:text-white/80 transition-colors">{person.name}</p>
      <p className="text-sm text-white/50 mt-0.5 line-clamp-2">{shortDescription}</p>
    </Link>
  )
}
```

- [ ] **Step 2: Create `components/CategoryFilter.tsx`**

```tsx
'use client'

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Salvation', value: 'salvation' },
  { label: 'Healing', value: 'healing' },
  { label: 'Restoration', value: 'restoration' },
  { label: 'Other', value: 'other' },
]

export default function CategoryFilter({
  active,
  onChange,
}: {
  active: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === cat.value
              ? 'bg-white text-black'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Create `components/TestimonyGrid.tsx`**

```tsx
'use client'

import { useState } from 'react'
import TestimonyCard from './TestimonyCard'
import CategoryFilter from './CategoryFilter'

type Testimony = {
  _id: string
  slug: { current: string }
  title: string
  person: { name: string; photo?: any }
  thumbnail?: any
  shortDescription?: string
  category: string
}

export default function TestimonyGrid({ testimonies }: { testimonies: Testimony[] }) {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? testimonies : testimonies.filter((t) => t.category === active)

  return (
    <div>
      <CategoryFilter active={active} onChange={setActive} />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((t) => (
          <TestimonyCard key={t._id} testimony={t} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-white/40 text-center py-20">No testimonies in this category yet.</p>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add TestimonyCard, CategoryFilter, TestimonyGrid components"
```

---

## Task 9: Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Link from 'next/link'
import { getFeaturedTestimony, getRecentTestimonies, getSiteSettings } from '@/lib/sanity'
import VideoPlayer from '@/components/VideoPlayer'
import TestimonyCard from '@/components/TestimonyCard'

export const revalidate = 60

export default async function HomePage() {
  const [settings, featured, recent] = await Promise.all([
    getSiteSettings(),
    getFeaturedTestimony(),
    getRecentTestimonies(6),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl leading-tight">
          {settings?.heroHeadline ?? 'Real Stories. Real Faith.'}
        </h1>
        <p className="mt-6 text-xl text-white/60 max-w-xl">
          {settings?.heroSubheading ?? 'Testimonies of salvation, healing, and restoration.'}
        </p>
        <Link
          href={settings?.ctaLink ?? '/testimonies'}
          className="mt-10 bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-colors"
        >
          {settings?.ctaText ?? 'Watch Testimonies'}
        </Link>
      </section>

      {/* Featured Testimony */}
      {featured && (
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <h2 className="text-2xl font-bold mb-6">Featured</h2>
          <VideoPlayer url={featured.videoUrl} />
          <p className="mt-4 text-lg font-semibold">{featured.person?.name}</p>
          <p className="text-white/50 text-sm">{featured.shortDescription}</p>
        </section>
      )}

      {/* Recent Grid */}
      {recent.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recent Testimonies</h2>
            <Link href="/testimonies" className="text-sm text-white/50 hover:text-white transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recent.map((t: any) => (
              <TestimonyCard key={t._id} testimony={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Start dev server and verify home page renders**

```bash
npm run dev
```

Open http://localhost:3000. Expected: hero section visible, no errors in terminal. (Sanity data will be empty until content is added — that's fine.)

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add home page"
```

---

## Task 10: Testimonies Pages

**Files:**
- Create: `app/testimonies/page.tsx`, `app/testimonies/[slug]/page.tsx`

- [ ] **Step 1: Create `app/testimonies/page.tsx`**

```tsx
import { getAllTestimonies } from '@/lib/sanity'
import TestimonyGrid from '@/components/TestimonyGrid'

export const revalidate = 60

export default async function TestimoniesPage() {
  const testimonies = await getAllTestimonies()
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">Testimonies</h1>
      <p className="text-white/50 mb-12">Stories of faith from real people.</p>
      <TestimonyGrid testimonies={testimonies} />
    </div>
  )
}
```

- [ ] **Step 2: Create `app/testimonies/[slug]/page.tsx`**

```tsx
import { getTestimonyBySlug, getAllTestimonies } from '@/lib/sanity'
import { urlFor } from '@/sanity/lib/image'
import VideoPlayer from '@/components/VideoPlayer'
import PortableText from '@/components/PortableText'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateStaticParams() {
  const testimonies = await getAllTestimonies()
  return testimonies.map((t: any) => ({ slug: t.slug.current }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const t = await getTestimonyBySlug(params.slug)
  if (!t) return {}
  return {
    title: `${t.person?.name} — TSTMNY`,
    description: t.shortDescription ?? `Watch ${t.person?.name}'s testimony on TSTMNY.`,
    openGraph: {
      title: `${t.person?.name} — TSTMNY`,
      description: t.shortDescription ?? '',
      images: t.thumbnail ? [urlFor(t.thumbnail).width(1200).height(630).url()] : [],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function TestimonyPage({ params }: { params: { slug: string } }) {
  const t = await getTestimonyBySlug(params.slug)
  if (!t) notFound()

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      {t.videoUrl && <VideoPlayer url={t.videoUrl} />}
      <div className="mt-8 flex items-center gap-4">
        {t.person?.photo && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image src={urlFor(t.person.photo).width(96).height(96).url()} alt={t.person.name} fill className="object-cover" />
          </div>
        )}
        <div>
          <p className="font-semibold text-lg">{t.person?.name}</p>
          {t.publishedAt && (
            <p className="text-white/40 text-sm">{new Date(t.publishedAt).toLocaleDateString()}</p>
          )}
        </div>
      </div>
      {t.story && (
        <div className="mt-10">
          <PortableText value={t.story} />
        </div>
      )}
      <div className="mt-10 pt-8 border-t border-white/10">
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="text-sm text-white/50 hover:text-white transition-colors"
        >
          Share this testimony →
        </button>
      </div>
    </div>
  )
}
```

Note: The Share button uses `onClick` — wrap the button in a `'use client'` component if you see a hydration error. Extract just the button to a `components/ShareButton.tsx`:

```tsx
'use client'
export default function ShareButton() {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="text-sm text-white/50 hover:text-white transition-colors"
    >
      Share this testimony →
    </button>
  )
}
```

Then replace the button in `[slug]/page.tsx` with `<ShareButton />`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add testimonies list and individual testimony pages"
```

---

## Task 11: About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create `app/about/page.tsx`**

```tsx
import { getSiteSettings } from '@/lib/sanity'
import PortableText from '@/components/PortableText'

export const revalidate = 3600

export default async function AboutPage() {
  const settings = await getSiteSettings()
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">About TSTMNY</h1>
      <p className="text-white/50 mb-12">Why we exist. What we believe. Where we're going.</p>
      {settings?.aboutContent ? (
        <PortableText value={settings.aboutContent} />
      ) : (
        <p className="text-white/30">Content coming soon.</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add about page"
```

---

## Task 12: Sanity Studio Route

**Files:**
- Create: `app/studio/[[...tool]]/page.tsx`

- [ ] **Step 1: Create `app/studio/[[...tool]]/page.tsx`**

```tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 2: Verify Studio loads**

```bash
npm run dev
```

Open http://localhost:3000/studio. Expected: Sanity Studio loads with Testimonies and Site Settings in the sidebar.

- [ ] **Step 3: Add seed content in Studio**

In the Studio, create one `siteSettings` document with a headline and CTA. Create one `testimony` with `status: approved` and `featured: true`. Go to http://localhost:3000 and verify the home page now shows content.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add embedded Sanity Studio route"
```

---

## Task 13: API Route — Stripe Checkout

**Files:**
- Create: `app/api/stripe/checkout/route.ts`

- [ ] **Step 1: Create `app/api/stripe/checkout/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const { amount } = await req.json()
  const amountInCents = Math.round(Number(amount) * 100)

  if (!amountInCents || amountInCents < 100) {
    return NextResponse.json({ error: 'Minimum donation is $1' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: 'Donation to TSTMNY' },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate`,
  })

  return NextResponse.json({ url: session.url })
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add Stripe Checkout API route"
```

---

## Task 14: Donate Page & Success Page

**Files:**
- Create: `components/DonateForm.tsx`, `app/donate/page.tsx`, `app/donate/success/page.tsx`

- [ ] **Step 1: Create `components/DonateForm.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PRESETS = [10, 25, 50]

export default function DonateForm() {
  const [selected, setSelected] = useState<number | null>(25)
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const amount = custom ? Number(custom) : selected

  async function handleDonate() {
    if (!amount || amount < 1) { setError('Please enter a valid amount.'); return }
    setLoading(true)
    setError('')
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      setError(data.error ?? 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => { setSelected(p); setCustom('') }}
            className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
              selected === p && !custom ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            ${p}
          </button>
        ))}
      </div>
      <input
        type="number"
        placeholder="Custom amount"
        value={custom}
        onChange={(e) => { setCustom(e.target.value); setSelected(null) }}
        className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        onClick={handleDonate}
        disabled={loading}
        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Redirecting...' : `Donate${amount ? ` $${amount}` : ''}`}
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/donate/page.tsx`**

```tsx
import DonateForm from '@/components/DonateForm'

export const metadata = {
  title: 'Donate — TSTMNY',
}

export default function DonatePage() {
  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">Support TSTMNY</h1>
      <p className="text-white/50 mb-10">Your gift helps share stories of faith with the world.</p>
      <DonateForm />
    </div>
  )
}
```

- [ ] **Step 3: Create `app/donate/success/page.tsx`**

```tsx
import Link from 'next/link'

export default function DonateSuccessPage() {
  return (
    <div className="max-w-md mx-auto px-6 py-32 text-center">
      <p className="text-5xl mb-6">🙏</p>
      <h1 className="text-3xl font-bold mb-4">Thank you.</h1>
      <p className="text-white/50 mb-10">Your donation supports the spread of real stories of faith.</p>
      <Link href="/testimonies" className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-colors">
        Watch Testimonies
      </Link>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add donate page with Stripe Checkout"
```

---

## Task 15: API Routes — Contact & Submit

**Files:**
- Create: `app/api/contact/route.ts`, `app/api/submit/route.ts`

- [ ] **Step 1: Create `app/api/contact/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.RESEND_TO_EMAIL!,
    subject: `Contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  })

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 2: Create `app/api/submit/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { createClient } from 'next-sanity'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(req: NextRequest) {
  const { name, email, story, videoUrl } = await req.json()
  if (!name || !email || !story) {
    return NextResponse.json({ error: 'Name, email, and story are required.' }, { status: 400 })
  }

  await writeClient.create({
    _type: 'testimony',
    title: `${name}'s Testimony`,
    person: { name },
    story: [{ _type: 'block', _key: 'intro', style: 'normal', children: [{ _type: 'span', _key: 'text', text: story }], markDefs: [] }],
    videoUrl: videoUrl || undefined,
    category: 'other',
    status: 'pending',
    publishedAt: new Date().toISOString(),
    slug: { _type: 'slug', current: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}` },
  })

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.RESEND_TO_EMAIL!,
    subject: `New testimony submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nVideo: ${videoUrl ?? 'none'}\n\nStory:\n${story}\n\nReview in Sanity Studio.`,
  })

  return NextResponse.json({ success: true })
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add contact and testimony submission API routes"
```

---

## Task 16: Contact Page

**Files:**
- Create: `components/ContactForm.tsx`, `components/SubmitForm.tsx`, `app/contact/page.tsx`

- [ ] **Step 1: Create `components/ContactForm.tsx`**

```tsx
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') return <p className="text-green-400">Message sent. We'll get back to you soon.</p>

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30" />
      <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30" />
      <textarea required rows={5} placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30 resize-none" />
      {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50">
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

- [ ] **Step 2: Create `components/SubmitForm.tsx`**

```tsx
'use client'

import { useState } from 'react'

export default function SubmitForm() {
  const [form, setForm] = useState({ name: '', email: '', story: '', videoUrl: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') return <p className="text-green-400">Thank you for sharing your testimony. We'll review it and be in touch.</p>

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30" />
      <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30" />
      <textarea required rows={6} placeholder="Share your testimony..." value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })}
        className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30 resize-none" />
      <input placeholder="Video URL (YouTube or Vimeo) — optional" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
        className="w-full bg-white/10 text-white placeholder-white/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/30" />
      {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>}
      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50">
        {status === 'loading' ? 'Submitting...' : 'Submit Testimony'}
      </button>
    </form>
  )
}
```

- [ ] **Step 3: Create `app/contact/page.tsx`**

```tsx
import ContactForm from '@/components/ContactForm'
import SubmitForm from '@/components/SubmitForm'

export const metadata = { title: 'Contact — TSTMNY' }

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-12">Get in Touch</h1>
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-xl font-semibold mb-6">Contact Us</h2>
          <ContactForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Share Your Testimony</h2>
          <p className="text-white/40 text-sm mb-6">We'd love to feature your story.</p>
          <SubmitForm />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add contact page with contact and submission forms"
```

---

## Task 17: Deploy to Vercel

- [ ] **Step 1: Push all changes to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Import project on Vercel**

Go to https://vercel.com/new, import the `Ezcrtv/TSTMNY` repo.

- [ ] **Step 3: Add environment variables in Vercel**

In the Vercel project settings → Environment Variables, add all keys from `.env.local.example`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`
- `NEXT_PUBLIC_BASE_URL` → set to your Vercel domain (e.g. `https://tstmny.vercel.app`)

- [ ] **Step 4: Add Vercel domain to Sanity CORS**

In https://sanity.io/manage → your project → API → CORS Origins, add your Vercel domain.

- [ ] **Step 5: Deploy and verify**

Trigger a deploy. Open the live URL. Verify all pages load, Studio is accessible, a test donation redirects to Stripe.
