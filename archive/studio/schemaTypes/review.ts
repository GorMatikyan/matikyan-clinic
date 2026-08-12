export const review = {
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    { name: "name", title: "Patient Name", type: "string", validation: (R: any) => R.required() },
    { name: "rating", title: "Rating (1–5)", type: "number",
      validation: (R: any) => R.required().min(1).max(5) },
    { name: "date", title: "Date (e.g. 'May 2026')", type: "string" },
    { name: "service", title: "Service Received", type: "string" },
    { name: "text", title: "Review Text", type: "text", rows: 4 },
    { name: "avatar", title: "Patient Photo", type: "image", options: { hotspot: true } },
    { name: "source", title: "Review Source", type: "string",
      options: { list: ["Google","Yelp","Healthgrades","Facebook"] } },
    { name: "featured", title: "Featured Review", type: "boolean", initialValue: false },
  ],
  preview: {
    select: { title: "name", subtitle: "service" },
  },
};
