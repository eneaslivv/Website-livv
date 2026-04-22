/* ============================================================
   LIVV · Landing side TOC
   Auto-detects <section id="..."> elements, builds a vertical
   index in the top-right, highlights current section on scroll.
   ============================================================ */
(function () {
  function labelFor(section) {
    const explicit = section.getAttribute('data-toc-label');
    if (explicit) return explicit;
    const h = section.querySelector('h2.section-title, h2, h1');
    if (h) {
      const clone = h.cloneNode(true);
      return clone.textContent.trim().replace(/\s+/g, ' ').slice(0, 40);
    }
    return section.id.replace(/-/g, ' ');
  }

  function build() {
    const candidates = Array.from(document.querySelectorAll('section[id], div[id]'));
    const sections = candidates.filter((s) => {
      const id = s.id;
      if (!id) return false;
      if (['home', 'top'].includes(id)) return false;
      return s.offsetHeight > 300;
    });
    if (sections.length < 2) return;

    const nav = document.createElement('nav');
    nav.className = 'livv-toc';
    nav.setAttribute('aria-label', 'Page sections');

    sections.forEach((s) => {
      const a = document.createElement('a');
      a.href = '#' + s.id;
      a.setAttribute('data-section-id', s.id);
      const label = document.createElement('span');
      label.className = 'livv-toc-label';
      label.textContent = labelFor(s);
      a.appendChild(label);
      a.addEventListener('click', (e) => {
        e.preventDefault();
        s.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + s.id);
      });
      nav.appendChild(a);
    });

    document.body.appendChild(nav);
    requestAnimationFrame(() => nav.classList.add('ready'));

    const links = nav.querySelectorAll('a');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          links.forEach((a) => a.classList.toggle('active', a.getAttribute('data-section-id') === id));
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
