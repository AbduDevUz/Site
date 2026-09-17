# Tinch sayti — tahrirlash qo'llanmasi

## Asosiy qoida

**Barcha matn va narxlar ikkita faylda saqlanadi. HTML fayllarga hech narsa yozilmaydi.**

| Fayl                  | Nima uchun                                                     |
| --------------------- | -------------------------------------------------------------- |
| `js/data/site.js`     | Sayt matnlari: menyu, bosh sahifa, footer, forma, aloqa         |
| `js/data/products.js` | Mahsulotlar, tariflar, imkoniyatlar matritsasi, narxlar jadvali |

Har bir tarjima qilinadigan qiymat — `{ uz: "...", ru: "..." }` obyekti.
Faylni tahrirlab saqlang, brauzerni yangilang — tamom. Build yoki npm kerak emas.

---

## 1. Narxni o'zgartirish

`js/data/products.js` → kerakli mahsulot → `pricingModes` → `plans` → `price`:

```js
price: {
  amount: 39000,                 // ← shu yerni o'zgartiring
  currency: "UZS",
  period: { uz: "foydalanuvchi / oy", ru: "пользователь / месяц" }
}
```

Narx so'rov bo'yicha bo'lsa: `price: null`.

**Narxlar jadvalidagi qatorlar** esa `priceTables` → `rows` ichida:

```js
rows: [
  { name: "Tinch HR Basic 15", employees: "15", total: "585 000 UZS", perEmployee: "39 000 UZS" },
]
```

> Narxni ikki joyda yangilashni unutmang: tarif kartasi (`price`) va jadval (`rows`).

---

## 2. Tarifga yangi imkoniyat qo'shish

`featureGroups` — bu PDF'dagi ✓/✗ jadvalining aynan o'zi.

```js
featureGroups: [
  {
    title: { uz: "Dashboard va statistika", ru: "Дашборд и статистика" },
    items: [
      {
        label: { uz: "Asosiy dashboard", ru: "Основной дашборд" },
        plans: { basic: true, pro: true },   // ✓ = true,  ✗ = false
      },
      // ← yangi qatorni shu yerga qo'shing
    ],
  },
]
```

### «Tez orada» imkoniyati

Hali ishga tushmagan, lekin tarifga kiritilgan imkoniyat uchun `soon: true`:

```js
{
  label: { uz: "Telegram-bot orqali buyurtma", ru: "Заказы через Telegram-бот" },
  plans: { basic: false, pro: true },
  soon: true,          // ← ✓ o'rniga sariq soat belgisi + «Tez orada» yorlig'i
}
```

Tarif kartasidagi ro'yxatda ham ishlaydi — faqat yozilishi boshqacha:

```js
highlights: [
  { uz: "Oddiy qator", ru: "Обычная строка" },
  { label: { uz: "Tez oradagi qator", ru: "Скорая строка" }, soon: true },
]
```

Imkoniyat ishga tushgach — shunchaki `soon: true` ni o'chiring, boshqa hech narsa
o'zgartirmaysiz.

`plans` ichidagi kalitlar (`basic`, `pro`) — `plans[].id` bilan bir xil bo'lishi shart.
Qaysi tariflar jadvalda ko'rsatilishini `matrixPlans` belgilaydi:

```js
matrixPlans: ["basic", "pro"],
```

Jadval avtomatik quriladi: kompyuterda — jadval, telefonda — akkordeon.

---

## 3. Yangi tarif qo'shish (masalan «Enterprise»)

```js
plans: [
  { id: "basic", ... },
  { id: "pro", ... },
  {
    id: "enterprise",                                  // ← yangi
    name: { uz: "Tinch HR Enterprise", ru: "Tinch HR Enterprise" },
    badge: { uz: "Yangi", ru: "Новинка" },             // ixtiyoriy
    featured: false,                                    // ta'kidlangan karta
    desc: { uz: "...", ru: "..." },
    price: { amount: 50000, currency: "UZS", period: { uz: "...", ru: "..." } },
    highlights: [
      { uz: "Birinchi qator", ru: "Первая строка" },
    ],
  },
],
```

So'ng:

1. `matrixPlans` ga `"enterprise"` qo'shing.
2. Har bir `featureGroups[].items[].plans` ga `enterprise: true/false` qo'shing.

---

## 4. Yangi mahsulot qo'shish

`js/data/products.js` oxiriga yangi obyekt qo'shing:

