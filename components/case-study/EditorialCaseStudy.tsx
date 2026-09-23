"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { EditorialDoc } from "@/types/case-study-editorial"
import { EditorialItemView, SlotRow } from "./EditorialItems"
import { editorialSans, editorialSerif } from "./fonts"
import { useEditorialReveal } from "./useEditorialReveal"

const pad = (n: number) => String(n).padStart(2, "0")

/**
 * Índice lateral. En el Figma es una columna fija con las nueve secciones
 * numeradas y la activa marcada con una raya.
 */
function Contents({
    doc,
    activeId,
    onJump,
}: {
    doc: EditorialDoc
    activeId: string
    onJump: (id: string) => void
}) {
    return (
        <nav aria-label="Contenido del case study" className="text-[13px]">
            <p className="text-[11px] text-[#8A8681] mb-4">Contenido</p>
            <ul className="space-y-0.5">
                {doc.sections.map((s, i) => {
                    const active = s.id === activeId
                    return (
                        <li key={s.id}>
                            <button
                                type="button"
                                onClick={() => onJump(s.id)}
                                className={`group flex w-full items-start gap-3 rounded-md py-1.5 pr-2 text-left transition-colors ${
                                    active ? "text-[#14110F]" : "text-[#6F6B66] hover:text-[#14110F]"
                                }`}
                                aria-current={active ? "true" : undefined}
                            >
                                <span
                                    className={`mt-[2px] w-5 shrink-0 text-[11px] tabular-nums ${
                                        active ? "text-[#14110F]" : "text-[#B4AFA8]"
                                    }`}
                                >
                                    {pad(i + 1)}
                                </span>
                                <span className="min-w-0 leading-snug">{s.title}</span>
                                <span
                                    aria-hidden
                                    className={`ml-auto mt-[9px] h-px shrink-0 bg-[#14110F] transition-all duration-300 ${
                                        active ? "w-4 opacity-100" : "w-0 opacity-0"
                                    }`}
                                />
                            </button>
                        </li>
                    )
                })}
            </ul>
            <p className="mt-5 text-[11px] text-[#B4AFA8]">
                {doc.sections.length} secciones
            </p>
        </nav>
    )
}

/**
 * El fondo de puntos del intro, con el pulso que el Figma declara como
 * animación: opacidad 0.44 → 0.64 → 0.44 en 12s, en loop.
 */
function DottedBackdrop() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 editorial-dots"
            style={{
                backgroundImage:
                    "radial-gradient(circle at 1px 1px, rgba(44,4,5,0.28) 1px, transparent 0)",
                backgroundSize: "22px 22px",
            }}
        />
    )
}

