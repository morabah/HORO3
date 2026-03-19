import { defineField, defineType } from "sanity";

export const artist = defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({ name: "name_ar", title: "Name (Arabic)", type: "string" }),
    defineField({ name: "name_en", title: "Name (English)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name_en" } }),
    defineField({ name: "portrait", title: "Portrait", type: "image" }),
    defineField({ name: "bio_ar", title: "Bio (Arabic)", type: "text" }),
    defineField({ name: "bio_en", title: "Bio (English)", type: "text" }),
    defineField({ name: "studio_location", title: "Studio location", type: "string", description: "e.g. Zamalek, Cairo" }),
    defineField({ name: "style_tags", title: "Style tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "meaning_quote_ar", title: "Meaning quote (Arabic)", type: "string", description: "One sentence for bio card" }),
    defineField({ name: "meaning_quote_en", title: "Meaning quote (English)", type: "string" }),
    defineField({ name: "bts_video", title: "BTS video", type: "file", description: "Sketch-to-tee time-lapse 15-30s" }),
    defineField({
      name: "social_links",
      title: "Social links",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "behance", title: "Behance", type: "url" },
        { name: "website", title: "Website", type: "url" },
      ],
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "medusa_tag", title: "Medusa tag", type: "string", description: "Links to Medusa product tag" }),
    defineField({ name: "collaboration_number", title: "Collaboration number", type: "number", description: "e.g. First HORO collaboration" }),
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
