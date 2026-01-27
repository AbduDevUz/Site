// Til o'zgartirish tizimi
let currentLanguage = localStorage.getItem('language') || 'ru';

// Tarjimalarni yuklash (endi fetch() o'rniga to'g'ridan-to'g'ri JavaScript obyektidan)
function loadTranslations() {
  // translations.js fayli allaqachon yuklangan bo'lishi kerak
  if (typeof translations === 'undefined') {
    console.error('Tarjimalar yuklanmagan! translations.js faylini yuklang.');
    return;
  }
  
  document.documentElement.lang = currentLanguage;
  applyTranslations(currentLanguage);
  updateLanguageSwitcher(currentLanguage);
}

// Tilni o'zgartirish
function changeLanguage(lang) {
  if (translations && translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    applyTranslations(lang);
    updateLanguageSwitcher(lang);
  }
}

// Tarjimalarni qo'llash
function applyTranslations(lang) {
  if (!translations || !translations[lang]) return;
  
  const t = translations[lang];

  // Meta ma'lumotlar
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', t.meta.description);
  }
  document.title = t.meta.title;

  // Menyu elementlari (tartib: Home, HR, Websites, Warehouse, ERP, CRM)
  // Har bir menu elementini alohida tanlash orqali to'g'ri tartibni ta'minlaymiz
  const menuTabs = document.querySelectorAll('.futer-menu .tab');
  if (menuTabs.length >= 6) {
    // Home (index 0)
    const homeSpan = menuTabs[0].querySelector('span');
    if (homeSpan) homeSpan.textContent = t.menu.home;
    
    // HR (index 1)
    const hrSpan = menuTabs[1].querySelector('span');
    if (hrSpan) hrSpan.textContent = t.menu.hr;
    
    // Websites (index 2)
    const websitesSpan = menuTabs[2].querySelector('span');
    if (websitesSpan) websitesSpan.textContent = t.menu.websites;
    
    // Warehouse (index 3)
    const warehouseSpan = menuTabs[3].querySelector('span');
    if (warehouseSpan) warehouseSpan.textContent = t.menu.warehouse;
    
    // ERP (index 4)
    const erpSpan = menuTabs[4].querySelector('span');
    if (erpSpan) erpSpan.textContent = t.menu.erp;
    
    // CRM (index 5)
    const crmSpan = menuTabs[5].querySelector('span');
    if (crmSpan) crmSpan.textContent = t.menu.crm;
  }

  // Header menyu
  const headerMenu = document.querySelectorAll('.menu ul li a');
  if (headerMenu.length >= 2) {
    headerMenu[0].textContent = t.header.about;
    headerMenu[1].textContent = t.header.contacts;
  }

  // Salom matni (agar HTML da data-i18n="header.greeting" atributi bo'lsa)
  const greetingElement = document.querySelector('[data-i18n="header.greeting"]');
  if (greetingElement) {
    greetingElement.textContent = t.header.greeting;
  }

  // Telefon raqami
  const phoneLink = document.querySelector('.telfon a');
  if (phoneLink) {
    phoneLink.textContent = t.header.phone;
  }

  // Home section (tab_item 0)
  const homeSection = document.querySelectorAll('.tab_item')[0];
  if (homeSection) {
    const homeTitle = homeSection.querySelector('.title-blocks');
    if (homeTitle) {
      homeTitle.innerHTML = `${t.home.title} <br /> <span>${t.home.titleSpan}</span> ${t.home.titleSuffix}`;
    }
    const homeDesc = homeSection.querySelector('.big-data-info');
    if (homeDesc) {
      homeDesc.textContent = t.home.description;
    }
    const homeBtn = homeSection.querySelector('.btn-my2');
    if (homeBtn) {
      homeBtn.textContent = t.home.button;
    }
  }

  // HRM section (tab_item 1) - yangi tartib
  const hrmSection = document.querySelectorAll('.tab_item')[1];
  if (hrmSection) {
    const hrmTitle = hrmSection.querySelector('.title-blocks');
    if (hrmTitle) {
      hrmTitle.innerHTML = `${t.hrm.title}<span>${t.hrm.titleSpan}</span>`;
    }
    const hrmDesc = hrmSection.querySelector('.big-data-info');
    if (hrmDesc) {
      hrmDesc.innerHTML = t.hrm.description;
    }
    const hrmBtn = hrmSection.querySelector('.btn-my2');
    if (hrmBtn) {
      hrmBtn.textContent = t.hrm.button;
    }
  }

  // Websites section (tab_item 2) - yangi tartib
  const websitesSection = document.querySelectorAll('.tab_item')[2];
  if (websitesSection) {
    const websitesTitle = websitesSection.querySelector('.title-blocks');
    if (websitesTitle) {
      websitesTitle.innerHTML = `${t.websites.title} <br /> <span>${t.websites.titleSpan}</span> ${t.websites.titleSuffix}`;
    }
    const websitesDesc = websitesSection.querySelector('.big-data-info');
    if (websitesDesc) {
      websitesDesc.innerHTML = t.websites.description;
    }
    const websitesBtn = websitesSection.querySelector('.btn-my2');
    if (websitesBtn) {
      websitesBtn.textContent = t.websites.button;
    }
  }

  // Warehouse section (tab_item 3) - yangi tartib
  const warehouseSection = document.querySelectorAll('.tab_item')[3];
  if (warehouseSection) {
    const warehouseTitle = warehouseSection.querySelector('.title-blocks');
    if (warehouseTitle) {
      warehouseTitle.innerHTML = `${t.warehouse.title} <br /> <span>${t.warehouse.titleSpan}</span> ${t.warehouse.titleSuffix}`;
    }
    const warehouseDesc = warehouseSection.querySelector('.big-data-info ul');
    if (warehouseDesc) {
      const items = warehouseDesc.querySelectorAll('li');
      if (items.length >= 6) {
        items[0].textContent = t.warehouse.description.item1;
        items[1].textContent = t.warehouse.description.item2;
        items[2].textContent = t.warehouse.description.item3;
        items[3].textContent = t.warehouse.description.item4;
        items[4].textContent = t.warehouse.description.item5;
        items[5].textContent = t.warehouse.description.item6;
      }
    }
    const warehouseBtn = warehouseSection.querySelector('.btn-my2');
    if (warehouseBtn) {
      warehouseBtn.textContent = t.warehouse.button;
    }
  }

  // ERP section (tab_item 4) - yangi tartib
  const erpSection = document.querySelectorAll('.tab_item')[4];
  if (erpSection) {
    const erpTitle = erpSection.querySelector('.title-blocks');
    if (erpTitle) {
      erpTitle.innerHTML = `${t.erp.title}<span>${t.erp.titleSpan}</span>`;
    }
    const erpDesc = erpSection.querySelector('.big-data-info');
    if (erpDesc) {
      erpDesc.innerHTML = t.erp.description;
    }
    const erpBtn = erpSection.querySelector('.btn-my2');
    if (erpBtn) {
      erpBtn.textContent = t.erp.button;
    }
  }

  // CRM section (tab_item 5) - yangi tartib
  const crmSection = document.querySelectorAll('.tab_item')[5];
  if (crmSection) {
    const crmTitle = crmSection.querySelector('.title-blocks');
    if (crmTitle) {
      crmTitle.innerHTML = `${t.crm.title}<span>${t.crm.titleSpan}</span>`;
    }
    const crmDesc = crmSection.querySelector('.big-data-info');
    if (crmDesc) {
      crmDesc.innerHTML = t.crm.description;
    }
    const crmBtn = crmSection.querySelector('.btn-my2');
    if (crmBtn) {
      crmBtn.textContent = t.crm.button;
    }
  }
}

