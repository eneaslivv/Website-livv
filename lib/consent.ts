export type ConsentState = 'granted' | 'denied' | 'pending'

export const CONSENT_STORAGE_KEY = 'livv_consent_v1'
export const CONSENT_EVENT = 'livv:consent-change'

export interface ConsentRecord {
    analytics: 'granted' | 'denied'
    marketing: 'granted' | 'denied'
    updated_at: string
}

const DENIED: ConsentRecord = { analytics: 'denied', marketing: 'denied', updated_at: '' }

export function readConsent(): ConsentRecord | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw) as ConsentRecord
        if (parsed.analytics && parsed.marketing) return parsed
    } catch { }
    return null
}

function pushGtagConsent(record: ConsentRecord) {
    if (typeof window === 'undefined') return
    const w = window as any
    w.dataLayer = w.dataLayer || []
    function gtag(...args: any[]) { w.dataLayer.push(args) }
    gtag('consent', 'update', {
        ad_storage: record.marketing,
        ad_user_data: record.marketing,
        ad_personalization: record.marketing,
        analytics_storage: record.analytics,
        personalization_storage: record.marketing,
    })
}

function applyMetaConsent(record: ConsentRecord) {
    if (typeof window === 'undefined') return
    const w = window as any
    if (typeof w.fbq !== 'function') return
    if (record.marketing === 'granted') {
        w.fbq('consent', 'grant')
    } else {
        w.fbq('consent', 'revoke')
    }
}

export function applyConsent(record: ConsentRecord) {
    pushGtagConsent(record)
    applyMetaConsent(record)
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: record }))
    }
}

export function writeConsent(partial: Partial<Omit<ConsentRecord, 'updated_at'>>) {
    const next: ConsentRecord = {
        ...DENIED,
        ...(readConsent() || {}),
        ...partial,
        updated_at: new Date().toISOString(),
    }
    try {
        localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next))
    } catch { }
    applyConsent(next)
    return next
}

export function acceptAll() {
    return writeConsent({ analytics: 'granted', marketing: 'granted' })
}

export function rejectAll() {
    return writeConsent({ analytics: 'denied', marketing: 'denied' })
}
