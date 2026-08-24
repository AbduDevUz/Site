/* ============================================================
   TINCH SOFT — Buyurtma formasi
   URL: order.html?product=hr&plan=pro
   ------------------------------------------------------------
   Yuborish: SITE.forms.endpoint bo'lsa — JSON POST.
   Bo'sh bo'lsa — to'ldirilgan email xati ochiladi (zaxira rejim).
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
        return '<option value="' + p.id + '">' + esc(t(p.name)) + "</option>";
      }).join("");

    if (chosen && window.R.byId(chosen)) productSel.value = chosen;
  }

  function fillPlans() {
    var product = window.R.byId(productSel.value);
    var chosen = planSel.value || initialPlan;

    var options = ['<option value="">' + esc(t(S.order.fields.any)) + "</option>"];

    if (product) {
      (product.pricingModes || []).forEach(function (mode) {
        (mode.plans || []).forEach(function (plan) {
          options.push('<option value="' + plan.id + '">' + esc(t(plan.name)) + "</option>");
        });
      });
    }

    planSel.innerHTML = options.join("");
    planSel.disabled = !product;

    if (chosen) {
      planSel.value = chosen;
      if (planSel.value !== chosen) planSel.value = ""; // bunday tarif yo'q
    }
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

    var plan = planSel.value ? window.R.planById(product, planSel.value) : null;
    var line = plan
      ? t(plan.name) + (plan.price ? " · " + window.I18N.num(plan.price.amount) + " " + plan.price.currency + " / " + t(plan.price.period) : "")
      : t(product.tagline);

    summaryHost.innerHTML =
      '<div class="order-summary">' +
        '<span class="order-summary__ic">' + icon(product.icon) + "</span>" +
        "<div>" +
          "<small>" + esc(t(plan ? S.order.fields.plan : S.order.fields.product)) + "</small>" +
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
    var plan = product && planSel.value ? window.R.planById(product, planSel.value) : null;

    return {
      name: form.elements.name.value.trim(),
      company: form.elements.company.value.trim(),
      phone: form.elements.phone.value.trim(),
      email: form.elements.email.value.trim(),
      productId: productSel.value,
      product: product ? t(product.name) : "",
      planId: planSel.value,
      plan: plan ? t(plan.name) : "",
      employees: form.elements.employees.value.trim(),
      message: form.elements.message.value.trim(),
      lang: window.I18N.lang(),
      page: window.location.href,
    };
  }

  function asText(data) {
    return [
      "Ism: " + data.name,
      "Korxona: " + (data.company || "—"),
      "Telefon: " + data.phone,
      "Email: " + (data.email || "—"),
      "Mahsulot: " + (data.product || "—"),
      "Tarif: " + (data.plan || "—"),
      "Xodimlar soni: " + (data.employees || "—"),
      "",
      "Xabar:",
      data.message || "—",
      "",
      "Til: " + data.lang,
      "Sahifa: " + data.page,
    ].join("\n");
  }

  function status(kind, message, extraHtml) {
    statusHost.innerHTML = message
      ? '<div class="form-status form-status--' + kind + '">' +
        icon(kind === "ok" ? "check" : "info") +
        "<span>" + esc(message) + (extraHtml || "") + "</span></div>"
      : "";
  }

  function setBusy(busy) {
    submitBtn.disabled = busy;
    submitBtn.querySelector("span").textContent = t(busy ? S.order.fields.sending : S.order.fields.submit);
  }

  function subjectOf(data) {
    return "TINCH SOFT — " + (data.product || "so'rov") + (data.plan ? " / " + data.plan : "");
  }

  function mailtoHref(data) {
    return (
      "mailto:" + S.forms.fallbackEmail +
      "?subject=" + encodeURIComponent(subjectOf(data)) +
      "&body=" + encodeURIComponent(asText(data))
    );
  }

  function mailtoFallback(data) {
    window.location.href = mailtoHref(data);
  }

  /**
   * Telegramda to'ldirilgan xabar bilan suhbatni ochadi.
   * Bot tokeni kerak emas — shuning uchun frontendda sir saqlanmaydi.
   * Telegram uzun matnni kesib qo'yishi mumkin, shuning uchun cheklaymiz.
   */
  function telegramFallback(data) {
    var text = subjectOf(data) + "\n\n" + asText(data);
    if (text.length > 1500) text = text.slice(0, 1497) + "…";

    var url = S.company.telegramDirect + "?text=" + encodeURIComponent(text);
    var win = window.open(url, "_blank", "noopener");
    // Popup bloklansa — shu oynada ochamiz
    if (!win) window.location.href = url;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;

    var data = collect();
    status("", "");

    if (!S.forms.endpoint) {
      // Server sozlanmagan — zaxira rejim (site.js → forms.fallback)
      var viaEmail = S.forms.fallback === "email";

      if (viaEmail) {
        mailtoFallback(data);
      } else {
        telegramFallback(data);
      }

      status(
        "ok",
        t(viaEmail ? S.order.sentEmail : S.order.sentTelegram),
        viaEmail
          ? ""
          : '<br><a href="' + mailtoHref(data) + '" class="form-status__alt">' +
            esc(t(S.order.fallbackAlt)) + "</a>"
      );

      form.reset();
      fillProducts();
      fillPlans();
      renderSummary();
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
        form.reset();
        fillProducts();
        fillPlans();
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
    renderSummary();
    setBusy(false);
  }

  render();
  window.I18N.onChange(render);
})();