// Til tanlovchi tugmasini yangilash - yangi dizayn
function updateLanguageSwitcher(lang) {
  const langLinks = document.querySelectorAll('.lang-link');
  if (!langLinks || langLinks.length === 0) return;
  
  // Barcha linklardan active class ni olib tashlash
  langLinks.forEach(link => {
    link.classList.remove('active');
    const linkLang = link.getAttribute('data-lang');
    if (linkLang === lang) {
      link.classList.add('active');
    }
  });
}

// Til tanlovchi event listenerlarni qo'shish
function initLanguageSwitcher() {
  const langLinks = document.querySelectorAll('.lang-link');
  langLinks.forEach(link => {
    // Eski event listenerlarni olib tashlash
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    newLink.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = newLink.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
  updateLanguageSwitcher(currentLanguage);
}

// Sahifa yuklanganda tarjimalarni yuklash
function initI18n() {
  // Kichik kechikish - translations.js yuklanguncha kutish
  if (typeof translations === 'undefined') {
    setTimeout(initI18n, 50);
    return;
  }
  loadTranslations();
  initLanguageSwitcher();
}

// DOM yuklanganda ishga tushirish
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  // DOM allaqachon yuklangan
  initI18n();
}

// jQuery ready ham qo'shamiz (agar mavjud bo'lsa)
if (typeof jQuery !== 'undefined') {
  jQuery(document).ready(function() {
    // Agar tarjimalar yuklanmagan bo'lsa, yuklash
    if (typeof translations !== 'undefined') {
      loadTranslations();
    } else {
      setTimeout(function() {
        if (typeof translations !== 'undefined') {
          loadTranslations();
        }
      }, 100);
    }
    // Til tanlovchini init qilish
    initLanguageSwitcher();
  });
}
