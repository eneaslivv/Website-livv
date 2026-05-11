"use client"

import { useState } from "react"

/**
 * Download CTA for /resources pages per LIVV editorial brief section
 * 4.3 / 6.9. Soft email gate — the file is downloadable without an
 * address, but capturing one is offered as the friendly default.
 *
 * Use this on resource pages where the asset itself is a file (kit,
 * library, template). For online resources (e.g. a GitHub repo), pass
 * the repo URL via `externalUrl` and omit `fileUrl`.
 */
export function ResourceDownload({
  title,
  description,
  fileUrl,
  externalUrl,
  fileSize,
  fileFormat,
  emailGate = false,
}: {
  title: string
  description: string
  /** Direct file URL. Required unless externalUrl is provided. */
  fileUrl?: string
  /** External destination (e.g. GitHub repo). Used as the primary CTA. */
  externalUrl?: string
  /** Human-readable file size, e.g. "12 MB". */
  fileSize?: string
  /** Format label, e.g. "ZIP", "GitHub repo". */
  fileFormat?: string
  /** If true, render the email capture field above the download CTA. */
  emailGate?: boolean
}) {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const target = externalUrl || fileUrl
  const ctaLabel = externalUrl ? "Open repository" : "Download"

  async function captureEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "resource-gate" }),
      })
    } catch {
      // Soft gate — fail open. Email capture is a courtesy, not a blocker.
    }
    setSubmitted(true)
  }

  return (
    <aside className="my-12 border border-[#2A1818]/15 rounded-2xl p-8 bg-white/40 max-w-2xl">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-3">
        Download
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-[#2A1818] mb-3">
        {title}
      </h3>
      <p className="text-sm text-[#2A1818]/70 leading-relaxed mb-6">
        {description}
      </p>

      {emailGate && !submitted && (
        <form onSubmit={captureEmail} className="mb-4">
          <label htmlFor="resource-email" className="sr-only">
            Email address (optional)
          </label>
          <input
            id="resource-email"
            type="email"
            placeholder="your@email.com (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-full border border-[#2A1818]/15 bg-white text-sm text-[#2A1818] placeholder:text-[#2A1818]/40 focus:outline-none focus:border-[#C4A35A]"
          />
          <p className="text-[11px] text-[#2A1818]/50 mt-2 leading-snug">
            Drop your email to be notified when we ship the next resource. Skip
            it and grab the file directly — your call.
          </p>
        </form>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {target && (
          <a
            href={target}
            download={!externalUrl}
            target={externalUrl ? "_blank" : undefined}
            rel={externalUrl ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2A1818] text-[#FAF8F3] text-sm font-medium hover:bg-[#2A1818]/90 transition-colors"
          >
            {ctaLabel}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d={
                  externalUrl
                    ? "M3 11L11 3M5 3h6v6"
                    : "M7 1V10M3 6.5L7 10.5L11 6.5M2 13H12"
                }
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
        {(fileSize || fileFormat) && (
          <span className="text-xs text-[#2A1818]/50">
            {[fileFormat, fileSize].filter(Boolean).join(" · ")}
          </span>
        )}
      </div>

      <p className="text-[11px] text-[#2A1818]/50 mt-6">
        Free, attribution requested. Built by LIVV Creative Studio.
      </p>
    </aside>
  )
}
