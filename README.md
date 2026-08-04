# onthegrow.ai — Marketing Site

Static marketing page for OnTheGrow.ai™, built to the OnTheGrow Visual Guidelines
(Work Sans; OTG Main Teal #39989e, Highlight Teal #75cbc4, Purple #6B529E,
Blush #f9eff6, Deep Purple #36294f, Onyx #333333) and the Leadership as
Infrastructure™ thesis.

- `index.html` — single-page site, self-contained (Google Fonts only external dependency)
- `favicon.svg` — hexagonal brand mark (SVG recreation; swap for designer original when available)

## Deploy

Hosted on AWS Amplify (manual deployment):

```sh
zip -r site.zip index.html favicon.svg
aws amplify create-deployment --app-id <APP_ID> --branch-name main
curl -H "Content-Type: application/zip" --upload-file site.zip "<zipUploadUrl>"
aws amplify start-deployment --app-id <APP_ID> --branch-name main --job-id <JOB_ID>
```

© 2026 OnTheGrow Leadership LLC.
