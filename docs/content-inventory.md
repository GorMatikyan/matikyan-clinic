# Matikyan Clinic Content Inventory

This document is the current content map for the site. Use it to work with management page by page.

## Recommendation

- Use `Sanity` for `Blog` only.
- Use `Google Sheets` as the editorial source for all static pages.
- Keep code/i18n as the rendering layer after content is approved.

## Important Current State

- The existing sheet in `/Users/macbook/Downloads/home-page - home-page.csv` covers only the `Home` page plus shared header/footer items.
- `hy.json` and `ru.json` are still English copies. They are not translated yet.
- A lot of page content still lives in hardcoded arrays in React files.

## Source Map

### Shared / Global

- Navigation labels: [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:1)
- Footer labels and contact text: [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:1)
- Header UI: [src/app/components/Navbar.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/components/Navbar.tsx:1)
- Footer UI: [src/app/components/Footer.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/components/Footer.tsx:1)

### Home

- Page structure: [src/app/pages/Home.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/Home.tsx:1)
- Text source: [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:1)
- Slider fallback content: [src/app/components/PhotoSlider.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/components/PhotoSlider.tsx:1)
- Existing sheet draft: [/Users/macbook/Downloads/home-page - home-page.csv](/Users/macbook/Downloads/home-page%20-%20home-page.csv:1)

### About

- Page structure: [src/app/pages/About.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/About.tsx:1)
- Most text source: [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:1)
- Images are hardcoded in page component
- Stats values `8,400+ / 18 / 99%` are hardcoded in page component

### Doctors

- Page structure and fallback data: [src/app/pages/Doctors.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/Doctors.tsx:1)
- Header labels: [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:1)
- Doctor records currently live in hardcoded array
- Sanity fallback exists, but page can be managed more simply via sheet if you do not want doctors in CMS

### Services

- Page structure and fallback data: [src/app/pages/Services.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/Services.tsx:1)
- Header/CTA/UI labels: [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:1)
- Service records currently live in hardcoded array

### Reviews

- Page structure and fallback data: [src/app/pages/Reviews.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/Reviews.tsx:1)
- Header/stats labels: [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:1)
- Review records currently live in hardcoded array

### FAQ

- Page structure and fallback data: [src/app/pages/FAQ.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/FAQ.tsx:1)
- Header/category/CTA labels: [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:1)
- FAQ questions/answers currently live in hardcoded grouped object

### Contact

- Page structure: [src/app/pages/Contact.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/Contact.tsx:1)
- Text source: [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:220)
- Doctor dropdown options are hardcoded in page component
- Emergency phone link and some contact values are hardcoded alongside translated labels

### Blog

- Page structure and fallback posts: [src/app/pages/Blog.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/Blog.tsx:1)
- UI labels: [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:220)
- This is the best Sanity-managed page

## What Management Should Edit Page by Page

### 1. Common

Create a `Common` tab for:

- nav labels
- phone
- footer description
- address
- email
- hours
- copyright
- privacy/terms labels

### 2. Home

Create or keep a `Home` tab for:

- slider 1-4 text
- slider CTA labels
- slider image replacements
- stats
- service overview card titles/descriptions
- why choose us section
- testimonials
- CTA banner

### 3. About

Create an `About` tab for:

- hero badge/title/desc1/desc2
- hero stats values
- values section items
- milestones timeline items
- CTA block
- about page images

### 4. Doctors

Create a `Doctors` tab for structured doctor records:

- name
- title
- specialty
- experience
- rating
- reviews count
- education
- short bio
- photo
- sort order

### 5. Services

Create a `Services` tab for structured service records:

- category
- title
- tagline
- description
- price
- duration
- rating
- image
- benefits list
- sort order

### 6. Reviews

Create a `Reviews` tab for structured review records:

- patient name
- rating
- date
- service
- review text
- source
- avatar
- featured

### 7. FAQ

Create a `FAQ` tab for structured FAQ items:

- category
- question
- answer
- order

### 8. Contact

Create a `Contact` tab for:

- header badge/title/description
- form labels/placeholders
- clinic info block
- emergency block
- doctor dropdown labels

### 9. Blog

Use `Sanity` for:

- title
- category
- excerpt
- author
- publishedAt
- featured
- read time
- image
- article body

## Suggested Spreadsheet Structure

Use one tab per page plus one shared tab:

- `Common`
- `Home`
- `About`
- `Doctors`
- `Services`
- `Reviews`
- `FAQ`
- `Contact`
- `Blog Notes` (optional editorial planning only)

## Suggested Columns

### For text-driven tabs

- `key`
- `section`
- `element`
- `EN`
- `HY`
- `RU`
- `notes`
- `current source`

### For structured record tabs

- `type`
- `slug_or_id`
- `order`
- `field`
- `EN`
- `HY`
- `RU`
- `image`
- `notes`

Better alternative for structured tabs like `Doctors` and `Services`:

- one row per record
- separate columns for each field
- duplicate multilingual fields where needed

Example for `Doctors`:

- `order`
- `name_en`
- `name_hy`
- `name_ru`
- `title_en`
- `title_hy`
- `title_ru`
- `specialty_en`
- `specialty_hy`
- `specialty_ru`
- `experience`
- `rating`
- `reviews`
- `education_en`
- `education_hy`
- `education_ru`
- `desc_en`
- `desc_hy`
- `desc_ru`
- `photo_url`

## Practical Fit: Sheet vs Sanity

### Good candidates for sheet-managed static content

- Home
- About
- Contact
- Footer/Common
- FAQ
- Doctors
- Services
- Reviews

### Good candidates for Sanity

- Blog posts
- later, maybe media-heavy editorial content

### Bad candidates for Sanity in this project right now

- every nav label
- every CTA string
- all multilingual UI labels

Those are easier to review in sheets and easier to ship through `i18n` JSON.

## Gaps Before Management Can Work Efficiently

1. `HY` and `RU` content is not actually translated yet.
2. Only `Home` has a sheet draft.
3. Real clinic business data is still placeholder in many places:
   - phone
   - address
   - email
   - hours
   - some stats
4. Images are only partially documented.

## Recommended Working Method

1. Freeze Sanity scope to `Blog`.
2. Build one spreadsheet tab per page.
3. Extract current EN content from code into those tabs.
4. Have management fill `HY` and `RU`.
5. Update code from approved sheet content.

## Immediate Next Step

Create the missing page tabs and extract the current English content into them from:

- [src/i18n/locales/en.json](/Users/macbook/Downloads/matikyan-clinic/src/i18n/locales/en.json:1)
- [src/app/pages/About.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/About.tsx:1)
- [src/app/pages/Doctors.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/Doctors.tsx:1)
- [src/app/pages/Services.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/Services.tsx:1)
- [src/app/pages/Reviews.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/Reviews.tsx:1)
- [src/app/pages/FAQ.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/FAQ.tsx:1)
- [src/app/pages/Contact.tsx](/Users/macbook/Downloads/matikyan-clinic/src/app/pages/Contact.tsx:1)

If you want, the next concrete step is for me to generate the actual CSV files for each page tab so you can give them directly to management.
