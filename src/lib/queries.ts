export const DOCTORS_QUERY = `*[_type == "doctor"] | order(order asc) {
  _id, name, title, specialty, experience, rating, reviews, education, desc,
  "photo": photo.asset->url
}`;

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id, category, title, tagline, desc, price, duration, rating, benefits,
  "image": image.asset->url
}`;

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(featured desc, publishedAt desc) {
  _id, title, category, excerpt, author, featured, readTime,
  "cover": image.asset->url,
  "date": publishedAt
}`;

export const REVIEWS_QUERY = `*[_type == "review"] | order(featured desc, _createdAt desc) {
  _id, name, rating, date, service, text, source, featured,
  "avatar": avatar.asset->url
}`;

export const FAQ_QUERY = `*[_type == "faqItem"] | order(category asc, order asc) {
  _id, question, answer, category, order
}`;

export const SLIDES_QUERY = `*[_type == "sliderSlide"] | order(order asc) {
  _id, tag, title, desc, cta, link,
  "image": image.asset->url
}`;
