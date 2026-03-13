-- ============================================
-- Migration 024: Media Support
-- Add video/gif support + storage bucket setup
-- ============================================

-- Add media fields to portfolio_items
DO $$
BEGIN
    -- Type of cover media: 'image', 'video', 'gif'
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'media_type') THEN
        ALTER TABLE portfolio_items ADD COLUMN media_type TEXT DEFAULT 'image';
    END IF;

    -- Video/GIF URL (Vimeo, YouTube, direct mp4/webm, or GIF)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'video_url') THEN
        ALTER TABLE portfolio_items ADD COLUMN video_url TEXT;
    END IF;

    -- Thumbnail for video items (shown before play)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_items' AND column_name = 'thumbnail') THEN
        ALTER TABLE portfolio_items ADD COLUMN thumbnail TEXT;
    END IF;
END $$;

-- Add media fields to products
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'media_type') THEN
        ALTER TABLE products ADD COLUMN media_type TEXT DEFAULT 'image';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'video_url') THEN
        ALTER TABLE products ADD COLUMN video_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'thumbnail') THEN
        ALTER TABLE products ADD COLUMN thumbnail TEXT;
    END IF;
END $$;

-- ============================================
-- Storage bucket for portfolio media
-- ============================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'portfolio-media',
    'portfolio-media',
    true,
    52428800, -- 50MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: public read
CREATE POLICY "portfolio_media_public_read"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'portfolio-media');

-- Storage RLS: authenticated upload/update/delete
CREATE POLICY "portfolio_media_auth_insert"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "portfolio_media_auth_update"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'portfolio-media');

CREATE POLICY "portfolio_media_auth_delete"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'portfolio-media');
