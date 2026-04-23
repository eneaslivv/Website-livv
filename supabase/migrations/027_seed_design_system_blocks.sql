-- ============================================
-- Migration 027: Seed rich design_system blocks
-- Adds a default design_system content block to every portfolio item
-- that doesn't already have one, using the item's own `color` as Primary.
-- Safe to re-run: skips items that already have a design_system block.
-- ============================================

DO $$
DECLARE
    rec RECORD;
    new_block JSONB;
    primary_hex TEXT;
    existing_blocks JSONB;
    has_design_system BOOLEAN;
BEGIN
    FOR rec IN SELECT id, color, content_blocks FROM portfolio_items LOOP
        existing_blocks := COALESCE(rec.content_blocks, '[]'::jsonb);

        -- Check if a design_system block already exists
        SELECT EXISTS (
            SELECT 1 FROM jsonb_array_elements(existing_blocks) AS b
            WHERE b->>'type' = 'design_system'
        ) INTO has_design_system;

        IF has_design_system THEN
            CONTINUE;
        END IF;

        primary_hex := COALESCE(rec.color, '#2A1818');

        new_block := jsonb_build_object(
            'type', 'design_system',
            'label', 'Design Language',
            'heading', 'System & Assets',
            'description', 'A comprehensive set of foundational elements defining the visual hierarchy and interaction patterns.',
            'typeface', jsonb_build_object(
                'name', 'Inter Display',
                'weights', jsonb_build_array(
                    jsonb_build_object('value', '400', 'label', 'Regular'),
                    jsonb_build_object('value', '500', 'label', 'Medium'),
                    jsonb_build_object('value', '600', 'label', 'Semibold')
                )
            ),
            'colors', jsonb_build_array(
                jsonb_build_object('name', 'Primary', 'hex', primary_hex),
                jsonb_build_object('name', 'Accent', 'hex', '#C4A35A'),
                jsonb_build_object('name', 'Surface', 'hex', '#FAF8F3')
            ),
            'spacing', jsonb_build_object(
                'label', 'Spacing',
                'scale', jsonb_build_array(
                    jsonb_build_object('value', '0.25rem', 'token', '4'),
                    jsonb_build_object('value', '0.5rem', 'token', '8'),
                    jsonb_build_object('value', '1rem', 'token', '16')
                ),
                'grid', '8pt Grid System'
            ),
            'components', jsonb_build_object(
                'label', 'Components',
                'items', jsonb_build_array(
                    jsonb_build_object('name', 'Btn.Primary', 'kind', 'button', 'text', 'Action'),
                    jsonb_build_object('name', 'Input.Default', 'kind', 'input', 'text', 'Type...')
                )
            ),
            'sort_order', jsonb_array_length(existing_blocks)
        );

        UPDATE portfolio_items
        SET content_blocks = existing_blocks || jsonb_build_array(new_block)
        WHERE id = rec.id;
    END LOOP;
END $$;
