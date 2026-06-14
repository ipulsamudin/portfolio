// Navbar scroll
(function navbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Active nav link based on visible section
(function navHighlight() {
  const links = document.querySelectorAll('.nav-link[data-section]');
  const sections = Array.from(links).map(l => document.getElementById(l.dataset.section)).filter(Boolean);
  if (!sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  sections.forEach(s => obs.observe(s));
})();

// Mobile drawer toggle
(function mobileMenu() {
  const btnOpen = document.getElementById('menu-open');
  const btnClose = document.getElementById('menu-close');
  const drawer = document.getElementById('mobile-drawer');
  if (!btnOpen || !drawer) return;

  const close = () => { drawer.classList.remove('open'); document.body.style.overflow = ''; };
  btnOpen.addEventListener('click', () => { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; });
  btnClose && btnClose.addEventListener('click', close);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
})();

// Project filter
(function projectFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;

      cards.forEach(card => {
        const cats = (card.dataset.category || '').split(' ');
        const match = f === 'all' || cats.includes(f);
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();

// Contact form -> mailto
(function contactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = encodeURIComponent(form.name.value.trim());
    const email = encodeURIComponent(form.email.value.trim());
    const subject = encodeURIComponent(form.subject.value.trim() || 'Halo dari portofolio');
    const body = encodeURIComponent(`Halo Muhammad,\n\n${form.message.value.trim()}\n\n— ${decodeURIComponent(name)} (${decodeURIComponent(email)})`);
    window.location.href = `mailto:ipulsamudin@gmail.com?subject=${subject}&body=${body}`;
  });
})();

// Typed.js init (and re-init on language change)
(function typedHero() {
  let typed = null;

  function build(lang) {
    const dict = (window.I18N && window.I18N[lang]) || (window.I18N && window.I18N.id) || {};
    return [
      dict['hero.typed.1'] || 'I build websites',
      dict['hero.typed.2'] || 'I craft mobile apps',
      dict['hero.typed.3'] || 'I design REST APIs',
      dict['hero.typed.4'] || 'I ship end-to-end solutions'
    ];
  }

  function start(lang) {
    if (typeof Typed === 'undefined') return;
    const el = document.getElementById('typed-target');
    if (!el) return;
    if (typed) typed.destroy();
    el.textContent = '';
    typed = new Typed(el, {
      strings: build(lang),
      typeSpeed: 55,
      backSpeed: 28,
      backDelay: 1600,
      loop: true,
      smartBackspace: true
    });
  }

  window.__retypeHero = start;
  window.addEventListener('load', () => {
    const lang = localStorage.getItem('mns-lang') || 'id';
    start(lang);
  });
})();

// AOS init
window.addEventListener('load', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
  }
});

// Footer year
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// Expose I18N for typed hero re-init
window.I18N = window.I18N || (typeof I18N !== 'undefined' ? I18N : null);
