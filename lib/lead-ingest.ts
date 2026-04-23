const LEAD_INGEST_URL = 'https://ngswutcpsgdgmmjnfddi.supabase.co/functions/v1/lead-ingest';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc3d1dGNwc2dkZ21tam5mZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1NzY3NDUsImV4cCI6MjA4MzE1Mjc0NX0.fd_OLVMTOMqN1EF-Ca1EV0MeclzM24kY0rOFDihvzd8';
const TENANT_SLUG = 'livvv';

function getUtmParams(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
        const val = params.get(key);
        if (val) utm[key] = val;
    }
    return utm;
}

interface LeadPayload {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    company?: string;
    project_type?: string;
    category?: string;
    source?: string;
    origin: string;
}

function fireLeadTracking(payload: LeadPayload) {
    if (typeof window === 'undefined') return;
    const w = window as any;

    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
        event: 'lead_submitted',
        lead_origin: payload.origin,
        lead_category: payload.category,
        lead_source: payload.source,
    });

    if (typeof w.gtag === 'function') {
        w.gtag('event', 'generate_lead', {
            form_origin: payload.origin,
            category: payload.category,
        });

        w.gtag('set', 'user_data', {
            email: payload.email,
            ...(payload.phone ? { phone_number: payload.phone } : {}),
        });

        const sendTo = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_SEND_TO;
        if (sendTo) {
            w.gtag('event', 'conversion', { send_to: sendTo });
        }
    }

    if (typeof w.fbq === 'function') {
        w.fbq('track', 'Lead', {
            content_name: payload.origin,
            content_category: payload.category,
        });
    }
}

export async function submitLead(payload: LeadPayload): Promise<void> {
    const utm = getUtmParams();

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
        }),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Lead ingest failed (${res.status})`);
    }

    try {
        fireLeadTracking(payload);
    } catch (err) {
        console.warn('Lead tracking failed (non-blocking):', err);
    }
}
