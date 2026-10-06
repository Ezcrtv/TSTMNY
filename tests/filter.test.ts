import { test } from 'node:test'
import assert from 'node:assert/strict'
import { archiveHref, filterStories, relatedStories, sportOptions, topicOptions } from '../lib/stories/filter.ts'
import { topicsFor } from '../lib/stories/topics.ts'
import type { Story } from '../lib/stories/types.ts'

const base = { name: '', location: '', title: '', excerpt: '', quote: '', image: { src: '', alt: '' }, body: [], date: '2026-01-01' }
const stories: Story[] = [
  { ...base, slug: 'a', sport: 'Football', topics: topicsFor(['faith', 'discipline']) },
  { ...base, slug: 'b', sport: 'Basketball', topics: topicsFor(['faith']) },
  { ...base, slug: 'c', sport: 'Football', topics: topicsFor(['recovery']) },
  { ...base, slug: 'd', sport: '', topics: [{ slug: 'grief', title: 'Grief' }, ...topicsFor(['discipline'])] },
]

const slugs = (list: Story[]) => list.map((s) => s.slug)

test('filterStories returns all stories without filters', () => {
  assert.equal(filterStories(stories).length, 4)
})

test('filterStories filters by topic', () => {
  assert.deepEqual(slugs(filterStories(stories, { topic: 'faith' })), ['a', 'b'])
})

test('filterStories filters by sport slug', () => {
  assert.deepEqual(slugs(filterStories(stories, { sport: 'football' })), ['a', 'c'])
})

test('filterStories combines topic and sport', () => {
  assert.deepEqual(slugs(filterStories(stories, { topic: 'faith', sport: 'basketball' })), ['b'])
})

test('topicOptions lists used topics in default order, new Sanity topics last', () => {
  assert.deepEqual(
    topicOptions(stories).map((t) => [t.slug, t.count]),
    [['faith', 2], ['recovery', 1], ['discipline', 2], ['grief', 1]],
  )
})

test('sportOptions lists sports alphabetically and skips blanks', () => {
  assert.deepEqual(sportOptions(stories).map((s) => [s.slug, s.count]), [['basketball', 1], ['football', 2]])
})

test('archiveHref builds shareable filter URLs', () => {
  assert.equal(archiveHref(), '/testimony')
  assert.equal(archiveHref({ topic: 'faith', sport: 'football' }), '/testimony?topic=faith&sport=football')
})

test('relatedStories excludes current and ranks shared topics first', () => {
  const related = slugs(relatedStories(stories, stories[0], 3))
  assert.equal(related.includes('a'), false)
  assert.deepEqual(related.slice(0, 2).sort(), ['b', 'd'])
  assert.equal(related.length, 3)
})
