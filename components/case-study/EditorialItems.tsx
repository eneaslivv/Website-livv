"use client"

import { createContext, useContext } from "react"
import { SiteMapSection } from "@/components/project-blocks/SiteMapSection"
import { editorialSerif } from "./fonts"
import { ZoomableImage } from "./ZoomableImage"
import type { EditorialField, EditorialItem, ScreenFrame } from "@/types/case-study-editorial"

/** Dominio del proyecto para la barra del navegador dibujado (ver siteOfDoc). */
export const ScreenSiteContext = createContext<string | undefined>(undefined)

/* ----------------------------- piezas chicas ---------------------------- */

/**
 * Etiqueta chica en versalitas: «MANUAL DE IDENTIDAD», «ONBOARDING».
 *
 * El texto va envuelto en un span propio porque la entrada lo descubre con
 * `clip-path`, y Chromium tiene en cuenta ese recorte al calcular si el
 * elemento entra en pantalla: si el recorte estuviera en el <p> observado,
 * su área sería cero, nunca intersecaría y nunca se revelaría.
 */
export function Label({ children }: { children: React.ReactNode }) {
    return (
        <p
            data-reveal-label
            className="text-[11px] uppercase tracking-[0.14em] text-[#8A8681] mb-3"
        >
            <span data-reveal-wipe className="inline-block">
                {children}
            </span>
        </p>
    )
}

/** Un dato del bloque de ficha. Si está pendiente, se ve que falta. */
function Field({ row }: { row: EditorialField }) {
    return (
        <div className="min-w-0">
            <p className="text-[11px] text-[#8A8681] mb-1.5">{row.label}</p>
            <p
                className={`text-[15px] leading-snug ${
                    row.pending
                        ? "text-[#B4AFA8] italic"
                        : "text-[#14110F]"
                }`}
                title={row.pending ? "Pendiente en el Figma" : undefined}
            >
                {row.value}
            </p>
        </div>
    )
}

function Caption({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[12px] text-[#8A8681] mt-3 leading-snug">{children}</p>
    )
}

/* -------------------------- marcos de captura --------------------------- */

/*
 * Una captura cruda a todo el ancho se lee como un recorte con zoom; dentro de
 * una ventana, sobre un fondo con aire, se lee como el sitio. El marco lo
 * dibuja la plantilla (nítido a cualquier densidad) y sólo cuando el documento
 * lo pide: las capturas que ya traen mockup desde el Figma quedan como están.
 */
function BrowserWindow({ dark, children }: { dark: boolean; children: React.ReactNode }) {
    const site = useContext(ScreenSiteContext)
    return (
        <div
            className={`overflow-hidden rounded-[10px] md:rounded-xl border shadow-[0_30px_70px_-34px_rgba(20,17,15,0.55)] ${
                dark ? "border-white/10 bg-[#0E0D0C]" : "border-black/10 bg-white"
            }`}
        >
            <div
                className={`grid grid-cols-[1fr_auto_1fr] items-center h-7 md:h-9 px-3 md:px-4 border-b ${
                    dark ? "bg-[#211F1D] border-white/[0.06]" : "bg-[#F4F2ED] border-black/[0.06]"
                }`}
            >
                <span className="flex gap-1.5" aria-hidden>
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className={`size-[7px] md:size-2.5 rounded-full ${dark ? "bg-white/15" : "bg-black/[0.12]"}`}
                        />
                    ))}
                </span>
                <span
                    className={`h-4 md:h-5 min-w-[112px] md:min-w-[240px] rounded-md px-3 text-center text-[9px] md:text-[11px] leading-4 md:leading-5 ${
                        dark ? "bg-white/[0.06] text-white/45" : "bg-white text-[#8A8681] border border-black/[0.05]"
                    }`}
                >
                    {site}
                </span>
                <span aria-hidden />
            </div>
            {/* Los recortes del Figma traen las esquinas de su tarjeta redondeadas
                sobre el fondo crema: bajo la barra quedaban dos puntas claras. */}
            <div className="[&_img]:rounded-[2.4%]">{children}</div>
        </div>
    )
}

function PhoneShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-[300px] rounded-[2.1rem] bg-[#141312] p-[3.2%] shadow-[0_30px_70px_-34px_rgba(20,17,15,0.6)]">
            <div className="overflow-hidden rounded-[1.7rem] bg-black">{children}</div>
        </div>
    )
}

