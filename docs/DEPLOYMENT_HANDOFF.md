# Matikyan Clinic Deployment Handoff

Last updated: 2026-07-27

## Project Type
- Frontend: React + Vite static site
- Repo root: `/Users/macbook/Downloads/matikyan-clinic`
- Main deploy artifact: `dist/`

## Current Branch Model
- `main`
  - production-safe branch
  - should target `matikyan.am`
- `stage`
  - staging branch
  - should target `clinic.matikyan.am`

## Branch Intent
- Shared production-safe source changes belong on both branches.
- Staging-only behavior should go on `stage` only.
- Local staging artifacts must not be committed.

## Git Ignore Rules Added
These were added so staging packaging does not pollute the repo:
- `.DS_Store`
- `staging-dist/`
- `clinic.matikyan.am-stage-*.zip`

## Source Changes That Should Stay
- `public/.htaccess`
  - required for Apache/cPanel SPA routing
  - needed for both staging and production
  - handles refresh/deep-link fallback to `index.html`

## cPanel Domain Layout Confirmed
From cPanel screenshots:

- `matikyan.am`
  - document root: `/public_html`
- `clinic.matikyan.am`
  - document root: `/clinic.matikyan.am`
- `dev.matikyan.am`
  - document root: `/public_html/dev`
- `staff.matikyan.am`
  - document root: `/public_html/staff`

## Staging Deployment Decision
Use `clinic.matikyan.am` as the long-lived staging host.

Reasons:
- already provisioned in cPanel
- separate document root from production
- HTTPS redirect already enabled

## Staging Folder Rules
Inside `/home2/matikyan/clinic.matikyan.am`:

Keep:
- `.well-known/`
- `acme-challenge/`
- `pki-validation/`

Remove or move out:
- old junk/infected backup content
- `matikyan.7-24.amvv`
- `matikyan.7-24.am.zip`

## Staging Artifact Created
Long-lived staging-safe zip was created locally:

- `clinic.matikyan.am-stage-longterm-2026-07-18.zip`

Purpose:
- safe to deploy to `clinic.matikyan.am`
- includes staging `noindex` protections

## Important Staging Behavior
The long-lived staging zip was intentionally modified outside tracked source to prevent indexing:

- `robots.txt`
  - `User-agent: *`
  - `Disallow: /`
- `.htaccess`
  - sets `X-Robots-Tag: noindex, nofollow, noarchive`
- `index.html`
  - contains fallback `<meta name="robots" content="noindex, nofollow, noarchive">`

Important:
- these staging `noindex` changes were applied only in the staging packaging copy
- they were not committed into tracked source
- production source behavior was not converted to staging mode

## Production Expectations
Production should remain normal and indexable on `matikyan.am`.

Production should keep:
- normal canonical behavior
- normal metadata
- sitemap
- hreflang
- robots rules for indexing
- structured data

Production should not inherit staging `noindex`.

## Current SEO / Routing Position
Already completed earlier:
- multilingual routing
- Armenian on `/`
- English on `/en/...`
- Russian on `/ru/...`
- canonical URLs
- hreflang
- structured data
- technical SEO baseline
- route-level code splitting
- homepage LCP work

## Known Deployment Caveat
The built site currently contains production-oriented absolute metadata defaults in generated HTML and SEO output.

This is acceptable for short-term staging review only if staging is blocked from indexing.

For long-term clean staging architecture, future work should add environment-aware handling for:
- base site URL
- canonical URLs
- sitemap/robots behavior
- staging `noindex`

That work should land on `stage` first, not directly on `main`.

## Recommended Future Deployment Model
Frontend:
- deploy `stage` branch to `clinic.matikyan.am`
- deploy `main` branch to `matikyan.am`

Backend:
- if used, prefer separate host/subdomain such as `api.matikyan.am`
- do not couple frontend static deploy and backend runtime assumptions

## Contact Form Status
Frontend:
- contact form is not yet wired end-to-end from this repo to a live backend

Separate backend work:
- a Spring Boot backend API was analyzed and partially prepared in another repo
- that backend work is not part of this frontend repo state

## Operational Rule For Future Sessions
If a future Codex session is preparing staging:
- do not commit staging-only zip artifacts
- do not commit staging-only `noindex` into `main`
- keep `public/.htaccess`
- prefer packaging staging-specific behavior separately unless proper environment-aware source handling is introduced

## Immediate Next Steps
1. Commit `.gitignore` and `public/.htaccess` on `main`.
2. Keep `stage` branch for staging-only source changes.
3. If staging remains long-lived, implement environment-aware SEO behavior on `stage`.
4. Before production deploy, generate a clean production build from tracked source, not from staging packaging copies.

## Fast Resume Summary
- Repo: React/Vite static site
- Branches: `main`, `stage`
- Staging host: `clinic.matikyan.am`
- Production host: `matikyan.am`
- Keep in source: `public/.htaccess`
- Do not commit: staging zip/build copies
- Staging `noindex` currently exists only in the staging zip package, not in tracked source
