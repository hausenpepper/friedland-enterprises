# Friedland Enterprises Website

Static site at **https://friedlandenterprises.com**.

- **Hosting:** Cloudflare Pages (auto-deploys from this repo's `main` branch)
- **Stack:** Plain HTML in `public/` with a thin Astro shell for build/sitemap
- **Deploy time:** ~1 minute after `git push origin main`

---

## Quick start

```bash
git clone https://github.com/hausenpepper/friedland-enterprises.git
cd friedland-enterprises
npm install
npm run dev        # local preview at http://localhost:4321
```

Edit any file in `public/`, then:

```bash
npm run build      # always run this first, catches syntax errors
git add <files>
git commit -m "Update: <what changed>"
git push origin main
```

Cloudflare Pages picks up the push and the site is live in about a minute. No deploy button to press, no Cloudflare account needed.

---

## File map

| Path | What it is |
|------|------------|
| `public/index.html` | Homepage. Self-contained, inline CSS and JS. |
| `public/investments.html` | `/investments` page. LVLU thesis, live stock price, PDF downloads. |
| `public/careers.html` | `/careers` page. |
| `public/documents/` | PDF reports (LVLU analysis files). Linked from `investments.html`. |
| `public/images/` | Logo and brand assets. |
| `public/_headers` | Cloudflare HTTP headers config. |
| `public/robots.txt`, `favicon.*` | Standard static assets. |
| `functions/api/stock.js` | Cloudflare Pages Function. Powers the live stock price on `/investments`. |
| `wrangler.jsonc` | Cloudflare Pages config. |
| `astro.config.mjs`, `src/`, `package.json` | Astro tooling. The actual pages live in `public/`, Astro just builds. |

All three public HTML pages (`index.html`, `investments.html`, `careers.html`) are intentionally self-contained: HTML, CSS, and JS inline in one file. No build step processes them, no component library, no framework. This is on purpose. Keep them that way unless we decide otherwise.

---

## Common edits

| Want to... | Edit this |
|------------|-----------|
| Update homepage copy | `public/index.html` |
| Update LVLU thesis numbers, targets, scorecard | `public/investments.html` |
| Add a new published PDF | Drop in `public/documents/`, then add a download block in `investments.html` |
| Update stock symbol or add a new ticker | `public/investments.html` (find the `fetchPrice` JS at the bottom) |
| Change colors/typography | CSS variables at the top of each HTML file's `<style>` block |
| Update social links / contact email | `public/index.html`, bottom contact section |

---

## Style conventions

- **No em dashes** in copy. Use periods, colons, semicolons, or "and." This is a hard rule on this site.
- Match the existing typography (DM Serif Text for display, Archivo for body).
- Keep the gold (`#A88B3A`) and warm neutral palette. No SaaS gradients, no startup illustrations.
- Don't add third-party analytics, tracking scripts, or marketing pixels without asking Christian.
- Don't add a logo wall or "client" carousel.

---

## Don't touch without asking

- **`public/documents/LVLU-Independent-Analysis-*.pdf`** — published shareholder analysis. These tie to SEC filings and the activist record. Updates need Christian's sign-off on content.
- **`functions/api/stock.js`** — powers live pricing. Breaking it shows "Price unavailable" on the investments page.
- **`wrangler.jsonc`** and **Cloudflare Pages dashboard settings** — affects DNS, custom domain, and build pipeline.

---

## If something breaks

- **Local build fails:** Run `npm run build` and read the error. Usually a typo in HTML.
- **Push succeeded but site didn't update:** Check the Cloudflare Pages dashboard for the deploy log. Christian has access.
- **Live stock price shows "Price unavailable":** The `/api/stock` function is erroring. Check `functions/api/stock.js` and the Cloudflare Functions logs.
- **Stuck:** Ping Christian on Slack or text.

---

## Architecture notes

The site predates having a real framework. Each page is one HTML file with inline styles. Astro is here for the build pipeline and the sitemap plugin, not because the pages use Astro components. If we ever want to share a real component (nav, footer), the conversion path is to extract them into `src/components/*.astro` and create `src/pages/*.astro` entry points. Until then, the inline approach is faster to edit and ships zero JS the browser doesn't need.
