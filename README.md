# Nguyen Tien Cuong — Portfolio

A static, bilingual portfolio for a backend developer. English is the default; Vietnamese is available through the EN / VI controls.

## Run locally

Use Node.js 20.11 or later:

```sh
npm install
npm run dev
```

Open `http://127.0.0.1:4173`. The production website itself has no JavaScript package dependencies and can also be served by a static host.

## Build and check

```sh
npm test
npm run build
```

The build copies only public site files into `dist/`. `npm run assets` regenerates the committed Open Graph PNG from its SVG source.

## Experience

- Recruiter and Engineer perspectives; no authentication is required. Engineer reveals implementation notes and design considerations.
- The homepage stays concise; `/projects/iam/` and `/projects/youtube-automation/` contain project stories with distinct titles and descriptions.
- YouTube Automation is professional work at RedOne Media. IAM, phishing detection and the additional projects are personal work. Personal project does not imply sole authorship; the phishing project retains the supplied two-person team attribution.
- Share perspectives through `#recruiter` and `#engineer`; use `?lang=vi#engineer` for Vietnamese technical content.
- The opening is a brief greeting, a two-line introduction and two links, positioned toward the upper part of the hero to reduce the empty space below the header. A large avatar sits to the right and is cropped at the hero edge. On small screens it sits below the copy. The perspective selector appears within the work section; technical diagrams appear alongside projects.
- The avatar uses its original charcoal face, silver glasses, ivory eye marks and olive jacket in both themes, with a subtle outline in dark mode. Only the bottom edge fades into the background. It has brief blink, gaze and click interactions. Reduced-motion preferences are respected.
- Dark and light themes, keyboard-operable native controls, visible focus indicators, and a skip link.
- Homepage sections have distinct visual structures: project gallery, olive-tinted About band with an experience timeline, toolkit grid, and a navy Contact band in both themes.
- English Recruiter content remains readable without JavaScript.
- `resume.html` is a bilingual public résumé. Its Print / Save PDF button opens the browser print dialog. The original private CV is not included in the repository.

## Content

Main content is in `index.html`; project stories are in `projects/*/index.html`; Vietnamese translations and shared behavior are in `script.js`. Résumé content is in `resume.html`, with corresponding translations in `script.js`. Language and perspective are retained in links between pages. `assets/avatar.svg` provides the original static avatar; `assets/avatar-backdrop.svg` provides the transparent background variant. The hero has an inline version of the background variant for animation and theme colors.

IAM links to `ntc1012/DOAN_CYBERSEC`. Implementation notes were checked against `app.py` and `sync_hr_ad.py`: Flask, MySQL, ldap3, AD synchronization, TOTP and audit routes. YouTube Studio fallback is described as in development. No unverified model performance or business metrics are claimed. Private repositories are not exposed as public source links.

## Vercel

Import this repository as a static project. The committed `vercel.json` uses `npm run build` and publishes `dist/`. No server, database, or runtime environment variables are needed. Deployment is not performed by the local build.

Before public release, visually review both languages at mobile and desktop widths, test the print layout, confirm project facts and certifications, and check the social preview at the final domain. Browser preview was unavailable in the implementation environment; DOM tests do not verify visual layout or real keyboard focus behavior.
