/**
 * Key Takeaways box. Surfaces 3-5 bullets at the top of long pieces
 * (>2000 words per LIVV editorial brief section 5.3) so a skimmer can
 * extract the thesis in 10 seconds. Renders into initial HTML for AI
 * crawler extractability.
 *
 * Use selectively. Brief 4.3 calls this "used selectively (not on every
 * piece)" — short pieces and case studies typically skip it.
 */
export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <aside
      aria-label="Key takeaways"
      className="my-12 border border-[#2A1818]/15 rounded-2xl p-6 md:p-8 bg-white/40 max-w-2xl"
    >
      <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-4">
        Key Takeaways
      </div>
      <ul className="space-y-3 text-base text-[#2A1818]/85 leading-relaxed list-none pl-0">
        {items.map((t, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden="true" className="text-[#C4A35A] font-semibold shrink-0 w-5">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
