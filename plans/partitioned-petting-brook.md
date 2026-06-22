# Dental Clinic Redesign Plan

## Context

The current site uses `#8DBF8A` (eucalyptus sage green) as its brand accent. This color reads as a wellness/spa palette rather than a stomatology clinic. The user wants the site to feel like a professional dental clinic. The only constraints are: keep the logo (white PNG with CSS filter) and keep the navy `#0F1932` primary color.

---

## 1. New Accent Color

Replace `#8DBF8A` → `#14B8A6` (Tailwind teal-500). This is the single biggest transformation:
- Used in healthcare UI globally; strongly associated with oral hygiene/toothpaste/dental brands
- Pairs cleanly with navy `#0F1932`
- Replaces ~142 occurrences across 14 files

**How:** One shell command via Bash:
```bash
find /workspaces/default/code/src -type f \( -name "*.tsx" -o -name "*.css" \) \
  -exec sed -i 's/#8DBF8A/#14B8A6/g' {} +
```
Then verify with `grep -r "#8DBF8A" src/` → zero results.

Also update `--sage: #8DBF8A` → `--sage: #14B8A6` in `src/styles/theme.css`.

---

## 2. Home Page — Emoji → Lucide Icons (Services Grid)

In `src/app/pages/Home.tsx`, the 6 service cards use emoji (`🦷`, `✨`, etc.) as icons. Replace with Lucide icons inside a teal icon box:

```tsx
// Before
<div className="text-3xl mb-4">🦷</div>

// After
<div className="w-11 h-11 rounded-xl bg-[#14B8A6]/15 flex items-center justify-center mb-4">
  <Tooth className="w-5 h-5 text-[#14B8A6]" />
</div>
```

Icon mapping (all from `lucide-react`):
- Dental Implants → `Drill` or `Zap`
- Teeth Whitening → `Sparkles`
- Orthodontics → `Smile`
- Root Canal → `Microscope`
- Dental Crowns → `Shield`
- Pediatric Dentistry → `Heart`

---

## 3. Slider — Source Real Dental Images

`src/app/components/PhotoSlider.tsx` currently uses Unsplash photo IDs. Search Unsplash with these queries to find the best IDs:
1. `"dental clinic interior modern"` — for the Technology slide
2. `"dentist patient smile"` — for the Cosmetic slide
3. Keep existing slides 1 and 4 if they already show dental chairs/teeth

Update the `src` fields in the `slides` array with the found Unsplash photo URLs.

---

## 4. About Page — Certifications Row

In `src/app/pages/About.tsx`, insert a certifications row between the stats block and the CTA button. This adds instant medical institutional credibility:

```tsx
// 4-item trust row, flex with dividers
[ShieldCheck] ISO 9001 Certified  |  [Award] ADA Member Practice  |  [Star] Top Rated 2025  |  [Globe] 3D Digital Imaging
```

Icons in `text-[#14B8A6]`, labels in `text-[#0F1932]`, light `border-[#0F1932]/8` dividers between items.

---

## 5. Contact Page — Emergency Card

In `src/app/pages/Contact.tsx`, the emergency card currently uses `bg-[#8DBF8A]` (post-swap: `bg-[#14B8A6]`). For a dental emergency, use a stronger visual signal:

Change from: `bg-[#14B8A6]` background  
Change to: `bg-[#0F1932]` background with `border-l-4 border-[#14B8A6]` left accent

This makes the emergency callout feel urgent and distinct from general brand elements.

---

## 6. PhotoSlider Copy Touchup

Ensure slide titles use properly dental-clinical language. If the current slides say things like "Healthy Smile Journey" etc., update to something like:
- Slide 1: "Advanced Implantology" — Permanent, natural-looking results
- Slide 2: "State-of-the-Art Technology" — Digital X-ray, 3D scanning, pain-free
- Slide 3: "Cosmetic Excellence" — Professional whitening, porcelain veneers
- Slide 4: "Modern Orthodontics" — Invisalign & traditional braces

---

## Files to Modify

| File | Change |
|---|---|
| `src/styles/theme.css` | `--sage` hex value |
| All 13 TSX files in `src/` | Global hex replace via bash |
| `src/app/pages/Home.tsx` | Emoji → Lucide icons in services grid |
| `src/app/pages/About.tsx` | Add certifications trust row |
| `src/app/pages/Contact.tsx` | Emergency card background/border style |
| `src/app/components/PhotoSlider.tsx` | New Unsplash image IDs + slide copy |

---

## Verification

1. `grep -r "#8DBF8A" src/` → zero results
2. Check browser DevTools: `--sage` on `:root` = `#14B8A6`
3. Visually check: Home featured testimonial card, Reviews stats bar, Services CTA band, Contact emergency card
4. Click all nav filter tabs (Services, Doctors) — active pill should render teal
5. Focus any Contact form input — border should turn teal
