import { useTranslation } from "react-i18next";

import doctorAlexanArshamyan from "../../../images/doctors/doctor-aleksan-arshamyan.webp";
import doctorAramMuradyan from "../../../images/doctors/doctor-aram-muradyan.webp";
import doctorArtakAdamyan from "../../../images/doctors/doctor-artak-adamyan.webp";
import doctorArturGalstyan from "../../../images/doctors/doctor-artur-galstyan.webp";
import doctorGagikYeghiazaryan from "../../../images/doctors/doctor-gagik-yeghiazaryan.webp";
import doctorZhannaSafaryan from "../../../images/doctors/doctor-zhanna-safaryan.webp";
import doctorHasmikRushanyan from "../../../images/doctors/doctor-hasmik-rushanyan.webp";
import doctorHovhannesRapyan from "../../../images/doctors/doctor-hovhannes-rapyan.webp";
import doctorKaroMatikyan from "../../../images/doctors/doctor-karo-matikyan.webp";
import doctorMartinYezoyan from "../../../images/doctors/doctor-martin-yezoyan.webp";
import doctorNarekMatikyan from "../../../images/doctors/doctor-narek-matikyan.webp";
import { LocalizedNavLink, useCurrentLanguage } from "../routing";

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
  const currentLanguage = useCurrentLanguage();
  const eyebrowTracking = currentLanguage === "hy" ? "tracking-[0.08em]" : "tracking-widest uppercase";

  return (
    <div>
      <section className="relative overflow-hidden bg-[#0F1932] pb-12 pt-[2rem] lg:pb-14 lg:pt-[2.5rem]">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,25,50,0.54)_0%,rgba(15,25,50,0)_34%),radial-gradient(circle_at_78%_32%,rgba(181,199,235,0.22)_0%,rgba(181,199,235,0.08)_30%,rgba(15,25,50,0)_58%),radial-gradient(circle_at_18%_82%,rgba(120,144,191,0.18)_0%,rgba(120,144,191,0)_48%)]" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/8 rounded-full px-3.5 py-1 mb-4 ring-1 ring-white/12">
                <span className={`text-[#B5C7EB] text-xs ${eyebrowTracking}`} style={{ fontWeight: 700 }}>{t("doctors.header.badge")}</span>
              </div>
              <h1 className="text-white mb-5 max-w-[600px]" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.05rem, 3.8vw, 3.35rem)", fontWeight: 800, lineHeight: 1.04 }}>
                {t("doctors.header.title")}
              </h1>
              <p className="text-white/68 text-lg max-w-[560px] leading-relaxed">
                {t("doctors.header.desc")}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <LocalizedNavLink
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-[#B5C7EB] px-6 py-3.5 text-[#0F1932] shadow-[0_16px_36px_rgba(0,0,0,0.18)] transition-colors hover:bg-white"
                  style={{ fontWeight: 700 }}
                >
                  {t("nav.bookAppointment")}
                </LocalizedNavLink>
                <span className="inline-flex items-center text-sm text-white/72" style={{ fontWeight: 600 }}>
                  <span className="mr-2 text-[#B5C7EB]" aria-hidden="true">✓</span>
                  {t("doctors.header.founder")}
                </span>
              </div>
            </div>

            <div className="relative min-h-[430px] sm:min-h-[500px] lg:min-h-[420px]" aria-hidden="true">
              <div className="absolute left-[14%] top-[10%] h-72 w-72 rounded-full bg-[#B5C7EB]/18 blur-3xl" />
              <div className="absolute right-[4%] bottom-[8%] h-56 w-56 rounded-full bg-white/14 blur-3xl" />

              <div className="absolute left-[2%] top-[9%] z-20 w-[39%] overflow-hidden rounded-[1.75rem] border-[5px] border-white/92 bg-[#eef1f8] shadow-[0_26px_70px_rgba(0,0,0,0.3)]">
                <img
                  src={doctorKaroMatikyan}
                  alt=""
                  className="h-[270px] w-full object-cover object-top brightness-[1.03] saturate-[0.96] sm:h-[320px] lg:h-[300px]"
                  loading="eager"
                />
              </div>

              <div className="absolute right-[16%] top-[0%] z-10 w-[28%] overflow-hidden rounded-[1.5rem] border-[5px] border-white/92 bg-[#eef1f8] shadow-[0_18px_48px_rgba(0,0,0,0.24)]">
                <img
                  src={doctorGagikYeghiazaryan}
                  alt=""
                  className="h-[185px] w-full object-cover object-top brightness-[1.03] saturate-[0.96] sm:h-[225px] lg:h-[205px]"
                  loading="eager"
                />
              </div>

              <div className="absolute right-[1%] bottom-[7%] z-30 w-[35%] overflow-hidden rounded-[1.6rem] border-[5px] border-white/92 bg-[#eef1f8] shadow-[0_24px_62px_rgba(0,0,0,0.28)]">
                <img
                  src={doctorZhannaSafaryan}
                  alt=""
                  className="h-[230px] w-full object-cover object-top brightness-[1.03] saturate-[0.96] sm:h-[275px] lg:h-[255px]"
                  loading="eager"
                />
              </div>

              <div className="absolute left-[33%] bottom-[0%] z-40 w-[32%] overflow-hidden rounded-[1.5rem] border-[5px] border-white/92 bg-[#eef1f8] shadow-[0_20px_54px_rgba(0,0,0,0.26)]">
                <img
                  src={doctorNarekMatikyan}
                  alt=""
                  className="h-[205px] w-full object-contain object-top brightness-[1.03] saturate-[0.96] sm:h-[250px] lg:h-[230px]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
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
                  <h3 className="text-[#0F1932] text-center" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>
                    {doc.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
