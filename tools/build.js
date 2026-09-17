#!/usr/bin/env node
/* ============================================================
   Tinch — sayt yig'uvchisi
   ------------------------------------------------------------
   Ishga tushirish (loyiha papkasida):   node tools/build.js
   Faqat Node.js kerak (18+), npm paketlari kerak emas.

   QACHON: products.js yoki site.js o'zgargandan keyin va har safar
   saytga yuklashdan oldin. Ishga tushirilmasa ham sayt ishlayveradi,
   lekin mahsulot sahifalarining sarlavhasi/tavsifi eskicha qoladi va
   mijoz brauzeri eski CSS/JS ni keshdan olishi mumkin.

   NIMA QILADI:
     1. Har mahsulot uchun ikkita statik sahifa:
          product-<id>.html     — o'zbekcha
          product-<id>-ru.html  — ruscha
        Har birida o'z sarlavhasi, tavsifi, rasmi, canonical, hreflang,
        JSON-LD va JS'siz ham o'qiladigan asosiy matn bor. Telegram,
        Yandex va Google sahifani JS bajarmasdan ham to'g'ri ko'radi.
        Sahifaning qolgani avvalgidek js/product.js tomonidan chiziladi.
     2. js/data/pages.js — qaysi mahsulotning statik sahifasi borligi.
        Saytdagi havolalar shunga qarab product-<id>.html yoki eski
        product.html?id=<id> ga olib boradi.
     3. sitemap.xml — to'liq qayta yoziladi.
     4. Barcha HTML fayllarda css/ va js/ havolalariga ?v=<xesh>
        qo'yiladi. Fayl o'zgarsa xesh o'zgaradi va brauzer yangisini
        yuklaydi (serverda JS/CSS 30 kun keshlanadi).

   Bu fayl yaratgan sahifalarni qo'lda tahrirlamang — keyingi
   ishga tushirishda qayta yoziladi.
   ============================================================ */

"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const GENERATOR = "tools/build.js";

const LANGS = [
  { code: "uz", locale: "uz_UZ", suffix: "" },
  { code: "ru", locale: "ru_RU", suffix: "-ru" },
];

/* ------------------------------------------------------------
   Yordamchilar
   ------------------------------------------------------------ */

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

/** Faqat o'zgargan bo'lsa yozadi. true — yozildi */
function write(rel, content) {
  const full = path.join(ROOT, rel);
  const old = fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null;
  if (old === content) return false;
  fs.writeFileSync(full, content);
  return true;
}

function today() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

function esc(value) {
  return String(value === null || value === undefined ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** { uz, ru } dan kerakli tildagi matn (js/i18n.js dagi t() bilan bir xil) */
function tr(value, lang) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (value[lang] !== undefined) return value[lang];
  return value.uz !== undefined ? value.uz : "";
}

/** 1035000 -> "1 035 000" (uzilmas bo'shliq bilan, js/i18n.js dagidek) */
function num(value) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

function loadData() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const rel of ["js/data/site.js", "js/data/products.js"]) {
    vm.runInContext(read(rel), sandbox, { filename: rel });
  }
  return { SITE: sandbox.window.SITE, PRODUCTS: sandbox.window.PRODUCTS };
}

function pageFile(id, lang) {
  return "product-" + id + (lang === "ru" ? "-ru" : "") + ".html";
}

/** js/render.js → entryPrice bilan bir xil mantiq */
function entryPrice(product) {
  for (const mode of product.pricingModes || []) {
    let found = null;
    for (const plan of mode.plans || []) {
      if (plan.price && (!found || plan.price.amount < found.amount)) found = plan.price;
    }
    if (found) return found;
  }
  return null;
}

/* ------------------------------------------------------------
   1. Mahsulot sahifalari
   ------------------------------------------------------------ */

