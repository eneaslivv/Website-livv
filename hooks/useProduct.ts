import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Product } from '@/types/livv-os';
import { getIsPreview } from '@/hooks/usePublicData';

const TENANT_SLUG = 'principal-admin';
const PRODUCT_CACHE: Record<string, Product | null> = {};
const ALL_CACHE: Record<string, Product[]> = {};

export const useProduct = (slug: string) => {
    const isPreview = getIsPreview();
    const rpcName = isPreview ? 'get_preview_products' : 'get_public_products';
    const cacheKey = `${rpcName}:${slug}`;

    const [product, setProduct] = useState<Product | null>(PRODUCT_CACHE[cacheKey] || null);
    const [loading, setLoading] = useState(!PRODUCT_CACHE[cacheKey]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        if (PRODUCT_CACHE[cacheKey]) {
            setProduct(PRODUCT_CACHE[cacheKey]);
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            setLoading(true);
            try {
                // Use cached full list if available
                if (ALL_CACHE[rpcName]) {
                    const found = ALL_CACHE[rpcName].find(
                        (p) => p.slug?.toLowerCase() === slug.toLowerCase()
                    );
                    if (found) {
                        PRODUCT_CACHE[cacheKey] = found;
                        setProduct(found);
                    }
                    return;
                }

                const { data, error: err } = await supabase.rpc(rpcName, {
                    p_tenant_slug: TENANT_SLUG,
                });

                if (err) {
                    setError(err.message);
                } else if (data) {
                    ALL_CACHE[rpcName] = data as Product[];
                    const found = (data as Product[]).find(
                        (p) => p.slug?.toLowerCase() === slug.toLowerCase()
                    );
                    if (found) {
                        PRODUCT_CACHE[cacheKey] = found;
                        setProduct(found);
                    }
                }
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug, rpcName, cacheKey]);

    return { product, loading, error, isPreview };
};
