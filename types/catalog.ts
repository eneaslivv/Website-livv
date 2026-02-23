// --- CATALOG CMS TYPES ---

export type CategoryType = 'product' | 'service' | 'both';
export type CategoryStatus = 'active' | 'draft';
export type ProductStatus = 'draft' | 'published' | 'archived';
export type PriceType = 'fixed' | 'on_request';
export type ServiceStatus = 'draft' | 'published';
export type PricingModel = 'fixed' | 'starting_at' | 'on_request' | 'custom';

// --- DB-SHAPE INTERFACES (snake_case, matching Supabase rows) ---

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  type: CategoryType;
  parent_id: string | null;
  display_order: number;
  status: CategoryStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductRow {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  featured_image: string | null;
  price: number | null;
  price_type: PriceType;
  is_featured: boolean;
  status: ProductStatus;
  seo_title: string | null;
  seo_description: string | null;
  og_image: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductImageRow {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
}

export interface ProductTagRow {
  id: string;
  product_id: string;
  tag: string;
}

export interface ServiceRow {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  short_description: string | null;
  full_description: string | null;
  image_url: string | null;
  icon: string | null;
  pricing_model: PricingModel;
  price_value: number | null;
  cta_label: string | null;
  cta_link: string | null;
  status: ServiceStatus;
  display_order: number;
  category_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceFeatureRow {
  id: string;
  service_id: string;
  title: string;
  description: string | null;
  display_order: number;
}

// --- FRONTEND INTERFACES (camelCase) ---

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  type: CategoryType;
  parentId: string | null;
  displayOrder: number;
  status: CategoryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  featuredImage: string | null;
  price: number | null;
  priceType: PriceType;
  isFeatured: boolean;
  status: ProductStatus;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImage: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  categories?: Category[];
  tags?: string[];
  images?: ProductImageRow[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  shortDescription: string | null;
  fullDescription: string | null;
  imageUrl: string | null;
  icon: string | null;
  pricingModel: PricingModel;
  priceValue: number | null;
  ctaLabel: string | null;
  ctaLink: string | null;
  status: ServiceStatus;
  displayOrder: number;
  categoryId: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  features?: ServiceFeature[];
}

export interface ServiceFeature {
  id: string;
  serviceId: string;
  title: string;
  description: string | null;
  displayOrder: number;
}
