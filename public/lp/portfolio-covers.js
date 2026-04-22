/* ============================================================
   LIVV · Landing portfolio covers
   Mirrors home behavior: fetches featured items from Supabase and
   replaces static placeholders with real covers (video or image).
   Uses the same RPC (get_featured_portfolio_items) and cover logic
   (getCoverUrl + isVideoUrl) as components/sections/portfolio-section.tsx.
   ============================================================ */
(function () {
  const SUPABASE_URL = 'https://ngswutcpsgdgmmjnfddi.supabase.co';
  const SUPABASE_ANON =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc3d1dGNwc2dkZ21tam5mZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzY3NDUsImV4cCI6MjA4MzE1Mjc0NX0.fd_OLVMTOMqN1EF-Ca1EV0MeclzM24kY0rOFDihvzd8';
  const TENANT_SLUG = 'livvv';

  const isVideoUrl = (url) => /\.(mp4|webm|mov)(\?|$)/i.test(url || '');

  function getCoverUrl(item) {
    const cover = item.media && item.media.find((m) => m.is_cover);
    if (cover && cover.url) return cover.url;
    if (item.image) return item.image;
    const first = item.media && item.media[0];
    return (first && first.url) || null;
  }

  function norm(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  async function fetchItems() {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_featured_portfolio_items`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_tenant_slug: TENANT_SLUG }),
    });
    if (!res.ok) return [];
    return res.json();
  }

  function findItem(items, card) {
    const slug = card.getAttribute('data-portfolio-slug');
    if (slug) {
      const bySlug = items.find((i) => norm(i.slug) === norm(slug));
      if (bySlug) return bySlug;
    }
    const titleEl = card.querySelector('.port-title');
    if (!titleEl) return null;
    const titleText = (titleEl.firstChild && titleEl.firstChild.textContent) || titleEl.textContent || '';
    const t = norm(titleText);
    if (!t) return null;
    return (
      items.find((i) => {
        const n = norm(i.title);
        return n === t || n.includes(t) || t.includes(n);
      }) || null
    );
  }

  function renderCover(card, item) {
    const visual = card.querySelector('.port-visual');
    if (!visual) return;
    const coverUrl = getCoverUrl(item);
    if (!coverUrl) return;
    visual.innerHTML = '';
    if (isVideoUrl(coverUrl)) {
      const v = document.createElement('video');
      v.src = coverUrl;
      v.muted = true;
      v.loop = true;
      v.autoplay = true;
      v.preload = 'auto';
      v.setAttribute('playsinline', '');
      v.setAttribute('muted', '');
      if (item.thumbnail) v.poster = item.thumbnail;
      else if (item.image) v.poster = item.image;
      v.className = 'bg-img';
      v.style.width = '100%';
      v.style.height = '100%';
      v.style.objectFit = 'cover';
      visual.appendChild(v);
      const tryPlay = () => v.play().catch(() => {});
      if (v.readyState >= 2) tryPlay();
      else v.addEventListener('loadeddata', tryPlay, { once: true });
    } else {
      const img = document.createElement('img');
      img.src = coverUrl;
      img.alt = item.title || '';
      img.loading = 'lazy';
      img.className = 'bg-img';
      visual.appendChild(img);
    }
  }

  async function init() {
    const cards = document.querySelectorAll('.port-card');
    if (!cards.length) return;
    let items;
    try {
      items = await fetchItems();
    } catch (_e) {
      return;
    }
    if (!Array.isArray(items) || !items.length) return;
    cards.forEach((card) => {
      const item = findItem(items, card);
      if (item) renderCover(card, item);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
