# Technical SEO Audit Report

Audit date: 2026-06-27

Scope: repository-only audit against the updated `CEO.md` specification. No live deployment, Lighthouse run, PageSpeed evidence, HTTP header inspection, or browser-based crawl was available during this audit.

Public routes found in the repo:

- `/`
- `/en/...`
- `/ru/...`
- `/about`
- `/doctors`
- `/reviews`
- `/services`
- `/faq`
- `/blog`
- `/contact`
- all dedicated service detail routes under the Armenian root path and under `/en/...` and `/ru/...`
- `*` catch-all 404 route

Excluded from the public-route checklist:

- `src/app/pages/BeforeAfter.tsx` exists in the repository but is not registered in `src/app/routes.tsx`.

## Executive Summary

The repository-level multilingual SEO foundation is now in place.

The previously identified crawlable language-routing gaps have been resolved:

- Armenian remains on `/`
- English is available under `/en/...`
- Russian is available under `/ru/...`
- localized canonicals and `hreflang` alternates are emitted from the shared SEO layer
- the sitemap now includes localized canonical URLs

The remaining high-impact gaps are deployment-only or measurement-based:

- no live verification yet for preferred-domain redirects, HTTP status behavior, or final indexing
- no Lighthouse/PageSpeed evidence yet for performance and Core Web Vitals

## Critical Blockers

- Preferred-domain redirect behavior is still `NOT VERIFIED - deployment required`.
- Lighthouse/PageSpeed and live Core Web Vitals evidence are still missing.

## Requirement Audit

### 1. Dedicated Service Pages

- Status: `PASS`
- Evidence: Dedicated service detail routes now exist in `src/app/routes.tsx` for `/dental-cleaning-check-up`, `/teeth-whitening`, `/veneers`, `/composite-bonding`, `/dental-implants`, `/same-day-crowns`, `/root-canal-treatment`, `/invisalign`, `/ceramic-braces`, `/periodontal-treatment`, `/wisdom-tooth-extraction`, and `/pediatric-dentistry`. The overview page remains at `/services`, and each detail page is rendered through `src/app/pages/ServiceDetail.tsx` using service-specific content from `src/app/serviceData.ts`.
- Files or routes involved: `/services`, all service detail URLs, `src/app/routes.tsx`, `src/app/pages/ServiceDetail.tsx`, `src/app/serviceData.ts`
- Issues found: No major repository-level gap remains for dedicated service URLs in the current service set.
- Recommended fix: Keep the shared service data source updated as services change so routes, copy, and metadata stay aligned.
- Priority: `Medium`

### 2. Website Performance Evidence

- Status: `NOT VERIFIED - deployment required`
- Evidence: No Lighthouse or PageSpeed report exists in the repository. Public non-home routes are now lazy-loaded from `src/app/routes.tsx`, which reduces the initial application chunk and creates separate route chunks for `About`, `Doctors`, `Reviews`, `Services`, `ServiceDetail`, `FAQ`, `Blog`, and `Contact`. The homepage hero in `src/app/components/PhotoSlider.tsx` now renders the first visible slide as a semantic image with `fetchpriority="high"` while later slide images are deferred, and below-the-fold homepage images in `src/app/pages/Home.tsx` are now lazy-loaded. Static risks still include remote Unsplash image delivery and client-side Sanity fetching after render in `src/hooks/useSanityData.ts:8-17`.
- Files or routes involved: `/`, `/about`, `/doctors`, `/reviews`, `/services`, `/blog`, `src/app/routes.tsx`, `src/app/components/PhotoSlider.tsx`, `src/hooks/useSanityData.ts`
- Issues found: Performance cannot be scored from repository evidence alone. Initial JavaScript has improved at the bundling level, but static risks still suggest possible LCP and render-delay issues.
- Recommended fix: Run Lighthouse/PageSpeed on a deployed preview and then optimize largest images, render path, and content loading based on measured bottlenecks.
- Priority: `High`

### 3. Core Web Vitals

- Status: `NOT VERIFIED - deployment required`
- Evidence: No Lighthouse, CrUX, or RUM evidence is present. Static risks include CSS background hero images, many remote images, and client-side content fetches.
- Files or routes involved: `/`, `/services`, `/doctors`, `/blog`, `src/app/components/PhotoSlider.tsx`, `src/hooks/useSanityData.ts`
- Issues found: `LCP`, `CLS`, and `INP` cannot be validated from repository code alone.
- Recommended fix: Measure `LCP`, `CLS`, and `INP` on a deployed build and treat the current static risks as candidates for follow-up work.
- Priority: `High`

