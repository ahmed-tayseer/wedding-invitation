/**
 * envelope.js
 * First click: plays the envelope-opening animation (seal fades,
 * flap opens, card slides out), then reveals the site.
 * Second click while that animation is still running: skips straight
 * to the fully-open state instead of waiting for it to finish.
 *
 * Timings below mirror the CSS custom properties in style.css
 * (--dur-seal / --dur-flap / --dur-card / --dur-overlay).
 */
window.Invite = window.Invite || {};

Invite.envelope = (function () {
  const DUR_FLAP = 2500; // Matches updated slower --dur-flap
  const DUR_CARD = 750; // Matches --dur-card
  const DUR_OVERLAY = 300; // Matches updated faster --dur-overlay
  // Flap and card animate simultaneously (no stagger), so wait for the
  // longer of the two, plus a small buffer before starting the overlay fade.
  // const SEQUENCE_TOTAL = Math.max(DUR_FLAP, DUR_CARD) + 120;
  const SEQUENCE_TOTAL = Math.min(DUR_FLAP, DUR_CARD) + 120;

  let screenEl, btn;
  let state = "closed"; // closed -> opening -> open
  let sequenceTimer = null;
  let overlayTimer = null;

  function init() {
    screenEl = document.getElementById("envelope-screen");
    btn = document.getElementById("envelope");
    if (!screenEl || !btn) return;
    btn.addEventListener("click", onClick);
  }

  function onClick() {
    if (state === "closed") {
      startOpening();
    } else if (state === "opening") {
      skipToOpen();
    }
    // If already "open", further clicks do nothing.
  }

  function startOpening() {
    state = "opening";
    screenEl.classList.add("is-opening");

    sequenceTimer = setTimeout(finishOpening, SEQUENCE_TOTAL);
  }

  function skipToOpen() {
    clearTimeout(sequenceTimer);
    clearTimeout(overlayTimer);

    // Merely changing transition-duration mid-flight isn't reliably honored
    // by every browser for an already-running transition. To guarantee an
    // instant jump regardless of how far the animation has progressed, we
    // switch to 0-duration transitions, then force the target class off
    // and back on so the transform actually changes (closed -> open) and
    // a fresh (instant) transition fires to the final state.
    screenEl.classList.add("is-skip");
    void screenEl.offsetWidth;
    screenEl.classList.remove("is-opening");
    void screenEl.offsetWidth;
    screenEl.classList.add("is-opening");
    void screenEl.offsetWidth;

    finishOpening(true);
  }

  function finishOpening(skipped) {
    state = "open";
    screenEl.classList.remove("is-opening");
    screenEl.classList.add("is-open");

    revealSite();

    if (skipped) {
      screenEl.classList.add("is-hidden");
      cleanupOverlay();
    } else {
      overlayTimer = setTimeout(() => {
        screenEl.classList.add("is-hidden");
        overlayTimer = setTimeout(cleanupOverlay, DUR_OVERLAY);
      }, 40);
    }
  }

  function cleanupOverlay() {
    if (screenEl && screenEl.parentNode) {
      screenEl.setAttribute("aria-hidden", "true");
      screenEl.style.display = "none";
    }
  }

  function revealSite() {
    const site = document.getElementById("site");
    if (site) site.hidden = false;

    if (Invite.nav) Invite.nav.show();
    if (Invite.audio) {
      Invite.audio.reveal();
      Invite.audio.play();
    }
  }

  return { init };
})();
