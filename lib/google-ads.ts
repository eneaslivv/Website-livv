/**
 * Google Ads conversion tracking.
 *
 * The site already loads GTM (GTM-NC96QG65) with Consent Mode v2 defaults set
 * in app/layout.tsx before anything else runs. This module adds the Google Ads
 * conversion layer on top of that, fired from application code at the moment a
 * real contact action completes — never on page load.
 *
 * IMPORTANT — double-counting: if a Google Ads Conversion tag for the same
 * "Contact" action is ALSO configured inside the GTM container (triggered on
 * the `lead_form_submit` / `contact_click` dataLayer events this code pushes),
 * every conversion is counted twice. Pick one place. This module is that place;
 * keep the GTM container free of Google Ads conversion tags for "Contact".
 *
 * Consent: gtag reads the Consent Mode defaults already installed in the head,
 * so in the EEA/UK the conversion ping is withheld or redacted automatically
 * until the cookie banner grants ad_storage. No extra gating is needed here.
 */

/** Google Ads account tag, e.g. "AW-123456789". */
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || ""

/**
 * Conversion label for the "Contact" action — the part after the slash in the
 * event snippet's send_to, e.g. "AbC-D_efGhIjKlM". Not the full send_to string.
 */
export const GOOGLE_ADS_CONTACT_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_LABEL || ""

export const isGoogleAdsConfigured = Boolean(GOOGLE_ADS_ID && GOOGLE_ADS_CONTACT_LABEL)

/** Where the contact action happened — becomes a conversion parameter. */
export type ContactSource =
  | "contact_form"
  | "chat_widget"
  | "quoting_flow"
  | "vision_cta"
  | "partner_modal"
  | "mailto"
  | "get_in_touch_cta"
  | "book_call"

/**
 * Strong signals always report; weak ones only report if nothing has yet.
 * A completed form submit is worth attributing even if the visitor already
 * clicked a CTA earlier in the session.
 */
const STRONG_SOURCES: ReadonlySet<ContactSource> = new Set<ContactSource>([
  "contact_form",
  "chat_widget",
  "quoting_flow",
  "vision_cta",
  "partner_modal",
])

const SESSION_KEY = "__livv_contact_conversion"
const THROTTLE_MS = 1000

let lastFiredAt = 0

interface GtagWindow extends Window {
  gtag?: (...args: unknown[]) => void
  dataLayer?: unknown[]
  __livv_no_track?: boolean
}

function sessionFlag(): string | null {
  try {
    return window.sessionStorage.getItem(SESSION_KEY)
  } catch {
    return null // Safari private mode / storage disabled
  }
}

function setSessionFlag(value: string): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, value)
  } catch {
    /* non-fatal */
  }
}

/**
 * Report the "Contact" conversion to Google Ads.
 *
 * Deduplication, so one interaction can never report twice:
 *  1. A 1s throttle absorbs double-clicks, event bubbling and React re-renders.
 *  2. One report per session, except that a strong signal (a completed form
 *     submit) is allowed to report once even if a weak click already did. With
 *     the "Contact" action set to count "One" conversion per click in Google
 *     Ads, that second report is discarded server-side, so the strongest
 *     signal wins without inflating the total.
 *
 * @returns true if a conversion was reported.
 */
export function reportContactConversion(source: ContactSource): boolean {
  if (typeof window === "undefined") return false

  const w = window as GtagWindow
  if (w.__livv_no_track) return false
  if (w.location.pathname.indexOf("/embed/") === 0) return false
  if (!isGoogleAdsConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[google-ads] NEXT_PUBLIC_GOOGLE_ADS_ID / _CONTACT_LABEL not set — conversion not reported.",
      )
    }
    return false
  }

  const now = Date.now()
  if (now - lastFiredAt < THROTTLE_MS) return false

  const alreadyFired = sessionFlag()
  const isStrong = STRONG_SOURCES.has(source)
  // Weak signals never report twice; a strong one may upgrade a weak report.
  if (alreadyFired === "strong") return false
  if (alreadyFired === "weak" && !isStrong) return false

  if (typeof w.gtag !== "function") return false

  lastFiredAt = now
  setSessionFlag(isStrong ? "strong" : "weak")

  w.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONTACT_LABEL}`,
    contact_source: source,
  })

  return true
}
