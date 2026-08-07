"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

/**
 * The featured product's UI, re-skinned on a loop.
 * The layout never changes — only the mark, the wordmark and the accent do.
 * That is the white-label pitch, shown instead of stated.
 */

const BRANDS = [
  {
    name: "Your Brand",
    mark: "Y",
    accent: "#b8836e",
    tint: "rgba(184,131,110,0.12)",
    swatches: ["#b8836e", "#e2c9b8", "#2c2420"],
    font: "Inter",
  },
  {
    name: "Your Client",
    mark: "C",
    accent: "#4f7d8c",
    tint: "rgba(79,125,140,0.12)",
    swatches: ["#4f7d8c", "#bcd6dd", "#1d2a2f"],
    font: "Söhne",
  },
  {
    name: "Your Agency",
    mark: "A",
    accent: "#7a6b8f",
    tint: "rgba(122,107,143,0.12)",
    swatches: ["#7a6b8f", "#d6cde2", "#251f2e"],
    font: "Satoshi",
  },
] as const

const NAV = ["Orders", "Payments", "Inventory", "Analytics"]

const ROWS = [
  { table: "Table 14", items: "3 items", amount: "$48.20", status: "Paid" },
  { table: "Table 07", items: "5 items", amount: "$112.00", status: "Open" },
  { table: "Bar 02", items: "2 items", amount: "$26.50", status: "Paid" },
  { table: "Table 21", items: "7 items", amount: "$154.90", status: "Open" },
]

