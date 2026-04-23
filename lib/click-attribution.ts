const STORAGE_KEY = 'livv_attribution'
const COOKIE_NAME = 'livv_attr'
const COOKIE_DAYS = 90

const CLICK_ID_PARAMS = [
    'gclid',
    'gbraid',
    'wbraid',
    'fbclid',
    'msclkid',
    'ttclid',
    'li_fat_id',
    'epik',
    'twclid',
] as const

const UTM_PARAMS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',
] as const

type ClickIdKey = typeof CLICK_ID_PARAMS[number]
type UtmKey = typeof UTM_PARAMS[number]

export interface Attribution {
    first_landing_page?: string
    first_referrer?: string
    first_visit_at?: string
    first_gclid?: string
    first_fbclid?: string
    first_utm_source?: string
    first_utm_medium?: string
    first_utm_campaign?: string

    gclid?: string
    gbraid?: string
    wbraid?: string
    fbclid?: string
    msclkid?: string
    ttclid?: string
    li_fat_id?: string
    epik?: string
    twclid?: string

    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_term?: string
    utm_content?: string
    utm_id?: string

    last_landing_page?: string
    last_referrer?: string
    last_visit_at?: string

    visit_count?: number
}

function setCookie(name: string, value: string, days: number) {
    if (typeof document === 'undefined') return
    try {
        const expires = new Date(Date.now() + days * 864e5).toUTCString()
        const host = window.location.hostname.replace(/^www\./, '')
        const domain = host.includes('.') ? `; domain=.${host}` : ''
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/${domain}; samesite=lax`
    } catch { }
}

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'))
    return match ? decodeURIComponent(match[2]) : null
}

function readStored(): Attribution {
    try {
        const fromLS = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
        if (fromLS) return JSON.parse(fromLS)
    } catch { }
    try {
        const fromCookie = getCookie(COOKIE_NAME)
        if (fromCookie) return JSON.parse(fromCookie)
    } catch { }
    return {}
}

function persist(data: Attribution) {
    try {
        const json = JSON.stringify(data)
        if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, json)
        setCookie(COOKIE_NAME, json, COOKIE_DAYS)
    } catch { }
}

export function captureClickAttribution(): Attribution {
    if (typeof window === 'undefined') return {}
    const params = new URLSearchParams(window.location.search)
    const stored = readStored()
    const now = new Date().toISOString()
    const next: Attribution = { ...stored }

    if (!stored.first_visit_at) {
        next.first_visit_at = now
        next.first_landing_page = window.location.href
        next.first_referrer = document.referrer || undefined
        const firstGclid = params.get('gclid')
        const firstFbclid = params.get('fbclid')
        if (firstGclid) next.first_gclid = firstGclid
        if (firstFbclid) next.first_fbclid = firstFbclid
        const firstSource = params.get('utm_source')
        const firstMedium = params.get('utm_medium')
        const firstCampaign = params.get('utm_campaign')
        if (firstSource) next.first_utm_source = firstSource
        if (firstMedium) next.first_utm_medium = firstMedium
        if (firstCampaign) next.first_utm_campaign = firstCampaign
    }

    let hasNewClickId = false
    for (const key of CLICK_ID_PARAMS) {
        const val = params.get(key)
        if (val) {
            next[key as ClickIdKey] = val
            hasNewClickId = true
        }
    }

    const newUtmSource = params.get('utm_source')
    if (hasNewClickId || newUtmSource) {
        for (const key of UTM_PARAMS) {
            const val = params.get(key)
            if (val) next[key as UtmKey] = val
        }
        next.last_landing_page = window.location.href
        next.last_referrer = document.referrer || undefined
        next.last_visit_at = now
    }

    next.visit_count = (stored.visit_count || 0) + 1

    persist(next)
    return next
}

export function getAttribution(): Attribution {
    return readStored()
}
