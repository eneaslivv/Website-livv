import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';

const TENANT_SLUG = 'principal-admin';

// Global cache for RPC results
const RPC_CACHE: Record<string, any> = {};

function getIsPreview(): boolean {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('preview') === 'true';
}

/**
 * Generic hook to call Supabase RPCs with tenant slug.
 * Automatically switches to preview RPCs when ?preview=true is in the URL.
 */
export function useRpc<T>(publicRpcName: string, previewRpcName: string) {
    const isPreview = getIsPreview();
    const rpcName = isPreview ? previewRpcName : publicRpcName;
    const cacheKey = `rpc:${rpcName}:${TENANT_SLUG}`;

    const [data, setData] = useState<T[]>(RPC_CACHE[cacheKey] || []);
    const [loading, setLoading] = useState(!RPC_CACHE[cacheKey]);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (!data.length && !RPC_CACHE[cacheKey]) setLoading(true);

        try {
            const { data: result, error: err } = await supabase.rpc(rpcName, {
                p_tenant_slug: TENANT_SLUG,
            });

            if (err) {
                setError(err.message);
            } else if (result) {
                RPC_CACHE[cacheKey] = result;
                setData(result as T[]);
            }
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [rpcName, cacheKey]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refresh: fetchData, isPreview };
}

// --- Typed hooks ---

export function usePortfolioItems() {
    return useRpc<any>('get_public_portfolio_items', 'get_preview_portfolio_items');
}

export function useProducts() {
    return useRpc<any>('get_public_products', 'get_preview_products');
}

export function useClientLogos() {
    return useRpc<any>('get_public_client_logos', 'get_preview_client_logos');
}

export { getIsPreview };