export function EditorialCaseStudy({ doc }: { doc: EditorialDoc }) {
    const scope = useRef<HTMLDivElement>(null)
    const [activeId, setActiveId] = useState(doc.sections[0]?.id ?? "")
    useEditorialReveal(scope)

    useEffect(() => {
        const nodes = doc.sections
            .map((s) => document.getElementById(s.id))
            .filter((n): n is HTMLElement => !!n)
        if (!nodes.length) return

        // La sección activa es la última cuyo tope ya pasó la franja superior;
        // con IntersectionObserver solo, dos secciones visibles se pelean.
        const pick = () => {
            const line = window.innerHeight * 0.3
            let current = nodes[0]
            for (const n of nodes) {
                if (n.getBoundingClientRect().top <= line) current = n
            }
            setActiveId(current.id)
        }
        pick()
        window.addEventListener("scroll", pick, { passive: true })
        window.addEventListener("resize", pick)
        return () => {
            window.removeEventListener("scroll", pick)
            window.removeEventListener("resize", pick)
        }
    }, [doc.sections])

    const jump = useCallback((id: string) => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY - 96
        window.scrollTo({ top, behavior: "smooth" })
    }, [])

    const total = doc.sections.length

    return (
        <div
            ref={scope}
            className={`${editorialSans.className} bg-[#FFFFFA] text-[#14110F]`}
        >
            <style>{`
                @keyframes editorialDots { 0%,100% { opacity: .44 } 50% { opacity: .64 } }
                .editorial-dots { opacity: .44; animation: editorialDots 12s ease-in-out infinite }
                @media (prefers-reduced-motion: reduce) { .editorial-dots { animation: none } }
            `}</style>

            <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
                <div className="lg:grid lg:grid-cols-[232px_1fr] lg:gap-[72px]">
                    {/* Columna del índice */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-28 pb-24">
                            <p className="text-[11px] text-[#8A8681]">
                                LIVV Studio © Case study
                            </p>
                            <p className="mt-1 text-[17px] text-[#14110F]">{doc.title}</p>
                            <div className="my-6 h-px bg-[#E4E0D8]" />
                            <Contents doc={doc} activeId={activeId} onJump={jump} />
                        </div>
                    </aside>

                    {/* Columna de contenido */}
                    <div className="min-w-0 pb-10">
                        {doc.sections.map((section, i) => {
                            const isIntro = i === 0
                            // Los slots seguidos se agrupan en una fila (los tres
                            // de Motion van juntos), pero sin sacarlos de su
                            // lugar: el del walkthrough abre la sección desktop.
                            const runs: { slots: boolean; items: typeof section.items }[] = []
                            for (const it of section.items) {
                                const isSlot = it.kind === "slot"
                                const last = runs[runs.length - 1]
                                if (last && last.slots === isSlot) last.items.push(it)
                                else runs.push({ slots: isSlot, items: [it] })
                            }

                            return (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="scroll-mt-28 pt-10 md:pt-16"
                                >
                                    {isIntro ? (
                                        <header className="relative mb-16 overflow-hidden rounded-2xl bg-[#FDFCFC] px-6 py-12 md:px-12 md:py-16">
                                            <DottedBackdrop />
                                            <div className="relative">
                                                <div className="flex items-baseline justify-between gap-6 text-[11px] uppercase tracking-[0.14em] text-[#8A8681]">
                                                    <span>{doc.kicker}</span>
                                                    <span className="tabular-nums whitespace-nowrap">
                                                        Case study · {pad(1)} / {pad(total)}
                                                    </span>
                                                </div>

                                                <h1 className="mt-10 text-[64px] leading-[0.95] tracking-[-0.045em] md:text-[104px]">
                                                    {doc.title}
                                                </h1>

                                                {doc.tagline && (
                                                    <p className="mt-8 max-w-[820px] text-[24px] leading-[1.25] tracking-[-0.02em] md:text-[34px]">
                                                        {doc.tagline.before}
                                                        {doc.tagline.em && (
                                                            <span className={`${editorialSerif.className} italic`}>
                                                                {doc.tagline.em}
                                                            </span>
                                                        )}
                                                        {doc.tagline.after}
                                                    </p>
                                                )}

                                                {doc.meta?.length ? (
                                                    <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#E4E0D8] pt-7 md:grid-cols-5">
                                                        {doc.meta.map((m) => (
                                                            <div key={m.label} className="min-w-0">
                                                                <p className="mb-1.5 text-[11px] text-[#8A8681]">
                                                                    {m.label}
                                                                </p>
                                                                <p
                                                                    className={`text-[15px] leading-snug ${
                                                                        m.pending
                                                                            ? "italic text-[#B4AFA8]"
                                                                            : "text-[#14110F]"
                                                                    }`}
                                                                    title={
                                                                        m.pending
                                                                            ? "Pendiente en el Figma"
                                                                            : undefined
                                                                    }
                                                                >
                                                                    {m.value}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </header>
                                    ) : (
                                        <header className="mb-10 md:mb-14">
                                            <div className="flex items-baseline justify-between gap-6 border-b border-[#E4E0D8] pb-3 text-[12px] text-[#8A8681]">
                                                <span className="truncate">
                                                    {doc.title} · {section.title}
                                                </span>
                                                <span className="tabular-nums whitespace-nowrap">
                                                    {pad(i + 1)} / {pad(total)}
                                                </span>
                                            </div>
                                            <h2 className="mt-9 text-[46px] leading-[0.98] tracking-[-0.035em] md:text-[76px]">
                                                {section.title}
                                            </h2>
                                            {section.intro && (
                                                <p className="mt-7 max-w-[620px] text-[17px] leading-[1.5] text-[#4D4842]">
                                                    {section.intro}
                                                </p>
                                            )}
                                        </header>
                                    )}

                                    {runs.map((run, r) =>
                                        run.slots ? (
                                            <SlotRow key={r} items={run.items} />
                                        ) : (
                                            run.items.map((item, j) => (
                                                <EditorialItemView key={`${r}-${j}`} item={item} />
                                            ))
                                        ),
                                    )}
                                </section>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
