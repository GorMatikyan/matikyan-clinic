import { useMemo, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LocalizedNavLink } from "../routing";
import { PageHero } from "../components/PageHero";

const categoryKeys = ["general", "treatments", "orthodontics", "payment"] as const;

const questionsData: Record<string, Array<{ q: string; a: string }>> = {
  general: [
    { q: "How often should I visit the dentist?", a: "We recommend visiting every 6 months for a routine check-up and professional cleaning. However, patients with gum disease, a history of cavities, or orthodontic appliances may need to come in more frequently — typically every 3–4 months." },
    { q: "What should I bring to my first appointment?", a: "Please bring a valid photo ID, your insurance card (if applicable), any previous dental X-rays taken in the last 2 years, and a list of any medications you are currently taking. Arriving 10 minutes early to complete your intake form is helpful." },
    { q: "Do you accept walk-ins?", a: "We accommodate dental emergencies on a same-day basis. For all other treatments, we recommend booking in advance to secure your preferred time with your chosen specialist." },
  ],
  treatments: [
    { q: "Is teeth whitening safe?", a: "Yes. Professional in-office whitening is completely safe when performed by a qualified dentist. Our whitening gel is hydrogen-peroxide based and carefully formulated to minimize sensitivity. We always conduct a pre-treatment assessment to ensure your enamel and gums are healthy enough for the procedure." },
    { q: "How long do dental implants last?", a: "With proper care and maintenance, dental implants can last a lifetime. The titanium post is permanent; the crown on top typically lasts 15–25 years before needing replacement due to normal wear. Regular brushing, flossing, and biannual check-ups are key to implant longevity." },
    { q: "Are veneers reversible?", a: "Traditional porcelain veneers require a small amount of enamel removal and are therefore considered irreversible. However, ultra-thin 'no-prep' veneers exist in some cases. During your consultation, Dr. Marchetti will discuss all options and help you decide what's best for your situation." },
    { q: "How painful is a root canal?", a: "Modern root canal therapy is no more uncomfortable than getting a filling. We use advanced local anesthesia and, where appropriate, sedation dentistry to ensure you feel nothing during the procedure. Most patients are surprised by how routine the experience is." },
  ],
  orthodontics: [
    { q: "Am I a candidate for Invisalign?", a: "Invisalign can treat mild to moderate crowding, spacing, and bite issues in both adults and teenagers. Severe malocclusions may still require traditional braces. The best way to determine candidacy is with a free consultation — Dr. Reid can show you a 3D simulation of your expected results." },
    { q: "How long does Invisalign treatment take?", a: "Treatment time varies from 6 to 24 months depending on complexity. The average full-arch case at DentaCare takes 12–14 months. Minor corrections can sometimes be completed in as little as 6 months." },
  ],
  payment: [
    { q: "Do you accept dental insurance?", a: "Yes. We are in-network with most major dental insurance providers including Delta Dental, Cigna, Aetna, MetLife, and United Concordia. Our billing team will verify your coverage before your appointment and explain any out-of-pocket costs clearly." },
    { q: "Do you offer payment plans?", a: "We offer flexible 0% interest financing through CareCredit and Lending Club for up to 24 months on treatments over $500. We also accept all major credit cards, HSA, and FSA funds." },
    { q: "What is the cost of a consultation?", a: "Initial consultations at DentaCare are completely free of charge. This includes a full oral examination and a personalized treatment plan. X-rays, if required, are billed separately but are typically covered by insurance." },
  ],
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#0F1932]/8 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 py-5 text-left group">
        <span className="text-[#0F1932] text-sm leading-relaxed group-hover:text-[#B5C7EB] transition-colors" style={{ fontWeight: 500 }}>{q}</span>
        <ChevronDown className={`w-5 h-5 text-[#5B6475] shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-[#B5C7EB]" : ""}`} />
      </button>
      {open && <div className="pb-5"><p className="text-[#5B6475] text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

export function FAQ() {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState<typeof categoryKeys[number]>("general");
  const faqData = useMemo(() => {
    return Object.fromEntries(
      categoryKeys.map((key) => [
        key,
        questionsData[key].map((item, index) => ({
          q: t(`faq.items.${key}.${index}.q`, { defaultValue: item.q }),
          a: t(`faq.items.${key}.${index}.a`, { defaultValue: item.a }),
        })),
      ]),
    ) as typeof questionsData;
  }, [t]);

  return (
    <div>
      <PageHero
        eyebrow={t("faq.header.badge")}
        title={t("faq.header.title")}
        description={t("faq.header.desc")}
        primaryAction={{ label: t("faq.cta.button"), to: "/contact" }}
      />

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[220px_1fr] gap-10">
          <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
            {categoryKeys.map((key) => {
              const questions = faqData[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  className={`px-4 py-3 rounded-xl text-sm text-left transition-colors ${
                    activeKey === key
                      ? "bg-[#0F1932] text-white"
                      : "bg-white border border-[#0F1932]/8 text-[#5B6475] hover:text-[#0F1932] hover:border-[#B5C7EB]/40 hover:bg-[#B5C7EB]/8"
                  }`}
                  style={{ fontWeight: activeKey === key ? 600 : 400 }}
                >
                  {t(`faq.categories.${key}`)}
                  <span className={`ml-2 ${activeKey === key ? "text-[#B5C7EB]" : "opacity-50"}`}>({questions.length})</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-[#0F1932]/8 p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#0F1932]/8">
              <div className="w-2 h-8 rounded-full bg-[#B5C7EB]" />
              <h2 className="text-[#0F1932]" style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700 }}>
                {t(`faq.categories.${activeKey}`)}
              </h2>
            </div>
            <div>
              {faqData[activeKey].map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 800 }}>
            {t("faq.cta.title")}
          </h2>
          <p className="text-white/55 mb-8">{t("faq.cta.desc")}</p>
          <LocalizedNavLink to="/contact" className="inline-flex items-center gap-2 px-7 py-4 bg-[#B5C7EB] text-[#0F1932] rounded-xl hover:bg-[#B5C7EB]/90 transition-colors" style={{ fontWeight: 600 }}>
            {t("faq.cta.button")} <ArrowRight className="w-4 h-4" />
          </LocalizedNavLink>
        </div>
      </section>
    </div>
  );
}
