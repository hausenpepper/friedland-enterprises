---
name: update-site
description: Make a content or design change to the Friedland Enterprises website and deploy it. Use when the user describes any change to their site in natural language.
user_invocable: true
---

# Update Site

The user wants to update their website. Follow this workflow:

1. **Understand the change** — Parse the user's natural language description to determine what needs to change (text, layout, styling, new section, new page, etc.)

2. **Locate the right file** — Use the Content Map in CLAUDE.md to find the exact file and section to edit. Key files:
   - Homepage content: `src/pages/index.astro`
   - Navigation: `src/components/Header.astro`
   - Layout/SEO: `src/layouts/BaseLayout.astro`
   - Theme/colors: `src/styles/global.css`
   - Footer: `src/components/Footer.astro`

3. **Make the edit** — Edit only what's needed. Preserve existing structure and styling unless the user asked to change it.

4. **Build** — Run `npm run build` to verify the change compiles without errors. If it fails, fix the issue before proceeding.

5. **Commit and push** — Stage the changed files, commit with a descriptive message, and push to main:
   ```
   git add [changed files]
   git commit -m "Update: [brief description of change]"
   git push origin main
   ```

6. **Confirm** — Tell the user exactly what changed and that it will be live at friedlandenterprises.com in ~1 minute.

## Important
- Always read the file before editing it
- Only change what the user asked for — don't refactor or "improve" surrounding code
- If the user's request is ambiguous, ask for clarification before editing
- Always run `npm run build` before committing
- Always push after committing so changes deploy
