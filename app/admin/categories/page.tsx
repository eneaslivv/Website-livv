'use client';

import React, { useState, useMemo } from 'react';
import { Icons } from '@/components/admin/Icons';
import { useCatalogTable } from '@/hooks/useCatalog';
import { adaptCategory } from '@/lib/admin-adapters';
import { generateSlug } from '@/lib/slug';
import type { Category, CategoryType, CategoryStatus } from '@/types/catalog';

const EMPTY_FORM = {
    name: '',
    slug: '',
    description: '',
    image_url: '',
    type: 'both' as CategoryType,
    parent_id: null as string | null,
    display_order: 0,
    status: 'active' as CategoryStatus,
};

const CreateEditModal = ({
    isOpen,
    onClose,
    onSave,
    initialData,
    categories,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData?: Category;
    categories: Category[];
}) => {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

    React.useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                slug: initialData.slug,
                description: initialData.description || '',
                image_url: initialData.imageUrl || '',
                type: initialData.type,
                parent_id: initialData.parentId,
                display_order: initialData.displayOrder,
                status: initialData.status,
            });
            setSlugManuallyEdited(true);
        } else {
            setFormData(EMPTY_FORM);
            setSlugManuallyEdited(false);
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const next = { ...prev, [name]: value };
            if (name === 'name' && !slugManuallyEdited) {
                next.slug = generateSlug(value);
            }
            return next;
        });
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlugManuallyEdited(true);
        setFormData(prev => ({ ...prev, slug: e.target.value }));
    };

    const parentOptions = categories.filter(c => !initialData || c.id !== initialData.id);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{initialData ? 'Edit Category' : 'New Category'}</h3>
                    <button onClick={onClose}><Icons.Close /></button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Name</label>
                        <input name="name" type="text" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.name} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Slug (URL)</label>
                        <input name="slug" type="text" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.slug} onChange={handleSlugChange} />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Type</label>
                        <select name="type" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.type} onChange={handleChange}>
                            <option value="both">Both</option>
                            <option value="product">Product</option>
                            <option value="service">Service</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Parent Category</label>
                        <select name="parent_id" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.parent_id || ''} onChange={(e) => setFormData(prev => ({ ...prev, parent_id: e.target.value || null }))}>
                            <option value="">None (Top Level)</option>
                            {parentOptions.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Display Order</label>
                        <input name="display_order" type="number" className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.display_order} onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))} />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Description</label>
                        <textarea name="description" rows={3} className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.description} onChange={handleChange} />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 uppercase mb-1">Image URL</label>
                        <input name="image_url" type="text" placeholder="https://..." className="w-full p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.image_url} onChange={handleChange} />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="block text-xs font-bold text-zinc-400 uppercase">Status</label>
                        <select name="status" className="p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm" value={formData.status} onChange={handleChange}>
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-6 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700">Cancel</button>
                    <button onClick={() => onSave(formData)} className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold">
                        {initialData ? 'Save Changes' : 'Create Category'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function CategoriesPage() {
    const { data: dbCategories, loading, add, update, remove, refresh } = useCatalogTable<any>('categories');
    const categories = useMemo(() => dbCategories.map(adaptCategory), [dbCategories]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Category | undefined>(undefined);
    const [filterType, setFilterType] = useState<string>('all');

    const filtered = useMemo(() => {
        if (filterType === 'all') return categories;
        return categories.filter((c: Category) => c.type === filterType);
    }, [categories, filterType]);

    const handleCreate = () => {
        setEditingItem(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (item: Category) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            await remove(id);
        }
    };

    const handleSave = async (data: any) => {
        if (editingItem) {
            await update(editingItem.id, data);
        } else {
            await add(data);
        }
        setIsModalOpen(false);
        refresh();
    };

    const getParentName = (parentId: string | null) => {
        if (!parentId) return null;
        const parent = categories.find((c: Category) => c.id === parentId);
        return parent?.name || null;
    };

    const typeBadgeColor = (type: string) => {
        switch (type) {
            case 'product': return 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400';
            case 'service': return 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400';
            default: return 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400';
        }
    };

    return (
        <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Categories</h1>
                    <p className="text-zinc-500 text-sm">Organize products and services into categories.</p>
                </div>
                <button onClick={handleCreate} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all">
                    <Icons.Plus size={18} /> New Category
                </button>
            </div>

            {/* Filter Bar */}
            <div className="flex gap-2 mb-6">
                {['all', 'product', 'service', 'both'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filterType === type
                            ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                            : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                        }`}
                    >
                        {type === 'all' ? 'All' : type}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-white"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-10">
                    {filtered.map((cat: Category) => (
                        <div key={cat.id} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 relative">
                            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(cat)} className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full hover:scale-105 transition-transform"><Icons.Edit size={14} /></button>
                                <button onClick={() => handleDelete(cat.id)} className="p-2 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full hover:scale-105 transition-transform"><Icons.Trash size={14} /></button>
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center">
                                    <Icons.FolderTree size={18} className="text-teal-600 dark:text-teal-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{cat.name}</h3>
                                    <p className="text-[10px] text-zinc-400 font-mono">/{cat.slug}</p>
                                </div>
                            </div>

                            {cat.description && (
                                <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{cat.description}</p>
                            )}

                            <div className="flex flex-wrap gap-2 mt-auto">
                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${typeBadgeColor(cat.type)}`}>{cat.type}</span>
                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md ${cat.status === 'active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500'}`}>{cat.status}</span>
                                {getParentName(cat.parentId) && (
                                    <span className="px-2 py-0.5 text-[10px] font-medium text-zinc-400 bg-zinc-50 dark:bg-zinc-800 rounded-md">↳ {getParentName(cat.parentId)}</span>
                                )}
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-20 text-center text-zinc-400">
                            <Icons.FolderTree size={40} className="mx-auto mb-3 opacity-30" />
                            <p>No categories found. Create one to get started.</p>
                        </div>
                    )}
                </div>
            )}

            <CreateEditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingItem}
                categories={categories}
            />
        </div>
    );
}
