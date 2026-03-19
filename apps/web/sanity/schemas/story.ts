import { defineField, defineType } from "sanity";

export const story = defineType({
  name: "story",
  title: "Editorial story",
  type: "document",
  description: "Blog/stories section for editorial content",
  fields: [
    defineField({ name: "title_ar", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "title_en", title: "Title (English)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title_en" } }),
    defineField({ name: "body_ar", title: "Body (Arabic)", type: "text" }),
    defineField({ name: "body_en", title: "Body (English)", type: "text" }),
    defineField({ name: "cover_image", title: "Cover image", type: "image" }),
    defineField({ name: "published_at", title: "Published at", type: "datetime" }),
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
