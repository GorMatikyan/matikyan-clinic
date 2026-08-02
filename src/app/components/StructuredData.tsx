import { useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import logoImg from "../../imports/matikyan-clinic-logo-am.png";
import { buildCanonicalUrl, getSeoMetadata } from "../seo";
import { getLocalizedServiceDetailBySlug } from "../serviceData";
import { getLanguageFromPathname, localizePath, stripLanguagePrefix } from "../routing";

const BASE_URL = "https://matikyan.am";
const ORGANIZATION_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const CLINIC_ID = `${BASE_URL}/#clinic`;
const LOGO_URL = new URL(logoImg, `${BASE_URL}/`).toString();
type JsonLdEntry = Record<string, unknown> & { "@id": string };

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Matikyan Dental Clinic",
    url: BASE_URL,
    telephone: "+37410210122",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5 Aram Khachatryan St.",
      addressLocality: "Yerevan",
      postalCode: "0033",
      addressCountry: "AM",
    },
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: BASE_URL,
    name: "Matikyan Dental Clinic",
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": CLINIC_ID,
    name: "Matikyan Dental Clinic",
    url: BASE_URL,
    image: LOGO_URL,
    logo: LOGO_URL,
    telephone: "+37410210122",
    address: {
      "@type": "PostalAddress",
      streetAddress: "5 Aram Khachatryan St.",
      addressLocality: "Yerevan",
      postalCode: "0033",
      addressCountry: "AM",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "https://schema.org/Monday",
          "https://schema.org/Tuesday",
          "https://schema.org/Wednesday",
          "https://schema.org/Thursday",
          "https://schema.org/Friday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "https://schema.org/Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    parentOrganization: {
      "@id": ORGANIZATION_ID,
    },
  },
] as const;

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
      {structuredData.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
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
