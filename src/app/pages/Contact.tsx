import { useState, type FormEvent } from "react";
import { Phone, Globe, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Share2 } from "lucide-react";
import { submitContactRequest } from "../../lib/cmsApi";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { parseSocialLinks, type SocialPlatform } from "../../lib/socialLinks";
import { useTranslation } from "react-i18next";
import { PageHero } from "../components/PageHero";

const DEFAULT_PHONE = "+37410210122";
const DEFAULT_GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=5%20Aram%20Khachatryan%20St%2C%20Yerevan%200033%2C%20Armenia";
const DEFAULT_GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps?q=5%20Aram%20Khachatryan%20St%2C%20Yerevan%200033%2C%20Armenia&z=16&output=embed";
const DEFAULT_YANDEX_MAPS_URL = "https://yandex.com/maps/?text=5%20Aram%20Khachatryan%20St%2C%20Yerevan%200033%2C%20Armenia";

const FALLBACK_SOCIAL_LINKS = [
  { url: "https://www.facebook.com/share/1LLcyQvwvZ/?mibextid=wwXIfr", platform: "facebook" as const },
  { url: "https://www.instagram.com/matikyandentalclinic?igsh=MTNtbGl1eW04M25ucA==", platform: "instagram" as const },
  { url: "https://www.youtube.com/@MatikyanDentalClinic", platform: "youtube" as const },
];

const socialIcons: Record<SocialPlatform, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  other: Share2,
};

const COUNTRIES = [
  "Armenia",
  "Russia",
  "United States",
  "France",
  "Belgium",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
] as const;

