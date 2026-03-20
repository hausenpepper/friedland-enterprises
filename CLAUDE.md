# Friedland Enterprises Website

## Quick Reference
- **Site**: https://friedlandenterprises.com
- **Stack**: Static HTML + Cloudflare Pages (Astro used for build tooling/sitemap)
- **Deploy**: Push to `main` → Cloudflare auto-deploys in ~1 min

## Content Map

The site is a single self-contained HTML file with all styles and scripts inline:

- **Homepage**: `public/index.html` — the entire site lives here
  - **Nav**: lines 273-287 — navigation links (Sectors, Services, Approach, Portfolio, Contact)
  - **Hero**: lines 289-298 — headline, subtitle, stats bar (25+ yrs, 4 Board Seats, 35+ Positions, US & LATAM)
  - **Sectors**: lines 302-330 — 6 sector cards (E-Commerce, Building Materials, Supply Chain, Real Estate, LATAM, Activist Microcap)
  - **Capabilities**: lines 334-356 — 5 service rows (Advisory, Board Governance, Direct Investment, Activist, Real Estate)
  - **Investment Approach**: lines 358-372 — 2-column thesis section
  - **Portfolio**: lines 374-436 — full portfolio grouped by: Operating Companies, Board Seats, Direct Investments, Fund LP Positions, Real Estate, Activist Microcap
  - **Contact**: lines 440-463 — email (hello@friedlandenterprises.com), location, social links
  - **Footer**: lines 465-468
  - **SEO/Schema**: lines 26-130 — Organization, Person, and Portfolio JSON-LD
  - **Styles**: lines 136-269 — all CSS in `<style>` block
  - **Scripts**: lines 470-493 — nav toggle + scroll reveal

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
| Update hero headline/stats | `public/index.html` — Hero section (~line 289) |
| Edit sector descriptions | `public/index.html` — Sectors section (~line 302) |
| Update capabilities | `public/index.html` — Services section (~line 334) |
| Add/remove portfolio item | `public/index.html` — Portfolio section (~line 374) |
| Change contact email | `public/index.html` — Contact section (~line 443) |
| Update social links | `public/index.html` — socials div (~line 445) |
| Change colors | `public/index.html` — :root CSS variables (~line 137) |
| Update SEO metadata | `public/index.html` — head meta tags (~line 6) |
| Update JSON-LD schema | `public/index.html` — script blocks (~line 26) |
| Change nav links | `public/index.html` — nav ul (~line 279) |

## Build & Dev Commands

```bash
npm run dev      # Local dev server with hot reload
npm run build    # Production build (run before pushing)
npm run preview  # Preview production build locally
```
