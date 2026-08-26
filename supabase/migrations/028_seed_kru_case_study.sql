-- ============================================
-- Migration 028: KRU case study
-- Sitio: livv.page (rebrand de krufood.com)
-- Imágenes: /public/images/kru/*.webp
-- Idempotente: upsert por slug, se puede re-correr.
-- ============================================

-- El tenant sale de los proyectos que ya existen: el RPC público filtra por
-- tenant y una fila sin tenant_id simplemente no aparecería en /work.
INSERT INTO portfolio_items (
    tenant_id,
    title, subtitle, category, services, year, image, featured, slug,
    color, description, tech_tags, display_order, published, content_blocks
) VALUES (
    COALESCE(
        (SELECT tenant_id FROM portfolio_items WHERE tenant_id IS NOT NULL LIMIT 1),
        (SELECT id FROM tenants WHERE slug IN ('livvv', 'principal-admin')
          ORDER BY (slug = 'livvv') DESC LIMIT 1)
    ),
    'KRU',
    'Rebrand & editorial commerce',
    'Brand / E-commerce',
    'Rebrand, Web Design, Art Direction, Conversational AI',
    '2026',
    '/images/kru/cover-home.webp',
    true,
    'kru',
    '#C4A44A',
    'A full rebrand for KRU — from a crowded Shopify storefront to an editorial home where recipes, journal, market and shop speak one language, with a chat assistant that helps you pick your sauce.',
    ARRAY['Figma', 'React', 'Vite', 'Tailwind', 'Shopify', 'Supabase', 'Klaviyo']::TEXT[],
    1,
    true,
    '[{"type":"hero_image","image_url":"/images/kru/cover-home.webp","alt":"KRU — the redesigned home page","sort_order":0},{"type":"challenge","label":"The challenge","heading":"A sauce with a point of view, on a site that had none.","paragraphs":["KRU sells West African hot sauce made in small batches. The old store did not say that. It led with a stock photograph of a London street, stacked its menu into a wall of links, and put a green Buy Now button where the story should have been. The old home page is the first image below.","We rebuilt the whole thing as one editorial system. Thirty-three pages — recipes, philosophy, community, journal and shop — now share a warm identity, a high-contrast serif and a magazine rhythm, so reading a recipe and buying a bottle feel like the same act rather than two different websites.","An interactive shopping assistant sits on every page. It opens with a question instead of a form, answers in plain language, and links straight to the product it recommends."],"tools":["Figma","React","Vite","Tailwind","Shopify","Supabase","Klaviyo"],"kpis":[{"text":"A rebrand carried across 33 pages"},{"text":"One editorial system for recipes and journal"},{"text":"A chat assistant advising every purchase"},{"text":"A shop with a collection per product line"}],"sort_order":1},{"type":"image_showcase","label":"Before / after","layout":"side_by_side","images":[{"url":"/images/kru/before-old-site.webp","alt":"KRU — Before","caption":"Before","theme":"light"},{"url":"/images/kru/after-new-site.webp","alt":"KRU — After","caption":"After","theme":"light"}],"sort_order":2},{"type":"image_showcase","label":"The story","layout":"side_by_side","images":[{"url":"/images/kru/story-founder.webp","alt":"KRU — The founder story","caption":"The founder story","theme":"light"},{"url":"/images/kru/story-forest.webp","alt":"KRU — Rooted in the soil, grown with purpose","caption":"Rooted in the soil, grown with purpose","theme":"light"}],"sort_order":3},{"type":"image_showcase","label":"The craft","layout":"single","images":[{"url":"/images/kru/craft-flatlay.webp","alt":"KRU — Every spice tells a story","caption":"Every spice tells a story","theme":"dark"}],"sort_order":4},{"type":"image_showcase","label":"The product page","layout":"side_by_side","images":[{"url":"/images/kru/product-page.webp","alt":"KRU — The product page","caption":"The product page","theme":"light"},{"url":"/images/kru/product-detail.webp","alt":"KRU — Ingredients, shipping and the rest of the range","caption":"Ingredients, shipping and the rest of the range","theme":"light"}],"sort_order":5},{"type":"image_showcase","label":"The kitchen","layout":"side_by_side","images":[{"url":"/images/kru/kitchen-hero.webp","alt":"KRU — The KRU Kitchen","caption":"The KRU Kitchen","theme":"dark"},{"url":"/images/kru/kitchen-grid.webp","alt":"KRU — Every recipe, one grid","caption":"Every recipe, one grid","theme":"light"}],"sort_order":6},{"type":"image_showcase","label":"In the browser","layout":"side_by_side","images":[{"url":"/images/kru/browser-journal.webp","alt":"KRU — The journal","caption":"The journal","theme":"light"},{"url":"/images/kru/browser-shop.webp","alt":"KRU — The shop","caption":"The shop","theme":"light"},{"url":"/images/kru/browser-spices.webp","alt":"KRU — The spice range","caption":"The spice range","theme":"light"}],"sort_order":7},{"type":"image_showcase","label":"The illustration system","layout":"side_by_side","images":[{"url":"/images/kru/illustrations.webp","alt":"KRU — One painted bottle per heat level","caption":"One painted bottle per heat level","theme":"light"},{"url":"/images/kru/category-marks.webp","alt":"KRU — The four category marks","caption":"The four category marks","theme":"light"}],"sort_order":8},{"type":"image_showcase","label":"The photography","layout":"side_by_side","images":[{"url":"/images/kru/photo-counter.webp","alt":"KRU — Late afternoon on the counter","caption":"Late afternoon on the counter","theme":"light"},{"url":"/images/kru/photo-cooking.webp","alt":"KRU — In the middle of cooking","caption":"In the middle of cooking","theme":"light"},{"url":"/images/kru/photo-shelf.webp","alt":"KRU — The range, on a shelf","caption":"The range, on a shelf","theme":"dark"}],"sort_order":9},{"type":"image_showcase","label":"The shopping assistant","layout":"side_by_side","images":[{"url":"/images/kru/assistant-open.webp","alt":"KRU — It opens with a question, not a form","caption":"It opens with a question, not a form","theme":"light"},{"url":"/images/kru/assistant-chat.webp","alt":"KRU — It recommends, explains and links straight to the product","caption":"It recommends, explains and links straight to the product","theme":"light"}],"sort_order":10},{"type":"image_showcase","label":"The site, out there","layout":"side_by_side","images":[{"url":"/images/kru/laptop-desk.webp","alt":"KRU — The kitchen, on a desk","caption":"The kitchen, on a desk","theme":"light"},{"url":"/images/kru/laptop-outdoors.webp","alt":"KRU — The home, outdoors","caption":"The home, outdoors","theme":"light"}],"sort_order":11},{"type":"image_showcase","label":"Mobile","layout":"side_by_side","images":[{"url":"/images/kru/mobile-home.webp","alt":"KRU on mobile","theme":"dark","caption":"Home"},{"url":"/images/kru/mobile-recipes.webp","alt":"KRU on mobile","theme":"light","caption":"Recipes"},{"url":"/images/kru/mobile-assistant.webp","alt":"KRU on mobile","theme":"light","caption":"The assistant, on the phone"}],"sort_order":12},{"type":"image_showcase","label":"Brand & merch","layout":"side_by_side","images":[{"url":"/images/kru/merch-apron.webp","alt":"KRU — The mark on linen","caption":"The mark on linen","theme":"light"},{"url":"/images/kru/merch-print.webp","alt":"KRU — The illustration, framed","caption":"The illustration, framed","theme":"light"}],"sort_order":13},{"type":"image_showcase","label":"Out of home","layout":"side_by_side","images":[{"url":"/images/kru/ooh-station.webp","alt":"KRU — Platform lightbox","caption":"Platform lightbox","theme":"light"},{"url":"/images/kru/ooh-metro.webp","alt":"KRU — Inside the carriage","caption":"Inside the carriage","theme":"dark"},{"url":"/images/kru/ooh-night.webp","alt":"KRU — Street frame, after dark","caption":"Street frame, after dark","theme":"dark"}],"sort_order":14},{"type":"image_showcase","label":"Where you can find it","layout":"single","images":[{"url":"/images/kru/stockists.webp","alt":"KRU — Kitchens and shops stocking KRU","caption":"Kitchens and shops stocking KRU","theme":"light"}],"sort_order":15},{"type":"design_system","label":"Design language","heading":"Visual system","description":"Cream palette, a high-contrast editorial serif and a supporting sans — pulled from the live site.","typeface":{"name":"Cormorant Garamond + Manrope","weights":[{"value":"300","label":"Light"},{"value":"400","label":"Regular"},{"value":"600","label":"Semibold"},{"value":"700","label":"Bold"}]},"colors":[{"name":"Page","hex":"#F8F5F2"},{"name":"Surface","hex":"#F2EEE9"},{"name":"Ink","hex":"#1C1917"},{"name":"Muted","hex":"#7C716A"},{"name":"Accent","hex":"#C4A44A"}],"sort_order":16},{"type":"banner","heading":"Want a digital home like this for your brand?","subtext":"KRU went from a crowded storefront to an editorial home in one rebrand.","cta_label":"Visit livv.page","cta_href":"https://livv.page/","sort_order":17}]'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
    tenant_id      = COALESCE(portfolio_items.tenant_id, EXCLUDED.tenant_id),
    title          = EXCLUDED.title,
    subtitle       = EXCLUDED.subtitle,
    category       = EXCLUDED.category,
    services       = EXCLUDED.services,
    year           = EXCLUDED.year,
    image          = EXCLUDED.image,
    featured       = EXCLUDED.featured,
    color          = EXCLUDED.color,
    description    = EXCLUDED.description,
    tech_tags      = EXCLUDED.tech_tags,
    published      = EXCLUDED.published,
    content_blocks = EXCLUDED.content_blocks,
    updated_at     = now();
