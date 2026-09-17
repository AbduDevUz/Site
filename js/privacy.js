/* ============================================================
   Tinch — Maxfiylik siyosati sahifasi
   Matn site.js → privacy dan data-i18n orqali tushadi; bu yerda
   faqat sahifa sarlavhasi va tavsifi.
   ============================================================ */

(function () {
  "use strict";

  function render() {
    window.I18N.applyMeta(window.SITE.privacy.meta);
  }

  render();
  window.I18N.onChange(render);
})();
