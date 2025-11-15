const scrollButtons = document.querySelectorAll('[data-scroll]');
scrollButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-scroll');
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

const form = document.querySelector('.form');
const success = document.querySelector('.form__success');

function saveLead(data) {
  const stored = JSON.parse(localStorage.getItem('leads') || '[]');
  stored.push({ ...data, createdAt: new Date().toISOString() });
  localStorage.setItem('leads', JSON.stringify(stored));
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const lead = Object.fromEntries(formData.entries());
  saveLead(lead);
  success?.removeAttribute('hidden');
  form.reset();
  setTimeout(() => success?.setAttribute('hidden', ''), 5000);
});
