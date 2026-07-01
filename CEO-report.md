# Technical SEO Audit Report

Audit date: 2026-06-27

Scope: static repository review against the requirements in `CEO.md`. No Lighthouse run, deployment checks, or live-domain verification were performed, so performance and domain-level items are judged from code and config evidence only.

## Executive Summary

Current status: the site is not release-ready from a Technical SEO perspective.

The largest blockers are:

1. The app is explicitly blocked from indexing via `noindex, nofollow` in `index.html`.
2. Services do not have dedicated URLs; they are grouped into a single `/services` page.
3. Multilingual SEO URL structure is not implemented even though translations exist in-app.
4. Canonical, `hreflang`, structured data, `robots.txt`, and favicon implementation are missing from the repo.

## Checklist Results

| # | Requirement | Status | Notes |
|---|---|---|---|
| 1 | Dedicated service pages | FAIL | Only one route exists for services: `/services` in `src/app/routes.tsx:37`. Individual service cards are sections/cards inside the page, not separate URLs (`src/app/pages/Services.tsx:221-298`). Footer service links also point back to `/services` (`src/app/components/Footer.tsx:19-27`). |
| 2 | Website performance | PARTIALLY PASS | No PageSpeed or Lighthouse evidence is present. Static analysis shows risk: large hero background images from Unsplash (`src/app/components/PhotoSlider.tsx:90-91`), many remote images across pages, no visible lazy loading attributes, and client-side Sanity fetching after render (`src/hooks/useSanityData.ts:8-17`). |
| 3 | Mobile friendliness | PARTIALLY PASS | The UI uses responsive Tailwind layouts and a mobile menu, which is positive. I did not find evidence of an obvious desktop-only layout issue, but this was not verified in a browser/device lab. |
| 4 | Static core pages | PASS | Dedicated routes exist for `/about` and `/contact` (`src/app/routes.tsx:34,40`) and both are linked in footer/nav (`src/app/components/Footer.tsx:9-17`, `src/app/components/Navbar.tsx:8-15`). |
| 5 | Preferred domain | FAIL | No canonical domain declaration, canonical tags, redirect rules, or host-level config were found in the repo. |
| 6 | Search engine indexing | FAIL | `index.html` contains `<meta name="robots" content="noindex, nofollow" />` (`index.html:10`). No `robots.txt` file was found in the project root/public output sources. |
| 7 | SEO-friendly URLs | PASS | Current public routes are readable Latin slugs such as `/about`, `/services`, `/blog`, `/contact` (`src/app/routes.tsx:33-42`). |
| 8 | Heading structure | PARTIALLY PASS | Several pages follow a reasonable `h1`/`h2` structure, but not all. Home gets its `h1` from `PhotoSlider` (`src/app/components/PhotoSlider.tsx:109-111`) and includes multiple `h2`s; however `Doctors.tsx`, `Reviews.tsx`, and `BeforeAfter.tsx` expose an `h1` but no `h2`, based on repository-wide heading scan. |
| 9 | Primary language URL structure | PASS | The default route tree has no language prefix for the primary experience (`src/app/routes.tsx:28-45`). |
| 10 | Secondary language URLs | FAIL | Translations are handled in client state with `i18next` and `localStorage`, not URL prefixes (`src/i18n/index.ts:7-17`, `src/app/components/Navbar.tsx:14-18,30-33`). No `/en/` or `/ru/` routes exist in `src/app/routes.tsx`. |
| 11 | hreflang | FAIL | No `hreflang` tags or alternate-language head links were found in the repo. |
| 12 | Favicon | FAIL | No favicon asset or favicon reference was found. |
| 13 | Structured data | FAIL | No JSON-LD, `LocalBusiness`, or `Organization` schema markup was found, including in the footer implementation (`src/app/components/Footer.tsx:29-112`). |

## Priority Fix Order

1. Remove the `noindex, nofollow` directive and add a valid `robots.txt`.
2. Create dedicated service detail pages with unique URLs and unique copy.
3. Add metadata management: per-page title, description, canonical, Open Graph, and `hreflang`.
4. Implement multilingual routing with URL prefixes for secondary languages.
5. Add favicon and JSON-LD for `LocalBusiness` and `Organization`.
6. Optimize image delivery and reduce client-side content dependence for key landing pages.

## Notes and Assumptions

- This audit is based on repository contents only.
- Domain redirect behavior and production indexing behavior could differ if external hosting configuration exists outside this repo.
- Performance status should be rechecked with Lighthouse/PageSpeed once a deploy preview exists.
