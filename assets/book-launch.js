// ============================================================
//  BOOK LAUNCH SWITCH  (onthegrow.ai)
//
//  On launch day (Monday, November 16) change the two lines
//  below, save this file, and redeploy the site:
//
//    1. Change   false   to   true
//    2. Paste the book's Amazon page address between the quotes
//
//  That is all. Every page reads this file. With BOOK_LIVE true the
//  "November 16" banner disappears and every book button becomes
//  "Buy on Amazon" linking to AMAZON_URL in a new tab.
// ============================================================

const BOOK_LIVE = false;
const AMAZON_URL = "";

// ---------- Nothing below this line needs to change ----------
(function () {
  if (!BOOK_LIVE) return;
  // Set early so CSS hides the banner before the page paints.
  document.documentElement.classList.add("book-live");
  function go() {
    document.querySelectorAll("[data-book-cta]").forEach(function (a) {
      a.textContent = "Buy on Amazon";
      if (AMAZON_URL) { a.href = AMAZON_URL; a.target = "_blank"; a.rel = "noopener"; }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go);
  else go();
})();
