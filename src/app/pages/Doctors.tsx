import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LocalizedNavLink } from "../routing";

import doctorAlexanArshamyan from "../../../images/doctors/doctor-aleksan-arshamyan.jpg";
import doctorAramMuradyan from "../../../images/doctors/doctor-aram-muradyan.jpg";
import doctorArtakAdamyan from "../../../images/doctors/doctor-artak-adamyan.jpg";
import doctorArturGalstyan from "../../../images/doctors/doctor-artur-galstyan.jpg";
import doctorGagikYeghiazaryan from "../../../images/doctors/doctor-gagik-yeghiazaryan.jpg";
import doctorZhannaSafaryan from "../../../images/doctors/doctor-zhanna-safaryan.jpg";
import doctorHasmikRushanyan from "../../../images/doctors/doctor-hasmik-rushanyan.jpg";
import doctorHovhannesRapyan from "../../../images/doctors/doctor-hovhannes-rapyan.jpg";
import doctorKaroMatikyan from "../../../images/doctors/doctor-karo-matikyan.jpg";
import doctorMartinYezoyan from "../../../images/doctors/doctor-martin-yezoyan.jpg";
import doctorNarekMatikyan from "../../../images/doctors/doctor-narek-matikyan.jpg";

const doctors = [
  { name: "Գագիկ Եղիազարյան", photo: doctorGagikYeghiazaryan },
  { name: "Ժաննա Սաֆարյան", photo: doctorZhannaSafaryan },
  { name: "Նարեկ Մատիկյան", photo: doctorNarekMatikyan },
  { name: "Արամ Մուրադյան", photo: doctorAramMuradyan },
  { name: "Արտակ Ադամյան", photo: doctorArtakAdamyan },
  { name: "Հասմիկ Ռուշանյան", photo: doctorHasmikRushanyan },
  { name: "Մարտին Եզոյան", photo: doctorMartinYezoyan },
  { name: "Արթուր Գալստյան", photo: doctorArturGalstyan },
  { name: "Ալեքսան Արշամյան", photo: doctorAlexanArshamyan },
  { name: "Հովհաննես Ռափյան", photo: doctorHovhannesRapyan },
] as const;

export function Doctors() {
  const { t } = useTranslation();

  return (
    <div>
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
          <p className="text-[#B5C7EB] text-sm max-w-2xl mx-auto mt-4">
            {t("doctors.header.founder")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <h2 className="text-[#0F1932] mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800 }}>
              {t("doctors.intro.title")}
            </h2>
            <p className="text-[#5B6475] leading-relaxed">
              {t("doctors.intro.desc")}
            </p>
          </div>

          <div className="mb-12 rounded-3xl overflow-hidden border border-[#B5C7EB]/40 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1.05fr_1.4fr] items-stretch">
              <div className="bg-[#eef1f8] min-h-[320px]">
                <img
                  src={doctorKaroMatikyan}
                  alt={t("doctors.card.photoAlt", { name: "Կարո Մատիկյան" })}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/20 rounded-full px-4 py-1.5 mb-5 w-fit">
                  <span className="text-[#0F1932] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>
                    {t("doctors.founder.badge")}
                  </span>
                </div>
                <h3 className="text-[#0F1932] mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800 }}>
                  {t("doctors.founder.name")}
                </h3>
                <p className="text-[#0F1932]/80 mb-2" style={{ fontWeight: 600 }}>
                  {t("doctors.founder.title")}
                </p>
                <p className="text-[#5B6475] leading-relaxed mb-6">
                  {t("doctors.founder.desc")}
                </p>
                <LocalizedNavLink
                  to="/contact"
                  aria-label={t("doctors.card.bookDoctor", { name: t("doctors.founder.name") })}
                  className="w-fit flex items-center justify-center gap-2 px-5 py-3 bg-[#0F1932] text-white rounded-xl text-sm hover:bg-[#B5C7EB] hover:text-[#0F1932] transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  {t("doctors.card.bookAppointment")} <ArrowRight className="w-4 h-4" />
                </LocalizedNavLink>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {doctors.map((doc) => (
              <div key={doc.name} className="group bg-white rounded-2xl overflow-hidden border border-[#0F1932]/8 hover:shadow-xl hover:border-[#B5C7EB]/40 transition-all duration-300">
                <div className="relative overflow-hidden bg-[#eef1f8] h-80">
                  <img
                    src={doc.photo}
                    alt={t("doctors.card.photoAlt", { name: doc.name })}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-[#0F1932] mb-5 text-center" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>
                    {doc.name}
                  </h3>

                  <LocalizedNavLink
                    to="/contact"
                    aria-label={t("doctors.card.bookDoctor", { name: doc.name })}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0F1932] text-white rounded-xl text-sm hover:bg-[#B5C7EB] hover:text-[#0F1932] transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    {t("doctors.card.bookAppointment")} <ArrowRight className="w-4 h-4" />
                  </LocalizedNavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
