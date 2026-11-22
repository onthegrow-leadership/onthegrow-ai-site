# onthegrow.ai: Work Assignment Matrix email gate and Work Redesign Value Calculator

Prepared November 11, 2026. Needed live before 8:00 AM ET Thursday November 12 (post goes out linking to it).

## What this builds

Two additions. Part 1 is the matrix gate on Resources, needed Thursday morning. Part 2 is the calculator on Work With Us, needed before Monday. Ship Part 1 first if time is short.

### Part 1

A small email-for-download block on the existing **Resources** page. Visitor enters first name and email, the form posts to the GHL inbound webhook the site already uses, then the block swaps to a Download button for the Work Assignment Matrix PDF. Same pattern as the updates field on /reader.

## Standing rules

- No em dashes or en dashes in copy. Hyphens only in file names and URLs.
- Brand colors purple #36294F, teal #39989E. Font Work Sans. Match the existing Resources page section styling exactly.
- Build locally, preview on localhost, wait for "approved, ship it" before deploy.

## Before editing

1. Confirm `Work-Assignment-Matrix-OnTheGrow-v1.pdf` exists in `reader/files/`. If not, report it and stop. (Masters are in Dropbox.) Serve it from there; do not copy it elsewhere.
2. Find the GHL inbound webhook URL the /reader updates form uses. Reuse it. Do not invent one.
3. List every file you will create or change and wait for approval.

## The block

Place it at the top of the Resources page content, above the existing resources, as its own section.

- Eyebrow: FREE TOOL FROM THE BOOK
- Headline: **The Work Assignment Matrix**
- Paragraph: "The tool from Chapter 6. One page. List the tasks in one process and decide, task by task, what stays human, what AI assists, and what AI does with a named owner. Most AI rollouts skip this. It takes an afternoon."
- Fields: First name (required), Email (required). Button: **Send me the matrix**
- Small line under the button: "You'll also get the quarterly evidence updates. One email a quarter. Unsubscribe any time."

## Behavior

- On submit: POST to the GHL inbound webhook with `first_name`, `email`, `source: "resources-wam"`, and tag `wam-download`. Reuse the exact payload shape the /reader form sends so GHL maps it the same way.
- Basic validation in the browser: non-empty name, email contains @.
- On success: replace the form with: headline "Here's your matrix." and a **Download the Work Assignment Matrix (PDF)** button linking to `reader/files/Work-Assignment-Matrix-OnTheGrow-v1.pdf` with the `download` attribute. Under it: "Run it on one process this month. If it surfaces something you want a second set of eyes on, reply to the email you're about to get."
- Remember success in localStorage (key `otg-wam`) so a returning visitor sees the download button instead of the form.
- On error: keep the form, show "Something went wrong. Email liz@onthegrowleadership.com and I'll send it by hand."
- Keep the styles scoped to this block.

## Also

- Do not change the /reader page. The access-coded toolkit stays as is.
- Add a direct anchor so the post can link straight to it: the section id is `matrix`, so the URL is `onthegrow.ai/resources#matrix`.

## Part 2: Work Redesign Value Calculator on the Work With Us page

Also ship in this build. The file `roi-embed.html` (Liz will place it in the project folder) is a self-contained block: one `<div id="otg-roi">` with scoped styles and one script. No external dependencies beyond Google Fonts, which the site already loads.

### Placement
- Page: **Work With Us**. Insert as its own full-width section directly under the 90-day engagement block, above the contact or Calendly section.
- Section id: `calculator`, so the direct link is `onthegrow.ai/work-with-us#calculator`.
- Above the block, add a short intro in the page's existing section styling:
  - Eyebrow: THE BUSINESS CASE
  - Headline: **Work Redesign Value Calculator**
  - Paragraph: "Most AI tools count hours saved. This one shows what the redesign adds to EBITDA, and what that is worth at exit. Load the sample to see a shared services team at a 600-person company, or enter your own numbers."

### Rules
- Paste the block as is. Do not restyle it, rename ids, or move its script. Everything is scoped to `#otg-roi` so it will not change the rest of the page.
- The engagement fee field is blank by default and must stay blank. No price appears publicly.
- If the site uses a bundler or framework that strips inline scripts, load the block as a static HTML include or an iframe to a standalone page at `/calculator` that contains only the block, the site header, and footer. Prefer the inline include.
- Confirm "Load sample" works on the live page and shows the shared services example ($97,742 net EBITDA a year by year 3 on the default inputs, and $977K at 10x once the value at exit box is checked).

### Test
- Sample loads and the bottom line populates.
- Adding, editing, and clearing tasks works. CSV import works with the sample file the block generates.
- Fee field is blank on first load.
- Mobile: bottom line shows first, inputs are usable, no horizontal scroll.
- `onthegrow.ai/work-with-us#calculator` scrolls to it.

## Test before shipping (matrix gate)

- Submit with a real email: contact appears in GHL with tag `wam-download` and source `resources-wam`.
- Download button returns the 4-page PDF with the right file name.
- Reload shows the download state, not the form.
- Mobile: block renders, no horizontal scroll, button is tappable.
- `onthegrow.ai/resources#matrix` scrolls to the block.
