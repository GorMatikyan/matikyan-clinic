import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", doctor: "", service: "", message: "", preferredDate: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const serviceOptions = ["implants", "ortho", "whitening", "veneers", "rootCanal", "perio", "checkup", "pediatric", "cosmetic", "other"] as const;
  const doctorOptions = [
    { value: "annaKovalenko", nameKey: "annaKovalenko", specialtyKey: "implantology" },
    { value: "marcusReid", nameKey: "marcusReid", specialtyKey: "orthodontics" },
    { value: "sofiaMarchetti", nameKey: "sofiaMarchetti", specialtyKey: "cosmetic" },
    { value: "ethanBrooks", nameKey: "ethanBrooks", specialtyKey: "periodontics" },
    { value: "nadiaOkonkwo", nameKey: "nadiaOkonkwo", specialtyKey: "endodontics" },
    { value: "liamChen", nameKey: "liamChen", specialtyKey: "pediatric" },
  ];

  return (
    <div>
      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[#B5C7EB] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("contact.header.badge")}</span>
          </div>
          <h1 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            {t("contact.header.title")}
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">{t("contact.header.desc")}</p>
        </div>
      </section>

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="bg-white rounded-2xl border border-[#0F1932]/8 p-8 lg:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#B5C7EB]/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#0F1932]" />
                </div>
                <h2 className="text-[#0F1932] mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 800 }}>
                  {t("contact.success.title")}
                </h2>
                <p className="text-[#5B6475] leading-relaxed max-w-md">
                  {t("contact.success.desc", { name: form.firstName })}
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-8 px-6 py-3 bg-[#0F1932] text-white rounded-xl text-sm hover:bg-[#0F1932]/90 transition-colors" style={{ fontWeight: 500 }}>
                  {t("contact.success.another")}
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-8 rounded-full bg-[#B5C7EB]" />
                  <h2 className="text-[#0F1932]" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 800 }}>
                    {t("contact.form.title")}
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[#0F1932] text-sm mb-1.5 block" style={{ fontWeight: 500 }}>{t("contact.form.firstName")}</label>
                      <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder={t("contact.form.firstNamePlaceholder")}
                        className="w-full bg-[#F7FAFC] border border-[#0F1932]/10 rounded-xl px-4 py-3 text-sm text-[#0F1932] placeholder:text-[#5B6475]/50 focus:outline-none focus:border-[#B5C7EB] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[#0F1932] text-sm mb-1.5 block" style={{ fontWeight: 500 }}>{t("contact.form.lastName")}</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder={t("contact.form.lastNamePlaceholder")}
                        className="w-full bg-[#F7FAFC] border border-[#0F1932]/10 rounded-xl px-4 py-3 text-sm text-[#0F1932] placeholder:text-[#5B6475]/50 focus:outline-none focus:border-[#B5C7EB] transition-colors" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[#0F1932] text-sm mb-1.5 block" style={{ fontWeight: 500 }}>{t("contact.form.email")}</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t("contact.form.emailPlaceholder")}
                        className="w-full bg-[#F7FAFC] border border-[#0F1932]/10 rounded-xl px-4 py-3 text-sm text-[#0F1932] placeholder:text-[#5B6475]/50 focus:outline-none focus:border-[#B5C7EB] transition-colors" />
                    </div>
                    <div>
                      <label className="text-[#0F1932] text-sm mb-1.5 block" style={{ fontWeight: 500 }}>{t("contact.form.phone")}</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t("contact.form.phonePlaceholder")}
                        className="w-full bg-[#F7FAFC] border border-[#0F1932]/10 rounded-xl px-4 py-3 text-sm text-[#0F1932] placeholder:text-[#5B6475]/50 focus:outline-none focus:border-[#B5C7EB] transition-colors" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[#0F1932] text-sm mb-1.5 block" style={{ fontWeight: 500 }}>{t("contact.form.service")}</label>
                      <select name="service" value={form.service} onChange={handleChange} required
                        className="w-full bg-[#F7FAFC] border border-[#0F1932]/10 rounded-xl px-4 py-3 text-sm text-[#0F1932] focus:outline-none focus:border-[#B5C7EB] transition-colors appearance-none">
                        <option value="">{t("contact.form.servicePlaceholder")}</option>
                        {serviceOptions.map((key) => (
                          <option key={key} value={key}>{t(`contact.form.services.${key}`)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-[#0F1932] text-sm mb-1.5 block" style={{ fontWeight: 500 }}>{t("contact.form.doctor")}</label>
                      <select name="doctor" value={form.doctor} onChange={handleChange}
                        className="w-full bg-[#F7FAFC] border border-[#0F1932]/10 rounded-xl px-4 py-3 text-sm text-[#0F1932] focus:outline-none focus:border-[#B5C7EB] transition-colors appearance-none">
                        <option value="">{t("contact.form.doctorPlaceholder")}</option>
                        {doctorOptions.map((d) => (
                          <option key={d.value} value={d.value}>
                            {t(`doctors.items.${d.nameKey}.name`)} - {t(`doctors.filter.${d.specialtyKey}`)}
                          </option>
                        ))}
                        <option value="none">{t("contact.form.noPreference")}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[#0F1932] text-sm mb-1.5 block" style={{ fontWeight: 500 }}>{t("contact.form.date")}</label>
                    <input type="date" name="preferredDate" value={form.preferredDate} onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-[#F7FAFC] border border-[#0F1932]/10 rounded-xl px-4 py-3 text-sm text-[#0F1932] focus:outline-none focus:border-[#B5C7EB] transition-colors" />
                  </div>

                  <div>
                    <label className="text-[#0F1932] text-sm mb-1.5 block" style={{ fontWeight: 500 }}>{t("contact.form.message")}</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                      placeholder={t("contact.form.messagePlaceholder")}
                      className="w-full bg-[#F7FAFC] border border-[#0F1932]/10 rounded-xl px-4 py-3 text-sm text-[#0F1932] placeholder:text-[#5B6475]/50 focus:outline-none focus:border-[#B5C7EB] transition-colors resize-none" />
                  </div>

                  <button type="submit" className="w-full py-4 bg-[#0F1932] text-white rounded-xl hover:bg-[#0F1932]/90 transition-colors" style={{ fontWeight: 600 }}>
                    {t("contact.form.submit")}
                  </button>
                  <p className="text-xs text-[#5B6475] text-center">{t("contact.form.disclaimer")}</p>
                </form>
              </>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-[#0F1932] rounded-2xl p-7 text-white">
              <h3 className="text-white mb-5 flex items-center gap-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>
                <span className="w-2 h-6 rounded-full bg-[#B5C7EB] inline-block" />
                {t("contact.info.title")}
              </h3>
              <div className="flex flex-col gap-5">
                {[
                  { Icon: MapPin, labelKey: "contact.info.address", contentKey: "contact.info.addressValue", hrefKey: null },
                  { Icon: Phone, labelKey: "contact.info.phone", contentKey: "nav.phone", hrefKey: "tel:+18005551234" },
                  { Icon: Mail, labelKey: "contact.info.email", contentKey: "contact.info.emailValue", hrefKey: "mailto:hello@dentacare.com" },
                ].map(({ Icon, labelKey, contentKey, hrefKey }) => (
                  <div key={labelKey} className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-[#B5C7EB]/15 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#B5C7EB]" />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-0.5">{t(labelKey)}</div>
                      {hrefKey ? (
                        <a href={hrefKey} aria-label={t(labelKey)} className="text-sm text-white hover:text-[#B5C7EB] transition-colors whitespace-pre-line">{t(contentKey)}</a>
                      ) : (
                        <span className="text-sm text-white/80 whitespace-pre-line">{t(contentKey)}</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#B5C7EB]/15 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#B5C7EB]" />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs mb-1">{t("contact.info.hours")}</div>
                    <div className="text-sm text-white/80 space-y-0.5">
                      <div>{t("contact.info.hours1")}</div>
                      <div>{t("contact.info.hours2")}</div>
                      <div>{t("contact.info.hours3")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#0F1932]/8 bg-[#B5C7EB]/10 h-44 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-[#0F1932]/30 mx-auto mb-2" />
                <p className="text-[#0F1932]/50 text-sm">{t("contact.info.mapPlaceholder")}</p>
              </div>
            </div>

            <div className="bg-[#B5C7EB] rounded-2xl p-6 text-center">
              <div className="text-[#0F1932] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800 }}>
                {t("contact.emergency.title")}
              </div>
              <p className="text-[#0F1932]/70 text-sm mb-4">{t("contact.emergency.desc")}</p>
              <a href="tel:+18005551234" aria-label={t("contact.emergency.callAria")} className="inline-flex items-center gap-2 px-5 py-3 bg-[#0F1932] text-white rounded-xl text-sm hover:bg-[#0F1932]/90 transition-colors" style={{ fontWeight: 600 }}>
                <Phone className="w-4 h-4" />
                {t("contact.emergency.button")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
