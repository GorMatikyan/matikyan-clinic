import { useEffect } from "react";
import { useLocation } from "react-router";
import { buildCanonicalUrl, getNotFoundSeoMetadata, getSeoMetadata } from "../seo";
import { getLanguageFromPathname, localizePath, PRIMARY_LANGUAGE, SUPPORTED_LANGUAGES, stripLanguagePrefix } from "../routing";

const MANAGED_ATTRIBUTE = "data-seo-managed";

export function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const currentLanguage = getLanguageFromPathname(pathname);
    const routePath = stripLanguagePrefix(pathname);
    const routeMetadata = getSeoMetadata(routePath, currentLanguage);
    const metadata = routeMetadata ?? getNotFoundSeoMetadata(currentLanguage);

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

    if (!routeMetadata) {
      upsertMeta("name", "robots", "noindex, nofollow");
      removeLink("canonical");
      removeMeta("property", "og:url");
      clearAlternateLinks();
      return;
    }

    removeMeta("name", "robots");

    const canonicalUrl = buildCanonicalUrl(localizePath(routeMetadata.canonicalPath, currentLanguage));

    upsertLink("canonical", canonicalUrl);
    upsertMeta("property", "og:url", canonicalUrl);
    replaceAlternateLinks(
      SUPPORTED_LANGUAGES.map((language) => ({
        hrefLang: language,
        href: buildCanonicalUrl(localizePath(routeMetadata.canonicalPath, language)),
      })),
      buildCanonicalUrl(localizePath(routeMetadata.canonicalPath, PRIMARY_LANGUAGE)),
    );
  }, [pathname]);

  return null;
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