function Framed({ frame, dark, children }: { frame: ScreenFrame; dark: boolean; children: React.ReactNode }) {
    return frame === "phone" ? (
        <PhoneShell>{children}</PhoneShell>
    ) : (
        <BrowserWindow dark={dark}>{children}</BrowserWindow>
    )
}

/* --------------------------------- items -------------------------------- */

function Figure({ item }: { item: Extract<EditorialItem, { kind: "figure" }> }) {
    const bleed = item.tone === "bleed"
    if (item.frame) {
        const dark = item.tone === "dark"
        return (
            <figure className="mb-14 md:mb-20" data-reveal-group>
                {item.label && <Label>{item.label}</Label>}
                <div
                    data-reveal-card
                    className={`relative w-full overflow-hidden rounded-2xl px-[5%] py-[5%] md:px-[7%] md:py-[6%] ${
                        dark ? "bg-[#171514]" : "bg-[#EEEBE4]"
                    }`}
                >
                    <Framed frame={item.frame} dark={dark}>
                        <ZoomableImage
                            src={item.url}
                            alt={item.alt || ""}
                            width={item.w ?? 2000}
                            height={item.h ?? 1250}
                            sizes="(max-width: 1024px) 90vw, 880px"
                            className="block w-full h-auto"
                        />
                    </Framed>
                </div>
                {item.caption && <Caption>{item.caption}</Caption>}
            </figure>
        )
    }
    return (
        <figure className="mb-14 md:mb-20" data-reveal-group>
            {item.label && <Label>{item.label}</Label>}
            <div
                data-reveal-card
                className={
                    bleed
                        ? "relative w-full overflow-hidden rounded-2xl"
                        : `relative w-full overflow-hidden rounded-2xl border ${
                              item.tone === "dark"
                                  ? "bg-[#111010] border-[#1D1B1A]"
                                  : "bg-[#F7F6F3] border-[#EAE7E1]"
                          }`
                }
            >
                {/* Sin caja de proporción fija: la imagen impone su alto, que es
                    lo que hace que la página respire como el Figma. */}
                <ZoomableImage
                    src={item.url}
                    alt={item.alt || ""}
                    width={item.w ?? 2000}
                    height={item.h ?? 1250}
                    sizes="(max-width: 1024px) 100vw, 1018px"
                    className="w-full h-auto"
                />
            </div>
            {item.caption && <Caption>{item.caption}</Caption>}
        </figure>
    )
}

function Grid({ item }: { item: Extract<EditorialItem, { kind: "grid" }> }) {
    const cols = item.cols ?? 2
    const gridCls =
        cols === 4
            ? "grid-cols-2 md:grid-cols-4"
            : cols === 3
              ? "grid-cols-1 sm:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
    return (
        <div className="mb-14 md:mb-20" data-reveal-group>
            {item.label && <Label>{item.label}</Label>}
            <div className={`grid ${gridCls} gap-4 md:gap-5`}>
                {item.items.map((img, i) => {
                    const image = (
                        <ZoomableImage
                            src={img.url}
                            alt={img.alt || ""}
                            width={img.w ?? (img.portrait ? 900 : 1400)}
                            height={img.h ?? (img.portrait ? 1350 : 900)}
                            sizes={
                                cols === 4
                                    ? "(max-width: 768px) 50vw, 25vw"
                                    : `(max-width: 768px) 100vw, ${Math.round(100 / cols)}vw`
                            }
                            className={img.frame ? "block w-full h-auto" : "w-full h-auto"}
                        />
                    )
                    return (
                        <figure key={i} data-reveal-card className="min-w-0">
                            {img.frame ? (
                                <div className="relative w-full overflow-hidden rounded-xl bg-[#EEEBE4] p-[7%]">
                                    <Framed frame={img.frame} dark={false}>{image}</Framed>
                                </div>
                            ) : (
                                <div className="relative w-full overflow-hidden rounded-xl border border-[#EAE7E1] bg-[#F7F6F3]">
                                    {image}
                                </div>
                            )}
                            {img.caption && <Caption>{img.caption}</Caption>}
                        </figure>
                    )
                })}
            </div>
        </div>
    )
}

function Note({ item }: { item: Extract<EditorialItem, { kind: "note" }> }) {
    return (
        <div className="mb-14 md:mb-20 max-w-[620px]">
            {item.label && <Label>{item.label}</Label>}
            <p className="text-[19px] md:text-[21px] leading-[1.45] text-[#14110F]">
                {item.text}
            </p>
        </div>
    )
}