```js
{
  id: "pos",                                       // URL: product.html?id=pos
  icon: "cart",                                    // js/icons.js dagi nom
  image: { webp: "./images/opt/pos.webp", jpg: "./images/opt/pos.jpg" },
  name: { uz: "Tinch POS", ru: "Tinch POS" },
  tagline: { uz: "...", ru: "..." },
  short: { uz: "...", ru: "..." },                 // kartochka matni
  intro: { uz: "...", ru: "..." },                 // sahifa kirish matni
  tags: [{ uz: "Kassa", ru: "Касса" }],
  highlights: [ { icon: "cart", title: {...}, text: {...} } ],
  pricingModes: [ { id: "project", label: {...}, showMatrix: true, plans: [...], priceTables: [], notes: [] } ],
  matrixPlans: ["start", "pro"],
  featureGroups: [ ... ],
}
```

Bosh sahifa, tariflar sahifasi, footer va buyurtma formasi — hammasi
o'zi yangilanadi, boshqa hech narsa tahrirlash kerak emas.

**Mavjud ikonkalar:** `users, settings, handshake, warehouse, globe, shield, plug,
gauge, headset, chart, id-card, scan-face, user-plus, file-signature, layout-board,
factory, wallet, truck, funnel, history, bell, boxes, barcode, cart, layout,
sparkles, phone, mail, map-pin, clock, download, printer`.
Yangi ikonka `js/icons.js` dagi `PATHS` obyektiga qo'shiladi (24×24 SVG path).

---

## 4.1. Bosh sahifa: «Faol mahsulotlar» va «Boshqa yechimlar»

Bosh sahifadagi mahsulotlar bloki ikki guruhga bo'lingan (2026-09-17):

| Guruh | Qaysi mahsulotlar |
| --- | --- |
| **Faol mahsulotlar** | `main: true` qo'yilganlar — hozir Ombor, HR, Savdo |
| **Boshqa yechimlar** | Qolgan hammasi — Uylar, Saytlar, Call Center, CRM, ERP |

Ikkala guruh ham **bir xil katta kartochkada** (rasm, teglar, narx), 3 ustunda.
Ixcham kartochka ham sinab ko'rildi, lekin egasiga juda kichik tuyuldi va
olib tashlandi.

Mahsulotni yuqoriga chiqarish yoki pastga tushirish — `products.js` da
o'sha mahsulotga bitta qator:

```js
{
  id: "uylar",
  icon: "building",
  main: true,        // ← yuqoriga chiqadi; o'chirsangiz pastga tushadi
  ...
}
```

Guruh ichidagi tartib — `products.js` dagi tartib.

**Sarlavha nomi:** «Faol mahsulotlar» (ruschasi «Активные продукты») —
egasining tanlovi, ma'nosi «hozir eng ko'p sotilayotganlar». Variantlar
ko'rib chiqilgan: «Top mahsulotlar», «Ommabop mahsulotlar», «Mijozlar
tanlovi». Nomni o'zgartirish — `site.js` → `home.productsSection.mainTitle`
(va `index.html` dagi zaxira matn).

**Ekran kengligiga qarab:** kompyuterda 3 ustun, 860px dan tor ekranda
bitta ustun. 2 ustun ataylab yo'q — 3 ta kartochkadan bittasi yolg'iz
qolardi. Ustunlar soni `css/components.css` → `.product-grid`.

Guruh sarlavhalari `site.js` → `home.productsSection.mainTitle` va
`moreTitle`. Birorta ham mahsulotda `main: true` bo'lmasa, sarlavhalar
yashiriladi va hamma mahsulot bitta to'rda chiqadi.

> 404 sahifasi va mahsulot sahifasidagi «Boshqa mahsulotlar» bloki bundan
> ta'sirlanmaydi.

---

## 5. Sayt matnlarini o'zgartirish

`js/data/site.js` ichida:

| Bo'lim               | Nima                                        |
| -------------------- | ------------------------------------------- |
| `company`            | Nom, shior, telefon, email, Telegram, tarmoqlar |
| `nav`                | Yuqoridagi menyu                             |
| `home.hero`          | Bosh sahifa sarlavhasi va statistika         |
| `home.productsSection` | Mahsulotlar bloki va ikki guruh sarlavhasi (4.1) |
| `home.brandStrip`    | «Nega Tinch?» bloki                          |
| `home.whySection`    | «Nega biz» kartalari                         |
| `home.processSection`| 4 qadam                                      |
| `product`            | Mahsulot sahifasi sarlavhalari               |
| `order`              | Forma yorliqlari va xabarlari                |
| `footer`             | Pastki qism                                  |

