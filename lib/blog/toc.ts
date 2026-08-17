import { BlogContentBlock } from "@/types/blog"

/**
 * Pure content helpers, deliberately kept in their own module.
 *
 * These operate on blocks that are already in hand, so they need nothing
 * from the post registry. They used to live in lib/blog/utils, which loads
 * every post via `require("./posts")` — importing a single helper from
 * there pulled the whole article corpus into any client component that
 * touched it (TableOfContents was doing exactly that, which is why the
 * post route shipped ~218 kB of page JavaScript).
 */

export function generateTableOfContents(
  blocks: BlogContentBlock[],
): { id: string; text: string; level: number }[] {
  return blocks
    .filter((b): b is BlogContentBlock & { type: "heading" } => b.type === "heading")
    .map((b) => ({ id: b.id, text: b.content, level: b.level }))
}

export function estimateReadingTime(blocks: BlogContentBlock[]): number {
  let wordCount = 0
  for (const block of blocks) {
    if ("content" in block && typeof block.content === "string") {
      wordCount += block.content.split(/\s+/).length
    }
    if (block.type === "list") {
      wordCount += block.items.join(" ").split(/\s+/).length
    }
    if (block.type === "table") {
      wordCount += block.rows.flat().join(" ").split(/\s+/).length
    }
    if (block.type === "faq") {
      wordCount += block.items
        .map((i) => `${i.question} ${i.answer}`)
        .join(" ")
        .split(/\s+/).length
    }
  }
  return Math.max(1, Math.ceil(wordCount / 200))
}
