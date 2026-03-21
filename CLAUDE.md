# Friedland Enterprises Website

## Quick Reference
- **Site**: https://friedlandenterprises.com
- **Stack**: Static HTML + Cloudflare Pages (Astro used for build tooling/sitemap)
- **Deploy**: Push to `main` → Cloudflare auto-deploys in ~1 min

## Content Map

The site is a single self-contained HTML file with all styles and scripts inline:

- **Homepage**: `public/index.html` — the entire site lives here
  - **Nav**: lines 228-240 — navigation links (Sectors, Services, Approach, Contact)
  - **Hero**: lines 242-250 — headline, subtitle, stats bar (25+ yrs, 4 Board Seats, US & LATAM)
  - **Sectors**: lines 254-282 — 6 sector cards
  - **Capabilities**: lines 286-308 — 5 service rows
  - **Investment Approach**: lines 310-324 — 2-column thesis section
  - **Contact**: lines 326-340 — email, location, social links
  - **Footer**: lines 342-345
  - **SEO/Schema**: lines 26-83 — Organization and Person JSON-LD
  - **Styles**: lines 89-222 — all CSS in `<style>` block
  - **Scripts**: lines 347-370 — nav toggle + scroll reveal

- **Static assets**: `public/` directory (robots.txt, favicon.svg, _headers)

## Workflow: Making Changes

After ANY content or code change, always:
1. Edit `public/index.html`
2. Run `npm run build` to verify no errors
3. Commit with a clear, descriptive message
4. Run `git push origin main`
5. Tell the user: "Changes pushed — site will be live in ~1 minute at friedlandenterprises.com"

## Common Tasks

| Task | Where to Edit |
|------|--------------|
| Update hero headline/stats | `public/index.html` — Hero section (~line 242) |
| Edit sector descriptions | `public/index.html` — Sectors section (~line 254) |
| Update capabilities | `public/index.html` — Services section (~line 286) |
| Change contact email | `public/index.html` — Contact section (~line 326) |
| Update social links | `public/index.html` — socials div (~line 330) |
| Change colors | `public/index.html` — :root CSS variables (~line 90) |
| Update SEO metadata | `public/index.html` — head meta tags (~line 6) |
| Update JSON-LD schema | `public/index.html` — script blocks (~line 26) |
| Change nav links | `public/index.html` — nav ul (~line 232) |

## Build & Dev Commands

```bash
npm run dev      # Local dev server with hot reload
npm run build    # Production build (run before pushing)
npm run preview  # Preview production build locally
```