HTML'da matn kerak bo'lsa, `data-i18n` atributidan foydalaning:

```html
<h2 data-i18n="home.whySection.title"></h2>
<p data-i18n-html="footer.about"></p>
<input data-i18n-attr="placeholder:order.fields.namePh" />
```

Qiymat `site.js` dagi nuqtali yo'l bo'yicha topiladi. **`i18n.js` ga hech
narsa qo'shish kerak emas** — eski versiyadan asosiy farqi shu.

### Kompaniya nomi va shior

Nom `company.name` da bitta joyda turadi va sarlavhaga, footerga hamda
`aria-label` ga o'sha yerdan tushadi — `app.js` ga qo'l tegizish shart emas.

Shior `company.slogan` da. U uch joyda ko'rinadi:

1. Bosh sahifa hero'sining ustidagi kichik yozuv (`home.hero.eyebrow`)
2. Brend kartasidagi yirik sariq matn (`index.html` → `.brand-band`,
   «Nega biz» bilan «4 qadam» orasida turadi)
3. Footerda logotip ostida (`.brand-slogan`)

Diqqat: 1-nuqta alohida maydon (`home.hero.eyebrow`), chunki u nuqtasiz
yoziladi. Shiorni o'zgartirsangiz ikkalasini ham yangilang.

> SEO sarlavhalarida nom `.html` fayllarning `<head>` qismida qo'lda
> yozilgan (`<title>` va `og:site_name`). Nomni o'zgartirsangiz — ularni
> ham qidirib almashtiring.

---

## 5.0. Dollar kursi

Dollarda ko'rsatilgan narxlar yoniga taxminiy so'm yoziladi:

```
350 USD
~ 4 150 000 so'm
```

Kurs `js/data/site.js` ning boshida, bitta joyda:

```js
usdRate: 11850,
```

**Kurs o'zgarganda faqat shu raqamni almashtirasiz** — mahsulot
kartochkalari, tarif kartochkalari va narxlar jadvallari o'zi qayta
hisoblanadi.

`usdRate: 0` qo'ysangiz so'm umuman ko'rsatilmaydi, faqat dollar qoladi.
Noto'g'ri kurs ko'rsatgandan ko'ra hech narsa ko'rsatmagan yaxshiroq,
shuning uchun shunday qilingan.

So'm yaxlitlanadi, chunki u baribir taxminiy raqam. Yaxlitlash qadami
summaga qarab o'zgaradi:

| Summa | Qadam | Misol |
| --- | --- | --- |
| 10 mln gacha | 50 000 | 4 147 500 → **4 150 000** |
| 10 mln dan yuqori | 100 000 | 115 537 500 → **115 500 000** |

Yirik summada mayda yaxlitlash soxta aniqlik beradi: `115 537 500` degan
raqam kursga qarab ertaga o'zgaradi, lekin mijoz uni aniq narx deb o'qiydi.

### Qaysi mahsulotda ko'rinadi

So'm **faqat `showUzs: true` qo'yilgan mahsulotda** chiqadi. Hozir bu
faqat **Tinch Savdo**:

```js
{
  id: "savdo",
  showUzs: true,
  ...
}
```

Nega hammasida emas: `9 750 USD` va `115 500 000 so'm` bir xil pul, lekin
ikkinchisi ancha og'irroq o'qiladi va mijozni qo'rqitadi. Bundan tashqari
u obuna narxi yonida turganda sotib olishga xalaqit berardi:

```
Obuna:        600 000 so'm / oy
Sotib olish:  ~ 23 100 000 so'm     <- arenda arzondek ko'rinadi
```

Tinch Savdoda esa summa kichik (4-6 mln), so'mda yozilsa aksincha
yaqinroq tuyuladi.

Boshqa mahsulotda ham kerak bo'lsa — o'sha mahsulotga `showUzs: true`
qatorini qo'shasiz, boshqa hech narsa qilish shart emas.

> Obuna narxlari (Ombor, HR, Uylar) allaqachon so'mda — ularga bu
> qoida umuman tegishli emas.

---

## 5.1. Aksiya (vaqtinchalik chegirma)

Barcha aksiya sozlamalari `js/data/site.js` → `promo` obyektida.

### O'chirish

```js
promo: {
  active: false,   // <- shu bitta qator
```

Tamom. Sarlavha ustidagi lenta yo'qoladi, tariflardagi aksiya kartasi
ketadi, narxlar jadvali va tarif kartochkalari odatdagi **−10%** ga
qaytadi. Boshqa hech qayerga tegish shart emas.

