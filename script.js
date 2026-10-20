// ==== 1. Живой поиск по персонажам ====
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const text = card.textContent.toLowerCase();
    const match = name.includes(query) || text.includes(query);
    card.classList.toggle('hidden', !match);
  });
});

// ==== 2. Переключение светлой / тёмной темы ====
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ==== 3. Плавная прокрутка по меню ====
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ==== 4. Появление карточек при скролле ====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity .6s ease, transform .6s ease';
  observer.observe(card);
});
