-- ============================================
-- Migration 025: Fix tenant + associate all data
-- Creates principal-admin tenant, adds tenant_id
-- to products, and links all existing data
-- ============================================

-- 1. Create the principal-admin tenant
INSERT INTO tenants (name, slug, status)
VALUES ('LIVV', 'principal-admin', 'active')
ON CONFLICT (slug) DO NOTHING;

-- 2. Add tenant_id to products if missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'tenant_id') THEN
        ALTER TABLE products ADD COLUMN tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 3. Associate ALL portfolio_items with principal-admin tenant
UPDATE portfolio_items
SET tenant_id = (SELECT id FROM tenants WHERE slug = 'principal-admin' LIMIT 1)
WHERE tenant_id IS NULL;

-- 4. Associate ALL products with principal-admin tenant
UPDATE products
SET tenant_id = (SELECT id FROM tenants WHERE slug = 'principal-admin' LIMIT 1)
WHERE tenant_id IS NULL;

-- 5. Seed client_logos (currently empty in DB, hardcoded in frontend)
INSERT INTO client_logos (tenant_id, name, logo_url, website_url, is_visible, sort_order, category)
SELECT t.id, v.name, v.logo_url, v.website_url, true, v.sort_order, v.category
FROM tenants t, (VALUES
    ('Blackbox AI',  '/logos-header/blackbox.png', 'https://www.blackbox.ai/',       1, 'tech'),
    ('Buda.com',     '/logos-header/buda.png',     'https://www.buda.com/argentina',  2, 'fintech'),
    ('HeyGen',       '/logos-header/heygen.png',   'https://www.heygen.com/',         3, 'tech'),
    ('ViewFi',       '/logos-header/logo-6.png',   'https://viewfi.live/',            4, 'tech'),
    ('RE/MAX',       '/logos-header/logo-7.png',   'https://www.remax.com.ar/',       5, 'real-estate'),
    ('Sacoa',        '/logos-header/sacoa.png',    'https://sacoa.com/',              6, 'entertainment'),
    ('Wortise',      '/logos-header/wortise.png',  'https://wortise.com/es',          7, 'tech'),
    ('Sunbird',      '/logos-header/sunbird.png',  'https://sunbird.com/',            8, 'tech'),
    ('Gio',          '/logos-header/gio.png',      '#',                               9, 'other')
) AS v(name, logo_url, website_url, sort_order, category)
WHERE t.slug = 'principal-admin'
AND NOT EXISTS (SELECT 1 FROM client_logos LIMIT 1);
