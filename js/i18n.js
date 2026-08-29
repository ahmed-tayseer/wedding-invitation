/**
 * i18n.js
 * Detects/toggles language (en/ar), flips document direction for RTL,
 * and writes every bit of text on the page from WEDDING_CONFIG.
 */
window.Invite = window.Invite || {};

Invite.i18n = (function () {
  const cfg = WEDDING_CONFIG;
  let lang = "en";

  function detectLang() {
    const nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    return nav.startsWith("ar") ? "ar" : "en";
  }

  function coupleNames(l) {
    const order = cfg.couple.order[l] || cfg.couple.order.en;
    return order.map((key) => cfg.couple[key][l]).join(l === "ar" ? " و " : " & ");
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function buildSchedule(l) {
    const list = document.getElementById("schedule-list");
    if (!list) return;
    list.innerHTML = "";
    cfg.schedule.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "timeline-item";
      li.innerHTML = `
        <span class="timeline-dot" aria-hidden="true"></span>
        <span class="timeline-time">${item.time}</span>
        <span class="timeline-event">${item[l]}</span>
      `;
      list.appendChild(li);
    });
  }

  function apply(newLang) {
    lang = newLang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // Envelope
    setText("envelope-names", coupleNames(lang));
    setText("envelope-hint", lang === "ar"
      ? "المس المظروف لفتح دعوتكم"
      : "Tap the envelope to open your invitation");

    // Hero
    setText("hero-eyebrow", lang === "ar" ? "حفل زفاف" : "The Wedding Of");
    setText("hero-title", cfg.hero.title[lang]);
    setText("hero-names", coupleNames(lang));
    setText("hero-date", cfg.dateDisplay[lang]);

    // Guest message
    setText("guest-eyebrow", "—");
    setText("guest-message-title", cfg.guestMessage.title[lang]);
    setText("guest-message-body", cfg.guestMessage.body[lang]);

    // Countdown
    setText("countdown-title", cfg.countdown.title[lang]);
    setText("cd-days-label", cfg.countdown.labels.days[lang]);
    setText("cd-hours-label", cfg.countdown.labels.hours[lang]);
    setText("cd-minutes-label", cfg.countdown.labels.minutes[lang]);
    setText("cd-seconds-label", cfg.countdown.labels.seconds[lang]);

    // Schedule
    setText("schedule-title", cfg.schedule.title[lang]);
    buildSchedule(lang);

    // Location
    setText("location-title", cfg.location.title[lang]);
    setText("venue-name", cfg.location.venueName[lang]);
    setText("venue-address", cfg.location.address[lang]);
    setText("map-card-label", lang === "ar" ? "افتح في خرائط جوجل" : "Open in Google Maps");

    // Dress code
    setText("dresscode-title", cfg.dressCode.title[lang]);
    setText("dresscode-body", cfg.dressCode.body[lang]);

    // RSVP
    setText("rsvp-title", cfg.rsvp.title[lang]);
    setText("rsvp-subtitle", cfg.rsvp.subtitle[lang]);
    setText("rsvp-button-label", cfg.rsvp.buttonLabel[lang]);
    setText("rsvp-modal-title", cfg.rsvp.title[lang]);
    setText("label-name", cfg.rsvp.form.name[lang]);
    setText("label-guests", cfg.rsvp.form.guests[lang]);
    setText("label-attending", cfg.rsvp.form.attending[lang]);
    setText("label-attending-yes", cfg.rsvp.form.attendingYes[lang]);
    setText("label-attending-no", cfg.rsvp.form.attendingNo[lang]);
    setText("label-message", cfg.rsvp.form.message[lang]);
    setText("rsvp-submit-label", cfg.rsvp.form.submit[lang]);

    // Closing
    setText("closing-line", cfg.closing.line[lang]);
    setText("closing-names", coupleNames(lang));

    // Utility buttons + nav labels
    setText("lang-toggle-label", lang === "ar" ? "EN" : "AR");
    document.getElementById("lang-toggle").setAttribute(
      "aria-label",
      lang === "ar" ? "Switch to English" : "التبديل إلى العربية"
    );
    if (Invite.nav && Invite.nav.updateLabels) Invite.nav.updateLabels(lang);

    document.title = coupleNames(lang);
  }

  function toggle() {
    apply(lang === "en" ? "ar" : "en");
  }

  function init() {
    apply(detectLang());
    const btn = document.getElementById("lang-toggle");
    if (btn) btn.addEventListener("click", toggle);
  }

  return { init, apply, toggle, get current() { return lang; }, coupleNames };
})();
