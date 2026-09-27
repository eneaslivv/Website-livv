/* ============================================================
   LIVV · Tracking init for static landing pages
   Mirrors app/layout.tsx for the /for-* landings that don't go
   through the Next.js root layout.

   Loads (in this order):
     1. Consent: Consent Mode v2 defaults, then the answer the visitor
        already gave in the cookie banner (same rule as app/layout.tsx)
     2. GTM (GTM-NC96QG65) — single source of truth, all downstream
        tags (GA4, Google Ads, TikTok, etc.) are configured INSIDE GTM.
     3. Meta Pixel, in the consent state resolved in step 1
     4. First/last-touch attribution capture (90-day cookie)
     5. The cookie banner, for visitors who haven't answered it yet
        (a copy of components/analytics/CookieBanner.tsx)

   Include this as the FIRST script in <head> of each landing:
     <script src="/lp/tracking-init.js"></script>
   ============================================================ */
(function () {
  if (typeof window === 'undefined') return;
  if (window.__livvTrackingInit) return;
  window.__livvTrackingInit = true;

  // IDs are hardcoded here (static .html pages can't read Next.js env vars).
  // Keep them equal to GTM_ID and META_PIXEL_ID in app/layout.tsx.
  var GTM_ID = 'GTM-NC96QG65';
  var META_PIXEL_ID = '1797006294606049';
  // Same key and shape as lib/consent.ts, so an answer given on any page of
  // livvvv.com holds on the landings and the other way around.
  var CONSENT_KEY = 'livv_consent_v1';

  /* ---- Consent (must run before any tracking) ----
     One rule for every vendor, same as app/layout.tsx: the cookie banner
     answer wins; without one, deny in the regulated regions (EEA + UK + CH +
     EFTA) and grant everywhere else. This file can't import the TS helpers
     because it loads from static /public LPs. */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    region: ['AT','BE','BG','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK','GB','CH','IS','LI','NO'],
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    personalization_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 2000,
  });
  gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
    personalization_storage: 'granted',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  var stored = readConsent();
  if (stored) pushGtagConsent(stored);
  // Google knows the region from the IP; Meta doesn't, so its default comes
  // from the time zone.
  var marketingConsent = stored ? stored.marketing : (isRegulatedTimeZone() ? 'denied' : 'granted');

  /* ---- GTM ---- */
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0];
    var j = d.createElement(s);
    var dl = l !== 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', GTM_ID);

  /* ---- Meta Pixel (CAPI fires server-side from the lead-ingest function) ---- */
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('consent', marketingConsent === 'granted' ? 'grant' : 'revoke');
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');

  /* ---- GTM noscript fallback (append when body is ready) ---- */
  function insertGtmNoscript() {
    var ns = document.createElement('noscript');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + GTM_ID;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.cssText = 'display:none;visibility:hidden';
    ns.appendChild(iframe);
    document.body.appendChild(ns);
  }
  onBodyReady(insertGtmNoscript);

  /* ---- First/last-touch attribution capture ---- */
  try {
    var params = new URLSearchParams(window.location.search);
    var keys = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid', 'li_fat_id',
    ];
    var picked = {};
    keys.forEach(function (k) {
      var v = params.get(k);
      if (v) picked[k] = v;
    });
    if (Object.keys(picked).length || !hasCookie('livv_first_touch')) {
      picked.landing = window.location.pathname + window.location.search;
      picked.referrer = document.referrer || '';
      picked.captured_at = new Date().toISOString();

      var ninetyDays = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString();
      if (!hasCookie('livv_first_touch')) {
        document.cookie = 'livv_first_touch=' + encodeURIComponent(JSON.stringify(picked))
          + '; expires=' + ninetyDays + '; path=/; SameSite=Lax';
      }
      document.cookie = 'livv_last_touch=' + encodeURIComponent(JSON.stringify(picked))
        + '; expires=' + ninetyDays + '; path=/; SameSite=Lax';
    }
  } catch (e) {}

  /* ---- Cookie banner ---- */
  if (!stored) onBodyReady(renderCookieBanner);

  function hasCookie(name) {
    return document.cookie.split('; ').some(function (c) { return c.indexOf(name + '=') === 0; });
  }

  function onBodyReady(fn) {
    if (document.body) fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function readConsent() {
    try {
      var parsed = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null');
      if (parsed && parsed.analytics && parsed.marketing) return parsed;
    } catch (e) {}
    return null;
  }

  function pushGtagConsent(record) {
    gtag('consent', 'update', {
      ad_storage: record.marketing,
      ad_user_data: record.marketing,
      ad_personalization: record.marketing,
      analytics_storage: record.analytics,
      personalization_storage: record.marketing,
    });
  }

  // European zones (plus Cyprus, the EU islands in the Atlantic and
  // Svalbard) and an unknown or UTC zone count as regulated: when in doubt,
  // deny. Same test as app/layout.tsx.
  function isRegulatedTimeZone() {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    return !tz || tz === 'UTC' || /^(Europe|Etc)\//.test(tz) ||
      /^(Asia\/(Nicosia|Famagusta)|Atlantic\/(Azores|Canary|Faroe|Madeira|Reykjavik)|Arctic\/Longyearbyen)$/.test(tz);
  }

  // Mirrors writeConsent() in lib/consent.ts, including the consent_update
  // event GTM uses to fire tags on the page where the visitor said yes.
  function answerConsent(value) {
    var record = { analytics: value, marketing: value, updated_at: new Date().toISOString() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(record)); } catch (e) {}
    pushGtagConsent(record);
    if (typeof window.fbq === 'function') window.fbq('consent', value === 'granted' ? 'grant' : 'revoke');
    window.dataLayer.push({
      event: 'consent_update',
      analytics_consent: record.analytics,
      marketing_consent: record.marketing,
    });
  }

  // Same copy, layout and breakpoint (640px) as CookieBanner.tsx.
  function renderCookieBanner() {
    if (document.querySelector('[data-cookie-banner]')) return;

    var style = document.createElement('style');
    style.textContent =
      '.livv-cb{position:fixed;bottom:12px;left:12px;right:12px;z-index:100;box-sizing:border-box;padding:12px;border-radius:12px;background:rgba(0,0,0,.95);-webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.1);color:#fff;box-shadow:0 25px 50px -12px rgba(0,0,0,.25);font-family:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;font-weight:400;line-height:1.5;letter-spacing:normal;text-align:left}' +
      '.livv-cb *{box-sizing:border-box;margin:0}' +
      '.livv-cb-row{display:flex;align-items:flex-start;gap:12px}' +
      '.livv-cb-text{flex:1;min-width:0}' +
      '.livv-cb-kicker{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:2px}' +
      '.livv-cb-msg{font-size:11px;line-height:1.375;color:rgba(255,255,255,.75)}' +
      '.livv-cb-toggle{flex-shrink:0;padding:0 4px;background:none;border:0;cursor:pointer;font:inherit;font-size:16px;line-height:1;color:rgba(255,255,255,.35);transition:color .15s}' +
      '.livv-cb-toggle:hover{color:rgba(255,255,255,.7)}' +
      '.livv-cb-toggle-desktop{display:none}' +
      '.livv-cb-details{list-style:none;margin:8px 0 10px;padding:0 0 0 8px;border-left:1px solid rgba(255,255,255,.1);font-size:10px;color:rgba(255,255,255,.55)}' +
      '.livv-cb-details li+li{margin-top:4px}' +
      '.livv-cb-details span{color:rgba(255,255,255,.9)}' +
      '.livv-cb-actions{display:flex;align-items:center;gap:6px;margin-top:8px}' +
      '.livv-cb-btn{padding:6px 12px;border-radius:999px;cursor:pointer;font:inherit;font-size:10px;font-weight:500;line-height:1.5;text-transform:uppercase;letter-spacing:.05em;transition:background-color .15s,color .15s}' +
      '.livv-cb-accept{flex:1;background:#fff;color:#000;border:0}' +
      '.livv-cb-accept:hover{background:#C4A35A}' +
      '.livv-cb-reject{background:none;color:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.1)}' +
      '.livv-cb-reject:hover{color:#fff}' +
      '@media (min-width:640px){' +
        '.livv-cb{bottom:20px;left:20px;right:auto;max-width:280px}' +
        '.livv-cb-row{display:block}' +
        '.livv-cb-kicker{font-size:10px;margin-bottom:4px}' +
        '.livv-cb-msg{font-size:12px;margin-bottom:10px}' +
        '.livv-cb-toggle-mobile{display:none}' +
        '.livv-cb-toggle-desktop{display:inline}' +
        '.livv-cb-actions{margin-top:0}' +
      '}';
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.className = 'livv-cb';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.setAttribute('data-cookie-banner', '');
    banner.innerHTML =
      '<div class="livv-cb-row">' +
        '<div class="livv-cb-text">' +
          '<p class="livv-cb-kicker">Cookies</p>' +
          '<p class="livv-cb-msg">Usamos cookies para medir tr\u00e1fico y mejorar el sitio.</p>' +
        '</div>' +
        '<button type="button" class="livv-cb-toggle livv-cb-toggle-mobile" aria-label="Ver detalles">+</button>' +
      '</div>' +
      '<ul class="livv-cb-details" hidden>' +
        '<li><span>Esenciales</span> \u2014 siempre activas.</li>' +
        '<li><span>Anal\u00edtica</span> \u2014 Google Analytics y Microsoft Clarity.</li>' +
        '<li><span>Marketing</span> \u2014 Google Ads, Meta y TikTok.</li>' +
      '</ul>' +
      '<div class="livv-cb-actions">' +
        '<button type="button" class="livv-cb-btn livv-cb-accept">Aceptar</button>' +
        '<button type="button" class="livv-cb-btn livv-cb-reject">Rechazar</button>' +
        '<button type="button" class="livv-cb-toggle livv-cb-toggle-desktop" aria-label="Ver detalles">+</button>' +
      '</div>';

    var details = banner.querySelector('.livv-cb-details');
    var toggles = banner.querySelectorAll('.livv-cb-toggle');
    function toggleDetails() {
      details.hidden = !details.hidden;
      for (var i = 0; i < toggles.length; i++) {
        toggles[i].textContent = details.hidden ? '+' : '\u2212';
        toggles[i].setAttribute('aria-label', details.hidden ? 'Ver detalles' : 'Ocultar detalles');
      }
    }
    for (var i = 0; i < toggles.length; i++) toggles[i].addEventListener('click', toggleDetails);
    function answer(value) {
      answerConsent(value);
      banner.remove();
    }
    banner.querySelector('.livv-cb-accept').addEventListener('click', function () { answer('granted'); });
    banner.querySelector('.livv-cb-reject').addEventListener('click', function () { answer('denied'); });

    document.body.appendChild(banner);
  }
})();
