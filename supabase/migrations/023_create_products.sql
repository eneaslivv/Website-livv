-- ============================================
-- Migration 023: Products Table (Detail Pages)
-- Full product CMS with JSONB for nested data
-- ============================================

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    industry TEXT,
    target TEXT,
    headline TEXT,
    subheadline TEXT,
    solution TEXT,
    accent_color TEXT DEFAULT '#b8836e',
    gradient TEXT,
    dark_gradient TEXT,
    -- Nested data as JSONB for flexibility
    stats JSONB DEFAULT '[]'::jsonb,         -- [{label: string, value: string}]
    problems JSONB DEFAULT '[]'::jsonb,       -- [{title: string, desc: string}]
    features JSONB DEFAULT '[]'::jsonb,       -- [{title: string, desc: string}]
    workflow JSONB DEFAULT '[]'::jsonb,        -- [{step: string, title: string, desc: string}]
    pricing JSONB DEFAULT '{}'::jsonb,         -- {monthly: string, setup: string, includes: string[]}
    -- Media
    hero_image TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,        -- [string] array of image URLs
    -- Meta
    published BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    -- Link to portfolio_items (optional)
    portfolio_item_id UUID REFERENCES portfolio_items(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_products_portfolio_item ON products(portfolio_item_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_products_updated_at();

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read for published products
CREATE POLICY "products_public_read"
    ON products FOR SELECT
    USING (published = true);

-- Authenticated users can manage all products
CREATE POLICY "products_auth_all"
    ON products FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================
-- Seed: Insert existing hardcoded product data
-- ============================================

INSERT INTO products (slug, name, industry, target, headline, subheadline, solution, accent_color, gradient, dark_gradient, stats, problems, features, workflow, pricing, published, display_order) VALUES
(
    'payper',
    'Payper',
    'Hospitality',
    'Restaurant Chains & Hotels',
    'Hospitality Operating System',
    'The complete white-label infrastructure for modern hospitality. Manage orders, kitchen flows, and payments in one unified system.',
    'Payper provides the full stack: QR ordering, Kitchen Display Systems (KDS), and Waiter Apps. Deployed instantly under your brand.',
    '#b8836e',
    'from-[#b8836e] to-[#8a7e74]',
    'from-[#2c2420] to-[#1a1714]',
    '[{"label": "Faster Table Turns", "value": "30%"}, {"label": "Increase in Tip Size", "value": "22%"}, {"label": "Labor Cost Reduction", "value": "15%"}]'::jsonb,
    '[{"title": "Fragmented Tools", "desc": "Operations satisfy 10+ disconnected apps."}, {"title": "Zero Visibility", "desc": "Blind spots in kitchen & inventory data."}, {"title": "Generic POS", "desc": "Rigid systems that don''t fit your workflow."}, {"title": "High Costs", "desc": "Custom dev costs $50k+ and takes months."}]'::jsonb,
    '[{"title": "Smart KDS", "desc": "Automated routing for kitchen stations."}, {"title": "Waiter App", "desc": "Table-side ordering & payments."}, {"title": "Inventory AI", "desc": "Predictive stock management."}, {"title": "White-Label", "desc": "Your logo, domain, and colors."}, {"title": "Payments", "desc": "Integrated global payment gateways."}, {"title": "CRM", "desc": "Guest profiles and loyalty built-in."}]'::jsonb,
    '[{"step": "01", "title": "Brand Configuration", "desc": "Upload your logo, set your primary colors, and connect your custom domain."}, {"step": "02", "title": "Menu & Inventory", "desc": "Import your products, set modifiers, and establish intelligent stock alerts."}, {"step": "03", "title": "Deploy to Stores", "desc": "Print QR codes, distribute waiter access, and mount KDS screens instantly."}]'::jsonb,
    '{"monthly": "$49", "setup": "$499", "includes": ["Full Source License option", "Custom Branding", "Unlimited Locations", "24/7 Priority Support"]}'::jsonb,
    true,
    1
),
(
    'prtool',
    'PRTool',
    'Creator Economy',
    'PR agencies & talent managers',
    'Partnership Operating System',
    'A ready-to-use platform designed specifically for the creator economy, delivered as a white-label solution.',
    'PRTool centralizes the entire collaboration lifecycle. From campaign briefing to automated payments and performance tracking.',
    '#e8a87c',
    'from-[#e8a87c] to-[#c98d65]',
    'from-[#2c2420] to-[#1a1714]',
    '[{"label": "Campaign ROI", "value": "3x"}, {"label": "Hours Saved/Wk", "value": "18h"}, {"label": "Creator Retention", "value": "45%"}]'::jsonb,
    '[{"title": "Chaotic Spreadsheets", "desc": "Manual campaign management scales poorly."}, {"title": "Payment Nightmares", "desc": "Tracking payments for 100s of creators."}, {"title": "No Real ROI", "desc": "Difficulty measuring actual partnership impact."}, {"title": "Fragmented Comms", "desc": "Emails, DMs, and texts are unmanageable."}]'::jsonb,
    '[{"title": "Campaign Dashboard", "desc": "Track every deliverable in real-time."}, {"title": "Auto-Payouts", "desc": "One-click payments to all influencers."}, {"title": "Digital Contracts", "desc": "E-signatures built into the workflow."}, {"title": "ROI Analytics", "desc": "Real performance data for brands."}, {"title": "Client Portals", "desc": "Give brands view-only access."}, {"title": "White-Label", "desc": "Fully branded for your agency."}]'::jsonb,
    '[{"step": "01", "title": "Invite Creators", "desc": "Send branded invites with contract terms embedded."}, {"step": "02", "title": "Track Deliverables", "desc": "Monitor posts, stories, and metrics automatically."}, {"step": "03", "title": "One-Click Invoices", "desc": "Payout all creators instantly when campaigns complete."}]'::jsonb,
    '{"monthly": "$29", "setup": "$299", "includes": ["Campaign manager tools", "Brand customization", "Secure payment flows", "Cloud hosting"]}'::jsonb,
    true,
    2
),
(
    'legalflow',
    'LegalFlow',
    'Legal Tech',
    'Law firms & legal consultants',
    'Legal Automation System',
    'Automate the administrative burden of legal practices. Secure case management, document automation, and client collaboration.',
    'LegalFlow provides a secure, structured environment for case management, document automation, and client collaboration.',
    '#845ec2',
    'from-[#845ec2] to-[#6a40a3]',
    'from-[#2c2420] to-[#1a1714]',
    '[{"label": "Admin Time Saved", "value": "40%"}, {"label": "Client Satisfaction", "value": "98%"}, {"label": "Missed Deadlines", "value": "0%"}]'::jsonb,
    '[{"title": "Manual Filing", "desc": "Hours wasted on document preparation."}, {"title": "Lost Deadlines", "desc": "Inefficient case tracking risks malpractice."}, {"title": "Insecure Data", "desc": "Generic cloud storage isn''t compliant."}, {"title": "Slow Onboarding", "desc": "Client intake takes days, not minutes."}]'::jsonb,
    '[{"title": "Case Timelines", "desc": "Automated tracking of every deadline."}, {"title": "Secure Vault", "desc": "Bank-grade encryption for all files."}, {"title": "Client Portal", "desc": "Secure messaging and file sharing."}, {"title": "Auto-Intake", "desc": "Digital forms populate case files."}, {"title": "Time Tracking", "desc": "Integrated billing and invoicing."}, {"title": "White-Label", "desc": "Your firm''s branding front and center."}]'::jsonb,
    '[{"step": "01", "title": "Digital Intake", "desc": "Clients fill out secure, responsive forms online."}, {"step": "02", "title": "Auto-Generate Docs", "desc": "Templates auto-fill with client data instantly."}, {"step": "03", "title": "Secure Collaboration", "desc": "Clients review and sign strictly within the vault."}]'::jsonb,
    '{"monthly": "$59", "setup": "$999", "includes": ["End-to-end case workflows", "Advanced security features", "Onboarding support", "Custom domain setup"]}'::jsonb,
    true,
    3
);
