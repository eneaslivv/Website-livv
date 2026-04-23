/* ============================================================
   LIVV · Tracking init for static landing pages
   Mirrors app/layout.tsx for the /for-* landings that don't go
   through the Next.js root layout.

   Loads (in this order):
     1. Consent Mode v2 defaults (everything denied until granted)
     2. GTM (GTM-NC96QG65)
     3. Google Ads Global Site Tag (AW-18096615687, Enhanced Conversions)
     4. Meta Pixel (1495620938814274) with consent revoke before init
     5. First/last-touch attribution capture (90-day cookie)

   Include this as the FIRST script in <head> of each landing:
     <script src="/lp/tracking-init.js"></script>
   ============================================================ */
(function () {
  if (typeof window === 'undefined') return;
  if (window.__livvTrackingInit) return;
  window.__livvTrackingInit = true;

  var GTM_ID = 'GTM-NC96QG65';
  var GOOGLE_ADS_ID = 'AW-18096615687';
  var META_PIXEL_ID = '1495620938814274';

  /* ---- Consent Mode v2 defaults (must run before any tracking) ---- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    personalization_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 2000,
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

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

  /* ---- Google Ads Global Site Tag ---- */
  var adsTag = document.createElement('script');
  adsTag.async = true;
  adsTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID;
  document.head.appendChild(adsTag);
  gtag('js', new Date());
  gtag('config', GOOGLE_ADS_ID, { allow_enhanced_conversions: true });

  /* ---- Meta Pixel (consent revoked before init; CAPI fires server-side) ---- */
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
  window.fbq('consent', 'revoke');
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');

  /* ---- GTM noscript fallback (append when body is ready) ---- */
  function insertGtmNoscript() {
    if (!document.body) return;
    var ns = document.createElement('noscript');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + GTM_ID;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.cssText = 'display:none;visibility:hidden';
    ns.appendChild(iframe);
    document.body.appendChild(ns);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertGtmNoscript);
  } else {
    insertGtmNoscript();
  }

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

  function hasCookie(name) {
    return document.cookie.split('; ').some(function (c) { return c.indexOf(name + '=') === 0; });
  }
})();
