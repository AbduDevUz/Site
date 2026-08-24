/* ============================================================
   TINCH SOFT — 404 sahifasi
   Foydalanuvchi adashib qolmasin: mahsulotlar ro'yxatini ko'rsatamiz.
   ============================================================ */

(function () {
  "use strict";

  function render() {
    window.I18N.applyMeta(window.SITE.notFound.meta);

    var ic = document.getElementById("notFoundIcon");
    if (ic && !ic.innerHTML) ic.innerHTML = icon("info");

    var grid = document.getElementById("productGrid");
    if (grid) grid.innerHTML = (window.PRODUCTS || []).map(window.R.productCard).join("");

    window.I18N.apply();
    window.R.hydrate(document);
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
