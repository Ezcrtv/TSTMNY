import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mapSanityStory } from '../lib/stories/map-sanity.ts'

test('maps a full Sanity document', () => {
  const story = mapSanityStory({
    title: 'Before the whistle',
    slug: { current: 'before-the-whistle' },
    person: { name: 'Sam Doe' },
    sport: 'Football',
    location: 'Leeds',
    excerpt: 'Short.',
    quote: 'A line.',
    categories: ['faith', 'bogus'],
    publishedAt: '2026-03-02T10:00:00Z',
    imageUrl: 'https://cdn.sanity.io/x.jpg',
    videoUrl: 'https://youtu.be/abc',
    story: [
      { _type: 'block', style: 'normal', children: [{ text: 'One ' }, { text: 'two.' }] },
      { _type: 'block', style: 'blockquote', children: [{ text: 'Quoted.' }] },
      { _type: 'block', style: 'h2', children: [{ text: 'Heading' }] },
    ],
  })
  assert.ok(story)
  assert.equal(story.slug, 'before-the-whistle')
  assert.equal(story.name, 'Sam Doe')
  assert.deepEqual(story.categories, ['faith'])
  assert.equal(story.date, '2026-03-02')
  assert.equal(story.video?.url, 'https://youtu.be/abc')
  assert.deepEqual(story.body, [
    { type: 'paragraph', text: 'One two.' },
    { type: 'pullquote', text: 'Quoted.' },
    { type: 'heading', text: 'Heading' },
  ])
})

test('falls back gracefully on sparse documents', () => {
  const story = mapSanityStory({ title: 'T', slug: { current: 't' }, shortDescription: 'Legacy', _createdAt: '2026-01-05T00:00:00Z' })
  assert.ok(story)
  assert.equal(story.excerpt, 'Legacy')
  assert.equal(story.name, 'Unnamed')
  assert.equal(story.video, undefined)
  assert.equal(story.image.src, '/images/stories/placeholder.svg')
  assert.equal(story.date, '2026-01-05')
})

test('returns null without a slug', () => {
  assert.equal(mapSanityStory({ title: 'x' }), null)
})
