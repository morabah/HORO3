import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question_ar", title: "Question (Arabic)", type: "string" }),
    defineField({ name: "question_en", title: "Question (English)", type: "string" }),
    defineField({ name: "answer_ar", title: "Answer (Arabic)", type: "text" }),
    defineField({ name: "answer_en", title: "Answer (English)", type: "text" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
});
