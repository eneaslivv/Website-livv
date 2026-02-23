'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Icons } from '@/components/admin/Icons';
import { useCatalogTable, getServiceFeatures, setServiceFeatures } from '@/hooks/useCatalog';
import { adaptService, adaptCategory } from '@/lib/admin-adapters';
import { generateSlug } from '@/lib/slug';
import { supabase } from '@/lib/supabase/client';
import type { Service, Category, ServiceStatus, PricingModel } from '@/types/catalog';

interface FeatureInput {
    title: string;
    description: string;
}

const EMPTY_FORM = {
    title: '',
    slug: '',
    subtitle: '',
    short_description: '',
    full_description: '',
    image_url: '',
    icon: '',
    pricing_model: 'on_request' as PricingModel,
    price_value: '' as string,
    cta_label: '',
    cta_link: '',
    status: 'draft' as ServiceStatus,
    display_order: 0,
    category_id: '' as string,
    seo_title: '',
    seo_description: '',
};

const ServiceFormModal = ({
    isOpen,
    onClose,
    onSave,
    initialData,
    categories,
    initialFeatures,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any, features: FeatureInput[]) => void;
    initialData?: Service;
    categories: Category[];
    initialFeatures: FeatureInput[];
}) => {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [features, setFeatures] = useState<FeatureInput[]>([]);
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                slug: initialData.slug,
                subtitle: initialData.subtitle || '',
                short_description: initialData.shortDescription || '',
                full_description: initialData.fullDescription || '',
                image_url: initialData.imageUrl || '',
                icon: initialData.icon || '',
                pricing_model: initialData.pricingModel,
                price_value: initialData.priceValue != null ? String(initialData.priceValue) : '',
                cta_label: initialData.ctaLabel || '',
                cta_link: initialData.ctaLink || '',
                status: initialData.status,
                display_order: initialData.displayOrder,
                category_id: initialData.categoryId || '',
                seo_title: initialData.seoTitle || '',
                seo_description: initialData.seoDescription || '',
            });
            setFeatures(initialFeatures);
            setSlugManuallyEdited(true);
        } else {
            setFormData(EMPTY_FORM);
            setFeatures([]);
            setSlugManuallyEdited(false);
        }
    }, [initialData, isOpen, initialFeatures]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const next = { ...prev, [name]: value };
            if (name === 'title' && !slugManuallyEdited) {
                next.slug = generateSlug(value);
            }
            return next;
        });
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlugManuallyEdited(true);
        setFormData(prev => ({ ...prev, slug: e.target.value }));
    };

    const addFeature = () => {
        setFeatures(prev => [...prev, { title: '', description: '' }]);
    };

    const removeFeature = (index: number) => {
        setFeatures(prev => prev.filter((_, i) => i !== index));
    };

    const updateFeature = (index: number, field: 'title' | 'description', value: string) => {
        setFeatures(prev => prev.map((f, i) => i === index ? { ...f, [field]: value } : f));
    };

    const handleSubmit = () => {
        const payload: any = { ...formData };
        payload.price_value = payload.price_value !== '' ? parseFloat(payload.price_value) : null;
        payload.category_id = payload.category_id || null;
        onSave(payload, features);
    };

    const serviceCategories = categories.filter(c => c.type !== 'product');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{initialData ? 'Edit Service' : 'New Service'}</h3>
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
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Subtitle / Tagline</label>
                                <input name="subtitle" type="text" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.subtitle} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Short Description</label>
                                <textarea name="short_description" rows={2} className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.short_description} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Category & Pricing */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Category & Pricing</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Category</label>
                                <select name="category_id" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.category_id} onChange={handleChange}>
                                    <option value="">None</option>
                                    {serviceCategories.map((cat: Category) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Pricing Model</label>
                                <select name="pricing_model" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.pricing_model} onChange={handleChange}>
                                    <option value="fixed">Fixed</option>
                                    <option value="starting_at">Starting At</option>
                                    <option value="on_request">On Request</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Price Value</label>
                                <input name="price_value" type="number" step="0.01" placeholder="0.00" disabled={formData.pricing_model === 'on_request'} className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm disabled:opacity-50" value={formData.price_value} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Media</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Image URL</label>
                                <input name="image_url" type="text" placeholder="https://..." className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.image_url} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Icon (Lucide name)</label>
                                <input name="icon" type="text" placeholder="e.g. Layers, Zap, Globe" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.icon} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Call to Action</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">CTA Label</label>
                                <input name="cta_label" type="text" placeholder="Get Started" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.cta_label} onChange={handleChange} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">CTA Link</label>
                                <input name="cta_link" type="text" placeholder="/contact" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.cta_link} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Features / Deliverables */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Features / Deliverables</h4>
                            <button type="button" onClick={addFeature} className="flex items-center gap-1 px-2 py-1 text-xs font-bold text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:hover:bg-teal-500/10 rounded-lg transition-colors">
                                <Icons.Plus size={14} /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {features.map((feature, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <input type="text" placeholder="Feature title" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={feature.title} onChange={(e) => updateFeature(i, 'title', e.target.value)} />
                                        <input type="text" placeholder="Description (optional)" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={feature.description} onChange={(e) => updateFeature(i, 'description', e.target.value)} />
                                    </div>
                                    <button type="button" onClick={() => removeFeature(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors mt-0.5">
                                        <Icons.Close size={14} />
                                    </button>
                                </div>
                            ))}
                            {features.length === 0 && (
                                <p className="text-xs text-zinc-400 italic">No features added yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 mb-3">Content</h4>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Full Description</label>
                        <textarea name="full_description" rows={6} className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.full_description} onChange={handleChange} />
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

                    {/* Display Order */}
                    <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Display Order</label>
                        <input name="display_order" type="number" className="w-32 p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.display_order} onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))} />
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700">Cancel</button>
                    <button onClick={handleSubmit} className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold">
                        {initialData ? 'Save Changes' : 'Create Service'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function ServicesAdminPage() {
    const { data: dbServices, loading, update, remove, refresh } = useCatalogTable<any>('services');
    const { data: dbCategories } = useCatalogTable<any>('categories');

    const services = useMemo(() => dbServices.map(adaptService), [dbServices]);
    const categories = useMemo(() => dbCategories.map(adaptCategory), [dbCategories]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Service | undefined>(undefined);
    const [editFeatures, setEditFeatures] = useState<FeatureInput[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const filtered = useMemo(() => {
        if (filterStatus === 'all') return services;
        return services.filter((s: Service) => s.status === filterStatus);
    }, [services, filterStatus]);

    const handleCreate = () => {
        setEditingItem(undefined);
        setEditFeatures([]);
        setIsModalOpen(true);
    };

    const handleEdit = async (item: Service) => {
        const rawFeatures = await getServiceFeatures(item.id);
        setEditingItem(item);
        setEditFeatures(rawFeatures.map((f: any) => ({ title: f.title, description: f.description || '' })));
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            await remove(id);
        }
    };

    const handleSave = async (data: any, features: FeatureInput[]) => {
        if (editingItem) {
            await update(editingItem.id, data);
            await setServiceFeatures(editingItem.id, features.map((f, i) => ({ ...f, display_order: i })));
        } else {
            const { data: newService, error } = await supabase
                .from('services')
                .insert(data)
                .select('id')
                .single();
            if (newService) {
                await setServiceFeatures(newService.id, features.map((f, i) => ({ ...f, display_order: i })));
            }
        }
        setIsModalOpen(false);
        refresh();
    };

    const getCategoryName = (categoryId: string | null) => {
        if (!categoryId) return null;
        const cat = categories.find((c: Category) => c.id === categoryId);
        return cat?.name || null;
    };

    const pricingLabel = (model: string, value: number | null) => {
        switch (model) {
            case 'fixed': return value != null ? `$${value}` : 'Fixed';
            case 'starting_at': return value != null ? `From $${value}` : 'Starting at';
            case 'on_request': return 'On request';
            case 'custom': return 'Custom';
            default: return model;
        }
    };

    return (
        <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Services</h1>
                    <p className="text-zinc-500 text-sm">Manage your service offerings.</p>
                </div>
                <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all">
                    <Icons.Plus size={18} /> New Service
                </button>
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-6">
                {['all', 'draft', 'published'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filterStatus === status
                            ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                            : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                        }`}
                    >
                        {status === 'all' ? 'All' : status}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-white"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-10">
                    {filtered.map((service: Service) => (
                        <div key={service.id} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 relative">
                            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(service)} className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full hover:scale-105 transition-transform"><Icons.Edit size={14} /></button>
                                <button onClick={() => handleDelete(service.id)} className="p-2 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full hover:scale-105 transition-transform"><Icons.Trash size={14} /></button>
                            </div>

                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center shrink-0">
                                    <Icons.Wrench size={18} className="text-violet-600 dark:text-violet-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{service.title}</h3>
                                    {service.subtitle && (
                                        <p className="text-xs text-zinc-500 mt-0.5">{service.subtitle}</p>
                                    )}
                                </div>
                            </div>

                            {service.shortDescription && (
                                <p className="text-xs text-zinc-500 mb-4 line-clamp-2">{service.shortDescription}</p>
                            )}

                            <div className="flex flex-wrap gap-2">
                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${service.status === 'published' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'}`}>{service.status}</span>
                                <span className="px-2 py-0.5 text-[10px] font-medium text-zinc-500 bg-zinc-50 dark:bg-zinc-800 rounded-md">
                                    {pricingLabel(service.pricingModel, service.priceValue)}
                                </span>
                                {getCategoryName(service.categoryId) && (
                                    <span className="px-2 py-0.5 text-[10px] font-medium text-teal-600 bg-teal-50 dark:bg-teal-500/10 dark:text-teal-400 rounded-md">
                                        {getCategoryName(service.categoryId)}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-20 text-center text-zinc-400">
                            <Icons.Wrench size={40} className="mx-auto mb-3 opacity-30" />
                            <p>No services found. Create one to get started.</p>
                        </div>
                    )}
                </div>
            )}

            <ServiceFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingItem}
                categories={categories}
                initialFeatures={editFeatures}
            />
        </div>
    );
}
