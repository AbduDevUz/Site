# SEO qo'llanmasi

## Nima allaqachon qilingan

| Element                     | Holati | Qayerda                                       |
| --------------------------- | ------ | --------------------------------------------- |
| `<title>` va `description`  | ✓      | Har sahifada + tilga qarab JS yangilaydi       |
| Open Graph (1200×630 rasm)   | ✓      | `images/opt/og-cover.jpg` — Telegram/FB preview |
| Twitter Card                | ✓      | Har sahifada `summary_large_image`             |
| `hreflang` (uz / ru / x-default) | ✓ | Barcha indekslanadigan sahifalarda             |
| Canonical                   | ✓      | Har sahifada; mahsulotlarda statik (`product-<id>.html`) |
| `robots.txt`                | ✓      | Ildizda                                        |
| `sitemap.xml` + `lastmod`   | ✓      | `tools/build.js` yasaydi, hreflang bilan       |
| Organization JSON-LD        | ✓      | `index.html`                                   |
| SoftwareApplication + Offer | ✓      | Mahsulot sahifalarida statik, narx birligi (`unitText`) bilan |
| BreadcrumbList              | ✓      | Mahsulot sahifalari — qidiruvda yo'l ko'rinadi |
| Mahsulot sahifalari uz + ru | ✓      | `product-<id>.html`, `product-<id>-ru.html` — JS'siz ham to'liq sarlavha, tavsif, OG |
| ContactPage JSON-LD         | ✓      | `contacts.html`                                |
| Rasmlarda `alt`             | ✓      | Tekshirildi — bitta ham bo'sh emas             |
| WebP + o'lcham              | ✓      | `images/opt/`, `<picture>` bilan               |
| 404 sahifasi                | ✓      | `404.html` — noindex, mahsulotlar ro'yxati bilan |
| Mobil moslashuv             | ✓      | 320px dan boshlab tekshirilgan                 |
| gzip + kesh                 | ✓      | `.htaccess` + `?v=` xesh (server nginx) — QOLLANMA §14.2 |
| HSTS                        | ✓      | `.htaccess`                                    |
| `max-image-preview:large`   | ✓      | Googlda katta rasm bilan chiqadi               |


---

## Meta-teglarni o'zgartirish

Sarlavha va tavsif **`js/data/site.js`** dan olinadi:

```js
home: {
  meta: {
    title: { uz: "...", ru: "..." },
    description: { uz: "...", ru: "..." },
  },
}
```

Xuddi shunday `pricing.meta`, `contacts.meta`, `order.meta`.
Mahsulot sahifalari uchun sarlavha `product.name + tagline` dan,
tavsif esa `product.short` dan avtomatik quriladi.

> HTML fayldagi `<title>` — bu JS yuklanmaguncha ko'rinadigan zaxira.
> Uni ham yangilab qo'ying, lekin haqiqiy manba — `site.js`.

---

## Tavsif yozish qoidalari

- **Title:** 50–60 belgi. Kalit so'z + brend. Misol:
  `Tinch HR — xodimlar bo'limini avtomatlashtirish | TINCH SOFT`
- **Description:** 140–160 belgi. Foyda + geografiya + harakatga chorlov.
- Har sahifada **noyob** bo'lsin — takrorlanmasin.

---

## Kalit so'zlar (O'zbekiston bozori)

**O'zbekcha:** xodimlarni boshqarish tizimi, HR dastur, kadrlar bo'limi
avtomatlashtirish, Face ID davomat, ombor hisobi dasturi, ERP tizim
O'zbekiston, CRM dastur Toshkent, biznes avtomatlashtirish.

**Ruscha:** HRM система Ташкент, автоматизация отдела кадров, учёт рабочего
времени Face ID, складской учёт программа, ERP система Узбекистан,
CRM для бизнеса Ташкент.

Kalit so'zlarni `site.js` va `products.js` dagi matnlarga **tabiiy** joylang —
`<meta name="keywords">` teg qidiruv tizimlariga ta'sir qilmaydi, shuning
uchun uni qaytarmadim.

---

## Yangi mahsulot qo'shganda

1. `js/data/products.js` ga mahsulotni qo'shing.
2. `node tools/build.js` — `product-YANGI_ID.html`, ruscha nusxasi va
   `sitemap.xml` o'zi yasaladi. Sitemap'ni qo'lda tahrirlamang.
3. Google Search Console'da sitemap'ni qayta yuboring.

---

## Deploy'dan keyin qilinadigan ishlar

1. **Google Search Console** — saytni qo'shing, `sitemap.xml` ni yuboring.
2. **Yandex Webmaster** — O'zbekistonda Yandex ulushi katta, e'tibordan
   qoldirmang.
3. **Google Business Profile** — Toshkentdagi manzil bilan.
4. **PageSpeed Insights** bilan tekshiring: `https://pagespeed.web.dev/`
5. **Sarlavhalar ierarxiyasi** — har sahifada bitta `<h1>` bo'lishi kerak
   (hozir shunday).

---

## Bilib qo'yish kerak bo'lgan cheklov

Sayt kontenti **JavaScript orqali** render qilinadi (build tizimisiz ikki
tilni bitta manbadan boshqarish uchun). Googlebot JS'ni bajaradi va bunday
sahifalarni indekslaydi, lekin:

- Indekslash biroz sekinroq bo'ladi (bir necha kun).
- Ba'zi kichik qidiruv tizimlari va ijtimoiy tarmoq preview'lari JS'ni
  bajarmaydi — shuning uchun `<title>`, `description` va OG teglari
  HTML'da **statik** holda ham yozilgan.

**2026-09-17 dan mahsulot sahifalari statik** (`tools/build.js`): har biri
o'z sarlavhasi, tavsifi, rasmi, hreflang va JSON-LD bilan, uz va ru tilida.
Telegram va Yandex ularni JS'siz ham to'g'ri ko'radi.

Bosh sahifa, tariflar va aloqa sahifasining ruscha versiyasi hali JS orqali
(`?lang=ru`) — keyingi qadam shu sahifalarni ham xuddi shunday yasash.
