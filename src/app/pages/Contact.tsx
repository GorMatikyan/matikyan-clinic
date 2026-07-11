import { Phone, Globe, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=5%20Aram%20Khachatryan%20St%2C%20Yerevan%200033%2C%20Armenia";
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps?q=5%20Aram%20Khachatryan%20St%2C%20Yerevan%200033%2C%20Armenia&z=16&output=embed";
const YANDEX_MAPS_URL = "https://yandex.com/maps/?text=5%20Aram%20Khachatryan%20St%2C%20Yerevan%200033%2C%20Armenia";
const FACEBOOK_URL = "https://www.facebook.com/share/1LLcyQvwvZ/?mibextid=wwXIfr";
const INSTAGRAM_URL = "https://www.instagram.com/matikyandentalclinic?igsh=MTNtbGl1eW04M25ucA==";
const YOUTUBE_URL = "https://www.youtube.com/@MatikyanDentalClinic";
import { useTranslation } from "react-i18next";

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
  const socialLinks = [
    {
      href: FACEBOOK_URL,
      label: t("contact.social.facebook"),
      ariaLabel: t("contact.social.facebookAria"),
      Icon: Facebook,
    },
    {
      href: INSTAGRAM_URL,
      label: t("contact.social.instagram"),
      ariaLabel: t("contact.social.instagramAria"),
      Icon: Instagram,
    },
    {
      href: YOUTUBE_URL,
      label: t("contact.social.youtube"),
      ariaLabel: t("contact.social.youtubeAria"),
      Icon: Youtube,
    },
  ] as const;

  return (
    <div>
      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[#B5C7EB] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("contact.header.badge")}</span>
          </div>
          <h1 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            {t("contact.header.title")}
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">{t("contact.header.desc")}</p>
        </div>
      </section>

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
              <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
                <div>
                  <label htmlFor="contact-country" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                    {t("contact.request.country")}
                  </label>
                  <select
                    id="contact-country"
                    defaultValue={t("contact.request.armenia")}
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
                    <input id="contact-first-name" type="text" className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB]" />
                  </div>
                  <div>
                    <label htmlFor="contact-last-name" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                      {t("contact.request.lastName")}
                    </label>
                    <input id="contact-last-name" type="text" className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB]" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-phone" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                      {t("contact.request.phone")}
                    </label>
                    <input id="contact-phone" type="tel" className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB]" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                      {t("contact.request.email")}
                    </label>
                    <input id="contact-email" type="email" className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB]" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[#0F1932] text-sm mb-2" style={{ fontWeight: 600 }}>
                    {t("contact.request.message")}
                  </label>
                  <textarea id="contact-message" rows={5} className="w-full rounded-xl border border-[#0F1932]/12 bg-[#F7FAFC] px-4 py-3 text-[#0F1932] outline-none focus:border-[#B5C7EB] resize-y" />
                </div>
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    disabled
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#0F1932]/25 text-white text-sm cursor-not-allowed"
                    style={{ fontWeight: 600 }}
                  >
                    {t("contact.request.submit")}
                  </button>
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
                {[
                  { Icon: MapPin, labelKey: "contact.info.address", contentKey: "contact.info.addressValue", hrefKey: null },
                  { Icon: Phone, labelKey: "contact.info.phone", contentKey: "nav.phone", hrefKey: "tel:+37410210122" },
                  { Icon: Globe, labelKey: "contact.info.website", contentKey: "contact.info.websiteValue", hrefKey: "https://matikyan.am" },
                ].map(({ Icon, labelKey, contentKey, hrefKey }) => (
                  <div key={labelKey} className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#B5C7EB]/15 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#B5C7EB]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-0.5">{t(labelKey)}</div>
                      {hrefKey ? (
                        <a href={hrefKey} aria-label={t(labelKey)} className="text-sm text-white hover:text-[#B5C7EB] transition-colors whitespace-pre-line">{t(contentKey)}</a>
                      ) : (
                        <span className="text-sm text-white/80 whitespace-pre-line">{t(contentKey)}</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#B5C7EB]/15 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#B5C7EB]" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-1">{t("contact.info.hours")}</div>
                    <div className="text-sm text-white/80 space-y-0.5">
                      <div>{t("contact.info.hours1")}</div>
                      <div>{t("contact.info.hours2")}</div>
                      <div>{t("contact.info.hours3")}</div>
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
                src={GOOGLE_MAPS_EMBED_URL}
                title={t("contact.info.mapFrameTitle")}
                loading="lazy"
                className="w-full h-52 border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-6 py-5 bg-[#B5C7EB]/10 text-center">
                <div className="flex items-center justify-center gap-2 text-[#0F1932] mb-3">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm">{t("contact.info.addressValue")}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#0F1932] text-white text-sm hover:bg-[#0F1932]/90 transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    {t("contact.info.mapPlaceholder")}
                  </a>
                  <a
                    href={YANDEX_MAPS_URL}
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
