import { defineField, defineType } from 'sanity'

/** A sport (Football, Basketball…). Adding one here is all it takes to support a new sport. */
export const sport = defineType({
  name: 'sport',
  title: 'Sport',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used in the archive URL, e.g. /testimony?sport=basketball',
      options: { source: 'title', maxLength: 48 },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
