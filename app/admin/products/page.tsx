'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Icons } from '@/components/admin/Icons';
import { useCatalogTable, setProductCategories, getProductCategories, setProductTags, getProductTags } from '@/hooks/useCatalog';
import { adaptProduct, adaptCategory } from '@/lib/admin-adapters';
import { generateSlug } from '@/lib/slug';
import { supabase } from '@/lib/supabase/client';
import type { Product, Category, ProductStatus, PriceType } from '@/types/catalog';
import Image from 'next/image';

const EMPTY_FORM = {
    title: '',
    slug: '',
    short_description: '',
    long_description: '',
    featured_image: '',
    price: '' as string,
    price_type: 'fixed' as PriceType,
    is_featured: false,
    status: 'draft' as ProductStatus,
    seo_title: '',
    seo_description: '',
    og_image: '',
    display_order: 0,
};

const ProductFormModal = ({
    isOpen,
    onClose,
    onSave,
    initialData,
    categories,
    initialCategoryIds,
    initialTags,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any, categoryIds: string[], tags: string[]) => void;
    initialData?: Product;
    categories: Category[];
    initialCategoryIds: string[];
    initialTags: string[];
}) => {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const [tagsInput, setTagsInput] = useState('');
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                slug: initialData.slug,
                short_description: initialData.shortDescription || '',
                long_description: initialData.longDescription || '',
                featured_image: initialData.featuredImage || '',
                price: initialData.price != null ? String(initialData.price) : '',
                price_type: initialData.priceType,
                is_featured: initialData.isFeatured,
                status: initialData.status,
                seo_title: initialData.seoTitle || '',
                seo_description: initialData.seoDescription || '',
                og_image: initialData.ogImage || '',
                display_order: initialData.displayOrder,
            });
            setSelectedCategoryIds(initialCategoryIds);
            setTagsInput(initialTags.join(', '));
            setSlugManuallyEdited(true);
        } else {
            setFormData(EMPTY_FORM);
            setSelectedCategoryIds([]);
            setTagsInput('');
            setSlugManuallyEdited(false);
        }
    }, [initialData, isOpen, initialCategoryIds, initialTags]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => {
                const next = { ...prev, [name]: value };
                if (name === 'title' && !slugManuallyEdited) {
                    next.slug = generateSlug(value);
                }
                return next;
            });
        }
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlugManuallyEdited(true);
        setFormData(prev => ({ ...prev, slug: e.target.value }));
    };

    const toggleCategory = (catId: string) => {
        setSelectedCategoryIds(prev =>
            prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
        );
    };

    const handleSubmit = () => {
        const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
        const payload: any = { ...formData };
        payload.price = payload.price !== '' ? parseFloat(payload.price) : null;
        onSave(payload, selectedCategoryIds, tags);
    };

    const productCategories = categories.filter(c => c.type !== 'service');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{initialData ? 'Edit Product' : 'New Product'}</h3>
                    <button onClick={onClose}><Icons.Close /></button>
                </div>

                <div className="space-y-6">
                    {/* Basic Info */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Basic Info</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Title</label>
                                <input name="title" type="text" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.title} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Slug</label>
                                <input name="slug" type="text" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.slug} onChange={handleSlugChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Status</label>
                                <select name="status" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.status} onChange={handleChange}>
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Short Description <span className="text-zinc-300 normal-case">({formData.short_description.length}/160)</span></label>
                                <input name="short_description" type="text" maxLength={160} className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.short_description} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Pricing</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Price Type</label>
                                <select name="price_type" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.price_type} onChange={handleChange}>
                                    <option value="fixed">Fixed Price</option>
                                    <option value="on_request">On Request</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Price</label>
                                <input name="price" type="number" step="0.01" placeholder="0.00" disabled={formData.price_type === 'on_request'} className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm disabled:opacity-50" value={formData.price} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Media</h4>
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Featured Image URL</label>
                            <input name="featured_image" type="text" placeholder="https://..." className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.featured_image} onChange={handleChange} />
                            {formData.featured_image && (
                                <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                    <Image src={formData.featured_image} alt="Preview" fill className="object-cover" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Categories */}
                    {productCategories.length > 0 && (
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Categories</h4>
                            <div className="flex flex-wrap gap-2">
                                {productCategories.map((cat: Category) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => toggleCategory(cat.id)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategoryIds.includes(cat.id)
                                            ? 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300'
                                            : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200'
                                        }`}
                                    >
                                        {selectedCategoryIds.includes(cat.id) && <span className="mr-1">✓</span>}
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Tags</h4>
                        <input type="text" placeholder="tag1, tag2, tag3" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
                        <p className="text-[10px] text-zinc-400 mt-1">Separate with commas</p>
                    </div>

                    {/* Content */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Content</h4>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Long Description</label>
                        <textarea name="long_description" rows={6} className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.long_description} onChange={handleChange} />
                    </div>

                    {/* SEO */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">SEO</h4>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">SEO Title</label>
                                <input name="seo_title" type="text" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.seo_title} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">SEO Description</label>
                                <textarea name="seo_description" rows={2} className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.seo_description} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Display */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Display</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Display Order</label>
                                <input name="display_order" type="number" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.display_order} onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))} />
                            </div>
                            <div className="flex items-center gap-3 pt-5">
                                <input name="is_featured" type="checkbox" checked={formData.is_featured} onChange={handleChange} className="h-5 w-5" />
                                <label className="text-xs font-bold text-zinc-400 uppercase">Featured</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700">Cancel</button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold">
                        {initialData ? 'Save Changes' : 'Create Product'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function ProductsPage() {
    const { data: dbProducts, loading, update, remove, refresh } = useCatalogTable<any>('products');
    const { data: dbCategories } = useCatalogTable<any>('categories');

    const products = useMemo(() => dbProducts.map(adaptProduct), [dbProducts]);
    const categories = useMemo(() => dbCategories.map(adaptCategory), [dbCategories]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Product | undefined>(undefined);
    const [editCategoryIds, setEditCategoryIds] = useState<string[]>([]);
    const [editTags, setEditTags] = useState<string[]>([]);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterFeatured, setFilterFeatured] = useState<boolean | null>(null);

    const filtered = useMemo(() => {
        return products.filter((p: Product) => {
            if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            if (filterStatus !== 'all' && p.status !== filterStatus) return false;
            if (filterFeatured !== null && p.isFeatured !== filterFeatured) return false;
            return true;
        });
    }, [products, searchQuery, filterStatus, filterFeatured]);

    const handleCreate = () => {
        setEditingItem(undefined);
        setEditCategoryIds([]);
        setEditTags([]);
        setIsModalOpen(true);
    };

    const handleEdit = async (item: Product) => {
        const [catIds, tags] = await Promise.all([
            getProductCategories(item.id),
            getProductTags(item.id),
        ]);
        setEditingItem(item);
        setEditCategoryIds(catIds);
        setEditTags(tags);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await remove(id);
        }
    };

    const handleSave = async (data: any, categoryIds: string[], tags: string[]) => {
        if (editingItem) {
            await update(editingItem.id, data);
            await setProductCategories(editingItem.id, categoryIds);
            await setProductTags(editingItem.id, tags);
        } else {
            const { data: newProduct, error } = await supabase
                .from('products')
                .insert(data)
                .select('id')
                .single();
            if (newProduct) {
                await setProductCategories(newProduct.id, categoryIds);
                await setProductTags(newProduct.id, tags);
            }
        }
        setIsModalOpen(false);
        refresh();
    };

    const statusBadge = (status: string) => {
        switch (status) {
            case 'published': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400';
            case 'archived': return 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500';
            default: return 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400';
        }
    };

    return (
        <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Products</h1>
                    <p className="text-zinc-500 text-sm">Manage your product catalog.</p>
                </div>
                <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all">
                    <Icons.Plus size={18} /> New Product
                </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3 mb-6 items-center">
                <div className="relative flex-1 min-w-[200px] max-w-[300px]">
                    <Icons.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-9 pr-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select className="px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                </select>
                <button
                    onClick={() => setFilterFeatured(filterFeatured === true ? null : true)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${filterFeatured === true ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300' : 'bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-500'}`}
                >
                    <Icons.Star size={14} className="inline mr-1" /> Featured
                </button>
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-white"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-10">
                    {filtered.map((product: Product) => (
                        <div key={product.id} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                            <div className="aspect-video relative bg-zinc-100 dark:bg-zinc-800">
                                {product.featuredImage ? (
                                    <Image src={product.featuredImage} alt={product.title} fill className="object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-zinc-300 dark:text-zinc-600">
                                        <Icons.Package size={32} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(product)} className="p-2 bg-white/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 rounded-full shadow-lg hover:scale-105 transition-transform"><Icons.Edit size={14} /></button>
                                    <button onClick={() => handleDelete(product.id)} className="p-2 bg-red-500/90 text-white rounded-full shadow-lg hover:scale-105 transition-transform"><Icons.Trash size={14} /></button>
                                </div>
                                {product.isFeatured && (
                                    <span className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-black text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">Featured</span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">{product.title}</h3>
                                {product.shortDescription && (
                                    <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{product.shortDescription}</p>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${statusBadge(product.status)}`}>{product.status}</span>
                                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                                        {product.priceType === 'on_request' ? 'On request' : product.price != null ? `$${product.price}` : '—'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-20 text-center text-zinc-400">
                            <Icons.Package size={40} className="mx-auto mb-3 opacity-30" />
                            <p>No products found. Create one to get started.</p>
                        </div>
                    )}
                </div>
            )}

            <ProductFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingItem}
                categories={categories}
                initialCategoryIds={editCategoryIds}
                initialTags={editTags}
            />
        </div>
    );
}
