# Yangi Matn Qo'shish Qo'llanmasi

## "Salom" so'zini qo'shish misoli

### 1-qadam: translations.js fayliga qo'shish

`js/translations.js` fayliga ikkala til uchun qo'shing:

```javascript
"ru": {
  "header": {
    "greeting": "Привет",  // ← Yangi qo'shildi
    "about": "О Проекте",
    ...
  }
},
"uz": {
  "header": {
    "greeting": "Salom",  // ← Yangi qo'shildi
    "about": "Loyiha haqida",
    ...
  }
}
```

### 2-qadam: i18n.js fayliga qo'shish

`js/i18n.js` faylida `applyTranslations()` funksiyasiga qo'shing:

```javascript
// Salom matni
const greetingElement = document.querySelector('[data-i18n="header.greeting"]');
if (greetingElement) {
  greetingElement.textContent = t.header.greeting;
}
```

### 3-qadam: HTML faylda ishlatish

`index.html` faylda qayerda ko'rsatmoqchi bo'lsangiz, shu joyga qo'shing:

```html
<!-- Variant 1: data-i18n atributi bilan -->
<span data-i18n="header.greeting">Salom</span>

<!-- Variant 2: ID yoki class bilan -->
<span id="greeting">Salom</span>
```

Agar ID yoki class ishlatsangiz, `i18n.js` da shu ID/class bo'yicha qidirish kerak:

```javascript
// ID bilan
const greetingElement = document.getElementById('greeting');
if (greetingElement) {
  greetingElement.textContent = t.header.greeting;
}

// Class bilan
const greetingElement = document.querySelector('.greeting');
if (greetingElement) {
  greetingElement.textContent = t.header.greeting;
}
```

## Umumiy qoida

1. **translations.js** → Yangi kalit qo'shing (ru va uz uchun)
2. **i18n.js** → `applyTranslations()` funksiyasiga kod qo'shing
3. **index.html** → HTML elementga `data-i18n` atributi yoki ID/class qo'shing

## Misollar

### Misol 1: Sarlavha qo'shish

```javascript
// translations.js
"home": {
  "welcomeTitle": "Xush kelibsiz",  // uz
  "welcomeTitle": "Добро пожаловать"  // ru
}

// i18n.js
const welcomeTitle = document.querySelector('[data-i18n="home.welcomeTitle"]');
if (welcomeTitle) {
  welcomeTitle.textContent = t.home.welcomeTitle;
}

// index.html
<h1 data-i18n="home.welcomeTitle">Xush kelibsiz</h1>
```

### Misol 2: Tugma matni

```javascript
// translations.js
"buttons": {
  "submit": "Yuborish",  // uz
  "submit": "Отправить"  // ru
}

// i18n.js
const submitBtn = document.querySelector('[data-i18n="buttons.submit"]');
if (submitBtn) {
  submitBtn.textContent = t.buttons.submit;
}

// index.html
<button data-i18n="buttons.submit">Yuborish</button>
```

