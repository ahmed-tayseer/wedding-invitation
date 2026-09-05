/**
 * ============================================================
 *  WEDDING INVITATION — CONFIGURATION
 * ============================================================
 *  Every piece of content on the site is read from this file.
 *  Replace the placeholder values below with the real details.
 *  Every text field has an "en" and "ar" version.
 * ============================================================
 */

function formatDateDisplay(inputDate) {
  const date = new Date(inputDate);

  // --- English formatting ---
  const enWeekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  const enRest = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  const enFormatted = `${enWeekday} - ${enRest}`;

  // --- Arabic formatting (using ar-EG with Eastern Arabic numerals) ---
  const arWeekday = new Intl.DateTimeFormat("ar-EG-u-nu-arab", { weekday: "long" }).format(date);
  const arDay = new Intl.DateTimeFormat("ar-EG-u-nu-arab", { day: "numeric" }).format(date);
  const arMonth = new Intl.DateTimeFormat("ar-EG-u-nu-arab", { month: "long" }).format(date);
  const arYear = new Intl.DateTimeFormat("ar-EG-u-nu-arab", { year: "numeric" }).format(date);
  const arFormatted = `${arWeekday} - ${arDay} ${arMonth} ${arYear}`;

  return {
    dateDisplay: {
      en: enFormatted,
      ar: arFormatted,
    },
  };
}

