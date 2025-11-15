const crafts = [
  {
    name: "بن مبارك محمد",
    service: "رخام وبناء تشطيبات",
    badge: "construction",
    district: "وسط المدينة",
    rating: 4.8,
    years: 9,
    quote: "حر في الرخام"
  },
  {
    name: "Kim Larsa",
    service: "كهرباء منزلية وصناعية",
    badge: "electric",
    district: "حي المحطة",
    rating: 4.7,
    years: 8,
    quote: "عامل كهربائي 🕹🔋🔌"
  },
  {
    name: "أم أمين وفاطمة",
    service: "تنظيم منازل + مساعدة نسوية",
    badge: "water",
    district: "حي الرمال",
    rating: 4.9,
    years: 6,
    quote: "حاجة مليحة الله يسهل"
  },
  {
    name: "جوهرة الجنوب",
    service: "سباكة + تنظيف خزانات",
    badge: "water",
    district: "أديغ",
    rating: 4.6,
    years: 5,
    quote: "مهتمة جدًّا"
  },
  {
    name: "دابو عبد الرؤوف",
    service: "صيانة مكيفات وكهرباء",
    badge: "electric",
    district: "حي 5 جويلية",
    rating: 4.5,
    years: 12,
    quote: "فكرة ممتازة ولكن لازم تنظيم"
  },
  {
    name: "بن مبارك حميد",
    service: "نقل وميكانيك ميداني",
    badge: "mechanic",
    district: "حي الشهداء",
    rating: 4.4,
    years: 10,
    quote: "حر في الرخام"
  }
];

const testimonials = [
  {
    author: "أم أمين وفاطمة",
    text: "حاجة مليحة الله يسهل ياربي — أخيرًا تنسيق محترم في عين صالح.",
    time: "منذ ساعة"
  },
  {
    author: "Kim Larsa",
    text: "أنصحكم بهوية قوية وخدمة مدروسة… التطبيق هذا أول خطوة صحيحة.",
    time: "منذ ساعة"
  },
  {
    author: "جلال جلال",
    text: "فكرة مليحة ربي يحفظك. الخدمة دي تنقص علينا تعب البحث عن حرفي.",
    time: "منذ ساعتين"
  },
  {
    author: "أم فردوس حبيبة",
    text: "فكرة روعة الله يوفقكم ويسهل ليكم. شجعت العائلة كامل تجربها.",
    time: "منذ ساعة"
  }
];

const craftsGrid = document.querySelector("#crafts-grid");
const filters = document.querySelectorAll(".filters button");
const testimonialGrid = document.querySelector("#testimonial-grid");
const leadForm = document.querySelector("#lead-form");
const tabs = document.querySelectorAll(".tab");
const statusBox = document.querySelector(".form-status");

function renderCrafts(filter = "all") {
  craftsGrid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  crafts
    .filter((craft) => filter === "all" || craft.badge === filter)
    .forEach((craft) => {
      const card = document.createElement("article");
      card.innerHTML = `
        <div class="tag">${craft.badge}</div>
        <h3>${craft.name}</h3>
        <p>${craft.service}</p>
        <small>الحي: ${craft.district}</small>
        <small>سنوات الخبرة: ${craft.years} · تقييم ${craft.rating}</small>
        <blockquote>${craft.quote}</blockquote>
      `;
      fragment.appendChild(card);
    });
  craftsGrid.appendChild(fragment);
}

function renderTestimonials() {
  testimonialGrid.innerHTML = "";
  testimonials.forEach((item) => {
    const card = document.createElement("article");
    card.innerHTML = `
      <p>${item.text}</p>
      <strong>${item.author}</strong>
      <small>${item.time}</small>
    `;
    testimonialGrid.appendChild(card);
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderCrafts(button.dataset.filter);
  });
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(leadForm);
  const role = formData.get("role") === "artisan" ? "حرفي" : "زبون";
  const payload = Object.fromEntries(formData.entries());
  statusBox.textContent = "جاري حفظ طلبك…";

  setTimeout(() => {
    statusBox.textContent = `✅ تم تسجيل (${role}): ${payload.name}. سنتواصل خلال أقل من ساعة.`;
    leadForm.reset();
    leadForm.role.value = role === "حرفي" ? "artisan" : "client";
  }, 700);
});

leadForm.addEventListener("click", (event) => {
  if (!event.target.matches(".tab")) return;
  tabs.forEach((tab) => tab.classList.remove("active"));
  event.target.classList.add("active");
  leadForm.role.value = event.target.dataset.role;
  const placeholder =
    event.target.dataset.role === "artisan"
      ? "نوع الحرفة (كهرباء، سباكة...)"
      : "الخدمة المطلوبة";
  leadForm.service.placeholder = placeholder;
});

const scrollButtons = document.querySelectorAll('[data-scroll]');
scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.scroll);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

renderCrafts();
renderTestimonials();
