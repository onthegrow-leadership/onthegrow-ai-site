# onthegrow.ai/reader: Build Spec for Claude Code

Prepared October 21, 2026. Updated October 22, 2026 (added the CHRO Governance Checklist as tool 19, glossary embed now read from the reader folder, card 2 renamed to match the book). Launch: November 16, 2026. The book prints this URL and the access code, so the page must be live and tested before the first copy ships.

## Before you start: moving this to the Claude Code laptop

Bring these over from the everyday laptop (Dropbox, email to yourself, or a USB drive):

1. This file, `READER-PAGE-SPEC.md`. Save it in the onthegrow.ai project folder.
2. `AI-Glossary-GHL-Embed-OnTheGrow-v1.html`. Save it in the `reader/` folder (create the folder if it doesn't exist).
3. The 19 tool files listed in Section 1, plus `AI-Will-Scale-Good-Leadership-Evidence-Brief-Q4-2026.pdf`. Save all 20 in `reader/files/`. Masters are in Dropbox.

## How to run this

1. Open Claude Code in the onthegrow.ai project folder and type: "Read READER-PAGE-SPEC.md and build it."
2. Before editing, Claude Code checks `reader/files/` against the 19 file names in Section 1 and the evidence brief, reports anything missing or misnamed, lists every file it will create or change, and waits for approval.
3. Claude Code builds locally and gives the localhost URL and the network URL for the phone.
4. Liz reviews. Only after "approved, ship it" does Claude Code commit and deploy.

## Standing rules

- No em dashes or en dashes anywhere in new copy. Hyphens only inside names, file names, and URLs.
- Brand names exactly: GROWTH Execution Model™, Leadership as Infrastructure™, Grace + Grit™, AI Leadership Load Assessment, GROWTH Execution Partner.
- Book title: *AI Will Scale Good Leadership and Bad Leadership: The CHRO's Method for Redesigning Work Before AI Scales What's Broken*. No periods inside the title.
- Brand colors: purple #36294F, teal #39989E. Font: Work Sans. Match the existing site's header, footer, and section styling exactly.
- Use "leaders," not "managers," in any new copy. Tool names stay as the book prints them (for example, Manager Readiness Review).
- Build locally. Preview on localhost. Never deploy without Liz's explicit approval.

## The one design rule: content lives in a data file, not in HTML

Everything on this page that changes over time lives in one file: `reader/content.json`. The HTML reads it when the page builds (or at load time, whichever matches how the site is built today). To update the Legal Watch next quarter, Liz edits three lines in that file and says "deploy." She never touches HTML.

Create `reader/content.json` with four sections: `tools`, `legalWatch`, `glossaryNote`, and `evidenceBrief`. Seed it with the content below.

## Page: /reader

### Gate (top of page, before any content)

- Headline: **Free reader tools**
- Line: "Every tool in the book, as a fillable or working file. Enter the access code printed in The Toolkit and Reader Access Page at the back of the book."
- One input for the access code and a button: **Open the toolkit**
- The code is `SCALE2026`. Check it in the browser, case-insensitive, trim spaces. On a match, reveal the content and remember it in localStorage so the reader isn't asked again on that device. On a miss, show: "That code doesn't match. It's printed on the reader access page at the back of the book."
- This is a courtesy gate for a reader bonus, not security. Do not add a server check.
- Under the gate, a small line: "Don't have the book yet? [It's available November 16.]" linking to the book section of the homepage. On launch day this link changes to the buy link.

### Optional updates field (shown after the gate opens)

- One email field and a button: **Send me the quarterly updates**
- Copy: "The Legal Watch and the AI glossary update every quarter. Leave an email and you'll hear when they do. No spam, and you can ask us to delete your record any time."
- Post to the existing GHL inbound webhook used by the site's other forms, with a tag `otg-reader`. Confirm the webhook URL from the existing forms; do not invent one.

### Section 1: The Toolkit

Intro line: "Every toolbox in the book, in order. Each file opens on its instructions. PDFs are fillable. Workbooks calculate."

Render one card per tool from `content.json`, in this order. Each card shows: Toolbox number, tool name, format, one-line description, and a **Download** button to the file in `reader/files/`. Files are served directly, not through Dropbox.

| # | Toolbox | Tool | File | Format |
|---|---|---|---|---|
| 1 | Front matter | AI Glossary for CHROs | AI-Glossary-OnTheGrow-v1.pdf | PDF, 7 pages. Also the searchable version in Section 3. |
| 2 | No. 1 | The Work Taxonomy | Work-Taxonomy-OnTheGrow-v1.xlsx | Excel workbook. Includes the AI Opportunity Assessment and the Work Assignment register. |
| 3 | No. 2 | The Five Terms and the Assignment Structure | Five-Terms-Assignment-Structure-OnTheGrow-v1.pdf | PDF, fillable |
| 4 | No. 3 | The Knowledge Readiness Test | Knowledge-Readiness-Test-OnTheGrow-v1.xlsx | Excel workbook |
| 5 | No. 4 | The Agent Job Description | Agent-Job-Description-OnTheGrow-v1.docx | Word template |
| 6 | No. 5 | The Seven-Step Redesign Run Sheet | Seven-Step-Redesign-Run-Sheet-OnTheGrow-v1.pdf | PDF, fillable |
| 7 | No. 6 | The Work Assignment Matrix | Work-Assignment-Matrix-OnTheGrow-v1.pdf | PDF, fillable. The full-size worksheet the book points to. The Excel register is a tab in the Work Taxonomy workbook. |
| 8 | No. 7 | The Decision Rights Matrix | Decision-Rights-Matrix-OnTheGrow-v1.xlsx | Excel workbook |
| 9 | Chapter 7 | The CHRO Governance Checklist | CHRO-Governance-Checklist-OnTheGrow-v1.pdf | PDF, 1 page, fillable. What HR owns, what it shares, and what belongs to IT and legal. |
| 10 | No. 8 | The Capability Gap Assessment | Capability-Gap-Assessment-OnTheGrow-v1.xlsx | Excel workbook |
| 11 | No. 8 | The Six Skills Behavioral Scale | Six-Skills-Behavioral-Scale-OnTheGrow-v1.pdf | PDF, fillable |
| 12 | No. 9 | The Manager Readiness Review | Manager-Readiness-Review-OnTheGrow-v1.xlsx | Excel workbook |
| 13 | No. 10 | The Mixed-Team Operating Rhythm | Mixed-Team-Operating-Rhythm-OnTheGrow-v1.pdf | PDF, fillable |
| 14 | No. 11 | The GROWTH Conversation Guide and AI Harness Map | GROWTH-Conversation-Guide-AI-Harness-Map-OnTheGrow-v1.pdf | PDF, fillable. Page 1 is the GROWTH card. |
| 15 | No. 12 | The AI-Era Listening Set | AI-Era-Listening-Set-OnTheGrow-v1.pdf | PDF, fillable |
| 16 | No. 13 | The No-Surprises Protocol | No-Surprises-Protocol-OnTheGrow-v1.pdf | PDF, fillable |
| 17 | No. 13 | The Ambiguity Inventory | Ambiguity-Inventory-OnTheGrow-v1.xlsx | Excel workbook. Marked private: use it, don't publish it. |
| 18 | Chapter 14 | The 30/60/90 Enablement Roadmap | 30-60-90-Enablement-Roadmap-OnTheGrow-v1.xlsx | Excel workbook |
| 19 | No. 14 | The Enablement Council Charter | Enablement-Council-Charter-OnTheGrow-v1.docx | Word template |

Liz will place the 19 files in `reader/files/` before the build. If a file is missing at build time, show the card with "Coming soon" instead of a Download button. Do not fail the build.

Under the list, one line: "AI-powered versions of these tools are available. Call for pricing." linking to the homepage contact section.

### Section 2: Legal Watch

- Headline: **Legal Watch**
- Subhead: "Where the law stands today, updated every quarter. The book's A Note on the Law explains why the law isn't in the chapters and the practices are."
- Show "Last updated: [date from content.json]" prominently.
- Render one card per item from `content.json`: jurisdiction, headline, what changed, what to do, and a source link. Newest first.
- Under the cards, verbatim: "This is not legal advice. Bring your employment counsel into the room before you deploy. They have been waiting for the invitation."

Seed `legalWatch` with these three items, verified October 21, 2026:

**Item 1. European Union: high-risk employment AI rules delayed to December 2027**
- What changed: The Digital Omnibus on AI, approved by the European Parliament on June 16, 2026 and the Council on June 29, 2026, moved the application date for stand-alone high-risk AI systems (which include employment uses) from August 2, 2026 to December 2, 2027. High-risk AI embedded in products moves to August 2, 2028. Transparency duties for generative AI already on the market now apply from December 2, 2026. A delay is not a repeal.
- What to do: Use the extra time the way the book says: every agent under a job description, five names on every consequential rule, a leader who answers for the pattern. That is what the high-risk regime will ask for.
- Source: Ogletree Deakins, "EU Digital Omnibus on AI," June 16, 2026. https://ogletree.com/?p=89498

**Item 2. Colorado: AI Act narrowed and moved to January 1, 2027**
- What changed: Senate Bill 189 (May 2026) moved the effective date from June 30, 2026 to January 1, 2027 and rewrote the law around transparency. The duty of care, risk management program, and impact assessment requirements were removed. What remains: disclosures about intended uses, training data categories, and deployer oversight; and a right to meaningful human review of adverse automated decisions. The attorney general will define "materially influences" by rule.
- What to do: "Meaningful human review" is the Assist box with a named owner. If a consequential employment decision is touched by AI, make sure a person can explain it and a person owns it.
- Source: IAPP, "Amendments move Colorado AI Act's focus from risk to transparency," May 13, 2026. https://iapp.org/news/a/amendments-move-colorado-ai-act-s-focus-from-risk-to-transparency

**Item 3. United States: Mobley v. Workday, age claims proceeding as a collective action**
- What changed: In May 2025 the federal court in the Northern District of California allowed age discrimination claims over AI applicant screening to proceed as a collective action, later extended to applicants screened by Workday's HiredScore features. Notice went out in December 2025. A third amended complaint was filed in March 2026, and on June 22, 2026 the court granted in part and denied in part a motion to dismiss. The case continues.
- What to do: Shortlisting is the book's standing example. AI ranks, never rejects. The recruiter sees the full list. Candidates are scored against a written performance profile. That design is also the defensible one.
- Source: Civil Rights Litigation Clearinghouse, Mobley v. Workday, Inc., docket last updated September 17, 2026. https://clearinghouse.net/case/44074/

### Section 3: The AI Glossary

- Headline: **The AI Glossary for CHROs**
- Paste the contents of `reader/AI-Glossary-GHL-Embed-OnTheGrow-v1.html` into this section. Liz places that file in the `reader/` folder before the build. It is self-contained: search, group filters, 72 terms. Keep its styles scoped as they are (everything sits under `.otg-gl`) so it doesn't change the rest of the page.
- Show "Updated quarterly" with the date from `content.json` (`glossaryNote.updated`).

### Section 4: The Evidence Brief

- Headline: **The Evidence Brief**
- Line: "Fourteen chapters, fourteen independent findings. Recent research paired with each chapter, updated quarterly."
- Download button to the current brief file named in `content.json` (`evidenceBrief.file`). Seed with `AI-Will-Scale-Good-Leadership-Evidence-Brief-Q4-2026.pdf`, which Liz will place in `reader/files/`.
- Show "Current edition: Q4 2026."

### Section 5: Governance

The book's Chapter 7 sends readers here for "a one-page CHRO governance checklist, and quarterly updates on what HR owns, what it shares, and what belongs to IT and legal." This section must deliver both.

- Headline: **Governance**
- Line: "Governance is a speed-enabling layer, not a standalone project. Start with the one-page checklist: what HR owns, what it shares, and what belongs to IT and legal. Run it every quarter, alongside the Legal Watch."
- A **Download the CHRO Governance Checklist** button to `reader/files/CHRO-Governance-Checklist-OnTheGrow-v1.pdf` (the same file as card 9).
- One short line under the button: "The checklist points to three tools above: the Agent Job Description (No. 4), the Decision Rights Matrix (No. 7), and the Enablement Council Charter (No. 14)."
- Quarterly updates on governance arrive through the Legal Watch and the updates email. No separate feed.

### Closing

- The book's last line, set as a pull quote: **"Prove me right."**
- Two buttons: **Take the AI Leadership Load Assessment** (to /readiness/) and **Talk with us** (to the booking link).

## Navigation

- Add **Reader Tools** to the desktop nav and the mobile menu, after Resources.
- Add a line to the homepage book section: "Bought the book? Get your tools at onthegrow.ai/reader."

## Meta

- Title: "Reader Tools | AI Will Scale Good Leadership and Bad Leadership"
- Description: "Every tool from the book, free to readers. Fillable PDFs and working workbooks, plus the quarterly Legal Watch and the AI Glossary for CHROs."
- og:image: the book cover file already used on the homepage.
- Add `noindex` to this page. It is for readers who have the book, not for search.

## How Liz updates it later

Document this in a short `reader/HOW-TO-UPDATE.md`:

1. **Quarterly Legal Watch:** open `reader/content.json`, add a new item at the top of `legalWatch.items` with jurisdiction, headline, whatChanged, whatToDo, sourceTitle, sourceUrl. Change `legalWatch.updated` to today's date. Say "deploy."
2. **Replace a tool:** drop the new file into `reader/files/` with the same file name. Say "deploy." If the name changes, update the `file` field for that tool in `content.json`.
3. **New evidence brief:** drop the new PDF into `reader/files/`, update `evidenceBrief.file` and `evidenceBrief.edition`. Say "deploy."
4. **Glossary:** replace `reader/AI-Glossary-GHL-Embed-OnTheGrow-v1.html` with the new version, and update `glossaryNote.updated`. Say "deploy."

## Test before shipping

- Gate: wrong code shows the error; `scale2026` with lowercase and a trailing space opens it; reload doesn't ask again.
- All 19 Download buttons return the right file with the right file name. The Governance section button returns the checklist.
- The checklist PDF opens with working checkboxes and text fields.
- Legal Watch shows three items, newest first, with the date and the disclaimer.
- Glossary search works: typing "agent" returns results. The glossary's styles don't change the rest of the page.
- Updates form creates a contact in GHL tagged `otg-reader`.
- Mobile: menu shows Reader Tools; every section renders; no horizontal scroll.
- The page carries `noindex`.
