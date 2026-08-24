# SEO qo'llanmasi

## Nima allaqachon qilingan

| Element                    | Holati | Qayerda                                    |
| -------------------------- | ------ | ------------------------------------------ |
| `<title>` va `description` | ✓      | Har sahifada + tilga qarab JS yangilaydi    |
| Open Graph / Twitter Card  | ✓      | Har sahifaning `<head>` qismida             |
| `hreflang` (uz / ru)       | ✓      | `index.html`, `pricing.html`, `contacts.html` |
| Canonical                  | ✓      | Har sahifada; `product.html` da JS qo'yadi  |
| `robots.txt`               | ✓      | Ildizda                                     |
| `sitemap.xml`              | ✓      | Ildizda                                     |
| Organization JSON-LD       | ✓      | `index.html`                                |
| SoftwareApplication + Offer| ✓      | `product.html` (JS narxlardan quradi)       |
| ContactPage JSON-LD        | ✓      | `contacts.html`                             |
| Rasmlarda `alt`            | ✓      | `render.js` mahsulot nomidan quradi         |
| WebP + o'lcham             | ✓      | `images/opt/`, `<picture>` bilan            |
| Mobil moslashuv            | ✓      | 390px dan boshlab tekshirilgan              |

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
2. `sitemap.xml` ga qatorini qo'shing:

```xml
<url>
  <loc>https://tinch.uz/product.html?id=YANGI_ID</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

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

Agar kelajakda indekslash muhim bo'lsa, keyingi qadam — sahifalarni
statik generatsiya qilish (Astro yoki oddiy Node skripti bilan
`products.js` dan `product-hr.html`, `product-erp.html` yaratish).
