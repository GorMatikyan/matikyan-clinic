import { useTranslation } from "react-i18next";
import {
  ArrowRight, Shield, Award, Users, Clock, ChevronRight,
  Smile,
} from "lucide-react";
import { PhotoSlider } from "../components/PhotoSlider";
import { getServiceDetailBySlug, getServiceSlugByTitle, SERVICE_IMAGE_FULL_WIDTH } from "../serviceData";
import { LocalizedNavLink } from "../routing";
import { siteImages } from "../siteImages";

const servicePreviewItems = [
  { key: "implants", title: "Dental Implants" },
  { key: "whitening", title: "Teeth Whitening" },
  { key: "ortho", title: "Orthodontics" },
  { key: "veneers", title: "Dental Veneers & Aesthetic Restorations" },
  { key: "rootCanal", title: "Endodontic Treatment" },
  { key: "pediatric", title: "Diagnostics & Digital Dentistry" },
].map((item) => {
  const path = getServiceSlugByTitle(item.title);
  const service = getServiceDetailBySlug(path);
  return {
    ...item,
    path,
    image: service?.image,
    imageMobile: service?.imageMobile,
  };
});

const featureIcons = [Shield, Award, Users, Clock];
const featureKeys = ["painFree", "certified", "family", "hours"] as const;

export function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* ── Hero Slider ── */}
      <PhotoSlider />

      {/* ── Services overview ── */}
      <section className="py-24 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-4">
                <span className="text-[#0F1932] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>
                  {t("home.services.badge")}
                </span>
              </div>
              <h2 className="text-[#0F1932]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800 }}>
                {t("home.services.title")}
              </h2>
            </div>
            <LocalizedNavLink to="/services" className="inline-flex items-center gap-2 text-[#0F1932] text-sm hover:gap-3 transition-all shrink-0" style={{ fontWeight: 500 }}>
              {t("home.services.viewAll")} <ChevronRight className="w-4 h-4" />
            </LocalizedNavLink>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicePreviewItems.map(({ key, path, image, imageMobile }) => {
              const serviceTitle = t(`home.services.items.${key}.title`);
              return (
                <LocalizedNavLink
                  to={path}
                  key={key}
                  className="group block overflow-hidden rounded-2xl bg-white border border-[#0F1932]/8 shadow-sm hover:border-[#B5C7EB]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="h-44 overflow-hidden bg-[#eef1f8]">
                    {image ? (
                      <img
                        src={image}
                        srcSet={imageMobile ? `${imageMobile} 960w, ${image} ${SERVICE_IMAGE_FULL_WIDTH}w` : undefined}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        alt={t("services.card.imageAlt", { service: serviceTitle })}
                        width={1536}
                        height={1024}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : null}
                  </div>
                  <div className="p-7">
                    <h3 className="text-[#0F1932] mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800 }}>
                      {serviceTitle}
                    </h3>
                    <p className="text-[#5B6475] text-sm leading-relaxed line-clamp-3">{t(`home.services.items.${key}.desc`)}</p>
                    <div className="mt-5 flex items-center gap-2 text-[#7890BF] text-sm transition-colors group-hover:text-[#0F1932]" style={{ fontWeight: 700 }}>
                      {t("home.services.learnMore")} <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </LocalizedNavLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why us ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={siteImages.clinicFacade.full}
              srcSet={`${siteImages.clinicFacade.mobile} 960w, ${siteImages.clinicFacade.full} ${siteImages.clinicFacade.fullWidth}w`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={t("home.whyUs.imageAlt")}
              className="w-full rounded-2xl object-cover shadow-xl"
              style={{ height: "460px" }}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
              <span className="text-[#0F1932] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("home.whyUs.badge")}</span>
            </div>
            <h2 className="text-[#0F1932] mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800 }}>
              {t("home.whyUs.title")}
            </h2>
            <p className="text-[#5B6475] leading-relaxed mb-10">{t("home.whyUs.desc")}</p>

            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              {featureKeys.map((key, i) => {
                const Icon = featureIcons[i];
                return (
                  <div key={key} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#B5C7EB]/15 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#B5C7EB]" />
                    </div>
                    <div>
                      <div className="text-[#0F1932] text-sm mb-1" style={{ fontWeight: 600 }}>{t(`home.whyUs.features.${key}.title`)}</div>
                      <div className="text-[#5B6475] text-sm">{t(`home.whyUs.features.${key}.desc`)}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <LocalizedNavLink to="/about" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0F1932] text-white rounded-xl hover:bg-[#0F1932]/90 transition-colors" style={{ fontWeight: 500 }}>
              {t("home.whyUs.learnMore")} <ArrowRight className="w-4 h-4" />
            </LocalizedNavLink>
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-20 bg-[#0F1932] border-t border-white/8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#B5C7EB]/15 flex items-center justify-center mx-auto mb-6">
            <Smile className="w-7 h-7 text-[#B5C7EB]" />
          </div>
          <h2 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800 }}>
            {t("home.cta.title")}
          </h2>
          <p className="text-white/60 text-lg mb-8">{t("home.cta.desc")}</p>
          <LocalizedNavLink to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#B5C7EB] text-[#0F1932] rounded-xl hover:bg-[#B5C7EB]/90 transition-colors" style={{ fontWeight: 600 }}>
            {t("home.cta.button")} <ArrowRight className="w-4 h-4" />
          </LocalizedNavLink>
        </div>
      </section>
    </div>
  );
}
