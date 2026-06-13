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
      validation: (Rule) => Rule.required(),
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
    defineField({ name: 'shortDescription', title: 'Short Description (one-liner for cards)', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'person.name', media: 'thumbnail' },
  },
})