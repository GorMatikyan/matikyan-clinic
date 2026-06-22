import { useState } from "react";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSanityData } from "../../hooks/useSanityData";
import { BLOG_POSTS_QUERY } from "../../lib/queries";
import type { SanityBlogPost } from "../../lib/sanityTypes";

const categoryKeys = ["all", "oralHealth", "cosmetic", "orthodontics", "nutrition", "technology"] as const;
const categoryValues = ["All", "Oral Health", "Cosmetic", "Orthodontics", "Nutrition", "Technology"];

const posts = [
  {
    category: "Oral Health", featured: true,
    title: "The Right Way to Brush: A Step-by-Step Guide from Our Hygienists",
    excerpt: "Most people brush their teeth every day — but are they doing it correctly? Our head hygienist walks through the technique that makes all the difference.",
    author: "Dr. Anna Kovalenko", date: "June 5, 2026", readTime: "5 min read",
    cover: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=380&fit=crop&auto=format",
  },
  {
    category: "Cosmetic", featured: false,
    title: "Veneers vs. Bonding: Which Smile Upgrade is Right for You?",
    excerpt: "Both porcelain veneers and composite bonding can dramatically improve your smile, but they serve different purposes and price points.",
    author: "Dr. Sofia Marchetti", date: "May 22, 2026", readTime: "7 min read",
    cover: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&h=380&fit=crop&auto=format",
  },
  {
    category: "Orthodontics", featured: false,
    title: "Invisalign in 2026: What's Changed and What You Should Know",
    excerpt: "With AI-assisted treatment planning and new material science, we look at how Invisalign has evolved and what patients can expect today.",
    author: "Dr. Marcus Reid", date: "May 10, 2026", readTime: "6 min read",
    cover: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=380&fit=crop&auto=format",
  },
  {
    category: "Nutrition", featured: false,
    title: "10 Foods That Are Secretly Destroying Your Enamel",
    excerpt: "We all know soda is bad for teeth. But some of the worst offenders are foods you might consider healthy.",
    author: "Dr. Ethan Brooks", date: "April 28, 2026", readTime: "4 min read",
    cover: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=380&fit=crop&auto=format",
  },
  {
    category: "Technology", featured: false,
    title: "Same-Day Crowns: How CAD/CAM Technology is Changing Dentistry",
    excerpt: "Our CEREC machine mills a permanent ceramic crown while you wait — here's how it works and why patients love it.",
    author: "Dr. Anna Kovalenko", date: "April 15, 2026", readTime: "5 min read",
    cover: "https://images.unsplash.com/photo-1588776814546-1ffbb172601e?w=600&h=380&fit=crop&auto=format",
  },
  {
    category: "Oral Health", featured: false,
    title: "Understanding Gum Disease: Stages, Symptoms, and Solutions",
    excerpt: "Periodontal disease affects 47% of adults over 30, yet many don't know they have it. Dr. Brooks explains the four stages and why early intervention is everything.",
    author: "Dr. Ethan Brooks", date: "March 30, 2026", readTime: "8 min read",
    cover: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=380&fit=crop&auto=format",
  },
];

export function Blog() {
  const { t } = useTranslation();
  const { data: postList } = useSanityData<SanityBlogPost[]>(BLOG_POSTS_QUERY, posts);
  const [activeCategory, setActiveCategory] = useState("All");
  const featured = postList[0];
  const allFiltered = activeCategory === "All" ? postList : postList.filter((p) => p.category === activeCategory);
  const showFeatured = !!featured && (activeCategory === "All" || featured.category === activeCategory);
  const grid = showFeatured ? allFiltered.slice(1) : allFiltered;

  return (
    <div>
      {/* Header — navy */}
      <section className="py-20 bg-[#0F1932]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B5C7EB]/15 rounded-full px-4 py-1.5 mb-5">
            <span className="text-[#B5C7EB] text-xs tracking-widest uppercase" style={{ fontWeight: 700 }}>{t("blog.header.badge")}</span>
          </div>
          <h1 className="text-white mb-5" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800 }}>
            {t("blog.header.title")}
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto">
            {t("blog.header.desc")}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 bg-[#0F1932] border-t border-white/8 sticky top-18 z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-2 justify-center">
          {categoryKeys.map((key, i) => (
            <button
              key={key}
              onClick={() => setActiveCategory(categoryValues[i])}
              className={`px-5 py-2 rounded-full text-sm transition-colors ${
                activeCategory === categoryValues[i]
                  ? "bg-[#B5C7EB] text-[#0F1932]"
                  : "bg-white/8 border border-white/10 text-white/65 hover:bg-[#B5C7EB]/20 hover:text-[#B5C7EB]"
              }`}
              style={{ fontWeight: activeCategory === categoryValues[i] ? 600 : 400 }}
            >
              {t(`blog.filter.${key}`)}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#F7FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured */}
          {showFeatured && featured && (
            <div className="mb-12">
              <div className="grid lg:grid-cols-2 gap-0 bg-[#0F1932] rounded-2xl overflow-hidden">
                <div className="relative overflow-hidden bg-[#eef1f8] min-h-72">
                  <img src={featured.cover} alt={featured.title} className="w-full h-full object-cover" style={{ minHeight: "320px" }} />
                  <div className="absolute top-5 left-5 bg-[#B5C7EB] text-[#0F1932] text-xs px-3 py-1.5 rounded-full" style={{ fontWeight: 700 }}>
                    {t("blog.featured")}
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-3.5 h-3.5 text-[#B5C7EB]" />
                    <span className="text-[#B5C7EB] text-xs" style={{ fontWeight: 600 }}>{featured.category}</span>
                  </div>
                  <h2 className="text-white mb-4 leading-snug" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800 }}>
                    {featured.title}
                  </h2>
                  <p className="text-white/55 text-sm leading-relaxed mb-7">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm" style={{ fontWeight: 600 }}>{featured.author}</div>
                      <div className="flex items-center gap-2 text-xs text-white/40 mt-1">
                        <span>{featured.date}</span>
                        <span>·</span>
                        <Clock className="w-3 h-3" />
                        <span>{featured.readTime}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-[#B5C7EB] text-sm hover:gap-3 transition-all" style={{ fontWeight: 600 }}>
                      {t("blog.read")} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grid.map((post) => (
              <div key={post.title} className="group bg-white rounded-2xl overflow-hidden border border-[#0F1932]/8 hover:shadow-lg hover:border-[#B5C7EB]/40 transition-all duration-300 cursor-pointer">
                <div className="relative overflow-hidden bg-[#eef1f8] h-48">
                  <img src={post.cover} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-[#B5C7EB]/90 text-[#0F1932] text-xs px-2.5 py-1 rounded-full" style={{ fontWeight: 600 }}>
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[#0F1932] mb-3 leading-snug" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700 }}>
                    {post.title}
                  </h3>
                  <p className="text-[#5B6475] text-sm leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#0F1932]/8">
                    <div className="text-xs text-[#5B6475] flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#B5C7EB]" />
                      <span>{post.readTime}</span>
                    </div>
                    <span className="text-[#0F1932] text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1" style={{ fontWeight: 600 }}>
                      {t("blog.readMore")} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {allFiltered.length === 0 && (
            <div className="text-center py-16 text-[#5B6475]">{t("blog.empty")}</div>
          )}
        </div>
      </section>
    </div>
  );
}
