# Technical SEO Requirements Specification

## Purpose

This document defines the Technical SEO requirements that the website must satisfy before release. It is intended to be used as an audit checklist for repository review, preview deployments, and production verification.

The specification applies to all public, indexable pages and routes unless otherwise stated.

## Audit Status Vocabulary

Each requirement must be reported using one of the following statuses:

- `PASS`
- `PARTIALLY PASS`
- `FAIL`
- `NOT VERIFIED - deployment required`

## Evidence Policy

- Use `PASS` only when the requirement is clearly satisfied by verifiable evidence.
- Use `PARTIALLY PASS` only when part of the requirement is met and the remaining gap is known.
- Use `FAIL` when repository evidence shows the requirement is missing, incorrect, or contradicted.
- Use `NOT VERIFIED - deployment required` when the requirement depends on live hosting, server behavior, CDN behavior, HTTP headers, Lighthouse/PageSpeed measurement, or other deployment-only conditions that cannot be proven from repository code alone.

Important rule for performance:

- Do not mark PageSpeed, Lighthouse, or Core Web Vitals requirements as `PASS` or `PARTIALLY PASS` unless real measurement evidence exists.
- If no Lighthouse/PageSpeed evidence exists, those requirements must be marked `NOT VERIFIED - deployment required`, while static risk factors may still be documented.

---

# 1. Dedicated Service Pages

## Requirement

Each service offered by the business must have its own dedicated page and indexable URL.

## Verification

- Discover all services offered by the business.
- Verify every service has its own unique public URL.
- Verify services are not implemented only as sections, accordions, cards, or filters on a shared page.
- Verify every service page contains meaningful, unique content describing that service.
- Verify every service page can target service-specific keywords.
- Report all missing service URLs.

---

# 2. Website Performance Evidence

## Requirement

The website must achieve acceptable technical performance as demonstrated by real measurement evidence.

Minimum targets:

- Google PageSpeed Performance score above `90` on key pages
- No critical Lighthouse SEO or performance regressions

## Verification

- Collect Lighthouse or PageSpeed evidence for homepage and key landing pages.
- Record measured values and test context.
- If no measurement evidence exists, mark `NOT VERIFIED - deployment required`.
- Separately document static risk factors found in code, such as:
  - oversized images
  - blocking JavaScript
  - blocking CSS
  - excessive client-side rendering
  - unnecessary network requests
  - missing lazy loading
  - missing compression
  - large bundles

---

# 3. Core Web Vitals

## Requirement

The site must meet acceptable Core Web Vitals thresholds on important public pages.

Target thresholds:

- `LCP` no greater than `2.5s`
- `CLS` no greater than `0.1`
- `INP` no greater than `200ms`

## Verification

- Verify using Lighthouse, PageSpeed Insights, CrUX, or production RUM if available.
- Report results per key page when possible.
- If no measurement evidence exists, mark `NOT VERIFIED - deployment required`.
- Static code review may identify likely risks, but may not be used alone to mark `PASS` or `PARTIALLY PASS`.

---

# 4. Mobile Friendliness

## Requirement

The entire website must provide a good experience on mobile devices.

## Verification

Verify:

- responsive layouts
- readable typography
- usable navigation
- properly scaled images
- no horizontal scrolling
- touch-friendly controls
- responsive menus

If this is not tested in a browser, report only what can be inferred from code and classify conservatively.

---

# 5. Static Core Pages

## Requirement

The website must contain dedicated static pages for:

- About Us
- Contact Us

## Verification

Verify:

- each page has its own URL
- pages are indexable
- pages are linked from navigation and/or footer

---

# 6. Preferred Domain Redirects

## Requirement

Only one preferred domain should resolve as the canonical host.

Example:

- `https://example.com`

or

- `https://www.example.com`

All alternate domain variants must permanently redirect (`301`) to the preferred domain.

## Verification

Verify on deployment:

- preferred domain is defined
- non-preferred host redirects with `301`
- protocol/domain variants do not create duplicate content

If host redirects cannot be tested from the repository, mark `NOT VERIFIED - deployment required`.

---

# 7. Search Engine Indexing

## Requirement

The website must be crawlable and indexable.

## Verification

Verify:

- `robots.txt` exists and allows crawling of important pages
- important pages are not marked `noindex`
- no accidental blocking directives exist
- indexing is not blocked by meta tags, HTTP headers, or runtime logic

---

# 8. SEO-Friendly URLs

## Requirement

URLs should be readable and consist only of Latin letters and words.

Preferred examples:

- `/services`
- `/dental-implants`
- `/orthodontics`

Avoid:

- IDs
- random strings
- special characters
- non-Latin characters
- unnecessary query parameters

## Verification

Inspect all public routes.

---

# 9. Heading Structure

## Requirement

Every public page should contain:

- exactly one `H1`
- at least one `H2`
- a logical heading hierarchy aligned with the page content

## Verification

Verify per page:

- `H1` uniqueness
- existence of at least one `H2`
- no skipped or misleading hierarchy where it materially harms semantics

