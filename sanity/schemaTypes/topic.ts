import { defineField, defineType } from 'sanity'

/** A testimony topic (Faith, Injury, Family…). Shown as a filter on the archive once a story uses it. */
export const topic = defineType({
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the archive URL, e.g. /testimony?topic=injury',
      options: { source: 'title', maxLength: 48 },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
