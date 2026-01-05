// Contact page translations
function applyContactTranslations(lang) {
  if (!translations || !translations[lang] || !translations[lang].contact) return;
  
  const t = translations[lang].contact;
  
  // Newsletter
  const newsletter = document.querySelector('.newsletter-prompt');
  if (newsletter) {
    newsletter.textContent = t.newsletter;
  }
  
  // Title
  const title = document.querySelector('.contact-title');
  if (title) {
    title.textContent = t.title;
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

// Language switcher for contact page
function initContactLanguageSwitcher() {
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
      applyContactTranslations(lang);
    });
  });
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Here you can add form submission logic
      // For example, send to server or email service
      console.log('Form submitted:', { name, email, message });
      
      // Show success message (you can customize this)
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
    applyContactTranslations(currentLang);
    initContactLanguageSwitcher();
  } else {
    // Wait for translations to load
    setTimeout(function() {
      if (typeof translations !== 'undefined') {
        applyContactTranslations(currentLang);
        initContactLanguageSwitcher();
      }
    }, 100);
  }
});
