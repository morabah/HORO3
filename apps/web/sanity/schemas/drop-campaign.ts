import { defineField, defineType } from "sanity";

export const dropCampaign = defineType({
  name: "dropCampaign",
  title: "Drop campaign",
  type: "document",
  description: "7-day drop launch cycle content",
  fields: [
    defineField({ name: "title_ar", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "title_en", title: "Title (English)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title_en" } }),
    defineField({ name: "start_date", title: "Start date", type: "date" }),
    defineField({ name: "artist", title: "Artist", type: "reference", to: [{ type: "artist" }] }),
    defineField({ name: "day_minus_7_teaser", title: "Day -7 teaser", type: "text" }),
    defineField({ name: "day_minus_3_content", title: "Day -3 content", type: "text" }),
    defineField({ name: "day_minus_1_content", title: "Day -1 content", type: "text" }),
    defineField({ name: "day_0_content", title: "Day 0 launch content", type: "text" }),
    defineField({ name: "day_plus_2_content", title: "Day +2 content", type: "text" }),
    defineField({ name: "day_plus_5_content", title: "Day +5 content", type: "text" }),
    defineField({ name: "day_plus_7_content", title: "Day +7 wrap", type: "text" }),
  ],
});
