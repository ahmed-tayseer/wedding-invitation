/**
 * audio.js
 * Plays background music once the envelope opens with a smooth volume fade-in and fade-out,
 * and handles custom looping so every cycle fades in at the start and fades out at the end.
 */
window.Invite = window.Invite || {};

Invite.audio = (function () {
  const PATH_PLAY = "M8 5v14l11-7z"; // Play triangle icon
  const PATH_PAUSE = "M6 5h4v14H6zm8 0h4v14h-4z"; // Pause double bar icon
  let iconPath = null;

  // Volume & Fade settings
  const INITIAL_VOLUME = 0.05; // Starting / ending low volume (5%)
  const TARGET_VOLUME = 0.3; // Peak volume level (40%)
  const FADE_IN_DURATION = 4000; // Fade-in duration in milliseconds (4 seconds)
  const FADE_OUT_DURATION = 4000; // Fade-out duration in milliseconds (4 seconds)

  let el = null;
  let btn = null;
  let iconOn = null;
  let iconOff = null;
  let isPlaying = false;
  let fadeInterval = null;
  let isFadingOut = false;

  function init() {
    el = document.getElementById("bg-music");
    btn = document.getElementById("music-toggle");
    if (!el || !btn) return;

    iconPath = btn.querySelector("#music-icon-path");

    // Disable HTML5 native loop so timeupdate and ended events track precisely
    el.loop = false;
    el.addEventListener("ended", onEnded);
    el.addEventListener("timeupdate", onTimeUpdate);

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

  function onEnded() {
    // Restart playback with fade-in when the track reaches the end
    // play(); // TODO - Uncomment this line if you want the music to loop with fade-in

    // toggle the button at end
    setPlaying(false);
  }

  function onTimeUpdate() {
    if (!el || !el.duration || isFadingOut) return;

    const remainingTime = el.duration - el.currentTime;
    const fadeOutThreshold = FADE_OUT_DURATION / 1000; // Threshold in seconds

    // Trigger fade-out when near the end of the audio track
    if (remainingTime <= fadeOutThreshold && remainingTime > 0) {
      fadeOut();
    }
  }

  function fadeIn() {
    if (!el) return;
    isFadingOut = false;
    el.volume = INITIAL_VOLUME;

    const startTime = performance.now();
    clearInterval(fadeInterval);

    fadeInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / FADE_IN_DURATION, 1);

      // Smoothly scale volume up to peak target level
      el.volume = INITIAL_VOLUME + progress * (TARGET_VOLUME - INITIAL_VOLUME);

      if (progress >= 1) {
        clearInterval(fadeInterval);
      }
    }, 50);
  }

  function fadeOut() {
    if (!el) return;
    isFadingOut = true;
    const startVolume = el.volume;
    const startTime = performance.now();
    clearInterval(fadeInterval);

    fadeInterval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / FADE_OUT_DURATION, 1);

      // Smoothly scale volume down toward initial low volume
      el.volume = Math.max(0, startVolume - progress * (startVolume - INITIAL_VOLUME));

      if (progress >= 1) {
        clearInterval(fadeInterval);
      }
    }, 50);
  }

  function play() {
    if (!el || !el.src) return;
    el.currentTime = 0; // Ensure playback starts from the beginning
    isFadingOut = false;
    el.play()
      .then(() => {
        setPlaying(true);
        fadeIn();
      })
      .catch(() => {
        setPlaying(false);
      });
  }

  function pause() {
    if (fadeInterval) clearInterval(fadeInterval);
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
    // btn.setAttribute("aria-pressed", String(playing));
    // if (iconOn) iconOn.hidden = !playing;
    // if (iconOff) iconOff.hidden = playing;
    btn.setAttribute("aria-pressed", String(playing));
    if (iconPath) {
      iconPath.setAttribute("d", playing ? PATH_PAUSE : PATH_PLAY);
    }
  }

  return { init, reveal, play, pause, toggle };
})();
