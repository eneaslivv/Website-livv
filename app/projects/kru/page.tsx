import type { Metadata } from "next"
// @ts-expect-error — componente generado, sin tipos
import KruCaseStudy from "@/components/case-studies/KruCaseStudy"

/**
 * El case study de KRU se sirve con el diseño con el que fue armado, no con el
 * renderer genérico de bloques.
 *
 * Este segmento estático gana sobre `[slug]`, así que la URL sigue siendo la
 * misma y la ficha en /work no cambia. Va a pantalla completa, sin el navbar del
 * sitio: el CSS del componente define `body`, `html` y `*`, y pisaría los
 * estilos de cualquier cosa que compartiera la página. La navegación la trae el
 * propio diseño, arriba a la izquierda.
 */

const TITLE = "KRU — Rebrand & editorial commerce | Case Study by LIVV Creative Studio"
const DESCRIPTION =
    "A full rebrand for KRU — from a crowded Shopify storefront to an editorial home where recipes, journal, market and shop speak one language, with a chat assistant that helps you pick your sauce."

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "https://livvvv.com/projects/kru" },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "https://livvvv.com/projects/kru",
        type: "article",
        images: [{ url: "https://livvvv.com/images/kru/cover-home.webp", width: 2000, height: 1250, alt: "KRU — the redesigned home page" }],
    },
    twitter: {
        card: "summary_large_image",
        title: TITLE,
        description: DESCRIPTION,
        images: ["https://livvvv.com/images/kru/cover-home.webp"],
    },
}

/**
 * El CSS del case study define `body`, así que su tipografía se hereda hacia
 * cualquier cosa montada fuera del componente —el banner de cookies, por ejemplo.
 * El reset universal ya viene acotado a `.kru-cs` desde la instalación; esto sólo
 * devuelve el interlineado.
 */
const AISLAR_OVERLAYS = `
  [data-cookie-banner] { line-height: normal; }
  [data-cookie-banner] p { line-height: 1.35; }
`

export default function KruProjectPage() {
    // Sin prop `data`: el componente trae su propio contenido inlineado. Pasárselo
    // desde acá no funciona — importar un dato de un módulo "use client" desde un
    // componente de servidor devuelve una referencia de cliente, no el objeto, y
    // el componente se quedaba sin `project`. El back link se parchea al instalar.
    return (
        <div className="kru-cs">
            <KruCaseStudy />
            <style>{AISLAR_OVERLAYS}</style>
        </div>
    )
}
