import { ContentBlock, PortfolioItem } from "@/types/livv-os"

function pickCover(item: PortfolioItem): string | undefined {
    const coverMedia = item.media?.find((m) => m.is_cover)
    if (coverMedia?.url) return coverMedia.url
    if (item.image) return item.image
    return item.media?.[0]?.url || item.thumbnail || undefined
}

function pickGalleryImages(item: PortfolioItem, excludeUrl?: string): string[] {
    const fromMedia = (item.media || []).map((m) => m.url)
    const fromGallery = item.gallery || []
    const all = [...fromMedia, ...fromGallery]
    const seen = new Set<string>()
    return all.filter((url) => {
        if (!url || url === excludeUrl || seen.has(url)) return false
        seen.add(url)
        return true
    })
}

function splitServices(services?: string): string[] {
    if (!services) return []
    return services
        .split(/[,;/|]/)
        .map((s) => s.trim())
        .filter(Boolean)
}

function splitDescription(desc?: string): string[] {
    if (!desc) return []
    const normalized = desc.replace(/\r\n/g, "\n").trim()
    const paragraphs = normalized.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
    if (paragraphs.length > 1) return paragraphs
    return normalized
        .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ])/)
        .reduce<string[]>((acc, sentence) => {
            const last = acc[acc.length - 1]
            if (!last || last.length > 160) acc.push(sentence.trim())
            else acc[acc.length - 1] = `${last} ${sentence.trim()}`.trim()
            return acc
        }, [])
        .filter(Boolean)
}

/**
 * Generate a full pattern-compliant content_blocks array from the basic fields of a PortfolioItem.
 * Used as a fallback so every CMS-loaded project renders the Figma case-study pattern
 * (hero → challenge → showcase → design system → banner), even when the author hasn't
 * authored explicit content_blocks yet.
 */
export function generateDefaultBlocks(item: PortfolioItem): ContentBlock[] {
    const cover = pickCover(item)
    const gallery = pickGalleryImages(item, cover)
    const tools = splitServices(item.services).concat(item.tech_tags || [])
    const paragraphs = splitDescription(item.description)

    const blocks: ContentBlock[] = []
    let order = 0

    if (cover) {
        blocks.push({
            type: "hero_image",
            image_url: cover,
            alt: `${item.title} hero`,
            sort_order: order++,
        })
    }

    blocks.push({
        type: "challenge",
        label: "The Challenge",
        heading: item.subtitle || `${item.title} — a focused case study.`,
        paragraphs: paragraphs.length
            ? paragraphs
            : [item.description || `An overview of the ${item.title} project.`],
        tools: tools.slice(0, 8),
        kpis: [],
        sort_order: order++,
    })

    if (gallery[0]) {
        blocks.push({
            type: "image_showcase",
            label: "Interface",
            layout: "single",
            images: [{ url: gallery[0], alt: `${item.title} interface` }],
            sort_order: order++,
        })
    }

    // Pair remaining gallery items into side_by_side showcases so every uploaded
    // media renders on the detail page.
    for (let i = 1; i < gallery.length; i += 2) {
        const a = gallery[i]
        const b = gallery[i + 1]
        if (!a) break
        blocks.push({
            type: "image_showcase",
            label: i === 1 ? "High Fidelity Interface" : "Details",
            layout: "side_by_side",
            images: [
                { url: a, alt: `${item.title} interface ${i}`, theme: "light" },
                ...(b ? [{ url: b, alt: `${item.title} interface ${i + 1}`, theme: "dark" as const }] : []),
            ],
            sort_order: order++,
        })
    }

    const palette = (item.colors || []).filter(Boolean)
    if (palette.length > 0 || item.color) {
        const colors = (palette.length ? palette : [item.color!]).slice(0, 4).map((hex, i) => ({
            name: i === 0 ? "Primary" : i === 1 ? "Accent" : `Color ${i + 1}`,
            hex,
        }))
        blocks.push({
            type: "design_system",
            label: "Design Language",
            heading: "System & Assets",
            description:
                "Foundational elements defining the visual hierarchy and interaction patterns used across the project.",
            colors,
            sort_order: order++,
        })
    }

    blocks.push({
        type: "banner",
        heading: "Let's build something",
        subtext: "extraordinary.",
        background_color: "#1a1a1a",
        cta_label: "Start a project",
        cta_href: "/contact",
        sort_order: order++,
    })

    return blocks
}

const BLOCK_PATTERN_ORDER: ContentBlock["type"][] = [
    "hero_image",
    "challenge",
    "image_showcase",
    "design_system",
    "banner",
]

