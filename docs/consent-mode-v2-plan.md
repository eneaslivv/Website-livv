# Consent Mode v2 — Plan & Recommendation

**Status:** Recommended, **not yet fully implemented**.

## Why this matters

- Mandatory for advertisers serving traffic to the EEA / UK / Switzerland since
  March 2024. Without it, Google Ads remarketing audiences and conversion
  attribution from EU traffic are degraded or zeroed out.
- Recommended (not strictly required) for non-EU traffic — improves modeled
  conversions and keeps analytics consistent.
- livvvv.com receives traffic from Argentina (primary), the US, and Spain. The
  Spain segment alone is enough reason to implement.

## Current state

The site already has the **technical scaffolding** in place but the UX flow is
not finalized:

| Piece | File | State |
|---|---|---|
| `gtag('consent', 'default', { ... })` set to all-denied **before** GTM loads | [app/layout.tsx](../app/layout.tsx) lines 122-143 | ✅ Done — strategy: `beforeInteractive` |
| Same default in static landing pages | [public/lp/tracking-init.js](../public/lp/tracking-init.js) lines 25-40 | ✅ Done |
| Helper to update consent (`gtag('consent','update', ...)` via dataLayer) | [lib/consent.ts](../lib/consent.ts) | ✅ Done — uses dataLayer pattern (GTM-friendly) |
| Cookie banner UI calling `acceptAll()` / `rejectAll()` | `components/analytics/CookieBanner.tsx` | ⚠️ Verify the banner is shown to all visitors and that the choice is persisted |
| Meta Pixel `consent` revoke / grant | [lib/consent.ts](../lib/consent.ts) lines 39-51 | ✅ Done |
| `ads_data_redaction` / `url_passthrough` | both layout + tracking-init | ✅ Done |

## What's left

1. **Verify the CookieBanner UX** ([components/analytics/CookieBanner.tsx](../components/analytics/CookieBanner.tsx)):
   - Shown on first visit until the user makes a choice.
   - Choice persisted in `localStorage` (`livv_consent_v1` — already wired).
   - Buttons: "Accept all", "Reject all", "Customize" (granular per category).
   - Customize sub-screen with two toggles: **Analytics** and **Marketing**.
   - "Settings" link in the footer to re-open the banner so users can change
     their mind (legally required in EU).

2. **Geo-gate the banner (optional, recommended):**
   - Show the banner only to EU/UK/CH traffic, or show a lighter version
     elsewhere. Use Vercel's `request.geo.country` in middleware.
   - Saves UX friction for LATAM / US visitors who don't legally need it.

3. **Configure GTM to honor the consent signals:**
   - In GTM → Tag → Advanced → Consent Settings, mark each tag with the
     consent types it requires:
     - GA4 config + events → `analytics_storage`
     - Google Ads conversion + remarketing → `ad_storage` + `ad_user_data` +
       `ad_personalization`
     - Meta Pixel → marketing
   - Without this step, tags will fire even when consent is denied.

4. **Test with the GTM debug mode + Tag Assistant:**
   - Visit livvvv.com from a fresh browser. Confirm tags **don't fire** until
     "Accept" is clicked.
   - After accept, confirm GA4 + Ads + Pixel start firing in real-time.

## Implementation cost estimate

- CookieBanner UX polish: ~2 h
- Geo-gating in middleware: ~1 h
- GTM consent settings on each tag: ~30 min in the GTM console (no code)
- Testing: ~1 h

**Total ≈ half a day.** Whoever does it (me, or you with the GTM admin)
should pair on the GTM step since it's not visible from the codebase.

## Why this is *not* implemented automatically

- The cookie banner is a UX decision (placement, copy, geo-gating) that needs
  product input.
- The GTM consent settings live outside the repo — they're toggles inside the
  GTM console, set once per tag.

When you want to push this forward, ping me with the chosen UX and I'll wire
the missing pieces (and walk through the GTM checklist).
