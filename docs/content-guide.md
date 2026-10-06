# Content guide

How the TSTMNY team adds and organises testimonies in Sanity, and how the content model is set up to grow. Everything here is done in Sanity Studio at `/studio` — no code changes, no redeploy.

## How the content is organised

| Sanity document | What it is | Who manages it |
|---|---|---|
| **Testimony** | One person's story: video and/or written text, plus the person's name, sport, location, and topics. | Editors |
| **Topic** | What a testimony is about: Faith, Injury, Identity, Family… | Editors |
| **Sport** | Football, Basketball, Tennis… | Editors |
| **Site Settings** | Site-wide text and social links. | Editors |

A testimony **links to** one sport and any number of topics, rather than typing them in. That keeps spelling consistent ("Football", never "football " or "Soccer/Football"), so filters never split, and renaming a topic in one place updates every testimony that uses it.

Testimonies come first and athletes second: the archive is filtered by **topic** first, then **sport**.

## Add a testimony

1. Studio → **Testimony** → **Create**.
2. Fill in title, slug (click *Generate*), person name, sport, location, excerpt, pull quote, topics, lead image (with alt text), video URL (YouTube or Vimeo, optional), and the story text. In the story text, use the *Quote* style for pull quotes and *H2* for section headings.
3. Set **Status** to **Approved** and publish. Only approved testimonies appear on the site, within about a minute.

## Add a new sport (e.g. Basketball)

1. Studio → **Sport** → **Create** → title "Basketball" → *Generate* slug → publish.
2. Open a testimony and pick *Basketball* in its **Sport** field.

That's it. The archive shows a **Sport** filter automatically as soon as testimonies span two or more sports, and each sport has its own shareable link, e.g. `/testimony?sport=basketball`.

## Add a new topic (e.g. Grief)

1. Studio → **Topic** → **Create** → title "Grief" → *Generate* slug → publish.
2. Pick it in a testimony's **Topics** field.

A topic appears as a filter on the archive once at least one approved testimony uses it, with its own link, e.g. `/testimony?topic=grief`. Topics show in this order: Faith, Purpose, Identity, Injury, Failure, Family, Health, Addiction, Breakthrough, Recovery, Discipline, Leadership. New topics appear after these, alphabetically. To change the order, edit `DEFAULT_TOPICS` in `lib/stories/topics.ts`.

### First-time setup

Create the topics you plan to use (Faith, Purpose, Identity, Injury, Failure, Family, Health, Addiction, Breakthrough…) and the sports you already have stories for. Testimonies created before this change kept their old free-text sport and theme tags. These still display, and show in Studio as *Sport (legacy text)* and *Themes (legacy)*. When you next edit one of those testimonies, pick the Sport and Topics, then clear the legacy fields. A legacy field disappears once it's empty.

## Submissions and approval

Testimonies submitted through `/contact` ("Share my testimony") are saved in Sanity as **Pending** and emailed to the team. Nothing pending is ever shown on the site. To publish one, review it, add the image, sport, and topics, then set **Status** to **Approved**.

## Planned: community testimonies (not built yet)

Sebi's vision includes written testimonies from everyday people, not just athletes, published in the archive after approval. The current model supports this without restructuring:

- **Content type.** Add a `communityTestimony` document beside `testimony`, with name (or "Anonymous"), story text, topics (the same Topic documents), an optional location, a **status** (Pending → Approved / Declined), and a consent checkbox. Keeping it separate keeps unreviewed public submissions apart from produced athlete testimonies, and lets them have fewer required fields (no video, no lead image).
- **Approval workflow.** This is the same pattern as today. The submission form writes a *Pending* document, the team is emailed, and only *Approved* documents are queried by the site.
- **Archive.** The repository (`lib/stories/repository.ts`) would query both types and map them into the same `Story` shape with a `kind: 'filmed' | 'written'` flag. Topic filtering then works across both. A "Filmed / Written" filter can be added the same way the Sport filter was.
- **Optional donation on submission.** After a successful submission, the thank-you state can offer a link to `/donate`. It is never required, and never shown before someone has shared.
- **Search by name.** Every testimony already has a person name. A search box can filter the archive with a GROQ `match` on `person.name` and `title`.

## Donations

Donations use Stripe Checkout (`/api/stripe/checkout`), with a payment webhook at `/api/stripe/webhook`. They need `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` from TSTMNY's own Stripe account. **Open question for Sebi:** is the Stripe account set up, and who owns it?

Giving is always the last step: discover, watch or read, be impacted, then share or support. The site never makes donating the primary call to action. On testimony pages, the main button is "Watch another testimony".