/**
 * Merge author-provided blocks with defaults so the canonical pattern is always present.
 * Author blocks win when the same "slot" exists; otherwise defaults fill the gap.
 * A "slot" is a block type, except `image_showcase` which we allow to repeat.
 */
/**
 * Hydrate an authored block that was saved with empty placeholder fields.
 * Returns null if the block is still empty and has no data to recover from the item.
 */
function hydrateBlock(block: ContentBlock, item: PortfolioItem): ContentBlock | null {
    const cover = pickCover(item)
    const gallery = pickGalleryImages(item, cover)

    switch (block.type) {
        case "hero_image": {
            if (!block.image_url || block.image_url.trim() === "") {
                if (!cover) return null
                return { ...block, image_url: cover, alt: block.alt || `${item.title} hero` }
            }
            return block
        }
        case "image_showcase": {
            const realImages = (block.images || []).filter((img) => img.url && img.url.trim() !== "")
            if (realImages.length > 0) return { ...block, images: realImages }
            if (gallery.length === 0) return null
            const layout = block.layout || "side_by_side"
            const max = layout === "single" ? 1 : 2
            return {
                ...block,
                images: gallery.slice(0, max).map((url, i) => ({
                    url,
                    alt: `${item.title} ${block.label || "interface"} ${i + 1}`,
                    theme: (i % 2 === 0 ? "light" : "dark") as "light" | "dark",
                })),
            }
        }
        case "design_system": {
            if (block.colors && block.colors.length > 0) return block
            const palette = (item.colors || []).filter(Boolean)
            if (palette.length === 0 && !item.color) return block
            const colors = (palette.length ? palette : [item.color!]).slice(0, 4).map((hex, i) => ({
                name: i === 0 ? "Primary" : i === 1 ? "Accent" : `Color ${i + 1}`,
                hex,
            }))
            return { ...block, colors }
        }
        default:
            return block
    }
}

export function withPatternDefaults(
    item: PortfolioItem,
    authored: ContentBlock[] | undefined | null,
): ContentBlock[] {
    const clean = (authored || []).filter(Boolean)
    if (clean.length === 0) return generateDefaultBlocks(item)

    const defaults = generateDefaultBlocks(item)
    const hydrated = clean
        .map((b) => hydrateBlock(b, item))
        .filter((b): b is ContentBlock => b !== null)

    const authoredTypes = new Set(hydrated.map((b) => b.type))

    // How many usable gallery items does the author currently show?
    const cover = pickCover(item)
    const gallery = pickGalleryImages(item, cover)
    const authoredShowcaseUrls = new Set(
        hydrated
            .filter((b): b is Extract<ContentBlock, { type: "image_showcase" }> => b.type === "image_showcase")
            .flatMap((b) => b.images.map((img) => img.url))
            .filter(Boolean),
    )
    const unusedGallery = gallery.filter((url) => !authoredShowcaseUrls.has(url))

    const filled: ContentBlock[] = [...hydrated]
    for (const type of BLOCK_PATTERN_ORDER) {
        if (type === "image_showcase") {
            if (!authoredTypes.has("image_showcase")) {
                filled.push(...defaults.filter((b) => b.type === "image_showcase"))
            } else if (unusedGallery.length > 0) {
                // Author had showcases but there are still gallery items not rendered —
                // append side_by_side blocks for the leftovers.
                for (let i = 0; i < unusedGallery.length; i += 2) {
                    const a = unusedGallery[i]
                    const b = unusedGallery[i + 1]
                    filled.push({
                        type: "image_showcase",
                        label: "More",
                        layout: "side_by_side",
                        images: [
                            { url: a, alt: `${item.title} extra ${i + 1}`, theme: "light" },
                            ...(b
                                ? [{ url: b, alt: `${item.title} extra ${i + 2}`, theme: "dark" as const }]
                                : []),
                        ],
                        sort_order: 999 + i,
                    })
                }
            }
            continue
        }
        if (!authoredTypes.has(type)) {
            const fallback = defaults.find((b) => b.type === type)
            if (fallback) filled.push(fallback)
        }
    }

    return filled
        .map((b, i) => ({ ...b, sort_order: b.sort_order ?? i }))
        .sort((a, b) => {
            const pa = BLOCK_PATTERN_ORDER.indexOf(a.type)
            const pb = BLOCK_PATTERN_ORDER.indexOf(b.type)
            if (pa !== pb && pa !== -1 && pb !== -1) return pa - pb
            return (a.sort_order || 0) - (b.sort_order || 0)
        })
}
