/**
 * Editorial pullquote. Used sparingly per the LIVV editorial brief (section
 * 4.3) for emphasis inside long-form bodies. Renders the quote as a real
 * <blockquote> so it carries semantic weight for screen readers and AI
 * extractors, with optional attribution as a <cite>.
 *
 * Visual treatment: warm cream background, gold left rule, serif inflection
 * via tighter tracking. Deliberately distinct from a regular paragraph so
 * skimmers register the line.
 */
export function PullQuote({
  content,
  attribution,
}: {
  content: string
  attribution?: string
}) {
  return (
    <blockquote className="my-12 border-l-2 border-[#C4A35A] pl-6 md:pl-8 py-2 max-w-2xl">
      <p className="text-xl md:text-2xl font-medium text-[#2A1818] leading-[1.45] tracking-[-0.01em] m-0">
        {content}
      </p>
      {attribution && (
        <cite className="block not-italic text-sm text-[#2A1818]/55 mt-4 font-normal">
          {attribution}
        </cite>
      )}
    </blockquote>
  )
}
