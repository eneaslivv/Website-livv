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
 * Está acá y no importado de aquel archivo porque ese hook es privado del
 * componente viejo; duplicar treinta líneas cuesta menos que exportar algo
 * desde un componente que en algún momento se va a reemplazar.
 */
export function useEditorialReveal(scope: React.RefObject<HTMLElement | null>) {
    useGSAP(
        () => {
            if (!scope.current || prefersReducedMotion()) return

            gsap.utils
                .toArray<HTMLElement>("[data-reveal-label]", scope.current)
                .forEach((label) => {
                    gsap.fromTo(
                        label,
                        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
                        {
                            clipPath: "inset(0 0% 0 0)",
                            opacity: 1,
                            duration: 0.9,
                            ease: "power3.out",
                            scrollTrigger: { trigger: label, start: "top 90%", once: true },
                        },
                    )
                })

            gsap.utils
                .toArray<HTMLElement>("[data-reveal-group]", scope.current)
                .forEach((group) => {
                    const cards = gsap.utils.toArray<HTMLElement>("[data-reveal-card]", group)
                    if (!cards.length) return
                    gsap.fromTo(
                        cards,
                        { y: 44, opacity: 0, scale: 0.985 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1,
                            ease: "power3.out",
                            stagger: 0.09,
                            scrollTrigger: { trigger: group, start: "top 85%", once: true },
                        },
                    )
                })

            // Parallax sólo donde hay lugar: en mobile marea más de lo que suma.
            ScrollTrigger.matchMedia({
                "(min-width: 768px)": () => {
                    gsap.utils
                        .toArray<HTMLElement>("[data-parallax]", scope.current!)
                        .forEach((el) => {
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
        },
        { scope },
    )
}
