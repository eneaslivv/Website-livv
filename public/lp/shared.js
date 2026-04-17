/* ============================================================
   LIVV · Sales landings · Shared JS
   - Lenis smooth scroll
   - Floating navbar scroll + mobile menu
   - IntersectionObserver reveal animations
   - FAQ accordion
   - Form submit stub
   ============================================================ */

/* ---- Lenis smooth scroll ---- */
function initLenis() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(pointer: coarse)').matches) return; // touch devices: native scroll
  if (!window.Lenis) return;
  const lenis = new window.Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 2,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  // anchor links respected
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -60, duration: 1.2 });
    });
  });
  window.__lenis = lenis;
}

/* ---- Navbar scroll shrink + mobile menu ---- */
function initNavbar() {
  const nav = document.querySelector('.livv-nav');
  const mobileBtn = document.querySelector('.livv-nav-mobile');
  const mobileMenu = document.querySelector('.livv-mobile-menu');
  if (!nav) return;

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (mobileBtn && mobileMenu) {
    const bg = mobileMenu.querySelector('.livv-mobile-menu-bg');
    mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    bg && bg.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // Highlight current landing in nav
  const path = window.location.pathname;
  document.querySelectorAll('[data-nav-route]').forEach(el => {
    if (path.startsWith(el.getAttribute('data-nav-route'))) el.classList.add('active');
  });
}

/* ---- Scroll reveal ---- */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  els.forEach(el => io.observe(el));
}

/* ---- FAQ accordion ---- */
function initFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

/* ---- Form submit stub ---- */
function initForm() {
  document.querySelectorAll('form[data-livv-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      if (!btn) return;
      const originalHTML = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.style.opacity = '.7';
      setTimeout(() => {
        btn.innerHTML = form.getAttribute('data-success-msg') || "We'll be in touch within 2h ·";
        btn.style.background = '#10b981';
      }, 1200);
    });
  });
}

/* ---- Boot ---- */
function boot() {
  initLenis();
  initNavbar();
  initReveal();
  initFaq();
  initForm();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
