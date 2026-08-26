import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SeoHead } from "./SeoHead";
import { StructuredData } from "./StructuredData";
import { Breadcrumbs } from "./Breadcrumbs";
import { WhatsAppChat } from "./WhatsAppChat";
import { Analytics } from "./Analytics";
import { getLanguageFromPathname } from "../routing";

export function Layout() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const currentLanguage = getLanguageFromPathname(pathname);
  const activeLanguage = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    if (activeLanguage === currentLanguage) return;
    localStorage.setItem("lang", currentLanguage);
    void i18n.changeLanguage(currentLanguage);
  }, [activeLanguage, currentLanguage, i18n]);

  if (activeLanguage !== currentLanguage) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SeoHead />
      <StructuredData />
      <Analytics />
      <Navbar />
      <main className="flex-1">
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
}

function normalizeLanguage(language: string | undefined) {
  if (language === "en" || language === "ru" || language === "hy") {
    return language;
  }

  if (language?.startsWith("en")) return "en";
  if (language?.startsWith("ru")) return "ru";
  return "hy";
}
