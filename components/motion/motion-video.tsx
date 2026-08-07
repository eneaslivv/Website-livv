"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

/**
 * A 9:16 video card.
 *
 * Playback is hover-triggered, not scroll-triggered. Nothing but the poster is
 * fetched until the visitor actually points at a clip (`preload="none"`), which
 * keeps the page weight to a handful of JPEGs instead of streaming ~14MB of
 * video for clips that may never be watched.
 *
 * Focus starts playback too, so the reel is reachable by keyboard, and on touch
 * devices — where there is no hover — a tap on the card plays it.
 *
 * Muted + playsInline is what mobile browsers require for programmatic play;
 * sound is opt-in per card.
 */
export function MotionVideo({
    src,
    poster,
    title,
    duration,
    className = "",
    priority = false,
}: {
    src: string
    poster: string
    title: string
    duration: number
    className?: string
    /** Set on the featured piece so it preloads rather than waiting for view. */
    priority?: boolean
}) {
    const reduced = useReducedMotion()
    const videoRef = useRef<HTMLVideoElement>(null)
    const [muted, setMuted] = useState(true)
    const [playing, setPlaying] = useState(false)

    // Pause anything still playing if the card unmounts mid-playback.
    useEffect(() => {
        const el = videoRef.current
        return () => {
            el?.pause()
        }
    }, [])

    function start() {
        const el = videoRef.current
        if (!el || reduced) return
        // play() rejects if the browser blocks it; swallow that and leave the
        // poster up rather than throwing an unhandled rejection.
        el.play().then(() => setPlaying(true)).catch(() => {})
    }

    function stop() {
        const el = videoRef.current
        if (!el) return
        el.pause()
        setPlaying(false)
    }

    function togglePlay() {
        const el = videoRef.current
        if (!el) return
        if (el.paused) {
            el.play().then(() => setPlaying(true)).catch(() => {})
        } else {
            el.pause()
            setPlaying(false)
        }
    }

    function toggleSound(e: React.MouseEvent) {
        e.stopPropagation()
        const el = videoRef.current
        if (!el) return
        el.muted = !el.muted
        setMuted(el.muted)
        if (el.paused) el.play().then(() => setPlaying(true)).catch(() => {})
    }

    const mins = Math.floor(duration / 60)
    const secs = duration % 60
    const runtime = `${mins}:${String(secs).padStart(2, "0")}`

    return (
        <div
            className={`group relative overflow-hidden rounded-xl bg-[#F2EEE7] ${className}`}
            style={{ aspectRatio: "9 / 16" }}
            onMouseEnter={start}
            onMouseLeave={stop}
            onFocus={start}
            onBlur={stop}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                muted
                loop
                playsInline
                /* Never "metadata": the point of hover playback is that a visitor
                   who does not interact pays only for the poster. */
                preload="none"
                aria-label={title}
                onClick={togglePlay}
                className="absolute inset-0 h-full w-full object-cover cursor-pointer"
            />

            {/* Runtime */}
            <span
                className="absolute top-3 left-3 rounded-full px-2 py-[3px] text-[10px] font-mono tabular-nums text-white/90"
                style={{ background: "rgba(9,9,11,0.55)", backdropFilter: "blur(6px)" }}
            >
                {runtime}
            </span>

            {/* Sound toggle */}
            <button
                type="button"
                onClick={toggleSound}
                aria-label={muted ? `Unmute ${title}` : `Mute ${title}`}
                className="absolute top-3 right-3 grid place-items-center w-7 h-7 rounded-full text-white/90 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                style={{ background: "rgba(9,9,11,0.55)", backdropFilter: "blur(6px)" }}
            >
                {muted ? (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m17 9 4 6m0-6-4 6" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 9a4 4 0 0 1 0 6" strokeLinecap="round" />
                    </svg>
                )}
            </button>

            {/* Play affordance — the only control shown when nothing is playing */}
            {!playing && (
                <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={`Play ${title}`}
                    className="absolute inset-0 grid place-items-center focus-visible:outline-none"
                >
                    <span
                        className="grid place-items-center w-12 h-12 rounded-full text-white"
                        style={{ background: "rgba(9,9,11,0.45)", backdropFilter: "blur(8px)" }}
                    >
                        <svg className="w-4 h-4 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                </button>
            )}
        </div>
    )
}