function productPage(SITE, product, lang) {
  const url = SITE.company.url;
  const name = tr(product.name, lang);
  const tagline = tr(product.tagline, lang);
  const title = name + " — " + tagline + " | Tinch";
  const description = tr(product.short, lang);
  const self = url + "/" + pageFile(product.id, lang);
  const locale = LANGS.find((l) => l.code === lang).locale;
  const altLocale = LANGS.find((l) => l.code !== lang).locale;

  // SVG ni Telegram va Facebook ko'rsatmaydi — umumiy muqova
  const img =
    typeof product.image === "string"
      ? "images/opt/og-cover.jpg"
      : String(product.image.jpg).replace(/^\.\//, "");
  const imageUrl = url + "/" + img;

  // Narx qatori: "69 000 UZS dan / foydalanuvchi / oy" (uz), "от 69 000 UZS / …" (ru)
  const price = entryPrice(product);
  const fromTpl = String(tr(SITE.ui.from, lang)).split("{n}");
  const priceLine = product.soon
    ? tr(SITE.ui.soon, lang)
    : price
      ? [fromTpl[0].trim(), num(price.amount) + " " + price.currency, (fromTpl[1] || "").trim()]
          .filter(Boolean)
          .join(" ") + (price.period ? " / " + tr(price.period, lang) : "")
      : tr(SITE.ui.priceOnRequest, lang);

  const offers = [];
  if (!product.soon) {
    for (const mode of product.pricingModes || []) {
      for (const plan of mode.plans || []) {
        if (!plan.price) continue;
        offers.push({
          "@type": "Offer",
          name: tr(plan.name, lang),
          price: plan.price.amount,
          priceCurrency: plan.price.currency,
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: plan.price.amount,
            priceCurrency: plan.price.currency,
            unitText: tr(plan.price.period, lang),
          },
        });
      }
    }
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: description,
      url: self,
      image: imageUrl,
      inLanguage: lang,
      publisher: { "@type": "Organization", name: SITE.company.name, url: url },
      offers: offers.length ? offers : undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: tr(SITE.ui.backHome, lang), item: url + "/" },
        { "@type": "ListItem", position: 2, name: tr(SITE.ui.products, lang), item: url + "/#products" },
        { "@type": "ListItem", position: 3, name: name, item: self },
      ],
    },
  ];

  const highlights = (product.highlights || [])
    .map((h) => "<li><b>" + esc(tr(h.title, lang)) + "</b> — " + esc(tr(h.text, lang)) + "</li>")
    .join("\n              ");

  const plans = [];
  for (const mode of product.pricingModes || []) {
    for (const plan of mode.plans || []) {
      const p = plan.price
        ? num(plan.price.amount) + " " + plan.price.currency + (plan.price.period ? " / " + tr(plan.price.period, lang) : "")
        : tr(SITE.ui.priceOnRequest, lang);
      plans.push("<li><b>" + esc(tr(plan.name, lang)) + "</b> — " + esc(p) + "</li>");
    }
  }

  const alternates = LANGS.map(
    (l) =>
      '    <link rel="alternate" hreflang="' + l.code + '" href="' + url + "/" + pageFile(product.id, l.code) +
      '" data-lang-switch="' + pageFile(product.id, l.code) + '" />'
  ).join("\n");

  return `<!DOCTYPE html>
<html lang="${lang}" data-lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#070B1A" />
    <meta name="generator" content="${GENERATOR}" />

    <!-- Bu sahifani ${GENERATOR} yaratgan. Qo'lda tahrirlamang:
         matn js/data/products.js da, keyin "node ${GENERATOR}". -->

    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="author" content="Tinch" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

    <link rel="canonical" href="${self}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${url}/${pageFile(product.id, "uz")}" />

    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="Tinch" />
    <meta property="og:url" content="${self}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:locale" content="${locale}" />
    <meta property="og:locale:alternate" content="${altLocale}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${imageUrl}" />

    <link rel="icon" href="./images/logo2.png" />
    <link rel="apple-touch-icon" href="./images/logo2.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700;800&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="css/tokens.css" />
    <link rel="stylesheet" href="css/base.css" />
    <link rel="stylesheet" href="css/components.css" />
    <link rel="stylesheet" href="css/pages.css" />
    <!-- JS o'chiq bo'lsa ham bo'limlar ko'rinsin -->
    <noscript><style>.reveal{opacity:1!important;transform:none!important}</style></noscript>
  </head>

  <body>
    <a class="skip-link" href="#main" data-i18n="ui.skipLink">${esc(tr(SITE.ui.skipLink, lang))}</a>

    <header class="site-header" id="siteHeader"></header>

    <main id="main">
      <!-- Quyidagi matn JS'siz o'quvchilar va qidiruv tizimlari uchun.
           JS yuklangach js/product.js butun sahifani qayta chizadi. -->
      <div id="productRoot" data-product="${product.id}">
        <section class="product-hero">
          <div class="container">
            <nav class="crumbs" aria-label="breadcrumb">
              <ol>
                <li><a href="index.html">${esc(tr(SITE.ui.backHome, lang))}</a></li>
                <li><a href="index.html#products">${esc(tr(SITE.ui.products, lang))}</a></li>
                <li>${esc(name)}</li>
              </ol>
            </nav>
            <div class="stack stack-6" style="max-width: 60ch">
              <span class="product-hero__badge">${esc(tagline)}</span>
              <h1 class="h1">${esc(name)}</h1>
              <p class="lead">${esc(tr(product.intro, lang))}</p>
              <p><a class="btn btn--primary btn--lg" href="order.html?product=${product.id}">${esc(tr(product.soon ? SITE.ui.notifyCta : SITE.ui.orderCta, lang))}</a></p>
              <p class="dim">${esc(priceLine)}</p>
            </div>
          </div>
        </section>
        <section class="section section--tight">
          <div class="container prose">
            <h2 class="h3">${esc(tr(SITE.product.featuresTitle, lang))}</h2>
            <ul>
              ${highlights}
            </ul>${plans.length ? `
            <h2 class="h3">${esc(tr(SITE.product.pricingTitle, lang))}</h2>
            <ul>
              ${plans.join("\n              ")}
            </ul>` : ""}
          </div>
        </section>
      </div>
    </main>

    <footer class="site-footer" id="siteFooter"></footer>

    <script type="application/ld+json" id="productJsonLd">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>

    <script src="js/data/site.js"></script>
    <script src="js/data/products.js"></script>
    <script src="js/data/pages.js"></script>
    <script src="js/icons.js"></script>
    <script src="js/i18n.js"></script>
    <script src="js/render.js"></script>
    <script src="js/app.js"></script>
    <script src="js/product.js"></script>
  </body>
</html>
`;
}