This requirement should be reported page-by-page in the audit report.

---

# 10. Primary Language URL Structure

## Requirement

The primary language must not include a language prefix.

Example:

- `/`

Not:

- `/am/`
- `/hy/`

---

# 11. Secondary Language URLs

## Requirement

Secondary languages must use dedicated URL prefixes.

Examples:

- `/en/`
- `/ru/`

## Verification

- Verify each secondary language has its own route namespace.
- Verify language switching is not handled only in client state when indexable multilingual SEO is required.

---

# 12. hreflang

## Requirement

Equivalent multilingual pages must reference one another using `hreflang` tags.

## Verification

Verify:

- alternate language links exist
- language codes are correct
- self-reference exists where appropriate
- tags map equivalent pages, not unrelated pages

---

# 13. Favicon

## Requirement

The public site must include a favicon based on the company logo or approved brand asset.

## Verification

Verify:

- favicon asset exists for the public site
- favicon is referenced correctly in the site head
- favicon loads successfully on deployment

---

# 14. Structured Data

## Requirement

Structured data must be implemented where applicable.

Minimum checks:

- `LocalBusiness`
- `Organization` including logo
- `WebSite` if applicable
- `BreadcrumbList` if breadcrumbs are present in the UI
- `Article` schema if public blog article pages exist

## Verification

Verify:

- structured data exists in JSON-LD or another accepted form
- schema types match the page/business context
- required properties contain meaningful values
- no placeholder or misleading content is used

---

# 15. Footer Structure

## Requirement

The global footer must provide a stable crawlable structure for essential business and navigation information.

## Verification

Verify the footer includes, where applicable:

- brand/business identification
- links to important core pages
- links to major services or service categories
- contact details
- legal/supporting links if such pages are intended to exist

Also verify:

- footer links are crawlable
- footer links are not placeholders
- footer content is consistent across public pages

---

# 16. XML Sitemap

## Requirement

The site must expose a valid XML sitemap for public indexable URLs.

## Verification

Verify:

- sitemap file or sitemap generation exists
- sitemap includes canonical public URLs
- blocked, duplicate, or preview-only pages are excluded
- sitemap is accessible on deployment

If sitemap accessibility cannot be tested live, note that deployment verification is still required.

---

# 17. Canonical Tags Per Page

## Requirement

Every indexable public page must include a self-referencing or intentionally specified canonical tag.

## Verification

Verify:

- canonical tag exists on each public page
- canonical points to the correct preferred URL
- canonical does not collapse distinct pages incorrectly

Canonical verification is separate from domain redirect verification.

---

# 18. Unique Page Title and Meta Description Per Public Page

## Requirement

Every public page must have a unique, meaningful page title and meta description.

## Verification

Verify:

- each public page has its own title
- each public page has its own meta description
- metadata reflects actual page content
- duplicate titles/descriptions are reported

---

# 19. Open Graph and Twitter Metadata

## Requirement

Public pages should include social metadata suitable for sharing.

Minimum checks:

- Open Graph title
- Open Graph description
- Open Graph image
- Twitter card metadata

## Verification

Verify:

- metadata exists on important public pages
- values are page-specific where appropriate
- image URLs are valid and publicly accessible

---

# 20. Image SEO and Alt Attributes

## Requirement

Public content images must support accessibility and search discoverability.

## Verification

Verify:

- meaningful `alt` text is present for content images
- decorative images are treated appropriately
- critical visual content is not delivered only as CSS backgrounds when semantic content should be exposed
- image filenames, dimensions, and delivery strategy do not create obvious SEO/performance problems

---

# 21. 404 Page Behavior

## Requirement

Unknown URLs must resolve to a helpful 404 experience.

## Verification

Verify:

- a custom 404 page exists
- the page explains the error and provides recovery navigation
- deployment returns actual HTTP `404` status for unknown URLs
- the 404 page is not misleadingly indexable as normal content

If HTTP status behavior cannot be tested from the repository, mark that portion `NOT VERIFIED - deployment required`.

---

# 22. Internal Linking

## Requirement

Important public pages must be linked in a crawlable, contextually useful way.

## Verification

Verify:

- core pages are linked from global navigation and/or footer
- service pages are linked from related sections
- blog/article content links to relevant services or core pages where appropriate
- internal links use valid public URLs
- orphaned important pages are reported

---

# 23. Broken Links

## Requirement

The public site must not contain broken or placeholder internal links.

## Verification

Verify:

- internal links resolve to known public routes where statically determinable
- placeholder links such as `#` are reported
- links to missing legal/support pages are reported
- if full crawl testing is unavailable, note that runtime/deployment crawling is still required

---

# 24. HTTPS and Mixed Content

## Requirement

The public site must be served securely over HTTPS without mixed-content issues.

## Verification

Verify on deployment:

- HTTP redirects to HTTPS
- all public assets load over HTTPS
- no mixed-content warnings are produced
- canonical and sitemap URLs use HTTPS

If this cannot be tested live, mark `NOT VERIFIED - deployment required`.
