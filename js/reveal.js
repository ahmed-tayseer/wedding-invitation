/* ==========================================================================
   SCROLL REVEAL
   Fades each section in (with a slight rise) the first time it scrolls
   into view. The hero is skipped since it's already visible on load.
   Works with the CSS in style.css under "SCROLL REVEAL".
   ========================================================================== */
(function () {
  "use strict";

  var sections = document.querySelectorAll(".section:not(.hero-section)");
  if (!sections.length) return;

  // Pair each section with the torn-divider directly above it (its
  // previous sibling in the markup) so the divider fades/rises in lockstep
  // with the section instead of sitting there fully rendered while the
  // section animates in underneath it.
  sections.forEach(function (section) {
    var divider = section.previousElementSibling;
    // if (divider && divider.classList.contains("torn-divider")) {
    if (divider && divider.classList.contains("torn-divider--to-alt")) {
      divider.classList.add("reveal-pair");
      section.revealPartner = divider;
    }
  });

  // Only hide-then-reveal if JS actually runs; keeps the site fully visible
  // as a fallback if this script fails to load.
  document.body.classList.add("reveal-ready");

  if (!("IntersectionObserver" in window)) {
    sections.forEach(function (section) {
      section.classList.add("is-visible");
      if (section.revealPartner) section.revealPartner.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target.revealPartner) {
            entry.target.revealPartner.classList.add("is-visible");
          }
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
