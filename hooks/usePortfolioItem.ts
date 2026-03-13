import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { PortfolioItem } from '@/types/livv-os';
import { getIsPreview } from '@/hooks/usePublicData';

const TENANT_SLUG = 'livvv';
const ITEM_CACHE: Record<string, PortfolioItem | null> = {};
const ALL_CACHE: Record<string, PortfolioItem[]> = {};

export const usePortfolioItem = (slug: string) => {
    const isPreview = getIsPreview();
    const rpcName = isPreview ? 'get_preview_portfolio_items' : 'get_public_portfolio_items';
    const cacheKey = `${rpcName}:${slug}`;

    const [item, setItem] = useState<PortfolioItem | null>(ITEM_CACHE[cacheKey] || null);
    const [loading, setLoading] = useState(!ITEM_CACHE[cacheKey]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        if (ITEM_CACHE[cacheKey]) {
            setItem(ITEM_CACHE[cacheKey]);
            setLoading(false);
            return;
        }

        const fetchItem = async () => {
            setLoading(true);
            try {
                if (ALL_CACHE[rpcName]) {
                    const found = ALL_CACHE[rpcName].find(
                        (p) => p.slug?.toLowerCase() === slug.toLowerCase()
                    );
                    if (found) {
                        ITEM_CACHE[cacheKey] = found;
                        setItem(found);
                    }
                    return;
                }

                const { data, error: err } = await supabase.rpc(rpcName, {
                    p_tenant_slug: TENANT_SLUG,
                });

                if (err) {
                    setError(err.message);
                } else if (data) {
                    ALL_CACHE[rpcName] = data as PortfolioItem[];
                    const found = (data as PortfolioItem[]).find(
                        (p) => p.slug?.toLowerCase() === slug.toLowerCase()
                    );
                    if (found) {
                        ITEM_CACHE[cacheKey] = found;
                        setItem(found);
                    }
                }
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [slug, rpcName, cacheKey]);

    return { item, loading, error, isPreview };
};
