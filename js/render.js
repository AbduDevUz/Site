/* ============================================================
   Tinch — Umumiy render funksiyalari
   ------------------------------------------------------------
   Mahsulot kartasi, tarif kartalari, taqqoslash matritsasi va
   narxlar jadvali bir necha sahifada ishlatiladi — shuning uchun
   markup shu yerda bir marta yoziladi.
   ============================================================ */

(function () {
  "use strict";

  var S = window.SITE;

  /* ------------------------------------------------------------
     Yordamchilar
     ------------------------------------------------------------ */

  function byId(id) {
    return (window.PRODUCTS || []).filter(function (p) {
      return p.id === id;
    })[0];
  }

  /** Matritsa uchun ishlatiladigan tarif rejimi (birinchi showMatrix: true) */
  function matrixMode(product) {
    return (product.pricingModes || []).filter(function (m) {
      return m.showMatrix && m.plans && m.plans.length;
    })[0];
  }

  /**
   * Kartochkadagi «… dan» narxi.
   * Faqat BIRINCHI narxi bor rejim ichida solishtiriladi: aks holda
   * UZS va USD summalari xom holda taqqoslanib, 8 100 USD 900 000 UZS dan
   * «arzon» bo'lib chiqadi.
   */
  function entryPrice(product) {
    var modes = product.pricingModes || [];
    for (var i = 0; i < modes.length; i++) {
      var found = null;
      (modes[i].plans || []).forEach(function (plan) {
        if (plan.price && (!found || plan.price.amount < found.amount)) found = plan.price;
      });
      if (found) return found;
    }
    return null;
  }

  function planById(product, planId) {
    var out = null;
    (product.pricingModes || []).forEach(function (mode) {
      (mode.plans || []).forEach(function (plan) {
        if (plan.id === planId) out = plan;
      });
    });
    return out;
  }

  /**
   * Rasm markupi. image { webp, jpg } bo'lsa <picture> qaytaradi,
   * oddiy satr bo'lsa — oddiy <img>.
   */
  function picture(image, alt, opts) {
    opts = opts || {};
    var attrs =
      ' alt="' + esc(alt) + '"' +
      (opts.width ? ' width="' + opts.width + '"' : "") +
      (opts.height ? ' height="' + opts.height + '"' : "") +
      ' loading="' + (opts.eager ? "eager" : "lazy") + '"' +
      ' decoding="async"';

    if (typeof image === "string") {
      return '<img src="' + image + '"' + attrs + " />";
    }

    return (
      "<picture>" +
        '<source srcset="' + image.webp + '" type="image/webp" />' +
        '<img src="' + image.jpg + '"' + attrs + " />" +
      "</picture>"
    );
  }

  /**
   * ✓ / ✗ belgisi. soon=true bo'lsa — sariq soat belgisi:
   * imkoniyat tarifga kiritilgan, lekin hali ishga tushmagan.
   */
  function mark(on, soon) {
    if (!on) {
      return '<span class="mark mark--no" title="' + esc(t(S.ui.notIncluded)) + '">' + icon("x") + "</span>";
    }
    if (soon) {
      return '<span class="mark mark--soon" title="' + esc(t(S.ui.soonHint)) + '">' + icon("clock") + "</span>";
    }
    return '<span class="mark mark--yes" title="' + esc(t(S.ui.included)) + '">' + icon("check") + "</span>";
  }

  /** "Tez orada" yorlig'i */
  function soonBadge() {
    return '<span class="badge badge--yellow badge--xs">' + esc(t(S.ui.soon)) + "</span>";
  }

  /** Mahsulot hali ishga tushmagan bo'lsa — kartochka/sarlavha uchun yorliq */
  function soonRibbon() {
    return (
      '<span class="soon-ribbon">' + icon("clock") + esc(t(S.ui.soon)) + "</span>"
    );
  }

  /**
   * Ro'yxat elementi { uz, ru } yoki { label: { uz, ru }, soon: true }
   * ko'rinishida bo'lishi mumkin — ikkalasini ham qo'llab-quvvatlaymiz.
   */
  function entry(item) {
    var isMeta = item && typeof item === "object" && item.label;
    return {
      label: isMeta ? item.label : item,
      soon: !!(isMeta && item.soon),
    };
  }

  /* ------------------------------------------------------------
     Mahsulot kartasi (bosh sahifa)
     ------------------------------------------------------------ */

  function productCard(product) {
    var price = entryPrice(product);
    var priceUzs = price && price.currency === "USD" ? toUzs(price.amount) : "";
    var priceHtml = price
      ? '<div class="product-card__price">' + esc(t(S.ui.from)) +
        "<b>" + window.I18N.num(price.amount) + " " + price.currency + "</b>" +
        '<span>' + esc(t(price.period)) + "</span>" +
        (priceUzs ? '<span class="product-card__uzs">' + esc(priceUzs) + "</span>" : "") +
        "</div>"
      : '<div class="product-card__price"><b>' + esc(t(S.ui.priceOnRequest)) + "</b></div>";

    var tags = (product.tags || [])
      .map(function (tag) {
        return '<span class="badge">' + esc(t(tag)) + "</span>";
      })
      .join("");

    return (
      '<article class="card card--hover product-card reveal' + (product.soon ? " is-soon" : "") + '">' +
        '<a class="product-card__media" href="product.html?id=' + product.id + '" aria-label="' + esc(t(product.name)) + '">' +
          picture(product.image, t(product.name) + " — " + t(product.tagline), { width: 1200, height: 675 }) +
          '<span class="product-card__glyph">' + icon(product.icon) + "</span>" +
          (product.soon ? soonRibbon() : "") +
        "</a>" +
        '<div class="product-card__body">' +
          '<h3 class="card__title"><a href="product.html?id=' + product.id + '">' + esc(t(product.name)) + "</a></h3>" +
          '<p class="dim" style="font-size:var(--fs-xs)">' + esc(t(product.tagline)) + "</p>" +
          '<p class="card__text">' + esc(t(product.short)) + "</p>" +
          '<div class="product-card__tags">' + tags + "</div>" +
        "</div>" +
        '<div class="product-card__foot">' +
          (product.soon
            ? '<div class="product-card__price"><b>' + esc(t(S.ui.soon)) + "</b></div>"
            : priceHtml) +
          '<a class="link-arrow" href="product.html?id=' + product.id + '">' + esc(t(S.ui.detailsCta)) + "</a>" +
        "</div>" +
      "</article>"
    );
  }

  /* ------------------------------------------------------------
     Tarif kartalari
     ------------------------------------------------------------ */

  function planCard(product, plan) {
    var priceHtml;
    if (plan.price) {
      // Aksiya davrida bir martalik tariflar narxi promoFull dan qayta hisoblanadi
      var amount = plan.price.amount;
      var wasHtml = "";
      if (promoOn() && plan.promoFull) {
        wasHtml =
          '<span class="plan-card__was">' + window.I18N.num(amount) + " " +
          esc(plan.price.currency) + "</span>";
        amount = Math.round(plan.promoFull * (1 - S.promo.percent / 100));
      }
      var uzsLine =
        plan.price.currency === "USD" ? toUzs(amount) : "";

      priceHtml =
        '<div class="plan-card__price">' +
          wasHtml +
          '<span class="plan-card__amount">' + window.I18N.num(amount) + "</span>" +
          '<span class="plan-card__currency">' + esc(plan.price.currency) + "</span>" +
          (plan.price.period
            ? '<span class="plan-card__period">/ ' + esc(t(plan.price.period)) + "</span>"
            : "") +
          (uzsLine ? '<span class="plan-card__uzs">' + esc(uzsLine) + "</span>" : "") +
        "</div>";
    } else {
      priceHtml =
        '<div class="plan-card__price">' +
          '<span class="plan-card__amount" style="font-size:var(--fs-h3)">' + esc(t(S.ui.priceOnRequest)) + "</span>" +
        "</div>";
    }

    var list = (plan.highlights || [])
      .map(function (h) {
        var e = entry(h);
        return (
          '<li' + (e.soon ? ' class="is-soon"' : "") + ">" +
          icon(e.soon ? "clock" : "check") +
          "<span>" + esc(t(e.label)) + (e.soon ? " " + soonBadge() : "") + "</span>" +
          "</li>"
        );
      })
      .join("");

    var badge = plan.badge
      ? '<span class="plan-card__badge badge badge--accent"><span class="badge__dot"></span>' + esc(t(plan.badge)) + "</span>"
      : "";

    return (
      '<article class="plan-card reveal' + (plan.featured ? " plan-card--featured" : "") + '">' +
        badge +
        '<div class="stack stack-2">' +
          '<h3 class="plan-card__name">' + esc(t(plan.name)) + "</h3>" +
          '<p class="plan-card__desc">' + esc(t(plan.desc)) + "</p>" +
        "</div>" +
        priceHtml +
        '<ul class="plan-card__list">' + list + "</ul>" +
        '<a class="btn ' + (plan.featured ? "btn--primary" : "btn--ghost") + ' btn--block" ' +
          'href="order.html?product=' + product.id + "&plan=" + plan.id + '">' +
          esc(t(S.ui.orderCta)) +
        "</a>" +
      "</article>"
    );
  }

  /* ------------------------------------------------------------
     Taqqoslash matritsasi
     ------------------------------------------------------------ */

  /**
   * Taqqoslash matritsasi.
   * @param {object} product
   * @param {string[]} [planIds] qaysi tariflar ustun bo'lishi. Berilmasa —
   *   product.matrixPlans. Bu bir mahsulotda ikki xil tarif rejimi (obuna va
   *   bir martalik) bo'lganda har biriga o'z jadvalini berish imkonini beradi.
   */
  function matrix(product, planIds) {
    var mode = matrixMode(product);
    var ids = planIds || product.matrixPlans || [];
    if (!mode || !ids.length || !(product.featureGroups || []).length) return "";

    var plans = ids
      .map(function (id) {
        return planById(product, id);
      })
      .filter(Boolean);

    if (!plans.length) return "";

    /* --- Desktop: jadval --- */
    var head =
      "<thead><tr><th>" + esc(t(S.ui.allFeatures)) + "</th>" +
      plans
        .map(function (p) {
          return "<th>" + esc(t(p.name)) + (p.badge ? '<span class="badge badge--accent">' + esc(t(p.badge)) + "</span>" : "") + "</th>";
        })
        .join("") +
      "</tr></thead>";

    var body = "<tbody>";
    product.featureGroups.forEach(function (group) {
      body +=
        '<tr class="matrix__group"><th colspan="' + (plans.length + 1) + '">' + esc(t(group.title)) + "</th></tr>";
      group.items.forEach(function (item) {
        body +=
          "<tr><th>" + esc(t(item.label)) + (item.soon ? " " + soonBadge() : "") + "</th>";
        plans.forEach(function (p) {
          body += "<td>" + mark(!!item.plans[p.id], item.soon) + "</td>";
        });
        body += "</tr>";
      });
    });
    body += "</tbody>";

    var table = '<div class="matrix"><div class="matrix__scroll"><table>' + head + body + "</table></div></div>";

    /* --- Mobil: akkordeon --- */
    var acc = '<div class="matrix-mobile">';
    product.featureGroups.forEach(function (group, gi) {
      var included = group.items.filter(function (item) {
        return plans.some(function (p) {
          return item.plans[p.id];
        });
      }).length;

      acc +=
        '<div class="acc">' +
          '<button class="acc__head" type="button" aria-expanded="' + (gi === 0 ? "true" : "false") + '">' +
            "<span>" + esc(t(group.title)) + "</span>" +
            '<span class="acc__count">' + included + " / " + group.items.length + "</span>" +
            icon("chevron-down", "acc__chevron") +
          "</button>" +
          '<div class="acc__body">' +
            group.items
              .map(function (item) {
                return (
                  '<div class="acc__row"><span>' + esc(t(item.label)) +
                    (item.soon ? " " + soonBadge() : "") +
                  "</span>" +
                  '<span class="acc__marks">' +
                    plans
                      .map(function (p) {
                        return (
                          '<span class="acc__mark-col">' +
                            mark(!!item.plans[p.id], item.soon) +
                            "<small>" + esc(shortName(t(p.name))) + "</small>" +
                          "</span>"
                        );
                      })
                      .join("") +
                  "</span></div>"
                );
              })
              .join("") +
          "</div>" +
        "</div>";
    });
    acc += "</div>";

    return table + acc;
  }

  /** "Tinch HR PRO" → "PRO" (mobil ustun sarlavhasi uchun) */
  function shortName(name) {
    var parts = name.trim().split(/\s+/);
    return parts.length > 1 ? parts[parts.length - 1] : name;
  }

  function bindAccordions(root) {
    (root || document).querySelectorAll(".acc__head").forEach(function (head) {
      if (head.dataset.bound) return;
      head.dataset.bound = "1";
      head.addEventListener("click", function () {
        var open = head.getAttribute("aria-expanded") === "true";
        head.setAttribute("aria-expanded", String(!open));
      });
    });
  }

  /* ------------------------------------------------------------
     Narxlar jadvali
     ------------------------------------------------------------ */

  /* ------------------------------------------------------------
     Aksiya (vaqtinchalik chegirma)
     ------------------------------------------------------------ */

  /** Aksiya yoqilganmi va muddati o'tmaganmi */
  function promoOn() {
    var p = S.promo;
    if (!p || !p.active) return false;
    if (p.until) {
      // Muddati o'tgan bo'lsa — o'zi o'chadi, qo'lda tuzatish shart emas
      var end = new Date(p.until + "T23:59:59");
      if (!isNaN(end) && new Date() > end) return false;
    }
    return true;
  }

  /**
   * Dollardan taxminiy so'm.
   * Kurs qo'yilmagan bo'lsa bo'sh qaytaradi — noto'g'ri raqam
   * ko'rsatgandan ko'ra hech narsa ko'rsatmagan yaxshiroq.
   * Yaxlitlash: 10 000 so'mgacha, aks holda "4 551 372" kabi
   * soxta aniqlik paydo bo'ladi.
   */
  function toUzs(amountUsd) {
    var rate = S.usdRate;
    if (!rate || !amountUsd) return "";
    var v = Math.round((amountUsd * rate) / 10000) * 10000;
    return "≈ " + window.I18N.num(v) + " " + t(S.ui.sum);
  }

  /** 12345 -> "12 345" */
  function usd(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " USD";
  }

  /**
   * Bir martalik to'lov katagi.
   * Aksiya o'chiq bo'lsa — jadvaldagi tayyor matn (odatdagi −10%).
   * Yoqilgan bo'lsa — `full` dan hisoblanadi, eski narx chizib tashlanadi.
   */
  function onceCell(row) {
    var uzs = "";
    if (!promoOn() || !row.full) {
      // Aksiya yo'q — jadvaldagi tayyor matn, so'mni undagi raqamdan olamiz
      var plain = String(row.onceHtml || "").replace(/<span[\s\S]*?<\/span>/g, "");
      var num = parseInt(plain.replace(/[^\d]/g, ""), 10);
      uzs = toUzs(num);
      return (
        String(row.onceHtml || "") +
        (uzs ? '<span class="cell-uzs">' + esc(uzs) + "</span>" : "")
      );
    }
    var price = Math.round(row.full * (1 - S.promo.percent / 100));
    uzs = toUzs(price);
    return (
      '<s class="cell-was">' + esc(String(row.onceHtml || "").replace(/<span[\s\S]*?<\/span>/g, "").trim()) + "</s> " +
      '<b class="cell-promo">' + usd(price) + "</b> " +
      '<span class="cell-off cell-off--promo">−' + S.promo.percent + "%</span>" +
      (uzs ? '<span class="cell-uzs">' + esc(uzs) + "</span>" : "")
    );
  }

  function priceTable(table) {
    var head =
      "<thead><tr>" +
      table.columns
        .map(function (c) {
          return "<th>" + esc(t(c.label)) + "</th>";
        })
        .join("") +
      "</tr></thead>";

    var body =
      "<tbody>" +
      table.rows
        .map(function (row) {
          return (
            "<tr>" +
            table.columns
              .map(function (c) {
                var raw = row[c.key];
                var value =
                  c.key === "onceHtml" ? onceCell(row) :
                  c.html ? String(raw || "") : esc(t(raw));
                var cls = c.strong ? ' class="cell-strong"' : c.quiet ? ' class="cell-quiet"' : "";
                return "<td" + cls + ">" + value + "</td>";
              })
              .join("") +
            "</tr>"
          );
        })
        .join("") +
      "</tbody>";

    return (
      '<div class="stack stack-4 reveal">' +
        (table.title ? '<h3 class="h4">' + esc(t(table.title)) + "</h3>" : "") +
        '<div class="price-table">' +
          '<div class="price-table__scroll"><table>' + head + body + "</table></div>" +
          (table.foot ? '<div class="price-table__foot">' + t(table.foot) + "</div>" : "") +
        "</div>" +
      "</div>"
    );
  }

  /* ------------------------------------------------------------
     Eslatmalar
     ------------------------------------------------------------ */

  function notes(list) {
    if (!list || !list.length) return "";
    return list
      .map(function (n) {
        var cls = n.type === "warn" ? " callout--warn" : "";
        return (
          '<div class="callout' + cls + ' reveal">' +
            icon("info", "callout__icon") +
            "<div>" + t(n.text) + "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ------------------------------------------------------------
     To'liq tarif bloki (rejim almashtirgich bilan)
     ------------------------------------------------------------ */

  /**
   * Aksiya shu mahsulot va shu rejimga tegishlimi.
   * Faqat sotib olish rejimlariga (onetime / project) va faqat ishga
   * tushgan mahsulotlarga — hali chiqmagan CRM/ERP ga chegirma e'lon
   * qilish mantiqsiz bo'lardi.
   */
  function promoApplies(product, mode) {
    if (!promoOn() || product.soon || mode.promoExclude) return false;
    return mode.id === "onetime" || mode.id === "project";
  }

  /** Tariflar ichidagi aksiya kartasi */
  function promoCard() {
    var p = S.promo;
    return (
      '<div class="promo-card">' +
        '<div class="promo-card__head">' +
          '<span class="promo-card__badge">' + esc(t(p.badge)) + "</span>" +
          '<h3 class="h4">' + esc(t(p.title)) + "</h3>" +
        "</div>" +
        '<p class="promo-card__text">' + esc(t(p.text)) + "</p>" +
        '<p class="promo-card__note">' + t(p.serverNote) + "</p>" +
        '<p class="promo-card__deadline">' + icon("clock") + "<span>" +
          esc(t(p.deadline)) + "</span></p>" +
      "</div>"
    );
  }

  function pricingBlock(product, opts) {
    opts = opts || {};
    var modes = product.pricingModes || [];
    if (!modes.length) return "";

    var showSwitch = modes.length > 1;
    var switcher = showSwitch
      ? '<div class="segmented" role="tablist" data-pricing-switch="' + product.id + '">' +
        modes
          .map(function (m, i) {
            return (
              '<button type="button" role="tab" data-mode="' + m.id + '"' +
              (i === 0 ? ' class="is-active" aria-selected="true"' : ' aria-selected="false"') +
              ">" + esc(t(m.label)) +
              (promoApplies(product, m)
                ? '<span class="segmented__promo">' + esc(t(S.promo.badge)) + "</span>"
                : "") +
              "</button>"
            );
          })
          .join("") +
        "</div>"
      : "";

    var panels = modes
      .map(function (m, i) {
        var inner = '<div class="stack stack-8">';

        if (promoApplies(product, m)) inner += promoCard();

        if (m.description) {
          inner += '<p class="lead" style="max-width:60ch">' + esc(t(m.description)) + "</p>";
        }
        if (m.plans && m.plans.length) {
          inner +=
            '<div class="plans">' +
            m.plans
              .map(function (plan) {
                return planCard(product, plan);
              })
              .join("") +
            "</div>";
        }
        if (m.showMatrix && opts.matrix !== false) {
          inner +=
            '<div class="stack stack-4">' +
              '<h3 class="h3">' + esc(t(S.ui.featureCompare)) + "</h3>" +
              matrix(product, m.matrixPlans) +
            "</div>";
        }
        if (m.priceTables && m.priceTables.length) {
          inner += m.priceTables.map(priceTable).join("");
        }
        inner += notes(m.notes);
        inner += "</div>";

        return (
          '<div class="pricing-panel" data-mode-panel="' + m.id + '"' + (i === 0 ? "" : " hidden") + ">" +
          inner +
          "</div>"
        );
      })
      .join("");

    return (
      '<div class="pricing-block" data-product="' + product.id + '">' +
        (switcher ? '<div class="row" style="margin-bottom:var(--space-8)">' + switcher + "</div>" : "") +
        panels +
      "</div>"
    );
  }

  function bindPricingSwitch(root) {
    (root || document).querySelectorAll("[data-pricing-switch]").forEach(function (group) {
      if (group.dataset.bound) return;
      group.dataset.bound = "1";

      var block = group.closest(".pricing-block");
      group.querySelectorAll("button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          group.querySelectorAll("button").forEach(function (b) {
            b.classList.remove("is-active");
            b.setAttribute("aria-selected", "false");
          });
          btn.classList.add("is-active");
          btn.setAttribute("aria-selected", "true");

          var mode = btn.getAttribute("data-mode");
          block.querySelectorAll("[data-mode-panel]").forEach(function (panel) {
            panel.hidden = panel.getAttribute("data-mode-panel") !== mode;
          });

          if (window.observeReveal) window.observeReveal(block);
          bindAccordions(block);
        });
      });
    });
  }

  /** Render qilingandan keyin barcha interaktiv elementlarni ulash */
  function hydrate(root) {
    bindAccordions(root);
    bindPricingSwitch(root);
    if (window.observeReveal) window.observeReveal(root);
  }

  /* ------------------------------------------------------------
     Eksport
     ------------------------------------------------------------ */

  window.R = {
    byId: byId,
    planById: planById,
    matrixMode: matrixMode,
    entryPrice: entryPrice,
    mark: mark,
    soonBadge: soonBadge,
    soonRibbon: soonRibbon,
    promoOn: promoOn,
    entry: entry,
    picture: picture,
    productCard: productCard,
    planCard: planCard,
    matrix: matrix,
    priceTable: priceTable,
    notes: notes,
    pricingBlock: pricingBlock,
    hydrate: hydrate,
  };
})();