### 4. Mobile Friendliness

- Status: `PARTIALLY PASS`
- Evidence: Responsive utility classes are used throughout public pages, and a mobile menu exists in `src/app/components/Navbar.tsx:111-166`. Layouts commonly use grid breakpoints such as `sm:`, `md:`, and `lg:` in public pages.
- Files or routes involved: `/`, `/about`, `/doctors`, `/reviews`, `/services`, `/faq`, `/blog`, `/contact`, `src/app/components/Navbar.tsx`
- Issues found: No browser/device verification was performed, so touch behavior, overflow issues, and actual mobile rendering are not fully proven.
- Recommended fix: Validate all public routes on mobile viewport sizes and capture any overflow, spacing, or interaction regressions.
- Priority: `Medium`

### 5. Static Core Pages

- Status: `PASS`
- Evidence: `/about` and `/contact` exist in `src/app/routes.tsx:34,40`. Both are linked in the navbar and footer: `src/app/components/Navbar.tsx:7-15`, `src/app/components/Footer.tsx:9-17`.
- Files or routes involved: `/about`, `/contact`, `src/app/routes.tsx`, `src/app/components/Navbar.tsx`, `src/app/components/Footer.tsx`
- Issues found: None for route existence and internal linking. Indexability still depends on requirement 7.
- Recommended fix: None beyond resolving sitewide indexing blockers.
- Priority: `Medium`

### 6. Preferred Domain Redirects

- Status: `NOT VERIFIED - deployment required`
- Evidence: No deployable host redirect configuration was available in the repository.
- Files or routes involved: deployment configuration not present in audited files
- Issues found: Preferred host behavior, `www` handling, and `301` redirects cannot be proven from repository code.
- Recommended fix: Verify live behavior for `http`/`https` and `www`/non-`www` variants and enforce one canonical host with permanent redirects.
- Priority: `High`

### 7. Search Engine Indexing

- Status: `PARTIALLY PASS`
- Evidence: The explicit `noindex, nofollow` meta tag has been removed from `index.html`. The initial HTML shell in `index.html` now uses production-safe Armenian fallback title, description, and social metadata instead of scaffold text. A public `robots.txt` now exists at `public/robots.txt` with `User-agent: *`, `Allow: /`, and `Sitemap: https://matikyan.am/sitemap.xml`. The app still uses client-side routing via `createBrowserRouter` in `src/app/routes.tsx:28-45`.
- Files or routes involved: `index.html`, `public/robots.txt`, all public routes, `src/app/routes.tsx`
- Issues found: Search engines are no longer explicitly blocked, the HTML shell no longer exposes scaffold metadata, and a crawl-allowing robots file exists. Live crawlability and final production behavior still need deployment verification.
- Recommended fix: Keep `robots.txt` in place and verify deployed responses, rendered routes, and final indexing behavior in production.
- Priority: `High`

### 8. SEO-Friendly URLs

- Status: `PASS`
- Evidence: Public routes are readable Latin slugs such as `/about`, `/doctors`, `/reviews`, `/services`, `/faq`, `/blog`, and `/contact` in `src/app/routes.tsx`.
- Files or routes involved: `src/app/routes.tsx`
- Issues found: Individual services and blog articles still lack dedicated detail slugs, but the existing route names are readable.
- Recommended fix: Preserve readable slugs when adding service and article detail routes.
- Priority: `Medium`

### 9. Heading Structure

- Status: `PASS`
- Evidence: Heading usage is now compliant across the current public route set. `/doctors` and `/reviews` each include one `h1` and at least one `h2`, service detail pages already include one `h1` and at least one `h2`, and the 404 view now uses an `h1` in `src/app/routes.tsx`.
- Files or routes involved: `/`, `/about`, `/doctors`, `/reviews`, `/services`, `/faq`, `/blog`, `/contact`, all service detail URLs, `*`
- Issues found: No major repository-level heading issue remains on the current public route set.
- Recommended fix: Keep the one-`h1` plus at-least-one-`h2` rule in place as new pages are added.
- Priority: `Medium`

Per-page classification:

