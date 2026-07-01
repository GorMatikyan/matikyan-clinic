import { useState } from "react";
import { ArrowRight, Clock, Star, ShieldCheck, Sparkles, Gem, Palette, Wrench, Crown, Microscope, Smile, Layers, HeartPulse, Scissors, Baby } from "lucide-react";
import { useSanityData } from "../../hooks/useSanityData";
import { SERVICES_QUERY } from "../../lib/queries";
import { useTranslation } from "react-i18next";
import type { SanityService } from "../../lib/sanityTypes";
import { fallbackServices, localizeServiceListItem, getServiceSlugByTitle } from "../serviceData";
import { LocalizedNavLink } from "../routing";

const serviceIcons: Record<string, React.ElementType> = {
  "/dental-cleaning-check-up": ShieldCheck,
  "/teeth-whitening": Sparkles,
  "/veneers": Gem,
  "/composite-bonding": Palette,
  "/dental-implants": Wrench,
  "/same-day-crowns": Crown,
  "/root-canal-treatment": Microscope,
  "/invisalign": Smile,
  "/ceramic-braces": Layers,
  "/periodontal-treatment": HeartPulse,
  "/wisdom-tooth-extraction": Scissors,
  "/pediatric-dentistry": Baby,
};

const categoryKeys = ["all", "preventive", "cosmetic", "restorative", "orthodontics", "surgery", "pediatric"] as const;
const categoryValues = {
  all: "All",
  preventive: "Preventive",
  cosmetic: "Cosmetic",
  restorative: "Restorative",
  orthodontics: "Orthodontics",
  surgery: "Surgery",
  pediatric: "Pediatric",
} as const;

export function Services() {
  const { t } = useTranslation();
  const { data: serviceList } = useSanityData<SanityService[]>(SERVICES_QUERY, fallbackServices);
  const [active, setActive] = useState<keyof typeof categoryValues>("all");
  const localizedServices = serviceList.map(localizeServiceListItem);

  const filtered = active === "all" ? localizedServices : localizedServices.filter((s) => s.category === t(`serviceCatalog.categories.${active}`));

  return (
    <div>
      {/* Header */}
      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[#B5C7EB] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("services.header.badge")}</span>
          </div>
          <h1 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            {t("services.header.title")}
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            {t("services.header.desc")}
          </p>
        </div>
      </section>

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
                      <div className="absolute top-4 right-4 bg-white/95 rounded-full px-2.5 py-1 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#B5C7EB] text-[#B5C7EB]" />
                        <span className="text-xs text-[#0F1932]" style={{ fontWeight: 700 }}>{service.rating}</span>
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

                    {/* Meta row */}
                    <div className="flex items-center gap-4 py-3 border-y border-[#0F1932]/8 mb-4">
                      <div className="text-[#0F1932] text-sm" style={{ fontWeight: 700 }}>{service.price}</div>
                      <div className="flex items-center gap-1 text-xs text-[#5B6475]">
                        <Clock className="w-3.5 h-3.5 text-[#B5C7EB]" />
                        {service.duration}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <LocalizedNavLink
                        to={serviceSlug}
                        aria-label={t("services.card.learnMoreAria", { service: service.title })}
                        className="flex-1 py-2.5 rounded-xl border border-[#0F1932]/15 text-[#0F1932] text-sm text-center hover:bg-[#B5C7EB]/10 hover:border-[#B5C7EB]/40 transition-colors flex items-center justify-center gap-1.5"
                        style={{ fontWeight: 500 }}
                      >
                        {t("services.card.learnMore")}
                      </LocalizedNavLink>
                      <LocalizedNavLink
                        to="/contact"
                        aria-label={t("services.card.bookAria", { service: service.title })}
                        className="flex-1 py-2.5 rounded-xl bg-[#0F1932] text-white text-sm text-center hover:bg-[#B5C7EB] hover:text-[#0F1932] transition-colors flex items-center justify-center gap-1.5"
                        style={{ fontWeight: 600 }}
                      >
                        {t("services.card.book")} <ArrowRight className="w-3.5 h-3.5" />
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
