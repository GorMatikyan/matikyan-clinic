import { MapPin, Plane, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LocalizedNavLink } from "../routing";
import { PageHero } from "../components/PageHero";
import dentalTourismImage from "../../../images/sections/section-dental-tourism.jpg";

function getItems(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

const icons = [Plane, Languages, MapPin] as const;

export function DentalTourism() {
  const { t } = useTranslation();
  const includedItems = getItems(t("dentalTourism.included.items", { returnObjects: true }));

  return (
    <div>
      <PageHero
        eyebrow={t("dentalTourism.header.badge")}
        title={t("dentalTourism.header.title")}
        description={t("dentalTourism.header.desc")}
        imageSrc={dentalTourismImage}
        imageAlt={t("dentalTourism.header.title")}
        primaryAction={{ label: t("dentalTourism.cta.contact"), to: "/contact" }}
        secondaryAction={{ label: t("dentalTourism.cta.services"), to: "/services" }}
      />

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-5xl mx-auto px-6">
          <article className="bg-white border border-[#0F1932]/8 rounded-3xl shadow-sm p-7 lg:p-10">
            <div className="max-w-3xl">
              <h2 className="text-[#0F1932] mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 800 }}>
                {t("dentalTourism.title")}
              </h2>
              <div className="space-y-4">
                <p className="text-[#5B6475] leading-relaxed">{t("dentalTourism.body.p1")}</p>
                <p className="text-[#5B6475] leading-relaxed">{t("dentalTourism.body.p2")}</p>
              </div>
            </div>

            <section className="mt-10">
              <h3 className="text-[#0F1932] mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800 }}>
                {t("dentalTourism.included.title")}
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {includedItems.map((item, index) => {
                  const Icon = icons[index] ?? MapPin;
                  return (
                    <div key={item} className="rounded-2xl bg-[#F7FAFC] border border-[#0F1932]/6 p-5">
                      <Icon className="w-5 h-5 text-[#7890BF] mb-3" />
                      <p className="text-[#5B6475] text-sm leading-relaxed">{item}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="mt-10 rounded-2xl bg-[#0F1932] p-6 text-white">
              <h3 className="mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>
                {t("dentalTourism.consultation.title")}
              </h3>
              <p className="text-white/68 leading-relaxed">{t("dentalTourism.consultation.desc")}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <LocalizedNavLink
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#0F1932] text-white rounded-xl hover:bg-[#0F1932]/90 transition-colors"
                style={{ fontWeight: 700 }}
              >
                {t("dentalTourism.cta.contact")}
              </LocalizedNavLink>
              <LocalizedNavLink
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[#0F1932]/12 text-[#0F1932] rounded-xl hover:bg-[#B5C7EB]/10 transition-colors"
                style={{ fontWeight: 600 }}
              >
                {t("dentalTourism.cta.services")}
              </LocalizedNavLink>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
