/**
 * audio.js
 * Plays background music once the envelope opens, with a floating
 * toggle button to stop/resume it.
 */
window.Invite = window.Invite || {};

Invite.audio = (function () {
  let el = null;
  let btn = null;
  let iconOn = null;
  let iconOff = null;
  let isPlaying = false;

  function init() {
    el = document.getElementById("bg-music");
    btn = document.getElementById("music-toggle");
    if (!el || !btn) return;

    if (WEDDING_CONFIG.music && WEDDING_CONFIG.music.src) {
      el.src = WEDDING_CONFIG.music.src;
    }

    iconOn = btn.querySelector(".icon-music-on");
    iconOff = btn.querySelector(".icon-music-off");
    btn.addEventListener("click", toggle);
  }

  function reveal() {
    if (btn) btn.hidden = false;
  }

  function play() {
    if (!el || !el.src) return;
    el.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay can still be blocked by the browser even after a
        // user gesture in rare cases — fail silently, button still works.
        setPlaying(false);
      });
  }

  function pause() {
    if (el) el.pause();
    setPlaying(false);
  }

  function toggle() {
    if (isPlaying) pause();
    else play();
  }

  function setPlaying(playing) {
    isPlaying = playing;
    if (!btn) return;
    btn.setAttribute("aria-pressed", String(playing));
    if (iconOn) iconOn.hidden = !playing;
    if (iconOff) iconOff.hidden = playing;
  }

  return { init, reveal, play, pause, toggle };
})();
