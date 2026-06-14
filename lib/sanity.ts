import { client } from '@/sanity/lib/client'

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0]{
      heroHeadline,
      heroSubheading,
      ctaText,
      ctaLink
    }
  `)
}

export async function getAllTestimonies() {
  return client.fetch(`
    *[_type == "testimony" && status == "approved"] | order(_createdAt desc){
      _id,
      title,
      slug,
      person,
      category,
      shortDescription
    }
  `)
}

export async function getTestimonyBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "testimony" && slug.current == $slug && status == "approved"][0]{
      _id,
      title,
      slug,
      person,
      category,
      shortDescription,
      story,
      videoUrl,
      publishedAt
    }
  `,
    { slug }
  )
}

export async function getFeaturedTestimony() {
  return client.fetch(`
    *[_type == "testimony" && status == "approved" && featured == true][0]{
      _id,
      title,
      slug,
      person,
      category,
      shortDescription
    }
  `)
}

export async function getRecentTestimonies() {
  return client.fetch(`
    *[_type == "testimony" && status == "approved"] | order(_createdAt desc)[0...3]{
      _id,
      title,
      slug,
      person,
      category,
      shortDescription
    }
  `)
}