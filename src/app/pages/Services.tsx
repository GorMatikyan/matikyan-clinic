import { useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, Gem, Wrench, Crown, Microscope, Smile, HeartPulse, Scissors, Baby } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getLocalizedFallbackServices, getServiceSlugByTitle } from "../serviceData";
import { LocalizedNavLink } from "../routing";
import { PageHero } from "../components/PageHero";
import { siteImages } from "../siteImages";

const serviceIcons: Record<string, React.ElementType> = {
  "/services/dental-cleaning-check-up": ShieldCheck,
  "/services/teeth-whitening": Sparkles,
  "/services/veneers": Gem,
  "/services/dental-implants": Wrench,
  "/services/prosthetics-crowns": Crown,
  "/services/root-canal-treatment": Microscope,
  "/services/orthodontics": Smile,
  "/services/periodontal-treatment": HeartPulse,
  "/services/oral-surgery": Scissors,
  "/services/digital-diagnostics": Baby,
};

const categoryKeys = ["all", "therapy", "periodontology", "orthopedics", "surgery", "orthodontics", "diagnostics"] as const;
const categoryValues = {
  all: "All",
  therapy: "Therapy",
  periodontology: "Periodontology",
  orthopedics: "Orthopedics",
  orthodontics: "Orthodontics",
  surgery: "Surgery",
  diagnostics: "Diagnostics",
} as const;

export function Services() {
  const { t } = useTranslation();
  const [active, setActive] = useState<keyof typeof categoryValues>("all");
  const localizedServices = getLocalizedFallbackServices();

  const filtered = active === "all" ? localizedServices : localizedServices.filter((s) => s.category === t(`serviceCatalog.categories.${active}`));

  return (
    <div>
      {/* Header */}
      <PageHero
        eyebrow={t("services.header.badge")}
        title={t("services.header.title")}
        description={t("services.header.desc")}
        imageSrc={siteImages.aboutImages.interior}
        imageAlt={t("about.images.interiorAlt")}
        primaryAction={{ label: t("nav.bookAppointment"), to: "/contact" }}
      />

      {/* Filter */}
      <section className="py-6 bg-[#0F1932] border-t border-white/8 sticky top-18 z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-2 justify-center">
          {categoryKeys.map((categoryKey) => (
            <button
              key={categoryKey}
              onClick={() => setActive(categoryKey)}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                active === categoryKey
                  ? "bg-[#B5C7EB] text-[#0F1932]"
                  : "bg-white/8 border border-white/10 text-white/65 hover:bg-[#B5C7EB]/20 hover:text-[#B5C7EB]"
              }`}
              style={{ fontWeight: active === categoryKey ? 600 : 400 }}
            >
              {t(`services.filter.${categoryKey}`)}
            </button>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => {
              const serviceSlug = getServiceSlugByTitle(service.title);
              const Icon = serviceIcons[serviceSlug];

              return (
                <div
                  key={service.title}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#0F1932]/8 transition-all duration-300 hover:border-[#B5C7EB]/40 hover:shadow-md"
                >
                  <LocalizedNavLink to={serviceSlug} className="block">
                    {/* Image */}
                    <div className="relative overflow-hidden h-48 bg-[#eef1f8]">
                      <img
                        src={service.image}
                        alt={t("services.card.imageAlt", { service: service.title })}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1932]/60 to-transparent" />
                      <div className="absolute top-4 left-4 bg-[#B5C7EB] text-[#0F1932] text-xs px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                        {service.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {Icon ? <div className="w-8 h-8 rounded-lg bg-[#B5C7EB]/10 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-[#B5C7EB]" /></div> : null}
                        <h3 className="text-[#0F1932]" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700 }}>
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-[#B5C7EB] text-xs mb-3" style={{ fontWeight: 600 }}>{service.tagline}</p>
                      <p className="text-[#5B6475] text-sm leading-relaxed mb-4 line-clamp-2">{service.desc}</p>
                    </div>
                  </LocalizedNavLink>

                    {/* Actions */}
                    <div>
                      <LocalizedNavLink
                        to={serviceSlug}
                        aria-label={t("services.card.learnMoreAria", { service: service.title })}
                        className="flex-1 py-2.5 rounded-xl border border-[#0F1932]/15 text-[#0F1932] text-sm text-center hover:bg-[#B5C7EB]/10 hover:border-[#B5C7EB]/40 transition-colors flex items-center justify-center gap-1.5"
                        style={{ fontWeight: 500 }}
                      >
                        {t("services.card.learnMore")}
                      </LocalizedNavLink>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#B5C7EB]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[#0F1932] mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800 }}>
            {t("services.cta.title")}
          </h2>
          <p className="text-[#0F1932]/70 text-lg mb-8">
            {t("services.cta.desc")}
          </p>
          <LocalizedNavLink
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F1932] text-white rounded-xl hover:bg-[#0F1932]/90 transition-colors"
            style={{ fontWeight: 600 }}
          >
            {t("services.cta.button")}
            <ArrowRight className="w-4 h-4" />
          </LocalizedNavLink>
        </div>
      </section>
    </div>
  );
}
