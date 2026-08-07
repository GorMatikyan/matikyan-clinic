import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSanityData } from "../../hooks/useSanityData";
import { SLIDES_QUERY } from "../../lib/queries";
import type { SanitySlide } from "../../lib/sanityTypes";
import { LocalizedNavLink } from "../routing";
import { siteImages } from "../siteImages";

// Every slide shows the same two buttons - About Us and Services - regardless of the slide's
// own topic, so every hero rotation reinforces the same two core internal links.
const fallbackSlides = [
  { image: siteImages.heroSlides[0], tag: "", title: "", desc: "" },
  { image: siteImages.heroSlides[1], tag: "", title: "", desc: "" },
  { image: siteImages.heroSlides[2], tag: "", title: "", desc: "" },
  { image: siteImages.heroSlides[3], tag: "", title: "", desc: "" },
];

export function PhotoSlider() {
  const { t } = useTranslation();
  const { data: sanitySlides } = useSanityData<SanitySlide[]>(SLIDES_QUERY, []);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loadedSlides, setLoadedSlides] = useState<number[]>([0]);

  const useSanity = Array.isArray(sanitySlides) && sanitySlides.length > 0;
  const localizedFallbackSlides = useMemo(() => {
    const translatedSlides = t("slider.slides", { returnObjects: true });

    if (!Array.isArray(translatedSlides)) {
      return fallbackSlides;
    }

    return fallbackSlides.map((fallbackSlide, index) => {
      const translatedSlide = translatedSlides[index];

      if (!translatedSlide || typeof translatedSlide !== "object") {
        return fallbackSlide;
      }

      return {
        ...fallbackSlide,
        tag: "tag" in translatedSlide && typeof translatedSlide.tag === "string" ? translatedSlide.tag : fallbackSlide.tag,
        title: "title" in translatedSlide && typeof translatedSlide.title === "string" ? translatedSlide.title : fallbackSlide.title,
        desc: "desc" in translatedSlide && typeof translatedSlide.desc === "string" ? translatedSlide.desc : fallbackSlide.desc,
      };
    });
  }, [t]);

  const slides = useSanity ? sanitySlides : localizedFallbackSlides;
  const totalSlides = slides.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % totalSlides), [totalSlides]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + totalSlides) % totalSlides), [totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1 || paused) return;

    const timer = window.setTimeout(next, 5500);
    return () => window.clearTimeout(timer);
  }, [paused, next, current, totalSlides]);

  useEffect(() => {
    setCurrent((value) => (value >= totalSlides ? 0 : value));
  }, [totalSlides]);

  useEffect(() => {
    setLoadedSlides((previous) => {
      const next = new Set(previous);
      next.add(current);
      return Array.from(next).sort((a, b) => a - b);
    });
  }, [current]);

  useEffect(() => {
    if (totalSlides <= 1) return;

    const nextSlideIndex = (current + 1) % totalSlides;
    const schedulePreload = () => {
      setLoadedSlides((previous) => {
        if (previous.includes(nextSlideIndex)) {
          return previous;
        }

        return [...previous, nextSlideIndex].sort((a, b) => a - b);
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => schedulePreload(), { timeout: 1500 });
      return () => {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleId);
        }
      };
    }

    const timer = window.setTimeout(schedulePreload, 800);
    return () => window.clearTimeout(timer);
  }, [current, totalSlides]);

  const slide = slides[current];

  return (
    <div
      className="relative overflow-hidden bg-[#0F1932]"
      style={{ height: "100vh", minHeight: "640px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {Array.from({ length: totalSlides }).map((_, i) => {
        const s = slides[i];
        const isLoaded = loadedSlides.includes(i);
        return (
          <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === current ? 1 : 0 }}>
            {isLoaded ? (
              <img
                src={s.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out"
                style={{ transform: i === current ? "scale(1)" : "scale(1.06)" }}
                // @ts-expect-error React 18's DOM runtime only recognizes the lowercase HTML
                // attribute; the camelCase `fetchPriority` typing targets React 19.
                fetchpriority={i === 0 ? "high" : undefined}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-[#0F1932]" />
            )}
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1932]/88 via-[#0F1932]/40 to-[#0F1932]/5 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1932]/60 via-transparent to-transparent z-10" />
      <div className="absolute top-0 left-0 w-1 h-full bg-[#B5C7EB] z-20" />

      <div className="absolute inset-0 z-20 flex items-center pt-[80px]">
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
              <LocalizedNavLink
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#B5C7EB] text-[#0F1932] rounded-xl hover:bg-[#B5C7EB]/85 transition-colors"
                style={{ fontWeight: 700 }}
              >
                {t("nav.about")} <ChevronRight className="w-4 h-4" />
              </LocalizedNavLink>
              <LocalizedNavLink
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-4 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/18 transition-colors"
                style={{ fontWeight: 500 }}
              >
                {t("nav.services")}
              </LocalizedNavLink>
            </div>
          </div>
        </div>
      </div>

      <button onClick={prev} className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#B5C7EB] hover:border-[#B5C7EB] transition-all group" aria-label={t("slider.previousSlide")}>
        <ChevronLeft className="w-5 h-5 text-white group-hover:text-[#0F1932]" />
      </button>
      <button onClick={next} className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#B5C7EB] hover:border-[#B5C7EB] transition-all group" aria-label={t("slider.nextSlide")}>
        <ChevronRight className="w-5 h-5 text-white group-hover:text-[#0F1932]" />
      </button>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-between px-10 lg:px-16">
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={t("slider.goToSlide", { index: i + 1 })}
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
