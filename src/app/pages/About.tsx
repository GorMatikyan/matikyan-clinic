import { ArrowRight, CheckCircle2, Award, Globe, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LocalizedNavLink } from "../routing";
import { siteImages } from "../siteImages";

const milestoneColors = [true, false, true, false, true];
const valueIcons = [Heart, Award, Globe, CheckCircle2];
const valueColors = [true, false, true, false];

export function About() {
  const { t } = useTranslation();

  const milestones = (t("about.milestones.items", { returnObjects: true }) as Array<{ year: string; title: string; desc: string }>);
  const values = (t("about.values.items", { returnObjects: true }) as Array<{ title: string; desc: string }>);

  return (
    <div>
      {/* Hero */}
      <section className="py-24 bg-[#0F1932]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[#B5C7EB] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("about.hero.badge")}</span>
            </div>
            <h1 className="text-white mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
              {t("about.hero.title")}
            </h1>
            <p className="text-white/60 leading-relaxed mb-5">{t("about.hero.desc1")}</p>
            <p className="text-white/60 leading-relaxed mb-10">{t("about.hero.desc2")}</p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[["8,400+", "about.hero.stats.patients"], ["18", "about.hero.stats.specialists"], ["99%", "about.hero.stats.satisfaction"]].map(([v, key]) => (
                <div key={key} className="bg-[#B5C7EB]/10 border border-[#B5C7EB]/20 rounded-xl p-4 text-center">
                  <div className="text-[#B5C7EB]" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800 }}>{v}</div>
                  <div className="text-white/50 text-xs mt-1">{t(key)}</div>
                </div>
              ))}
            </div>

            <LocalizedNavLink to="/doctors" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#B5C7EB] text-[#0F1932] rounded-xl hover:bg-[#B5C7EB]/90 transition-colors" style={{ fontWeight: 600 }}>
              {t("about.hero.meetTeam")} <ArrowRight className="w-4 h-4" />
            </LocalizedNavLink>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img src={siteImages.aboutImages.main} alt={t("about.images.clinicAlt")} className="rounded-2xl object-cover w-full h-64" />
            <img src={siteImages.aboutImages.consultation} alt={t("about.images.consultationAlt")} className="rounded-2xl object-cover w-full h-48 self-end" />
            <img src={siteImages.aboutImages.equipment} alt={t("about.images.equipmentAlt")} className="rounded-2xl object-cover w-full h-48" />
            <img src={siteImages.aboutImages.interior} alt={t("about.images.interiorAlt")} className="rounded-2xl object-cover w-full h-64 self-start" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/20 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#0F1932] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("about.values.badge")}</span>
            </div>
            <h2 className="text-[#0F1932]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800 }}>
              {t("about.values.title")}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => {
              const Icon = valueIcons[i];
              const sage = valueColors[i];
              return (
                <div key={i} className={`rounded-2xl p-7 border text-center ${sage ? "bg-[#B5C7EB]/15 border-[#B5C7EB]/30" : "bg-white border-[#0F1932]/8"}`}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 ${sage ? "bg-[#B5C7EB]/30" : "bg-[#0F1932]"}`}>
                    <Icon className={`w-6 h-6 ${sage ? "text-[#0F1932]" : "text-white"}`} />
                  </div>
                  <h3 className="text-[#0F1932] mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>{v.title}</h3>
                  <p className="text-[#5B6475] text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
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