export function WhitelabelShowcase() {
  const [i, setI] = useState(0)
  const brand = BRANDS[i]

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spring = { stiffness: 140, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(mouseY, [-160, 160], [3, -3]), spring)
  const rotateY = useSpring(useTransform(mouseX, [-260, 260], [-4, 4]), spring)

  useEffect(() => {
    const t = setInterval(() => setI((prev) => (prev + 1) % BRANDS.length), 3600)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className="relative w-full"
      style={{ perspective: "1400px" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - r.left - r.width / 2)
        mouseY.set(e.clientY - r.top - r.height / 2)
      }}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
        {/* The accent halo behind the window was removed: a coloured glow is the
            opposite of the restraint this section is going for, and the window
            already separates from the plate on its own. */}

        {/* App window */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(44,36,32,0.08)",
            boxShadow: "0 8px 24px rgba(44,36,32,0.07)",
          }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center gap-2 px-3.5 py-2.5 border-b"
            style={{ borderColor: "rgba(44,36,32,0.06)", background: "rgba(250,248,245,0.9)" }}
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((d) => (
                <div key={d} className="w-[7px] h-[7px] rounded-full" style={{ background: "#e2d8ce" }} />
              ))}
            </div>
            <div className="flex-1 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={brand.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="px-2.5 py-[3px] rounded-md text-[9px] text-[#8a7e74]"
                  style={{ background: "rgba(237,231,224,0.7)" }}
                >
                  app.{brand.name.toLowerCase().replace(/\s+/g, "")}.com
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* App header — the part that changes */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b" style={{ borderColor: "rgba(44,36,32,0.06)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={brand.mark}
                initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 14 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="w-7 h-7 rounded-[9px] flex items-center justify-center shrink-0"
                style={{ background: brand.accent, boxShadow: `0 4px 12px ${brand.tint}` }}
              >
                <span className="text-white text-[12px] font-semibold">{brand.mark}</span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.span
                key={brand.name}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.35 }}
                className="text-[13px] font-semibold text-[#2c2420] whitespace-nowrap"
              >
                {brand.name}
              </motion.span>
            </AnimatePresence>

            <div className="hidden sm:flex items-center gap-3.5 ml-4">
              {NAV.map((n, idx) => (
                <motion.span
                  key={n}
                  className="text-[9.5px]"
                  animate={{ color: idx === 0 ? brand.accent : "#a89e94" }}
                  transition={{ duration: 0.5 }}
                >
                  {n}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="ml-auto flex items-center gap-1 rounded-full px-2 py-[3px] text-[8.5px] font-medium"
              animate={{ backgroundColor: brand.tint, color: brand.accent }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="w-1 h-1 rounded-full"
                animate={{ backgroundColor: brand.accent, opacity: [1, 0.35, 1] }}
                transition={{ backgroundColor: { duration: 0.5 }, opacity: { duration: 1.6, repeat: Infinity } }}
              />
              Live
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 px-4 py-3.5">
            {[
              { label: "Open orders", value: "24" },
              { label: "Today", value: "$3,180" },
              { label: "Avg. ticket", value: "$41" },
            ].map((s, idx) => (
              <motion.div
                key={s.label}
                className="rounded-xl px-2.5 py-2.5"
                animate={{
                  backgroundColor: idx === 1 ? brand.tint : "rgba(44,36,32,0.032)",
                }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-[8px] text-[#8a7e74] uppercase tracking-[0.08em]">{s.label}</p>
                <motion.p
                  className="text-[16px] font-semibold mt-1 tabular-nums leading-none"
                  animate={{ color: idx === 1 ? brand.accent : "#2c2420" }}
                  transition={{ duration: 0.5 }}
                >
                  {s.value}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Table */}
          <div className="px-4 pb-4">
            <div className="grid grid-cols-[1fr_54px_62px_48px] gap-1 mb-2">
              {["Order", "Items", "Amount", "Status"].map((h) => (
                <span key={h} className="text-[7.5px] font-semibold uppercase tracking-[0.1em] text-[#8a7e74]/70">
                  {h}
                </span>
              ))}
            </div>
            {ROWS.map((r) => (
              <div
                key={r.table}
                className="grid grid-cols-[1fr_54px_62px_48px] gap-1 items-center py-[6px] border-b last:border-0"
                style={{ borderColor: "rgba(44,36,32,0.05)" }}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <motion.div
                    className="w-[15px] h-[15px] rounded-[5px] shrink-0"
                    animate={{ backgroundColor: brand.tint }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="text-[9.5px] font-medium text-[#2c2420] truncate">{r.table}</span>
                </div>
                <span className="text-[8.5px] text-[#8a7e74]">{r.items}</span>
                <span className="text-[8.5px] text-[#2c2420] tabular-nums">{r.amount}</span>
                <motion.span
                  className="text-[8px] font-medium rounded-full px-1.5 py-[2px] text-center"
                  animate={
                    r.status === "Paid"
                      ? { backgroundColor: brand.tint, color: brand.accent }
                      : { backgroundColor: "rgba(44,36,32,0.05)", color: "#8a7e74" }
                  }
                  transition={{ duration: 0.5 }}
                >
                  {r.status}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand kit card — the "customize" step, floating in front */}
        <motion.div
          className="absolute -left-3 sm:-left-7 -bottom-7 w-[164px] rounded-2xl p-3.5"
          style={{
            transform: "translateZ(60px)",
            // Solid rather than glass: the blur-plus-inset-highlight treatment
            // was the most decorative thing in the composition.
            background: "#ffffff",
            border: "1px solid rgba(44,36,32,0.08)",
            boxShadow: "0 10px 28px rgba(44,36,32,0.10)",
          }}
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[8px] uppercase tracking-[0.14em] text-[#8a7e74] mb-2.5">Brand kit</p>

          <div className="flex items-center gap-2 mb-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={brand.mark}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.35 }}
                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                style={{ background: brand.accent }}
              >
                <span className="text-white text-[9px] font-semibold">{brand.mark}</span>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={brand.font}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] text-[#2c2420] font-medium truncate"
              >
                {brand.font}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex gap-1.5 mb-3">
            {brand.swatches.map((s, idx) => (
              <motion.div
                key={idx}
                className="flex-1 h-5 rounded-md"
                animate={{ backgroundColor: s }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[8.5px] text-[#8a7e74]">Domain</span>
            <motion.span
              className="text-[8.5px] font-medium"
              animate={{ color: brand.accent }}
              transition={{ duration: 0.5 }}
            >
              Connected
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      <div className="flex items-center gap-2 mt-11 justify-end">
        {BRANDS.map((b, idx) => (
          <button
            key={b.name}
            aria-label={`Preview ${b.name}`}
            onClick={() => setI(idx)}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: idx === i ? 20 : 6,
              backgroundColor: idx === i ? brand.accent : "rgba(44,36,32,0.18)",
            }}
          />
        ))}
        <span className="ml-2 text-[11px] text-[#5c534c]">Built by LIVV. Branded as yours.</span>
      </div>
    </div>
  )
}
