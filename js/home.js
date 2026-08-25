/* ============================================================
   Tinch — Bosh sahifa
   Barcha bloklar SITE va PRODUCTS ma'lumotlaridan quriladi.
   ============================================================ */

(function () {
  "use strict";

  var S = window.SITE;

  function renderStats() {
    var host = document.getElementById("heroStats");
    if (!host) return;

    host.innerHTML = S.home.hero.stats
      .map(function (s) {
        return (
          '<div class="stat">' +
            '<span class="stat__value">' + esc(s.value) + "</span>" +
            '<span class="stat__label">' + esc(t(s.label)) + "</span>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderProducts() {
    var host = document.getElementById("productGrid");
    if (!host) return;

    host.innerHTML = (window.PRODUCTS || []).map(window.R.productCard).join("");
  }

  function renderWhy() {
    var host = document.getElementById("whyGrid");
    if (!host) return;

    host.innerHTML = S.home.whySection.items
      .map(function (item) {
        return (
          '<article class="card card--hover reveal">' +
            '<span class="card__icon">' + icon(item.icon) + "</span>" +
            '<h3 class="card__title">' + esc(t(item.title)) + "</h3>" +
            '<p class="card__text">' + esc(t(item.text)) + "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderSteps() {
    var host = document.getElementById("stepsGrid");
    if (!host) return;

    host.innerHTML = S.home.processSection.steps
      .map(function (step) {
        return (
          '<div class="step reveal">' +
            '<h3 class="h4">' + esc(t(step.title)) + "</h3>" +
            '<p class="card__text">' + esc(t(step.text)) + "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  function render() {
    window.I18N.applyMeta(S.home.meta);
    renderStats();
    renderProducts();
    renderWhy();
    renderSteps();
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
