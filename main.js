
const MOBILE_LINKS = document.querySelector('.mobile-panel');
const TOGGLE = document.querySelector('.menu-toggle');
if (TOGGLE && MOBILE_LINKS) {
  TOGGLE.addEventListener('click', () => MOBILE_LINKS.classList.toggle('open'));
  MOBILE_LINKS.querySelectorAll('a').forEach(a => a.addEventListener('click', () => MOBILE_LINKS.classList.remove('open')));
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const tabButtons = document.querySelectorAll('[data-filter]');
const menuCards = document.querySelectorAll('[data-category]');
if (tabButtons.length && menuCards.length) {
  tabButtons.forEach(btn => btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    menuCards.forEach(card => {
      const ok = filter === 'all' || card.dataset.category === filter;
      card.style.display = ok ? '' : 'none';
    });
  }));
}

const accItems = document.querySelectorAll('.acc-item');
accItems.forEach(item => {
  const btn = item.querySelector('.acc-btn');
  if (btn) btn.addEventListener('click', () => {
    const open = item.classList.contains('open');
    accItems.forEach(x => x.classList.remove('open'));
    if (!open) item.classList.add('open');
  });
});

const lb = document.querySelector('.lightbox');
const lbImg = lb?.querySelector('img');
const lbClose = lb?.querySelector('button');
if (lb && lbImg) {
  document.querySelectorAll('[data-lightbox]').forEach(fig => {
    fig.addEventListener('click', () => {
      lbImg.src = fig.dataset.full || fig.querySelector('img')?.src;
      lb.classList.add('active');
    });
  });
  lbClose?.addEventListener('click', () => lb.classList.remove('active'));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('active'); });
}

const slides = [...document.querySelectorAll('[data-slide]')];
if (slides.length > 1) {
  let i = 0;
  const show = (n) => slides.forEach((s, idx) => s.style.display = idx === n ? 'grid' : 'none');
  show(i);
  setInterval(() => { i = (i + 1) % slides.length; show(i); }, 5200);
}

const orderForm = document.querySelector('#orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(orderForm);
    const data = Object.fromEntries(fd.entries());
    const required = ['name','phone','item','message'];
    if (required.some(k => !String(data[k] || '').trim())) {
      alert('Please complete the required fields.');
      return;
    }
    const msg = encodeURIComponent(
      `Hi Nesbakes, I want to place an order.%0A%0A` +
      `Name: ${data.name}%0APhone: ${data.phone}%0AItem: ${data.item}%0APickup / Delivery: ${data.fulfilment || 'Not specified'}%0APreferred Date: ${data.date || 'Not specified'}%0A%0AMessage:%0A${data.message}`
    );
    window.open(`https://wa.me/917499554807?text=${msg}`, '_blank');
  });
}

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const data = Object.fromEntries(fd.entries());
    if (!data.name || !data.phone || !data.message) {
      alert('Please fill name, phone, and message.');
      return;
    }
    const msg = encodeURIComponent(
      `Hello Nesbakes,%0A%0AName: ${data.name}%0APhone: ${data.phone}%0AEmail: ${data.email || 'Not provided'}%0A%0AMessage:%0A${data.message}`
    );
    window.open(`https://wa.me/917499554807?text=${msg}`, '_blank');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
