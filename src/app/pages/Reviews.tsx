import { Star, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSanityData } from "../../hooks/useSanityData";
import { REVIEWS_QUERY } from "../../lib/queries";
import type { SanityReview } from "../../lib/sanityTypes";

const reviews = [
  {
    name: "Sarah Mitchell", rating: 5, date: "May 2026", service: "Porcelain Veneers",
    text: "Absolutely incredible experience. Dr. Kovalenko transformed my smile with veneers and I couldn't be happier. The whole team was warm, professional, and made me feel at ease from the very first consultation.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
    source: "Google", featured: true,
  },
  {
    name: "James Thornton", rating: 5, date: "April 2026", service: "Dental Implants",
    text: "I was terrified of dental procedures but the team here made me feel completely at ease. My implants look and feel completely natural. The follow-up care was exceptional.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
    source: "Google", featured: false,
  },
  {
    name: "Elena Vasquez", rating: 5, date: "April 2026", service: "Teeth Whitening",
    text: "Best dental clinic I've ever visited. Modern equipment, kind staff, and results that exceeded my expectations. My teeth are 8 shades brighter!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format",
    source: "Yelp", featured: false,
  },
  {
    name: "Michael O'Brien", rating: 5, date: "March 2026", service: "Invisalign",
    text: "Dr. Reid is an Invisalign wizard. 14 months of treatment and my teeth are perfectly straight. The digital scanning was a game changer — zero pain, zero surprises.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
    source: "Google", featured: false,
  },
  {
    name: "Priya Nair", rating: 5, date: "March 2026", service: "Smile Makeover",
    text: "I had a complete smile makeover with Dr. Marchetti. The results are so natural-looking. People keep complimenting my smile. Pure artistry.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
    source: "Google", featured: false,
  },
  {
    name: "David Kowalski", rating: 5, date: "February 2026", service: "Root Canal",
    text: "I know root canals have a bad reputation but Dr. Okonkwo made it completely painless. I barely felt a thing and was back to normal within 24 hours.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
    source: "Healthgrades", featured: false,
  },
  {
    name: "Lisa Park", rating: 5, date: "February 2026", service: "Pediatric Dentistry",
    text: "My 6-year-old used to cry at every dentist visit. After one appointment with Dr. Chen, she actually asks when she can go back! Remarkable.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format",
    source: "Google", featured: false,
  },
  {
    name: "Roberto Esposito", rating: 5, date: "January 2026", service: "Periodontal Treatment",
    text: "Dr. Brooks diagnosed and treated my gum disease with remarkable precision. My gums are healthier now than they've been in years.",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&auto=format",
    source: "Google", featured: false,
  },
  {
    name: "Amanda Foster", rating: 4, date: "January 2026", service: "General Check-up",
    text: "Very thorough annual check-up. Digital X-rays and intraoral camera meant I could see exactly what the dentist was talking about. Quality of care is excellent.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop&auto=format",
    source: "Yelp", featured: false,
  },
];

const sourceStyle: Record<string, string> = {
  Google: "bg-[#B5C7EB]/20 text-[#0F1932]",
  Yelp: "bg-red-50 text-red-700",
  Healthgrades: "bg-blue-50 text-blue-700",
};

export function Reviews() {
  const { t } = useTranslation();
  const { data: reviewList } = useSanityData<SanityReview[]>(REVIEWS_QUERY, reviews);
  return (
    <div>
      {/* Header — navy */}
      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[#B5C7EB] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("reviews.header.badge")}</span>
          </div>
          <h1 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            {t("reviews.header.title")}
          </h1>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[#B5C7EB] text-[#B5C7EB]" />
            ))}
          </div>
          <p className="text-white/55 text-xl" style={{ fontWeight: 600 }}>{t("reviews.header.rating")}</p>
        </div>
      </section>

      {/* Stats — clean clinical band */}
      <section className="py-12 bg-white border-b border-[#0F1932]/8">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "4.9 / 5.0", labelKey: "reviews.stats.overallRating" },
            { value: "1,240+", labelKey: "reviews.stats.totalReviews" },
            { value: "99%", labelKey: "reviews.stats.recommend" },
            { value: "94%", labelKey: "reviews.stats.fiveStar" },
          ].map((s) => (
            <div key={s.labelKey} className="rounded-2xl p-6 text-center border border-[#B5C7EB]/20 hover:border-[#B5C7EB]/50 transition-colors" style={{ borderLeft: "3px solid #B5C7EB" }}>
              <div className="text-[#0F1932] mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 800 }}>{s.value}</div>
              <div className="text-[#5B6475] text-sm">{t(s.labelKey)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-16 pb-24 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewList.map((r) => (
              <div
                key={r.name}
                className={`rounded-2xl p-7 border flex flex-col ${
                  r.featured
                    ? "bg-[#0F1932] border-[#0F1932]"
                    : "bg-white border-[#0F1932]/8 hover:border-[#B5C7EB]/40 hover:shadow-md transition-all"
                }`}
              >
                <Quote className={`w-8 h-8 mb-4 shrink-0 ${r.featured ? "text-[#B5C7EB]/40" : "text-[#B5C7EB]/30"}`} />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < r.rating ? (r.featured ? "fill-[#B5C7EB] text-[#B5C7EB]" : "fill-[#B5C7EB] text-[#B5C7EB]") : "fill-[#0F1932]/10 text-[#0F1932]/10"}`}
                    />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed flex-1 mb-5 ${r.featured ? "text-white/70" : "text-[#5B6475]"}`}>"{r.text}"</p>
                <div className={`border-t pt-5 flex items-center justify-between ${r.featured ? "border-white/10" : "border-[#0F1932]/8"}`}>
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className={`text-sm ${r.featured ? "text-white" : "text-[#0F1932]"}`} style={{ fontWeight: 600 }}>{r.name}</div>
                      <div className={`text-xs ${r.featured ? "text-white/45" : "text-[#5B6475]"}`}>{r.service} · {r.date}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${r.featured ? "bg-[#B5C7EB]/20 text-[#B5C7EB]" : sourceStyle[r.source] ?? "bg-muted text-muted-foreground"}`} style={{ fontWeight: 500 }}>
                    {r.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
