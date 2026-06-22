import logoImg from "../../imports/matikyan-clinic-logo-am.png";

function NavbarShell({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between px-8 h-18 rounded-2xl shadow-md ${
        dark ? "bg-[#0F1932]" : "bg-white border border-[#0F1932]/10"
      }`}
    >
      {/* Logo slot */}
      <div className="flex items-center">{children}</div>

      {/* Fake nav links */}
      <div className={`hidden md:flex items-center gap-5 text-sm ${dark ? "text-white/50" : "text-[#5B6475]"}`}>
        {["About", "Doctors", "Services", "Reviews", "Contact"].map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>

      {/* Fake CTA */}
      <div
        className={`text-sm px-5 py-2.5 rounded-xl ${
          dark ? "bg-[#B5C7EB] text-[#0F1932]" : "bg-[#0F1932] text-white"
        }`}
        style={{ fontWeight: 600 }}
      >
        Book Appointment
      </div>
    </div>
  );
}

/* ── Option A: Logo only, no container ── */
function OptionA() {
  return (
    <NavbarShell>
      <img
        src={logoImg}
        alt="Logo"
        className="h-10 w-auto object-contain"
        style={{ filter: "brightness(0) saturate(100%) invert(9%) sepia(40%) saturate(800%) hue-rotate(194deg) brightness(95%)" }}
      />
    </NavbarShell>
  );
}

/* ── Option B: Logo icon pill + Matikyan wordmark ── */
function OptionB() {
  return (
    <NavbarShell>
      <div className="flex items-center gap-3">
        <div className="bg-[#0F1932] rounded-xl px-2.5 py-2 flex items-center justify-center">
          <img src={logoImg} alt="Logo" className="h-8 w-auto object-contain" />
        </div>
        <div className="flex flex-col leading-none">
          <span
            className="text-[#0F1932]"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 800 }}
          >
            Matikyan
          </span>
          <span
            className="text-[#B5C7EB] tracking-widest"
            style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em" }}
          >
            CLINIC
          </span>
        </div>
      </div>
    </NavbarShell>
  );
}

/* ── Option C: Logo in sage ring badge ── */
function OptionC() {
  return (
    <NavbarShell>
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center rounded-full bg-[#0F1932]"
          style={{
            width: 48,
            height: 48,
            boxShadow: "0 0 0 3px #B5C7EB",
          }}
        >
          <img src={logoImg} alt="Logo" className="h-7 w-auto object-contain" />
        </div>
        <div className="flex flex-col leading-none">
          <span
            className="text-[#0F1932]"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 800 }}
          >
            Matikyan
          </span>
          <span
            className="text-[#5B6475] tracking-widest"
            style={{ fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.12em" }}
          >
            STOMATOLOGY
          </span>
        </div>
      </div>
    </NavbarShell>
  );
}

/* ── Option D: Full dark navbar — white logo shows naturally ── */
function OptionD() {
  return (
    <NavbarShell dark>
      <div className="flex items-center gap-3">
        <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain" />
        <div className="w-px h-7 bg-white/15" />
        <div className="flex flex-col leading-none">
          <span
            className="text-white"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700 }}
          >
            Matikyan
          </span>
          <span
            className="text-[#B5C7EB] tracking-widest"
            style={{ fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em" }}
          >
            STOMATOLOGY
          </span>
        </div>
      </div>
    </NavbarShell>
  );
}

export function LogoPreview() {
  const options = [
    {
      id: "A",
      label: "Option A — Logo only",
      desc: "Just the logo, no container. CSS filter makes it navy on the white navbar.",
      component: <OptionA />,
    },
    {
      id: "B",
      label: "Option B — Logo + Wordmark",
      desc: "Navy pill icon beside 'Matikyan' in bold with sage 'CLINIC' label.",
      component: <OptionB />,
    },
    {
      id: "C",
      label: "Option C — Sage Ring Badge",
      desc: "Logo in circular navy badge outlined with a sage ring. Badge beside full clinic name.",
      component: <OptionC />,
    },
    {
      id: "D",
      label: "Option D — Dark Navbar",
      desc: "Full navy navbar so the white logo shows naturally. Sage accents throughout.",
      component: <OptionD />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7FAFC] py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#0F1932] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>
              Logo Options
            </span>
          </div>
          <h1
            className="text-[#0F1932]"
            style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 800 }}
          >
            Choose Your Logo Style
          </h1>
          <p className="text-[#5B6475] mt-3">Each option shown as it appears in the real navbar.</p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-10">
          {options.map((opt) => (
            <div key={opt.id}>
              {/* Label */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-8 h-8 rounded-full bg-[#0F1932] flex items-center justify-center text-white text-sm shrink-0"
                  style={{ fontWeight: 800 }}
                >
                  {opt.id}
                </div>
                <div>
                  <div className="text-[#0F1932] text-sm" style={{ fontWeight: 700 }}>{opt.label}</div>
                  <div className="text-[#5B6475] text-xs">{opt.desc}</div>
                </div>
              </div>
              {/* Navbar preview */}
              {opt.component}
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-[#5B6475] text-sm mt-12">
          Tell me which option you prefer and it will be applied to the whole site.
        </p>
      </div>
    </div>
  );
}
