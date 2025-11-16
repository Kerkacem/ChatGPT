const tabButtons = document.querySelectorAll('.tab-button');
const forms = document.querySelectorAll('.form');
const scrollToForms = document.getElementById('scrollToForms');
const leadForm = document.getElementById('leadForm');
const bottomNav = document.querySelector('.bottom-nav');

const WHATSAPP_NUMBER = '213661379535';

// Tabs switching
if (tabButtons.length) {
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const target = button.dataset.target;
      forms.forEach((form) => {
        form.classList.toggle('active', form.id === target);
      });
    });
  });
}

// Scroll to forms when artisan CTA clicked
if (scrollToForms) {
  scrollToForms.addEventListener('click', () => {
    document.querySelector('#forms')?.scrollIntoView({ behavior: 'smooth' });
    tabButtons.forEach((btn) => {
      const isArtisan = btn.dataset.target === 'artisanForm';
      btn.classList.toggle('active', isArtisan);
    });
    forms.forEach((form) => form.classList.toggle('active', form.id === 'artisanForm'));
  });
}

// Handle client form submission
const clientForm = document.getElementById('clientForm');
if (clientForm) {
  clientForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(clientForm);
    const category = data.get('category');
    const neighborhood = data.get('neighborhood');
    const description = data.get('description');
    const time = data.get('time');

    const message = `طلب خدمة جديد من موقع حرفي عين صالح:%0a\n` +
      `النوع: ${category}%0a` +
      `الحي: ${neighborhood}%0a` +
      `الوقت المفضل: ${time}%0a\n` +
      `التفاصيل: ${description}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  });
}

// Handle artisan form submission
const artisanForm = document.getElementById('artisanForm');
if (artisanForm) {
  artisanForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(artisanForm);

    const message = `تسجيل حرفي:%0a\n` +
      `الاسم: ${data.get('name')}%0a` +
      `الحرفة: ${data.get('skill')}%0a` +
      `الخبرة: ${data.get('experience')} سنوات%0a` +
      `الأحياء: ${data.get('areas')}%0a\n` +
      `نبذة: ${data.get('bio')}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  });
}

// Lead form simulation
if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(leadForm);
    const preview = document.createElement('div');
    preview.className = 'toast';
    preview.textContent = `تم استلام بيانات ${data.get('leadName')}، سنتواصل عبر ${data.get('leadPhone')}.`;
    document.body.appendChild(preview);
    setTimeout(() => preview.remove(), 4000);
    leadForm.reset();
  });
}

// Highlight active bottom nav link while scrolling
if (bottomNav) {
  const navLinks = bottomNav.querySelectorAll('a[href^="#"]');
  const sections = Array.from(navLinks).map((link) => document.querySelector(link.getAttribute('href')));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          const activeLink = bottomNav.querySelector(`a[href="#${entry.target.id}"]`);
          activeLink?.classList.add('active');
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.filter(Boolean).forEach((section) => observer.observe(section));
}
