import logoImg from "../../imports/matikyan-clinic-logo-am.png";

const BASE_URL = "https://matikyan.am";
const ORGANIZATION_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;
const CLINIC_ID = `${BASE_URL}/#clinic`;
const LOGO_URL = new URL(logoImg, `${BASE_URL}/`).toString();

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
  return (
    <>
      {structuredData.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
