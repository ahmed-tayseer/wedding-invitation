/**
 * countdown.js
 * Ticks down to WEDDING_CONFIG.weddingDateISO every second.
 */
window.Invite = window.Invite || {};

Invite.countdown = (function () {
  let intervalId = null;

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const target = new Date(WEDDING_CONFIG.weddingDateISO).getTime();
    const now = Date.now();
    let diff = Math.max(0, target - now);

    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = pad(val);
    };
    set("cd-days", days);
    set("cd-hours", hours);
    set("cd-minutes", minutes);
    set("cd-seconds", seconds);

    if (target - now <= 0 && intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function start() {
    tick();
    if (!intervalId) intervalId = setInterval(tick, 1000);
  }

  return { start };
})();
