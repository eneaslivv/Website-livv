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

    // First 1-2 paragraphs anchor the challenge block with the sidebar (tools + kpis);
    // the rest get interleaved with gallery images below.
    const INTRO_PARAGRAPHS = paragraphs.length > 3 ? 2 : 1
    const intro = paragraphs.slice(0, INTRO_PARAGRAPHS)
    const rest = paragraphs.slice(INTRO_PARAGRAPHS)

    blocks.push({
        type: "challenge",
        label: "Overview",
        heading: item.subtitle || `Case Study — ${item.title}`,
        paragraphs: intro.length
            ? intro
            : [item.description || `An overview of the ${item.title} project.`],
        tools: tools.slice(0, 8),
        kpis: [],
        sort_order: order++,
    })

    // Interleave remaining paragraphs with gallery images so long writeups
    // get broken up visually. When images outnumber paragraphs, pair extras
    // side-by-side; when paragraphs outnumber images, the leftover text
    // blocks stack after the last image.
    let imgIdx = 0
    let pIdx = 0
    let showcaseCount = 0

    const totalSteps = Math.max(gallery.length, rest.length)
    for (let step = 0; step < totalSteps; step++) {
        if (imgIdx < gallery.length) {
            const isFirst = showcaseCount === 0
            // First showcase stands alone; subsequent ones pair when possible
            const pairs = isFirst ? 1 : Math.min(2, gallery.length - imgIdx)
            const a = gallery[imgIdx]
            const b = pairs === 2 ? gallery[imgIdx + 1] : undefined
            blocks.push({
                type: "image_showcase",
                label: isFirst ? "Interface" : showcaseCount === 1 ? "High Fidelity Interface" : "Details",
                layout: pairs === 1 ? "single" : "side_by_side",
                images: [
                    { url: a, alt: `${item.title} interface ${imgIdx + 1}`, theme: "light" },
                    ...(b
                        ? [{ url: b, alt: `${item.title} interface ${imgIdx + 2}`, theme: "dark" as const }]
                        : []),
                ],
                sort_order: order++,
            })
            imgIdx += pairs
            showcaseCount++
        }

        if (pIdx < rest.length) {
            blocks.push({
                type: "text",
                content: rest[pIdx],
                sort_order: order++,
            })
            pIdx++
        }
    }

    const palette = (item.colors || []).filter(Boolean)
    const hasPalette = palette.length > 0 || !!item.color
    const colors = hasPalette
        ? (palette.length ? palette : [item.color!]).slice(0, 6).map((hex, i) => ({
              name: i === 0 ? "Primary" : i === 1 ? "Accent" : i === 2 ? "Surface" : `Color ${i + 1}`,
              hex,
          }))
        : []
    blocks.push({
        type: "design_system",
        label: "Design Language",
        heading: "System & Assets",
        description:
            "A comprehensive set of foundational elements defining the visual hierarchy and interaction patterns.",
        colors,
        sort_order: order++,
    })

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
            const authored = Array.isArray(block.colors) ? block.colors.filter(Boolean) : []
            if (authored.length > 0) return { ...block, colors: authored }
            const palette = (item.colors || []).filter(Boolean)
            if (palette.length === 0 && !item.color) return block
            const colors = (palette.length ? palette : [item.color!]).slice(0, 6).map((hex, i) => ({
                name: i === 0 ? "Primary" : i === 1 ? "Accent" : i === 2 ? "Surface" : `Color ${i + 1}`,
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
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

    const authoredTypes = new Set(hydrated.map((b) => b.type))
    const authorHasBody = authoredTypes.has("image_showcase") || authoredTypes.has("text")

    const pickAuthored = (type: ContentBlock["type"]) => hydrated.filter((b) => b.type === type)
    const pickDefault = (type: ContentBlock["type"]) => defaults.find((b) => b.type === type)

    const result: ContentBlock[] = []

    // Hero
    if (authoredTypes.has("hero_image")) result.push(...pickAuthored("hero_image"))
    else {
        const hero = pickDefault("hero_image")
        if (hero) result.push(hero)
    }

    // Challenge — keep max 2 paragraphs in the sidebar block; overflow becomes
    // interleavable text blocks so long writeups don't stack into a wall.
    const challengeOverflow: ContentBlock[] = []
    if (authoredTypes.has("challenge")) {
        const authoredChallenges = pickAuthored("challenge") as Extract<ContentBlock, { type: "challenge" }>[]
        authoredChallenges.forEach((ch) => {
            const paras = ch.paragraphs || []
            if (paras.length > 2) {
                result.push({ ...ch, paragraphs: paras.slice(0, 2) })
                paras.slice(2).forEach((p) =>
                    challengeOverflow.push({ type: "text", content: p, sort_order: 0 }),
                )
            } else {
                result.push(ch)
            }
        })
    } else {
        const ch = pickDefault("challenge")
        if (ch) result.push(ch)
    }

    // Body — interleaved image_showcase + text
    if (authorHasBody || challengeOverflow.length > 0) {
        // Author controls the body: emit their blocks in authored order plus any
        // challenge overflow text, then weave unused gallery images between
        // consecutive text blocks so the page reads as text → image → text → image.
        const authoredBody = hydrated.filter(
            (b) => b.type === "image_showcase" || b.type === "text" || b.type === "heading" || b.type === "quote",
        )
        const bodyBlocks: ContentBlock[] = [...challengeOverflow, ...authoredBody]

        const cover = pickCover(item)
        const gallery = pickGalleryImages(item, cover)
        const authoredUrls = new Set(
            hydrated
                .filter((b): b is Extract<ContentBlock, { type: "image_showcase" }> => b.type === "image_showcase")
                .flatMap((b) => b.images.map((i) => i.url))
                .filter(Boolean),
        )
        const unused = gallery.filter((url) => !authoredUrls.has(url))

        // Build a queue of showcase blocks from unused gallery (pairs when possible).
        const extraShowcases: ContentBlock[] = []
        for (let i = 0; i < unused.length; i += 2) {
            const a = unused[i]
            const b = unused[i + 1]
            extraShowcases.push({
                type: "image_showcase",
                label: "More",
                layout: b ? "side_by_side" : "single",
                images: [
                    { url: a, alt: `${item.title} extra ${i + 1}`, theme: "light" },
                    ...(b ? [{ url: b, alt: `${item.title} extra ${i + 2}`, theme: "dark" as const }] : []),
                ],
                sort_order: 0,
            })
        }

        const isTextish = (b: ContentBlock | undefined) =>
            !!b && (b.type === "text" || b.type === "quote" || b.type === "heading")

        let extraIdx = 0
        for (let i = 0; i < bodyBlocks.length; i++) {
            const current = bodyBlocks[i]
            result.push(current)
            // Inject an extra showcase after a text block whenever the next block
            // is also text (or the body ends), to avoid stacked text walls.
            const next = bodyBlocks[i + 1]
            if (isTextish(current) && extraIdx < extraShowcases.length && (!next || isTextish(next))) {
                result.push(extraShowcases[extraIdx++])
            }
        }
        // Append any remaining extras at the end.
        while (extraIdx < extraShowcases.length) {
            result.push(extraShowcases[extraIdx++])
        }
    } else {
        // No authored body → use the interleaved default image+text flow.
        result.push(
            ...defaults.filter((b) => b.type === "image_showcase" || b.type === "text"),
        )
    }

    // Design system
    if (authoredTypes.has("design_system")) result.push(...pickAuthored("design_system"))
    else {
        const ds = pickDefault("design_system")
        if (ds) result.push(ds)
    }

    // Banner
    if (authoredTypes.has("banner")) result.push(...pickAuthored("banner"))
    else {
        const bn = pickDefault("banner")
        if (bn) result.push(bn)
    }

    return result.map((b, i) => ({ ...b, sort_order: i }))
}
