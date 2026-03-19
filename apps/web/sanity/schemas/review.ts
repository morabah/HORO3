import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "author_name", title: "Author name", type: "string" }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (rule) => rule.min(1).max(5) }),
    defineField({ name: "body_ar", title: "Body (Arabic)", type: "text" }),
    defineField({ name: "body_en", title: "Body (English)", type: "text" }),
    defineField({ name: "ugc_photo", title: "UGC photo", type: "image" }),
    defineField({ name: "product_ref", title: "Product reference", type: "string", description: "Medusa product ID or handle" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
});
