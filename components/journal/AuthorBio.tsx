import type { JournalAuthor } from "@/types/journal"
import { STUDIO } from "@/lib/seo/structured-data"

/**
 * Author bio block. Mandated at the end of every editorial piece per LIVV
 * editorial brief section 4.3 / 5.3. Links the byline to the Person
 * profile so the @id on the Article schema resolves to a real page.
 *
 * Renders the author's avatar (if provided), name, role, and studio
 * affiliation. Server-side, no interactivity needed.
 */
export function AuthorBio({ author }: { author: JournalAuthor }) {
  return (
    <aside
      aria-label="About the author"
      className="max-w-3xl mx-auto px-6 mt-24 border-t border-[#2A1818]/10 pt-12"
    >
      <div className="text-[10px] font-semibold uppercase tracking-widest text-[#C4A35A] mb-4">
        About the author
      </div>
      <div className="flex items-start gap-4">
        {author.avatar && (
          <img
            src={author.avatar}
            alt={author.name}
            width={56}
            height={56}
            className="w-14 h-14 rounded-full object-cover shrink-0 border border-[#2A1818]/10"
          />
        )}
        <div>
          <a
            href={author.url}
            className="font-semibold text-[#2A1818] hover:text-[#C4A35A] transition-colors"
            rel="author"
          >
            {author.name}
          </a>
          <p className="text-sm text-[#2A1818]/60 mt-0.5">{author.role}</p>
          <p className="text-xs text-[#2A1818]/50 mt-1">
            {STUDIO.legalName} · Buenos Aires, Argentina
          </p>
        </div>
      </div>
    </aside>
  )
}
