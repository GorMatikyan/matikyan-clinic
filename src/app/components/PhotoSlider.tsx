import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { useSanityData } from "../../hooks/useSanityData";
import { SLIDES_QUERY } from "../../lib/queries";
import type { SanitySlide } from "../../lib/sanityTypes";

const fallbackSlides = [
  {
    image: "https://images.unsplash.com/photo-1643660527098-559f89e45a92?w=1600&h=900&fit=crop&auto=format",
    tag: "", title: "", desc: "", cta: "", link: "/services",
  },
  {
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&h=900&fit=crop&auto=format",
    tag: "", title: "", desc: "", cta: "", link: "/about",
  },
  {
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1600&h=900&fit=crop&auto=format",
    tag: "", title: "", desc: "", cta: "", link: "/services",
  },
  {
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1600&h=900&fit=crop&auto=format",
    tag: "", title: "", desc: "", cta: "", link: "/doctors",
  },
];

export function PhotoSlider() {
  const { t } = useTranslation();
  const { data: sanitySlides } = useSanityData<SanitySlide[]>(SLIDES_QUERY, []);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const useSanity = Array.isArray(sanitySlides) && sanitySlides.length > 0;
  const totalSlides = useSanity ? sanitySlides.length : fallbackSlides.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % totalSlides), [totalSlides]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + totalSlides) % totalSlides), [totalSlides]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [paused, next]);

  const getSlide = (i: number) => {
    if (useSanity) return sanitySlides[i];
    return {
      image: fallbackSlides[i].image,
      tag: t(`slider.slides.${i}.tag`),
      title: t(`slider.slides.${i}.title`),
      desc: t(`slider.slides.${i}.desc`),
      cta: t(`slider.slides.${i}.cta`),
      link: fallbackSlides[i].link,
    };
  };

  const slide = getSlide(current);

  return (
    <div
      className="relative overflow-hidden bg-[#0F1932]"
      style={{ height: "calc(100vh - 72px)", minHeight: "560px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {Array.from({ length: totalSlides }).map((_, i) => {
        const s = getSlide(i);
        return (
          <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === current ? 1 : 0 }}>
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out"
              style={{ backgroundImage: `url(${s.image})`, transform: i === current ? "scale(1)" : "scale(1.06)" }}
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1932]/90 via-[#0F1932]/55 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1932]/55 via-transparent to-transparent z-10" />
      <div className="absolute top-0 left-0 w-1 h-full bg-[#B5C7EB] z-20" />

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-10 lg:px-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 border border-[#B5C7EB]/30 rounded-full px-4 py-2 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B5C7EB] block" />
              <span className="text-[#B5C7EB] text-sm" style={{ fontWeight: 600 }}>{slide.tag}</span>
            </div>

            <h1 className="text-white mb-6 whitespace-pre-line" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4.5vw, 4rem)", fontWeight: 800, lineHeight: 1.08 }}>
              {slide.title}
            </h1>

            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-lg">{slide.desc}</p>

            <div className="flex flex-wrap gap-4">
              <NavLink
                to={slide.link || "/services"}
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#B5C7EB] text-[#0F1932] rounded-xl hover:bg-[#B5C7EB]/85 transition-colors"
                style={{ fontWeight: 700 }}
              >
                {slide.cta} <ChevronRight className="w-4 h-4" />
              </NavLink>
              <NavLink
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/18 transition-colors"
                style={{ fontWeight: 500 }}
              >
                {t("slider.bookConsultation")}
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <button onClick={prev} className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#B5C7EB] hover:border-[#B5C7EB] transition-all group" aria-label="Previous slide">
        <ChevronLeft className="w-5 h-5 text-white group-hover:text-[#0F1932]" />
      </button>
      <button onClick={next} className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#B5C7EB] hover:border-[#B5C7EB] transition-all group" aria-label="Next slide">
        <ChevronRight className="w-5 h-5 text-white group-hover:text-[#0F1932]" />
      </button>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-between px-10 lg:px-16">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}
              style={{ height: "8px", borderRadius: "4px", background: i === current ? "#B5C7EB" : "rgba(255,255,255,0.3)", transition: "width 0.4s ease, background 0.4s ease", width: i === current ? "28px" : "8px" }}
            />
          ))}
        </div>
        <div className="text-white/40 text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
          <span className="text-white/75">{String(current + 1).padStart(2, "0")}</span>
          <span className="mx-1.5">/</span>
          {String(totalSlides).padStart(2, "0")}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
        <div key={current} className="h-full bg-[#B5C7EB]" style={{ animation: paused ? "none" : "progress 5.5s linear forwards" }} />
      </div>

      <style>{`@keyframes progress { from { width: 0%; } to { width: 100%; } }`}</style>
    </div>
  );
}
