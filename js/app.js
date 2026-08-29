/**
 * app.js
 * Boots every module once the DOM is ready.
 */
(function () {
  function setupMap() {
    const query = encodeURIComponent(WEDDING_CONFIG.location.mapQuery || "");
    const embed = document.getElementById("map-embed");
    const link = document.getElementById("map-link");
    if (embed) embed.src = `https://www.google.com/maps?q=${query}&output=embed`;
    if (link) link.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  function setupVenueImage() {
    const img = document.getElementById("venue-image");
    if (img && WEDDING_CONFIG.location.image) {
      img.src = WEDDING_CONFIG.location.image;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    Invite.nav.build();
    Invite.i18n.init(); // detects language + writes all text (needs nav built first for label sync)
    Invite.audio.init();
    Invite.rsvp.init();
    Invite.envelope.init();
    Invite.countdown.start();
    setupMap();
    setupVenueImage();
  });
})();
