"use client"

import { useRef } from "react"
import Image from "next/image"
import { Monitor } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

interface ShowcaseImage {
    url: string
    alt?: string
    theme?: 'light' | 'dark'
    caption?: string
    /** Marca las piezas verticales (capturas de celular). Por defecto, apaisada. */
    orientation?: 'landscape' | 'portrait'
}

interface Props {
    label?: string
    layout: 'single' | 'side_by_side' | 'wireframe'
    images: ShowcaseImage[]
}

const isVideoUrl = (url: string) => /\.(mp4|webm|mov)(\?|$)/i.test(url)

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Media({ url, alt, className, fit = 'cover', sizes }: { url: string; alt?: string; className?: string; fit?: 'cover' | 'contain'; sizes?: string }) {
    if (isVideoUrl(url)) {
        return (
            <video
                src={url}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className={`${className ?? ''} ${fit === 'contain' ? 'object-contain' : 'object-cover'} w-full h-full`}
            />
        )
    }
    return (
        <Image
            src={url}
            alt={alt || "Showcase"}
            fill
            sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
            className={`${className ?? ''} ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
        />
    )
}

/**
 * Anima la entrada de una sección: el título se descubre con un wipe, las piezas
 * suben escalonadas y la imagen hace un parallax corto mientras la tarjeta cruza
 * la pantalla. Se desactiva entero si el sistema pide menos movimiento.
 */
function useShowcaseReveal(scope: React.RefObject<HTMLDivElement | null>) {
    useGSAP(() => {
        if (!scope.current || prefersReducedMotion()) return

        const label = scope.current.querySelector<HTMLElement>('[data-reveal-label]')
        if (label) {
            gsap.fromTo(label,
                { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: label, start: 'top 88%', once: true },
                },
            )
        }

        const cards = gsap.utils.toArray<HTMLElement>('[data-reveal-card]', scope.current)
        if (cards.length) {
            gsap.fromTo(cards,
                { y: 44, opacity: 0, scale: 0.985 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.09,
                    scrollTrigger: { trigger: scope.current, start: 'top 82%', once: true },
                },
            )
        }

        // Parallax: sólo en pantallas con sitio para que se note sin marear.
        ScrollTrigger.matchMedia({
            '(min-width: 768px)': () => {
                gsap.utils.toArray<HTMLElement>('[data-parallax]', scope.current!).forEach((el) => {
                    gsap.fromTo(el,
                        { yPercent: -3.5 },
                        {
                            yPercent: 3.5,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: el.closest('[data-reveal-card]') || el,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 0.6,
                            },
                        },
                    )
                })
            },
        })
    }, { scope })
}

export function ImageShowcaseSection({ label, layout, images }: Props) {
    const scope = useRef<HTMLDivElement>(null)
    useShowcaseReveal(scope)

    if (!images?.length) return null
    const hasRealImages = images.some(img => img.url && img.url.trim() !== '')
    if (!hasRealImages) return null

    if (layout === 'wireframe') {
        return (
            <div ref={scope} className="mb-16 md:mb-32">
                {label && <p data-reveal-label className="text-xs text-[#5A3E3E]/60 mb-4 ml-1 uppercase tracking-widest">{label}</p>}
                <div data-reveal-card className="bg-[#E6E2D6]/30 border border-[#D6D1C5] rounded-xl p-4 sm:p-6 md:p-12">
                    {images[0]?.url ? (
                        <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
                            <Media url={images[0].url} alt={images[0].alt || "Wireframe"} fit="contain" sizes="(max-width: 768px) 100vw, 80vw" />
                        </div>
                    ) : (
                        <div className="bg-[#FAF8F3] rounded-lg shadow-sm border border-[#D6D1C5] p-4 aspect-[16/9] flex flex-col gap-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-[#2A1818]" />
                                <div className="w-2 h-2 rounded-full bg-[#E6E2D6]" />
                                <div className="w-2 h-2 rounded-full bg-[#E6E2D6]" />
                            </div>
                            <div className="flex-1 flex gap-4">
                                <div className="w-1/4 bg-[#E6E2D6] rounded" />
                                <div className="flex-1 flex flex-col gap-3">
                                    <div className="h-1/2 bg-[#E6E2D6] rounded relative flex items-center justify-center">
                                        <Monitor className="w-8 h-8 text-[#D6D1C5] absolute" />
                                    </div>
                                    <div className="h-3 w-2/3 bg-[#E6E2D6] rounded" />
                                    <div className="h-3 w-1/2 bg-[#E6E2D6] rounded" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    if (layout === 'side_by_side') {
        return (
            <div ref={scope} className="mb-16 md:mb-32">
                {label && (
                    <div data-reveal-label className="flex justify-between items-end mb-4 md:mb-6">
                        <h3 className="text-[11px] md:text-sm font-medium text-[#2A1818] uppercase tracking-widest">{label}</h3>
                        <span className="text-[10px] md:text-xs text-[#5A3E3E]/60 tabular-nums">
                            {images.length} {images.length === 1 ? 'pieza' : 'piezas'}
                        </span>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {images.map((img, i) => (
                        <figure key={i} data-reveal-card className="group">
                            <div
                                className={`relative overflow-hidden rounded-xl border p-2.5 sm:p-4 md:p-8 ${
                                    // La tarjeta toma el alto de la imagen en vez de un 500px fijo:
                                    // con alto fijo, en mobile una captura apaisada dejaba ~280px
                                    // de vacío debajo, treinta veces, y la página medía 23.000px.
                                    img.orientation === 'portrait'
                                        ? 'aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4]'
                                        : 'aspect-[16/10]'
                                } ${
                                    img.theme === 'dark'
                                        ? 'bg-[#1A1A1A] border-[#2A2A2A]'
                                        : 'bg-[#FFFFFF] border-[#D6D1C5]'
                                }`}
                            >
                                {img.url ? (
                                    <div data-parallax className="absolute inset-2.5 sm:inset-4 md:inset-8">
                                        <div className="relative w-full h-full transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.02]">
                                            <Media
                                                url={img.url}
                                                alt={img.alt || `Interface ${i + 1}`}
                                                fit="contain"
                                                sizes="(max-width: 768px) 92vw, 46vw"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className={`w-[140px] md:w-[200px] aspect-[9/19] rounded-[2rem] border-4 shadow-2xl ${
                                            img.theme === 'dark'
                                                ? 'bg-[#171717] border-[#171717]'
                                                : 'bg-white border-white shadow-[0_20px_50px_rgba(42,24,24,0.1)]'
                                        }`} />
                                    </div>
                                )}
                            </div>
                            {img.caption && (
                                <figcaption className="text-[11px] md:text-xs text-[#5A3E3E]/60 mt-2.5 ml-0.5 leading-snug">
                                    {img.caption}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            </div>
        )
    }

    // Single image
    return (
        <div ref={scope} className="mb-16 md:mb-32">
            {label && <p data-reveal-label className="text-xs text-[#5A3E3E]/60 mb-4 ml-1 uppercase tracking-widest">{label}</p>}
            <div data-reveal-card className="rounded-xl overflow-hidden border border-[#D6D1C5]">
                {images[0]?.url && (
                    <div className="relative aspect-[16/10] md:aspect-video">
                        <div data-parallax className="absolute inset-0 scale-[1.08]">
                            <Media url={images[0].url} alt={images[0].alt || "Showcase"} fit="cover" sizes="100vw" />
                        </div>
                    </div>
                )}
            </div>
            {images[0]?.caption && (
                <p className="text-[11px] md:text-xs text-[#5A3E3E]/60 mt-2.5 ml-0.5">{images[0].caption}</p>
            )}
        </div>
    )
}
