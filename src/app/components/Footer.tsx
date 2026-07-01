import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoImg from "../../imports/matikyan-clinic-logo-am.png";
import { getServiceSlugByTitle } from "../serviceData";
import { LocalizedNavLink } from "../routing";

export function Footer() {
  const { t } = useTranslation();

  const navLinks = [
    { key: "footer.about", path: "/about" },
    { key: "footer.ourDoctors", path: "/doctors" },
    { key: "footer.services", path: "/services" },
    { key: "footer.patientReviews", path: "/reviews" },
    { key: "nav.faq", path: "/faq" },
    { key: "nav.blog", path: "/blog" },
    { key: "footer.contact", path: "/contact" },
  ] as const;

  const serviceLinks = [
    { key: "footer.servicesList.whitening", path: getServiceSlugByTitle("Professional Teeth Whitening") },
    { key: "footer.servicesList.implants", path: getServiceSlugByTitle("Dental Implants") },
    { key: "footer.servicesList.orthodontics", path: getServiceSlugByTitle("Invisalign Clear Aligners") },
    { key: "footer.servicesList.veneers", path: getServiceSlugByTitle("Porcelain Veneers") },
    { key: "footer.servicesList.rootCanal", path: getServiceSlugByTitle("Root Canal Treatment") },
    { key: "footer.servicesList.pediatric", path: getServiceSlugByTitle("Pediatric Dentistry") },
    { key: "footer.servicesList.cosmetic", path: getServiceSlugByTitle("Composite Bonding") },
  ] as const;

  return (
    <footer className="bg-[#0F1932] text-white">
      <div className="h-1 bg-[#B5C7EB]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <img src={logoImg} alt={t("footer.logoAlt")} className="h-12 w-auto object-contain" />
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6">{t("footer.description")}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#B5C7EB] mb-5 text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("footer.pages")}</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ key, path }) => (
                <li key={path}>
                  <LocalizedNavLink to={path} className="text-sm text-white/55 hover:text-[#B5C7EB] transition-colors">{t(key)}</LocalizedNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#B5C7EB] mb-5 text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("footer.services")}</h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map(({ key, path }) => (
                <li key={key}>
                  <LocalizedNavLink to={path} className="text-sm text-white/55 hover:text-[#B5C7EB] transition-colors cursor-pointer">{t(key)}</LocalizedNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#B5C7EB] mb-5 text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("footer.contact")}</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B5C7EB] mt-0.5 shrink-0" />
                <span className="text-sm text-white/55" style={{ whiteSpace: "pre-line" }}>{t("footer.address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B5C7EB] shrink-0" />
                <a
                  href="tel:+18005551234"
                  aria-label={t("footer.phoneLinkAria")}
                  className="text-sm text-white/55 hover:text-[#B5C7EB] transition-colors"
                >
                  {t("nav.phone")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B5C7EB] shrink-0" />
                <a
                  href="mailto:hello@matikyan.com"
                  aria-label={t("footer.emailLinkAria")}
                  className="text-sm text-white/55 hover:text-[#B5C7EB] transition-colors"
                >
                  {t("footer.email")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B5C7EB] mt-0.5 shrink-0" />
                <div className="text-sm text-white/55">
                  <div>{t("footer.hours1")}</div>
                  <div>{t("footer.hours2")}</div>
                  <div>{t("footer.hours3")}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
