# SEO Optimallashtirish Qo'llanmasi

## Qo'shilgan SEO Elementlar

### 1. Meta Tags
- ✅ **Meta Description** - Sahifa tavsifi (allaqachon bor)
- ✅ **Meta Keywords** - Qidiruv kalit so'zlari (qo'shildi)
- ✅ **Meta Author** - Muallif (qo'shildi)
- ✅ **Meta Robots** - Qidiruv tizimlari uchun ko'rsatmalar (qo'shildi)
- ✅ **Meta Language** - Til (qo'shildi)

### 2. Open Graph Tags (Facebook, LinkedIn)
- ✅ **og:type** - Kontent turi
- ✅ **og:url** - Sahifa URL
- ✅ **og:title** - Sarlavha
- ✅ **og:description** - Tavsif
- ✅ **og:image** - Rasm
- ✅ **og:locale** - Til va mintaqa (ru_RU, uz_UZ)

### 3. Twitter Card Tags
- ✅ **twitter:card** - Twitter kartasi turi
- ✅ **twitter:url** - Sahifa URL
- ✅ **twitter:title** - Sarlavha
- ✅ **twitter:description** - Tavsif
- ✅ **twitter:image** - Rasm

### 4. Canonical URL
- ✅ **rel="canonical"** - Asosiy sahifa URL (duplicate kontentni oldini oladi)

### 5. Alternate Languages (hreflang)
- ✅ **hreflang="ru"** - Rus tili uchun
- ✅ **hreflang="uz"** - O'zbek tili uchun
- ✅ **hreflang="x-default"** - Default til

### 6. Alt Attributes (Rasmlar uchun)
- ✅ Barcha rasmlarga alt atributlari qo'shildi
- SEO va accessibility uchun muhim

### 7. Structured Data (JSON-LD)
- ✅ **Organization Schema** - Kompaniya ma'lumotlari
- ✅ **WebSite Schema** - Sayt ma'lumotlari
- Google va boshqa qidiruv tizimlari uchun

## Qo'shimcha SEO Tavsiyalar

### 1. Semantic HTML
```html
<!-- Yaxshi -->
<header>
  <nav>
    <ul>
      <li><a href="#">О Проекте</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h1>Asosiy sarlavha</h1>
  </section>
</main>
<footer>
  <p>Copyright</p>
</footer>
```

### 2. Heading Struktura (H1, H2, H3)
- Har bir sahifada faqat bitta `<h1>` bo'lishi kerak
- `<h2>`, `<h3>` va boshqalar mantiqiy tartibda

### 3. Internal Linking
- Sahifalar o'rtasida ichki havolalar qo'shing
- Anchor textlar mazmunli bo'lishi kerak

### 4. Page Speed
- Rasmlarni optimallashtirish (WebP format)
- CSS va JS fayllarni minify qilish
- Lazy loading rasmlar uchun

### 5. Mobile-Friendly
- ✅ Responsive dizayn (allaqachon bor)
- ✅ Viewport meta tag (allaqachon bor)

### 6. SSL Certificate
- HTTPS protokoli ishlatish (production uchun)

### 7. Sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tinch.uz/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 8. robots.txt
```
User-agent: *
Allow: /
Sitemap: https://tinch.uz/sitemap.xml
```

## Google Search Console

1. Google Search Console ga saytni qo'shing
2. Sitemap.xml ni yuklang
3. Indexing holatini kuzatib boring

## Google Analytics

1. Google Analytics kodini qo'shing
2. Foydalanuvchilar harakatini kuzatib boring
3. Conversion tracking sozlang

## Tekshirish Vositlari

- **Google PageSpeed Insights** - Sahifa tezligi
- **Google Rich Results Test** - Structured data tekshirish
- **Facebook Sharing Debugger** - Open Graph tekshirish
- **Twitter Card Validator** - Twitter Card tekshirish
- **W3C Validator** - HTML validatsiya

## Muhim Eslatmalar

1. **URL o'zgartirish**: Production da `https://tinch.uz/` ni o'z URL bilan almashtiring (agar kerak bo'lsa)
2. **Rasmlar**: Barcha rasmlarga alt atributlari qo'shildi
3. **Tillar**: hreflang taglar qo'shildi (uz va ru)
4. **Structured Data**: JSON-LD qo'shildi (Google uchun)

## Keyingi Qadamlar

1. ✅ Meta tags qo'shildi
2. ✅ Open Graph tags qo'shildi
3. ✅ Twitter Card tags qo'shildi
4. ✅ Alt atributlari qo'shildi
5. ✅ Structured data qo'shildi
6. ⏳ Sitemap.xml yaratish
7. ⏳ robots.txt yaratish
8. ⏳ Google Analytics qo'shish
9. ⏳ Google Search Console sozlash

