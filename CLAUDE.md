# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

`matikyan-clinic` is the public-facing website for Matikyan Dental Clinic — a React SPA, deployed as static files to cPanel hosting (no server process of its own). Its CMS/SEO backend and admin panel live in the **sibling** repo `../matikyan-website-service` (`backend/` + `admin/`) — see that repo's `CLAUDE.md` for backend architecture. Do not confuse it with `../medical-management-service`, which is a separate, unrelated clinic-ops CRM project (patients/appointments/doctors) that this website has no connection to and should never call into.

## Constraints that still apply

- **Pages, images, and the color palette are approved** — don't add/remove pages or replace images without a clear reason; minor cropping/format conversion (e.g. WebP) is fine.
- **Content/copy and UI/UX are open** to improve, as long as approved pages/images/colors are respected.

## Commands

```bash
npm run dev                                          # Vite dev server on :5173
CMS_API_BASE_URL=http://localhost:8080 npm run build  # prebuild (export-seo-files.mjs) + vite build
npx tsc --noEmit                                       # typecheck
npx vite preview --port 4173                           # serve the last build (does NOT interpret .htaccess)
```
`CMS_API_BASE_URL` defaults to `https://admin-matikyan.com` (prod) if unset — point it at a local backend (`http://localhost:8080`) for local builds.

## Architecture

### Data flow from the CMS backend
Two different mechanisms, depending on how often the data changes — see `../matikyan-website-service/CLAUDE.md` for the full rationale:
- **Runtime fetch** (`src/lib/cmsApi.ts`): blog listing/detail, the contact form submit, and the 404-page's client-side redirect lookup (a safety net only — real 301s for crawlers come from `.htaccess`).
- **Build-time bake** (`scripts/export-seo-files.mjs`, runs as `prebuild`): site settings, page-SEO overlays, structured data (JSON-LD), sitemap, robots.txt, and the CMS-managed block of `.htaccess`. Written into `src/generated/*.json` (statically imported, not fetched — see `src/hooks/useSiteSettings.ts`, `src/app/components/SeoHead.tsx`, `src/app/components/StructuredData.tsx`) and `public/{sitemap.xml,robots.txt,.htaccess}`. These files are committed as fallback defaults so a fresh checkout / `npm run dev` always has valid data even with no backend reachable; a real build overwrites them.

### Routing and the three places a route must be kept in sync
`src/app/routes.tsx`'s `routeChildren` array is the single source of truth for what pages exist. Three other places mirror it and must be updated together when a route is added/removed:
1. `scripts/export-seo-files.mjs`'s `STATIC_ROUTES` array (sitemap generation).
2. `public/.htaccess`'s mod_rewrite whitelist (`# Known valid app routes only` block) — this is what makes unknown paths return a real HTTP 404 (`ErrorDocument 404` + `RewriteRule ^ - [R=404,L]`) instead of always 200.
3. Ideally a seeded `page_seo` row in `matikyan-website-service` (`db.changelog-3.2-seed-real-pages.xml`) so the admin Pages screen shows it.

### i18n
Primary language is Armenian (`hy`) with **no URL prefix**; secondary languages (`en`, `ru`) use `/en`, `/ru` prefixes (`src/app/routing.tsx`). Translation strings live in `src/i18n/locales/{hy,en,ru}.json`. Per-page static SEO defaults (title/description per language, used when no admin override exists) live in `src/app/seo.ts`'s `routeSeo` object — note admin overrides from `page_seo` are a single language-neutral value, so they take precedence over `seo.ts` for all three languages at once when present.

### Orphaned pages
`src/app/pages/Reviews.tsx` and `src/app/pages/BeforeAfter.tsx` are real, built page components that are **not routed or linked anywhere** — dead code from before the CMS work. Not part of the client's SEO spec; leave them as-is unless explicitly asked to wire them in or delete them.

## Current status (as of the matikyan-website-service split)

All 20 mandatory + 5 desirable technical-SEO spec items are implemented and locally verified, except:
- **PageSpeed score / LCP** and **HTTPS** — can't be verified without a real deployed URL.
- The `.htaccess` real-404 and canonical-domain (www→non-www) redirect rules are written and reviewed but **never runtime-tested against real Apache** — `vite preview` doesn't interpret `.htaccess` at all.
- Deploy is not configured — `matikyan-website-service`'s deploy env vars (git repo URL, SFTP host/credentials) are all blank.

Next planned step (not started): a full content pass across all pages in all three languages — wording, and text/image placement review — before the first real deploy.
