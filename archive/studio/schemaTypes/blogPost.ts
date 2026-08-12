export const blogPost = {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (R: any) => R.required() },
    { name: "category", title: "Category", type: "string",
      options: { list: ["Oral Health","Cosmetic","Orthodontics","Nutrition","Technology","General"] } },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
    { name: "author", title: "Author", type: "string" },
    { name: "publishedAt", title: "Published At", type: "date" },
    { name: "readTime", title: "Read Time (minutes)", type: "number" },
    { name: "featured", title: "Featured Post", type: "boolean", initialValue: false },
    { name: "image", title: "Cover Image", type: "image", options: { hotspot: true } },
    { name: "content", title: "Content", type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
};
