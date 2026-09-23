"use client"

import { useEffect, useRef } from "react"
import land from "./data/world-land-dots.json"
import styles from "./wireframe-dotted-globe.module.css"

const cities = [
    { name: "Buenos Aires", lon: -58.38, lat: -34.6, dx: 10, dy: 21 },
    { name: "Toronto", lon: -79.38, lat: 43.65, dx: -34, dy: -17 },
    { name: "New York", lon: -74.01, lat: 40.71, dx: 12, dy: 17 },
    { name: "London", lon: -0.13, lat: 51.51, dx: 10, dy: -11 },
    { name: "Spain", lon: -3.7, lat: 40.42, dx: 10, dy: 18 },
    { name: "Silicon Valley", lon: -122.08, lat: 37.39, dx: -17, dy: -12 },
    { name: "Mexico", lon: -99.13, lat: 19.43, dx: -43, dy: 14 },
]
type Vector = [number, number, number]
const RAD = Math.PI / 180
const vector = (lon: number, lat: number): Vector => [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)]
const dots = land.map(([lon, lat]) => ({ point: vector(lon, lat), lon, lat }))
const ocean = Array.from({ length: 1100 }, (_, i): Vector => {
    const y = 1 - (i + 0.5) * 2 / 1100
    const angle = i * Math.PI * (3 - Math.sqrt(5))
    return [Math.sqrt(1 - y * y) * Math.sin(angle), y, Math.sqrt(1 - y * y) * Math.cos(angle)]
})
const locations = cities.map(city => vector(city.lon, city.lat))
const routes = locations.slice(1).map(end => {
    const start = locations[0]
    const angle = Math.acos(Math.min(1, start.reduce((sum, v, i) => sum + v * end[i], 0)))
    return Array.from({ length: 65 }, (_, i): Vector => {
        const t = i / 64
        const a = Math.sin((1 - t) * angle) / Math.sin(angle)
        const b = Math.sin(t * angle) / Math.sin(angle)
        return start.map((v, j) => (a * v + b * end[j]) * (1 + Math.sin(t * Math.PI) * 0.035)) as Vector
    })
})