function Video({ item }: { item: Extract<EditorialItem, { kind: "video" }> }) {
    return (
        <figure className="mb-14 md:mb-20" data-reveal-group>
            {item.label && <Label>{item.label}</Label>}
            <div
                data-reveal-card
                className="relative w-full overflow-hidden rounded-2xl bg-[#111010] border border-[#1D1B1A]"
            >
                <video
                    className="w-full h-auto block"
                    src={item.url}
                    poster={item.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
            </div>
            {item.caption && <Caption>{item.caption}</Caption>}
        </figure>
    )
}

/**
 * Hueco reservado. En el Figma son marcos punteados vacíos y acá se ven igual:
 * mostrar el espacio con su nombre dice la verdad —la pieza no existe todavía—
 * mejor que esconder la sección y que nadie se acuerde de completarla.
 */
function Slot({ item }: { item: Extract<EditorialItem, { kind: "slot" }> }) {
    return (
        <div
            data-reveal-card
            className="rounded-xl border border-dashed border-[#D8D2C6] bg-[#F3EFE7] px-6 py-12 text-center min-h-[180px] flex flex-col items-center justify-center"
        >
            <p className="text-[14px] text-[#14110F]">{item.title}</p>
            {item.note && (
                <p className="text-[12px] text-[#8A8681] mt-1.5">{item.note}</p>
            )}
        </div>
    )
}

function Palette({ item }: { item: Extract<EditorialItem, { kind: "palette" }> }) {
    return (
        <div className="mb-14 md:mb-20" data-reveal-group>
            {item.label && <Label>{item.label}</Label>}
            {/* Tantas columnas como colores (tope 6): con una paleta de tres,
                la mitad de la caja quedaba vacía. */}
            <div
                data-reveal-card
                className="grid grid-cols-3 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))] overflow-hidden rounded-2xl border border-[#EAE7E1]"
                style={{ "--n": Math.min(item.colors.length, 6) } as React.CSSProperties}
            >
                {item.colors.map((c) => {
                    // Un hex claro necesita texto oscuro encima: se decide por
                    // luminancia y no a mano, así una paleta nueva no se rompe.
                    const n = parseInt(c.hex.replace("#", ""), 16)
                    const lum =
                        (0.2126 * ((n >> 16) & 255) +
                            0.7152 * ((n >> 8) & 255) +
                            0.0722 * (n & 255)) /
                        255
                    const fg = lum > 0.6 ? "#14110F" : "#FDFDFD"
                    return (
                        <div
                            key={c.hex + c.name}
                            className="aspect-[4/5] sm:aspect-[3/4] p-4 flex flex-col justify-between"
                            style={{ backgroundColor: c.hex }}
                        >
                            <span className="text-[12px]" style={{ color: fg }}>
                                {c.name}
                            </span>
                            <span
                                className="text-[10px] font-mono opacity-70"
                                style={{ color: fg }}
                            >
                                {c.hex.toUpperCase()}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function TypeSpecimen({
    item,
}: {
    item: Extract<EditorialItem, { kind: "typespecimen" }>
}) {
    return (
        <div className="mb-14 md:mb-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-[#EAE7E1] rounded-2xl overflow-hidden border border-[#EAE7E1]" data-reveal-group>
            {item.faces.map((f) => (
                <div key={f.name} data-reveal-card className="bg-[#FFFFFA] p-7 md:p-9">
                    <p
                        className={`text-[26px] md:text-[30px] text-[#14110F] ${
                            f.serif ? `${editorialSerif.className} italic` : ""
                        }`}
                    >
                        {f.name}
                    </p>
                    <p
                        className={`text-[76px] md:text-[104px] leading-none text-[#14110F] mt-6 mb-8 ${
                            f.serif ? `${editorialSerif.className} italic` : ""
                        }`}
                    >
                        Aa
                    </p>
                    {f.note && (
                        <p className="text-[13px] text-[#6F6B66] mb-2">{f.note}</p>
                    )}
                    {f.weights?.length && (
                        <p className="text-[12px] text-[#8A8681]">
                            {f.weights.join("  ·  ")}
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}

function TypeScale({ item }: { item: Extract<EditorialItem, { kind: "typescale" }> }) {
    // Cada fila se pinta al tamaño que declara: la escala se lee mirándola,
    // no leyendo los números.
    return (
        <div className="mb-14 md:mb-20" data-reveal-group>
            {item.rows.map((r) => (
                <div
                    key={r.label}
                    data-reveal-card
                    className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-2 md:gap-8 items-baseline py-5 border-t border-[#EAE7E1] first:border-t-0"
                >
                    <p className="text-[11px] text-[#8A8681] whitespace-nowrap">
                        {r.label} · {r.size}
                    </p>
                    <p
                        className="text-[#14110F] leading-[1.15] tracking-[-0.02em] min-w-0 break-words"
                        // El tamaño declarado es el techo: en una pantalla
                        // angosta 64px se sale de la columna.
                        style={{ fontSize: `min(${r.size}, 9vw)` }}
                    >
                        {r.text}
                    </p>
                </div>
            ))}
        </div>
    )
}

function Fields({ item }: { item: Extract<EditorialItem, { kind: "fields" }> }) {
    return (
        <div
            data-reveal-group
            className="mb-14 md:mb-20 grid grid-cols-2 md:grid-cols-3 gap-y-7 gap-x-8 pt-7 border-t border-[#EAE7E1]"
        >
            {item.rows.map((r) => (
                <div key={r.label} data-reveal-card>
                    <Field row={r} />
                </div>
            ))}
        </div>
    )
}

function Metrics({ item }: { item: Extract<EditorialItem, { kind: "metrics" }> }) {
    return (
        <div className="mb-14 md:mb-20" data-reveal-group>
            {item.note && (
                <p className="text-[14px] text-[#8A8681] mb-5">{item.note}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
                {item.items.map((m, i) => (
                    <div
                        key={i}
                        data-reveal-card
                        className="rounded-2xl bg-[#F3EFE7] px-7 py-9"
                    >
                        <p
                            className={`text-[44px] md:text-[52px] leading-none tracking-[-0.03em] ${
                                m.pending ? "text-[#C3BCB1]" : "text-[#14110F]"
                            }`}
                        >
                            {m.value}
                        </p>
                        <p
                            className={`text-[12px] mt-3 ${
                                m.pending ? "text-[#C3BCB1] italic" : "text-[#6F6B66]"
                            }`}
                        >
                            {m.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function NextProject({ item }: { item: Extract<EditorialItem, { kind: "next" }> }) {
    return (
        <a
            href={item.href}
            data-reveal-card
            className="group mt-4 mb-4 flex items-center justify-between gap-6 rounded-2xl bg-[#2C0405] px-8 py-9 md:px-11 md:py-12 transition-colors hover:bg-[#3A0708]"
        >
            <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.14em] text-[#C7A9AA] mb-2">
                    {item.label}
                </span>
                <span className={`block italic text-[34px] md:text-[44px] leading-none text-[#F7EFEF] ${editorialSerif.className}`}>
                    {item.title}
                </span>
            </span>
            <span
                aria-hidden
                className="shrink-0 text-[#F7EFEF] text-2xl transition-transform duration-300 group-hover:translate-x-1.5"
            >
                →
            </span>
        </a>
    )
}

/* ------------------------------- despacho ------------------------------- */

export function EditorialItemView({ item }: { item: EditorialItem }) {
    switch (item.kind) {
        case "figure":
            return <Figure item={item} />
        case "grid":
            return <Grid item={item} />
        case "note":
            return <Note item={item} />
        case "video":
            return <Video item={item} />
        case "slot":
            return <Slot item={item} />
        case "palette":
            return <Palette item={item} />
        case "typespecimen":
            return <TypeSpecimen item={item} />
        case "typescale":
            return <TypeScale item={item} />
        case "fields":
            return <Fields item={item} />
        case "metrics":
            return <Metrics item={item} />
        case "next":
            return <NextProject item={item} />
        case "sitemap":
            // El árbol arrastrable del sitio, tal cual, dentro de la plantilla.
            return (
                <div className="mb-14 md:mb-20">
                    <SiteMapSection
                        heading={item.heading}
                        description={item.description}
                        slugs={item.slugs}
                        rootLabel={item.rootLabel}
                    />
                </div>
            )
        default:
            return null
    }
}

/** Los slots van en fila, no uno debajo del otro. */
export function SlotRow({ items }: { items: EditorialItem[] }) {
    return (
        <div
            data-reveal-group
            className="mb-14 md:mb-20 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5"
        >
            {items.map((it, i) =>
                it.kind === "slot" ? <Slot key={i} item={it} /> : null,
            )}
        </div>
    )
}
