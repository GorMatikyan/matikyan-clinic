import { useState } from "react";
import { NavLink } from "react-router";
import { ArrowRight, CheckCircle2, Clock, Star, ShieldCheck, Sparkles, Gem, Palette, Wrench, Crown, Microscope, Smile, Layers, HeartPulse, Scissors, Baby } from "lucide-react";
import { useSanityData } from "../../hooks/useSanityData";
import { SERVICES_QUERY } from "../../lib/queries";
import { useTranslation } from "react-i18next";
import type { SanityService } from "../../lib/sanityTypes";

const serviceIcons: Record<string, React.ElementType> = {
  "Dental Cleaning & Check-up": ShieldCheck,
  "Professional Teeth Whitening": Sparkles,
  "Porcelain Veneers": Gem,
  "Composite Bonding": Palette,
  "Dental Implants": Wrench,
  "Same-Day Crowns (CEREC)": Crown,
  "Root Canal Treatment": Microscope,
  "Invisalign Clear Aligners": Smile,
  "Ceramic Braces": Layers,
  "Periodontal Treatment": HeartPulse,
  "Wisdom Tooth Extraction": Scissors,
  "Pediatric Dentistry": Baby,
};

const categories = ["All", "Preventive", "Cosmetic", "Restorative", "Orthodontics", "Surgery", "Pediatric"];

const services = [
  {
    category: "Preventive",
    icon: "🦷",
    title: "Dental Cleaning & Check-up",
    tagline: "Foundation of a healthy smile",
    desc: "Professional teeth cleaning removes tartar and plaque that regular brushing can't reach. Combined with a full oral examination, digital X-rays, and gum health assessment.",
    price: "From $80",
    duration: "60 min",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1588776814546-1ffbb172601e?w=600&h=400&fit=crop&auto=format",
    benefits: ["Removes tartar and staining", "Early cavity detection", "Gum disease screening", "Personalized oral hygiene advice"],
  },
  {
    category: "Cosmetic",
    icon: "✨",
    title: "Professional Teeth Whitening",
    tagline: "Up to 8 shades brighter in one visit",
    desc: "In-office laser whitening using a professional-grade hydrogen peroxide gel activated by a specialized light. Safe, effective, and long-lasting results in under 90 minutes.",
    price: "From $350",
    duration: "90 min",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&h=400&fit=crop&auto=format",
    benefits: ["8+ shades lighter", "Single visit treatment", "Minimal sensitivity formula", "Take-home maintenance kit included"],
  },
  {
    category: "Cosmetic",
    icon: "💎",
    title: "Porcelain Veneers",
    tagline: "The Hollywood smile, perfected",
    desc: "Ultra-thin porcelain shells custom-crafted to cover the front surface of teeth. Correct chips, stains, gaps, and irregular shapes with results that look and feel completely natural.",
    price: "From $900/tooth",
    duration: "2 appointments",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop&auto=format",
    benefits: ["Natural-looking results", "Stain-resistant porcelain", "15–20 year lifespan", "Custom color matching"],
  },
  {
    category: "Cosmetic",
    icon: "🎨",
    title: "Composite Bonding",
    tagline: "Single-visit smile enhancement",
    desc: "Tooth-colored resin applied and sculpted directly onto teeth to repair chips, close gaps, and reshape irregular surfaces. A cost-effective alternative to veneers with zero enamel removal.",
    price: "From $250/tooth",
    duration: "60–90 min",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&auto=format",
    benefits: ["No enamel removal", "Same-day results", "Reversible treatment", "Seamlessly color-matched"],
  },
  {
    category: "Restorative",
    icon: "🔩",
    title: "Dental Implants",
    tagline: "Permanent tooth replacement",
    desc: "Titanium posts surgically placed in the jawbone to support a natural-looking crown. The gold standard for missing teeth, preserving bone density and providing a lifetime of function.",
    price: "From $2,400",
    duration: "3–6 months",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&auto=format",
    benefits: ["Permanent solution", "Preserves jawbone", "No impact on adjacent teeth", "Lifetime durability with care"],
  },
  {
    category: "Restorative",
    icon: "👑",
    title: "Same-Day Crowns (CEREC)",
    tagline: "Crown in a single appointment",
    desc: "Using CAD/CAM technology, we design and mill a precision ceramic crown on-site while you wait. No temporaries, no second visit — just a perfect crown, same day.",
    price: "From $1,100",
    duration: "2 hours",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&h=400&fit=crop&auto=format",
    benefits: ["Single-visit treatment", "Digital precision fit", "Metal-free ceramic", "No temporary crowns"],
  },
  {
    category: "Restorative",
    icon: "🔬",
    title: "Root Canal Treatment",
    tagline: "Save your natural tooth, pain-free",
    desc: "Modern endodontic therapy to remove infected pulp and seal the tooth canal. With advanced anesthesia and rotary instruments, most patients report feeling little to no discomfort.",
    price: "From $700",
    duration: "60–90 min",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=400&fit=crop&auto=format",
    benefits: ["Saves natural tooth", "Pain-free procedure", "Laser-assisted option", "High success rate"],
  },
  {
    category: "Orthodontics",
    icon: "😁",
    title: "Invisalign Clear Aligners",
    tagline: "Straighten teeth discreetly",
    desc: "Removable clear aligners that gradually shift teeth into alignment. 3D scanning allows you to visualize your final result before starting. Suitable for mild to moderate cases.",
    price: "From $3,200",
    duration: "6–24 months",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop&auto=format",
    benefits: ["Virtually invisible", "Removable for eating", "3D result preview", "No dietary restrictions"],
  },
  {
    category: "Orthodontics",
    icon: "🦾",
    title: "Ceramic Braces",
    tagline: "Effective and discreet correction",
    desc: "Tooth-colored ceramic brackets blending with natural tooth color for a less visible appearance than metal braces. Ideal for complex alignment and bite corrections in all ages.",
    price: "From $2,800",
    duration: "12–24 months",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&auto=format",
    benefits: ["Tooth-colored brackets", "Handles complex cases", "Adults and teens", "Precise bite correction"],
  },
  {
    category: "Surgery",
    icon: "🩺",
    title: "Periodontal Treatment",
    tagline: "Advanced gum disease therapy",
    desc: "Comprehensive treatment for all stages of gum disease — from deep cleaning and scaling to laser-assisted periodontal therapy and regenerative procedures.",
    price: "From $450",
    duration: "Varies by stage",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format",
    benefits: ["All gum disease stages", "Laser-assisted option", "Bone regeneration available", "Maintenance program included"],
  },
  {
    category: "Surgery",
    icon: "🦷",
    title: "Wisdom Tooth Extraction",
    tagline: "Safe, comfortable removal",
    desc: "Surgical and non-surgical removal of impacted and problematic wisdom teeth. Performed under local anesthesia with sedation options available for anxious patients.",
    price: "From $300/tooth",
    duration: "45–90 min",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=600&h=400&fit=crop&auto=format",
    benefits: ["Sedation available", "Same-day procedure", "Minimal recovery time", "Detailed aftercare support"],
  },
  {
    category: "Pediatric",
    icon: "👶",
    title: "Pediatric Dentistry",
    tagline: "Gentle care for little smiles",
    desc: "Specialized dental care designed for children from age 1 through teenage years. Child-friendly environment, preventive treatments, and early orthodontic monitoring.",
    price: "From $60",
    duration: "30–60 min",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&auto=format",
    benefits: ["Age 1+ welcome", "Fear-free approach", "Sealants and fluoride", "Early ortho assessment"],
  },
];

