import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";
import { LocalizedNavLink, stripLanguagePrefix } from "../routing";
import { fetchPublishedBlogPosts, type CmsBlogPost } from "../../lib/cmsApi";
import { serviceDetails, getLocalizedServiceDetailBySlug } from "../serviceData";

interface SearchResult {
  label: string;
  path: string;
  category: string;
}

const NAV_ENTRIES = [
  { key: "nav.about", path: "/about" },
  { key: "nav.doctors", path: "/doctors" },
  { key: "nav.services", path: "/services" },
  { key: "nav.faq", path: "/faq" },
  { key: "nav.blog", path: "/blog" },
  { key: "nav.contact", path: "/contact" },
  { key: "nav.warranty", path: "/warranty" },
  { key: "nav.dentalTourism", path: "/dental-tourism" },
] as const;

/**
 * Client-side site search - no backend search infra needed at this scale. Indexes static nav
 * labels, service titles, and published blog post titles (fetched lazily on first open).
 */
export function SiteSearch({ overlay }: { overlay: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<CmsBlogPost[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (open && blogPosts.length === 0) {
      fetchPublishedBlogPosts().then(setBlogPosts);
    }
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open, blogPosts.length]);

  const index = useMemo<SearchResult[]>(() => {
    const navResults = NAV_ENTRIES.map((entry) => ({
      label: t(entry.key),
      path: entry.path,
      category: t("search.categoryPage", { defaultValue: "Page" }),
    }));

    const serviceResults = serviceDetails.map((service) => ({
      label: getLocalizedServiceDetailBySlug(service.slug)?.title ?? service.slug,
      path: stripLanguagePrefix(service.slug),
      category: t("search.categoryService", { defaultValue: "Service" }),
    }));

    const blogResults = blogPosts.map((post) => ({
      label: post.title,
      path: `/blog/${post.slug}`,
      category: t("search.categoryBlog", { defaultValue: "Blog" }),
    }));

    return [...navResults, ...serviceResults, ...blogResults];
  }, [blogPosts, t]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((entry) => entry.label.toLowerCase().includes(q)).slice(0, 8);
  }, [index, query]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("search.open", { defaultValue: "Search" })}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
          overlay ? "text-white/72 hover:bg-white/8 hover:text-white" : "text-[#5B6475] hover:bg-[#B5C7EB]/10 hover:text-[#0F1932]"
        }`}
      >
        <Search className="w-4 h-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 px-4 pt-24" onClick={close}>
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-[#0F1932]/8 px-5 py-4">
              <Search className="h-4 w-4 text-[#5B6475]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search.placeholder", { defaultValue: "Search the site..." })}
                className="flex-1 text-sm outline-none placeholder:text-[#5B6475]/60"
              />
              <button type="button" onClick={close} aria-label={t("search.close", { defaultValue: "Close" })}>
                <X className="h-4 w-4 text-[#5B6475]" />
              </button>
            </div>

            {query.trim() !== "" && (
              <div className="max-h-80 overflow-y-auto py-2">
                {results.length === 0 ? (
                  <p className="px-5 py-4 text-sm text-[#5B6475]">
                    {t("search.noResults", { defaultValue: "No results found." })}
                  </p>
                ) : (
                  results.map((result) => (
                    <LocalizedNavLink
                      key={result.path}
                      to={result.path}
                      onClick={close}
                      className="flex items-center justify-between gap-3 px-5 py-3 text-sm text-[#0F1932] hover:bg-[#B5C7EB]/10"
                    >
                      <span>{result.label}</span>
                      <span className="text-xs text-[#5B6475]">{result.category}</span>
                    </LocalizedNavLink>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
