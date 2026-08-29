/**
 * nav.js
 * Builds the floating bottom navigation from WEDDING_CONFIG.nav and
 * highlights the section currently in view.
 */
window.Invite = window.Invite || {};

Invite.nav = (function () {
  const ICONS = {
    home:  '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 3 2 12h3v8h6v-5h2v5h6v-8h3z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    list:  '<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="4" cy="6" r="1.4" fill="currentColor"/><circle cx="4" cy="12" r="1.4" fill="currentColor"/><circle cx="4" cy="18" r="1.4" fill="currentColor"/><rect x="8" y="5" width="13" height="2" fill="currentColor"/><rect x="8" y="11" width="13" height="2" fill="currentColor"/><rect x="8" y="17" width="13" height="2" fill="currentColor"/></svg>',
    pin:   '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>',
    mail:  '<svg viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 6l8 7 8-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  let items = [];
  let observer = null;

  function build() {
    const list = document.getElementById("bottom-nav-list");
    if (!list) return;
    list.innerHTML = "";
    items = WEDDING_CONFIG.nav.map((entry) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bottom-nav-btn";
      btn.dataset.target = entry.id;
      btn.innerHTML = ICONS[entry.icon] || ICONS.pin;
      btn.addEventListener("click", () => {
        const target = document.getElementById(entry.id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      li.appendChild(btn);
      list.appendChild(li);
      return { id: entry.id, btn, config: entry };
    });
    updateLabels(Invite.i18n ? Invite.i18n.current : "en");
    observeSections();
  }

  function updateLabels(lang) {
    items.forEach(({ btn, config }) => {
      const label = config[lang] || config.en;
      btn.setAttribute("aria-label", label);
      btn.title = label;
    });
  }

  function setActive(id) {
    items.forEach(({ btn, id: itemId }) => {
      btn.classList.toggle("is-active", itemId === id);
    });
  }

  function observeSections() {
    if (observer) observer.disconnect();
    const targets = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    targets.forEach((t) => observer.observe(t));
  }

  function show() {
    const nav = document.getElementById("bottom-nav");
    if (nav) nav.hidden = false;
  }

  return { build, updateLabels, show };
})();
