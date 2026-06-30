/* ============================================================
   LIVV · Landing portfolio covers
   Mirrors home behavior: fetches featured items from Supabase and
   replaces static placeholders with real covers (video or image).
   Cover-resolution logic must stay in lockstep with
   `pickDisplayCover` in lib/default-project-blocks.ts so listings
   on /for-* landings, on /work, and on the project detail page
   never diverge.
   ============================================================ */
(function () {
  const SUPABASE_URL = 'https://ngswutcpsgdgmmjnfddi.supabase.co';
  const SUPABASE_ANON =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc3d1dGNwc2dkZ21tam5mZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzY3NDUsImV4cCI6MjA4MzE1Mjc0NX0.fd_OLVMTOMqN1EF-Ca1EV0MeclzM24kY0rOFDihvzd8';
  const TENANT_SLUG = 'livvv';

  const isVideoUrl = (url) => /\.(mp4|webm|mov)(\?|$)/i.test(url || '');

  // Some legacy CMS rows still reference Vercel preview URLs from before
  // livvvv.com became the canonical domain. Rewriting them to a relative
  // path keeps the image stable even if the preview deploy disappears,
  // and lets the browser cache it under the canonical host.
  function normalizeUrl(url) {
    if (!url) return url;
    return url.replace(
      /^https?:\/\/heade-livv-page(?:-[a-z0-9-]+)?\.vercel\.app/i,
      '',
    );
  }

  // Visitor-facing cover priority — keeps these landings in sync with
  // /work and /projects/[slug]. If the author wrote a `hero_image` block
  // in content_blocks, that wins (same image the project detail page
  // paints as hero). Otherwise fall back to media[is_cover] → image →
  // media[0] → thumbnail.
  function getCoverUrl(item) {
    const blocks = (item && item.content_blocks) || [];
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b && b.type === 'hero_image' && b.image_url) return normalizeUrl(b.image_url);
    }
    const cover = item.media && item.media.find((m) => m.is_cover);
    if (cover && cover.url) return normalizeUrl(cover.url);
    if (item.image) return normalizeUrl(item.image);
    const first = item.media && item.media[0];
    if (first && first.url) return normalizeUrl(first.url);
    return normalizeUrl(item.thumbnail) || null;
  }

  function norm(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  async function fetchItems() {
    // NOTE: we call the PUBLIC RPC (returns every published item) instead of
    // the FEATURED one. Reason: the landings hardcode cards for projects that
    // aren't necessarily flagged `featured = true` in the CMS (e.g.
    // "SEO Blocks Generator", "Paper", "Internal Management Systems").
    // Using the featured RPC meant those cards never got matched and the
    // script silently no-op'd, leaving stale hardcoded images on /for-*.
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_portfolio_items`, {
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

  // Build the swap target. Landings ship three different markups today:
  //   1. ecommerce/startups: <.port-card> <.port-visual> <img.bg-img>
  //   2. saas:                <.port-card> <img.bg-img>           (no wrapper)
  //   3. agencies:            <.port-card> <img.port-img>         (different class)
  // Rather than force every landing to migrate at once, this resolver finds an
  // existing .port-visual or synthesizes one in place of the orphan <img>, so
  // the script can swap to either a <video> or <img> uniformly.
  function ensureVisual(card) {
    const existing = card.querySelector('.port-visual');
    if (existing) return existing;
    const orphan = card.querySelector('img.bg-img, img.port-img');
    if (!orphan) return null;
    const wrap = document.createElement('div');
    wrap.className = 'port-visual';
    // Inline the same positioning/clipping the working landings ship in CSS,
    // so the synthesized wrapper renders correctly even on files that never
    // defined .port-visual styles.
    wrap.style.position = 'absolute';
    wrap.style.inset = '0';
    wrap.style.overflow = 'hidden';
    orphan.parentNode.insertBefore(wrap, orphan);
    // Reset stale inline sizing from the orphan and re-apply a clean fill.
    orphan.removeAttribute('style');
    orphan.style.width = '100%';
    orphan.style.height = '100%';
    orphan.style.objectFit = 'cover';
    if (!orphan.classList.contains('bg-img')) orphan.classList.add('bg-img');
    wrap.appendChild(orphan);
    return wrap;
  }

  function renderCover(card, item) {
    const visual = ensureVisual(card);
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
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
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
