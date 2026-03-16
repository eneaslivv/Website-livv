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
}
