/* ============================================================
   Tinch — i18n
   ------------------------------------------------------------
   Eski versiya DOM indeksiga bog'langan edi (tab_item[3] va h.k.),
   shuning uchun har bir yangi blok tarjimani buzardi.

   Yangi qoida — indeks yo'q, faqat atribut va ma'lumot:
     <h1 data-i18n="home.hero.titleLead">           → textContent
     <p  data-i18n-html="footer.about">             → innerHTML
     <input data-i18n-attr="placeholder:order.fields.namePh">

   JS ichida:
     t({uz:"…", ru:"…"})   → joriy tildagi matn
     tk("home.hero.text")  → SITE obyektidan yo'l bo'yicha olib, t() qiladi

   Til o'zgarganda 'languagechange' hodisasi yuboriladi —
   sahifa modullari shunga obuna bo'lib qayta render qiladi.
   ============================================================ */

(function () {
  "use strict";

  var SUPPORTED = ["uz", "ru"];
  var DEFAULT_LANG = "uz";
  var STORAGE_KEY = "tinch:lang";

  /* ---------- Tilni aniqlash ---------- */

  function detect() {
    // 1. URL: ?lang=ru
    try {
      var q = new URLSearchParams(window.location.search).get("lang");
      if (q && SUPPORTED.indexOf(q) !== -1) return q;
    } catch (e) {
      /* eski brauzer — e'tiborsiz qoldiramiz */
    }

    // 2. Saqlangan tanlov
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

      // Eski kalitdan ko'chirish (oldingi versiya 'language' ishlatgan)
      var legacy = localStorage.getItem("language");
      if (legacy && SUPPORTED.indexOf(legacy) !== -1) {
        localStorage.setItem(STORAGE_KEY, legacy);
        return legacy;
      }
    } catch (e) {
      /* localStorage o'chirilgan bo'lishi mumkin */
    }

    // 3. Standart til — o'zbekcha.
    //    Brauzer tili bo'yicha aniqlash ataylab qilinmaydi: O'zbekistondagi
    //    ko'p qurilmalarda tizim tili ru-RU bo'lgani uchun sayt doim ruscha
    //    ochilib ketardi. Foydalanuvchi tanlasa — tanlovi saqlanadi.
    return DEFAULT_LANG;
  }

  var current = detect();

  /* ---------- Asosiy API ---------- */

  /** Joriy til kodi ("uz" | "ru") */
  function lang() {
    return current;
  }

  /**
   * { uz, ru } obyektidan joriy tildagi matnni oladi.
   * Oddiy satr berilsa — o'zini qaytaradi.
   */
  function t(value) {
    if (value === null || value === undefined) return "";
    if (typeof value === "string" || typeof value === "number") return String(value);
    if (typeof value !== "object") return "";
    if (value[current] !== undefined) return value[current];
    // Zaxira: birinchi mavjud til
    for (var i = 0; i < SUPPORTED.length; i++) {
      if (value[SUPPORTED[i]] !== undefined) return value[SUPPORTED[i]];
    }
    return "";
  }

  /**
   * SITE obyektidan nuqtali yo'l bo'yicha qiymat olib, t() qiladi.
   * tk("order.fields.namePh") → "Masalan: Aziz Karimov"
   */
  function tk(path) {
    var node = window.SITE;
    var parts = String(path).split(".");
    for (var i = 0; i < parts.length; i++) {
      if (node === null || node === undefined) return "";
      node = node[parts[i]];
    }
    if (node === undefined) {
      if (window.console) console.warn("[i18n] kalit topilmadi:", path);
      return "";
    }
    return t(node);
  }

  /* ---------- Atributlar bo'yicha qo'llash ---------- */

  function apply(root) {
    var scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = tk(el.getAttribute("data-i18n"));
    });

    scope.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = tk(el.getAttribute("data-i18n-html"));
    });

    // data-i18n-attr="placeholder:order.fields.namePh; aria-label:ui.orderCta"
    scope.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr")
        .split(";")
        .forEach(function (pair) {
          var bits = pair.split(":");
          if (bits.length !== 2) return;
          var attr = bits[0].trim();
          var key = bits[1].trim();
          if (attr && key) el.setAttribute(attr, tk(key));
        });
    });
  }

  /**
   * Sahifa meta ma'lumotlarini yangilaydi.
   * @param {{title:object, description:object}} meta
   */
  function applyMeta(meta) {
    if (!meta) return;

    if (meta.title) {
      document.title = t(meta.title);
      setMeta("property", "og:title", t(meta.title));
      setMeta("property", "twitter:title", t(meta.title));
    }
    if (meta.description) {
      setMeta("name", "description", t(meta.description));
      setMeta("property", "og:description", t(meta.description));
      setMeta("property", "twitter:description", t(meta.description));
    }
    setMeta("property", "og:locale", current === "ru" ? "ru_RU" : "uz_UZ");
  }

  function setMeta(kind, key, value) {
    var el = document.querySelector("meta[" + kind + '="' + key + '"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(kind, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  }

  /* ---------- Tilni o'zgartirish ---------- */

  function setLang(next) {
    if (SUPPORTED.indexOf(next) === -1 || next === current) return;

    current = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* xotira mavjud emas — sessiya davomida ishlaydi */
    }

    document.documentElement.lang = next;
    apply();
    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: next } }));
  }

  /* ---------- Kichik yordamchilar ---------- */

  /** HTML ichiga xavfsiz qo'yish uchun matnni ekranlash */
  function esc(str) {
    return String(str === null || str === undefined ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /**
   * Sonni uchtalab ajratish: 1035000 → "1 035 000".
   * Ajratgich — uzilmas bo'shliq (U+00A0): raqam qator oxirida
   * «1 035» va «000» bo'lib ikkiga bo'linib ketmaydi.
   */
  function num(value) {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  /* ---------- Eksport ---------- */

  window.I18N = {
    SUPPORTED: SUPPORTED,
    lang: lang,
    setLang: setLang,
    t: t,
    tk: tk,
    apply: apply,
    applyMeta: applyMeta,
    esc: esc,
    num: num,
    onChange: function (fn) {
      document.addEventListener("languagechange", fn);
    },
  };

  // Qisqartmalar — modullarda ko'p ishlatiladi
  window.t = t;
  window.tk = tk;
  window.esc = esc;

  // <html lang> ni darhol to'g'rilash (CSS/skrinrider uchun)
  document.documentElement.lang = current;
})();
