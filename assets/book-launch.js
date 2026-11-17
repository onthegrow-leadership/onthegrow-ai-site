// ============================================================
//  BOOK LAUNCH SWITCH  (onthegrow.ai)
//
//  The book is live. BOOK_LIVE is true and AMAZON_URL points at
//  the book's Amazon page. The home page carries its own order
//  buttons. On the other pages that read this file, every book
//  link becomes "Order on Amazon" linking to AMAZON_URL in a new
//  tab, and the "now available" wording shows.
// ============================================================

const BOOK_LIVE = true;
const AMAZON_URL = "https://a.co/d/0cgWKSJA";

// ---------- Nothing below this line needs to change ----------
(function () {
  if (!BOOK_LIVE) return;
  // Set early so CSS hides the banner before the page paints.
  document.documentElement.classList.add("book-live");
  function go() {
    document.querySelectorAll("[data-book-cta]").forEach(function (a) {
      a.textContent = "Order on Amazon";
      if (AMAZON_URL) { a.href = AMAZON_URL; a.target = "_blank"; a.rel = "noopener"; }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go);
  else go();
})();
