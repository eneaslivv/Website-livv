/**
 * Editorial case study — el modelo de la plantilla de Figma
 * («Case study · PR Tool (plantilla LIVV)», archivo T3vQBL2pES3eDex27Kp3sW).
 *
 * Por qué un modelo aparte y no más tipos de `ContentBlock`: el renderer viejo
 * arma una columna de bloques sueltos, y esta plantilla es lo contrario —
 * secciones numeradas con cabecera propia, que el índice lateral necesita
 * poder recorrer. Meterlo en `ContentBlock` obligaba a que cada bloque supiera
 * a qué sección pertenece; así la sección es la unidad y el índice sale solo.
 *
 * Vive igual dentro de `portfolio_items.content_blocks`, como un único bloque
 * `{ type: 'editorial', doc }`. El renderer viejo descarta los tipos que no
 * conoce, así que una fila con este bloque no rompe nada si algo la lee con el
 * camino anterior.
 */

/** Un valor que el Figma todavía no tiene: se muestra, pero se ve que falta. */
export interface EditorialField {
    label: string
    value: string
    /** true = en el Figma es un placeholder entre corchetes, no un dato real. */
    pending?: boolean
}

export type EditorialItem =
    | {
          kind: 'figure'
          url: string
          /** Medidas reales del archivo: sin ellas la página salta al cargar. */
          w?: number
          h?: number
          alt?: string
          caption?: string
          label?: string
          /** `bleed` = sin tarjeta ni padding, la imagen ocupa todo el ancho. */
          tone?: 'light' | 'dark' | 'bleed'
      }
    | {
          kind: 'grid'
          cols?: 2 | 3 | 4
          label?: string
          items: {
              url: string
              w?: number
              h?: number
              alt?: string
              caption?: string
              portrait?: boolean
          }[]
      }
    /** Bajada con etiqueta chica arriba: «Manual de identidad», «Onboarding». */
    | { kind: 'note'; label?: string; text: string }
    | { kind: 'video'; url: string; poster?: string; label?: string; caption?: string }
    /** Hueco reservado: en el Figma es un marco punteado sin contenido. */
    | { kind: 'slot'; title: string; note?: string }
    | { kind: 'palette'; label?: string; colors: { name: string; hex: string }[] }
    | {
          kind: 'typespecimen'
          faces: { name: string; note?: string; weights?: string[]; serif?: boolean }[]
      }
    | { kind: 'typescale'; rows: { label: string; size: string; text: string }[] }
    | { kind: 'fields'; rows: EditorialField[] }
    | { kind: 'metrics'; note?: string; items: { value: string; label: string; pending?: boolean }[] }
    | {
          kind: 'sitemap'
          heading?: string
          description?: string
          rootLabel?: string
          slugs: string[]
      }
    | { kind: 'next'; label: string; title: string; href: string }

export interface EditorialSection {
    /** Ancla del índice lateral. */
    id: string
    title: string
    intro?: string
    items: EditorialItem[]
}

export interface EditorialDoc {
    /** «PRODUCT DESIGN / CASE STUDY» */
    kicker?: string
    title: string
    /** La bajada mezcla redonda e itálica serif, como en el Figma. */
    tagline?: { before?: string; em?: string; after?: string }
    meta?: EditorialField[]
    sections: EditorialSection[]
}

export interface EditorialBlock {
    type: 'editorial'
    sort_order: number
    doc: EditorialDoc
}

/** Lee el bloque editorial de una fila, si lo tiene. */
export function findEditorialDoc(blocks: unknown): EditorialDoc | null {
    if (!Array.isArray(blocks)) return null
    const b = blocks.find(
        (x) => x && typeof x === 'object' && (x as { type?: string }).type === 'editorial',
    ) as EditorialBlock | undefined
    return b?.doc?.sections?.length ? b.doc : null
}

/* --------------------------- paleta del hero ----------------------------- */
/*
 * El hero de PR Tool corre un shader (ver EditorialHero.tsx) coloreado a
 * mano: no son los hex de marca en crudo, son tonos de humo suavizados. Acá
 * se automatiza ese mismo criterio para cualquier proyecto: el color más
 * oscuro de sus paletas reales queda tal cual (es la firma del proyecto, el
 * trazo del seno del shader), y el resto se suaviza a la misma familia de
 * tonos que PR Tool eligió a ojo — si no, la marca de Late Bloomer entraría
 * en el shader como amarillo puro y el efecto dejaría de ser sutil.
 */
export const DEFAULT_HERO_PALETTE = ['#2C0405', '#B68C9F', '#B5A479', '#8295B0'] as const

function hexToRgb(hex: string): [number, number, number] {
    const clean = hex.replace('#', '')
    const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean.padEnd(6, '0').slice(0, 6)
    const n = parseInt(full, 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function rgbToHex([r, g, b]: [number, number, number]): string {
    const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')
    return `#${c(r)}${c(g)}${c(b)}`.toUpperCase()
}

function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0
    const l = (max + min) / 2
    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
        else if (max === g) h = (b - r) / d + 2
        else h = (r - g) / d + 4
        h /= 6
    }
    return [h * 360, s * 100, l * 100]
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    h /= 360; s /= 100; l /= 100
    if (s === 0) { const v = l * 255; return [v, v, v] }
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    const hue2rgb = (t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1 / 6) return p + (q - p) * 6 * t
        if (t < 1 / 2) return q
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
        return p
    }
    return [hue2rgb(h + 1 / 3) * 255, hue2rgb(h) * 255, hue2rgb(h - 1 / 3) * 255]
}

/** Mismo matiz, saturación y luz moderadas: el tono de humo de un color de marca. */
function toSmokeTone(hex: string): string {
    const [h] = rgbToHsl(hexToRgb(hex))
    return rgbToHex(hslToRgb(h, 30, 68))
}

/**
 * Arma la paleta de 4 colores que pide el shader del hero a partir de las
 * paletas reales del documento («System» siempre trae al menos una). Sin
 * paleta en el doc, la paleta por defecto es la de PR Tool.
 */
export function pickHeroPalette(doc: EditorialDoc): readonly [string, string, string, string] {
    const hexes: string[] = []
    for (const section of doc.sections) {
        for (const item of section.items) {
            if (item.kind === 'palette') for (const c of item.colors) hexes.push(c.hex)
        }
    }
    if (!hexes.length) return DEFAULT_HERO_PALETTE

    const seen = new Set<string>()
    const unique = hexes.filter((h) => {
        const k = h.toLowerCase()
        if (seen.has(k)) return false
        seen.add(k)
        return true
    })

    let darkest = unique[0]
    let darkestL = 101
    for (const h of unique) {
        const [, , l] = rgbToHsl(hexToRgb(h))
        if (l < darkestL) { darkestL = l; darkest = h }
    }

    const rest = unique.filter((h) => h !== darkest)
    const smokeSource = rest.length ? rest : unique
    const smoke = [0, 1, 2].map((i) => toSmokeTone(smokeSource[i % smokeSource.length]))

    return [darkest, smoke[0], smoke[1], smoke[2]]
}
