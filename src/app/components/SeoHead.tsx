import { useEffect } from "react";
import { useLocation } from "react-router";
import { buildCanonicalUrl, getNotFoundSeoMetadata, getSeoMetadata, type SeoMetadata } from "../seo";
import { getLanguageFromPathname, localizePath, PRIMARY_LANGUAGE, SUPPORTED_LANGUAGES, stripLanguagePrefix, type AppLanguage } from "../routing";
import { useSeoOverride, type SeoOverride } from "../seoOverrides";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import type { CmsPageSeo } from "../../lib/cmsApi";
import { pickLocalizedSeoField } from "../../lib/cmsApi";
import pagesData from "../../generated/pages.json";

const MANAGED_ATTRIBUTE = "data-seo-managed";
const SCHEMA_ATTRIBUTE = "data-seo-managed-schema";

// Page-SEO overlays (meta/canonical/OG/robots/schema per route), baked at build time from the
// admin Pages panel - see scripts/export-seo-files.mjs. This is a static lookup, not a runtime
// fetch: page SEO barely changes, so there's no reason to pay for a network round-trip to a
// separate backend host on every navigation. Blog posts are the one exception that stays live
// (via the seoOverrides store, set by BlogDetail) since the blog is expected to publish instantly.
const pages = pagesData as CmsPageSeo[];

// Page SEO fallback is admin's own-language field -> seo.ts's per-language default -> never the
// raw Armenian admin value (returning null/undefined here, not the hy field, is what lets
// mergeMetadata() fall through to seo.ts's routeSeo below). Falling back to Armenian text would
// silently reintroduce the exact leak this per-language split was built to fix - pages already
// have a genuine per-language fallback source (seo.ts) predating this feature, blog posts don't
// (see BlogDetail.tsx, which falls back to Armenian instead, for exactly that reason).
function findPageOverride(routePath: string, currentLanguage: AppLanguage): SeoOverride | null {
  const page = pages.find((p) => p.path === routePath);
  if (!page) return null;

  const fields = page.seoFields;
  const override: SeoOverride = {
    robotsNoindex: fields.robotsNoindex,
    robotsNofollow: fields.robotsNofollow,
  };

  const metaTitle = pickLocalizedSeoField(fields, "metaTitle", currentLanguage);
  const metaDescription = pickLocalizedSeoField(fields, "metaDescription", currentLanguage);
  const ogTitle = pickLocalizedSeoField(fields, "ogTitle", currentLanguage);
  const ogDescription = pickLocalizedSeoField(fields, "ogDescription", currentLanguage);

  if (metaTitle) override.title = metaTitle;
  if (metaDescription) override.description = metaDescription;
  if (fields.canonicalUrl) override.canonicalPath = fields.canonicalUrl;
  if (ogTitle) override.ogTitle = ogTitle;
  if (ogDescription) override.ogDescription = ogDescription;
  if (fields.ogImageUrl) override.ogImage = fields.ogImageUrl;

  return override;
}

export function SeoHead() {
  const { pathname } = useLocation();
  const routePath = stripLanguagePrefix(pathname);
  const liveOverride = useSeoOverride(routePath);
  const settings = useSiteSettings();

  useEffect(() => {
    const currentLanguage = getLanguageFromPathname(pathname);
    const pageOverride = findPageOverride(routePath, currentLanguage);
    const override = liveOverride ?? pageOverride;

    const baseMetadata = getSeoMetadata(routePath, currentLanguage);
    const metadata = mergeMetadata(baseMetadata, override, routePath, settings.defaultOgImageUrl);

    if (!metadata) {
      const fallback = getNotFoundSeoMetadata(currentLanguage);
      document.title = fallback.title;
      upsertMeta("name", "description", fallback.description);
      upsertMeta("name", "robots", "noindex, nofollow");
      removeLink("canonical");
      removeMeta("property", "og:url");
      clearAlternateLinks();
      removeSchemaScript();
      return;
    }

    document.title = metadata.title;
    document.documentElement.lang = currentLanguage;
    upsertMeta("name", "description", metadata.description);

    upsertMeta("property", "og:title", metadata.ogTitle ?? metadata.title);
    upsertMeta("property", "og:description", metadata.ogDescription ?? metadata.description);
    upsertMeta("property", "og:type", metadata.ogType ?? "website");

    if (metadata.ogImage) {
      upsertMeta("property", "og:image", metadata.ogImage);
    }

    upsertMeta("name", "twitter:card", metadata.twitterCard ?? "summary");
    upsertMeta("name", "twitter:title", metadata.ogTitle ?? metadata.title);
    upsertMeta("name", "twitter:description", metadata.ogDescription ?? metadata.description);

    if (metadata.ogImage) {
      upsertMeta("name", "twitter:image", metadata.ogImage);
    }

    const robotsDirectives = [
      override?.robotsNoindex ? "noindex" : "index",
      override?.robotsNofollow ? "nofollow" : "follow",
    ].join(", ");

    if (override?.robotsNoindex || override?.robotsNofollow) {
      upsertMeta("name", "robots", robotsDirectives);
    } else {
      removeMeta("name", "robots");
    }

    // metadata.canonicalPath may already be an absolute URL (BlogDetail sets a real
    // per-post URL here) - normalize to a bare relative path first so localizePath()
    // (which expects a relative path) can correctly re-derive it for every language,
    // instead of treating the whole absolute URL as one opaque unrecognized segment.
    const canonicalPath = metadata.canonicalPath.startsWith("http")
      ? stripLanguagePrefix(new URL(metadata.canonicalPath).pathname)
      : metadata.canonicalPath;

    const canonicalUrl = buildCanonicalUrl(localizePath(canonicalPath, currentLanguage));

    upsertLink("canonical", canonicalUrl);
    upsertMeta("property", "og:url", canonicalUrl);

    if (override?.skipHreflang) {
      clearAlternateLinks();
    } else {
      replaceAlternateLinks(
        SUPPORTED_LANGUAGES.map((language) => ({
          hrefLang: language,
          href: buildCanonicalUrl(localizePath(canonicalPath, language)),
        })),
        buildCanonicalUrl(localizePath(canonicalPath, PRIMARY_LANGUAGE)),
      );
    }

    // Page-type-specific schema (FAQ/Product/etc.) set in the admin Pages panel. Separate from
    // the site-wide LocalBusiness/Organization/WebSite schema StructuredData always renders.
    // Skipped when a live (blog) override owns this route - BlogDetail injects its own Article
    // schema directly.
    const schemaPage = pages.find((p) => p.path === routePath);
    if (!liveOverride && schemaPage && schemaPage.seoFields.schemaType !== "NONE" && schemaPage.seoFields.schemaJson) {
      upsertSchemaScript(schemaPage.seoFields.schemaJson);
    } else {
      removeSchemaScript();
    }
  }, [pathname, routePath, liveOverride, settings]);

  return null;
}

