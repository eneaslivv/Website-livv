'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useCatalogTable<T>(
  tableName: string,
  options: { orderBy?: string; ascending?: boolean; enabled?: boolean } = {}
) {
  const { orderBy = 'display_order', ascending = true, enabled = true } = options;
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    try {
      const { data: result, error: err } = await supabase
        .from(tableName)
        .select('*')
        .order(orderBy, { ascending });
      if (err) {
        setError(err.message);
      } else {
        setData((result || []) as T[]);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [tableName, orderBy, ascending, enabled]);

  useEffect(() => {
    fetchData();

    if (!enabled) return;

    const channel = supabase
      .channel(`catalog:${tableName}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData, enabled, tableName]);

  const add = useCallback(async (item: Partial<T>) => {
    const { error } = await supabase.from(tableName).insert(item);
    if (error) console.error(`Error adding to ${tableName}:`, error);
    else fetchData();
    return error;
  }, [tableName, fetchData]);

  const update = useCallback(async (id: string, updates: Partial<T>) => {
    const { error } = await supabase.from(tableName).update(updates).eq('id', id);
    if (error) console.error(`Error updating ${tableName}:`, error);
    else fetchData();
    return error;
  }, [tableName, fetchData]);

  const remove = useCallback(async (id: string) => {
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (error) console.error(`Error deleting from ${tableName}:`, error);
    else fetchData();
    return error;
  }, [tableName, fetchData]);

  return useMemo(() => ({
    data,
    loading,
    error,
    add,
    update,
    remove,
    refresh: fetchData,
  }), [data, loading, error, add, update, remove, fetchData]);
}

// --- Junction table helpers ---

export async function setProductCategories(productId: string, categoryIds: string[]) {
  await supabase.from('product_categories').delete().eq('product_id', productId);
  if (categoryIds.length > 0) {
    await supabase.from('product_categories').insert(
      categoryIds.map(cid => ({ product_id: productId, category_id: cid }))
    );
  }
}

export async function getProductCategories(productId: string): Promise<string[]> {
  const { data } = await supabase
    .from('product_categories')
    .select('category_id')
    .eq('product_id', productId);
  return (data || []).map((r: any) => r.category_id);
}

export async function setProductTags(productId: string, tags: string[]) {
  await supabase.from('product_tags').delete().eq('product_id', productId);
  if (tags.length > 0) {
    await supabase.from('product_tags').insert(
      tags.map(tag => ({ product_id: productId, tag }))
    );
  }
}

export async function getProductTags(productId: string): Promise<string[]> {
  const { data } = await supabase
    .from('product_tags')
    .select('tag')
    .eq('product_id', productId);
  return (data || []).map((r: any) => r.tag);
}

export async function getServiceFeatures(serviceId: string) {
  const { data } = await supabase
    .from('service_features')
    .select('*')
    .eq('service_id', serviceId)
    .order('display_order', { ascending: true });
  return data || [];
}

export async function setServiceFeatures(
  serviceId: string,
  features: { title: string; description?: string; display_order: number }[]
) {
  await supabase.from('service_features').delete().eq('service_id', serviceId);
  if (features.length > 0) {
    await supabase.from('service_features').insert(
      features.map(f => ({ service_id: serviceId, ...f }))
    );
  }
}