/* ------------------------------------------------------------
   3. Sitemap
   ------------------------------------------------------------ */

function oldLastmods() {
  const out = {};
  if (!fs.existsSync(path.join(ROOT, "sitemap.xml"))) return out;
  const xml = read("sitemap.xml");
  const re = /<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g;
  let m;
  while ((m = re.exec(xml))) out[m[1]] = m[2];
  return out;
}

function sitemap(SITE, PRODUCTS, changedIds, dataChanged) {
  const url = SITE.company.url;
  const prev = oldLastmods();
  const date = today();
  const entries = [];

  const langAlts = (file) => ({
    uz: url + "/" + file + "?lang=uz",
    ru: url + "/" + file + "?lang=ru",
  });

  entries.push({ loc: url + "/", alts: { uz: url + "/?lang=uz", ru: url + "/?lang=ru" }, freq: "weekly", prio: "1.0", fresh: dataChanged });
  entries.push({ loc: url + "/pricing.html", alts: langAlts("pricing.html"), freq: "weekly", prio: "0.9", fresh: dataChanged });

  for (const p of PRODUCTS) {
    const alts = { uz: url + "/" + pageFile(p.id, "uz"), ru: url + "/" + pageFile(p.id, "ru"), "x-default": url + "/" + pageFile(p.id, "uz") };
    for (const l of LANGS) {
      entries.push({
        loc: url + "/" + pageFile(p.id, l.code),
        alts: alts,
        freq: "monthly",
        prio: p.soon ? "0.6" : p.main ? "0.9" : "0.8",
        fresh: changedIds.has(p.id),
      });
    }
  }

  entries.push({ loc: url + "/contacts.html", alts: langAlts("contacts.html"), freq: "monthly", prio: "0.6" });
  entries.push({ loc: url + "/maxfiylik.html", alts: langAlts("maxfiylik.html"), freq: "yearly", prio: "0.3" });

  const body = entries
    .map((e) => {
      const lastmod = e.fresh || !prev[e.loc] ? date : prev[e.loc];
      const links = Object.keys(e.alts)
        .map((h) => '    <xhtml:link rel="alternate" hreflang="' + h + '" href="' + esc(e.alts[h]) + '" />')
        .join("\n");
      return (
        "  <url>\n" +
        "    <loc>" + esc(e.loc) + "</loc>\n" +
        "    <lastmod>" + lastmod + "</lastmod>\n" +
        links + "\n" +
        "    <changefreq>" + e.freq + "</changefreq>\n" +
        "    <priority>" + e.prio + "</priority>\n" +
        "  </url>"
      );
    })
    .join("\n");

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    "<!-- " + GENERATOR + " yaratadi. Qo'lda tahrirlamang. -->\n" +
    '<urlset\n  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xhtml="http://www.w3.org/1999/xhtml"\n>\n' +
    body +
    "\n</urlset>\n"
  );
}

