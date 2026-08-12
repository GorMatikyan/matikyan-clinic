export const faqItem = {
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    { name: "question", title: "Question", type: "string", validation: (R: any) => R.required() },
    { name: "answer", title: "Answer", type: "text", rows: 4 },
    { name: "category", title: "Category", type: "string",
      options: { list: ["General","Treatments","Invisalign","Payment"] } },
    { name: "order", title: "Sort Order", type: "number" },
  ],
  preview: {
    select: { title: "question", subtitle: "category" },
  },
};
