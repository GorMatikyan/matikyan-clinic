import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import hy from "./locales/hy.json";

const PRIMARY_LANGUAGE = "hy";
const SUPPORTED_LANGUAGES = new Set(["hy", "en", "ru"]);

type SecondaryLanguage = "en" | "ru";

// hy has no URL prefix and is the overwhelming majority of traffic, so it's the only locale
// bundled eagerly. en/ru (~90KB of JSON each) used to be statically imported too, meaning every
// visitor downloaded and parsed all three languages' strings as part of the single main JS chunk
// regardless of which one they'd ever see. They're now fetched on demand instead: once here for a
// direct /en or /ru landing (see initialLanguageReady, awaited in main.tsx so there's no flash of
// Armenian text), and again from ensureLanguageLoaded() whenever the visitor switches language via
// the navbar (Navbar.tsx, Layout.tsx).
const secondaryLocaleLoaders: Record<SecondaryLanguage, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import("./locales/en.json"),
  ru: () => import("./locales/ru.json"),
};

const initialLanguage = getInitialLanguage();

i18n.use(initReactI18next).init({
  resources: {
    hy: { translation: hy },
  },
  lng: PRIMARY_LANGUAGE,
  fallbackLng: PRIMARY_LANGUAGE,
  supportedLngs: Array.from(SUPPORTED_LANGUAGES),
  nonExplicitSupportedLngs: false,
  load: "currentOnly",
  interpolation: { escapeValue: false },
});

export const initialLanguageReady =
  initialLanguage === PRIMARY_LANGUAGE
    ? null
    : ensureLanguageLoaded(initialLanguage).then(() => i18n.changeLanguage(initialLanguage));

export async function ensureLanguageLoaded(language: string) {
  if (language === PRIMARY_LANGUAGE || i18n.hasResourceBundle(language, "translation")) {
    return;
  }

  const loader = secondaryLocaleLoaders[language as SecondaryLanguage];
  if (!loader) return;

  const module = await loader();
  i18n.addResourceBundle(language, "translation", module.default, true, true);
}

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
