const LEAD_INGEST_URL = 'https://ngswutcpsgdgmmjnfddi.supabase.co/functions/v1/lead-ingest';
const TENANT_SLUG = 'principal-admin';

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
    message?: string;
    company?: string;
    project_type?: string;
    category?: string;
    source?: string;
    origin: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
    const utm = getUtmParams();

    const res = await fetch(LEAD_INGEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
}
