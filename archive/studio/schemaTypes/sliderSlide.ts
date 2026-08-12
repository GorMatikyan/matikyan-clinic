export const sliderSlide = {
  name: "sliderSlide",
  title: "Slider Slide",
  type: "document",
  fields: [
    { name: "tag", title: "Tag (badge text)", type: "string" },
    { name: "title", title: "Title", type: "string", validation: (R: any) => R.required() },
    { name: "desc", title: "Description", type: "text", rows: 2 },
    { name: "cta", title: "CTA Button Label", type: "string" },
    { name: "link", title: "CTA Link (e.g. /services)", type: "string" },
    { name: "image", title: "Background Image", type: "image", options: { hotspot: true } },
    { name: "order", title: "Sort Order", type: "number" },
  ],
  preview: {
    select: { title: "title", subtitle: "tag", media: "image" },
  },
};
