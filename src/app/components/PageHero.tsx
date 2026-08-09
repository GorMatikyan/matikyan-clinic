import { ArrowRight } from "lucide-react";
import { LocalizedNavLink, useCurrentLanguage } from "../routing";

type HeroAction = {
  label: string;
  to?: string;
  href?: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageSrcSet?: string;
  imageAlt?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  trustItems?: string[];
  children?: React.ReactNode;
};

function HeroLink({ action, primary = false }: { action: HeroAction; primary?: boolean }) {
  const className = primary
    ? "inline-flex items-center justify-center gap-2 rounded-xl bg-[#B5C7EB] px-6 py-3.5 text-[#0F1932] shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition-colors hover:bg-white"
    : "inline-flex items-center justify-center gap-2 rounded-xl border border-white/14 px-6 py-3.5 text-white transition-colors hover:bg-white/8";

  if (action.href) {
    return (
      <a href={action.href} className={className} style={{ fontWeight: primary ? 700 : 600 }}>
        {action.label}
        {primary ? <ArrowRight className="h-4 w-4" /> : null}
      </a>
    );
  }

  return (
    <LocalizedNavLink to={action.to ?? "/"} className={className} style={{ fontWeight: primary ? 700 : 600 }}>
      {action.label}
      {primary ? <ArrowRight className="h-4 w-4" /> : null}
    </LocalizedNavLink>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageSrcSet,
  imageAlt = "",
  primaryAction,
  secondaryAction,
  trustItems,
  children,
}: PageHeroProps) {
  const currentLanguage = useCurrentLanguage();
  const eyebrowTracking = currentLanguage === "hy" ? "tracking-[0.08em]" : "tracking-widest uppercase";

  return (
    <section className="relative overflow-hidden bg-[#0F1932] pb-12 pt-[2rem] lg:pb-14 lg:pt-[2.5rem]">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,25,50,0.54)_0%,rgba(15,25,50,0)_34%),radial-gradient(circle_at_78%_32%,rgba(181,199,235,0.22)_0%,rgba(181,199,235,0.08)_30%,rgba(15,25,50,0)_58%),radial-gradient(circle_at_18%_82%,rgba(120,144,191,0.18)_0%,rgba(120,144,191,0)_48%)]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className={`relative grid items-center gap-10 lg:gap-14 ${imageSrc ? "lg:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[minmax(0,760px)]"}`}>
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-1 ring-1 ring-white/12">
              <span className={`text-xs text-[#B5C7EB] ${eyebrowTracking}`} style={{ fontWeight: 700 }}>
                {eyebrow}
              </span>
            </div>
            <h1 className="mb-5 max-w-[620px] text-white" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.05rem, 3.8vw, 3.35rem)", fontWeight: 800, lineHeight: 1.04 }}>
              {title}
            </h1>
            <p className="max-w-[580px] text-lg leading-relaxed text-white/68">{description}</p>

            {(primaryAction || secondaryAction) ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {primaryAction ? <HeroLink action={primaryAction} primary /> : null}
                {secondaryAction ? <HeroLink action={secondaryAction} /> : null}
              </div>
            ) : null}

            {trustItems?.length ? (
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {trustItems.map((item) => (
                  <span key={item} className="text-sm text-white/72" style={{ fontWeight: 600 }}>
                    <span className="text-[#B5C7EB]" aria-hidden="true">✓</span> {item}
                  </span>
                ))}
              </div>
            ) : null}

            {children}
          </div>

          {imageSrc ? (
            <div className="relative">
              <div className="absolute left-[8%] top-[4%] h-72 w-72 rounded-full bg-[#B5C7EB]/18 blur-3xl" />
              <div className="absolute bottom-[8%] right-[6%] h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/16 bg-[#eef1f8] shadow-[0_26px_70px_rgba(0,0,0,0.3)]">
                <img
                  src={imageSrc}
                  srcSet={imageSrcSet}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  alt={imageAlt}
                  width={1200}
                  height={801}
                  loading="eager"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover brightness-[1.02] saturate-[0.96]"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
