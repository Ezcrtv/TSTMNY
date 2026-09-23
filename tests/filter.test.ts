import { test } from 'node:test'
import assert from 'node:assert/strict'
import { filterByTheme, relatedStories } from '../lib/stories/filter.ts'
import type { Story } from '../lib/stories/types.ts'

const base = { name: '', sport: '', location: '', title: '', excerpt: '', quote: '', image: { src: '', alt: '' }, body: [], date: '2026-01-01' }
const stories: Story[] = [
  { ...base, slug: 'a', categories: ['faith', 'discipline'] },
  { ...base, slug: 'b', categories: ['faith'] },
  { ...base, slug: 'c', categories: ['recovery'] },
  { ...base, slug: 'd', categories: ['discipline'] },
]

test('filterByTheme returns all stories without a theme', () => {
  assert.equal(filterByTheme(stories).length, 4)
})

test('filterByTheme returns only matching stories', () => {
  assert.deepEqual(filterByTheme(stories, 'faith').map((s) => s.slug), ['a', 'b'])
})

test('filterByTheme ignores unknown themes', () => {
  assert.equal(filterByTheme(stories, 'nonsense').length, 4)
})

test('relatedStories excludes current and ranks shared themes first', () => {
  const related = relatedStories(stories, stories[0], 3).map((s) => s.slug)
  assert.equal(related.includes('a'), false)
  assert.deepEqual(related.slice(0, 2).sort(), ['b', 'd'])
  assert.equal(related.length, 3)
})
