# Friedland Enterprises Website

## Quick Reference
- **Site**: https://friedlandenterprises.com
- **Stack**: Astro v5 + Tailwind v4 + Cloudflare Pages
- **Deploy**: Push to `main` → Cloudflare auto-deploys in ~1 min

## Content Map

All site content lives in clearly labeled sections. Edit these files for content changes:

- **Homepage**: `src/pages/index.astro`
  - Hero section — name, tagline, CTA
  - About section — bio paragraphs
  - Focus Areas section — 4 investment focus cards
  - Contact section — email and CTA text
- **Navigation links**: `src/components/Header.astro` (navLinks array at top)
- **Footer**: `src/components/Footer.astro`
- **SEO metadata**: `src/layouts/BaseLayout.astro` (title, description, OG tags)
- **Colors & fonts**: `src/styles/global.css` (@theme block)
- **Images**: Place in `src/assets/images/`, import in page files

## Workflow: Making Changes

After ANY content or code change, always:
1. Edit the relevant file(s)
2. Run `npm run build` to verify no errors
3. Commit with a clear, descriptive message
4. Run `git push origin main`
5. Tell the user: "Changes pushed — site will be live in ~1 minute at friedlandenterprises.com"

## Adding a New Page

1. Create `src/pages/[name].astro`
2. Import and wrap content in `BaseLayout`
3. Import `Header` and `Footer` components
4. Add a nav link in `src/components/Header.astro` (navLinks array)
5. Build, commit, push

## Common Tasks

| Task | Where to Edit |
|------|--------------|
| Update bio text | `src/pages/index.astro` — About section |
| Change tagline | `src/pages/index.astro` — Hero section |
| Edit focus areas | `src/pages/index.astro` — Focus Areas section |
| Change contact email | `src/pages/index.astro` — Contact section |
| Update nav links | `src/components/Header.astro` — navLinks array |
| Change colors | `src/styles/global.css` — @theme block |
| Update SEO description | `src/layouts/BaseLayout.astro` — description default |
| Add an image | Place in `src/assets/images/`, import in the page |

## Build & Dev Commands

```bash
npm run dev      # Local dev server with hot reload
npm run build    # Production build (run before pushing)
npm run preview  # Preview production build locally
```