### O'zi o'chadi

`until: "2026-09-30"` sanasi o'tgach aksiya **avtomatik o'chadi** —
`active: true` qolib ketsa ham. Ya'ni unutib qo'ysangiz ham sayt eski
narxlarni ko'rsatadi. Sanani uzaytirish uchun `until` va `untilLabel`
ni birga yangilang.

### Foizni o'zgartirish

```js
percent: 35,
```

Narxlar **qo'lda yozilmaydi** — `products.js` dagi `full` qiymatidan
hisoblanadi. `full` — chegirmasiz to'liq narx (bo'lib to'lash summasi:
`1 000 USD × 3` → `full: 3000`).

### Qayerda ko'rinadi

| Joy | Nima |
| --- | --- |
| Sarlavha ustida | Ingichka sariq lenta, tariflar sahifasiga havola |
| Tariflar bloki | Aksiya kartasi (matn + server izohi + muddat) |
| Rejim tugmasi | `−35%` nishoni |
| Narxlar jadvali | Eski narx chizilgan, yangisi sariq |
| Tarif kartochkasi | Uylar bir martalik tariflarida eski narx ustida |

### Kimga tegmaydi

- **Obuna** (`subscription`) rejimiga — chegirma faqat sotib olishga
- **`soon: true`** mahsulotlarga (CRM, ERP) — hali chiqmagan mahsulotga
  chegirma e'lon qilish mantiqsiz

---

## 6. Buyurtma formasi qayerga tushadi

Hozir forma **Telegram** orqali ishlaydi: mijoz «Yuborish» ni bosganda
`@AbduDevUz` bilan suhbat ochiladi va xabar allaqachon to'ldirilgan bo'ladi —
mijoz faqat Telegramning yuborish tugmasini bosadi.

```js
forms: {
  endpoint: "",             // bo'sh — zaxira rejim ishlaydi
  fallback: "telegram",     // yoki "email"
  fallbackEmail: "info@tinch.uz",
},
```

Qabul qiluvchini almashtirish: `company.telegramDirect`.

### Nega bot orqali avtomatik emas

Telegram boti token talab qiladi. Tokenni frontend kodiga yozib bo'lmaydi —
u brauzerda ochiq ko'rinadi va istalgan odam sizning botingiz nomidan xabar
yubora oladi. To'liq avtomatik qilish uchun token **server tomonda** turishi
kerak.

### To'liq avtomatik qilish

`endpoint` ni to'ldirsangiz, mijoz saytdan chiqmaydi — ma'lumot fonda ketadi:

```js
forms: { endpoint: "https://api.tinch.uz/lead", ... }
```

Ma'lumot `POST` bilan JSON ko'rinishida boradi:

```json
{
  "name": "...", "company": "...", "phone": "...", "email": "...",
  "productId": "hr", "product": "Tinch HR",
  "planId": "pro", "plan": "Tinch HR PRO",
  "employees": "45", "message": "...", "lang": "uz", "page": "https://..."
}
```

Tayyor variantlar: Formspree, Getform, Web3Forms yoki o'z API'ingiz.
Telegram-botga yuborish uchun ham shu endpoint'ni ishlating (bot tokenini
**hech qachon** frontend kodiga yozmang).

---

## 7. Rasm qo'shish

Rasmlar `images/opt/` papkasida `.webp` + `.jpg` juftligi sifatida saqlanadi
(webp — asosiy, jpg — eski brauzerlar uchun zaxira).

Yangi rasm tayyorlash (bir marta `npm i sharp` kerak):

```js
const sharp = require("sharp");
sharp("asl.jpg").resize({ width: 1200 })
  .webp({ quality: 78 }).toFile("images/opt/nom.webp");
sharp("asl.jpg").resize({ width: 1200 })
  .jpeg({ quality: 82, mozjpeg: true }).toFile("images/opt/nom.jpg");
```

