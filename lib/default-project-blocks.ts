import { ContentBlock, PortfolioItem } from "@/types/livv-os"

function pickCover(item: PortfolioItem): string | undefined {
    const coverMedia = item.media?.find((m) => m.is_cover)
    if (coverMedia?.url) return coverMedia.url
    if (item.image) return item.image
    return item.media?.[0]?.url || item.thumbnail || undefined
}

function pickGalleryImages(item: PortfolioItem, excludeUrl?: string): string[] {
    const fromMedia = (item.media || [])
        .filter((m) => m.type !== "video")
        .map((m) => m.url)
    const fromGallery = item.gallery || []
    const all = [...fromMedia, ...fromGallery]
    return all.filter((url) => !!url && url !== excludeUrl)
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

    if (gallery.length >= 2) {
        blocks.push({
            type: "image_showcase",
            label: "High Fidelity Interface",
            layout: "side_by_side",
            images: [
                { url: gallery[1], alt: `${item.title} interface A`, theme: "light" },
                {
                    url: gallery[2] || gallery[1],
                    alt: `${item.title} interface B`,
                    theme: "dark",
                },
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
export function withPatternDefaults(
    item: PortfolioItem,
    authored: ContentBlock[] | undefined | null,
): ContentBlock[] {
    const clean = (authored || []).filter(Boolean)
    if (clean.length === 0) return generateDefaultBlocks(item)

    const defaults = generateDefaultBlocks(item)
    const authoredTypes = new Set(clean.map((b) => b.type))

    const filled: ContentBlock[] = [...clean]
    for (const type of BLOCK_PATTERN_ORDER) {
        if (type === "image_showcase") continue
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
