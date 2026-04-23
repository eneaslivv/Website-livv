import { getAttribution, type Attribution } from './click-attribution';

const LEAD_INGEST_URL = 'https://ngswutcpsgdgmmjnfddi.supabase.co/functions/v1/lead-ingest';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc3d1dGNwc2dkZ21tam5mZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzY3NDUsImV4cCI6MjA4MzE1Mjc0NX0.fd_OLVMTOMqN1EF-Ca1EV0MeclzM24kY0rOFDihvzd8';
const TENANT_SLUG = 'livvv';

const LEAD_CURRENCY = 'USD';
const LEAD_VALUE_BY_CATEGORY: Record<string, number> = {
    contact: 500,
    quote: 800,
    partner: 1000,
    lead: 400,
    newsletter: 50,
};

const GOOGLE_ADS_CONVERSION_ID = 'AW-18096615687';
const GOOGLE_ADS_LEAD_LABEL = 'fwDOCLb99KAcEIfikbVD';
const GOOGLE_ADS_LABELS: Record<string, string | undefined> = {
    contact: GOOGLE_ADS_LEAD_LABEL,
    quote: GOOGLE_ADS_LEAD_LABEL,
    partner: GOOGLE_ADS_LEAD_LABEL,
    lead: GOOGLE_ADS_LEAD_LABEL,
    newsletter: process.env.NEXT_PUBLIC_GADS_LABEL_NEWSLETTER,
};

interface LeadPayload {
    name: string;
    email: string;
    message?: string;
    company?: string;
    phone?: string;
    project_type?: string;
    category?: string;
    source?: string;
    origin: string;
}

function getUtmParams(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
        const val = params.get(key);
        if (val) utm[key] = val;
    }
    return utm;
}

function generateEventId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function readBrowserCookie(name: string): string | undefined {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : undefined;
}

async function sha256Hex(input: string): Promise<string | undefined> {
    if (typeof crypto === 'undefined' || !crypto.subtle) return undefined;
    try {
        const data = new TextEncoder().encode(input.trim().toLowerCase());
        const buf = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(buf))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    } catch {
        return undefined;
    }
}

function normalizePhone(phone?: string): string | undefined {
    if (!phone) return undefined;
    const digits = phone.replace(/\D/g, '');
    return digits ? `+${digits}` : undefined;
}

function getLeadValue(category?: string): number {
    if (!category) return LEAD_VALUE_BY_CATEGORY.lead;
    return LEAD_VALUE_BY_CATEGORY[category] ?? LEAD_VALUE_BY_CATEGORY.lead;
}

async function trackLeadConversion(payload: LeadPayload, attribution: Attribution, eventId: string) {
    if (typeof window === 'undefined') return;
    const w = window as any;

    const normalizedEmail = payload.email.trim().toLowerCase();
    const normalizedPhone = normalizePhone(payload.phone);
    const [emailHash, phoneHash] = await Promise.all([
        sha256Hex(normalizedEmail),
        normalizedPhone ? sha256Hex(normalizedPhone) : Promise.resolve(undefined),
    ]);

    const category = payload.category || 'lead';
    const value = getLeadValue(category);
    const effectiveGclid = attribution.gclid || attribution.first_gclid;
    const effectiveFbclid = attribution.fbclid || attribution.first_fbclid;

    w.dataLayer = w.dataLayer || [];

    w.dataLayer.push({
        event: 'lead_form_submit',
        event_id: eventId,
        lead_origin: payload.origin,
        lead_category: category,
        lead_source: payload.source || 'website',
        lead_email: normalizedEmail,
        lead_email_hash: emailHash,
        lead_phone_hash: phoneHash,
        lead_name: payload.name,
        lead_company: payload.company,
        lead_project_type: payload.project_type,
        value,
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
        visit_count: attribution.visit_count,
    });

    w.dataLayer.push({
        event: 'generate_lead',
        event_id: eventId,
        currency: LEAD_CURRENCY,
        value,
        lead_category: category,
        lead_origin: payload.origin,
    });

    const gadsLabel = GOOGLE_ADS_LABELS[category];
    if (typeof w.gtag === 'function' && gadsLabel) {
        w.gtag('set', 'user_data', {
            email: normalizedEmail,
            phone_number: normalizedPhone,
        });
        w.gtag('event', 'conversion', {
            send_to: `${GOOGLE_ADS_CONVERSION_ID}/${gadsLabel}`,
            value,
            currency: LEAD_CURRENCY,
            transaction_id: eventId,
        });
    }

    if (typeof w.fbq === 'function') {
        w.fbq(
            'track',
            'Lead',
            {
                content_name: payload.origin,
                content_category: category,
                currency: LEAD_CURRENCY,
                value,
            },
            { eventID: eventId }
        );
    }
}

export async function submitLead(payload: LeadPayload): Promise<void> {
    const utm = getUtmParams();
    const attribution = typeof window !== 'undefined' ? getAttribution() : {};
    const eventId = generateEventId();
    const fbp = readBrowserCookie('_fbp');
    const fbcCookie = readBrowserCookie('_fbc');

    const res = await fetch(LEAD_INGEST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
            tenant_slug: TENANT_SLUG,
            ...payload,
            ...utm,
            event_id: eventId,
            gclid: attribution.gclid || attribution.first_gclid,
            fbclid: attribution.fbclid || attribution.first_fbclid,
            msclkid: attribution.msclkid,
            fbp,
            fbc: fbcCookie,
            first_landing_page: attribution.first_landing_page,
            first_referrer: attribution.first_referrer,
            last_landing_page: attribution.last_landing_page,
            attribution,
            page_url: typeof window !== 'undefined' ? window.location.href : undefined,
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Lead ingest failed (${res.status})`);
    }

    await trackLeadConversion(payload, attribution, eventId);
}

export function trackMicroConversion(name: string, params?: Record<string, any>) {
    if (typeof window === 'undefined') return;
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
        event: name,
        event_id: generateEventId(),
        ...params,
    });
}
