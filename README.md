# How to Get Started: Make This Project Your Website

This project is now converted into a placeholder-driven template.
You can make it yours by replacing the `brand_*`, `project_*`, `education_*`, and `emailjs_*` variables.

## 1) Copy the Template Into Your Own Working Directory

1. Copy this folder into your workspace.
2. Rename the folder to your project name (example: `my-portfolio-site`).
3. Open the folder in VS Code.

## 2) Understand the Placeholder Pattern

This template uses consistent variables so you can quickly search and replace.

Examples:
- `brand_name`
- `brand_domain`
- `brand_primary_role`
- `brand_primary_email`
- `project_1_title`
- `emailjs_public_key_here`

## 3) Fastest Rebrand Workflow (Recommended)

1. Use global search in VS Code (`Ctrl+Shift+F`).
2. Replace the highest-level brand values first:
- `brand_name`
- `brand_first_name`
- `brand_last_name`
- `brand_primary_role`
- `brand_country`
- `brand_city`
- `brand_region`
- `brand_domain`
- `brand_secondary_domain`
- `brand_primary_email`
- `brand_business_email`
3. Replace social/user handles:
- `brand_github_username`
- `brand_linkedin_username`
- `brand_x_username`
- `brand_telegram_username`
- `brand_facebook_username`
- `brand_instagram_username`
4. Replace content variables:
- `brand_meta_description`
- `brand_keywords_csv`
- `brand_professional_summary`
- `brand_company_name`
- `brand_company_description`
- `brand_local_language`
- `brand_additional_language`
5. Replace project variables (`project_1_*` to `project_8_*`).

## 4) Update About Me Properly

In the About section (in `index.html`), replace the instructional text with your own:
- Background and current role
- Core skills and tools
- Education/certifications
- Career goals or service focus
- A personal call to action

## 5) Update SEO and Metadata (Important)

The template includes comments in `index.html` telling you what to update.
Ask your AI agent to do this explicitly:

- Update all meta tags (title, description, keywords)
- Update Open Graph tags (`og:*`)
- Update Twitter tags (`twitter:*`)
- Update JSON-LD schema fields so they exactly match your real profile

If these are not updated, your SEO and social previews will be incorrect.

## 6) Replace Template Assets

Default generic asset filenames are already wired:
- `images/brand_logo.png`
- `images/brand_profile_photo.jpg`
- `images/brand_preview.png`
- `assets/brand_resume.pdf`

Replace those files with your real assets (same names), or change paths in `index.html`.

## 6.1) Favicons and App Icons (Use favicon.io)

Use https://favicon.io/ to generate all favicon/app icon files quickly.

Put these files in the project root (same level as `index.html`):
- `favicon.ico` (multi-size ICO)
- `favicon-16x16.png` (16x16)
- `favicon-32x32.png` (32x32)
- `apple-touch-icon.png` (180x180)
- `android-chrome-192x192.png` (192x192)
- `android-chrome-512x512.png` (512x512)

These names are already hardcoded in this template, so keep filenames exactly the same.

## 6.2) Social Share Preview Images (Very Important)

This template uses two preview image paths:
- Root social preview: `preview.png` (used by `og:image` and `twitter:image`)
- PWA/manifest/schema preview: `images/brand_preview.png`

Recommended size for social sharing:
- `1200x630` PNG (best for link previews across platforms)

If these files are missing or low quality, your shared links can look bad or show incorrect thumbnails.

## 7) Configure Contact Form (EmailJS)

In `js/contact.js`, replace:
- `emailjs_public_key_here`
- `emailjs_service_id_here`
- `emailjs_contact_template_id_here`
- `emailjs_autoreply_template_id_here`
- `brand_primary_email`

If you skip this, contact form sending will not work.

## 8) Domain Files Before Deployment

Update these files before publishing:
- `CNAME` -> set your real domain only (example: `yourdomain.com`)
- `sitemap.xml` -> replace `brand_domain` URLs
- `site.webmanifest` -> verify app name/description/preview values

Also verify:
- `index.html` JSON-LD schema blocks (`WebSite`, `ProfilePage`, `Person`, `BreadcrumbList`)
- all canonical/OG/Twitter URLs use your final domain

Why this matters:
- `sitemap.xml` helps search engines crawl important routes/sections
- `site.webmanifest` improves installability and PWA behavior
- JSON-LD schema helps Google and other bots understand your profile and content intent

## 9) Final Pre-Launch Checklist

1. Search workspace for `brand_` and confirm only intentional placeholders remain.
2. Search workspace for `project_` and fill all project cards.
3. Search workspace for `emailjs_` and verify credentials are set.
4. Open `index.html` in browser and verify:
- hero text
- about section
- project links
- contact links
- 404 page links
5. Validate mobile view and desktop view.

## 10) Optional: Prompt for Your AI Agent

Use this instruction with your AI agent:

"Replace all remaining placeholder variables (`brand_*`, `project_*`, `education_*`, `emailjs_*`) with my real details. Keep HTML/CSS/JS structure unchanged, update SEO meta + JSON-LD schema fully, and verify no placeholders remain except intentionally documented examples."

## 11) Full Automation Prompt (SEO + PWA + Schema + Favicons)

Use this prompt if you want your AI agent to do a complete production pass:

"Read my full workspace tree and update this portfolio template for production. Keep structure and styles intact. Do all of the following:
1. Replace all placeholders (`brand_*`, `project_*`, `emailjs_*`) with my provided real values.
2. Validate favicon and app icon setup. Ensure these root files are referenced and consistent:
	`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`.
3. Validate social preview images:
	- `preview.png` in root for OG/Twitter cards
	- `images/brand_preview.png` for manifest/schema where used
	Recommend or enforce 1200x630 for social sharing.
4. Rewrite all SEO fields in `index.html`: title, description, keywords, canonical, OG, Twitter.
5. Rewrite JSON-LD schema in `index.html` (`WebSite`, `ProfilePage`, `Person`, `BreadcrumbList`) with correct real data.
6. Update `site.webmanifest` so app name, description, icons, shortcuts, screenshot, and theme values are consistent.
7. Update `sitemap.xml` with correct final domain and meaningful metadata.
8. Verify there are no broken paths for icons/images/assets and no leftover personal identifiers from template author.
9. Return a final checklist of files changed and any remaining manual tasks."

## 12) Minimum Required Template Media Files

If someone else uses this template, these are the key files they should provide (same names):

Root directory:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `preview.png`

Inside `images/`:
- `brand_logo.png`
- `brand_profile_photo.jpg`
- `brand_preview.png`

Inside `assets/`:
- `brand_resume.pdf`

Optional media (only if you keep a certifications gallery):
- certificate image files referenced in your cards
