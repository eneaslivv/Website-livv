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
          items: { url: string; alt?: string; caption?: string; portrait?: boolean }[]
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
