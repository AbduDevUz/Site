/* ============================================================
   TINCH SOFT — Aloqa sahifasi
   Forma mantig'i order.js dan keladi; bu yerda faqat sahifaga
   xos meta va ijtimoiy tarmoq tugmalari.
   ============================================================ */

(function () {
  "use strict";

  function fillSocials() {
    var host = document.getElementById("contactSocials");
    if (!host) return;

    host.innerHTML = window.SITE.company.socials
      .map(function (s) {
        return (
          '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' +
          icon(s.id) +
          "</a>"
        );
      })
      .join("");
  }

  function render() {
    // order.js order.meta ni qo'yadi — aloqa sahifasida uni almashtiramiz
    window.I18N.applyMeta(window.SITE.contacts.meta);
    fillSocials();
  }

  function boot() {
    render();
    window.I18N.onChange(render);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
