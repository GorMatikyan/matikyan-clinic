import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Menu, X, Phone, Mail, Facebook, Instagram, Youtube, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoImg from "../../imports/matikyan-clinic-logo-am.png";
import { getLocalizedPathForLanguage, LocalizedNavLink, stripLanguagePrefix, type AppLanguage, useCurrentLanguage } from "../routing";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { parseSocialLinks, type SocialPlatform } from "../../lib/socialLinks";
import { SiteSearch } from "./SiteSearch";

const DEFAULT_PHONE = "+37410210122";
const DEFAULT_EMAIL = "info@matikyan.am";

const socialIcons: Record<SocialPlatform, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  other: Share2,
};

const navKeys = [
  { key: "nav.about", path: "/about" },
  { key: "nav.doctors", path: "/doctors" },
  { key: "nav.services", path: "/services" },
  { key: "nav.warranty", path: "/warranty" },
  { key: "nav.dentalTourism", path: "/dental-tourism" },
  { key: "nav.faq", path: "/faq" },
  { key: "nav.blog", path: "/blog" },
  { key: "nav.contact", path: "/contact" },
] as const;

const langs = [
  { code: "en", label: "EN" },
  { code: "hy", label: "ՀՅ" },
  { code: "ru", label: "РУ" },
] as const satisfies ReadonlyArray<{ code: AppLanguage; label: string }>;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentLanguage = useCurrentLanguage();
  const { t, i18n } = useTranslation();
  // Transparent-over-dark-then-white-on-scroll everywhere: Home has its photo hero directly
  // under the fixed navbar, and every other route has the dark #0F1932 Breadcrumbs bar (see
  // Breadcrumbs.tsx) leading straight into that page's own dark hero section, so the white-logo
  // overlay has good contrast at the top of every page, not just Home.
  const isOverlay = !scrolled && !open;
  const isArmenian = currentLanguage === "hy";
  const settings = useSiteSettings();
  const phone = settings?.phoneNumber ?? DEFAULT_PHONE;
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
  const email = settings?.email ?? DEFAULT_EMAIL;
  const socialLinks = parseSocialLinks(settings?.socialLinksJson);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const changeLang = (code: AppLanguage) => {
    localStorage.setItem("lang", code);
    const localizedPath = getLocalizedPathForLanguage(location.pathname, code);
    void i18n.changeLanguage(code);
    void navigate(`${localizedPath}${location.search}${location.hash}`);
  };

  const renderDesktopNavLabel = (key: (typeof navKeys)[number]["key"]) => {
    if (isArmenian && key === "nav.dentalTourism") {
      return (
        <span className="flex flex-col items-center justify-center leading-[1.16]">
          <span>Ստոմ.</span>
          <span>տուրիզմ</span>
        </span>
      );
    }

    if (isArmenian && key === "nav.faq") {
      return (
        <span className="flex flex-col items-center justify-center leading-[1.16]">
          <span>Հաճախ տրվող</span>
          <span>հարցեր</span>
        </span>
      );
    }

    return <span className="whitespace-nowrap">{t(key)}</span>;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isOverlay
        ? "bg-transparent"
        : "bg-white/97 backdrop-blur-md shadow-sm border-b border-[#0F1932]/8"
    }`}>
      <div className="mx-auto max-w-[92rem] px-4 sm:px-6 lg:px-8">
        <div className="grid h-20 grid-cols-[clamp(10.75rem,14.5vw,12.75rem)_minmax(0,1fr)_auto] items-center gap-[clamp(0.875rem,1.3vw,1.75rem)]">
          {/* Logo */}
          <LocalizedNavLink to="/" className="flex w-[clamp(10.75rem,14.5vw,12.75rem)] shrink-0 items-center">
            <img
              src={logoImg}
              alt={t("nav.logoAlt")}
              className="h-[3.75rem] max-w-full object-contain"
              style={{
                filter: isOverlay
                  ? "brightness(0) invert(1)"
                  : "brightness(0) saturate(100%) invert(9%) sepia(40%) saturate(800%) hue-rotate(194deg) brightness(95%)",
              }}
            />
          </LocalizedNavLink>

          {/* Desktop nav */}
          <nav className={`${isArmenian ? "hidden min-[1360px]:flex" : "hidden xl:flex"} min-w-0 items-center justify-center gap-[clamp(0.125rem,0.24vw,0.375rem)]`}>
            {navKeys.map((item) => (
              <LocalizedNavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-lg px-[clamp(0.52rem,0.58vw,0.78rem)] py-2 text-center text-[15px] leading-[1.2] transition-colors duration-200 2xl:px-[clamp(0.65rem,0.72vw,0.95rem)] 2xl:py-2.5 ${
                    isActive
                      ? isOverlay
                        ? "bg-white/12 text-white"
                        : "bg-[#B5C7EB]/20 text-[#0F1932]"
                      : isOverlay
                        ? "text-white/72 hover:text-white hover:bg-white/8"
                        : "text-[#5B6475] hover:text-[#0F1932] hover:bg-[#B5C7EB]/10"
                  }`
                }
                style={{ fontWeight: 600 }}
              >
                {renderDesktopNavLabel(item.key)}
              </LocalizedNavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className={`${isArmenian ? "hidden min-[1360px]:flex" : "hidden xl:flex"} shrink-0 items-center justify-end gap-[clamp(0.55rem,0.75vw,0.875rem)]`}>
            <SiteSearch overlay={isOverlay} />

            {/* Language switcher */}
            <div className={`flex items-center gap-0.5 rounded-lg overflow-hidden ${isOverlay ? "border border-white/14 bg-white/6" : "border border-[#0F1932]/10"}`}>
              {langs.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLang(lang.code)}
                  aria-label={t("nav.switchLanguage", { language: t(`nav.languageNames.${lang.code}`) })}
                  className={`px-2.5 py-2 text-xs leading-none transition-colors ${
                    currentLanguage === lang.code
                      ? isOverlay
                        ? "bg-[#B5C7EB] text-[#0F1932]"
                        : "bg-[#0F1932] text-white"
                      : isOverlay
                        ? "text-white/70 hover:bg-white/10 hover:text-white"
                        : "text-[#5B6475] hover:bg-[#B5C7EB]/15 hover:text-[#0F1932]"
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="hidden 2xl:flex items-center gap-1">
              {socialLinks.map(({ url, platform }) => {
                const Icon = socialIcons[platform];
                return (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isOverlay ? "text-white/72 hover:bg-white/8 hover:text-white" : "text-[#5B6475] hover:bg-[#B5C7EB]/10 hover:text-[#0F1932]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
              <a
                href={`mailto:${email}`}
                aria-label={email}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  isOverlay ? "text-white/72 hover:bg-white/8 hover:text-white" : "text-[#5B6475] hover:bg-[#B5C7EB]/10 hover:text-[#0F1932]"
                }`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <a
              href={phoneHref}
              aria-label={t("nav.callClinic")}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors 2xl:w-auto 2xl:gap-2 2xl:px-0 ${
                isOverlay ? "text-white/72 hover:bg-white/8 hover:text-white" : "text-[#5B6475] hover:bg-[#B5C7EB]/10 hover:text-[#0F1932]"
              }`}
            >
              <Phone className="w-4 h-4 text-[#B5C7EB]" />
              <span className={`${isArmenian ? "hidden" : "hidden 2xl:inline"} whitespace-nowrap text-sm`}>{phone}</span>
            </a>
            <LocalizedNavLink
              to="/contact"
              className={`shrink-0 whitespace-nowrap rounded-xl px-[clamp(1rem,0.95vw,1.3rem)] py-3 text-[15px] leading-[1.2] transition-colors ${isOverlay ? "bg-[#B5C7EB] text-[#0F1932] hover:bg-white" : "bg-[#0F1932] text-white hover:bg-[#0F1932]/90"}`}
              style={{ fontWeight: 600 }}
            >
              {t("nav.bookAppointment")}
            </LocalizedNavLink>
          </div>

          {/* Mobile toggle */}
          <div className={`${isArmenian ? "min-[1360px]:hidden" : "xl:hidden"} justify-self-end flex items-center gap-1`}>
            <SiteSearch overlay={isOverlay} />
            <button
              className={`shrink-0 p-2 rounded-lg transition-colors ${isOverlay ? "text-white hover:bg-white/10" : "text-[#5B6475] hover:bg-[#B5C7EB]/10"}`}
              onClick={() => setOpen(!open)}
              aria-label={t("nav.toggleMenu")}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={`${isArmenian ? "min-[1360px]:hidden" : "xl:hidden"} bg-white border-t border-[#0F1932]/8 px-6 py-4 flex flex-col gap-1`}>
          {navKeys.map((item) => (
            <LocalizedNavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-[#B5C7EB]/20 text-[#0F1932]"
                    : "text-[#5B6475] hover:text-[#0F1932] hover:bg-[#B5C7EB]/10"
                }`
              }
              style={{ fontWeight: 500 }}
            >
              {t(item.key)}
            </LocalizedNavLink>
          ))}
          {/* Mobile language switcher */}
          <div className="flex items-center gap-1 pt-3 border-t border-[#0F1932]/8 mt-2">
            {langs.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLang(lang.code)}
                aria-label={t("nav.switchLanguage", { language: t(`nav.languageNames.${lang.code}`) })}
                className={`flex-1 py-2 text-xs rounded-lg transition-colors ${
                  currentLanguage === lang.code
                    ? "bg-[#0F1932] text-white"
                    : "border border-[#0F1932]/10 text-[#5B6475] hover:bg-[#B5C7EB]/15"
                }`}
                style={{ fontWeight: 600 }}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <a
            href={phoneHref}
            aria-label={t("nav.callClinic")}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-[#0F1932]/10 px-5 py-3 text-sm text-[#0F1932]"
            style={{ fontWeight: 500 }}
          >
            <Phone className="h-4 w-4 text-[#7890BF]" />
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#0F1932]/10 px-5 py-3 text-sm text-[#0F1932]"
            style={{ fontWeight: 500 }}
          >
            <Mail className="h-4 w-4 text-[#7890BF]" />
            {email}
          </a>
          {socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-2 pt-1">
              {socialLinks.map(({ url, platform }) => {
                const Icon = socialIcons[platform];
                return (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0F1932]/10 text-[#5B6475]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
          <LocalizedNavLink
            to="/contact"
            className="mt-2 px-5 py-3 bg-[#0F1932] text-white rounded-xl text-sm text-center whitespace-nowrap"
            style={{ fontWeight: 500 }}
          >
            {t("nav.bookAppointment")}
          </LocalizedNavLink>
        </div>
      )}
    </header>
  );
}
