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
