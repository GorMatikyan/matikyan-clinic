import { ArrowRight, CheckCircle2, Microscope, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ServiceDetail } from "../serviceData";
import { SERVICE_IMAGE_FULL_WIDTH } from "../serviceData";
import { LocalizedNavLink, useCurrentLanguage } from "../routing";

type RelatedService = Pick<ServiceDetail, "slug" | "title" | "desc" | "category">;

type ServiceLandingPageProps = {
  service: ServiceDetail;
  relatedServices: RelatedService[];
};

function listFromTranslation(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function ServiceSection({
  eyebrow,
  title,
  children,
  className = "bg-white",
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-[#0F1932]/8 p-7 lg:p-9 shadow-sm ${className}`}>
      <div className="text-[#7890BF] text-xs uppercase tracking-[0.18em] mb-3" style={{ fontWeight: 700 }}>
        {eyebrow}
      </div>
      <h2 className="text-[#0F1932] mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)", fontWeight: 800 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function CheckList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <CheckCircle2 className={`w-4 h-4 mt-1 shrink-0 ${dark ? "text-[#B5C7EB]" : "text-[#7890BF]"}`} />
          <span className={`${dark ? "text-white/74" : "text-[#5B6475]"} text-sm leading-relaxed`}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ServiceLandingPage({ service, relatedServices }: ServiceLandingPageProps) {
  const { t } = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const eyebrowTracking = currentLanguage === "hy" ? "tracking-[0.08em]" : "tracking-widest uppercase";
  const fallbackTechnologyItems = listFromTranslation(t("serviceDetail.technology.items", { returnObjects: true }));
  const clinicReasons = listFromTranslation(t("serviceDetail.whyClinic.items", { returnObjects: true }));
  const technologyItems = service.technology?.length ? service.technology : fallbackTechnologyItems;
  const faqItems = service.faqs ?? [];

  return (
    <div className="bg-[#F7FAFC]">
      <section className="relative overflow-hidden bg-[#0F1932] pb-12 pt-[2rem] lg:pb-14 lg:pt-[2.5rem]">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,25,50,0.54)_0%,rgba(15,25,50,0)_34%),radial-gradient(circle_at_78%_32%,rgba(181,199,235,0.22)_0%,rgba(181,199,235,0.08)_30%,rgba(15,25,50,0)_58%),radial-gradient(circle_at_18%_82%,rgba(120,144,191,0.18)_0%,rgba(120,144,191,0)_48%)]" />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/8 rounded-full px-3.5 py-1 mb-4 ring-1 ring-white/12">
              <span className={`text-[#B5C7EB] text-xs ${eyebrowTracking}`} style={{ fontWeight: 700 }}>
                {service.category}
              </span>
            </div>
            <h1 className="text-white mb-5 max-w-[680px]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.05rem, 3.8vw, 3.35rem)", fontWeight: 800, lineHeight: 1.04 }}>
              {service.title}
            </h1>
            <p className="text-[#B5C7EB] text-sm uppercase tracking-[0.2em] mb-4" style={{ fontWeight: 700 }}>
              {service.tagline}
            </p>
            <p className="text-white/68 text-lg max-w-2xl leading-relaxed">{service.desc}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <LocalizedNavLink
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B5C7EB] text-[#0F1932] rounded-xl hover:bg-white transition-colors"
                style={{ fontWeight: 700 }}
              >
                {t("serviceDetail.cta.book")} <ArrowRight className="w-4 h-4" />
              </LocalizedNavLink>
              <LocalizedNavLink
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/15 text-white rounded-xl hover:bg-white/10 transition-colors"
                style={{ fontWeight: 600 }}
              >
                {t("serviceDetail.cta.back")}
              </LocalizedNavLink>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[8%] top-[4%] h-72 w-72 rounded-full bg-[#B5C7EB]/18 blur-3xl" />
            <div className="relative rounded-[1.8rem] overflow-hidden border border-white/16 shadow-[0_26px_70px_rgba(0,0,0,0.3)]">
            <img
              src={service.image}
              srcSet={`${service.imageMobile} 960w, ${service.image} ${SERVICE_IMAGE_FULL_WIDTH}w`}
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt={t("serviceDetail.imageAlt", { service: service.title })}
              className="w-full h-full object-cover min-h-[300px] lg:min-h-[400px] brightness-[1.02] saturate-[0.96]"
            />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
          <div className="space-y-8">
            <ServiceSection eyebrow={t("serviceDetail.sections.introduction.eyebrow")} title={service.h2Title}>
              <p className="text-[#5B6475] text-base leading-relaxed">{service.intro}</p>
              <p className="text-[#5B6475] text-base leading-relaxed mt-4">{service.h2Description}</p>
            </ServiceSection>

            <ServiceSection eyebrow={t("serviceDetail.sections.benefits.eyebrow")} title={t("serviceDetail.sections.benefits.title")}>
              <CheckList items={service.benefits} />
            </ServiceSection>

            <ServiceSection eyebrow={t("serviceDetail.sections.recommended.eyebrow")} title={service.candidatesTitle}>
              <CheckList items={service.candidates} />
            </ServiceSection>

            {service.treatmentOptions?.length ? (
              <ServiceSection eyebrow={t("serviceDetail.sections.treatmentOptions.eyebrow")} title={t("serviceDetail.sections.treatmentOptions.title")}>
                <CheckList items={service.treatmentOptions} />
              </ServiceSection>
            ) : null}

            <ServiceSection eyebrow={t("serviceDetail.sections.process.eyebrow")} title={service.processTitle}>
              <div className="grid gap-4">
                {service.process.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl bg-[#F7FAFC] border border-[#0F1932]/6 p-5">
                    <div className="w-9 h-9 rounded-full bg-[#0F1932] text-white shrink-0 flex items-center justify-center text-sm" style={{ fontWeight: 800 }}>
                      {index + 1}
                    </div>
                    <p className="text-[#5B6475] text-sm leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </ServiceSection>

            <ServiceSection eyebrow={t("serviceDetail.sections.technology.eyebrow")} title={t("serviceDetail.sections.technology.title")}>
              <div className="grid gap-4 md:grid-cols-3">
                {technologyItems.map((item) => (
                  <div key={item} className="rounded-2xl bg-[#F7FAFC] border border-[#0F1932]/6 p-5">
                    <Microscope className="w-5 h-5 text-[#7890BF] mb-3" />
                    <p className="text-[#5B6475] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </ServiceSection>

            {faqItems.length ? (
              <ServiceSection eyebrow={t("serviceDetail.sections.faq.eyebrow")} title={t("serviceDetail.sections.faq.title", { service: service.title })}>
                <div className="grid gap-4">
                  {faqItems.map((item) => {
                    const [question, answer] = item.split("::");
                    return (
                      <article key={item} className="rounded-2xl bg-[#F7FAFC] border border-[#0F1932]/6 p-5">
                        <h3 className="text-[#0F1932] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 800 }}>
                          {question}
                        </h3>
                        <p className="text-[#5B6475] text-sm leading-relaxed">{answer}</p>
                      </article>
                    );
                  })}
                </div>
              </ServiceSection>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-[#0F1932] rounded-3xl p-7 text-white">
              <Sparkles className="w-6 h-6 text-[#B5C7EB] mb-4" />
              <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 800 }}>
                {t("serviceDetail.whyClinic.title")}
              </h2>
              <CheckList items={clinicReasons} dark />
            </div>

            <div className="bg-white border border-[#0F1932]/8 rounded-3xl p-7">
              <ShieldCheck className="w-6 h-6 text-[#7890BF] mb-4" />
              <h2 className="text-[#0F1932] mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800 }}>
                {t("serviceDetail.related.title")}
              </h2>
              <div className="grid gap-3">
                {relatedServices.map((related) => (
                  <LocalizedNavLink
                    key={related.slug}
                    to={related.slug}
                    className="block rounded-2xl border border-[#0F1932]/8 p-4 hover:border-[#7890BF]/50 hover:bg-[#B5C7EB]/10 transition-colors"
                  >
                    <span className="text-[#7890BF] text-[0.68rem] uppercase tracking-[0.16em]" style={{ fontWeight: 800 }}>{related.category}</span>
                    <span className="block text-[#0F1932] mt-1" style={{ fontWeight: 800 }}>{related.title}</span>
                    <span className="block text-[#5B6475] text-xs leading-relaxed mt-2">{related.desc}</span>
                  </LocalizedNavLink>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#0F1932]/8 rounded-3xl p-7">
              <h2 className="text-[#0F1932] mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800 }}>
                {t("serviceDetail.cta.title", { service: service.title.toLowerCase() })}
              </h2>
              <p className="text-[#5B6475] text-sm leading-relaxed mb-6">{t("serviceDetail.cta.desc")}</p>
              <LocalizedNavLink
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-[#0F1932] text-white rounded-xl hover:bg-[#0F1932]/90 transition-colors"
                style={{ fontWeight: 700 }}
              >
                {t("serviceDetail.cta.book")} <ArrowRight className="w-4 h-4" />
              </LocalizedNavLink>
              <LocalizedNavLink
                to="/doctors"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 border border-[#0F1932]/12 text-[#0F1932] rounded-xl hover:bg-[#B5C7EB]/10 transition-colors"
                style={{ fontWeight: 600 }}
              >
                {t("footer.ourDoctors")}
              </LocalizedNavLink>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
