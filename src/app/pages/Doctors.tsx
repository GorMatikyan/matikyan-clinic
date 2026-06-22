import { useState } from "react";
import { NavLink } from "react-router";
import { ArrowRight, Star, GraduationCap, Stethoscope } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSanityData } from "../../hooks/useSanityData";
import { DOCTORS_QUERY } from "../../lib/queries";
import type { SanityDoctor } from "../../lib/sanityTypes";

const specialties = ["All", "Implantology", "Orthodontics", "Cosmetic", "Periodontics", "Endodontics", "Pediatric"];

const doctors = [
  {
    name: "Dr. Anna Kovalenko", title: "Chief of Implantology", specialty: "Implantology",
    experience: "14 years", rating: 4.9, reviews: 312, education: "Columbia University, New York",
    desc: "Leading expert in full-arch implant restorations and bone grafting with an impeccable record of patient outcomes.",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Dr. Marcus Reid", title: "Senior Orthodontist", specialty: "Orthodontics",
    experience: "11 years", rating: 4.8, reviews: 287, education: "NYU College of Dentistry",
    desc: "Specialist in Invisalign, ceramic braces, and accelerated orthodontics for adults and teenagers.",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Dr. Sofia Marchetti", title: "Cosmetic Dentist", specialty: "Cosmetic",
    experience: "9 years", rating: 5.0, reviews: 261, education: "University of Pennsylvania",
    desc: "Renowned for her artistic approach to smile design — veneers, composite bonding, and full smile makeovers.",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Dr. Ethan Brooks", title: "Periodontist", specialty: "Periodontics",
    experience: "13 years", rating: 4.9, reviews: 198, education: "Harvard School of Dental Medicine",
    desc: "Expert in gum disease treatment, gum grafting, and regenerative periodontal therapy.",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Dr. Nadia Okonkwo", title: "Endodontist", specialty: "Endodontics",
    experience: "8 years", rating: 4.9, reviews: 174, education: "Tufts University School of Dental Medicine",
    desc: "Pain-free root canal specialist using the latest rotary and laser-assisted endodontic techniques.",
    photo: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=480&fit=crop&auto=format",
  },
  {
    name: "Dr. Liam Chen", title: "Pediatric Dentist", specialty: "Pediatric",
    experience: "7 years", rating: 5.0, reviews: 224, education: "Boston University, Goldman School",
    desc: "Passionate about making children's dental visits fun and fear-free. Specialist in early orthodontic intervention.",
    photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=480&fit=crop&auto=format",
  },
];

export function Doctors() {
  const { t } = useTranslation();
  const { data: doctorList } = useSanityData<SanityDoctor[]>(DOCTORS_QUERY, doctors);
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const filtered = activeSpecialty === "All" ? doctorList : doctorList.filter((d) => d.specialty === activeSpecialty);

  return (
    <div>
      {/* Header — navy */}
      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[#B5C7EB] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("doctors.header.badge")}</span>
          </div>
          <h1 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            {t("doctors.header.title")}
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            {t("doctors.header.desc")}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-[#0F1932] border-t border-white/8 sticky top-18 z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-2 justify-center">
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSpecialty(s)}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeSpecialty === s
                  ? "bg-[#B5C7EB] text-[#0F1932]"
                  : "bg-white/8 border border-white/10 text-white/65 hover:bg-[#B5C7EB]/20 hover:text-[#B5C7EB]"
              }`}
              style={{ fontWeight: activeSpecialty === s ? 600 : 400 }}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Doctors grid */}
      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((doc) => (
              <div key={doc.name} className="group bg-white rounded-2xl overflow-hidden border border-[#0F1932]/8 hover:shadow-xl hover:border-[#B5C7EB]/40 transition-all duration-300">
                <div className="relative overflow-hidden bg-[#eef1f8] h-64">
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Sage specialty badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F1932]/80 to-transparent p-5">
                    <div className="inline-block bg-[#B5C7EB] text-[#0F1932] text-xs px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                      {doc.specialty}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#B5C7EB] text-[#B5C7EB]" />
                    <span className="text-xs text-[#0F1932]" style={{ fontWeight: 700 }}>{doc.rating}</span>
                    <span className="text-xs text-[#5B6475]">({doc.reviews})</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-[#0F1932] mb-0.5" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>
                    {doc.name}
                  </h3>
                  <p className="text-[#5B6475] text-sm mb-4">{doc.title}</p>

                  <div className="flex items-center gap-5 mb-4 py-3 border-y border-[#0F1932]/8">
                    <div className="flex items-center gap-1.5 text-xs text-[#5B6475]">
                      <Stethoscope className="w-3.5 h-3.5 text-[#B5C7EB]" />
                      {doc.experience}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#5B6475]">
                      <GraduationCap className="w-3.5 h-3.5 text-[#B5C7EB]" />
                      {doc.education.split(",")[0]}
                    </div>
                  </div>

                  <p className="text-[#5B6475] text-sm leading-relaxed mb-5">{doc.desc}</p>

                  <NavLink
                    to="/contact"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0F1932] text-white rounded-xl text-sm hover:bg-[#B5C7EB] hover:text-[#0F1932] transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    {t("doctors.card.bookAppointment")} <ArrowRight className="w-4 h-4" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
