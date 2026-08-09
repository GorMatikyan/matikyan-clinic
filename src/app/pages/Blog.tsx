import { useEffect, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fetchPublishedBlogPosts, type CmsBlogPost } from "../../lib/cmsApi";
import { PageHero } from "../components/PageHero";
import { LocalizedNavLink } from "../routing";
import { siteImages } from "../siteImages";

function readingTime(bodyHtml: string | null): number {
  const text = (bodyHtml ?? "").replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function Blog() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<CmsBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublishedBlogPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...rest] = posts;

  return (
    <div>
      <PageHero
        eyebrow={t("blog.header.badge")}
        title={t("blog.header.title")}
        description={t("blog.header.desc")}
        imageSrc={siteImages.heroSlides[2].full}
        imageAlt={t("home.hero.slideAlt", { index: 3 })}
      />

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          {!loading && posts.length === 0 && (
            <div className="text-center py-16 text-[#5B6475]">{t("blog.empty")}</div>
          )}

          {featured && (
            <div className="mb-12">
              <LocalizedNavLink to={`/blog/${featured.slug}`} className="grid lg:grid-cols-2 gap-0 bg-[#0F1932] rounded-2xl overflow-hidden block">
                <div className="relative overflow-hidden bg-[#eef1f8] min-h-72">
                  {featured.coverImage && (
                    <img
                      src={featured.coverImage.url}
                      alt={featured.coverImage.altText}
                      className="w-full h-full object-cover"
                      style={{ minHeight: "320px" }}
                    />
                  )}
                  <div className="absolute top-5 left-5 bg-[#B5C7EB] text-[#0F1932] text-xs px-3 py-1.5 rounded-full" style={{ fontWeight: 700 }}>
                    {t("blog.featured")}
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <h2 className="text-white mb-4 leading-snug" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800 }}>
                    {featured.title}
                  </h2>
                  <p className="text-white/55 text-sm leading-relaxed mb-7">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      {featured.publishedAt && <span>{new Date(featured.publishedAt).toLocaleDateString()}</span>}
                      <span>·</span>
                      <Clock className="w-3 h-3" />
                      <span>{t("blog.readTimeMinutes", { count: readingTime(featured.bodyHtml) })}</span>
                    </div>
                    <span className="flex items-center gap-2 text-[#B5C7EB] text-sm" style={{ fontWeight: 600 }}>
                      {t("blog.read")} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </LocalizedNavLink>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <LocalizedNavLink
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#0F1932]/8 hover:shadow-lg hover:border-[#B5C7EB]/40 transition-all duration-300 block"
              >
                <div className="relative overflow-hidden bg-[#eef1f8] h-48">
                  {post.coverImage && (
                    <img
                      src={post.coverImage.url}
                      alt={post.coverImage.altText}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-[#0F1932] mb-3 leading-snug" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700 }}>
                    {post.title}
                  </h3>
                  <p className="text-[#5B6475] text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#0F1932]/8">
                    <div className="text-xs text-[#5B6475] flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#B5C7EB]" />
                      <span>{t("blog.readTimeMinutes", { count: readingTime(post.bodyHtml) })}</span>
                    </div>
                    <span className="text-[#0F1932] text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1" style={{ fontWeight: 600 }}>
                      {t("blog.readMore")} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </LocalizedNavLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
