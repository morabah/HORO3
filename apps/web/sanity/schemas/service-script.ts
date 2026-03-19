import { defineField, defineType } from "sanity";

export const serviceScript = defineType({
  name: "serviceScript",
  title: "Service script",
  type: "document",
  description: "Service voice scenarios (10 scripts from Brand Guideline)",
  fields: [
    defineField({ name: "scenario_key", title: "Scenario key", type: "string", description: "e.g. sizing_inquiry, price_objection" }),
    defineField({ name: "title_ar", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "title_en", title: "Title (English)", type: "string" }),
    defineField({ name: "script_ar", title: "Script (Arabic)", type: "text" }),
    defineField({ name: "script_en", title: "Script (English)", type: "text" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
});
