/* ============================================================
   TINCH SOFT — Tariflar sahifasi
   URL: pricing.html?product=hr   (ixtiyoriy)
   ============================================================ */

(function () {
  "use strict";

  var S = window.SITE;
  var tabsHost = document.getElementById("pricingTabs");
  var root = document.getElementById("pricingRoot");

  function param(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (e) {
      return null;
    }
  }

  var activeId =
    param("product") ||
    (window.location.hash ? window.location.hash.slice(1) : "") ||
    (window.PRODUCTS[0] && window.PRODUCTS[0].id);

  if (!window.R.byId(activeId)) activeId = window.PRODUCTS[0].id;

  function renderTabs() {
    tabsHost.innerHTML = window.PRODUCTS.map(function (p) {
      return (
        '<a href="#' + p.id + '" data-product="' + p.id + '" role="tab"' +
        (p.id === activeId ? ' class="is-active" aria-selected="true"' : ' aria-selected="false"') +
        ">" + icon(p.icon) + esc(t(p.name)) + "</a>"
      );
    }).join("");

    tabsHost.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        activeId = a.getAttribute("data-product");
        try {
          // file:// orqali ochilganda brauzer replaceState ni bloklaydi —
          // bu holda manzil yangilanmaydi, sahifa esa ishlayveradi.
          window.history.replaceState(null, "", "#" + activeId);
        } catch (e) {
          window.location.hash = activeId;
        }
        renderTabs();
        renderPanel();
      });
    });
  }

  function renderPanel() {
    var product = window.R.byId(activeId);
    if (!product) return;

    root.innerHTML =
      '<div class="stack stack-6">' +
        '<div class="stack stack-2 reveal">' +
          '<h2 class="h2">' + esc(t(product.name)) + "</h2>" +
          '<p class="lead" style="max-width:60ch">' + esc(t(product.tagline)) + "</p>" +
          '<div class="row" style="margin-top:var(--space-3)">' +
            '<a class="link-arrow" href="product.html?id=' + product.id + '">' +
              esc(t(S.ui.detailsCta)) +
            "</a>" +
          "</div>" +
        "</div>" +
        window.R.pricingBlock(product) +
      "</div>";

    window.R.hydrate(root);
  }

  function render() {
    window.I18N.applyMeta(S.pricing.meta);
    renderTabs();
    renderPanel();
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