Yoki onlayn: [squoosh.app](https://squoosh.app) — kenglik 1200px, sifat ~80.

---

## 8. Fayllar tuzilishi

```
index.html          bosh sahifa
product.html        mahsulot sahifasi (?id=hr)
pricing.html        barcha tariflar (?product=hr)
order.html          buyurtma formasi (?product=hr&plan=pro)
contacts.html       aloqa
content.html        eski manzil → contacts.html ga yo'naltiradi

css/tokens.css      rang, shrift, masofa — dizayn tizimi
css/base.css        reset va tipografika
css/components.css  tugma, karta, jadval, forma, header, footer
css/pages.css       hero, tariflar, aloqa sahifasi bloklari

js/data/site.js     ← SAYT MATNLARI
js/data/products.js ← MAHSULOT VA TARIFLAR
js/i18n.js          til tizimi (atribut asosida)
js/icons.js         SVG ikonkalar
js/render.js        karta, tarif, jadval markupi
js/app.js           header, footer, mobil menyu
js/home.js  js/product.js  js/pricing.js  js/order.js  js/contacts.js
```

---

## 9. Lokal ishga tushirish

`file://` orqali ochsangiz ham ishlaydi, lekin to'g'ri sinash uchun:

```bash
cd d:/Abdulahadxon/Site
python -m http.server 8080
```

So'ng brauzerda: `http://localhost:8080`

Tilni tekshirish: `?lang=ru` yoki `?lang=uz` qo'shing.

---

## 10. Almashtirish tavsiya etiladigan rasmlar

Hozirgi rasmlar — stok fotolar. Ikkitasini yaxshilash kerak:

| Fayl                            | Muammo                             | Nima kerak                        |
| ------------------------------- | ---------------------------------- | --------------------------------- |
| `images/opt/hr.*`               | Asli 500×339 — retina ekranda xira  | 1200px kenglikdagi asl rasm        |
| `images/opt/hero-dashboard.*`   | Asli 600×401                        | Tizimning **haqiqiy** ekran tasviri |

Eng kuchli variant — stok foto o'rniga Tinch HR interfeysining o'z
skrinshoti. Bosh sahifadagi «brauzer ramkasi» aynan shu uchun qilingan.

> `images/video/` papkasidagi `Main.png`, `menu.png`, `Screenshot_*.png`
> fayllari **boshqa saytlarning** (SAP va h.k.) skrinshotlari — brauzer
> xatcho'plaringiz ham ko'rinib turibdi. Ularni saytda ishlatmang.

---

## 11. Tinch Ombor narxlari

Tinch HR narxlari sizdan kelgan PDF'da tayyor edi. Tinch Ombor narxlarini
dastlab men qo'ygandim (raqobatchilarga qarab), **2026-09-16 da egasi
yangiladi**:

| Paket | 1 foydalanuvchiga / oy | Oylik jami | Chegirma |
| --- | --- | --- | --- |
| Basic 10 | **69 000** | 690 000 | — |
| Basic 20 | 62 500 | 1 250 000 | ~−9% |
| Basic 40 | 57 500 | 2 300 000 | ~−17% |
| PRO 10 | **99 000** | 990 000 | — |
| PRO 20 | 90 000 | 1 800 000 | ~−9% |
| PRO 40 | 82 500 | 3 300 000 | ~−17% |

Chegirma foizlari oldingi narxlardagidek qoldirildi (42/38/35 va 60/55/50
ming edi), summalar yumaloq qilib olindi.

**Qoida:** tarif kartasidagi «… dan» narxi eng kichik paketning
«1 foydalanuvchiga» narxiga teng bo'lishi shart — aks holda kartadagi
raqam jadvalda uchramaydi.

Narxni o'zgartirganda **uch joyni** yangilang:

1. `products.js` → `warehouse` → `pricingModes[0].plans[].price.amount`
2. `products.js` → `warehouse` → `pricingModes[0].priceTables[].rows`
3. `pricing.html` → `<meta name="description">` (JS'siz zaxira tavsif,
   «Ombor … so'mdan» deb yozilgan)

Bosh sahifa kartochkasi, buyurtma formasi va Google uchun JSON-LD narxi
1-banddan o'zi olinadi.

### Raqobatchilar (dastlabki narx shularga qarab qo'yilgan)

| Tizim | Oylik narxi |
| --- | --- |
| MoySklad UZ | Start 74 250 · Bazaviy 180 000 · Professional 510 000 · Korporativ 1 185 000 |
| BILLZ | Start 299 000 · Advanced 499 000 · Pro 999 000 (+179 000 har qo'shimcha nuqta) |

Tinch Ombor BILLZ'dan farqli — chakana savdo (kassa, POS) uchun emas,
distribyutsiya uchun; MoySklad'da esa partiya + FEFO + agent + kredit
limiti yo'q.

---

## 11.1. Tinch Savdo: manba va farqi

Mahsulot `C:\OSPanel\domains\Sement` dagi Laravel loyihasidan kelib
chiqib yozildi. Matnlar tasavvurdan emas, koddan olingan:

| Saytdagi da'vo | Koddagi asos |
| --- | --- |
| Foyda avtomatik | `FinanceController`: `kg * sell - kg * buy` |
| Qarz ikki tomonlama | `Client::where('balans','<',0)` va `>0` |
| Kassa balansni tuzatadi | `CashierController::store` balansni yangilaydi |
| Muddati kelgan to'lovlar | `SaleController::debt` — `refund_date <= bugun` |
| Mijoz kod bilan ulanadi | `clients.code` (8 belgi) + `telegram_chat_id` |
| Mijoz tasdiqlaydi | `sale_accept_{id}` / `sale_reject_{id}` callback |
| Ommaviy xabar | `telegram_messages` jadvali va `sendBroadcastMessage` |

**Ombordan farqi:** rol tizimi yo'q (bitta foydalanuvchi), ombor qoldig'i,
partiya va yaroqlilik muddati yo'q. Bu — vositachi savdo daftari.

**Narxlar:** Start 350 USD (1 oy qo'llab-quvvatlash), PRO 550 USD
(1 yil qo'llab-quvvatlash + Telegram-bot). Bir martalik, obuna yo'q.

**Aksiya tegmaydi.** `pricingModes[0].promoExclude: true` — narx allaqachon
past bo'lgani uchun 35% chegirma qo'llanmaydi. Kerak bo'lsa shu qatorni
o'chirasiz.

**Rasm:** `images/opt/savdo.svg` — vaqtinchalik grafika (sotuvlar jadvali
va Telegram tasdig'i). Haqiqiy skrinshot bilan almashtiring. Boshqa
mahsulotlardan farqli, bu SVG — `image` maydoni obyekt emas, oddiy satr.

---

## 11.2. Tinch Call Center: hali to'ldirilmagan

Bu mahsulot **o'rinbosar matn bilan** qo'shilgan. Asterisk asosida
qurilishi aniq, qolgani hali yo'q:

| Nima | Holati |
| --- | --- |
| Modullar ro'yxati | aniqlanmagan — `highlights` da 6 ta tipik imkoniyat yozilgan |
| Narxlar | yo'q — `plans: []`, kartochkada «Tez orada» chiqadi |
| Rasm | vaqtinchalik SVG (`images/opt/callcenter.svg`) |

`highlights` dagi matn Asterisk asosidagi call-markazlar odatda nima
qilishiga qarab yozilgan. Haqiqiy tizim boshqacha bo'lsa — o'zgartiring.

**Ishga tushganda qiladigan ishlar:**

1. `highlights` ni haqiqiy modullarga moslang
2. `pricingModes[0].plans` ga tariflarni qo'shing
3. `notes` dagi «Tizim ishlab chiqilmoqda» izohini o'chiring
4. **`soon: true` ni o'chiring**
5. `image` ni haqiqiy skrinshotga almashtiring
6. `site.js` → `home.hero.stats` dagi «tayyor mahsulot» sonini oshiring

### Joylashuvi haqida

Call Center «Tez orada» mahsulotlar qatorida — **Saytlardan keyin, CRM
oldida**. Oldin u ataylab Savdodan keyin turardi; 2026-09-17 da egasi
qoidani hamma uchun bir xil qildi: chiqmaganlar oxirida. Ishga tushgach
uni `products.js` da yuqoriroqqa ko'chirasiz.

### «Tayyor mahsulot» soni

`site.js` → `home.hero.stats` dagi birinchi raqam **`soon: true`
bo'lmaganlar sonini** ko'rsatishi kerak. Hozir 5 ta: Ombor, HR, Savdo,
Uylar, Saytlar.

Bu raqamni jami mahsulot soniga (8) tenglashtirmang: mehmon pastga
tushib «Tez orada» yorlig'ini ko'radi va yozuv yolg'on ekanini
darhol payqaydi.

---

## 12. Tinch Uylar: narxlar va manba haqida

Ma'lumot raqobatchining (GOHOUSE) taqdimotidan olingan. **Undan faqat
funksional ro'yxat olindi** — nima ishlashi. Matnlar butunlay qaytadan
yozildi, ularning brendi, skrinshotlari, mijozlar ro'yxati va kompaniya
tarixi ishlatilmadi. Bular ularniki, saytga qo'yish mumkin emas.

Narxlar ~25% pasaytirildi:

| | Raqobatchi | Tinch Uylar |
| --- | --- | --- |
| Boshlang'ich tarif | 1 200 000 UZS/oy | **900 000 UZS/oy** |
| To'liq tarif | 2 400 000 UZS/oy | **1 800 000 UZS/oy** |
| Qo'shimcha foydalanuvchi | 200 000 UZS/oy | **150 000 UZS/oy** |
| Qo'shimcha 100 birlik | 800 000 UZS/oy | **600 000 UZS/oy** |
| Progress (bir marotaba) | 10 800 USD | **8 100 USD** |
| Expert (bir marotaba) | 14 600 USD | **10 800 USD** |
| Premium (bir marotaba) | 18 000 USD | **13 500 USD** |

Chegirma qoidalari saqlangan: yillik to'lovda −25%, bir marotaba to'lovda −10%.
Limitlar (foydalanuvchi, obyekt, uy, birlik soni) o'zgartirilmagan.

> Raqobatchining «Expert» paketida arifmetika to'g'ri kelmasdi: 4 000 × 4 = 16 000,
> −10% = 14 400, ammo ular 14 600 deb yozgan. Bizda uchala paket ham aniq:
> 3 000 × 3/4/5 → −10% → 8 100 / 10 800 / 13 500.

### Ikki xil tarif jadvali

Tinch Uylar'da ikkita rejim bor va **har birining o'z taqqoslash jadvali**:

```js
pricingModes: [
  { id: "subscription", matrixPlans: ["start", "standard"], ... },
  { id: "onetime",      matrixPlans: ["progress", "expert", "premium"], ... },
]
```

`featureGroups` bitta — lekin har bir qatorning `plans` obyektida beshta
kalit ham bor. Rejim `matrixPlans` orqali o'ziga kerak ustunlarni tanlaydi.
Boshqa mahsulotlarda `matrixPlans` mahsulot darajasida turaveradi.

### Rasm

`images/opt/uylar.*` — men yaratgan vaqtinchalik grafika (shaxmatka + shahar
silueti, sayt ranglarida). **Uni tizimning haqiqiy skrinshoti bilan
almashtiring** — shaxmatka yoki interaktiv fasad ekrani eng mos keladi.

---

## 13. Ma'lumot aniqligi haqida

`products.js` dagi Tinch HR ma'lumotlari **PDF'dan aynan ko'chirilgan**.

PDF'da tarif nomi va xodimlar soni mos kelmasdi (`Basic 20` → 15 xodim,
`Basic 50` → 45 xodim, `Basic 100` → 90 xodim). **2026-08-25 da tuzatildi:**
endi nomdagi son xodimlar soniga aynan teng — `Basic 15 / 45 / 90` va
`PRO 15 / 45 / 90`. Narxlar o'zgarmadi.

**2026-09-16 da egasi obuna narxlarini oshirdi** — endi ular PDF'dagidan farq qiladi:

| Paket | 1 xodimga / oy | Oylik jami | Chegirma |
| --- | --- | --- | --- |
| Basic 15 | **39 000** (edi 27 000) | 585 000 | — |
| Basic 45 | 36 000 (edi 25 000) | 1 620 000 | ~−8% |
| Basic 90 | 33 000 (edi 23 000) | 2 970 000 | ~−15% |
| PRO 15 | **55 000** (edi 35 000) | 825 000 | — |
| PRO 45 | 52 000 (edi 33 000) | 2 340 000 | ~−5% |
| PRO 90 | 47 000 (edi 30 000) | 4 230 000 | ~−15% |

Katta paketdagi chegirma foizlari eskisidek qoldirildi, summalar 1 000 ga yumaloqlandi.
Tinch HR Sale (bir martalik) narxlari o'zgarmadi.

Tinch Ombor jadvalida paket nomidagi son foydalanuvchilar soniga teng:
`Basic 10 / 20 / 40` va `PRO 10 / 20 / 40`.

### Tekshirilishi kerak bo'lgan arifmetika

`Tinch HR Sale` jadvalida «Progress» qatori boshqalardan farq qiladi:

| Tarif | Bo'lib to'lash | −10% bo'lsa | Jadvalda |
| --- | --- | --- | --- |
| Start | 1 500 × 3 = 4 500 | 4 050 | 4 050 ✅ |
| **Progress** | **3 000 × 3 = 9 000** | **8 100** | **8 000** ⚠️ |
| Expert | 3 000 × 4 = 12 000 | 10 800 | 10 800 ✅ |
| Premium | 3 000 × 6 = 18 000 | 16 200 | 16 200 ✅ |

Qolgan uchtasi aniq 10% chegirma, «Progress» esa 100 dollarga farq qiladi.
PDF'da shunday yozilgani uchun o'zgartirilmadi. Bu maxsus chegirma bo'lsa —
qoldiring; xato bo'lsa `8 000 USD` ni `8 100 USD` ga tuzating
(`products.js` → `hr` → `onetime` → `priceTables[0].rows[1].onceHtml`).

**Telegram-bot** hujjatda yo'q edi — siz aytgan tavsif bo'yicha yozdim va
`soon: true` bilan belgiladim (PRO tarifida, 6 ta imkoniyat). Ishga tushgach
`soon` bayrog'ini o'chirasiz. Tavsif noto'g'ri bo'lsa —
`products.js` → `warehouse` → «Telegram-bot orqali buyurtma» guruhini tuzating.

---

## 14. Serverga qo'yish (deploy)

Sayt statik — hech qanday PHP, Node yoki baza kerak emas. Barcha fayllarni
hosting ildiziga (`public_html`) ko'chirasiz, tamom.

### Apache / cPanel

`.htaccess` fayli tayyor — u bilan birga ko'chiring. Ichida:

- **gzip / brotli siqish** — CSS va JS hajmi ~4 barobar kamayadi
- **kesh sarlavhalari** — rasm va shriftlar 1 yil, HTML har safar tekshiriladi
- **www → asosiy domen** yo'naltirish
- **`/index.html` → `/`** yo'naltirish (SEO uchun bitta manzil)
- **xavfsizlik sarlavhalari** (nosniff, referrer-policy, frame-options)
- **404 sahifasi**

SSL sertifikat o'rnatgandan keyin `.htaccess` dagi HTTPS blokidagi
izohni oching (`#` belgilarini olib tashlang):

```apache
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
```

### Nginx ishlatsangiz

`.htaccess` ishlamaydi, o'rniga server blokiga:

```nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
gzip_min_length 512;

location ~* \.(webp|jpg|jpeg|png|svg|ico|woff2)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}
location ~* \.(css|js)$ {
  add_header Cache-Control "public, max-age=604800";
}
location ~* \.html$ {
  add_header Cache-Control "no-cache, must-revalidate";
}
error_page 404 /404.html;
```

### Qo'ygandan keyingi ro'yxat

1. `https://tinch.uz` ochiladimi, `http://` avtomatik `https://` ga o'tadimi
2. Telegramda saytga havola tashlang — preview rasmi chiqishi kerak
   (`images/opt/og-cover.jpg`)
3. Mavjud bo'lmagan manzilni oching (`tinch.uz/xxx`) — 404 sahifasi chiqsin
4. [Google Search Console](https://search.google.com/search-console) ga
   qo'shing va `sitemap.xml` ni yuboring
5. [Yandex Webmaster](https://webmaster.yandex.ru) — O'zbekistonda ulushi katta
6. [PageSpeed Insights](https://pagespeed.web.dev) bilan tekshiring
7. Telefon va Telegram havolalarini telefonda bosib ko'ring

### Domen o'zgarsa

`https://tinch.uz` manzili quyidagi joylarda yozilgan:

- `js/data/site.js` → `company.url`
- har bir `.html` faylning `<head>` qismi (canonical, og:url, og:image)
- `sitemap.xml`
- `robots.txt`

---

## 15. Serverga nima yuklash kerak

Loyihada 33 MB fayl bor, lekin **serverga 1 MB dan kamrog'i kerak**.
Qolgani — rasmlarning asl nusxalari, ular git tarixida saqlanib qoladi.

### Yuklang

```
*.html          .htaccess       robots.txt      sitemap.xml
css/            js/             images/opt/     images/logo2.png
```

### Yuklamang (27.6 MB, ishlatilmaydi)

```
images/pages/   asl rasmlar — images/opt/ shulardan yasalgan
images/video/   eski videolar va boshqa saytlarning skrinshotlari
images/icon/    eski dizayn ikonkalari — endi SVG kod ichida
images/bg-7.png images/Screenshot_1.png
QOLLANMA.md     SEO_QOLLANMA.md     .git/
```

Bu papkalarni **o'chirmang** — kelajakda rasmni qayta siqish kerak bo'lsa,
asl nusxa shu yerda turibdi. Faqat serverga ko'chirmang.

> `css/style.css` — eski dizaynning uslublari edi, hech qayerga ulanmagani
> uchun o'chirildi. Kerak bo'lsa git tarixidan tiklanadi.
