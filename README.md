# Livv Studio — livvvv.com

Boutique design & engineering studio website. Next.js 15 (App Router) +
React 19 + Tailwind v4, deployed on Vercel.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev                  # http://localhost:3000
```

## Environment variables

See [.env.example](.env.example). Production values live in the Vercel
project settings.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Transactional email sender |
| `CONTACT_EMAIL` | Inbox that receives lead-form notifications |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (defaults to `GTM-NC96QG65`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (used by the portal/admin) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

## Analytics & Tracking

> **TL;DR — vendor tags go in GTM. The one exception is the Meta Pixel.**
> Do not add `gtag.js`, Microsoft Clarity, TikTok, GA4 measurement IDs, or any
> other vendor SDK directly to the codebase. Configure them inside GTM.
> The Meta Pixel is loaded from code (see [Meta Pixel](#meta-pixel)); don't
> add a second one in GTM.

### Architecture

```
┌──────────────────────────────────────────────────┐
│                  livvvv.com                      │
│                                                  │
│  app/layout.tsx ──► 1. consent (default + the    │
│       │               banner answer, if any)     │
│       │            2. GTM-NC96QG65               │
│       │            3. Meta Pixel 1797006294606049│
│       ▼                                          │
│  lib/analytics.ts ──► dataLayer.push({ event })  │
│       │                                          │
│       ▼                                          │
│  window.dataLayer  ──────────────────────┐       │
└──────────────────────────────────────────┼───────┘
                                           │
                                           ▼
                              ┌──────────────────────────┐
                              │ Google Tag Manager        │
                              │  GTM-NC96QG65             │
                              │   ├─► GA4 (G-N2BMLKVJJJ)  │
                              │   ├─► Google Ads          │
                              │   │   (AW-18096615687)    │
                              │   ├─► Microsoft Clarity   │
                              │   └─► TikTok (to add)     │
                              └──────────────────────────┘
```

The same model applies to static landing pages under `/for-*`, which load
`/public/lp/tracking-init.js` instead of going through the Next.js layout.
That file also renders the cookie banner on the landings (a copy of
`components/analytics/CookieBanner.tsx`), since they don't get React.

### Adding a new tracked event

1. Pick a `snake_case` event name (GA4 convention).
2. Add a typed wrapper in [lib/analytics.ts](lib/analytics.ts) — keep raw
   `trackEvent` calls limited to one-offs.
3. Call the wrapper from the relevant component / handler:

   ```tsx
   import { trackCTAClick } from '@/lib/analytics'

   <button onClick={() => trackCTAClick('book_a_call', 'hero')}>
     Book a call
   </button>
   ```

4. Open GTM → create a Custom Event trigger matching that event name, then
   wire it to the appropriate tag (GA4 event, Google Ads conversion, etc.).
   No code change required afterwards.

### Currently emitted events

| Event | Source | Notes |
|---|---|---|
| `lead_form_submit` | [lib/lead-ingest.ts](lib/lead-ingest.ts) `submitLead()` and `public/lp/lead-ingest.js` | Includes hashed `lead_email_hash` / `lead_phone_hash` for Enhanced Conversions |
| `generate_lead` | same | GA4-canonical companion event. Both lead events carry `value`, `currency` (USD), and the same id in `event_id` and `transaction_id` — the id Meta deduplicates with |
| `consent_update` | [lib/consent.ts](lib/consent.ts) `writeConsent()` and `tracking-init.js` | The visitor just answered the cookie banner: `analytics_consent`, `marketing_consent`. Not pushed when a stored answer is re-applied |
| `scroll_depth` | [components/analytics/EngagementTracker.tsx](components/analytics/EngagementTracker.tsx) | Fires at 25 / 50 / 75 / 90 % |

When you add new wrappers, document them in this table.

### What NOT to do

- ❌ Don't import or load `gtag.js` directly. GA4 and Google Ads are wired
  inside GTM.
- ❌ Don't call `window.gtag('event','conversion',...)` from React code.
  Push the semantic event (`lead_form_submit`, `purchase`, etc.) and let GTM
  decide which conversion tags to fire.
- ❌ Don't add Microsoft Clarity / Hotjar / TikTok / LinkedIn Insight
  `<Script>` blocks. All of those go in GTM.
- ❌ Don't hardcode container or measurement IDs in components. Use
  `NEXT_PUBLIC_GTM_ID` (or, for static `/lp/*` pages, the strings at the top
  of `tracking-init.js`).

### Consent

One rule for every vendor, on every page:

1. If the visitor answered the cookie banner, that answer wins. It lives in
   `localStorage['livv_consent_v1']` and is applied in the first inline script
   (`consent-default` in `app/layout.tsx`, the top of `tracking-init.js`),
   before GTM or Meta load.
2. Otherwise, regulated regions (EEA + UK + CH + EFTA) start **denied** and
   everywhere else starts **granted**. Google resolves the region from the IP
   (Consent Mode `region`). Meta has no regional default, so the same script
   resolves one from the time zone: European zones, and an unknown or UTC
   zone, count as regulated.
3. The banner can change it at any time: [lib/consent.ts](lib/consent.ts)
   updates Consent Mode and Meta, and pushes `consent_update`.

The history of the rollout lives in
[docs/consent-mode-v2-plan.md](docs/consent-mode-v2-plan.md).

### Meta Pixel

One pixel for the whole site: `1797006294606049`. It is set in two places
that must stay equal — `META_PIXEL_ID` in `app/layout.tsx` and in
`public/lp/tracking-init.js` — and it has to be the `META_PIXEL_ID` secret of
the `lead-ingest` Supabase function, which sends the same `Lead` server-side
(Conversions API) with the browser's `event_id` so Meta counts it once. That
server-side send only happens when the function has both `META_PIXEL_ID` and
`META_CAPI_ACCESS_TOKEN`; otherwise its response carries
`capi: { skipped: … }`.

Until 2026-09 the landings used a second pixel (`1495620938814274`) and
never granted it consent, so it received nothing from the browser.

### TikTok Pixel (via GTM)

TikTok goes in GTM, not in code. Once the pixel exists in TikTok Ads Manager:

1. **Base tag**: TikTok Pixel template, page view, with the pixel ID.
   Triggers: *All Pages* **and** Custom Event `consent_update` where
   `marketing_consent` equals `granted`. Tag firing: once per page.
2. **Lead tag**: event `SubmitForm`, trigger Custom Event `generate_lead`.
   Map `value` and `currency` from the dataLayer, and `event_id` to the
   event ID (for deduplication if the Events API is added later).
3. **Consent** on both tags: *Require additional consent for tag to fire* →
   `ad_storage`. That makes TikTok follow the same rule as Google and Meta.
4. Publish, and check it in TikTok's Events Manager with the Pixel Helper.

The second trigger in step 1 is what makes an EEA visitor who accepts the
banner count on that same page: GTM doesn't re-fire a tag that consent
blocked at page load.
