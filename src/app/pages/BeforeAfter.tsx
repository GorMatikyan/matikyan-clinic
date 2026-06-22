import { useState } from "react";

const categories = ["All", "Veneers", "Whitening", "Implants", "Orthodontics", "Composite"];

const cases = [
  {
    category: "Veneers", title: "Full Smile Makeover", doctor: "Dr. Marchetti", duration: "3 weeks",
    desc: "10 porcelain veneers transforming severely discolored and chipped teeth into a naturally radiant smile.",
    before: "https://images.unsplash.com/photo-1588776814546-1ffbb172601e?w=500&h=380&fit=crop&auto=format&sat=-80&con=-20",
    after: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500&h=380&fit=crop&auto=format",
  },
  {
    category: "Whitening", title: "Professional Whitening", doctor: "Dr. Kovalenko", duration: "1 session",
    desc: "In-office laser whitening achieving 8 shades of improvement in a single 90-minute appointment.",
    before: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=380&fit=crop&auto=format&sat=-60",
    after: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=380&fit=crop&auto=format",
  },
  {
    category: "Implants", title: "Single Tooth Implant", doctor: "Dr. Kovalenko", duration: "4 months",
    desc: "Titanium implant with ceramic crown restoring a missing front tooth to full function and aesthetics.",
    before: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=380&fit=crop&auto=format&sat=-50",
    after: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=380&fit=crop&auto=format",
  },
  {
    category: "Orthodontics", title: "Invisalign Treatment", doctor: "Dr. Reid", duration: "14 months",
    desc: "Clear aligner therapy correcting crowding and spacing across the full arch with 42 aligners.",
    before: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&h=380&fit=crop&auto=format&sat=-40",
    after: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500&h=380&fit=crop&auto=format",
  },
  {
    category: "Composite", title: "Composite Bonding", doctor: "Dr. Marchetti", duration: "1 day",
    desc: "Direct composite resin bonding to close diastema and reshape irregular anterior teeth.",
    before: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=380&fit=crop&auto=format&sat=-30",
    after: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&h=380&fit=crop&auto=format",
  },
  {
    category: "Implants", title: "All-on-4 Full Arch", doctor: "Dr. Kovalenko", duration: "1 day surgery",
    desc: "Full-arch implant-supported prosthesis replacing all upper teeth in a single surgical session.",
    before: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=500&h=380&fit=crop&auto=format&sat=-50",
    after: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=380&fit=crop&auto=format",
  },
];

function CaseCard({ c }: { c: (typeof cases)[0] }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#0F1932]/8 hover:shadow-lg hover:border-[#B5C7EB]/40 transition-all duration-300">
      <div className="relative h-64 overflow-hidden bg-[#eef1f8]">
        <img
          src={showAfter ? c.after : c.before}
          alt={showAfter ? "After" : "Before"}
          className="w-full h-full object-cover transition-all duration-500"
        />
        {/* Toggle buttons */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              !showAfter ? "bg-[#0F1932] text-white" : "bg-white/90 text-[#0F1932]"
            }`}
            style={{ fontWeight: !showAfter ? 600 : 400 }}
          >
            Before
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              showAfter ? "bg-[#B5C7EB] text-[#0F1932]" : "bg-white/90 text-[#0F1932]"
            }`}
            style={{ fontWeight: showAfter ? 600 : 400 }}
          >
            After
          </button>
        </div>
        <div className="absolute bottom-4 right-4 bg-[#0F1932]/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full" style={{ fontWeight: 500 }}>
          {c.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-[#0F1932] mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700 }}>
          {c.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-[#5B6475] mb-3">
          <span className="text-[#B5C7EB]" style={{ fontWeight: 600 }}>{c.doctor}</span>
          <span>·</span>
          <span>{c.duration}</span>
        </div>
        <p className="text-[#5B6475] text-sm leading-relaxed">{c.desc}</p>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? cases : cases.filter((c) => c.category === active);

  return (
    <div>
      {/* Header — navy */}
      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[#B5C7EB] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>Real Results</span>
          </div>
          <h1 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            Before & After Gallery
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            Real transformations from real patients. Click each case to toggle between before and after.
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

      {/* Gallery */}
      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((c, i) => <CaseCard key={i} c={c} />)}
          </div>
        </div>
      </section>

      {/* Disclaimer — sage */}
      <section className="pb-16 bg-[#F7FAFC]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-[#B5C7EB]/15 border border-[#B5C7EB]/30 rounded-2xl p-6 text-center">
            <p className="text-[#0F1932]/70 text-sm leading-relaxed">
              <span className="text-[#0F1932]" style={{ fontWeight: 600 }}>Results Disclaimer:</span> Individual results may vary. All before/after photos are from real DentaCare patients who have provided written consent. Treatment outcomes depend on individual patient factors and oral health conditions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
