"use client"

import { useState } from "react"

/**
 * Code block with a copy-to-clipboard button.
 *
 * Client component because clipboard interaction requires JS, but the
 * code content itself ships in the initial HTML so AI crawlers can
 * extract every JSON-LD template from the page directly. The interactive
 * copy button is a UX nicety, not a requirement for the page's
 * citability.
 */
export function CopyCodeBlock({
  code,
  language = "json",
  label = "JSON-LD",
}: {
  code: string
  language?: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API can be blocked by some browsers / contexts. Fall
      // through silently — the user can still select the code manually.
    }
  }

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-[#2A1818]/15 bg-[#0a0a0a]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02]">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A]">
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="text-xs font-medium text-[#FAF8F3]/70 hover:text-[#FAF8F3] transition-colors px-2 py-1 rounded"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed text-[#FAF8F3]/90 font-mono">
        <code className={language ? `language-${language}` : undefined}>
          {code}
        </code>
      </pre>
    </div>
  )
}
