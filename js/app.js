/* ============================================================
   Tinch — Umumiy sahifa qobig'i
   Header, mobil menyu, til almashtirgich, footer, scroll effektlari.
   Har bir sahifada shu fayl ulanadi.
   ============================================================ */

(function () {
  "use strict";

  var S = window.SITE;
  var PRODUCTS = window.PRODUCTS || [];

  /* ------------------------------------------------------------
     Header
     ------------------------------------------------------------ */

  function navLinks(extraClass) {
    var here = currentPage();
    return S.nav
      .map(function (item) {
        var active = isActive(item.href, here) ? " is-active" : "";
        return (
          '<a href="' + item.href + '" class="' + (extraClass || "") + active + '">' +
          esc(t(item.label)) +
          "</a>"
        );
      })
      .join("");
  }

  function currentPage() {
    var file = window.location.pathname.split("/").pop();
    return file === "" ? "index.html" : file;
  }

  function isActive(href, here) {
    var target = href.split("#")[0];
    if (href.indexOf("#") !== -1 && target === here) {
      // "index.html#products" faqat shu hash ochilganda faol
      return window.location.hash === "#" + href.split("#")[1];
    }
    if (target !== here) return false;
    return !window.location.hash || href.indexOf("#") !== -1;
  }

  function langSwitch() {
    return (
      '<div class="lang-switch" role="group" aria-label="Til / Язык">' +
      window.I18N.SUPPORTED.map(function (code) {
        return (
          '<button type="button" data-lang="' + code + '"' +
          (code === window.I18N.lang() ? ' class="is-active" aria-current="true"' : "") +
          ">" + code + "</button>"
        );
      }).join("") +
      "</div>"
    );
  }

  /**
   * Aksiya lentasi — sarlavha ustidagi ingichka qator.
   * SITE.promo.active = false bo'lsa umuman chiqmaydi.
   */
  function promoBar() {
    if (!window.R || !window.R.promoOn || !window.R.promoOn()) return "";
    var p = S.promo;
    return (
      '<a class="promo-bar" href="pricing.html">' +
        '<span class="promo-bar__badge">' + esc(t(p.badge)) + "</span>" +
        '<span class="promo-bar__text">' + esc(t(p.title)) + "</span>" +
        '<span class="promo-bar__until">' + esc(t(p.deadline)) + "</span>" +
      "</a>"
    );
  }

  function renderHeader() {
    var host = document.getElementById("siteHeader");
    if (!host) return;

    host.className = "site-header";
    host.innerHTML =
      promoBar() +
      '<div class="container site-header__inner">' +
        '<a class="brand-logo" href="index.html" aria-label="' + esc(S.company.name) + '">' +
          '<img src="' + S.company.logo + '" alt="" width="34" height="34" />' +
          '<span class="brand-logo__text">' + esc(S.company.name) + "</span>" +
        "</a>" +
        '<nav class="site-nav" aria-label="' + esc(t(S.ui.products)) + '">' + navLinks() + "</nav>" +
        '<div class="header-actions">' +
          '<a class="header-phone" href="' + S.company.phoneHref + '">' +
            icon("phone") + "<span>" + esc(S.company.phone) + "</span>" +
          "</a>" +
          langSwitch() +
          '<a class="btn btn--primary btn--sm" href="order.html">' + esc(t(S.ui.orderCta)) + "</a>" +
          '<button class="burger" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="Menu">' +
            "<span></span><span></span><span></span>" +
          "</button>" +
        "</div>" +
      "</div>" +
      '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile">' +
        navLinks() +
        '<a class="btn btn--primary btn--block btn--lg" href="order.html" style="margin-top:var(--space-4)">' +
          esc(t(S.ui.orderCta)) +
        "</a>" +
        '<a class="btn btn--ghost btn--block" href="' + S.company.phoneHref + '">' +
          icon("phone", "btn__icon") + esc(S.company.phone) +
        "</a>" +
      "</nav>";

    bindHeader(host);
  }

  function bindHeader(host) {
    // Til
    host.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        window.I18N.setLang(btn.getAttribute("data-lang"));
      });
    });

    // Mobil menyu
    var burger = host.querySelector(".burger");
    var drawer = host.querySelector("#mobileNav");
    if (burger && drawer) {
      burger.addEventListener("click", function () {
        var open = burger.getAttribute("aria-expanded") === "true";
        burger.setAttribute("aria-expanded", String(!open));
        drawer.classList.toggle("is-open", !open);
        document.body.classList.toggle("is-locked", !open);
      });

      drawer.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          burger.setAttribute("aria-expanded", "false");
          drawer.classList.remove("is-open");
          document.body.classList.remove("is-locked");
        });
      });

      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && drawer.classList.contains("is-open")) {
          burger.click();
        }
      });
    }
  }

  /* ------------------------------------------------------------
     Footer
     ------------------------------------------------------------ */

  function renderFooter() {
    var host = document.getElementById("siteFooter");
    if (!host) return;

    host.className = "site-footer";

    var productLinks = PRODUCTS.map(function (p) {
      return '<li><a href="product.html?id=' + p.id + '">' + esc(t(p.name)) + "</a></li>";
    }).join("");

    var companyLinks = S.footer.companyLinks
      .map(function (l) {
        return '<li><a href="' + l.href + '">' + esc(t(l.label)) + "</a></li>";
      })
      .join("");

    var socials = S.company.socials
      .map(function (s) {
        return (
          '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' +
          icon(s.id) +
          "</a>"
        );
      })
      .join("");

    host.innerHTML =
      '<div class="container">' +
        '<div class="site-footer__grid">' +
          "<div>" +
            '<a class="brand-logo" href="index.html">' +
              '<img src="' + S.company.logo + '" alt="" width="34" height="34" />' +
              '<span class="brand-logo__text">' + esc(S.company.name) + "</span>" +
            "</a>" +
            '<p class="brand-slogan">' + esc(t(S.company.slogan)) + "</p>" +
            '<p class="card__text" style="max-width:40ch">' + esc(t(S.footer.about)) + "</p>" +
            '<div class="socials" style="margin-top:var(--space-6)">' + socials + "</div>" +
          "</div>" +
          "<div><h4>" + esc(t(S.footer.colProducts)) + "</h4><ul>" + productLinks + "</ul></div>" +
          "<div><h4>" + esc(t(S.footer.colCompany)) + "</h4><ul>" + companyLinks + "</ul></div>" +
          "<div><h4>" + esc(t(S.footer.colContacts)) + "</h4>" +
            "<address>" +
              '<a href="' + S.company.phoneHref + '">' + esc(S.company.phone) + "</a>" +
              '<a href="mailto:' + S.company.email + '">' + esc(S.company.email) + "</a>" +
              "<span>" + esc(t(S.ui.address)) + "</span>" +
              '<span class="dim" style="font-size:var(--fs-xs)">' + esc(t(S.ui.hoursWeekdays)) + "<br>" +
                esc(t(S.ui.hoursWeekends)) + "</span>" +
            "</address>" +
          "</div>" +
        "</div>" +
        '<div class="site-footer__bottom">' +
          "<span>© " + new Date().getFullYear() + " " + S.company.name + ". " + esc(t(S.footer.rights)) + "</span>" +
          '<span><a href="' + S.company.url + '">tinch.uz</a></span>' +
        "</div>" +
      "</div>";
  }

  /* ------------------------------------------------------------
     Telegram tugmasi
     ------------------------------------------------------------ */

  function renderFab() {
    if (document.querySelector(".fab")) return;
    var a = document.createElement("a");
    a.className = "fab";
    a.href = S.company.telegram;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = icon("telegram") + "<span>" + esc(t(S.ui.writeTelegram)) + "</span>";
    document.body.appendChild(a);
  }

  function refreshFab() {
    var fab = document.querySelector(".fab span");
    if (fab) fab.textContent = t(S.ui.writeTelegram);
  }

  /* ------------------------------------------------------------
     Scroll effektlari
     ------------------------------------------------------------ */

  function initScroll() {
    var header = document.getElementById("siteHeader");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-stuck", window.scrollY > 8);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    window.observeReveal = function (root) {
      (root || document).querySelectorAll(".reveal:not(.is-visible)").forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i, 6) * 60 + "ms";
        io.observe(el);
      });
    };

    window.observeReveal();
  }

  /* ------------------------------------------------------------
     Ishga tushirish
     ------------------------------------------------------------ */

  function boot() {
    renderHeader();
    renderFooter();
    renderFab();
    window.I18N.apply();
    initScroll();

    window.I18N.onChange(function () {
      renderHeader();
      renderFooter();
      refreshFab();
      window.I18N.apply();
      // Sticky holatini tiklash
      var header = document.getElementById("siteHeader");
      if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
