# Implementation status

## Completed locally

- Browser-only IAM sandbox with employee, manager and administrator roles, a permission matrix, scoped decisions, in-memory action log, reset and EN/VI copy.
- Independent policy module with README, tests, MIT license and no private/company source.
- CV PDF generation during the static build, in English and Vietnamese, from the actual `resume.html` DOM and shared translations/CSS.
- PDF verification: one page in each language, all résumé paragraphs present, and rendered-page inspection.
- Umami configured for the confirmed production domain, with event allowlists, URL-data minimization, privacy signals and an opt-out control. Local and preview domains are excluded.
- Confirmed “Open to remote backend roles”, Vietnam/UTC+7 and working hours by arrangement in both languages.
- Static Markdown blog with three bilingual technical notes, distinct page metadata and homepage links.
- Brand kit: avatar, monograms, LinkedIn banner, GitHub social image, shared tagline and palette; CV/web/social image updated.

## Remaining external steps

| Item | Remaining input/action |
| --- | --- |
| Live analytics verification | Production domain and public Website ID are configured. After Vercel publishes this change, confirm real visits/events in the owner's Umami dashboard. No synthetic production events are sent by tests. |
| Account branding | Upload the prepared images to GitHub/LinkedIn and choose the GitHub social preview. Profile tools/browser access were unavailable; no accounts were changed. |
| Separate open-source repository | The library is ready in `lib/iam-policy/`. A separate GitHub repository and npm publication have not been created. The connected GitHub tool set does not expose repository creation, and `gh` is not installed. |
| Production PDF/hosting verification | Windows PDF generation is verified. Execute the configured Linux build on Vercel and verify the published PDF URLs after deployment. |
| Interactive visual QA | DOM and policy tests pass; connected browser UI access was unavailable. Review mobile/desktop layout in the actual browser before release. |

## Evidence still needed from the earlier project-content task

Phishing Detector still needs its own source, dataset/split and evaluation outputs. `DOAN_CYBERSEC-main.zip` contains IAM data, not a phishing URL test set. No accuracy/F1 numbers have been invented.

Actual project screenshots/videos are still pending from the home laptop. `docs/DEMO_CAPTURE.md` contains the capture scripts. The sandbox is labeled as an educational simulation and is not offered as proof of the original AD integration running.
