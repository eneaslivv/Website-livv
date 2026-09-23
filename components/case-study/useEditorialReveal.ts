"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type React from "react"

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * La misma entrada que ya hacía `ImageShowcaseSection`: la etiqueta se
 * descubre de izquierda a derecha, las tarjetas suben escalonadas y lo que
 * lleva `data-parallax` se mueve contra el scroll.
 *
 * La diferencia está en el disparador. ScrollTrigger calcula la posición de
 * cada elemento cuando se crea, y acá las imágenes cargan con next/image: al
 * montar todavía no tienen alto, así que media página estaba medida contra un
 * documento mucho más corto. Con `once: true` eso no se corrige nunca y las
 * tarjetas de más abajo se quedaban en opacidad 0 — contenido invisible, no
 * una animación que no se ve.
 *
 * IntersectionObserver no guarda posiciones: el navegador recalcula el cruce
 * solo, por mucho que la página crezca mientras carga. El parallax sí sigue
 * en ScrollTrigger, porque si falla se pierde el efecto y nada más.
 */
export function useEditorialReveal(scope: React.RefObject<HTMLElement | null>) {
    useGSAP(
        () => {
            const root = scope.current
            if (!root) return

            const labels = gsap.utils.toArray<HTMLElement>("[data-reveal-label]", root)
            const groups = gsap.utils.toArray<HTMLElement>("[data-reveal-group]", root)

            // Sin motion reducido ni IntersectionObserver, todo se ve y listo.
            if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
                gsap.set([...labels, ...gsap.utils.toArray("[data-reveal-card]", root)], {
                    clearProps: "all",
                })
                return
            }

            gsap.set(labels, { clipPath: "inset(0 100% 0 0)", opacity: 0 })
            groups.forEach((g) =>
                gsap.set(gsap.utils.toArray("[data-reveal-card]", g), {
                    y: 44,
                    opacity: 0,
                    scale: 0.985,
                }),
            )

            const io = new IntersectionObserver(
                (entries) => {
                    for (const e of entries) {
                        if (!e.isIntersecting) continue
                        const el = e.target as HTMLElement
                        io.unobserve(el)

                        if (el.hasAttribute("data-reveal-label")) {
                            gsap.to(el, {
                                clipPath: "inset(0 0% 0 0)",
                                opacity: 1,
                                duration: 0.9,
                                ease: "power3.out",
                            })
                            continue
                        }

                        gsap.to(gsap.utils.toArray("[data-reveal-card]", el), {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1,
                            ease: "power3.out",
                            stagger: 0.09,
                        })
                    }
                },
                { rootMargin: "0px 0px -10% 0px", threshold: 0.02 },
            )
            labels.forEach((l) => io.observe(l))
            groups.forEach((g) => io.observe(g))

            // Parallax sólo donde hay lugar: en mobile marea más de lo que suma.
            ScrollTrigger.matchMedia({
                "(min-width: 768px)": () => {
                    gsap.utils.toArray<HTMLElement>("[data-parallax]", root).forEach((el) => {
                        gsap.fromTo(
                            el,
                            { yPercent: -3 },
                            {
                                yPercent: 3,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: el.closest("[data-reveal-card]") || el,
                                    start: "top bottom",
                                    end: "bottom top",
                                    scrub: 0.6,
                                },
                            },
                        )
                    })
                },
            })

            return () => io.disconnect()
        },
        { scope },
    )
}
