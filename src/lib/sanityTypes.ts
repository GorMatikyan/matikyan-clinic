export interface SanityDoctor {
  _id?: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  education: string;
  desc: string;
  photo: string;
}

export interface SanityService {
  _id?: string;
  category: string;
  title: string;
  tagline: string;
  desc: string;
  price: string;
  duration: string;
  rating: number;
  image: string;
  benefits: string[];
  icon?: string;
}

export interface SanityBlogPost {
  _id?: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  publishedAt?: string;
  date?: string;
  readTime: number | string;
  image?: string;
  cover?: string;
  featured: boolean;
}

export interface SanityReview {
  _id?: string;
  name: string;
  rating: number;
  date: string;
  service: string;
  text: string;
  avatar: string;
  source: string;
  featured: boolean;
}

export interface SanityFaqItem {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
}

export interface SanitySlide {
  _id?: string;
  tag: string;
  title: string;
  desc: string;
  cta: string;
  link: string;
  image: string;
  order?: number;
}