export function Services() {
  const { t } = useTranslation();
  const { data: serviceList } = useSanityData<SanityService[]>(SERVICES_QUERY, services);
  const [active, setActive] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = active === "All" ? serviceList : serviceList.filter((s) => s.category === active);

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
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                active === cat
                  ? "bg-[#B5C7EB] text-[#0F1932]"
                  : "bg-white/8 border border-white/10 text-white/65 hover:bg-[#B5C7EB]/20 hover:text-[#B5C7EB]"
              }`}
              style={{ fontWeight: active === cat ? 600 : 400 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => {
              const isOpen = expanded === service.title;
              return (
                <div
                  key={service.title}
                  className={`group bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isOpen
                      ? "border-[#B5C7EB]/60 shadow-lg"
                      : "border-[#0F1932]/8 hover:border-[#B5C7EB]/40 hover:shadow-md"
                  }`}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 bg-[#eef1f8]">
                    <img
                      src={service.image}
                      alt={service.title}
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
                      {(() => { const Icon = serviceIcons[service.title]; return Icon ? <div className="w-8 h-8 rounded-lg bg-[#B5C7EB]/10 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-[#B5C7EB]" /></div> : null; })()}
                      <h3 className="text-[#0F1932]" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700 }}>
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-[#B5C7EB] text-xs mb-3" style={{ fontWeight: 600 }}>{service.tagline}</p>
                    <p className="text-[#5B6475] text-sm leading-relaxed mb-4 line-clamp-2">{service.desc}</p>

                    {/* Meta row */}
                    <div className="flex items-center gap-4 py-3 border-y border-[#0F1932]/8 mb-4">
                      <div className="text-[#0F1932] text-sm" style={{ fontWeight: 700 }}>{service.price}</div>
                      <div className="flex items-center gap-1 text-xs text-[#5B6475]">
                        <Clock className="w-3.5 h-3.5 text-[#B5C7EB]" />
                        {service.duration}
                      </div>
                    </div>

                    {/* Expand: benefits */}
                    {isOpen && (
                      <ul className="mb-4 flex flex-col gap-2">
                        {service.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#B5C7EB] shrink-0 mt-0.5" />
                            <span className="text-[#0F1932] text-sm">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setExpanded(isOpen ? null : service.title)}
                        className="flex-1 py-2.5 rounded-xl border border-[#0F1932]/15 text-[#0F1932] text-sm hover:bg-[#B5C7EB]/10 hover:border-[#B5C7EB]/40 transition-colors"
                        style={{ fontWeight: 500 }}
                      >
                        {isOpen ? t("services.card.lessInfo") : t("services.card.learnMore")}
                      </button>
                      <NavLink
                        to="/contact"
                        className="flex-1 py-2.5 rounded-xl bg-[#0F1932] text-white text-sm text-center hover:bg-[#B5C7EB] hover:text-[#0F1932] transition-colors flex items-center justify-center gap-1.5"
                        style={{ fontWeight: 600 }}
                      >
                        {t("services.card.book")} <ArrowRight className="w-3.5 h-3.5" />
                      </NavLink>
                    </div>
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
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F1932] text-white rounded-xl hover:bg-[#0F1932]/90 transition-colors"
            style={{ fontWeight: 600 }}
          >
            {t("services.cta.button")}
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </section>
    </div>
  );
}
