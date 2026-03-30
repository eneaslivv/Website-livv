-- ============================================
-- Blog System Tables
-- ============================================

-- Blog categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cluster_id TEXT,
  display_order INT DEFAULT 0,
  post_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  content_blocks JSONB DEFAULT '[]'::jsonb,
  cover_image TEXT,
  og_image TEXT,
  author_name TEXT DEFAULT 'LIVV Studio',
  author_role TEXT DEFAULT 'Creative Engineering Agency',
  author_avatar TEXT DEFAULT '/assets/logo-new.png',
  category_slug TEXT NOT NULL REFERENCES blog_categories(slug),
  category_name TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  reading_time_minutes INT DEFAULT 5,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  canonical_url TEXT,
  faq_schema JSONB DEFAULT '[]'::jsonb,
  internal_links JSONB DEFAULT '[]'::jsonb,
  cta_type TEXT DEFAULT 'contact',
  cta_link TEXT DEFAULT '/contact',
  cta_text TEXT DEFAULT 'Start Your Project',
  related_post_slugs TEXT[] DEFAULT '{}',
  pillar_page_slug TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_display_order ON blog_posts(display_order);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Public read for published posts
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);

-- Public read for categories
CREATE POLICY "Public can read blog categories"
  ON blog_categories FOR SELECT
  USING (true);

-- Authenticated full access
CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage blog categories"
  ON blog_categories FOR ALL
  USING (auth.role() = 'authenticated');

-- RPC functions
CREATE OR REPLACE FUNCTION get_public_blog_posts(p_tenant_slug TEXT DEFAULT 'livv')
RETURNS SETOF blog_posts
LANGUAGE sql STABLE
AS $$
  SELECT * FROM blog_posts
  WHERE published = true
  ORDER BY created_at DESC;
$$;

CREATE OR REPLACE FUNCTION get_preview_blog_posts(p_tenant_slug TEXT DEFAULT 'livv')
RETURNS SETOF blog_posts
LANGUAGE sql STABLE
AS $$
  SELECT * FROM blog_posts
  ORDER BY created_at DESC;
$$;

CREATE OR REPLACE FUNCTION get_public_blog_post_by_slug(p_slug TEXT)
RETURNS SETOF blog_posts
LANGUAGE sql STABLE
AS $$
  SELECT * FROM blog_posts
  WHERE slug = p_slug AND published = true
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION get_public_blog_posts_by_category(p_category_slug TEXT)
RETURNS SETOF blog_posts
LANGUAGE sql STABLE
AS $$
  SELECT * FROM blog_posts
  WHERE category_slug = p_category_slug AND published = true
  ORDER BY display_order ASC, created_at DESC;
$$;

-- Seed categories
INSERT INTO blog_categories (name, slug, description, cluster_id, display_order) VALUES
  ('Webflow SEO', 'webflow-seo', 'Master search engine optimization for Webflow sites with technical guides, checklists, and real-world case studies.', 'A', 1),
  ('Platform Comparisons', 'platform-comparisons', 'Honest, builder-perspective comparisons between Webflow, Framer, WordPress, Squarespace, and custom code.', 'B', 2),
  ('Framer SEO & Development', 'framer-seo', 'SEO optimization and development best practices for Framer sites.', 'C', 3),
  ('Hiring & Agencies', 'hiring-agencies', 'Guides for hiring web developers, agencies, and freelancers — including pricing, red flags, and what to expect.', 'D', 4),
  ('Technical Integration', 'technical-integration', 'Advanced technical guides on integrating Webflow with Supabase, AI, APIs, and automation tools.', 'E', 5),
  ('Creative Engineering', 'creative-engineering', 'Exploring creative engineering as a discipline — design systems, tech stacks, and the future of building for the web.', 'F', 6),
  ('Industry Guides', 'industry-guides', 'Industry-specific Webflow and web development guides for SaaS, restaurants, e-commerce, and franchise businesses.', 'G', 7)
ON CONFLICT (slug) DO NOTHING;
