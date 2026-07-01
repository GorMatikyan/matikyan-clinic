import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hy from "./locales/hy.json";
import ru from "./locales/ru.json";

const PRIMARY_LANGUAGE = "hy";
const SUPPORTED_LANGUAGES = new Set(["hy", "en", "ru"]);

const initialLanguage = getInitialLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hy: { translation: hy },
    ru: { translation: ru },
  },
  lng: initialLanguage,
  fallbackLng: PRIMARY_LANGUAGE,
  supportedLngs: Array.from(SUPPORTED_LANGUAGES),
  nonExplicitSupportedLngs: false,
  load: "currentOnly",
  interpolation: { escapeValue: false },
});

export default i18n;

function getInitialLanguage() {
  const pathLanguage = getLanguageFromPathname(window.location.pathname);

  if (pathLanguage) {
    return pathLanguage;
  }

  const savedLang = localStorage.getItem("lang");
  return savedLang && SUPPORTED_LANGUAGES.has(savedLang) ? savedLang : PRIMARY_LANGUAGE;
}

function getLanguageFromPathname(pathname: string) {
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (firstSegment === "en" || firstSegment === "ru") {
    return firstSegment;
  }

  return pathname.startsWith("/") ? PRIMARY_LANGUAGE : null;
}
