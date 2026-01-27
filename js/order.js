// Order page functionality
let currentService = null;

// Get service from URL parameter
function getServiceFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const service = urlParams.get('service');
  return service || 'home';
}

// Apply service information
function applyServiceInfo(lang) {
  if (!translations || !translations[lang]) return;
  
  const service = getServiceFromURL();
  currentService = service;
  
  const t = translations[lang];
  let serviceData = null;
  
  // Get service data based on service type
  switch(service) {
    case 'home':
      serviceData = t.home;
      break;
    case 'hrm':
    case 'hr':
      serviceData = t.hrm;
      break;
    case 'websites':
      serviceData = t.websites;
      break;
    case 'warehouse':
      serviceData = t.warehouse;
      break;
    case 'erp':
      serviceData = t.erp;
      break;
    case 'crm':
      serviceData = t.crm;
      break;
    default:
      serviceData = t.home;
  }
  
  if (serviceData && serviceData.orderTitle) {
    const titleElement = document.getElementById('serviceTitle');
    if (titleElement) {
      titleElement.textContent = serviceData.orderTitle;
    }
    
    const descriptionElement = document.getElementById('serviceDescription');
    if (descriptionElement && serviceData.orderDescription) {
      descriptionElement.innerHTML = serviceData.orderDescription;
    }
  }
  
  // Apply contact translations
  applyOrderTranslations(lang);
}

// Apply order page translations
function applyOrderTranslations(lang) {
  if (!translations || !translations[lang] || !translations[lang].contact) return;
  
  const t = translations[lang].contact;
  
  // Newsletter prompt
  const newsletter = document.getElementById('newsletterPrompt');
  if (newsletter) {
    newsletter.textContent = t.newsletter || 'ЗАКАЗАТЬ УСЛУГИ';
  }
  
  // Address and Phone
  const addressPhone = document.querySelector('.address-phone');
  if (addressPhone) {
    addressPhone.textContent = `${t.address}, ${t.phone}`;
  }
  
  // Hours
  const weekdays = document.querySelector('.weekdays');
  const weekends = document.querySelector('.weekends');
  if (weekdays) {
    weekdays.textContent = t.hoursWeekdays + ',';
  }
  if (weekends) {
    weekends.textContent = t.hoursWeekends;
  }
  
  // Email
  const email = document.querySelector('.email');
  if (email) {
    email.textContent = t.email;
    email.href = `mailto:${t.email}`;
  }
  
  // Follow title
  const followTitle = document.querySelector('.follow-title');
  if (followTitle) {
    followTitle.textContent = t.follow;
  }
  
  // Form placeholders
  const nameInput = document.getElementById('name');
  if (nameInput) {
    nameInput.placeholder = t.namePlaceholder;
  }
  
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.placeholder = lang === 'uz' ? 'Telefon raqamingizni kiriting' : 'Введите номер телефона';
  }
  
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.placeholder = t.emailPlaceholder;
  }
  
  const messageTextarea = document.getElementById('message');
  if (messageTextarea) {
    messageTextarea.placeholder = t.messagePlaceholder;
  }
  
  // Submit button
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.textContent = t.submit;
  }
  
  // Copyright
  const copyright = document.querySelector('.copyright');
  if (copyright) {
    copyright.textContent = t.copyright;
  }
}

// Language switcher for order page
function initOrderLanguageSwitcher() {
  const langLinks = document.querySelectorAll('.lang-link');
  const currentLang = localStorage.getItem('language') || 'ru';
  
  langLinks.forEach(link => {
    const lang = link.getAttribute('data-lang');
    
    // Highlight current language
    if (lang === currentLang) {
      link.classList.add('active');
    }
    
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Update active state
      langLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Change language
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      applyServiceInfo(lang);
    });
  });
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const service = getServiceFromURL();
      
      // Here you can add form submission logic
      // For example, send to server or email service
      console.log('Order form submitted:', { name, phone, email, message, service });
      
      // Show success message
      const currentLang = localStorage.getItem('language') || 'ru';
      const successMsg = currentLang === 'uz' 
        ? 'Xabaringiz uchun rahmat! Tez orada siz bilan bog\'lanamiz.'
        : 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.';
      
      alert(successMsg);
      
      // Reset form
      form.reset();
    });
  }
  
  // Apply translations when page loads
  const currentLang = localStorage.getItem('language') || 'ru';
  document.documentElement.lang = currentLang;
  
  if (typeof translations !== 'undefined') {
    applyServiceInfo(currentLang);
    initOrderLanguageSwitcher();
  } else {
    // Wait for translations to load
    setTimeout(function() {
      if (typeof translations !== 'undefined') {
        applyServiceInfo(currentLang);
        initOrderLanguageSwitcher();
      }
    }, 100);
  }
});
