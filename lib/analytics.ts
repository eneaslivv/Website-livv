/**
 * lib/analytics.ts
 *
 * Single entry-point for sending events to Google Tag Manager (GTM-NC96QG65).
 *
 * Rules:
 *   - This module ONLY pushes to window.dataLayer. It never calls gtag(),
 *     fbq(), or any vendor SDK directly. Configure the actual tags
 *     (GA4, Google Ads, Meta, etc.) inside GTM using these events as triggers.
 *   - All event names are snake_case (GA4 convention).
 *   - SSR-safe: every push is guarded by a window check.
 *   - Avoid passing raw PII to the dataLayer. For Enhanced Conversions,
 *     pass only hashed values (SHA-256, lowercase, trimmed) inside `user_data`.
 */

interface DataLayerEvent {
  event: string
  [key: string]: unknown
}

interface WindowWithDataLayer extends Window {
  dataLayer?: DataLayerEvent[]
}

/**
 * Push a generic event to the dataLayer. Most call sites should use one of
 * the typed wrappers below instead of this raw helper.
 */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  const w = window as WindowWithDataLayer
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: name, ...params })
}

// ──────────────────────────────────────────────────────────────────────────
// Lead / conversion events
// ──────────────────────────────────────────────────────────────────────────

export interface LeadUserData {
  /** SHA-256 hex of the lowercase, trimmed email — for Enhanced Conversions. */
  email?: string
  /** SHA-256 hex of the E.164 phone — for Enhanced Conversions. */
  phone?: string
  first_name?: string
  last_name?: string
}

export interface LeadEventParams {
  form_name: string
  value?: number
  currency?: string
  transaction_id?: string
  user_data?: LeadUserData
  /** Free-form metadata, e.g. lead_category, lead_origin, lead_source. */
  [key: string]: unknown
}

/**
 * Fired when a lead form is submitted successfully (response 2xx).
 * GTM should map this to a Google Ads conversion + GA4 `generate_lead`.
 */
export function trackLeadFormSubmit(params: LeadEventParams): void {
  trackEvent('lead_form_submit', params)
}

/**
 * GA4-canonical equivalent of `trackLeadFormSubmit`. Useful when GA4 needs the
 * standard `generate_lead` event without overloading the Ads conversion.
 */
export function trackGenerateLead(params: LeadEventParams): void {
  trackEvent('generate_lead', params)
}

// ──────────────────────────────────────────────────────────────────────────
// CTA / engagement events
// ──────────────────────────────────────────────────────────────────────────

/**
 * Fire when a primary call-to-action is clicked (e.g. "Get started",
 * "Book a call"). `location` lets you distinguish hero vs. footer vs. nav.
 */
export function trackCTAClick(ctaName: string, location?: string): void {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location,
  })
}

/**
 * Fire when a user completes account signup. `method` is the auth provider
 * (e.g. "email", "google", "magic_link").
 */
export function trackSignup(method: string = 'email'): void {
  trackEvent('sign_up', { method })
}

/** Sustained engagement (e.g. >30s on page). Used by EngagementTracker. */
export function trackEngagedVisitor(): void {
  trackEvent('engaged_visitor')
}

/**
 * Direct-contact intent — clicks on mailto: / tel: links. These are
 * "hidden" conversions that most sites never track.
 */
export function trackContactClick(method: 'email' | 'phone', location?: string): void {
  trackEvent('contact_click', { method, location })
}

/** Chat widget opened. `provider` is the SDK name (e.g. "livv_custom"). */
export function trackChatOpen(provider: string, extra?: Record<string, unknown>): void {
  trackEvent('chat_open', { provider, ...extra })
}

/**
 * Newsletter signup — distinct from `lead_form_submit`, which is reserved
 * for high-intent commercial leads.
 */
export function trackNewsletterSignup(location?: string): void {
  trackEvent('newsletter_signup', { location })
}

/** Click on a portfolio / case-study card in a listing. */
export function trackPortfolioItemClick(itemName: string, location?: string): void {
  trackEvent('portfolio_item_click', { item_name: itemName, location })
}

// ──────────────────────────────────────────────────────────────────────────
// E-commerce events
// ──────────────────────────────────────────────────────────────────────────

export interface PurchaseItem {
  item_id?: string
  item_name?: string
  price?: number
  quantity?: number
  [key: string]: unknown
}

export interface PurchaseParams {
  value: number
  currency: string
  transaction_id: string
  items?: PurchaseItem[]
}

/**
 * Standard GA4 `purchase` event. Use after a successful payment. GTM should
 * forward to GA4 and to any Ads/Meta conversion tag.
 */
export function trackPurchase(params: PurchaseParams): void {
  trackEvent('purchase', params)
}