- `/`: `PASS` - `h1` in `src/app/components/PhotoSlider.tsx:109-111`; `h2`s in `src/app/pages/Home.tsx:66-68,127-129,163-165,211-213`
- `/about`: `PASS` - `h1` in `src/app/pages/About.tsx:24-26`; `h2`s in `src/app/pages/About.tsx:60-62,89-91,119-121`
- `/doctors`: `PASS` - `h1` in `src/app/pages/Doctors.tsx:64-66`; `h2` added in the doctors grid section
- `/reviews`: `PASS` - `h1` in `src/app/pages/Reviews.tsx:81-83`; `h2` added above the review summary stats
- `/services`: `PASS` - `h1` in `src/app/pages/Services.tsx:189-191`; `h2` in `src/app/pages/Services.tsx:310-312`
- `/faq`: `PASS` - `h1` in `src/app/pages/FAQ.tsx:78-80`; `h2`s in `src/app/pages/FAQ.tsx:111-113,126-128`
- `/blog`: `PASS` - `h1` in `src/app/pages/Blog.tsx:73-75`; `h2` in `src/app/pages/Blog.tsx:119-121`
- `/contact`: `PASS` - `h1` in `src/app/pages/Contact.tsx:36-38`; `h2`s in `src/app/pages/Contact.tsx:51-53,65-67`
- `404`: `PASS` - not-found route now uses an `h1` in `src/app/routes.tsx`
- service detail pages: `PASS` - each dedicated service page uses one `h1` and at least one `h2` in `src/app/pages/ServiceDetail.tsx`

### 10. Primary Language URL Structure

- Status: `PASS`
- Evidence: The default route tree is rooted at `/` with no language prefix in `src/app/routes.tsx:28-45`.
- Files or routes involved: `src/app/routes.tsx`
- Issues found: None for primary-language root path structure.
- Recommended fix: Keep the default language unprefixed if that remains the SEO strategy.
- Priority: `Low`

### 11. Secondary Language URLs

- Status: `PASS`
- Evidence: Public routing now supports Armenian on the root path and secondary language prefixes under `/en/...` and `/ru/...` through the duplicated route tree in `src/app/routes.tsx`. Language switching in `src/app/components/Navbar.tsx` now navigates between localized URLs instead of only changing client state.
- Files or routes involved: `src/app/routes.tsx`, `src/app/components/Navbar.tsx`, `src/app/routing.tsx`, `src/i18n/index.ts`
- Issues found: No major repository-level gap remains for crawlable multilingual route structure across the current public route set.
- Recommended fix: Keep new public routes aligned with the same default-root plus prefixed-secondary-language pattern.
- Priority: `Medium`

### 12. hreflang

- Status: `PASS`
- Evidence: `src/app/components/SeoHead.tsx` now emits `rel="alternate"` links for Armenian (`hy`), English (`en`), Russian (`ru`), and `x-default`, with self-referencing alternates included for the current localized route. Unknown routes now clear alternate links instead of advertising 404 URLs as localized equivalents.
- Files or routes involved: all public routes, `src/app/components/SeoHead.tsx`, `src/app/routing.tsx`
- Issues found: No major repository-level `hreflang` gap remains for the current public route set.
- Recommended fix: Preserve the same alternate-language coverage whenever new public routes are added.
- Priority: `Medium`

### 13. Favicon

- Status: `PASS`
- Evidence: The public app now references `/favicon.png` from `index.html` using `rel="icon"` and `rel="shortcut icon"`. The favicon file exists at `public/favicon.png` and is based on the same clinic logo asset already used throughout the public site.
- Files or routes involved: `index.html`, `public/favicon.png`, `src/imports/matikyan-clinic-logo-am.png`
- Issues found: No major repository-level favicon gap remains for the public app.
- Recommended fix: If a dedicated multi-size favicon set is created later, keep it aligned with the same approved clinic logo.
- Priority: `Low`

### 14. Structured Data

- Status: `PASS`
- Evidence: Reusable JSON-LD is now rendered globally through `src/app/components/StructuredData.tsx` and mounted in `src/app/components/Layout.tsx`. The site outputs `Organization`, `WebSite`, and `Dentist` schema using `https://matikyan.am` as the base URL and the public clinic logo asset as the logo/image reference.
- Files or routes involved: all public routes, `src/app/components/StructuredData.tsx`, `src/app/components/Layout.tsx`
- Issues found:
  - `Organization` / logo schema: implemented
  - `WebSite`: implemented
  - `LocalBusiness` / `Dentist`: implemented
  - `BreadcrumbList`: not applicable because breadcrumbs are not rendered publicly
  - `Article`: not applicable yet because dedicated public article routes do not exist
  - Verified address, phone, opening hours, and social profile URLs were not added to JSON-LD because the current visible values appear to be placeholder/demo content
