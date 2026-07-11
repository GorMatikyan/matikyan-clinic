import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getLocalizedServiceDetailBySlug } from "../serviceData";
import { LocalizedNavLink } from "../routing";

type ServiceDetailProps = {
  serviceSlug: string;
};

export function ServiceDetail({ serviceSlug }: ServiceDetailProps) {
  const { t } = useTranslation();
  const service = getLocalizedServiceDetailBySlug(serviceSlug);

  if (!service) {
    return null;
  }

  return (
    <div>
      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[#B5C7EB] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>
                {service.category}
              </span>
            </div>
            <h1 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
              {service.title}
            </h1>
            <p className="text-[#B5C7EB] text-sm uppercase tracking-[0.2em] mb-4" style={{ fontWeight: 700 }}>
              {service.tagline}
            </p>
            <p className="text-white/65 text-lg max-w-2xl">{service.intro}</p>

            <div className="flex flex-wrap gap-3 mt-8">
              <div className="bg-white/8 border border-white/10 rounded-xl px-4 py-3">
                <div className="text-white/45 text-xs uppercase tracking-[0.18em] mb-1">{t("serviceDetail.labels.patientRating")}</div>
                <div className="text-white flex items-center gap-2" style={{ fontWeight: 700 }}>
                  <Star className="w-4 h-4 fill-[#B5C7EB] text-[#B5C7EB]" />
                  {service.rating}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={service.image}
              alt={t("serviceDetail.imageAlt", { service: service.title })}
              className="w-full h-full object-cover min-h-[320px]"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="bg-white border border-[#0F1932]/8 rounded-3xl p-8 lg:p-10">
            <h2 className="text-[#0F1932] mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800 }}>
              {service.h2Title}
            </h2>
            <p className="text-[#5B6475] leading-relaxed mb-8">{service.h2Description}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-[#0F1932] mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>
                  {service.processTitle}
                </h3>
                <ul className="flex flex-col gap-3">
                  {service.process.map((step) => (
                    <li key={step} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#B5C7EB] mt-1 shrink-0" />
                      <span className="text-[#5B6475] text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[#0F1932] mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>
                  {service.candidatesTitle}
                </h3>
                <ul className="flex flex-col gap-3">
                  {service.candidates.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#B5C7EB] mt-1 shrink-0" />
                      <span className="text-[#5B6475] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[#0F1932] rounded-3xl p-8 text-white">
              <div className="text-[#B5C7EB] text-xs uppercase tracking-[0.18em] mb-3" style={{ fontWeight: 700 }}>
                {t("serviceDetail.labels.keyBenefits")}
              </div>
              <ul className="flex flex-col gap-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#B5C7EB] mt-1 shrink-0" />
                    <span className="text-white/72 text-sm leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[#0F1932]/8 rounded-3xl p-8">
              <div className="text-[#0F1932] mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800 }}>
                {t("serviceDetail.cta.title", { service: service.title.toLowerCase() })}
              </div>
              <p className="text-[#5B6475] text-sm leading-relaxed mb-6">
                {t("serviceDetail.cta.desc")}
              </p>
              <div className="flex flex-col gap-3">
                <LocalizedNavLink
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0F1932] text-white rounded-xl hover:bg-[#0F1932]/90 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  {t("serviceDetail.cta.book")} <ArrowRight className="w-4 h-4" />
                </LocalizedNavLink>
                <LocalizedNavLink
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#0F1932]/12 text-[#0F1932] rounded-xl hover:bg-[#B5C7EB]/10 transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  {t("serviceDetail.cta.back")}
                </LocalizedNavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
