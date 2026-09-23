import { Instrument_Serif, Inter } from "next/font/google"

/**
 * Las dos tipografías del sistema de PR Tool, medidas en el Figma:
 * Inter organiza la información, Instrument Serif itálica pone el acento.
 *
 * Se cargan acá y no en `globals.css` porque esta plantilla es de un solo
 * proyecto: el resto del sitio no debería pagar la descarga de una fuente que
 * no usa.
 */
export const editorialSans = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    display: "swap",
})

export const editorialSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: "italic",
    display: "swap",
})
