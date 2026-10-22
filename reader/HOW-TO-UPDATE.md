# How to update onthegrow.ai/reader

Everything on the reader page that changes over time lives in one file, `reader/content.json`. The page reads it when it loads. You never touch HTML. After any change below, check it at http://localhost:8123/reader/ and then say "deploy." A push to `main` publishes it in about half a minute.

## 1. Quarterly Legal Watch

Open `reader/content.json`. Under `legalWatch`, add a new item at the top of `items` with these six fields:

```json
{"jurisdiction": "Where", "headline": "What happened, in one line",
 "whatChanged": "The facts.", "whatToDo": "What the book says to do about it.",
 "sourceTitle": "Publisher, title, date", "sourceUrl": "https://..."}
```

Keep a comma between items. Then change `legalWatch.updated` to today's date in the form `2026-01-15`. Say "deploy."

## 2. Replace a tool

Drop the new file into `reader/files/` with the same file name as the old one. Say "deploy." If the name changes, open `reader/content.json` and update the `file` field for that tool.

If a tool file is ever missing, add `"comingSoon": true,` to that tool in `content.json` and its card shows "Coming soon" instead of a Download button. Remove the line when the file is back.

## 3. New evidence brief

Drop the new PDF into `reader/files/`. In `reader/content.json`, update `evidenceBrief.file` to the new file name and `evidenceBrief.edition` to the new edition, for example `Q1 2027`. Say "deploy."

## 4. Glossary

Replace `reader/AI-Glossary-GHL-Embed-OnTheGrow-v1.html` with the new version, keeping the same file name. In `reader/content.json`, update `glossaryNote.updated` to today's date. Say "deploy." The page loads the embed file when it opens, so nothing else changes.

## Good to know

- The access code is `SCALE2026`, set once near the top of the script in `reader/index.html`. The sign-in asks for an email and the code. It is a courtesy gate checked in the browser, not security.
- The "It's available November 16" link under the gate uses the same launch switch as the rest of the site, `assets/book-launch.js`. On launch day it becomes Buy on Amazon by itself.
- The sign-in posts to the site's Go High Level webhook once per reader: `tag` is `otg-reader`; `tags` lists every tag that applies (`otg-reader`, plus `otg-reader-updates` and `otg-reader-call` when those boxes are ticked); `wantsUpdates` and `wantsCall` are true or false. Readers who tick the call box see a Book a call button at the top of the toolkit, on that visit and when they return.
- The page carries `noindex`. It is for readers who have the book, not for search.
