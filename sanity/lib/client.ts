import { createClient, type SanityClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

/** Null when Sanity env vars are not configured, so the site can fall back to local content. */
export const client: SanityClient | null =
  projectId && dataset
    ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: true })
    : null