export function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    country: t("contact.request.armenia"),
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "validation-error" | "submit-error">("idle");

  function updateField(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!form.firstName || !form.lastName || (!form.phone && !form.email)) {
      setStatus("validation-error");
      return;
    }

    setStatus("submitting");
    const ok = await submitContactRequest(form);
    setStatus(ok ? "success" : "submit-error");
    if (ok) {
      setForm((prev) => ({ ...prev, firstName: "", lastName: "", phone: "", email: "", message: "" }));
    }
  }

  const settings = useSiteSettings();

  const phone = settings?.phoneNumber ?? DEFAULT_PHONE;
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
  const address = settings?.address ?? t("contact.info.addressValue");
  const email = settings?.email;
  const mapEmbedUrl = settings?.googleMapsEmbedUrl ?? DEFAULT_GOOGLE_MAPS_EMBED_URL;
  const googleMapsViewUrl = settings?.googleBusinessProfileUrl ?? DEFAULT_GOOGLE_MAPS_URL;
  const yandexMapsUrl = settings?.yandexMapsUrl ?? DEFAULT_YANDEX_MAPS_URL;
  const hoursLines = settings?.openingHours
    ? settings.openingHours.split(",").map((line) => line.trim())
    : [t("contact.info.hours1"), t("contact.info.hours2"), t("contact.info.hours3")];

  const socialLinkEntries = parseSocialLinks(settings?.socialLinksJson);
  const socialLinks = (socialLinkEntries.length > 0 ? socialLinkEntries : FALLBACK_SOCIAL_LINKS).map(({ url, platform }) => ({
    href: url,
    label: t(`contact.social.${platform === "other" ? "share" : platform}`, { defaultValue: "Social" }),
    ariaLabel: t(`contact.social.${platform === "other" ? "share" : platform}Aria`, { defaultValue: "Social link" }),
    Icon: socialIcons[platform],
  }));

  return (
    <div>
      <PageHero
        eyebrow={t("contact.header.badge")}
        title={t("contact.header.title")}
        description={t("contact.header.desc")}
      />

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-[#0F1932]/8 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 rounded-full bg-[#B5C7EB]" />
                <h2 className="text-[#0F1932]" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800 }}>
                  {t("contact.request.title")}
                </h2>
              </div>
              <p className="text-[#5B6475] leading-relaxed mb-6 max-w-2xl">
                {t("contact.request.desc")}
              </p>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact-country" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                    {t("contact.request.country")}
                  </label>
                  <select
                    id="contact-country"
                    value={form.country}
                    onChange={updateField("country")}
                    aria-label={t("contact.request.country")}
                    className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB]"
                  >
                    <option value={t("contact.request.armenia")}>{t("contact.request.armenia")}</option>
                    {COUNTRIES.filter((country) => country !== "Armenia").map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-first-name" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                      {t("contact.request.firstName")}
                    </label>
                    <input
                      id="contact-first-name"
                      type="text"
                      required
                      value={form.firstName}
                      onChange={updateField("firstName")}
                      className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-last-name" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                      {t("contact.request.lastName")}
                    </label>
                    <input
                      id="contact-last-name"
                      type="text"
                      required
                      value={form.lastName}
                      onChange={updateField("lastName")}
                      className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB]"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                      {t("contact.request.phone")}
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={updateField("phone")}
                      className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                      {t("contact.request.email")}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={updateField("email")}
                      className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                    {t("contact.request.message")}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={updateField("message")}
                    className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB] resize-y"
                  />
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#0F1932] text-white text-sm hover:bg-[#0F1932]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontWeight: 600 }}
                  >
                    {status === "submitting" ? t("contact.request.submitting", { defaultValue: "Sending..." }) : t("contact.request.submit")}
                  </button>
                  {status === "success" && (
                    <p className="text-sm text-green-700">{t("contact.request.success", { defaultValue: "Thank you - we'll be in touch shortly." })}</p>
                  )}
                  {status === "validation-error" && (
                    <p className="text-sm text-red-600">{t("contact.request.validationError", { defaultValue: "Please fill in your name and a phone or email, then try again." })}</p>
                  )}
                  {status === "submit-error" && (
                    <p className="text-sm text-red-600">{t("contact.request.submitError", { defaultValue: "Something went wrong sending your request. Please try again shortly, or contact us by phone." })}</p>
                  )}
                </div>
              </form>
            </div>

          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-[#0F1932] rounded-2xl p-7 text-white">
              <h3 className="text-white mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>
                <span className="w-2 h-6 rounded-full bg-[#B5C7EB] inline-block" />
                {t("contact.info.title")}
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#B5C7EB]/15 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#B5C7EB]" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-0.5">{t("contact.info.address")}</div>
                    <span className="text-sm text-white/80 whitespace-pre-line">{address}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#B5C7EB]/15 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#B5C7EB]" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-0.5">{t("contact.info.phone")}</div>
                    <a href={phoneHref} aria-label={t("contact.info.phone")} className="text-sm text-white hover:text-[#B5C7EB] transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
                {email && (
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#B5C7EB]/15 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-[#B5C7EB]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-0.5">{t("contact.info.email", { defaultValue: "Email" })}</div>
                      <a href={`mailto:${email}`} aria-label={t("contact.info.email", { defaultValue: "Email" })} className="text-sm text-white hover:text-[#B5C7EB] transition-colors">
                        {email}
                      </a>
                    </div>
                  </div>
                )}
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#B5C7EB]/15 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-[#B5C7EB]" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-0.5">{t("contact.info.website")}</div>
                    <a href="https://matikyan.am" aria-label={t("contact.info.website")} className="text-sm text-white hover:text-[#B5C7EB] transition-colors">
                      {t("contact.info.websiteValue")}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#B5C7EB]/15 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#B5C7EB]" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-1">{t("contact.info.hours")}</div>
                    <div className="text-sm text-white/80 space-y-0.5">
                      {hoursLines.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-white/50 text-xs mb-3">{t("contact.social.title")}</div>
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ href, label, ariaLabel, Icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ariaLabel}
                      title={label}
                      className="w-10 h-10 rounded-xl bg-[#B5C7EB]/15 text-[#B5C7EB] hover:bg-[#B5C7EB] hover:text-[#0F1932] transition-colors flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#0F1932]/8 bg-white">
              <iframe
                src={mapEmbedUrl}
                title={t("contact.info.mapFrameTitle")}
                loading="lazy"
                className="w-full h-52 border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-6 py-5 bg-[#B5C7EB]/10 text-center">
                <div className="flex items-center justify-center gap-2 text-[#0F1932] mb-3">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm">{address}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={googleMapsViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#0F1932] text-white text-sm hover:bg-[#0F1932]/90 transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    {t("contact.info.mapPlaceholder")}
                  </a>
                  <a
                    href={yandexMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#0F1932] text-white text-sm hover:bg-[#0F1932]/90 transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    {t("contact.info.yandexMapButton")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
