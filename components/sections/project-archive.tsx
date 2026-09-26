"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ChevronDown, Search, X } from "lucide-react"
import { useReducedMotion } from "framer-motion"
import { usePortfolioItems } from "@/hooks/usePublicData"
import type { PortfolioItem } from "@/types/livv-os"
import { trackPortfolioItemClick } from "@/lib/analytics"
import { pickDisplayCover, pickPosterCover, isVideoCoverUrl } from "@/lib/default-project-blocks"
import styles from "./project-archive.module.css"

type ArchiveProject = PortfolioItem & { _is_draft?: boolean }
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
const projectName = (title: string) => title.replace(/^case study\s*[—–:-]\s*/i, "")
// Featured first, video covers ahead of stills; the sort is stable, so the CMS display_order holds inside each group.
const priority = (project: ArchiveProject) => (project.featured ? 0 : 2) + (isVideoCoverUrl(pickDisplayCover(project)) ? 0 : 1)

function VideoPreview({ src }: { src: string }) {
    const [playing, setPlaying] = useState(false)
    const [failed, setFailed] = useState(false)

    if (failed) return null

    return (
        <video src={src} autoPlay muted loop playsInline preload="none" aria-hidden="true"
            className={`${styles.image} ${styles.video}`}
            style={{ opacity: playing ? 1 : 0 }}
            onPlaying={() => setPlaying(true)}
            onError={() => setFailed(true)} />
    )
}

function ProjectCard({ project, isPreview }: { project: ArchiveProject; isPreview: boolean }) {
    const [imageFailed, setImageFailed] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [focused, setFocused] = useState(false)
    const reducedMotion = useReducedMotion()
    const cover = pickDisplayCover(project)
    const isVideo = isVideoCoverUrl(cover)
    const image = isVideo ? pickPosterCover(project) : cover
    const title = projectName(project.title)

    return (
        <li>
            <Link
                href={`/projects/${project.slug}`}
                className={styles.card}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onClick={() => trackPortfolioItemClick(project.slug || title, "project_archive_grid")}
            >
                <div className={styles.cover}>
                    {image && !imageFailed ? (
                        <Image src={image} alt={`${title} — project preview`} fill
                            sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1199px) calc((100vw - 122px) / 2), 539px"
                            className={styles.image} onError={() => setImageFailed(true)} />
                    ) : (
                        <span className={styles.coverFallback}>{title}</span>
                    )}
                    {isVideo && cover && (hovered || focused) && reducedMotion === false && (
                        <VideoPreview src={cover} />
                    )}
                    {isPreview && project._is_draft && <span className={styles.draft}>Draft</span>}
                </div>
                <div className={styles.cardMeta}>
                    <span>{project.category || "Project"}</span>
                    {project.year && <span>{project.year}</span>}
                </div>
                <div className={styles.cardTitle}>
                    <h3>{title}</h3>
                    <ArrowUpRight size={17} aria-hidden="true" />
                </div>
                {(project.subtitle || project.description) && (
                    <p className={styles.description}>{project.subtitle || project.description}</p>
                )}
            </Link>
        </li>
    )
}

export function ProjectArchive() {
    const { data, loading, error, refresh, isPreview } = usePortfolioItems()
    const projects = (data as ArchiveProject[]).filter(project => project.slug).sort((a, b) => priority(a) - priority(b))
    const [featuredOnly, setFeaturedOnly] = useState(false)
    const [category, setCategory] = useState("")
    const [query, setQuery] = useState("")
    const categories = Array.from(new Set(projects.map(project => project.category?.trim()).filter(Boolean))) as string[]
    categories.sort((a, b) => a.localeCompare(b))
    const filtered = projects.filter(project => {
        const searchable = [project.title, project.subtitle, project.description, project.category, project.services, ...(project.tech_tags || [])].filter(Boolean).join(" ")
        return (!featuredOnly || project.featured)
            && (!category || project.category?.trim() === category)
            && normalize(searchable).includes(normalize(query.trim()))
    })
    const hasFilters = featuredOnly || category !== "" || query !== ""
    function clearFilters() { setFeaturedOnly(false); setCategory(""); setQuery("") }

    return (
        <section className={styles.archive} aria-label="Explore projects">
            <h2 className="sr-only">Projects</h2>
            <div className={styles.toolbar}>
                <div className={styles.scope} role="group" aria-label="Project selection">
                    <button type="button" aria-pressed={!featuredOnly} onClick={() => setFeaturedOnly(false)}>
                        All projects <span>{loading ? "—" : projects.length}</span>
                    </button>
                    <button type="button" aria-pressed={featuredOnly} onClick={() => setFeaturedOnly(true)}>
                        Featured <span>{loading ? "—" : projects.filter(project => project.featured).length}</span>
                    </button>
                </div>
                <div className={styles.filters}>
                    <div className={styles.select}>
                        <select aria-label="Filter by category" value={category} onChange={event => setCategory(event.target.value)}>
                            <option value="">All categories</option>
                            {categories.map(value => <option key={value} value={value}>{value}</option>)}
                        </select>
                        <ChevronDown size={14} aria-hidden="true" />
                    </div>
                    <div className={styles.search}>
                        <Search size={15} aria-hidden="true" />
                        <input type="search" aria-label="Search projects" placeholder="Search projects" value={query} onChange={event => setQuery(event.target.value)} />
                        {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={14} /></button>}
                    </div>
                </div>
            </div>

            <div className={styles.results}>
                <p role="status" aria-live="polite">
                    {loading ? "Loading projects…" : `${filtered.length} ${filtered.length === 1 ? "project" : "projects"}${hasFilters ? ` of ${projects.length}` : " to explore"}`}
                </p>
                {hasFilters && <button type="button" onClick={clearFilters}>Reset filters <X size={12} aria-hidden="true" /></button>}
            </div>

            {loading ? (
                <div className={styles.grid} aria-hidden="true">
                    {Array.from({ length: 6 }, (_, i) => <div key={i} className={styles.skeleton} />)}
                </div>
            ) : error && projects.length === 0 ? (
                <div className={styles.empty}>
                    <h2>Projects couldn’t load.</h2>
                    <p>Please try again in a moment.</p>
                    <button type="button" onClick={() => refresh()}>Try again</button>
                </div>
            ) : filtered.length ? (
                <ul className={styles.grid}>
                    {filtered.map(project => <ProjectCard key={project.id} project={project} isPreview={isPreview} />)}
                </ul>
            ) : (
                <div className={styles.empty}>
                    <h2>{hasFilters ? "No matching projects." : "More work is on its way."}</h2>
                    <p>{hasFilters ? "Try a different search or reset the filters to explore all projects." : "Check back soon for new case studies."}</p>
                    {hasFilters && <button type="button" onClick={clearFilters}>Show all projects</button>}
                </div>
            )}
        </section>
    )
}
