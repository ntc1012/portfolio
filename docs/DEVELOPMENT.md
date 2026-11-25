# Development and publishing

The public README introduces the portfolio. This document covers implementation and configuration.

## Local setup

Use Node.js 22.17+, 24.x or 26.x, then `npm ci`. On Windows/macOS, PDF generation uses an installed Chrome/Edge renderer or `CHROME_EXECUTABLE_PATH`. Linux builds use the bundled `@sparticuz/chromium` renderer. The renderer uses a separate temporary profile, not a personal browser session.

```sh
npm run dev
npm test
npm run build
npm run verify:pdf
```

`npm run dev` prepares notes, configuration and PDFs before starting the local server at `http://127.0.0.1:4173`. `npm start` starts only the server; run `npm run dev` first in a fresh checkout.

The static production output is `dist/`. Vercel is configured to run `npm run build` and serve this directory. Chromium, dependencies, Markdown sources, test code and private project source are not deployed to visitors.

## One source for the résumé

Edit `resume.html`; the shared Vietnamese translations are in `script.js`. `scripts/resume-document.mjs` applies the same language behavior to the real résumé DOM. Both PDFs are printed from that document with the shared CSS and a bundled OFL-licensed Noto Sans font.

The build produces `dist/assets/resume-en.pdf` and `dist/assets/resume-vi.pdf`. Generated copies in `assets/` support local preview and are ignored by Git. They are never a separately maintained CV. Build failures stop publication rather than silently using an old PDF.

`npm run verify:pdf` checks one page per language, compares every translated résumé paragraph with extracted PDF text, and renders page PNGs in `tmp/resume-qa/` for visual inspection. Local Windows generation and both PDF pages were checked. The Linux/Vercel build path is configured but has not been executed on a remote deployment in this task.

## Technical notes

Add paired files under `content/posts/`, such as `example.en.md` and `example.vi.md`. Each starts with JSON frontmatter between `---` lines: `slug`, `title`, `description`, `date` (YYYY-MM-DD) and `tags`.

`scripts/build-blog.mjs` creates `/blog/` and one static page per slug, with distinct metadata and both language versions. Raw HTML in Markdown is escaped; executable link protocols are rejected. Local generated `blog/` files are ignored. The build updates the latest-note cards from post metadata.

## IAM sandbox and reusable library

`sandbox.js` mounts the interactive model in the IAM case study. It does not call a server, read real HR data or change AD permissions. Decisions and a maximum of five log entries stay in memory and reset on reload.

The evaluator lives in `lib/iam-policy/` with its own package metadata, README, MIT license and tests. The license covers that new module only. To make a separate repository, copy that directory, retain its tests and license, then create and push the new repository. No RedOne Media code was extracted.

## Optional analytics

Analytics is disabled in `site.config.json`. No tracker is loaded and no analytics requests are sent in the default configuration. An Umami account/site has not been created or connected.

After creating your own Umami website, copy its public script URL and website ID into:

```json
{
  "enabled": true,
  "provider": "umami",
  "scriptUrl": "https://your-analytics-host.example/script.js",
  "websiteId": "your-website-uuid",
  "domains": ["your-portfolio-domain.example"]
}
```

These are placeholders for documentation, not live configuration. Do not add an API key. Rebuild after changing configuration. HTTPS, a website ID and explicit production domains are required; local preview never sends analytics.

Allowed events are perspective selection, project/note opens, PDF downloads and sandbox role selection. Payloads exclude URL queries/fragments, referrers, arbitrary event fields and personal identifiers. DNT, Global Privacy Control and the footer opt-out prevent tracking. Automatic tracking, replay/performance and error capture are not enabled. The service still handles incoming network requests according to its own server configuration.

## Availability and visual identity

`site.config.json` stores the confirmed remote-job status, UTC+7 timezone, bilingual working-hours text and canonical tagline. No exact working hours have been invented.

Run `npm run assets` to generate `assets/brand/`: avatar, light/dark monograms, LinkedIn banner, GitHub social image and identity/color metadata. The generated social image is also used by the website. Font text in shared SVG banners is converted to paths so viewers do not need the brand font installed.

Profile images and banners still need to be applied in the GitHub/LinkedIn accounts. No account profile has been changed automatically.