/* ------------------------------------------------------------
   4. Kesh belgisi (?v=)
   ------------------------------------------------------------ */

const hashes = {};

function assetHash(rel) {
  if (!hashes[rel]) {
    hashes[rel] = crypto.createHash("md5").update(fs.readFileSync(path.join(ROOT, rel))).digest("hex").slice(0, 8);
  }
  return hashes[rel];
}

function stamp(html) {
  return html.replace(
    /(href|src)="(\/?)((?:css|js)\/[^"?#]+\.(?:css|js))(?:\?v=[\w-]+)?"/g,
    (match, attr, slash, rel) => {
      if (!fs.existsSync(path.join(ROOT, rel))) return match;
      return attr + '="' + slash + rel + "?v=" + assetHash(rel) + '"';
    }
  );
}

/* ------------------------------------------------------------
   Ishga tushirish
   ------------------------------------------------------------ */

function main() {
  const { SITE, PRODUCTS } = loadData();
  const report = [];

  // 2. pages.js — birinchi: uning xeshi ham HTML ga yoziladi
  const ids = PRODUCTS.map((p) => p.id);
  const pagesJs =
    "/* " + GENERATOR + " yaratadi — qo'lda tahrirlamang.\n" +
    "   Statik sahifasi bor mahsulotlar: product-<id>.html va product-<id>-ru.html */\n" +
    "window.STATIC_PAGES = " + JSON.stringify(ids) + ";\n";
  if (write("js/data/pages.js", pagesJs)) report.push("js/data/pages.js");

  // 1. Mahsulot sahifalari
  const changedIds = new Set();
  const wanted = new Set();
  for (const p of PRODUCTS) {
    for (const l of LANGS) {
      const file = pageFile(p.id, l.code);
      wanted.add(file);
      const html = stamp(productPage(SITE, p, l.code));
      if (write(file, html)) {
        changedIds.add(p.id);
        report.push(file);
      }
    }
  }

  // O'chirilgan mahsulotlarning eski sahifalari
  for (const file of fs.readdirSync(ROOT)) {
    if (!/^product-[\w-]+\.html$/.test(file) || wanted.has(file)) continue;
    if (read(file).indexOf('content="' + GENERATOR + '"') === -1) continue;
    fs.unlinkSync(path.join(ROOT, file));
    report.push(file + " (o'chirildi)");
  }

  // 4. Qo'lda yozilgan HTML fayllarda ?v=
  for (const file of fs.readdirSync(ROOT)) {
    if (!file.endsWith(".html") || wanted.has(file)) continue;
    if (write(file, stamp(read(file)))) report.push(file + " (?v=)");
  }

  // 3. Sitemap
  if (write("sitemap.xml", sitemap(SITE, PRODUCTS, changedIds, changedIds.size > 0))) report.push("sitemap.xml");

  console.log(report.length ? "Yangilandi:\n  " + report.join("\n  ") : "Hammasi dolzarb — o'zgarish yo'q.");
}

main();
