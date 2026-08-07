import { useTranslation } from "react-i18next";
import warrantyTrustEn from "../../../images/sections/section-warranty-trust-en.webp";
import warrantyTrustHy from "../../../images/sections/section-warranty-trust-hy.webp";
import warrantyTrustRu from "../../../images/sections/section-warranty-trust-ru.webp";
import { LocalizedNavLink, useCurrentLanguage } from "../routing";

type WarrantyTextSection = {
  title?: string;
  items: string[];
};

function getSections(value: unknown): WarrantyTextSection[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((section): section is WarrantyTextSection => {
    return typeof section === "object" && section !== null && Array.isArray((section as WarrantyTextSection).items);
  });
}

const heroCopy = {
  en: {
    intro:
      "Every eligible treatment is supported by a clear written warranty policy explaining coverage, conditions, and follow-up care.",
    secondaryCta: "View Warranty Terms",
    trustItems: ["Written warranty", "Transparent conditions", "Long-term follow-up"],
  },
  hy: {
    intro:
      "Երաշխիքով նախատեսված յուրաքանչյուր բուժում ուղեկցվում է հստակ գրավոր քաղաքականությամբ՝ ծածկույթի, պայմանների և հետագա հսկողության մասին։",
    secondaryCta: "Դիտել երաշխիքային պայմանները",
    trustItems: ["Գրավոր երաշխիք", "Թափանցիկ պայմաններ", "Երկարաժամկետ հսկողություն"],
  },
  ru: {
    intro:
      "Каждое лечение, на которое распространяется гарантия, сопровождается понятной письменной политикой с условиями покрытия и дальнейшего наблюдения.",
    secondaryCta: "Смотреть условия гарантии",
    trustItems: ["Письменная гарантия", "Прозрачные условия", "Долгосрочное наблюдение"],
  },
} as const;

export function Warranty() {
  const { t } = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const sections = getSections(t("warranty.sections", { returnObjects: true }));
  const localizedHeroCopy = heroCopy[currentLanguage];
  const eyebrowTracking = currentLanguage === "hy" ? "tracking-[0.08em]" : "tracking-widest uppercase";
  const imageByLanguage = {
    en: warrantyTrustEn,
    hy: warrantyTrustHy,
    ru: warrantyTrustRu,
  } as const;

  return (
    <div>
      <section className="relative overflow-hidden bg-[#0F1932] pb-12 pt-[2rem] lg:pb-14 lg:pt-[2.5rem]">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,25,50,0.54)_0%,rgba(15,25,50,0)_34%),radial-gradient(circle_at_78%_32%,rgba(181,199,235,0.22)_0%,rgba(181,199,235,0.08)_30%,rgba(15,25,50,0)_58%),radial-gradient(circle_at_18%_82%,rgba(120,144,191,0.18)_0%,rgba(120,144,191,0)_48%)]" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/8 rounded-full px-3.5 py-1 mb-4 ring-1 ring-white/12">
                <span className={`text-[#B5C7EB] text-xs ${eyebrowTracking}`} style={{ fontWeight: 700 }}>
                  {t("warranty.header.badge")}
                </span>
              </div>
              <h1 className="text-white mb-5 max-w-[560px]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.05rem, 3.8vw, 3.35rem)", fontWeight: 800, lineHeight: 1.04 }}>
                {t("warranty.header.title")}
              </h1>
              <p className="text-white/68 text-lg max-w-[560px] leading-relaxed">
                {localizedHeroCopy.intro}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <LocalizedNavLink
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-[#B5C7EB] text-[#0F1932] rounded-xl hover:bg-white transition-colors shadow-[0_16px_36px_rgba(0,0,0,0.18)]"
                  style={{ fontWeight: 700 }}
                >
                  {t("nav.bookAppointment")}
                </LocalizedNavLink>
                <a
                  href="#warranty-terms"
                  className="inline-flex items-center justify-center px-6 py-3.5 border border-white/14 text-white rounded-xl hover:bg-white/8 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  {localizedHeroCopy.secondaryCta}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {localizedHeroCopy.trustItems.map((item) => (
                  <span key={item} className="text-white/72 text-sm" style={{ fontWeight: 600 }}>
                    <span className="text-[#B5C7EB]" aria-hidden="true">✓</span> {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-[8%] top-[4%] h-72 w-72 rounded-full bg-[#B5C7EB]/18 blur-3xl" />
              <div className="absolute right-[6%] bottom-[8%] h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/16 bg-[#eef1f8] shadow-[0_26px_70px_rgba(0,0,0,0.3)]">
                <img
                  src={imageByLanguage[currentLanguage]}
                  alt={t("warranty.imageAlt")}
                  width={1536}
                  height={1024}
                  loading="eager"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover brightness-[1.02] saturate-[0.96]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-5xl mx-auto px-6">
          <article className="bg-white border border-[#0F1932]/8 rounded-3xl shadow-sm p-7 lg:p-10">
            <div className="prose prose-slate max-w-none">
              <h2 id="warranty-terms" className="text-[#0F1932] mb-6 scroll-mt-24" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.3rem)", fontWeight: 800 }}>
                {t("warranty.policyTitle")}
              </h2>

              <div className="space-y-9">
                {sections.map((section, index) => (
                  <section key={section.title ?? index}>
                    {section.title ? (
                      <h3 className="text-[#0F1932] mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>
                        {section.title}
                      </h3>
                    ) : null}
                    <ol className="space-y-3 list-decimal pl-5">
                      {section.items.map((item) => (
                        <li key={item} className="text-[#5B6475] leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>

              <div className="mt-10 rounded-2xl bg-[#F7FAFC] border border-[#0F1932]/8 p-5">
                <h3 className="text-[#0F1932] mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 800 }}>
                  {t("warranty.noteTitle")}
                </h3>
                <p className="text-[#5B6475] leading-relaxed">
                  {t("warranty.note")}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <LocalizedNavLink
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#0F1932] text-white rounded-xl hover:bg-[#0F1932]/90 transition-colors"
                style={{ fontWeight: 700 }}
              >
                {t("warranty.cta.contact")}
              </LocalizedNavLink>
              <LocalizedNavLink
                to="/services"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[#0F1932]/12 text-[#0F1932] rounded-xl hover:bg-[#B5C7EB]/10 transition-colors"
                style={{ fontWeight: 600 }}
              >
                {t("warranty.cta.services")}
              </LocalizedNavLink>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
