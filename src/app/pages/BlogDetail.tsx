import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { fetchBlogPostBySlug, type CmsBlogPost } from "../../lib/cmsApi";
import { setSeoOverride } from "../seoOverrides";
import { buildCanonicalUrl } from "../seo";
import { LocalizedNavLink, localizePath, useCurrentLanguage } from "../routing";

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const language = useCurrentLanguage();
  const navigate = useNavigate();
  const [post, setPost] = useState<CmsBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    fetchBlogPostBySlug(slug).then((result) => {
      if (cancelled) return;
      if (!result) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPost(result);
      setLoading(false);

      const path = `/blog/${slug}`;
      const canonicalUrl = buildCanonicalUrl(localizePath(path, language));

      setSeoOverride(path, {
        breadcrumbLabel: result.title,
        title: result.seoFields.metaTitle || `${result.title} | Matikyan Dental Clinic`,
        description: result.seoFields.metaDescription || result.excerpt || undefined,
        canonicalPath: canonicalUrl,
        ogTitle: result.seoFields.ogTitle || result.title,
        ogDescription: result.seoFields.ogDescription || result.excerpt || undefined,
        ogImage: result.seoFields.ogImageUrl || result.coverImage?.url,
        ogType: "article",
        robotsNoindex: result.seoFields.robotsNoindex,
        robotsNofollow: result.seoFields.robotsNofollow,
        skipHreflang: true,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [slug, language]);

  if (notFound) {
    navigate("/blog", { replace: true });
    return null;
  }

  if (loading || !post) {
    return <div className="min-h-[60vh] flex items-center justify-center text-[#5B6475]">{t("blog.loading", { defaultValue: "Loading..." })}</div>;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.coverImage?.url,
    datePublished: post.publishedAt ?? undefined,
  };

  return (
    <article>
      {post.seoFields.schemaType === "ARTICLE" && post.seoFields.schemaJson ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: post.seoFields.schemaJson }} />
      ) : (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      )}

      <section className="bg-[#0F1932] pt-[3rem] pb-14">
        <div className="max-w-3xl mx-auto px-6">
          <LocalizedNavLink to="/blog" className="inline-flex items-center gap-2 text-[#B5C7EB] text-sm mb-6" style={{ fontWeight: 600 }}>
            <ArrowLeft className="w-4 h-4" /> {t("blog.backToBlog", { defaultValue: "Back to blog" })}
          </LocalizedNavLink>
          <h1 className="text-white" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, lineHeight: 1.15 }}>
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="text-white/50 text-sm mt-4">{new Date(post.publishedAt).toLocaleDateString()}</p>
          )}
        </div>
      </section>

      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-6 -mt-8">
          <img
            src={post.coverImage.url}
            alt={post.coverImage.altText}
            className="w-full rounded-2xl shadow-[0_20px_50px_rgba(15,25,50,0.18)] object-cover"
            style={{ maxHeight: "440px" }}
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-14">
        <div
          className="prose max-w-none text-[#3A4256] leading-relaxed [&_h2]:text-[#0F1932] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-[#0F1932] [&_h3]:mt-8 [&_h3]:mb-3 [&_a]:text-[#2D5BFF] [&_img]:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml ?? "" }}
        />
      </div>
    </article>
  );
}
