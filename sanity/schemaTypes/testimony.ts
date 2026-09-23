import { defineField, defineType } from 'sanity'

export const testimony = defineType({
  name: 'testimony',
  title: 'Testimony',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'person',
      title: 'Person',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({ name: 'sport', title: 'Sport', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string', description: 'City, Country' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, description: 'Two or three sentences shown on cards and at the top of the story.' }),
    defineField({ name: 'quote', title: 'Pull quote', type: 'text', rows: 2 }),
    defineField({
      name: 'categories',
      title: 'Themes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
        list: [
          { title: 'Faith', value: 'faith' },
          { title: 'Discipline', value: 'discipline' },
          { title: 'Identity', value: 'identity' },
          { title: 'Purpose', value: 'purpose' },
          { title: 'Failure', value: 'failure' },
          { title: 'Recovery', value: 'recovery' },
          { title: 'Leadership', value: 'leadership' },
        ],
      },
    }),
    defineField({ name: 'videoUrl', title: 'Video URL (YouTube or Vimeo)', type: 'url' }),
    defineField({
      name: 'thumbnail',
      title: 'Lead image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'story', title: 'Story', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'category',
      title: 'Category (legacy)',
      hidden: true,
      type: 'string',
      options: {
        list: [
          { title: 'Salvation', value: 'salvation' },
          { title: 'Healing', value: 'healing' },
          { title: 'Restoration', value: 'restoration' },
          { title: 'Other', value: 'other' },
        ],
      },
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'featured', title: 'Featured (pin to homepage)', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'shortDescription', title: 'Short Description (legacy — use Excerpt)', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'person.name', media: 'thumbnail' },
  },
})