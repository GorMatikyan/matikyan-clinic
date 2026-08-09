const CMS_API_BASE_URL = import.meta.env.VITE_CMS_API_BASE_URL ?? "https://matikyan-admin.am";

export interface CmsSeoFields {
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  robotsNoindex: boolean;
  robotsNofollow: boolean;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;
  schemaType: string;
  schemaJson: string | null;
}

export interface CmsPageSeo {
  path: string;
  seoFields: CmsSeoFields;
}

export interface CmsMediaAsset {
  id: number;
  url: string;
  altText: string;
  width: number | null;
  height: number | null;
}

export interface CmsBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  bodyHtml: string | null;
  coverImage: CmsMediaAsset | null;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  seoFields: CmsSeoFields;
}

export interface CmsPublicSettings {
  businessName: string;
  preferredDomain: string;
  address: string;
  phoneNumber: string;
  whatsappNumber: string | null;
  email: string;
  openingHours: string | null;
  defaultOgImageUrl: string | null;
  googleMapsEmbedUrl: string | null;
  googleBusinessProfileUrl: string | null;
  yandexMapsUrl: string | null;
  socialLinksJson: string | null;
}

interface BaseResponse<T> {
  data: T;
  statusCode: number;
  errorMessage?: string;
}

interface SpringPage<T> {
  content: T[];
}

async function get<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${CMS_API_BASE_URL}${path}`);
    if (!response.ok) return null;
    const body = (await response.json()) as BaseResponse<T>;
    return body.data ?? null;
  } catch {
    return null;
  }
}

export async function fetchPublishedBlogPosts(): Promise<CmsBlogPost[]> {
  const page = await get<SpringPage<CmsBlogPost>>("/api/public/cms/blog-posts?size=50&sortBy=publishedAt&direction=DESC");
  return page?.content ?? [];
}

export async function fetchBlogPostBySlug(slug: string): Promise<CmsBlogPost | null> {
  return get<CmsBlogPost>(`/api/public/cms/blog-posts/${encodeURIComponent(slug)}`);
}

export interface CmsRedirect {
  targetPath: string;
  type: "PERMANENT_301" | "TEMPORARY_302";
}

/**
 * Client-side fallback only - the real HTTP 301/302 for crawlers comes from the generated
 * .htaccess rules (see scripts/export-seo-files.mjs). This exists so redirects still work in
 * `npm run dev` (which never reads .htaccess) and as a safety net if the static host can't run
 * mod_alias for some reason.
 */
export async function resolveRedirect(path: string): Promise<CmsRedirect | null> {
  return get<CmsRedirect>(`/api/public/cms/redirects/resolve?path=${encodeURIComponent(path)}`);
}

export interface ContactRequestPayload {
  country: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  message?: string;
}

export async function submitContactRequest(payload: ContactRequestPayload): Promise<boolean> {
  try {
    const response = await fetch(`${CMS_API_BASE_URL}/api/public/contact-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
}
