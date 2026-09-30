const CMS_API_BASE_URL = import.meta.env.VITE_CMS_API_BASE_URL ?? "https://matikyan-admin.am";

export interface CmsSeoFields {
  metaTitleHy: string | null;
  metaTitleEn: string | null;
  metaTitleRu: string | null;
  metaDescriptionHy: string | null;
  metaDescriptionEn: string | null;
  metaDescriptionRu: string | null;
  canonicalUrl: string | null;
  robotsNoindex: boolean;
  robotsNofollow: boolean;
  ogTitleHy: string | null;
  ogTitleEn: string | null;
  ogTitleRu: string | null;
  ogDescriptionHy: string | null;
  ogDescriptionEn: string | null;
  ogDescriptionRu: string | null;
  ogImageUrl: string | null;
  schemaType: string;
  schemaJson: string | null;
}

export interface CmsPageSeo {
  path: string;
  seoFields: CmsSeoFields;
}

/** hy/en/ru - matches AppLanguage in ../app/routing.tsx (not imported here to avoid this
 * data-layer module depending on the app layer). */
type Language = "hy" | "en" | "ru";

function localizedSuffix(language: Language) {
  return language === "hy" ? "Hy" : language === "en" ? "En" : "Ru";
}

/** Picks the {base}Hy/{base}En/{base}Ru field for the given language from CmsSeoFields - shared
 * by SeoHead.tsx (pages) and BlogDetail.tsx (posts), which both need this exact lookup. Page SEO
 * fallback (own-language -> seo.ts's per-language default) happens in SeoHead.tsx, not here -
 * this just returns whatever's actually stored, including null. */
export function pickLocalizedSeoField(
  fields: CmsSeoFields,
  base: "metaTitle" | "metaDescription" | "ogTitle" | "ogDescription",
  language: Language,
): string | null {
  return fields[`${base}${localizedSuffix(language)}` as keyof CmsSeoFields] as string | null;
}

/** Picks a blog post's {base}Hy/{base}En/{base}Ru content field, falling back to the Armenian
 * value when a translation hasn't been filled in yet - unlike page SEO, blog posts have no
 * secondary per-language fallback source (no per-post seo.ts entry), so Armenian is the only
 * sensible fallback. Shared by BlogDetail.tsx and Blog.tsx (the listing), which both need it. */
export function pickLocalizedBlogField(post: CmsBlogPost, base: "title" | "excerpt" | "bodyHtml", language: Language): string {
  const own = post[`${base}${localizedSuffix(language)}` as keyof CmsBlogPost] as string | null;
  return own || (post[`${base}Hy` as keyof CmsBlogPost] as string) || "";
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
  titleHy: string;
  titleEn: string | null;
  titleRu: string | null;
  excerptHy: string | null;
  excerptEn: string | null;
  excerptRu: string | null;
  bodyHtmlHy: string | null;
  bodyHtmlEn: string | null;
  bodyHtmlRu: string | null;
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
  googleAnalyticsId: string | null;
  yandexMetricaId: string | null;
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

// previewToken lets an admin open a DRAFT post before publishing - see BlogPostPreviewTokenService
// on the backend. Omitted for normal (published-only) visits.
export async function fetchBlogPostBySlug(slug: string, previewToken?: string): Promise<CmsBlogPost | null> {
  const query = previewToken ? `?previewToken=${encodeURIComponent(previewToken)}` : "";
  return get<CmsBlogPost>(`/api/public/cms/blog-posts/${encodeURIComponent(slug)}${query}`);
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
