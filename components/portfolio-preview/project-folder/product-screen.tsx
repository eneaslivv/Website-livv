"use client"

import type { ScreenVariant } from "@/lib/portfolio-data"

/**
 * Renders a product UI mock instead of a stock photo.
 * Everything is drawn in markup, so cards never show broken images
 * and every screen shares the same 16:10 proportion and visual language.
 */

const BASE_W = 260
const BASE_H = 162
export const SCREEN_RATIO = BASE_W / BASE_H

const INK = "#2c2420"

interface ProductScreenProps {
  variant: ScreenVariant
  accent: string
  /** Varies the content so the screens behind don't look identical */
  index?: number
  width: number
}

function Bar({ w, h = 3, o = 0.14, r = 2 }: { w: number | string; h?: number; o?: number; r?: number }) {
  return (
    <div
      style={{
        width: typeof w === "number" ? `${w}px` : w,
        height: `${h}px`,
        borderRadius: `${r}px`,
        backgroundColor: INK,
        opacity: o,
      }}
    />
  )
}

function Header({ accent, index }: { accent: string; index: number }) {
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 shrink-0"
      style={{
        height: 22,
        borderBottom: "1px solid rgba(44,36,32,0.06)",
        background: `linear-gradient(180deg, ${accent}12 0%, ${accent}04 100%)`,
      }}
    >
      <div
        className="rounded-[3px] shrink-0"
        style={{ width: 9, height: 9, backgroundColor: accent, boxShadow: `0 1px 3px ${accent}66` }}
      />
      <Bar w={index % 2 === 0 ? 24 : 30} h={3} o={0.3} />
      <div className="flex items-center gap-2 ml-2">
        {[16, 20, 14].map((w, i) => (
          <Bar key={i} w={w} h={2.5} o={i === 0 ? 0.22 : 0.11} />
        ))}
      </div>
      <div
        className="ml-auto rounded-full flex items-center gap-1 px-1.5"
        style={{ height: 9, background: `${accent}1f` }}
      >
        <div className="rounded-full" style={{ width: 3, height: 3, background: accent }} />
        <Bar w={9} h={2} o={0.18} />
      </div>
    </div>
  )
}

function Sidebar({ accent, index }: { accent: string; index: number }) {
  return (
    <div
      className="flex flex-col gap-2 py-2.5 px-2 shrink-0"
      style={{ width: 38, borderRight: "1px solid rgba(44,36,32,0.05)", background: "rgba(44,36,32,0.018)" }}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const active = i === index % 5
        return (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="rounded-[2px] shrink-0"
              style={{ width: 5, height: 5, backgroundColor: active ? accent : INK, opacity: active ? 1 : 0.16 }}
            />
            <Bar w={i % 2 === 0 ? 18 : 13} h={2.5} o={active ? 0.28 : 0.11} />
          </div>
        )
      })}
    </div>
  )
}

function StatRow({ accent, highlight = 1 }: { accent: string; highlight?: number }) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-[5px] px-1.5 py-1.5 flex flex-col gap-1"
          style={{ background: i === highlight ? `${accent}1c` : "rgba(44,36,32,0.035)" }}
        >
          <Bar w={16} h={2} o={0.14} />
          <div
            className="rounded-[2px]"
            style={{
              width: i === highlight ? 24 : 18,
              height: 5,
              backgroundColor: i === highlight ? accent : INK,
              opacity: i === highlight ? 0.9 : 0.28,
            }}
          />
        </div>
      ))}
    </div>
  )
}