const WEDDING_DATE = new Date("2026-10-09T20:30:00"); // ISO date used by the countdown — EDIT THIS to the real date/time.
const WEDDING_CONFIG = {
  // ---------- Couple ----------
  couple: {
    bride: { en: "Safaa", ar: "صفاء" },
    groom: { en: "Ahmed", ar: "أحمد" },
    // Shown as "Ahmed & Safaa" — order for each language
    order: { en: ["groom", "bride"], ar: ["groom", "bride"] },
  },

  // ---------- Date & time ----------
  // ISO date used by the countdown — EDIT THIS to the real date/time.
  weddingDateISO: WEDDING_DATE.toISOString(),
  // date: { en: "03.10.2026", ar: "٣-١٠-٢٠٢٦" },
  // date: { en: "03.10.2026", ar: "03.10.2026" },
  date: {
    en: WEDDING_DATE.toLocaleDateString("en-UK").replaceAll("/", "."),
    ar: WEDDING_DATE.toLocaleDateString("en-UK").replaceAll("/", "."),
  },
  // dateDisplay: {
  //   en: "Saturday - October 3, 2026",
  //   ar: "السبت - ٣ أكتوبر ٢٠٢٦",
  // },
  ...formatDateDisplay(WEDDING_DATE),

  // ---------- Hero section ----------
  hero: {
    title: { en: "Wedding Day", ar: "يوم الزفاف" },
  },

  // ---------- Guest message ----------
  guestMessage: {
    title: { en: "You're Invited", ar: "أنتم مدعوون" },
    body: {
      en: "With hearts full of joy, we invite you to share in the beginning of our forever. Your presence would mean the world to us as we celebrate this new chapter together.",
      ar: "بقلوب مفعمة بالفرح، ندعوكم لمشاركتنا بداية حياتنا معًا. وجودكم معنا سيعني لنا الكثير ونحن نحتفل بهذا الفصل الجديد.",
    },
  },

  // ---------- Countdown ----------
  countdown: {
    title: { en: "Counting Down", ar: "العد التنازلي" },
    labels: {
      days: { en: "Days", ar: "يوم" },
      hours: { en: "Hours", ar: "ساعة" },
      minutes: { en: "Minutes", ar: "دقيقة" },
      seconds: { en: "Seconds", ar: "ثانية" },
    },
  },

  // ---------- Schedule of events ----------
  schedule: {
    title: { en: "Schedule of Events", ar: "برنامج الحفل" },
    items: [
      { time: "8:30 PM", en: "Guest Arrival", ar: "استقبال الضيوف" },
      { time: "8:45 PM", en: "Ceremony", ar: "حفل العقد" },
      { time: "9:00 PM", en: "Photography", ar: "التصوير" },
      // { time: "9:30 PM", en: "Dinner Reception", ar: "حفل العشاء" },
      { time: "10:00 PM", en: "Farewell", ar: "الوداع" },
    ],
  },

  // ---------- Location ----------
  location: {
    title: { en: "Venue", ar: "المكان" },
    venueName: { en: "Al Nour Hall, El-Moshir Tantawy Mosque", ar: "قاعة النور مسجد المشير طنطاوي" },
    address: {
      en: "El-Moshir Tantawy Axis, Fifth Settlement, New Cairo, Egypt",
      ar: "محــور المشير طنطاوى بالتجمــع الخامــس",
    },
    // Used to build the embedded map + "open in maps" link.
    // Replace with the real address or "lat,lng".
    // mapQuery: "El-Mosheer Tantawy Mosque",
    mapQuery: "30.017616828375548, 31.38366960736208",
    image: "assets/mosque-image.png",
  },

  // ---------- Dress code ----------
  dressCode: {
    title: { en: "Dress Code", ar: "الزي المفضل" },
    body: {
      en: "We kindly invite you to dress in elegant, modest attire. Soft neutrals, ivory, and gold tones are especially welcome.",
      ar: "يسعدنا أن يحضر ضيوفنا الكرام بإطلالة أنيقة ومحتشمة. الألوان الهادئة والعاجية والذهبية موضع ترحيب خاص.",
    },
  },

  // ---------- RSVP ----------
  rsvp: {
    // title: { en: "RSVP", ar: "تأكيد الحضور" },
    title: { en: "Confirm Your Attendance", ar: "تأكيد الحضور" },
    subtitle: {
      en: "Kindly let us know if you'll be joining us.",
      ar: "يرجى تأكيد حضوركم لنا.",
    },
    // buttonLabel: { en: "RSVP Now", ar: "أكد حضورك" },
    buttonLabel: { en: "Confirm Attendance", ar: "أكد حضورك" },
    // ⚠️ REQUIRED: paste your deployed Google Apps Script Web App URL here.
    // See README.md for the exact Apps Script code this form expects.
    scriptURL:
      "https://script.google.com/macros/s/AKfycbxnwgSNnIVSTu1NJq1gp8odAybf6iSQV-esszSPdRuPIV7YX5oX6TEVfWzWQ9iglq-pEQ/exec",
    form: {
      name: { en: "Full Name", ar: "الاسم الكامل" },
      guests: { en: "Number of Guests", ar: "عدد الضيوف" },
      attending: { en: "Will you attend?", ar: "هل ستحضر؟" },
      attendingYes: { en: "Joyfully Attending", ar: "بكل سرور سأحضر" },
      attendingNo: { en: "Regretfully Declining", ar: "أعتذر عن الحضور" },
      message: { en: "Message (optional)", ar: "رسالة (اختياري)" },
      submit: { en: "Send RSVP", ar: "إرسال" },
      sending: { en: "Sending…", ar: "جاري الإرسال…" },
      success: { en: "Thank you! Your RSVP has been received.", ar: "شكرًا لكم! تم استلام تأكيد حضوركم." },
      error: { en: "Something went wrong. Please try again.", ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى." },
    },
  },

  // ---------- Closing ----------
  closing: {
    line: { en: "Hope to see you there", ar: "بانتظار حضوركم" },
  },

  // ---------- Background music ----------
  music: {
    // Add your own royalty-free mp3 at this path.
    src: "assets/background-sound.mp3",
  },

  // ---------- Floating bottom navigation ----------
  nav: [
    { id: "hero", en: "Home", ar: "الرئيسية", icon: "home" },
    { id: "countdown", en: "Countdown", ar: "العد", icon: "clock" },
    { id: "schedule", en: "Schedule", ar: "البرنامج", icon: "list" },
    { id: "location", en: "Location", ar: "المكان", icon: "pin" },
    // { id: "rsvp", en: "RSVP", ar: "تأكيد", icon: "mail" },
    { id: "closing", en: "RSVP", ar: "تأكيد", icon: "mail" },
  ],
};
