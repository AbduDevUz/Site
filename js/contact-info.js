/* ============================================================
   TINCH SOFT — Aloqa ma'lumotlari bloki
   order.html va contacts.html sahifalarida ishlatiladi:
   <div class="contact-list" id="contactList"></div>
   ============================================================ */

(function () {
  "use strict";

  var S = window.SITE;

  function item(iconName, label, value, href) {
    var body = href
      ? '<a class="contact-item__value" href="' + href + '">' + esc(value) + "</a>"
      : '<span class="contact-item__value">' + esc(value) + "</span>";

    return (
      '<div class="contact-item">' +
        '<span class="contact-item__ic">' + icon(iconName) + "</span>" +
        "<div>" +
          '<span class="contact-item__label">' + esc(label) + "</span>" +
          body +
        "</div>" +
      "</div>"
    );
  }

  function render() {
    var host = document.getElementById("contactList");
    if (!host) return;

    host.innerHTML =
      item("phone", t(S.ui.contactCta), S.company.phone, S.company.phoneHref) +
      item("mail", "Email", S.company.email, "mailto:" + S.company.email) +
      item("telegram", "Telegram", "@tinchsoft", S.company.telegram) +
      item("map-pin", t(S.contacts.eyebrow), t(S.ui.address)) +
      '<div class="contact-item">' +
        '<span class="contact-item__ic">' + icon("clock") + "</span>" +
        "<div>" +
          '<span class="contact-item__label">' + esc(t(S.ui.hoursWeekdays)) + "</span>" +
          '<span class="contact-item__value" style="font-weight:400;font-size:var(--fs-sm)">' +
            esc(t(S.ui.hoursWeekends)) +
          "</span>" +
        "</div>" +
      "</div>";
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
