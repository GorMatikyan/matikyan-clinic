import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LocalizedNavLink, useCurrentLanguage } from "../routing";
import { siteImages } from "../siteImages";

const milestoneColors = [true, false, true, false, true];

export function About() {
  const { t } = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const eyebrowTracking = currentLanguage === "hy" ? "tracking-[0.08em]" : "tracking-widest uppercase";

  const milestones = (t("about.milestones.items", { returnObjects: true }) as Array<{ year: string; title: string; desc: string }>);
  const values = (t("about.values.items", { returnObjects: true }) as Array<{ title: string; desc: string }>);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F1932] pb-16 pt-[1.5rem] lg:pb-20 lg:pt-[1.75rem]">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,25,50,0.54)_0%,rgba(15,25,50,0)_34%),radial-gradient(circle_at_78%_32%,rgba(181,199,235,0.22)_0%,rgba(181,199,235,0.08)_30%,rgba(15,25,50,0)_58%),radial-gradient(circle_at_18%_82%,rgba(120,144,191,0.18)_0%,rgba(120,144,191,0)_48%)]" />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.92fr_1.08fr] gap-9 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/8 rounded-full px-3.5 py-1 mb-3 ring-1 ring-white/12">
              <span className={`text-[#B5C7EB] text-xs ${eyebrowTracking}`} style={{ fontWeight: 700 }}>{t("about.hero.badge")}</span>
            </div>
            <h1 className="text-white mb-4 max-w-[600px]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 3.15rem)", fontWeight: 800, lineHeight: 1.04 }}>
              {t("about.hero.title")}
            </h1>
            <div className="max-w-[580px] space-y-3">
              <p className="text-white/70 text-lg leading-relaxed">{t("about.hero.desc1")}</p>
              <p className="text-white/62 leading-relaxed">{t("about.hero.desc2")}</p>
            </div>

            <LocalizedNavLink to="/doctors" className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 bg-[#B5C7EB] text-[#0F1932] rounded-xl hover:bg-white transition-colors shadow-[0_16px_36px_rgba(0,0,0,0.18)]" style={{ fontWeight: 700 }}>
              {t("about.hero.meetTeam")} <ArrowRight className="w-4 h-4" />
            </LocalizedNavLink>
          </div>

          <div className="relative">
            <div className="absolute left-[10%] top-[10%] h-72 w-72 rounded-full bg-[#B5C7EB]/18 blur-3xl" />
            <div className="relative rounded-[2rem] bg-[#17223c]/55 p-4 shadow-[0_28px_78px_rgba(0,0,0,0.24)] ring-1 ring-white/10 sm:p-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <img src={siteImages.heroSlides[3].full} alt={t("about.images.clinicAlt")} className="h-40 w-full rounded-[1.2rem] object-cover object-center shadow-[0_14px_34px_rgba(0,0,0,0.2)] sm:h-52 lg:h-44 xl:h-52" />
                <img src={siteImages.aboutImages.equipment} alt={t("about.images.equipmentAlt")} className="h-40 w-full rounded-[1.2rem] object-cover object-center shadow-[0_14px_34px_rgba(0,0,0,0.2)] sm:h-52 lg:h-44 xl:h-52" />
                <img src={siteImages.heroSlides[2].full} alt={t("about.images.consultationAlt")} className="h-40 w-full rounded-[1.2rem] object-cover object-center shadow-[0_14px_34px_rgba(0,0,0,0.2)] sm:h-52 lg:h-44 xl:h-52" />
                <img src={siteImages.heroSlides[1].full} alt={t("about.images.interiorAlt")} className="h-40 w-full rounded-[1.2rem] object-cover object-center shadow-[0_14px_34px_rgba(0,0,0,0.2)] sm:h-52 lg:h-44 xl:h-52" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F7FAFC] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/20 rounded-full px-4 py-1.5 mb-4">
              <span className={`text-[#0F1932] text-xs ${eyebrowTracking}`} style={{ fontWeight: 700 }}>{t("about.values.badge")}</span>
            </div>
            <h2 className="text-[#0F1932] mb-5 max-w-[560px]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.08 }}>
              {t("about.values.title")}
            </h2>
            <p className="text-[#5B6475] max-w-[590px] leading-relaxed mb-7">
              {t("about.values.intro")}
            </p>

            <div className="grid gap-4">
              {values.map((v, i) => (
                <div key={i} className="flex gap-4 rounded-2xl border border-[#0F1932]/8 bg-white/75 p-4 shadow-[0_12px_36px_rgba(15,25,50,0.05)]">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B5C7EB]/28">
                    <CheckCircle2 className="h-5 w-5 text-[#0F1932]" />
                  </div>
                  <div>
                    <h3 className="text-[#0F1932] mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700 }}>{v.title}</h3>
                    <p className="text-[#5B6475] text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-4 -top-4 h-52 w-52 rounded-full bg-[#B5C7EB]/28 blur-3xl" />
            <img src={siteImages.aboutImages.consultation} alt={t("about.images.consultationAlt")} className="relative h-[420px] w-full rounded-[1.75rem] border border-white object-cover shadow-[0_24px_70px_rgba(15,25,50,0.14)]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-18 bg-white lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#0F1932] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("about.milestones.badge")}</span>
            </div>
            <h2 className="text-[#0F1932]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800 }}>
              {t("about.milestones.title")}
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#B5C7EB]/40" />
            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => {
                const sage = milestoneColors[i];
                return (
                  <div key={i} className="flex gap-8 items-start">
                    <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${sage ? "bg-[#B5C7EB]" : "bg-[#0F1932]"}`}>
                      <span className={`text-xs ${sage ? "text-[#0F1932]" : "text-white"}`} style={{ fontWeight: 800 }}>{m.year}</span>
                    </div>
                    <div className="pt-3">
                      <h3 className="text-[#0F1932] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>{m.title}</h3>
                      <p className="text-[#5B6475] text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800 }}>
            {t("about.cta.title")}
          </h2>
          <p className="text-white/55 mb-8 text-lg">{t("about.cta.desc")}</p>
          <LocalizedNavLink to="/contact" className="inline-flex items-center gap-2 px-7 py-4 bg-[#B5C7EB] text-[#0F1932] rounded-xl hover:bg-[#B5C7EB]/90 transition-colors" style={{ fontWeight: 600 }}>
            {t("about.cta.button")} <ArrowRight className="w-4 h-4" />
          </LocalizedNavLink>
        </div>
      </section>
    </div>
  );
}
