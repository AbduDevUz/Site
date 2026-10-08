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

  /**
   * Ikki guruh: yuqorida `main: true` mahsulotlar, pastda qolganlari.
   * Ikkalasi ham bir xil katta kartochkada. Tartib products.js dagidek.
   */
  function renderProducts() {
    var mainHost = document.getElementById("productGrid");
    var moreHost = document.getElementById("productMoreGrid");
    if (!mainHost) return;

    var all = window.PRODUCTS || [];
    var main = all.filter(function (p) {
      return p.main;
    });
    var grouped = main.length > 0;
    // Hech biri belgilanmagan bo'lsa — hammasi bitta to'rda, sarlavhasiz
    if (!grouped) main = all;

    var rest = all.filter(function (p) {
      return main.indexOf(p) === -1;
    });

    // Guruh sarlavhasi h3 bo'lgani uchun kartochka nomi h4
    var level = grouped ? 4 : 3;
    var card = function (p) {
      return window.R.productCard(p, { level: level });
    };

    mainHost.innerHTML = main.map(card).join("");

    var mainTitle = mainHost.parentNode.querySelector(".products-group__title");
    if (mainTitle) mainTitle.hidden = !grouped;

    if (moreHost) {
      moreHost.innerHTML = rest.map(card).join("");
      moreHost.parentNode.hidden = !rest.length;
    }
  }

  /**
   * Hero ostidagi katta blok — `spotlight` berilgan mahsulot (Bandla).
   * Bitta mahsulotda bo'ladi; bo'lmasa bo'lim butunlay yashirinadi.
   */
  function renderSpotlight() {
    var host = document.getElementById("spotlight");
    if (!host) return;

    var p = (window.PRODUCTS || []).filter(function (x) {
      return x.spotlight;
    })[0];
    if (!p) {
      host.hidden = true;
      return;
    }
    var sp = p.spotlight;
    var bot = window.R.freeHref(p);
    var client = p.links && p.links.client;

    var stats = (sp.stats || [])
      .map(function (s) {
        return (
          '<div class="stat">' +
            '<span class="stat__value">' + esc(s.value) + "</span>" +
            '<span class="stat__label">' + esc(t(s.label)) + "</span>" +
          "</div>"
        );
      })
      .join("");

    host.hidden = false;
    host.innerHTML =
      '<div class="container">' +
        '<div class="spotlight reveal">' +
          '<div class="spotlight__text stack stack-6">' +
            '<span class="badge badge--ok"><span class="badge__dot"></span>' + esc(t(sp.eyebrow)) + "</span>" +
            '<h2 class="h2">' + esc(t(sp.title)) + "</h2>" +
            '<p class="lead">' + esc(t(sp.text)) + "</p>" +
            '<div class="spotlight__actions">' +
              '<a class="btn btn--primary btn--lg" href="' + esc(bot) + '" target="_blank" rel="noopener">' +
                icon("telegram", "btn__icon") + esc(t(sp.primary)) +
              "</a>" +
              '<a class="btn btn--ghost btn--lg" href="' + window.R.productUrl(p.id) + '">' +
                esc(t(sp.secondary)) +
              "</a>" +
            "</div>" +
            (client
              ? '<p class="spotlight__client dim">' + esc(t(sp.clientHint)) + " " +
                '<a href="' + esc(client) + '" target="_blank" rel="noopener">' +
                  esc(client.replace(/^https?:\/\//, "")) +
                "</a></p>"
              : "") +
            '<div class="spotlight__stats">' + stats + "</div>" +
          "</div>" +
          '<a class="spotlight__media" href="' + window.R.productUrl(p.id) + '" aria-label="' + esc(t(p.name)) + '">' +
            window.R.picture(p.image, t(p.name) + " — " + t(p.tagline), { width: 1200, height: 675 }) +
          "</a>" +
        "</div>" +
      "</div>";
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
    renderSpotlight();
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
