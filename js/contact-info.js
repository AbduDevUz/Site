/* ============================================================
   Tinch — Aloqa ma'lumotlari bloki
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
      item("phone", t(S.ui.phoneLabel), S.company.phone, S.company.phoneHref) +
      item("mail", "Email", S.company.email, "mailto:" + S.company.email) +
      item("telegram", "Telegram", S.company.telegramHandle, S.company.telegram) +
      item("map-pin", t(S.ui.addressLabel), t(S.ui.address)) +
      '<div class="contact-item">' +
        '<span class="contact-item__ic">' + icon("clock") + "</span>" +
        "<div>" +
          '<span class="contact-item__label">' + esc(t(S.ui.hoursLabel)) + "</span>" +
          '<span class="contact-item__value contact-item__value--soft">' +
            esc(t(S.ui.hoursWeekdays)) + "<br>" + esc(t(S.ui.hoursWeekends)) +
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
