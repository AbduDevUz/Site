/* ============================================================
   Tinch — Buyurtma formasi
   URL: order.html?product=hr&plan=pro
        order.html?product=warehouse&plan=onetime:start  (Sale paketi)
   ------------------------------------------------------------
   Yuborish: SITE.forms.endpoint bo'lsa — JSON POST.
   Bo'sh bo'lsa — to'ldirilgan xabar bilan Telegram (yoki email)
   ochiladi (zaxira rejim). Zaxira rejimda forma tozalanmaydi:
   Telegram ochilmasa, mijoz xabarni nusxalab yubora oladi.
   ============================================================ */

(function () {
  "use strict";

  var S = window.SITE;

  var form = document.getElementById("orderForm");
  var productSel = document.getElementById("f-product");
  var planSel = document.getElementById("f-plan");
  var summaryHost = document.getElementById("orderSummary");
  var statusHost = document.getElementById("formStatus");
  var submitBtn = document.getElementById("submitBtn");

  if (!form) return;

  var countInput = form.elements.employees;
  var countField = countInput.closest(".field");
  var countLabel = countField.querySelector("label");

  function param(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (e) {
      return null;
    }
  }

  // Eski havolalar bilan moslik: order.html?service=hrm
  var LEGACY = { hrm: "hr", home: "", websites: "websites", warehouse: "warehouse", erp: "erp", crm: "crm" };
  var initialProduct = param("product") || LEGACY[param("service")] || "";
  var initialPlan = param("plan") || "";

  /* ------------------------------------------------------------
     Tanlov ro'yxatlari
     ------------------------------------------------------------ */

  function fillProducts() {
    var chosen = productSel.value || initialProduct;

    productSel.innerHTML =
      '<option value="">' + esc(t(S.order.fields.any)) + "</option>" +
      window.PRODUCTS.map(function (p) {
        return (
          '<option value="' + p.id + '">' +
          esc(t(p.name)) + (p.soon ? " — " + esc(t(S.ui.soon)) : "") +
          "</option>"
        );
      }).join("");

    if (chosen && window.R.byId(chosen)) productSel.value = chosen;
  }

  /**
   * Formada tanlanadigan tariflar, rejim bo'yicha guruhlangan.
   * Tarif kartasi bor rejimda — kartalar (basic, pro…). Kartasi yo'q
   * rejimda (Ombor va HR ning bir martalik «Sale» paketlari) — narx
   * jadvalining sotib olinadigan qatorlari (R.packageId: "onetime:start").
   */
  function choices(product) {
    var groups = [];

    (product.pricingModes || []).forEach(function (mode) {
      var items = [];

      if (mode.plans && mode.plans.length) {
        mode.plans.forEach(function (plan) {
          var price = plan.price
            ? window.I18N.num(window.R.planAmount(plan)) + " " + plan.price.currency +
              (plan.price.period ? " / " + t(plan.price.period) : "")
            : "";
          items.push({ id: plan.id, name: t(plan.name), price: price });
        });
      } else {
        (mode.priceTables || []).forEach(function (table) {
          (table.rows || []).forEach(function (row) {
            if (!window.R.isPackageRow(row)) return;
            items.push({
              id: window.R.packageId(mode, row),
              name: (mode.badge ? t(mode.badge) + " · " : "") + t(row.name),
              price: window.R.packagePrice(product, mode, row),
            });
          });
        });
      }

      if (items.length) groups.push({ label: t(mode.label), items: items });
    });

    return groups;
  }

  function chosenItem(product) {
    if (!product || !planSel.value) return null;
    var found = null;
    choices(product).forEach(function (g) {
      g.items.forEach(function (item) {
        if (item.id === planSel.value) found = item;
      });
    });
    return found;
  }

  function fillPlans() {
    var product = window.R.byId(productSel.value);
    var chosen = planSel.value || initialPlan;

    var html = '<option value="">' + esc(t(S.order.fields.any)) + "</option>";

    if (product) {
      var groups = choices(product);
      groups.forEach(function (g) {
        var opts = g.items
          .map(function (item) {
            return '<option value="' + esc(item.id) + '">' + esc(item.name) + "</option>";
          })
          .join("");
        // Bitta rejim bo'lsa guruh sarlavhasi ortiqcha
        html += groups.length > 1 ? '<optgroup label="' + esc(g.label) + '">' + opts + "</optgroup>" : opts;
      });
    }

    planSel.innerHTML = html;
    planSel.disabled = !product;

    if (chosen) {
      planSel.value = chosen;
      if (planSel.value !== chosen) planSel.value = ""; // bunday tarif yo'q
    }
  }

  /**
   * «Xodimlar soni» maydoni mahsulotga qarab: Ombor va Uylar foydalanuvchi
   * soni bo'yicha sotiladi, Savdo va Saytlarda bu maydon kerak emas
   * (products.js → orderCount).
   */
  function countKind(product) {
    if (product && product.orderCount !== undefined) return product.orderCount;
    return "employees";
  }

  function updateCountField() {
    var kind = countKind(window.R.byId(productSel.value));
    countField.hidden = kind === false;
    if (kind === false) {
      countInput.value = "";
      return;
    }
    countLabel.textContent = t(S.order.fields[kind]);
    countInput.setAttribute("placeholder", t(S.order.fields[kind + "Ph"]));
  }

  /* ------------------------------------------------------------
     Tanlangan tarif eslatmasi
     ------------------------------------------------------------ */

  function renderSummary() {
    var product = window.R.byId(productSel.value);
    if (!product) {
      summaryHost.innerHTML = "";
      return;
    }

    var item = chosenItem(product);
    var line = item ? item.name + (item.price ? " · " + item.price : "") : t(product.tagline);

    summaryHost.innerHTML =
      '<div class="order-summary">' +
        '<span class="order-summary__ic">' + icon(product.icon) + "</span>" +
        "<div>" +
          "<small>" + esc(t(item ? S.order.fields.plan : S.order.fields.product)) + "</small>" +
          "<b>" + esc(t(product.name)) + "</b>" +
          '<small style="margin-top:2px">' + esc(line) + "</small>" +
        "</div>" +
      "</div>";
  }

  /* ------------------------------------------------------------
     Tekshiruv
     ------------------------------------------------------------ */

  function setError(input, message) {
    var field = input.closest(".field");
    var box = field.querySelector(".field__error");
    field.classList.toggle("has-error", !!message);
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (box) {
      box.textContent = message || "";
      box.hidden = !message;
    }
  }

  function validate() {
    var ok = true;

    var name = form.elements.name;
    if (!name.value.trim()) {
      setError(name, t(S.order.validation.required));
      ok = false;
    } else {
      setError(name, "");
    }

    var phone = form.elements.phone;
    var digits = phone.value.replace(/\D/g, "");
    if (!phone.value.trim()) {
      setError(phone, t(S.order.validation.required));
      ok = false;
    } else if (digits.length < 9) {
      setError(phone, t(S.order.validation.phone));
      ok = false;
    } else {
      setError(phone, "");
    }

    var email = form.elements.email;
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      setError(email, t(S.order.validation.email));
      ok = false;
    } else {
      setError(email, "");
    }

    if (!ok) {
      var first = form.querySelector(".field.has-error input");
      if (first) first.focus();
    }
    return ok;
  }

  /* ------------------------------------------------------------
     Yuborish
     ------------------------------------------------------------ */

  function collect() {
    var product = window.R.byId(productSel.value);
    var item = chosenItem(product);
    var kind = countKind(product);

    return {
      name: form.elements.name.value.trim(),
      company: form.elements.company.value.trim(),
      phone: form.elements.phone.value.trim(),
      email: form.elements.email.value.trim(),
      productId: productSel.value,
      product: product ? t(product.name) : "",
      planId: planSel.value,
      plan: item ? item.name + (item.price ? " (" + item.price + ")" : "") : "",
      employees: kind === false ? "" : countInput.value.trim(),
      // Xabar matnida maydon nomi o'zbekcha — so'rovni egasi o'qiydi
      countLabel: kind === false ? "" : S.order.fields[kind].uz,
      message: form.elements.message.value.trim(),
      lang: window.I18N.lang(),
      page: window.location.href,
    };
  }

  function asText(data) {
    var lines = [
      "Ism: " + data.name,
      "Korxona: " + (data.company || "—"),
      "Telefon: " + data.phone,
      "Email: " + (data.email || "—"),
      "Mahsulot: " + (data.product || "—"),
      "Tarif: " + (data.plan || "—"),
    ];
    if (data.countLabel) lines.push(data.countLabel + ": " + (data.employees || "—"));
    return lines
      .concat(["", "Xabar:", data.message || "—", "", "Til: " + data.lang, "Sahifa: " + data.page])
      .join("\n");
  }

  function status(kind, message, extraHtml) {
    statusHost.innerHTML = message
      ? '<div class="form-status form-status--' + kind + '">' +
        icon(kind === "ok" ? "check" : "info") +
        "<div><p>" + esc(message) + "</p>" + (extraHtml || "") + "</div></div>"
      : "";
  }

  function setBusy(busy) {
    submitBtn.disabled = busy;
    submitBtn.querySelector("span").textContent = t(busy ? S.order.fields.sending : S.order.fields.submit);
  }

  function subjectOf(data) {
    return "Tinch — " + (data.product || "so'rov") + (data.plan ? " / " + data.plan : "");
  }

  function messageOf(data) {
    return subjectOf(data) + "\n\n" + asText(data);
  }

  function mailtoHref(data) {
    return (
      "mailto:" + S.forms.fallbackEmail +
      "?subject=" + encodeURIComponent(subjectOf(data)) +
      "&body=" + encodeURIComponent(asText(data))
    );
  }

  /**
   * Telegramda to'ldirilgan xabar bilan suhbatni ochadi.
   * Bot tokeni kerak emas — shuning uchun frontendda sir saqlanmaydi.
   * Telegram uzun matnni kesib qo'yishi mumkin, shuning uchun cheklaymiz.
   *
   * "noopener" ni window.open ga uzatib bo'lmaydi: bunda brauzer
   * standarti bo'yicha doim null qaytadi va kod saytning o'z tabini
   * ham t.me ga o'tkazib yuborardi. opener qo'lda uziladi.
   */
  function openTelegram(data) {
    var text = messageOf(data);
    if (text.length > 1500) text = text.slice(0, 1497) + "…";

    var url = S.company.telegramDirect + "?text=" + encodeURIComponent(text);
    var win = window.open(url, "_blank");
    if (win) {
      win.opener = null;
    } else {
      // Popup bloklangan — shu oynada ochamiz
      window.location.href = url;
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        if (document.execCommand("copy")) resolve();
        else reject(new Error("copy"));
      } catch (e) {
        reject(e);
      } finally {
        document.body.removeChild(area);
      }
    });
  }

  /** Zaxira rejimdagi natija: xabar + «ochilmadimi?» uchun ikki yo'l */
  function fallbackStatus(data, viaEmail) {
    status(
      "ok",
      t(viaEmail ? S.order.sentEmail : S.order.sentTelegram),
      '<p class="form-status__actions">' +
        "<span>" + esc(t(viaEmail ? S.order.notOpenedEmail : S.order.notOpened)) + "</span>" +
        '<button type="button" class="form-status__alt" data-copy>' + esc(t(S.order.copyCta)) + "</button>" +
        (viaEmail
          ? ""
          : '<a class="form-status__alt" href="' + mailtoHref(data) + '">' + esc(t(S.order.viaEmail)) + "</a>") +
      "</p>"
    );

    var btn = statusHost.querySelector("[data-copy]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      copyText(messageOf(data)).then(function () {
        btn.textContent = t(S.order.copied);
      });
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;

    var data = collect();
    status("", "");

    if (!S.forms.endpoint) {
      // Server sozlanmagan — zaxira rejim (site.js → forms.fallback).
      // Forma tozalanmaydi: yetib borgani noma'lum.
      var viaEmail = S.forms.fallback === "email";

      if (viaEmail) {
        window.location.href = mailtoHref(data);
      } else {
        openTelegram(data);
      }

      fallbackStatus(data, viaEmail);
      if (window.track) window.track("lead_fallback", { productId: data.productId, via: viaEmail ? "email" : "telegram" });
      return;
    }

    setBusy(true);

    fetch(S.forms.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        status("ok", t(S.order.success));
        if (window.track) window.track("lead_sent", { productId: data.productId });
        form.reset();
        fillProducts();
        fillPlans();
        updateCountField();
        renderSummary();
      })
      .catch(function () {
        status("err", t(S.order.error));
      })
      .finally(function () {
        setBusy(false);
      });
  });

  /* ------------------------------------------------------------
     Hodisalar
     ------------------------------------------------------------ */

  productSel.addEventListener("change", function () {
    initialPlan = "";
    planSel.value = "";
    fillPlans();
    updateCountField();
    renderSummary();
  });

  planSel.addEventListener("change", renderSummary);

  form.querySelectorAll("input").forEach(function (input) {
    input.addEventListener("input", function () {
      if (input.closest(".field").classList.contains("has-error")) setError(input, "");
    });
  });

  /* ------------------------------------------------------------
     Ishga tushirish
     ------------------------------------------------------------ */

  function render() {
    window.I18N.applyMeta(S.order.meta);
    fillProducts();
    fillPlans();
    updateCountField();
    renderSummary();
    setBusy(false);
  }

  render();
  window.I18N.onChange(render);
})();
