/**
 * rsvp.js
 * Opens/closes the RSVP modal and submits the form to the Google Apps
 * Script Web App URL configured in WEDDING_CONFIG.rsvp.scriptURL.
 *
 * The Apps Script (see README.md) is expected to accept a POST body
 * with these keys and append a row to your Google Sheet:
 *   name, guests, attending, message, timestamp, language
 */
window.Invite = window.Invite || {};

Invite.rsvp = (function () {
  let overlay, modal, openBtn, closeBtn, form, statusEl, submitBtn, submitLabel;
  let lastFocused = null;

  function init() {
    overlay = document.getElementById("rsvp-modal");
    openBtn = document.getElementById("rsvp-open-btn");
    closeBtn = document.getElementById("rsvp-close-btn");
    form = document.getElementById("rsvp-form");
    statusEl = document.getElementById("rsvp-status");
    submitBtn = document.getElementById("rsvp-submit-btn");
    submitLabel = document.getElementById("rsvp-submit-label");

    if (!overlay || !openBtn) return;

    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !overlay.hidden) close();
    });
    form.addEventListener("submit", onSubmit);
  }

  function open() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    const firstField = document.getElementById("input-name");
    if (firstField) firstField.focus();
  }

  function close() {
    overlay.hidden = true;
    if (lastFocused) lastFocused.focus();
  }

  function setStatus(message, isError) {
    statusEl.textContent = message || "";
    statusEl.classList.toggle("is-error", !!isError);
  }

  function onSubmit(e) {
    e.preventDefault();

    const scriptURL = WEDDING_CONFIG.rsvp.scriptURL;
    const lang = Invite.i18n ? Invite.i18n.current : "en";
    const t = WEDDING_CONFIG.rsvp.form;

    const data = {
      name: document.getElementById("input-name").value.trim(),
      guests: document.getElementById("input-guests").value,
      attending: form.querySelector('input[name="attending"]:checked').value,
      message: document.getElementById("input-message").value.trim(),
      language: lang,
      timestamp: new Date().toISOString(),
    };

    if (!data.name) {
      setStatus(t.error[lang], true);
      return;
    }

    if (!scriptURL || scriptURL.indexOf("PASTE_YOUR") === 0) {
      setStatus(
        lang === "ar" ? "لم يتم إعداد رابط جوجل شيت بعد." : "Google Sheet endpoint isn't configured yet.",
        true,
      );
      return;
    }

    submitBtn.disabled = true;
    submitLabel.textContent = t.sending[lang];
    setStatus("");

    // Google Apps Script Web Apps don't return CORS headers for a normal
    // fetch, so we send it as a simple no-cors request. We can't read the
    // response, so we optimistically confirm success once the request
    // completes without a network error.
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    })
      .then(() => {
        setStatus(t.success[lang], false);
        form.reset();
        submitBtn.disabled = false;
        submitLabel.textContent = t.submit[lang];
        setTimeout(close, 1800);
      })
      .catch(() => {
        setStatus(t.error[lang], true);
        submitBtn.disabled = false;
        submitLabel.textContent = t.submit[lang];
      });
  }

  return { init, open, close };
})();
