/* ============================================================
   LIVV · Lead ingest for static landing page forms
   Mirrors lib/lead-ingest.ts (the React side) for ad-conversion parity.

   Usage: <form onsubmit="handleSubmit(event, 'Agencies Landing', 'agencies-lp')">

   On submit, fires:
   - POST to Supabase lead-ingest edge function (CRM + Meta CAPI)
   - dataLayer 'lead_form_submit' with full attribution + hashed PII
   - dataLayer 'generate_lead' (GA4 standard)
   - gtag 'set' user_data (Enhanced Conversions)
   - fbq('track','Lead', ..., {eventID}) for CAPI dedup
   ============================================================ */
(function () {
  var LEAD_INGEST_URL = 'https://ngswutcpsgdgmmjnfddi.supabase.co/functions/v1/lead-ingest';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc3d1dGNwc2dkZ21tam5mZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzY3NDUsImV4cCI6MjA4MzE1Mjc0NX0.fd_OLVMTOMqN1EF-Ca1EV0MeclzM24kY0rOFDihvzd8';
  var TENANT_SLUG = 'livvv';

  var LEAD_CURRENCY = 'EUR';
  var LEAD_VALUE_BY_CATEGORY = {
    contact: 500, quote: 800, partner: 1000, lead: 400, newsletter: 50,
  };

  /* ---- Utilities ---- */
  function getCookie(name) {
    if (typeof document === 'undefined') return '';
    var m = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[2]) : '';
  }

  function parseJSONCookie(name) {
    var raw = getCookie(name);
    if (!raw) return {};
    try { return JSON.parse(raw); } catch (e) { return {}; }
  }

  function uuid() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
  }

  async function sha256Hex(input) {
    if (typeof crypto === 'undefined' || !crypto.subtle) return undefined;
    try {
      var data = new TextEncoder().encode(String(input).trim().toLowerCase());
      var buf = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(buf))
        .map(function (b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    } catch (e) {
      return undefined;
    }
  }

  function normalizePhone(phone) {
    if (!phone) return undefined;
    var digits = String(phone).replace(/\D/g, '');
    return digits ? '+' + digits : undefined;
  }

  function getLeadValue(category) {
    if (!category) return LEAD_VALUE_BY_CATEGORY.lead;
    return LEAD_VALUE_BY_CATEGORY[category] || LEAD_VALUE_BY_CATEGORY.lead;
  }

  /* ---- Attribution: merge URL params + first/last-touch cookies ---- */
  function getAttribution() {
    var urlParams = new URLSearchParams(window.location.search);
    var urlPick = {};
    var keys = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid', 'li_fat_id',
    ];
    keys.forEach(function (k) {
      var v = urlParams.get(k);
      if (v) urlPick[k] = v;
    });

    var firstTouch = parseJSONCookie('livv_first_touch');
    var lastTouch = parseJSONCookie('livv_last_touch');

    return {
      // last-touch (current session takes precedence, else cookie)
      utm_source: urlPick.utm_source || lastTouch.utm_source,
      utm_medium: urlPick.utm_medium || lastTouch.utm_medium,
      utm_campaign: urlPick.utm_campaign || lastTouch.utm_campaign,
      utm_term: urlPick.utm_term || lastTouch.utm_term,
      utm_content: urlPick.utm_content || lastTouch.utm_content,
      gclid: urlPick.gclid || lastTouch.gclid,
      gbraid: urlPick.gbraid || lastTouch.gbraid,
      wbraid: urlPick.wbraid || lastTouch.wbraid,
      fbclid: urlPick.fbclid || lastTouch.fbclid,
      msclkid: urlPick.msclkid || lastTouch.msclkid,
      ttclid: urlPick.ttclid || lastTouch.ttclid,
      li_fat_id: urlPick.li_fat_id || lastTouch.li_fat_id,

      // first-touch
      first_utm_source: firstTouch.utm_source,
      first_utm_medium: firstTouch.utm_medium,
      first_utm_campaign: firstTouch.utm_campaign,
      first_gclid: firstTouch.gclid,
      first_fbclid: firstTouch.fbclid,
      first_landing_page: firstTouch.landing,
      first_referrer: firstTouch.referrer,

      // last-touch landing/referrer
      last_landing_page: lastTouch.landing || (window.location.pathname + window.location.search),
      last_referrer: lastTouch.referrer || document.referrer || '',
    };
  }

  /* ---- Fire client-side conversion events ---- */
  async function trackLeadConversion(payload, attribution, eventId) {
    var w = window;
    var normalizedEmail = String(payload.email || '').trim().toLowerCase();
    var normalizedPhone = normalizePhone(payload.phone);

    var results = await Promise.all([
      sha256Hex(normalizedEmail),
      normalizedPhone ? sha256Hex(normalizedPhone) : Promise.resolve(undefined),
    ]);
    var emailHash = results[0];
    var phoneHash = results[1];

    var category = payload.category || 'lead';
    var value = getLeadValue(category);
    var effectiveGclid = attribution.gclid || attribution.first_gclid;
    var effectiveFbclid = attribution.fbclid || attribution.first_fbclid;

    w.dataLayer = w.dataLayer || [];

    w.dataLayer.push({
      event: 'lead_form_submit',
      event_id: eventId,
      lead_origin: payload.origin,
      lead_category: category,
      lead_source: payload.source || 'landing-page',
      lead_email: normalizedEmail,
      lead_email_hash: emailHash,
      lead_phone_hash: phoneHash,
      lead_name: payload.name,
      lead_company: payload.company,
      lead_project_type: payload.project_type,
      value: value,
      currency: LEAD_CURRENCY,
      gclid: effectiveGclid,
      gbraid: attribution.gbraid,
      wbraid: attribution.wbraid,
      fbclid: effectiveFbclid,
      msclkid: attribution.msclkid,
      ttclid: attribution.ttclid,
      li_fat_id: attribution.li_fat_id,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_term: attribution.utm_term,
      utm_content: attribution.utm_content,
      first_utm_source: attribution.first_utm_source,
      first_utm_medium: attribution.first_utm_medium,
      first_utm_campaign: attribution.first_utm_campaign,
      first_landing_page: attribution.first_landing_page,
      first_referrer: attribution.first_referrer,
    });

    w.dataLayer.push({
      event: 'generate_lead',
      event_id: eventId,
      currency: LEAD_CURRENCY,
      value: value,
      lead_category: category,
      lead_origin: payload.origin,
    });

    if (typeof w.gtag === 'function') {
      // Enhanced Conversions user data (hashed by Google automatically when sent via gtag)
      w.gtag('set', 'user_data', {
        email: normalizedEmail,
        phone_number: normalizedPhone,
      });
    }

    if (typeof w.fbq === 'function') {
      w.fbq('track', 'Lead', {
        content_name: payload.origin,
        content_category: category,
        currency: LEAD_CURRENCY,
        value: value,
      }, { eventID: eventId });
    }
  }

  /* ---- POST to Supabase edge function ---- */
  async function submitLead(payload, attribution, eventId) {
    var fbp = getCookie('_fbp');
    var fbc = getCookie('_fbc');

    var body = {
      tenant_slug: TENANT_SLUG,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      message: payload.message,
      project_type: payload.project_type,
      category: payload.category,
      source: payload.source,
      origin: payload.origin,

      event_id: eventId,
      utm_source: attribution.utm_source,
      utm_medium: attribution.utm_medium,
      utm_campaign: attribution.utm_campaign,
      utm_term: attribution.utm_term,
      utm_content: attribution.utm_content,
      gclid: attribution.gclid || attribution.first_gclid,
      fbclid: attribution.fbclid || attribution.first_fbclid,
      msclkid: attribution.msclkid,
      fbp: fbp || undefined,
      fbc: fbc || undefined,
      first_landing_page: attribution.first_landing_page,
      first_referrer: attribution.first_referrer,
      last_landing_page: attribution.last_landing_page,
      attribution: attribution,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    };

    var res = await fetch(LEAD_INGEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      var t = await res.text();
      throw new Error(t || 'Lead ingest failed (' + res.status + ')');
    }
  }

  /**
   * Generic form submit handler for landing pages.
   * Collects every [name] field in the form into the payload, maps commonly
   * aliased fields (agency/brand/startup → company), then POSTs to lead-ingest
   * and fires client-side conversion tracking.
   */
  window.handleSubmit = async function (e, origin, source) {
    e.preventDefault();
    var form = e.target;
    var btn = form.querySelector('.form-submit') || form.querySelector('button[type="submit"]');
    if (btn) { btn.innerHTML = 'Sending…'; btn.disabled = true; btn.style.opacity = '.7'; }

    var data = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      var v = el.value;
      if (typeof v === 'string') v = v.trim();
      if (v) data[el.name] = v;
    });

    var company = data.company || data.agency || data.brand || data.startup || data.store || '';
    var messageParts = [
      data.message,
      data.brief,
      data.scope,
      data.bottleneck,
      data.services,
      data.stage,
      data.size ? 'Team size: ' + data.size : '',
      data.revenue,
      data.platform,
      (data.url || data.website) ? 'Website: ' + (data.url || data.website) : '',
    ].filter(Boolean);
    var message = messageParts.join('\n').trim();

    var payload = {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || undefined,
      company: company || undefined,
      message: message || undefined,
      project_type: data.scope || data.bottleneck || data.services || undefined,
      category: 'lead',
      source: source || 'landing-page',
      origin: origin || document.title,
    };

    var attribution = getAttribution();
    var eventId = uuid();

    try {
      await submitLead(payload, attribution, eventId);
      try { await trackLeadConversion(payload, attribution, eventId); } catch (_) {}
      if (btn) {
        btn.innerHTML = "✓ Thanks — we'll reply within 2h";
        btn.style.background = '#769268';
        btn.style.opacity = '1';
      }
      form.reset();
    } catch (err) {
      if (btn) {
        btn.innerHTML = "✗ Try again";
        btn.style.background = '#2C0405';
        btn.style.opacity = '1';
        btn.disabled = false;
      }
      console.error('Lead submit failed:', err);
    }
  };
})();
