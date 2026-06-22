export const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Service Name", type: "string", validation: (R: any) => R.required() },
    { name: "category", title: "Category", type: "string",
      options: { list: ["Preventive","Cosmetic","Restorative","Orthodontics","Surgery","Pediatric"] } },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "desc", title: "Description", type: "text", rows: 4 },
    { name: "price", title: "Price (e.g. 'From $80')", type: "string" },
    { name: "duration", title: "Duration (e.g. '60 min')", type: "string" },
    { name: "rating", title: "Rating (0–5)", type: "number" },
    { name: "benefits", title: "Benefits", type: "array", of: [{ type: "string" }] },
    { name: "image", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "order", title: "Sort Order", type: "number" },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
};