function TableRows({ accent, rows, activeRow }: { accent: string; rows: number; activeRow: number }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 pb-1">
        <Bar w={22} h={2} o={0.12} />
        <div className="ml-auto flex gap-3">
          <Bar w={18} h={2} o={0.12} />
          <Bar w={16} h={2} o={0.12} />
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => {
        const active = i === activeRow % rows
        return (
          <div
            key={i}
            className="flex items-center gap-1.5 py-[5px]"
            style={{ borderTop: "1px solid rgba(44,36,32,0.05)" }}
          >
            <div className="rounded-[3px] shrink-0" style={{ width: 10, height: 10, background: `${accent}22` }} />
            <Bar w={i % 2 === 0 ? 38 : 30} h={2.5} o={0.22} />
            <div className="ml-auto flex items-center gap-3">
              <Bar w={18} h={2.5} o={0.13} />
              <div
                className="rounded-full"
                style={{
                  width: 16,
                  height: 6,
                  backgroundColor: active ? accent : INK,
                  opacity: active ? 0.75 : 0.1,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function PosBody({ accent, index }: { accent: string; index: number }) {
  return (
    <div className="flex flex-col gap-2 px-2.5 py-2.5 flex-1">
      <StatRow accent={accent} highlight={(index + 1) % 3} />
      <TableRows accent={accent} rows={4} activeRow={index} />
    </div>
  )
}

function CampaignsBody({ accent, index }: { accent: string; index: number }) {
  const fills = [74, 46, 88, 32]
  return (
    <div className="flex flex-col gap-2.5 px-2.5 py-2.5 flex-1">
      <StatRow accent={accent} highlight={index % 3} />
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="rounded-full shrink-0"
            style={{ width: 13, height: 13, backgroundColor: accent, opacity: 0.25 + i * 0.22 }}
          />
          <div className="flex flex-col gap-1 flex-1">
            <Bar w={i % 2 === 0 ? 52 : 40} h={2.5} o={0.22} />
            <div className="rounded-full overflow-hidden" style={{ height: 3.5, background: "rgba(44,36,32,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${fills[(i + index) % fills.length]}%`, background: accent, opacity: 0.75 }}
              />
            </div>
          </div>
          <Bar w={14} h={2.5} o={0.13} />
        </div>
      ))}
    </div>
  )
}

function FinanceBody({ accent, index }: { accent: string; index: number }) {
  const heights = [16, 30, 22, 38, 26, 44, 32, 20]
  const hot = (index + 5) % heights.length
  return (
    <div className="flex flex-col gap-2 px-2.5 py-2.5 flex-1">
      <div className="flex items-end gap-[4px]" style={{ height: 52 }}>
        {heights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-[2px]"
            style={{
              height: `${h}px`,
              backgroundColor: i === hot ? accent : INK,
              opacity: i === hot ? 0.9 : 0.13,
            }}
          />
        ))}
      </div>
      <TableRows accent={accent} rows={3} activeRow={index} />
    </div>
  )
}

function CasesBody({ accent, index }: { accent: string; index: number }) {
  return (
    <div className="flex flex-col gap-2 px-2.5 py-2.5 flex-1">
      <div className="flex items-center gap-1.5">
        <div className="rounded-[4px]" style={{ width: 42, height: 12, background: `${accent}22` }} />
        <div className="rounded-[4px]" style={{ width: 30, height: 12, background: "rgba(44,36,32,0.05)" }} />
        <div className="ml-auto rounded-[4px]" style={{ width: 26, height: 12, background: accent, opacity: 0.85 }} />
      </div>
      <TableRows accent={accent} rows={5} activeRow={index} />
    </div>
  )
}

function BoardBody({ accent, index }: { accent: string; index: number }) {
  const cols = [3, 2, 3]
  return (
    <div className="flex gap-2 px-2.5 py-2.5 flex-1">
      {cols.map((count, c) => (
        <div key={c} className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <div
              className="rounded-full"
              style={{ width: 4, height: 4, backgroundColor: c === index % 3 ? accent : INK, opacity: c === index % 3 ? 1 : 0.18 }}
            />
            <Bar w="60%" h={2} o={0.16} />
          </div>
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="rounded-[5px] flex flex-col gap-1.5 p-1.5"
              style={{ background: c === index % 3 && i === 0 ? `${accent}1f` : "rgba(44,36,32,0.045)" }}
            >
              <Bar w="85%" h={2.5} o={0.2} />
              <Bar w="55%" h={2} o={0.1} />
              <div className="flex items-center gap-1">
                <div
                  className="rounded-full"
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: c === index % 3 && i === 0 ? accent : INK,
                    opacity: c === index % 3 && i === 0 ? 1 : 0.16,
                  }}
                />
                <Bar w={12} h={2} o={0.1} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function ProductScreen({ variant, accent, index = 0, width }: ProductScreenProps) {
  const scale = width / BASE_W
  const height = width / SCREEN_RATIO

  const body = (() => {
    switch (variant) {
      case "campaigns":
        return <CampaignsBody accent={accent} index={index} />
      case "finance":
        return <FinanceBody accent={accent} index={index} />
      case "cases":
        return <CasesBody accent={accent} index={index} />
      case "board":
        return <BoardBody accent={accent} index={index} />
      case "pos":
      default:
        return <PosBody accent={accent} index={index} />
    }
  })()

  return (
    <div style={{ width, height, overflow: "hidden" }}>
      <div
        className="flex flex-col"
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          background: "linear-gradient(180deg,#ffffff 0%,#fcfaf8 100%)",
        }}
      >
        <Header accent={accent} index={index} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar accent={accent} index={index} />
          {body}
        </div>
      </div>
    </div>
  )
}
