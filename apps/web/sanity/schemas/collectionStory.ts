import { defineField, defineType } from "sanity";

export const collectionStory = defineType({
  name: "collectionStory",
  title: "Collection story",
  type: "document",
  fields: [
    defineField({ name: "title_ar", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "title_en", title: "Title (English)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title_en" } }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Identity", value: "identity" },
          { title: "Emotion", value: "emotion" },
          { title: "Career", value: "career" },
          { title: "Nostalgia", value: "nostalgia" },
          { title: "Celebration", value: "celebration" },
          { title: "Seasonal", value: "seasonal" },
        ],
      },
    }),
    defineField({ name: "hero_image", title: "Hero image", type: "image" }),
    defineField({ name: "hero_video", title: "Hero video", type: "file" }),
    defineField({ name: "excerpt_ar", title: "Excerpt (Arabic)", type: "text" }),
    defineField({ name: "excerpt_en", title: "Excerpt (English)", type: "text" }),
    defineField({ name: "body_ar", title: "Body (Arabic)", type: "text" }),
    defineField({ name: "body_en", title: "Body (English)", type: "text" }),
    defineField({
      name: "artists",
      title: "Artists",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    }),
    defineField({
      name: "medusa_collection_handle",
      title: "Medusa collection handle",
      type: "string",
    }),
    defineField({
      name: "is_gift_collection",
      title: "Gift collection",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
      ],
    }),
  ],
});
