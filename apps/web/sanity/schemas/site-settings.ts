import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Site title", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "description_ar", title: "Description (Arabic)", type: "text" }),
    defineField({ name: "description_en", title: "Description (English)", type: "text" }),
    defineField({ name: "tagline_ar", title: "Tagline (Arabic)", type: "string" }),
    defineField({ name: "tagline_en", title: "Tagline (English)", type: "string" }),
    defineField({ name: "og_image", title: "Default OG image", type: "image" }),
    defineField({ name: "whatsapp_number", title: "WhatsApp number", type: "string" }),
    defineField({ name: "support_email", title: "Support email", type: "string" }),
    defineField({ name: "instagram_url", title: "Instagram URL", type: "url" }),
    defineField({
      name: "gift_packaging_fee_egp",
      title: "Gift packaging fee (EGP)",
      type: "number",
      initialValue: 30,
    }),
    defineField({
      name: "prepaid_shipping_copy_ar",
      title: "Prepaid shipping copy (Arabic)",
      type: "text",
    }),
    defineField({
      name: "prepaid_shipping_copy_en",
      title: "Prepaid shipping copy (English)",
      type: "text",
    }),
    defineField({
      name: "shipping_copy_ar",
      title: "Shipping copy (Arabic)",
      type: "text",
    }),
    defineField({
      name: "shipping_copy_en",
      title: "Shipping copy (English)",
      type: "text",
    }),
    defineField({
      name: "size_recommendation_matrix",
      title: "Size recommendation matrix",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "size", title: "Size", type: "string" },
            { name: "min_height_cm", title: "Min height (cm)", type: "number" },
            { name: "max_height_cm", title: "Max height (cm)", type: "number" },
            { name: "min_weight_kg", title: "Min weight (kg)", type: "number" },
            { name: "max_weight_kg", title: "Max weight (kg)", type: "number" },
          ],
        },
      ],
    }),
  ],
});