/** A draggable particle globe without a solid surface or hard outline. */
export default function RotatingEarth() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !container || !ctx) return
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
        const fontFamily = getComputedStyle(container).fontFamily
        let width = 0, height = 0, frame = 0, last = 0, time = 0
        let visible = false, hovered = false, pointerX = 0, pointerY = 0, tiltX = 0, tiltY = 0, emphasis = 0
        let longitude = -55, latitude = 5, dragging = false, dragX = 0, dragY = 0, resumeAt = 0

        const render = () => {
            const clock = reducedMotion.matches ? 0 : time
            const radius = Math.min(width * 0.46, height * 0.53)
            const yaw = (longitude + tiltX * 1.5) * RAD, pitch = (latitude + tiltY) * RAD
            const project = ([x, y, z]: Vector): Vector => {
                const side = x * Math.cos(yaw) - z * Math.sin(yaw)
                const depth = x * Math.sin(yaw) + z * Math.cos(yaw)
                return [width * 0.54 + radius * side, height * 0.5 - radius * (y * Math.cos(pitch) - depth * Math.sin(pitch)), y * Math.sin(pitch) + depth * Math.cos(pitch)]
            }
            ctx.clearRect(0, 0, width, height)
            // A sparse atmospheric field keeps the round silhouette without a disk.
            for (const point of ocean) {
                const [x, y, depth] = project(point)
                if (depth <= 0.02) continue
                ctx.fillStyle = `rgba(131,111,107,${0.025 + depth * 0.035})`
                ctx.fillRect(x, y, 0.9, 0.9)
            }
            for (const { point, lon, lat } of dots) {
                const [x, y, depth] = project(point)
                if (depth <= 0.025) continue
                const wave = (Math.sin(lon * 0.075 + lat * 0.085 - clock * 0.32) + 1) / 2
                const edge = Math.min(1, depth * 4)
                const proximity = Math.exp(-((x / width - (pointerX + 1) / 2) ** 2 + (y / height - (pointerY + 1) / 2) ** 2) * 18) * emphasis
                const size = (1.2 + wave * 0.9 + proximity * 0.4) * Math.min(1, width / 470)
                ctx.fillStyle = `rgba(${125 + wave * 21},${104 - proximity * 27},${100 - proximity * 14},${(0.13 + wave * 0.2 + proximity * 0.14) * edge})`
                ctx.fillRect(x - size / 2, y - size / 2, size, size)
            }

            routes.forEach((route, index) => {
                ctx.beginPath()
                let started = false
                route.forEach(point => {
                    const [x, y, depth] = project(point)
                    if (depth < 0.025) { started = false; return }
                    if (started) ctx.lineTo(x, y); else ctx.moveTo(x, y)
                    started = true
                })
                ctx.strokeStyle = `rgba(121,76,68,${0.15 + emphasis * 0.12})`; ctx.lineWidth = 0.65; ctx.stroke()
                const t = reducedMotion.matches ? 0.5 : (clock * 0.06 + index / 6) % 1
                const [x, y, depth] = project(route[Math.floor(t * 64)])
                if (depth > 0.025) { ctx.fillStyle = "rgba(121,62,65,.45)"; ctx.fillRect(x - 1, y - 1, 2, 2) }
            })

            ctx.font = `${width < 440 ? 10 : 11}px ${fontFamily}`
            const labels: Array<{ x: number; y: number; width: number }> = []
            cities.forEach((city, index) => {
                const [x, y, depth] = project(locations[index])
                if (depth <= 0.08) return
                ctx.globalAlpha = Math.min(1, (depth - 0.08) * 7)
                const size = index === 0 ? 4 : 3
                ctx.fillStyle = `rgba(131,66,70,${0.07 + emphasis * 0.04})`; ctx.fillRect(x - 6, y - 6, 12, 12)
                ctx.fillStyle = "#98676a"; ctx.fillRect(x - size / 2, y - size / 2, size, size)
                const labelWidth = ctx.measureText(city.name).width
                const labelX = Math.max(12, Math.min(width - labelWidth - 15, x + city.dx))
                let labelY = Math.max(24, Math.min(height - 30, y + city.dy))
                for (let attempt = 0; attempt < 5 && labels.some(label => Math.abs(label.y - labelY) < 14 && labelX < label.x + label.width + 5 && labelX + labelWidth + 5 > label.x); attempt++) labelY += 14
                labels.push({ x: labelX, y: labelY, width: labelWidth })
                ctx.fillStyle = "#756d63"; ctx.fillText(city.name, labelX, labelY)
                ctx.globalAlpha = 1
            })
        }

        const tick = (now: number) => {
            frame = 0
            if (!visible || document.hidden) { last = 0; return }
            if (!last || now - last >= 32) {
                const delta = last ? Math.min((now - last) / 1000, 0.05) : 0
                time += delta
                if (!reducedMotion.matches && !dragging && !hovered && now > resumeAt) longitude = (longitude + delta * 3) % 360
                last = now
                tiltX += (pointerX - tiltX) * 0.07; tiltY += (pointerY - tiltY) * 0.07
                emphasis += ((hovered ? 1 : 0) - emphasis) * 0.06
                render()
            }
            if (!reducedMotion.matches) frame = requestAnimationFrame(tick)
        }
        const start = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick) }
        const resize = () => {
            const bounds = container.getBoundingClientRect()
            width = bounds.width; height = bounds.height
            const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
            canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0); render()
        }
        const move = (event: PointerEvent) => {
            if (dragging) {
                longitude -= (event.clientX - dragX) * 0.35
                if (event.pointerType !== "touch") latitude = Math.max(-60, Math.min(60, latitude + (event.clientY - dragY) * 0.25))
                dragX = event.clientX; dragY = event.clientY
                render()
            }
            if (event.pointerType === "touch" || reducedMotion.matches) return
            const bounds = container.getBoundingClientRect()
            hovered = true
            pointerX = (event.clientX - bounds.left) / width * 2 - 1
            pointerY = (event.clientY - bounds.top) / height * 2 - 1
        }
        const leave = () => { hovered = false; pointerX = 0; pointerY = 0 }
        const down = (event: PointerEvent) => {
            if (event.button !== 0) return
            dragging = true; dragX = event.clientX; dragY = event.clientY
            container.setPointerCapture(event.pointerId)
            container.dataset.dragging = "true"
        }
        const up = (event: PointerEvent) => {
            dragging = false; resumeAt = performance.now() + 2500
            delete container.dataset.dragging
            if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId)
            if (event.pointerType === "touch") leave()
        }
        const keydown = (event: KeyboardEvent) => {
            if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return
            event.preventDefault()
            if (event.key === "Home") { longitude = -55; latitude = 5 }
            if (event.key === "ArrowLeft") longitude -= 12
            if (event.key === "ArrowRight") longitude += 12
            if (event.key === "ArrowUp") latitude = Math.min(60, latitude + 8)
            if (event.key === "ArrowDown") latitude = Math.max(-60, latitude - 8)
            resumeAt = performance.now() + 4000; render()
        }
        const motionChange = () => { cancelAnimationFrame(frame); frame = 0; render(); start() }
        const resizeObserver = new ResizeObserver(resize)
        const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start() }, { threshold: 0.05 })
        resizeObserver.observe(container); observer.observe(container)
        container.addEventListener("pointermove", move); container.addEventListener("pointerleave", leave)
        container.addEventListener("pointerdown", down); container.addEventListener("pointerup", up)
        container.addEventListener("pointercancel", up); container.addEventListener("lostpointercapture", up)
        container.addEventListener("keydown", keydown)
        reducedMotion.addEventListener("change", motionChange); document.addEventListener("visibilitychange", start)
        return () => {
            cancelAnimationFrame(frame); resizeObserver.disconnect(); observer.disconnect()
            container.removeEventListener("pointermove", move); container.removeEventListener("pointerleave", leave)
            container.removeEventListener("pointerdown", down); container.removeEventListener("pointerup", up)
            container.removeEventListener("pointercancel", up); container.removeEventListener("lostpointercapture", up)
            container.removeEventListener("keydown", keydown)
            reducedMotion.removeEventListener("change", motionChange); document.removeEventListener("visibilitychange", start)
        }
    }, [])

    return <div ref={containerRef} className={styles.globe} tabIndex={0} role="group" aria-label="Interactive globe. Drag or use arrow keys to rotate. Home resets the view. Buenos Aires connects with Toronto, New York, London, Spain, Silicon Valley and Mexico." data-about-globe>
        <canvas ref={canvasRef} aria-hidden="true" className={styles.canvas} />
        <span className={styles.hint} aria-hidden="true">↔ Drag to rotate</span>
    </div>
}
