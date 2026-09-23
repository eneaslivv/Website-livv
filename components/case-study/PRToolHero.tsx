"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useReducedMotion } from "framer-motion"
import type { EditorialDoc } from "@/types/case-study-editorial"
import { editorialSerif } from "./fonts"
import styles from "./PRToolHero.module.css"

const PRToolShader = dynamic(() => import("./PRToolShader"), { ssr: false })

const dotLayers = [
    { file: "dots-bottom.svg", y: 564.42, width: 1015.86, height: 31.86 },
    { file: "dots-lower.svg", y: 534.42, width: 1015.86, height: 28.86 },
    { file: "dots-middle.svg", y: 510.42, width: 1015.86, height: 22.86 },
    { file: "dots-upper.svg", y: 483.42, width: 1015.86, height: 25.86 },
    { file: "dots-main.svg", y: 0.42, width: 1018.86, height: 481.86 },
]

export function PRToolHero({ doc }: { doc: EditorialDoc }) {
    const reducedMotion = useReducedMotion()
    const [shaderReady, setShaderReady] = useState(false)
    const [shaderUnavailable, setShaderUnavailable] = useState(false)
    const showShader = reducedMotion === false && !shaderUnavailable

    return (
        <header className={styles.hero} data-node-id="76:1171">
            <div
                aria-hidden="true"
                className={styles.dots}
                data-node-id="117:892"
                style={{ opacity: showShader && shaderReady ? 0 : 0.55 }}
            >
                <svg className={styles.artwork} viewBox="0 0 1020 600" preserveAspectRatio="xMidYMid slice" focusable="false">
                    {dotLayers.map((layer) => (
                        <image key={layer.file} href={`/images/case-studies/pr-tool/${layer.file}`} x={0.42} y={layer.y} width={layer.width} height={layer.height} />
                    ))}
                </svg>
            </div>

            {showShader && (
                <div aria-hidden="true" className={styles.shader} data-shader-ready={shaderReady}>
                    <PRToolShader
                        onReady={() => setShaderReady(true)}
                        onUnavailable={() => setShaderUnavailable(true)}
                    />
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.eyebrow}>
                    <span>{doc.kicker}</span>
                    <span className={styles.counter}>
                        Case study · 01 / {String(doc.sections.length).padStart(2, "0")}
                    </span>
                </div>

                <h1 className={styles.title}>{doc.title}</h1>

                {doc.tagline && (
                    <p className={styles.tagline}>
                        {doc.tagline.before}
                        {doc.tagline.em && (
                            <span className={`${editorialSerif.className} ${styles.emphasis}`}>
                                {doc.tagline.em}
                            </span>
                        )}
                        {doc.tagline.after}
                    </p>
                )}

                {!!doc.meta?.length && (
                    <dl className={styles.metadata}>
                        {doc.meta.map((field) => (
                            <div key={field.label}>
                                <dt>{field.label}</dt>
                                <dd title={field.pending ? "Pendiente en el Figma" : undefined}>
                                    {field.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                )}
            </div>
        </header>
    )
}
