import { useEffect, useState } from "react";
import { Phone, Globe, MapPin, Clock, Facebook, Instagram, Youtube, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import logoImg from "../../imports/matikyan-clinic-logo-am.png";
import { getServiceSlugByTitle } from "../serviceData";
import { LocalizedNavLink } from "../routing";
import { fetchPublishedBlogPosts, type CmsBlogPost } from "../../lib/cmsApi";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { parseSocialLinks, type SocialPlatform } from "../../lib/socialLinks";

const DEFAULT_PHONE = "+37410210122";

const FALLBACK_SOCIAL_LINKS = [
  { url: "https://www.facebook.com/share/1LLcyQvwvZ/?mibextid=wwXIfr", platform: "facebook" as const },
  { url: "https://www.instagram.com/matikyandentalclinic?igsh=MTNtbGl1eW04M25ucA==", platform: "instagram" as const },
  { url: "https://www.youtube.com/@MatikyanDentalClinic", platform: "youtube" as const },
];

const socialIcons: Record<SocialPlatform, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  other: Share2,
};

export function Footer() {
  const { t } = useTranslation();
  const [latestPosts, setLatestPosts] = useState<CmsBlogPost[]>([]);
  const settings = useSiteSettings();

  useEffect(() => {
    fetchPublishedBlogPosts().then((posts) => setLatestPosts(posts.slice(0, 3)));
  }, []);

  const phone = settings?.phoneNumber ?? DEFAULT_PHONE;
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
  const address = settings?.address ?? t("footer.address");

  const socialLinkEntries = parseSocialLinks(settings?.socialLinksJson);
  const socialLinks = (socialLinkEntries.length > 0 ? socialLinkEntries : FALLBACK_SOCIAL_LINKS).map(({ url, platform }) => ({
    href: url,
    label: t(`footer.social.${platform === "other" ? "share" : platform}`, { defaultValue: "Social" }),
    ariaLabel: t(`footer.social.${platform === "other" ? "share" : platform}Aria`, { defaultValue: "Social link" }),
    Icon: socialIcons[platform],
  }));

  const navLinks = [
    { key: "footer.about", path: "/about" },
    { key: "footer.ourDoctors", path: "/doctors" },
    { key: "footer.services", path: "/services" },
    { key: "nav.warranty", path: "/warranty" },
    { key: "nav.dentalTourism", path: "/dental-tourism" },
    { key: "nav.faq", path: "/faq" },
    { key: "nav.blog", path: "/blog" },
    { key: "footer.contact", path: "/contact" },
  ] as const;

  const serviceLinks = [
    { key: "footer.servicesList.whitening", path: getServiceSlugByTitle("Teeth Whitening") },
    { key: "footer.servicesList.implants", path: getServiceSlugByTitle("Dental Implants") },
    { key: "footer.servicesList.orthodontics", path: getServiceSlugByTitle("Orthodontics") },
    { key: "footer.servicesList.veneers", path: getServiceSlugByTitle("Dental Veneers & Aesthetic Restorations") },
    { key: "footer.servicesList.rootCanal", path: getServiceSlugByTitle("Endodontic Treatment") },
    { key: "footer.servicesList.pediatric", path: getServiceSlugByTitle("Diagnostics & Digital Dentistry") },
    { key: "footer.servicesList.cosmetic", path: getServiceSlugByTitle("Dental Veneers & Aesthetic Restorations") },
  ] as const;

  return (
    <footer className="bg-[#0F1932] text-white">
      <div className="h-1 bg-[#B5C7EB]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <img src={logoImg} alt={t("footer.logoAlt")} className="h-14 w-auto object-contain" />
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6">{t("footer.description")}</p>

            {latestPosts.length > 0 && (
              <div>
                <h4 className="text-[#B5C7EB] mb-4 text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>
                  {t("footer.latestPosts", { defaultValue: "Latest from the blog" })}
                </h4>
                <ul className="flex flex-col gap-2">
                  {latestPosts.map((post) => (
                    <li key={post.id}>
                      <LocalizedNavLink
                        to={`/blog/${post.slug}`}
                        className="text-sm text-white/55 hover:text-[#B5C7EB] transition-colors line-clamp-1"
                      >
                        {post.title}
                      </LocalizedNavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#B5C7EB] mb-5 text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("footer.pages")}</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ key, path }) => (
                <li key={path}>
                  <LocalizedNavLink to={path} className="text-sm text-white/55 hover:text-[#B5C7EB] transition-colors">{t(key)}</LocalizedNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#B5C7EB] mb-5 text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("footer.services")}</h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map(({ key, path }) => (
                <li key={key}>
                  <LocalizedNavLink to={path} className="text-sm text-white/55 hover:text-[#B5C7EB] transition-colors cursor-pointer">{t(key)}</LocalizedNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#B5C7EB] mb-5 text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("footer.contact")}</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B5C7EB] mt-0.5 shrink-0" />
                <span className="text-sm text-white/55" style={{ whiteSpace: "pre-line" }}>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B5C7EB] shrink-0" />
                <a
                  href={phoneHref}
                  aria-label={t("footer.phoneLinkAria")}
                  className="text-sm text-white/55 hover:text-[#B5C7EB] transition-colors"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#B5C7EB] shrink-0" />
                <a
                  href={t("contact.info.websiteUrl")}
                  aria-label={t("footer.websiteLinkAria")}
                  className="text-sm text-white/55 hover:text-[#B5C7EB] transition-colors"
                >
                  {t("footer.website")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#B5C7EB] mt-0.5 shrink-0" />
                <div className="text-sm text-white/55">
                  {settings?.openingHours
                    ? settings.openingHours.split(",").map((line) => <div key={line}>{line.trim()}</div>)
                    : [t("footer.hours1"), t("footer.hours2"), t("footer.hours3")].map((line) => <div key={line}>{line}</div>)}
                </div>
              </li>
              <li className="pt-2">
                <div className="text-[#B5C7EB] mb-3 text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>
                  {t("footer.social.title")}
                </div>
                <div className="flex items-center gap-3">
                  {socialLinks.map(({ href, label, ariaLabel, Icon }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ariaLabel}
                      title={label}
                      className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-[#B5C7EB] hover:border-[#B5C7EB]/40 hover:bg-white/8 transition-colors flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
