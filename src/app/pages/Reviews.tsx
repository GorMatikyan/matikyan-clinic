import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
const GOOGLE_VIEW_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Matikyan%20Dental%20Clinic%2C%205%20Aram%20Khachatryan%20St%2C%20Yerevan";
const GOOGLE_LEAVE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJExZLM0-9akAR5hTveAafjSA";
const YANDEX_VIEW_REVIEWS_URL = "https://yandex.com/maps/org/matikyan_dental_and_contemporary_implantology_clinic/43591875663/reviews/";
const YANDEX_LEAVE_REVIEW_URL = "https://yandex.com/maps/org/matikyan_dental_and_contemporary_implantology_clinic/43591875663/";

export function Reviews() {
  const { t } = useTranslation();
  const actions = [
    { href: GOOGLE_VIEW_REVIEWS_URL, title: t("reviews.actions.googleView.title"), desc: t("reviews.actions.googleView.desc") },
    { href: GOOGLE_LEAVE_REVIEW_URL, title: t("reviews.actions.googleLeave.title"), desc: t("reviews.actions.googleLeave.desc") },
    { href: YANDEX_VIEW_REVIEWS_URL, title: t("reviews.actions.yandexView.title"), desc: t("reviews.actions.yandexView.desc") },
    { href: YANDEX_LEAVE_REVIEW_URL, title: t("reviews.actions.yandexLeave.title"), desc: t("reviews.actions.yandexLeave.desc") },
  ];

  return (
    <div>
      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[#B5C7EB] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("reviews.header.badge")}</span>
          </div>
          <h1 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            {t("reviews.header.title")}
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">{t("reviews.header.desc")}</p>
        </div>
      </section>

      <section className="py-16 pb-24 bg-[#F7FAFC]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-[#0F1932] mb-3" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800 }}>
              {t("reviews.intro.title")}
            </h2>
            <p className="text-[#5B6475] max-w-2xl mx-auto leading-relaxed">
              {t("reviews.intro.desc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {actions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl p-7 border bg-white border-[#0F1932]/8 hover:border-[#B5C7EB]/40 hover:shadow-md transition-all"
              >
                <div className="text-[#0F1932] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800 }}>
                  {action.title}
                </div>
                <p className="text-[#5B6475] text-sm leading-relaxed mb-5">{action.desc}</p>
                <div className="inline-flex items-center gap-2 text-[#0F1932] text-sm" style={{ fontWeight: 600 }}>
                  {t("reviews.openLink")} <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          <p className="text-center text-[#5B6475] text-sm mt-8">{t("reviews.note")}</p>
        </div>
      </section>
    </div>
  );
}
