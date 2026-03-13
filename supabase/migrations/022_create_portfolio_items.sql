-- ============================================
-- Migration 022: Portfolio Items Table
-- Full portfolio CMS with tech tags & ordering
-- Idempotent: handles pre-existing table
-- ============================================

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS portfolio_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT,
    services TEXT,
    year TEXT,
    image TEXT,
    featured BOOLEAN DEFAULT false,
    slug TEXT UNIQUE,
    color TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Add new columns if they don't exist (safe for pre-existing tables)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'tech_tags') THEN
        ALTER TABLE portfolio_items ADD COLUMN tech_tags TEXT[] DEFAULT '{}';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'display_order') THEN
        ALTER TABLE portfolio_items ADD COLUMN display_order INT DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'published') THEN
        ALTER TABLE portfolio_items ADD COLUMN published BOOLEAN DEFAULT true;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'updated_at') THEN
        ALTER TABLE portfolio_items ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_items_featured ON portfolio_items(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_portfolio_items_published ON portfolio_items(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_portfolio_items_slug ON portfolio_items(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_display_order ON portfolio_items(display_order);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_portfolio_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS portfolio_items_updated_at ON portfolio_items;
CREATE TRIGGER portfolio_items_updated_at
    BEFORE UPDATE ON portfolio_items
    FOR EACH ROW
    EXECUTE FUNCTION update_portfolio_updated_at();

-- RLS Policies
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "portfolio_items_public_read" ON portfolio_items;
CREATE POLICY "portfolio_items_public_read"
    ON portfolio_items FOR SELECT
    USING (published = true);

DROP POLICY IF EXISTS "portfolio_items_auth_all" ON portfolio_items;
CREATE POLICY "portfolio_items_auth_all"
    ON portfolio_items FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- Seed: Insert portfolio items (skip if they already exist)
-- ============================================

INSERT INTO portfolio_items (title, subtitle, category, services, year, image, featured, slug, color, description, tech_tags, display_order)
SELECT * FROM (VALUES
    ('Internal Management Systems', 'Custom operational tools', 'Internal Tools', 'Development, Operational Tools', '2024', '/images/internal-dashboard.png', true, 'internal-management', '#FFD700', 'Custom operational tools for internal efficiency.', ARRAY['Development', 'Operational Tools'], 1),
    ('Paper', 'Venue & nightlife software', 'SaaS / Product', 'Product Strategy, UI/UX', '2024', '/images/portfolio-2.jpg', true, 'paper', '#769268', 'Venue & nightlife software platform.', ARRAY['Product Strategy', 'UI/UX'], 2),
    ('SEO Blocks Generator', 'Programmatic SEO for Webflow', 'Dev Tools', 'Webflow Development, SEO', '2024', '/images/portfolio-3.jpg', true, 'seo-blocks', '#6DBEDC', 'Programmatic SEO blocks generator for Webflow.', ARRAY['Webflow Development', 'SEO'], 3),
    ('Azqira', 'Digital Experience', 'Fintech / App', 'UI/UX, Development', '2024', '/images/project-mobile.png', true, 'azqira', '#00C853', 'Learn where you create.', ARRAY['UI/UX', 'Development'], 4),
    ('Pr Tool', 'Content Monetization', 'Content Tech', 'App development, Integrations', '2024', '/images/pr-tool.png', true, 'pr-tool', '#E6E6E6', 'App for content creators, affiliate links y Tienda nube full custom integrations.', ARRAY['App development', 'Integrations'], 5),
    ('Sacoa Cashless', 'Design & Animations', 'Enterprise', 'Design, Animations', '2024', '/images/sacoa-cashless.png', true, 'sacoa', '#FF6F00', 'Cashless entertainment platform with design-first approach.', ARRAY['Design', 'Animations'], 6),
    ('Boken', 'Adventure Platform', 'Travel / Platform', 'UI/UX, Development', '2023', '/images/portfolio-6.webp', false, 'boken', '#4A90D9', 'Adventure and travel experiences platform.', ARRAY['UI/UX', 'Development'], 7),
    ('Vario Finance', 'Fintech Dashboard', 'Fintech', 'UI/UX, Dashboard Design', '2023', '/images/portfolio-5.jpg', false, 'vario-finance', '#2E7D32', 'Financial technology dashboard and analytics.', ARRAY['UI/UX', 'Dashboard Design'], 8),
    ('Ecosphere', 'Sustainability Platform', 'GreenTech', 'Branding, Development', '2023', '/images/portfolio-4.jpg', false, 'ecosphere', '#81C784', 'Environmental sustainability tracking platform.', ARRAY['Branding', 'Development'], 9)
) AS v(title, subtitle, category, services, year, image, featured, slug, color, description, tech_tags, display_order)
WHERE NOT EXISTS (SELECT 1 FROM portfolio_items LIMIT 1);
