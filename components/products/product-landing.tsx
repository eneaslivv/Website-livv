"use client"

import { useState, type CSSProperties, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { Reveal } from "@/components/services/primitives"
import { trackCTAClick } from "@/lib/analytics"
import type { ProductFaq } from "@/lib/product-faqs"
import type { ProductBand, ProductLanding as Content, ProductLink, ProductShot, TwoTone } from "@/lib/product-landings"

/**
 * Landing of a LIVV product. One template, one idea per section: what it is,
 * what it does (a real screen each), who uses it, a strip of the brand, how to
 * get it, and the questions. Same ink, paper and hairlines as the product
 * picker on the home (LIVV Hub palette), so the click from there lands on the
 * same surface.
 */

const SHELL = "mx-auto w-full max-w-[1200px] px-6 md:px-10"
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

function SectionLabel({ n, children }: { n: number; children: ReactNode }) {
    return (
        <p className="text-[10px] font-medium uppercase tracking-[1.5px] text-[#79665f]">
            <span className="tabular-nums">{String(n).padStart(2, "0")} · </span>
            {children}
        </p>
    )
}

function TwoToneHeading({ text }: { text: TwoTone }) {
    return (
        <h2 className="mt-5 text-[1.75rem] font-light leading-[1.1] tracking-[-0.03em] text-[#440c15] text-balance md:text-[2.5rem]">
            {text[0]} <span className="text-[#79665f]">{text[1]}</span>
        </h2>
    )
}

/** The product's real mark as a mask, so it takes the ink of where it sits. */
function Mark({ content, height, className = "" }: { content: Content; height: number; className?: string }) {
    if (!content.logo)
        return (
            <span className={`block leading-none tracking-[-0.03em] ${className}`} style={{ fontSize: height * 0.7 }}>
                {content.name}
            </span>
        )
    const mask = `url(${content.logo.src})`
    return (
        <span
            role="img"
            aria-label={content.name}
            className={`block bg-current ${className}`}
            style={{
                height,
                aspectRatio: content.logo.ratio,
                maskImage: mask,
                WebkitMaskImage: mask,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
            }}
        />
    )
}

function CtaButton({ link, location, full = false }: { link: ProductLink; location: string; full?: boolean }) {
    const className = `group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#440c15] px-6 text-[13px] font-medium text-[#fdfbf7] transition-colors duration-200 hover:bg-[#2c0405] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#440c15] ${full ? "w-full" : ""}`
    const label = (
        <>
            {link.label}
            <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none"
            >
                {link.external ? "↗" : "→"}
            </span>
        </>
    )
    const onClick = () => trackCTAClick("product_cta", location)
    return link.external ? (
        <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
            {label}
        </a>
    ) : (
        <Link href={link.href} onClick={onClick} className={className}>
            {label}
        </Link>
    )
}

/** A screen in its mockup, at the ratio of the file: the mockup is never cropped. */
function Frame({
    shot,
    sizes,
    priority = false,
    className = "",
    mobilePosition,
}: {
    shot: ProductShot
    sizes: string
    priority?: boolean
    className?: string
    mobilePosition?: string
}) {
    // A wide render would be a sliver on a phone: there it takes a 4:3 frame
    // and `mobilePosition` picks what stays in it.
    const responsive = mobilePosition !== undefined
    return (
        <div
            className={`relative overflow-hidden rounded-[12px] border border-[#ddd5cc] bg-[#f3eee8] ${responsive ? "aspect-[4/3] md:[aspect-ratio:var(--ratio)]" : "[aspect-ratio:var(--ratio)]"} ${className}`}
            style={{ "--ratio": `${shot.width} / ${shot.height}`, "--position": mobilePosition } as CSSProperties}
        >
            <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes={sizes}
                priority={priority}
                className={`object-cover ${responsive ? "[object-position:var(--position)] md:object-center" : ""}`}
            />
        </div>
    )
}

function Hero({ content }: { content: Content }) {
    return (
        <section aria-label={content.name} className="pt-28 md:pt-40">
            <div className={SHELL}>
                <Link
                    href="/products"
                    className="group inline-flex min-h-11 items-center gap-2 text-[12px] text-[#79665f] transition-colors hover:text-[#440c15] md:min-h-0"
                >
                    <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-0.5">
                        ←
                    </span>
                    All products
                </Link>

                <div className="mt-6 grid gap-10 md:mt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-14">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-[1.5px] text-[#79665f]">{content.kind}</p>
                        <Mark content={content} height={44} className="mt-5" />
                        <h1 className="mt-7 text-[2.25rem] font-light leading-[1.06] tracking-[-0.04em] text-balance md:text-[3rem] xl:text-[3.375rem]">
                            <span className="sr-only">{content.name}: </span>
                            {content.headline[0]} <span className="text-[#79665f]">{content.headline[1]}</span>
                        </h1>
                        <p className="mt-6 max-w-[34rem] text-[16px] leading-[1.6] text-[#79665f] md:text-[17px]">{content.lead}</p>
                        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                            <CtaButton link={content.cta} location={`product:${content.slug}:hero`} />
                            {content.secondary && (
                                <Link
                                    href={content.secondary.href}
                                    className="group inline-flex min-h-11 items-center gap-2 text-[13px] text-[#440c15] underline decoration-[#440c15]/25 underline-offset-[6px] transition-colors hover:decoration-[#440c15]"
                                >
                                    {content.secondary.label}
                                </Link>
                            )}
                        </div>
                    </div>

                    <Frame
                        shot={content.hero}
                        sizes="(max-width: 1023px) 100vw, 680px"
                        priority
                        mobilePosition={content.hero.mobilePosition}
                    />
                </div>

                <dl className="mt-12 grid border-y border-[#ddd5cc] sm:grid-cols-3 md:mt-16">
                    {content.facts.map(([label, value]) => (
                        <div
                            key={label}
                            className="border-b border-[#ddd5cc] py-4 last:border-b-0 sm:border-b-0 sm:border-l sm:px-6 sm:py-5 sm:first:border-l-0 sm:first:pl-0"
                        >
                            <dt className="text-[10px] font-medium uppercase tracking-[1.5px] text-[#79665f]">{label}</dt>
                            <dd className="mt-1.5 text-[15px] leading-snug">{value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}

function Features({ content }: { content: Content }) {
    return (
        <section aria-labelledby="product-features" className="pt-20 md:pt-28">
            <div className={SHELL}>
                <SectionLabel n={1}>What it does</SectionLabel>
                <h2 id="product-features" className="sr-only">
                    What {content.name} does
                </h2>

                <div className="mt-8 flex flex-col gap-14 md:mt-12 md:gap-24">
                    {content.features.map((feature, i) => (
                        <Reveal key={feature.title}>
                            <article className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
                                <Frame
                                    shot={feature.shot}
                                    sizes="(max-width: 1023px) 100vw, 660px"
                                    className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-2" : ""}`}
                                />
                                <div className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                                    <span className="text-[11px] tabular-nums tracking-[1px] text-[#79665f]">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="mt-3 text-[1.5rem] font-light leading-[1.12] tracking-[-0.03em] text-balance md:text-[2rem]">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-4 max-w-[26rem] text-[15px] leading-[1.6] text-[#79665f]">{feature.line}</p>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Roles({ content }: { content: Content }) {
    const { heading, items } = content.roles
    return (
        <section aria-label="Who uses it" className="pt-20 md:pt-28">
            <div className={SHELL}>
                <div className="grid gap-8 border-t border-[#ddd5cc] pt-10 md:pt-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
                    <Reveal>
                        <SectionLabel n={2}>Who uses it</SectionLabel>
                        <TwoToneHeading text={heading} />
                    </Reveal>
                    <Reveal delay={0.08}>
                        <ul
                            className={`grid gap-px border border-[#ddd5cc] bg-[#ddd5cc] ${items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
                        >
                            {items.map((item) => (
                                <li key={item.name} className="bg-[#fdfbf7] p-5 md:p-6">
                                    <p className="text-[15px]">{item.name}</p>
                                    <p className="mt-2 text-[13px] leading-[1.55] text-[#79665f]">{item.line}</p>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

function Band({ band, content }: { band: ProductBand; content: Content }) {
    return (
        <section aria-label={`${content.name} brand`} className="pt-20 md:pt-28">
            <div className={SHELL}>
                <Reveal>
                    <figure className="relative isolate h-[clamp(260px,46vh,480px)] overflow-hidden rounded-[12px] bg-[#440c15] text-[#fdfbf7]">
                        {band.kind === "image" ? (
                            <Image
                                src={band.src}
                                alt={band.alt}
                                fill
                                sizes="(max-width: 1279px) 100vw, 1120px"
                                className="object-cover"
                                style={{ objectPosition: band.position }}
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-[linear-gradient(35deg,#440c15_0%,#440c15_34%,#ecd2cc_78%,#8d9661_100%)]" />
                                <p className="absolute left-6 top-6 max-w-[13ch] text-[2rem] font-light leading-[1.05] tracking-[-0.04em] text-balance md:left-10 md:top-10 md:text-[3.25rem]">
                                    {band.line}
                                </p>
                            </>
                        )}
                        <div aria-hidden className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
                        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-[linear-gradient(to_top,rgba(20,8,10,0.66),rgba(20,8,10,0))] p-5 pt-16 text-[12px] leading-snug md:p-8 md:pt-20">
                            <span className="max-w-[34ch]">{band.caption}</span>
                            <Mark content={content} height={26} className="shrink-0" />
                        </figcaption>
                    </figure>
                </Reveal>
            </div>
        </section>
    )
}

function Offer({ content }: { content: Content }) {
    const { offer } = content
    return (
        <section aria-label="How to get it" className="pt-20 md:pt-28">
            <div className={SHELL}>
                <div className="grid gap-10 border-t border-[#ddd5cc] pt-10 md:pt-14 lg:grid-cols-2 lg:gap-14">
                    <Reveal>
                        <SectionLabel n={3}>How to get it</SectionLabel>
                        <TwoToneHeading text={offer.heading} />
                        <p className="mt-5 max-w-[30rem] text-[15px] leading-[1.6] text-[#79665f]">{offer.line}</p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <div className="border border-[#ddd5cc] bg-white p-6 md:p-9">
                            <p className="text-[2rem] font-light leading-none tracking-[-0.04em] md:text-[2.75rem]">{offer.price}</p>
                            <p className="mt-2.5 text-[13px] text-[#79665f]">{offer.priceNote}</p>
                            <ul className="mt-7 border-t border-[#ddd5cc]">
                                {offer.includes.map((item) => (
                                    <li key={item} className="flex items-center gap-3 border-b border-[#ddd5cc] py-3 text-[14px]">
                                        <span aria-hidden className="h-2 w-1 shrink-0 bg-[#440c15]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-7">
                                <CtaButton link={offer.cta} location={`product:${content.slug}:offer`} full />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}

/**
 * Mirrors the FAQPage JSON-LD emitted by the layout: both read
 * lib/product-faqs.ts. Answers collapse but stay in the DOM.
 */
function Faqs({ faqs, name }: { faqs: readonly ProductFaq[]; name: string }) {
    const [open, setOpen] = useState<number | null>(0)
    if (faqs.length === 0) return null

    return (
        <section aria-label="Frequently asked questions" className="pt-20 md:pt-28">
            <div className={SHELL}>
                <div className="grid gap-8 border-t border-[#ddd5cc] pt-10 md:pt-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
                    <Reveal>
                        <SectionLabel n={4}>Questions</SectionLabel>
                        <TwoToneHeading text={[`${name},`, "answered."]} />
                    </Reveal>

                    <dl className="flex flex-col">
                        {faqs.map((faq, i) => {
                            const isOpen = open === i
                            return (
                                <div key={faq.q} className="border-t border-[#ddd5cc] first:border-t-0 last:border-b lg:first:border-t">
                                    <dt>
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={`product-faq-${i}`}
                                            onClick={() => setOpen(isOpen ? null : i)}
                                            className="group flex w-full items-start justify-between gap-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#440c15]"
                                        >
                                            <span className="text-[17px] font-light leading-snug tracking-[-0.01em] text-balance md:text-lg">
                                                {faq.q}
                                            </span>
                                            <span
                                                aria-hidden
                                                className={`relative mt-1.5 h-3 w-3 shrink-0 text-[#79665f] transition-transform duration-300 ease-out group-hover:text-[#440c15] motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                                            >
                                                <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                                                <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current" />
                                            </span>
                                        </button>
                                    </dt>
                                    <dd
                                        id={`product-faq-${i}`}
                                        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="max-w-2xl pb-6 pr-8 text-[15px] leading-relaxed text-[#79665f]">{faq.a}</p>
                                        </div>
                                    </dd>
                                </div>
                            )
                        })}
                    </dl>
                </div>
            </div>
        </section>
    )
}

export function ProductLanding({ content, faqs }: { content: Content; faqs: readonly ProductFaq[] }) {
    return (
        <div className="min-h-screen overflow-x-hidden bg-[#fdfbf7] text-[#440c15] selection:bg-[#440c15] selection:text-[#fdfbf7]">
            <Navbar />
            <main className="pb-24 md:pb-32">
                <Hero content={content} />
                <Features content={content} />
                <Roles content={content} />
                <Band band={content.band} content={content} />
                <Offer content={content} />
                <Faqs faqs={faqs} name={content.name} />
            </main>
            <FooterSection />
        </div>
    )
}
