import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Menu, X, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoImg from "../../imports/matikyan-clinic-logo-am.png";
import { getLocalizedPathForLanguage, LocalizedNavLink, type AppLanguage, useCurrentLanguage } from "../routing";

const navKeys = [
  { key: "nav.about", path: "/about" },
  { key: "nav.doctors", path: "/doctors" },
  { key: "nav.services", path: "/services" },
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

  useEffect(() => { setOpen(false); }, [location.pathname]);

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/97 backdrop-blur-md shadow-sm border-b border-[#0F1932]/8" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <LocalizedNavLink to="/" className="flex items-center">
            <img
              src={logoImg}
              alt={t("nav.logoAlt")}
              className="h-14 w-auto object-contain"
              style={{ filter: "brightness(0) saturate(100%) invert(9%) sepia(40%) saturate(800%) hue-rotate(194deg) brightness(95%)" }}
            />
          </LocalizedNavLink>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navKeys.map((item) => (
              <LocalizedNavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm transition-colors duration-200 ${
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
          </nav>

          {/* Right side */}
          <div className="hidden xl:flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-0.5 border border-[#0F1932]/10 rounded-lg overflow-hidden">
              {langs.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLang(lang.code)}
                  aria-label={t("nav.switchLanguage", { language: t(`nav.languageNames.${lang.code}`) })}
                  className={`px-2.5 py-1.5 text-xs transition-colors ${
                    currentLanguage === lang.code
                      ? "bg-[#0F1932] text-white"
                      : "text-[#5B6475] hover:bg-[#B5C7EB]/15 hover:text-[#0F1932]"
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <a
              href="tel:+37410210122"
              aria-label={t("nav.callClinic")}
              className="flex items-center gap-2 text-sm text-[#5B6475] hover:text-[#0F1932] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#B5C7EB]" />
              <span>{t("nav.phone")}</span>
            </a>
            <LocalizedNavLink
              to="/contact"
              className="px-5 py-2.5 bg-[#0F1932] text-white rounded-xl text-sm hover:bg-[#0F1932]/90 transition-colors"
              style={{ fontWeight: 500 }}
            >
              {t("nav.bookAppointment")}
            </LocalizedNavLink>
          </div>

          {/* Mobile toggle */}
          <button
            className="xl:hidden p-2 rounded-lg text-[#5B6475] hover:bg-[#B5C7EB]/10"
            onClick={() => setOpen(!open)}
            aria-label={t("nav.toggleMenu")}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden bg-white border-t border-[#0F1932]/8 px-6 py-4 flex flex-col gap-1">
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
          <LocalizedNavLink
            to="/contact"
            className="mt-2 px-5 py-3 bg-[#0F1932] text-white rounded-xl text-sm text-center"
            style={{ fontWeight: 500 }}
          >
            {t("nav.bookAppointment")}
          </LocalizedNavLink>
        </div>
      )}
    </header>
  );
}
