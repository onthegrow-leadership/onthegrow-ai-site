# onthegrow.ai: book is live. Order links and first reviews

Prepared November 17, 2026. Ship today.

## What this changes

The book published November 16. Every place on the site that says pre-order, "coming November 16," Kindle only, or "call for pricing" on the book now says the book is available, with order links. Two five-star Amazon reviews posted on launch day go on the site as pull quotes.

## Standing rules

- No em dashes or en dashes in any copy Claude Code writes. Hyphens only in file names and URLs. Quoted review text is reproduced exactly as the reviewer wrote it.
- Brand colors purple #36294F, teal #39989E. Font Work Sans. Match the existing section styling on each page. No new visual styles.
- Build locally, preview on localhost, list every file you will change and wait for "approved, ship it" before deploy.
- Do not touch /reader, /resources, or /work-with-us except where this spec says.

## Before editing

1. Grep the whole site for: "pre-order", "preorder", "Pre-order", "coming", "November 16", "Kindle", "B0HPLGDRD5", "barnesandnoble", "amazon.com/dp", "a.co/". Report every file and line. That list is the scope.
2. Identify the book page (if one exists), the home page book section, and the footer or nav book link. Report what each currently says.

## Order links (use exactly these)

- Amazon (paperback and Kindle): https://a.co/d/0cgWKSJA
- Bookshop.org (supports independent bookstores): https://bookshop.org/p/books/ai-will-scale-good-leadership-and-bad-leadership-the-chro-s-method-for-redesigning-work-before-ai-scales-what-s-broken/304b945603a34d16
- Barnes & Noble: keep the existing B&N link if one is on the site. If none, omit B&N.

All order links open in a new tab (target="_blank" rel="noopener").

## Copy changes

### Wherever the book is offered

Replace pre-order language with: **Available now in paperback and Kindle.**

Buttons, in this order: **Order on Amazon** | **Order on Bookshop.org** | (Barnes & Noble, if present)

Under the buttons, one line: *Paperback $24.95. Kindle edition available. 238 pages.*

### Home page book section

Keep the existing headline and description. Swap the CTA to the buttons above. If the home page has a single button, make it **Order on Amazon** and link the words "also on Bookshop.org" beneath it.

### Book page (if one exists)

Add a section directly under the hero or order buttons:

Eyebrow: **FIRST REVIEWS**

Two review cards, side by side on desktop, stacked on mobile. Five stars rendered in teal #39989E above each quote (text stars or an inline SVG, no image file). Each card: quote, then attribution line in bold, then a second line in smaller text.

**Card 1**

"Most books about AI and work are either hype or hand-wringing. This one is neither. Liz Corey does something genuinely useful: she gives leaders a clear, repeatable method for deciding what AI should and shouldn't do. If you're a leader, an HR professional, or anyone responsible for how AI enters your organization, read this. It's the rare business book you'll actually use."

**Mark C. Ondash, CPTD, MPC**
Co-founder, Cognistry

**Card 2**

"In my thirty-six year career as a leadership and executive coach I have read hundreds of business books. With few exceptions, most give you the why of the subject matter without giving you a proven method and the tools to implement it. Liz Corey has created a step-by-step process for scaling AI within your organization in the smartest, most effective way possible."

**Rebecca Bradley**
International Coach Federation Master Certified Coach

Under the two cards, one centered link: **Read all reviews on Amazon** pointing to https://a.co/d/0cgWKSJA

If there is no book page, place the FIRST REVIEWS section on the home page directly under the book section.

### Nav and footer

Any "Pre-order" label becomes "Get the Book." Link target is the book page if one exists, otherwise the Amazon link.

## Do not change

- The /reader page and its access gate.
- The Work Assignment Matrix gate on /resources.
- The calculator on /work-with-us.
- Any pricing language for services. This spec is about the book only.

## Test before shipping

- No instance of "pre-order," "coming," or "November 16" remains in a book context (grep again).
- Both order links open the right product pages in a new tab.
- Review cards render on mobile without horizontal scroll; stars show in teal; quotes are exactly as written above.
- Home page, book page, nav, and footer all point to the live book.
- Lighthouse or a quick load check shows no new console errors.