function mergeMetadata(
  base: SeoMetadata | null,
  override: SeoOverride | null,
  routePath: string,
  siteDefaultOgImage: string | null,
): SeoMetadata | null {
  const start: SeoMetadata | null = base
    ? { ...base, ogImage: siteDefaultOgImage ?? base.ogImage }
    : override
      ? {
          title: override.title ?? "",
          description: override.description ?? "",
          canonicalPath: routePath,
          ogType: override.ogType ?? "article",
          ogImage: siteDefaultOgImage ?? undefined,
        }
      : null;

  if (!override) {
    return start;
  }

  if (!start) {
    return null;
  }

  return {
    ...start,
    title: override.title ?? start.title,
    description: override.description ?? start.description,
    canonicalPath: override.canonicalPath ?? start.canonicalPath,
    ogTitle: override.ogTitle ?? start.ogTitle,
    ogDescription: override.ogDescription ?? start.ogDescription,
    ogImage: override.ogImage ?? start.ogImage,
    ogType: override.ogType ?? start.ogType,
  };
}

function upsertMeta(attributeName: "name" | "property", attributeValue: string, content: string) {
  const selector = `meta[${attributeName}="${attributeValue}"]`;
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  const element = existing ?? document.createElement("meta");

  element.setAttribute(attributeName, attributeValue);
  element.setAttribute("content", content);
  element.setAttribute(MANAGED_ATTRIBUTE, "true");

  if (!existing) {
    document.head.appendChild(element);
  }
}

function upsertLink(rel: string, href: string) {
  const selector = `link[rel="${rel}"]`;
  const existing = document.head.querySelector<HTMLLinkElement>(selector);
  const element = existing ?? document.createElement("link");

  element.setAttribute("rel", rel);
  element.setAttribute("href", href);
  element.setAttribute(MANAGED_ATTRIBUTE, "true");

  if (!existing) {
    document.head.appendChild(element);
  }
}

function removeMeta(attributeName: "name" | "property", attributeValue: string) {
  document.head.querySelector<HTMLMetaElement>(`meta[${attributeName}="${attributeValue}"][${MANAGED_ATTRIBUTE}="true"]`)?.remove();
}

function removeLink(rel: string) {
  document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"][${MANAGED_ATTRIBUTE}="true"]`)?.remove();
}

function upsertSchemaScript(json: string) {
  removeSchemaScript();
  const element = document.createElement("script");
  element.setAttribute("type", "application/ld+json");
  element.setAttribute(SCHEMA_ATTRIBUTE, "true");
  element.textContent = json;
  document.head.appendChild(element);
}

function removeSchemaScript() {
  document.head.querySelector(`script[${SCHEMA_ATTRIBUTE}="true"]`)?.remove();
}

function replaceAlternateLinks(
  alternates: Array<{ hrefLang: string; href: string }>,
  xDefaultHref: string,
) {
  clearAlternateLinks();

  [...alternates, { hrefLang: "x-default", href: xDefaultHref }].forEach(({ hrefLang, href }) => {
    const element = document.createElement("link");
    element.setAttribute("rel", "alternate");
    element.setAttribute("hrefLang", hrefLang);
    element.setAttribute("href", href);
    element.setAttribute(MANAGED_ATTRIBUTE, "true");
    document.head.appendChild(element);
  });
}

function clearAlternateLinks() {
  document.head.querySelectorAll<HTMLLinkElement>(`link[${MANAGED_ATTRIBUTE}="true"][rel="alternate"]`).forEach((element) => {
    element.remove();
  });
}
