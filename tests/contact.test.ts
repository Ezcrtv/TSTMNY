import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateContact } from '../lib/forms/contact.ts'

const valid = { name: 'Ada', email: 'ada@example.com', reason: 'testimony', message: 'Hello there.' }

test('accepts a valid submission and trims values', () => {
  const r = validateContact({ ...valid, name: '  Ada ', organization: '' })
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.data.name, 'Ada')
    assert.equal(r.data.organization, undefined)
  }
})

test('rejects missing fields', () => {
  const r = validateContact({})
  assert.equal(r.ok, false)
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ['email', 'message', 'name', 'reason'])
})

test('rejects bad email and unknown reason', () => {
  const r = validateContact({ ...valid, email: 'nope', reason: 'spam' })
  assert.equal(r.ok, false)
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ['email', 'reason'])
})
