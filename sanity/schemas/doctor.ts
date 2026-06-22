export const doctor = {
  name: "doctor",
  title: "Doctor",
  type: "document",
  fields: [
    { name: "name", title: "Full Name", type: "string", validation: (R: any) => R.required() },
    { name: "title", title: "Position / Title", type: "string" },
    { name: "specialty", title: "Specialty", type: "string",
      options: { list: ["Implantology","Orthodontics","Cosmetic","Periodontics","Endodontics","Pediatric"] } },
    { name: "experience", title: "Experience (e.g. '14 years')", type: "string" },
    { name: "rating", title: "Rating (0–5)", type: "number" },
    { name: "reviews", title: "Number of Reviews", type: "number" },
    { name: "education", title: "Education", type: "string" },
    { name: "desc", title: "Short Bio", type: "text", rows: 3 },
    { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
    { name: "order", title: "Sort Order", type: "number" },
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
};
