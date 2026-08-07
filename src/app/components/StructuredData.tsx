import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import schemaData from "../../generated/schema.json";
import { buildCanonicalUrl, getSeoMetadata } from "../seo";
import { getLocalizedServiceDetailBySlug } from "../serviceData";
import { getLanguageFromPathname, localizePath, stripLanguagePrefix } from "../routing";

const BASE_URL = "https://matikyan.am";
const WEBSITE_ID = `${BASE_URL}/#website`;
const CLINIC_ID = `${BASE_URL}/#clinic`;
type JsonLdEntry = Record<string, unknown> & { "@id": string };

// LocalBusiness + Organization/Logo schema (mandatory spec item 13) comes from
// src/generated/schema.json, baked at build time from the admin Settings panel - see
// scripts/export-seo-files.mjs. WebSite rarely changes, so it stays a small static block here.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: BASE_URL,
  name: "Matikyan Dental Clinic",
} as const;

export function StructuredData() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const currentLanguage = getLanguageFromPathname(pathname);
  const routePath = stripLanguagePrefix(pathname);
  const service = getLocalizedServiceDetailBySlug(routePath);
  const metadata = getSeoMetadata(routePath, currentLanguage);
  const serviceStructuredData = service && metadata
    ? buildServiceStructuredData({
      service,
      title: metadata.title,
      description: metadata.description,
      canonicalUrl: buildCanonicalUrl(localizePath(metadata.canonicalPath, currentLanguage)),
      language: currentLanguage,
      homeLabel: t("nav.home"),
      servicesLabel: t("nav.services"),
      homeUrl: buildCanonicalUrl(localizePath("/", currentLanguage)),
      servicesUrl: buildCanonicalUrl(localizePath("/services", currentLanguage)),
      faqItems: getServiceFaqItems(service.faqs),
    })
    : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      {serviceStructuredData.map((entry) => (
        <script
          key={entry["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}

type ServiceSchemaInput = {
  service: NonNullable<ReturnType<typeof getLocalizedServiceDetailBySlug>>;
  title: string;
  description: string;
  canonicalUrl: string;
  language: string;
  homeLabel: string;
  servicesLabel: string;
  homeUrl: string;
  servicesUrl: string;
  faqItems: Array<{ question: string; answer: string }>;
};

function buildServiceStructuredData({
  service,
  title,
  description,
  canonicalUrl,
  language,
  homeLabel,
  servicesLabel,
  homeUrl,
  servicesUrl,
  faqItems,
}: ServiceSchemaInput) {
  const serviceId = `${canonicalUrl}#service`;
  const webPageId = `${canonicalUrl}#webpage`;
  const breadcrumbId = `${canonicalUrl}#breadcrumb`;
  const faqId = `${canonicalUrl}#faq`;

  const entries: JsonLdEntry[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": breadcrumbId,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: homeLabel,
          item: homeUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: servicesLabel,
          item: servicesUrl,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.title,
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": serviceId,
      name: service.title,
      description: service.desc,
      serviceType: service.category,
      url: canonicalUrl,
      provider: {
        "@id": CLINIC_ID,
      },
      mainEntityOfPage: {
        "@id": webPageId,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": webPageId,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: language,
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      about: {
        "@id": serviceId,
      },
      breadcrumb: {
        "@id": breadcrumbId,
      },
      provider: {
        "@id": CLINIC_ID,
      },
    },
  ];

  if (faqItems.length > 0) {
    entries.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": faqId,
      mainEntity: faqItems.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    });
  }

  return entries;
}

function getServiceFaqItems(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (typeof item !== "string") {
      return [];
    }

    const [question, answer] = item.split("::");

    if (!question || !answer) {
      return [];
    }

    return [{ question, answer }];
  });
}
