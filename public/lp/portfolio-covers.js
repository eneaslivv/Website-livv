/* ============================================================
   LIVV · Landing portfolio covers
   Mirrors home behavior: fetches featured items from Supabase and
   replaces static placeholders with real covers (video or image).
   Cover-resolution logic must stay in lockstep with
   `pickDisplayCover` in lib/default-project-blocks.ts so listings
   on /for-* landings, on /work, and on the project detail page
   never diverge.
   Video covers paint a static poster and only fetch the clip once
   the card is on screen or hovered (see watchVideo).
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
  // media[0] → thumbnail. PR Tool is pinned before all of that, as in
  // pickDisplayCover.
  function getCoverUrl(item) {
    // Approved portfolio artwork; the editorial dashboard remains inside the case study.
    if (item.slug === 'pr-tool') return '/images/pr-tool.png';
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

  // First frames of CMS video covers, committed under /public and keyed by
  // the video's filename. The home keeps its own list in VIDEO_COVER_FRAMES
  // (lib/default-project-blocks.ts).
  const VIDEO_COVER_FRAMES = {
    '1773862659218': '/images/portfolio-posters/1773862659218.jpg',
    '1773673216180': '/images/portfolio-posters/1773673216180.jpg',
    '1773422491174': '/images/portfolio-posters/1773422491174.jpg',
  };

  // Still image a video cover shows until the clip is wanted. The video's
  // own first frame wins: it is ~50 KB and playback starts without a jump.
  // CMS media and item.image are skipped on purpose — they are uploaded
  // originals (Azqira's is a 5 MB JPG, twice its video) and a poster is
  // fetched on load, not lazily. Last resort: the card's own placeholder.
  function getPosterUrl(item, videoUrl, placeholder) {
    const id = videoUrl.split('?')[0].split('/').pop().replace(/\.[a-z0-9]+$/i, '');
    if (VIDEO_COVER_FRAMES[id]) return VIDEO_COVER_FRAMES[id];
    const thumb = normalizeUrl(item.thumbnail);
    if (thumb && !isVideoUrl(thumb)) return thumb;
    return placeholder || '/assets/logo-bg-1.jpg';
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

  // A video cover plays only while its card is on screen or under the
  // mouse, and never under prefers-reduced-motion (the poster stays). The
  // clip gets its src the first time it is wanted: with autoplay +
  // preload="auto" every visit used to download the full clips on load
  // (36 MB for Sacoa) with the cards still far below the fold.
  const IN_VIEW_RATIO = 0.25;
  const reducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;
  const watched = [];
  let observer = null;

  function syncVideo(entry) {
    const v = entry.video;
    const motionOk = !(reducedMotion && reducedMotion.matches);
    if (motionOk && (entry.inView || entry.hovered)) {
      if (!v.getAttribute('src')) v.src = v.dataset.src;
      v.play().catch(() => {});
    } else if (!v.paused) {
      v.pause();
    }
  }

  function watchVideo(card, video) {
    const entry = { card, video, inView: false, hovered: false };
    watched.push(entry);
    // Mouse only: a tap fires enter without a matching leave, which would
    // keep the clip playing after the card scrolls away.
    const onHover = (hovered) => (e) => {
      if (e.pointerType !== 'mouse') return;
      entry.hovered = hovered;
      syncVideo(entry);
    };
    card.addEventListener('pointerenter', onHover(true));
    card.addEventListener('pointerleave', onHover(false));
    if (!('IntersectionObserver' in window)) return;
    if (!observer) {
      observer = new IntersectionObserver((records) => {
        records.forEach((r) => {
          const e = watched.find((w) => w.card === r.target);
          if (!e) return;
          e.inView = r.isIntersecting && r.intersectionRatio >= IN_VIEW_RATIO;
          syncVideo(e);
        });
      }, { threshold: IN_VIEW_RATIO });
    }
    observer.observe(card);
  }

  if (reducedMotion) {
    const onMotionChange = () => watched.forEach(syncVideo);
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', onMotionChange);
    else if (reducedMotion.addListener) reducedMotion.addListener(onMotionChange);
  }

  function renderCover(card, item) {
    const visual = ensureVisual(card);
    if (!visual) return;
    const coverUrl = getCoverUrl(item);
    if (!coverUrl) return;
    const placeholder = visual.querySelector('img');
    const placeholderUrl = placeholder && placeholder.getAttribute('src');
    visual.innerHTML = '';
    if (isVideoUrl(coverUrl)) {
      const v = document.createElement('video');
      v.dataset.src = coverUrl;
      v.preload = 'none';
      v.poster = getPosterUrl(item, coverUrl, placeholderUrl);
      v.muted = true;
      v.loop = true;
      v.setAttribute('playsinline', '');
      v.setAttribute('muted', '');
      v.className = 'bg-img';
      v.style.width = '100%';
      v.style.height = '100%';
      v.style.objectFit = 'cover';
      visual.appendChild(v);
      watchVideo(card, v);
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
