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

> **TL;DR — there is exactly one tracking entry-point: GTM.**
> Do not add `gtag.js`, `fbq`, Microsoft Clarity, GA4 measurement IDs, or any
> other vendor SDK directly to the codebase. Configure them inside GTM.

### Architecture

```
┌──────────────────────────────────────────────────┐
│                  livvvv.com                      │
│                                                  │
│  app/layout.tsx ──► loads ONLY GTM-NC96QG65      │
│       │            (consent default = denied,    │
│       │             then GTM, then Meta Pixel)   │
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
                              │   └─► Other tags…         │
                              └──────────────────────────┘
```

The same model applies to static landing pages under `/for-*`, which load
`/public/lp/tracking-init.js` instead of going through the Next.js layout.

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
| `lead_form_submit` | [lib/lead-ingest.ts](lib/lead-ingest.ts) `submitLead()` | Includes hashed `lead_email_hash` / `lead_phone_hash` for Enhanced Conversions |
| `generate_lead` | same | GA4-canonical companion event |
| `scroll_depth` | [components/analytics/EngagementTracker.tsx](components/analytics/EngagementTracker.tsx) | Fires at 25 / 50 / 75 / 90 % |
| `engagement_time` | same | Fires at 15 / 30 / 60 / 120 s of active time |

When you add new wrappers, document them in this table.

### What NOT to do

- ❌ Don't import or load `gtag.js` directly. GA4 and Google Ads are wired
  inside GTM.
- ❌ Don't call `window.gtag('event','conversion',...)` from React code.
  Push the semantic event (`lead_form_submit`, `purchase`, etc.) and let GTM
  decide which conversion tags to fire.
- ❌ Don't add Meta Pixel / Microsoft Clarity / Hotjar / TikTok / LinkedIn
  Insight `<Script>` blocks. All of those go in GTM.
- ❌ Don't hardcode container or measurement IDs in components. Use
  `NEXT_PUBLIC_GTM_ID` (or, for static `/lp/*` pages, the single string at
  the top of `tracking-init.js`).

### Consent Mode v2

Default state is **denied** for all categories before GTM loads.
[lib/consent.ts](lib/consent.ts) handles updates from the cookie banner.
A migration plan to fully roll this out (banner UX, geo-gating, per-tag
consent in GTM) lives in [docs/consent-mode-v2-plan.md](docs/consent-mode-v2-plan.md).

### Known issue — Meta Pixel

There are currently **two different Meta Pixel IDs** firing depending on
the route (`1797006294606049` from `app/layout.tsx`, `1495620938814274`
from `public/lp/tracking-init.js`). This fragments Meta Ads audiences and
should be unified. Search the repo for `TODO(tracking)` to find every site
that needs an update once a decision is made.
