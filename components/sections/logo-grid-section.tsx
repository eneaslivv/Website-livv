"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { AnimatedBorders } from "@/components/ui/animated-borders"

export function LogoGridSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    // Every logo is an alpha mask filled with the brand bordó, like the client slider
    // above: one exact tint at rest, white over the photo on hover. Gio and S.Rpro
    // point at their -mask twins (gio.png is an opaque black square; srpro.png
    // carries half its canvas as empty margin).
    const logos = [
        {
            src: "/logos-header/logo-6.png",
            alt: "ViewFi",
            href: "https://viewfi.live/",
            description: "Real-time monitoring and analytics.",
            hoverBg: "/assets/logo-bg-1.webp",
        },
        {
            src: "/logos-header/logo-7.png",
            alt: "RE/MAX",
            href: "https://www.remax.com.ar/",
            description: "Venta y alquiler de propiedades.",
            hoverBg: "/assets/logo-bg-2.webp",
        },
        {
            src: "/logos-header/sacoa.png",
            alt: "Sacoa",
            href: "https://sacoa.com/",
            description: "Entertainment experiences across LATAM.",
            hoverBg: "/assets/logo-bg-3.webp",
        },
        {
            src: "/logos-header/wortise.png",
            alt: "Wortise",
            href: "https://wortise.com/es",
            description: "AI-powered monetization and ads insights.",
            hoverBg: "/assets/logo-bg-1.webp",
        },
        {
            src: "/logos-header/blackbox.png",
            alt: "Blackbox AI",
            href: "https://www.blackbox.ai/",
            description: "Autonomous agents for software teams.",
            hoverBg: "/assets/logo-bg-2.webp",
        },
        {
            src: "/logos-header/buda.png",
            alt: "Buda.com",
            href: "https://www.buda.com/argentina",
            description: "Cripto exchange, simple and secure.",
            hoverBg: "/assets/logo-bg-3.webp",
        },
        {
            src: "/logos-header/heygen.png",
            alt: "HeyGen",
            href: "https://www.heygen.com/",
            description: "AI video generator with avatars.",
            hoverBg: "/assets/logo-bg-1.webp",
        },
        {
            src: "/logos-header/sunbird.png",
            alt: "Sunbird",
            href: "https://sunbird.com/",
            description: "Messaging platform for teams.",
            hoverBg: "/assets/logo-bg-2.webp",
        },
        {
            src: "/logos-header/gio-mask.png",
            alt: "Gio",
            href: "#",
            description: "Gio",
            hoverBg: "/assets/logo-bg-1.webp",
        },
        {
            src: "/logos-header/srpro-mask.png",
            alt: "S.Rpro Marketing",
            href: "#",
            description: "S.Rpro Marketing",
            hoverBg: "/assets/logo-bg-2.webp",
        },
    ]

    return (
        <section ref={sectionRef} className="relative w-full">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 py-16 md:py-32">
                <AnimatedBorders className="hidden md:block z-20" />

                {/* Horizontal Top Line */}
                <div className={`relative w-full h-[1px] transition-all duration-1000 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
                    <AnimatedBorders showLeft={false} showRight={false} showTop={true} fullWidth={true} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                    {logos.map((logo, index) => (
                        <a
                            key={index}
                            href={logo.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={logo.alt}
                            className="group relative h-24 sm:h-32 md:h-40 flex items-center justify-center border border-[#E8E4DC] overflow-hidden cursor-pointer bg-white"
                        >
                            <style jsx>{`
                                @media (max-width: 767px) {
                                    a:nth-child(2n) { border-right: none; }
                                }
                                @media (min-width: 768px) {
                                    a:nth-child(5n) { border-right: none; }
                                }
                            `}</style>

                            {/* The photo only exists where hover does: phones never download it */}
                            <div className="absolute inset-0 hidden [@media(hover:hover)]:block opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out z-0">
                                <Image
                                    src={logo.hoverBg!}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1024px) 20vw, 33vw"
                                    className="object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40" />
                            </div>

                            <div
                                className={`relative z-10 ${logo.alt === "Sacoa" ? "w-32 h-16" : "w-28 h-12"} transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                                style={{ transitionDelay: `${500 + index * 100}ms` }}
                            >
                                <div
                                    aria-hidden
                                    className="absolute inset-0 bg-[#2C0405] transition-colors duration-500 group-hover:bg-white"
                                    style={{
                                        maskImage: `url(${logo.src})`,
                                        maskSize: "contain",
                                        maskRepeat: "no-repeat",
                                        maskPosition: "center",
                                        WebkitMaskImage: `url(${logo.src})`,
                                        WebkitMaskSize: "contain",
                                        WebkitMaskRepeat: "no-repeat",
                                        WebkitMaskPosition: "center",
                                    }}
                                />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