- Recommended fix: Preserve the current conservative schema set, and add contact/address/opening-hours fields only after verified real business data is available.
- Priority: `Medium`

### 15. Footer Structure

- Status: `PASS`
- Evidence: The footer includes brand, navigation, services, and contact blocks in `src/app/components/Footer.tsx:29-112`. It is sitewide through `src/app/components/Layout.tsx:13-19`.
- Files or routes involved: all public routes, `src/app/components/Footer.tsx`, `src/app/components/Layout.tsx`
- Issues found: No major repository-level footer crawlability issue remains. Core page links and service links point to public routes, and placeholder footer links have been removed.
- Recommended fix: Keep footer links limited to real public destinations until verified legal or social URLs are available.
- Priority: `Low`

### 16. XML Sitemap

- Status: `PASS`
- Evidence: A public sitemap exists at `public/sitemap.xml` and now lists canonical public URLs for the Armenian root routes plus the localized English and Russian route variants. The sitemap continues to exclude `/logo-preview` and the wildcard 404 route. `public/robots.txt` points to `https://matikyan.am/sitemap.xml`.
- Files or routes involved: `public/sitemap.xml`, `public/robots.txt`
- Issues found: No major repository-level gap remains for sitemap coverage on the current multilingual route set.
- Recommended fix: Keep the sitemap updated whenever public routes, service slugs, or supported languages change, or replace it with generation later if the route set becomes more dynamic.
- Priority: `Medium`

### 17. Canonical Tags Per Page

- Status: `PASS`
- Evidence: The SEO head now derives canonical URLs from the current language-aware pathname and applies the correct localized canonical under `/`, `/en/...`, or `/ru/...` using `src/app/components/SeoHead.tsx` and `src/app/routing.tsx`. Removed or unknown routes no longer receive normal canonical tags.
- Files or routes involved: all public routes, `src/app/components/SeoHead.tsx`, `src/app/routing.tsx`, `src/app/seo.ts`
- Issues found: No major repository-level gap remains for canonical tags on the current multilingual route set.
- Recommended fix: Preserve per-route canonical coverage as new routes are added.
- Priority: `Medium`

### 18. Unique Page Title and Meta Description Per Public Page

- Status: `PASS`
- Evidence: Unique route metadata is defined in `src/app/seo.ts` for `/`, `/about`, `/doctors`, `/reviews`, `/services`, `/faq`, `/blog`, `/contact`, and the dedicated service routes. The metadata layer now resolves language-specific titles and descriptions for Armenian, English, and Russian, while `src/app/components/SeoHead.tsx` applies the correct version based on the current localized route.
- Files or routes involved: `/`, `/about`, `/doctors`, `/reviews`, `/services`, `/faq`, `/blog`, `/contact`, all service detail URLs, `src/app/seo.ts`, `src/app/serviceData.ts`, `src/app/components/SeoHead.tsx`
- Issues found: The current metadata layer covers the public route set requested for this step with localized metadata per supported language. Future routes must be added to the SEO map to maintain uniqueness in each language.
- Recommended fix: Keep the route metadata map updated whenever new public pages are introduced.
- Priority: `Medium`

### 19. Open Graph and Twitter Metadata

