"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"

type Props = {
    src: string
    alt: string
    width: number
    height: number
    sizes: string
    className?: string
}

/**
 * Imagen del case study que se abre a pantalla completa al tocarla.
 *
 * En un celular una pantalla desktop entra en ~340 px de ancho y no se lee.
 * Abierta, se muestra al ancho de la pantalla con scroll propio, y el zoom
 * nativo del navegador (pellizcar) funciona porque el contenedor lo permite.
 * En desktop sirve igual para ver el detalle de un componente.
 */
export function ZoomableImage({ src, alt, width, height, sizes, className }: Props) {
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    const close = useCallback(() => setOpen(false), [])

    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close()
        }
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", onKey)
        return () => {
            document.body.style.overflow = prev
            window.removeEventListener("keydown", onKey)
        }
    }, [open, close])

    // En el celular, todo lo que no es un vertical (pantallas, tarjetas,
    // filas de componentes) se abre al doble del ancho de la pantalla para que
    // el texto se lea; se recorre con scroll y se puede pellizcar.
    const wide = width / height > 0.9

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={alt ? `Ampliar: ${alt}` : "Ampliar imagen"}
                className="block w-full cursor-zoom-in p-0 m-0 border-0 bg-transparent text-left"
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes={sizes}
                    className={className}
                />
            </button>
            {open &&
                mounted &&
                createPortal(
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={alt || "Imagen ampliada"}
                        className="fixed inset-0 z-[2147483000] bg-[#0B0A09]"
                        onClick={close}
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation()
                                close()
                            }}
                            aria-label="Cerrar"
                            className="fixed top-4 right-4 z-[2147483001] h-10 w-10 rounded-full bg-[#FFFFFA] text-[#14110F] text-[20px] leading-none flex items-center justify-center"
                        >
                            ×
                        </button>
                        <div
                            className="h-full w-full overflow-auto overscroll-contain flex"
                            style={{ touchAction: "pan-x pan-y pinch-zoom" }}
                        >
                            <div
                                className={`m-auto shrink-0 p-4 md:p-10 ${
                                    wide ? "w-[200vw] md:w-auto" : "w-full md:w-auto"
                                }`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Sin optimizar: se pide el archivo original,
                                    que es el que tiene el detalle. */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={src}
                                    alt={alt}
                                    className="block w-full h-auto md:w-auto md:max-w-[92vw] md:max-h-[88vh] rounded-xl"
                                />
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    )
}
