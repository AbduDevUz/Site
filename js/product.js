/* ============================================================
   TINCH SOFT — Mahsulot sahifasi
   URL: product.html?id=hr
   ============================================================ */

(function () {
  "use strict";

  var S = window.SITE;
  var root = document.getElementById("productRoot");

  function param(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (e) {
      return null;
    }
  }

  var productId = param("id") || (window.PRODUCTS[0] && window.PRODUCTS[0].id);

  /* ------------------------------------------------------------
     Bloklar
     ------------------------------------------------------------ */

  function crumbs(product) {
    return (
      '<nav class="crumbs" aria-label="breadcrumb"><ol>' +
        '<li><a href="index.html">' + esc(t(S.ui.backHome)) + "</a></li>" +
        '<li><a href="index.html#products">' + esc(t(S.ui.products)) + "</a></li>" +
        "<li>" + esc(t(product.name)) + "</li>" +
      "</ol></nav>"
    );
  }

  function switcher(product) {
    return (
      '<div class="product-switch">' +
      window.PRODUCTS.map(function (p) {
        return (
          '<a href="product.html?id=' + p.id + '"' + (p.id === product.id ? ' class="is-active"' : "") + ">" +
          icon(p.icon) + esc(t(p.name)) +
          "</a>"
        );
      }).join("") +
      "</div>"
    );
  }

  function hero(product) {
    var price = window.R.entryPrice(product);
    var priceLine = price
      ? esc(t(S.ui.from)) + " <b>" + window.I18N.num(price.amount) + " " + price.currency + "</b> / " + esc(t(price.period))
      : esc(t(S.ui.priceOnRequest));

    return (
      '<section class="product-hero"><div class="container">' +
        crumbs(product) +
        '<div class="product-hero__grid">' +
          '<div class="stack stack-6 reveal">' +
            '<span class="product-hero__badge"><span class="ic">' + icon(product.icon) + "</span>" +
              esc(t(product.tagline)) +
            "</span>" +
            '<h1 class="h1">' + esc(t(product.name)) + "</h1>" +
            '<p class="lead" style="max-width:60ch">' + esc(t(product.intro)) + "</p>" +
            '<div class="row">' +
              '<a class="btn btn--primary btn--lg" href="order.html?product=' + product.id + '">' +
                esc(t(S.ui.orderCta)) +
              "</a>" +
              '<a class="btn btn--ghost btn--lg" href="#pricing">' + esc(t(S.ui.tariffsCta)) + "</a>" +
            "</div>" +
            '<p class="dim" style="font-size:var(--fs-sm)">' + priceLine + "</p>" +
          "</div>" +
          '<div class="product-hero__media reveal">' +
            window.R.picture(product.image, t(product.name) + " — " + t(product.tagline), {
              width: 1200,
              height: 900,
              eager: true,
            }) +
          "</div>" +
        "</div>" +
      "</div></section>"
    );
  }

  function anchorNav() {
    return (
      '<div class="container"><nav class="anchor-nav" aria-label="section">' +
        '<a href="#features">' + esc(t(S.product.navFeatures)) + "</a>" +
        '<a href="#modules">' + esc(t(S.product.navModules)) + "</a>" +
        '<a href="#pricing">' + esc(t(S.product.navPricing)) + "</a>" +
      "</nav></div>"
    );
  }

  function features(product) {
    if (!(product.highlights || []).length) return "";

    return (
      '<section class="section section--tight" id="features"><div class="container">' +
        '<div class="section-head reveal">' +
          '<span class="eyebrow">' + esc(t(S.product.featuresEyebrow)) + "</span>" +
          '<h2 class="h2">' + esc(t(S.product.featuresTitle)) + "</h2>" +
        "</div>" +
        '<div class="grid grid--3">' +
          product.highlights
            .map(function (h) {
              return (
                '<article class="card card--hover reveal">' +
                  '<span class="card__icon">' + icon(hasIcon(h.icon) ? h.icon : "sparkles") + "</span>" +
                  '<h3 class="card__title">' + esc(t(h.title)) +
                    (h.soon ? " " + window.R.soonBadge() : "") +
                  "</h3>" +
                  '<p class="card__text">' + esc(t(h.text)) + "</p>" +
                "</article>"
              );
            })
            .join("") +
        "</div>" +
      "</div></section>"
    );
  }

  function modules(product) {
    if (!(product.featureGroups || []).length) return "";

    return (
      '<section class="section section--tight" id="modules"><div class="container">' +
        '<div class="section-head reveal">' +
          '<span class="eyebrow">' + esc(t(S.product.modulesEyebrow)) + "</span>" +
          '<h2 class="h2">' + esc(t(S.product.modulesTitle)) + "</h2>" +
          '<p class="lead">' + esc(t(S.product.modulesText)) + "</p>" +
        "</div>" +
        '<div class="grid grid--3">' +
          product.featureGroups
            .map(function (group) {
              return (
                '<article class="card reveal">' +
                  '<div class="row" style="justify-content:space-between">' +
                    '<h3 class="card__title">' + esc(t(group.title)) + "</h3>" +
                    '<span class="badge">' + group.items.length + "</span>" +
                  "</div>" +
                  '<ul class="plan-card__list" style="border-top:0;padding-top:0">' +
                    group.items
                      .map(function (item) {
                        return (
                          '<li' + (item.soon ? ' class="is-soon"' : "") + ">" +
                          icon(item.soon ? "clock" : "check") +
                          "<span>" + esc(t(item.label)) +
                            (item.soon ? " " + window.R.soonBadge() : "") +
                          "</span></li>"
                        );
                      })
                      .join("") +
                  "</ul>" +
                "</article>"
              );
            })
            .join("") +
        "</div>" +
      "</div></section>"
    );
  }

  function pricing(product) {
    return (
      '<section class="section" id="pricing"><div class="container">' +
        '<div class="section-head reveal">' +
          '<span class="eyebrow">' + esc(t(S.product.pricingEyebrow)) + "</span>" +
          '<h2 class="h2">' + esc(t(S.product.pricingTitle)) + "</h2>" +
        "</div>" +
        window.R.pricingBlock(product) +
      "</div></section>"
    );
  }

  function others(product) {
    var rest = window.PRODUCTS.filter(function (p) {
      return p.id !== product.id;
    });
    if (!rest.length) return "";

    return (
      '<section class="section section--tight"><div class="container">' +
        '<div class="section-head reveal"><h2 class="h3">' + esc(t(S.product.otherProducts)) + "</h2></div>" +
        '<div class="grid grid--4">' + rest.map(window.R.productCard).join("") + "</div>" +
      "</div></section>"
    );
  }

  function cta() {
    return (
      '<section class="section section--tight"><div class="container">' +
        '<div class="cta-band reveal">' +
          '<div class="cta-band__text stack stack-3">' +
            '<h2 class="h3">' + esc(t(S.product.ctaTitle)) + "</h2>" +
            '<p class="muted">' + esc(t(S.product.ctaText)) + "</p>" +
          "</div>" +
          '<div class="cta-band__actions">' +
            '<a class="btn btn--primary btn--lg" href="order.html?product=' + productId + '">' +
              esc(t(S.ui.orderCta)) +
            "</a>" +
            '<a class="btn btn--ghost btn--lg" href="' + S.company.telegram + '" target="_blank" rel="noopener">' +
              esc(t(S.ui.writeTelegram)) +
            "</a>" +
          "</div>" +
        "</div>" +
      "</div></section>"
    );
  }

  function notFound() {
    return (
      '<div class="container section"><div class="empty-state">' +
        '<span class="empty-state__ic">' + icon("info") + "</span>" +
        '<h1 class="h3">' + esc(t(S.ui.notFound)) + "</h1>" +
        '<a class="btn btn--primary" href="index.html#products">' + esc(t(S.ui.products)) + "</a>" +
      "</div></div>"
    );
  }

  /* ------------------------------------------------------------
     SEO
     ------------------------------------------------------------ */

  function seo(product) {
    window.I18N.applyMeta({
      title: {
        uz: t(product.name) + " — " + t(product.tagline) + " | TINCH SOFT",
        ru: t(product.name) + " — " + t(product.tagline) + " | TINCH SOFT",
      },
      description: product.short,
    });

    var canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = S.company.url + "/product.html?id=" + product.id;

    var offers = [];
    (product.pricingModes || []).forEach(function (mode) {
      (mode.plans || []).forEach(function (plan) {
        if (!plan.price) return;
        offers.push({
          "@type": "Offer",
          name: t(plan.name),
          price: plan.price.amount,
          priceCurrency: plan.price.currency,
        });
      });
    });

    var node = document.getElementById("productJsonLd");
    if (node) {
      node.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: t(product.name),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: t(product.short),
        inLanguage: ["uz", "ru"],
        publisher: { "@type": "Organization", name: S.company.name, url: S.company.url },
        offers: offers.length ? offers : undefined,
      });
    }
  }

  /* ------------------------------------------------------------
     Bo'lim navigatsiyasini kuzatish
     ------------------------------------------------------------ */

  function trackSections() {
    var links = Array.prototype.slice.call(root.querySelectorAll(".anchor-nav a"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    var sections = links
      .map(function (a) {
        return document.querySelector(a.getAttribute("href"));
      })
      .filter(Boolean);

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach(function (s) {
      io.observe(s);
    });
  }

  /* ------------------------------------------------------------
     Render
     ------------------------------------------------------------ */

  function render() {
    var product = window.R.byId(productId);

    if (!product) {
      root.innerHTML = notFound();
      window.I18N.applyMeta({ title: S.ui.notFound, description: S.ui.notFound });
      return;
    }

    seo(product);

    root.innerHTML =
      '<div class="container" style="padding-top:var(--space-6)">' + switcher(product) + "</div>" +
      hero(product) +
      anchorNav() +
      features(product) +
      modules(product) +
      pricing(product) +
      cta() +
      others(product);

    window.R.hydrate(root);
    trackSections();
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