- Status: `PASS`
- Evidence: `SeoHead` now applies `og:title`, `og:description`, `og:url`, `og:type`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image` in `src/app/components/SeoHead.tsx`. These values are sourced from the same language-aware metadata definitions in `src/app/seo.ts`, so Armenian, English, and Russian routes emit matching localized social metadata.
- Files or routes involved: `/`, `/about`, `/doctors`, `/reviews`, `/services`, `/faq`, `/blog`, `/contact`, all service detail URLs, `src/app/seo.ts`, `src/app/components/SeoHead.tsx`
- Issues found: Metadata is now present and localized for the current public route set. Social preview quality still depends on how the chosen logo image renders when shared.
- Recommended fix: Replace the default logo image with a dedicated share image later if richer social previews are needed.
- Priority: `Low`

### 20. Image SEO and Alt Attributes

- Status: `PARTIALLY PASS`
- Evidence: Many content images use `alt` attributes, for example in `src/app/pages/About.tsx:45-48`, `src/app/pages/Doctors.tsx:100-103`, `src/app/pages/Blog.tsx:109,147`, and `src/app/pages/Reviews.tsx:135`. However, the homepage hero uses CSS `backgroundImage` in `src/app/components/PhotoSlider.tsx:90-91`, which provides no semantic image text. Before/after imagery also uses generic `alt` text in `src/app/pages/BeforeAfter.tsx:59-63`, though that page is not public.
- Files or routes involved: `/`, `/about`, `/doctors`, `/reviews`, `/services`, `/blog`, `src/app/components/PhotoSlider.tsx`
- Issues found: Important hero visuals are not exposed as semantic images. Alt coverage is generally present but not uniformly strong for all visual contexts.
- Recommended fix: Keep meaningful `alt` text on content images and avoid relying on CSS backgrounds for important indexable image content when semantic markup is needed.
- Priority: `Medium`

### 21. 404 Page Behavior

- Status: `PARTIALLY PASS`
- Evidence: A catch-all route exists in `src/app/routes.tsx`, and the not-found UI provides a message and home link. Unknown routes are now treated as SEO-safe in `src/app/components/SeoHead.tsx` by removing canonical and `hreflang` tags and applying a `noindex, nofollow` robots meta tag.
- Files or routes involved: `*`, `src/app/routes.tsx`
- Issues found:
  - custom UI exists, which is positive
  - actual HTTP `404` status cannot be verified from repository code
  - indexability behavior for the deployed 404 response is not verifiable here
- Recommended fix: Keep the custom not-found experience and verify deployed unknown URLs return real HTTP `404`.
- Priority: `Medium`

### 22. Internal Linking

- Status: `PARTIALLY PASS`
- Evidence: Global navigation links core routes in `src/app/components/Navbar.tsx:7-15,59-75,125-139`. Footer links core routes and now points service shortcuts to dedicated service URLs in `src/app/components/Footer.tsx`. Home page service cards now link to dedicated service pages in `src/app/pages/Home.tsx`, and `/services` overview cards also link to dedicated detail URLs in `src/app/pages/Services.tsx`.
- Files or routes involved: `/`, `/services`, all service detail URLs, `src/app/components/Navbar.tsx`, `src/app/components/Footer.tsx`, `src/app/pages/Home.tsx`, `src/app/pages/Services.tsx`, `src/app/routes.tsx`
- Issues found:
  - blog cards do not link to article routes; the featured "Read" action is a button with no destination in `src/app/pages/Blog.tsx:133-135`
  - the preview-only `/logo-preview` route has been removed from public routing, which resolves its prior exposure issue
- Recommended fix: Add article-level internal links when dedicated blog post routes exist.
- Priority: `High`

### 23. Broken Links

- Status: `PASS`
- Evidence: Placeholder footer links using `href="#"` have been removed from `src/app/components/Footer.tsx`. Remaining footer links point to existing public routes, `tel:`, or `mailto:` destinations.
- Files or routes involved: all public routes, `src/app/components/Footer.tsx`
- Issues found: No placeholder footer links remain in the current implementation.
- Recommended fix: Apply the same rule to future footer additions: only ship links with real destinations.
- Priority: `Low`

### 24. HTTPS and Mixed Content

- Status: `NOT VERIFIED - deployment required`
- Evidence: Public external images currently use `https://` URLs, for example in `src/app/components/PhotoSlider.tsx:11-23` and across public page components. However, final protocol handling, redirects, and mixed-content behavior depend on deployment.
- Files or routes involved: all public routes, deployment environment
- Issues found: HTTPS enforcement and mixed-content behavior cannot be validated from repository code alone.
- Recommended fix: Verify live deployment redirects HTTP to HTTPS and confirm that no mixed-content requests appear in browser/network inspection.
- Priority: `High`

## Recommended Implementation Order

1. Normalize heading structure on pages that currently lack `h2` or a proper 404 `h1`.
2. Run Lighthouse/PageSpeed on a deployed build and optimize measured bottlenecks.

## Deployment-Only Checks

- Preferred-domain redirect behavior (`www` vs non-`www`, HTTP vs HTTPS)
- Real `robots.txt` response and sitemap accessibility
- Actual HTTP status for unknown URLs
- HTTPS enforcement and mixed-content inspection
- Lighthouse/PageSpeed measurements
- Core Web Vitals validation (`LCP`, `CLS`, `INP`)
