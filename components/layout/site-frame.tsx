"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import styles from "./site-frame.module.css"

/** One uninterrupted pair of rules, independent of section padding and width. */
export function SiteFrame({ children }: { children: ReactNode }) {
    return (
        <div className={styles.frame} data-site-frame>
            {children}
            <div className={styles.rails} aria-hidden="true" data-site-rails />
        </div>
    )
}

export function PublicSiteFrame({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    // These pages use the architectural grid throughout their main layout.
    // Home owns its frame below the hero. Editorial case studies and articles
    // have their own, wider layouts; their footer keeps its existing rules.
    const framed = /^\/(about|work|contact|products)(\/|$)/.test(pathname)
    return framed ? <SiteFrame>{children}</SiteFrame> : children
}
