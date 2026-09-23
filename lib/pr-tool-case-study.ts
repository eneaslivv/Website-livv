import type { EditorialDoc } from "@/types/case-study-editorial"

/** Presentation edits for the PR Tool case study, layered over its CMS content. */
export function preparePRToolCaseStudy(doc: EditorialDoc): EditorialDoc {
    return {
        ...doc,
        sections: doc.sections.map((section) => {
            const isCredits = section.id === "results"
            return {
                ...section,
                ...(isCredits ? { title: "Credits", intro: undefined } : {}),
                items: section.items
                    .filter((item) => item.kind !== "next" && !(isCredits && item.kind === "metrics"))
                    .map((item) => {
                        if (!isCredits || item.kind !== "fields") return item
                        return {
                            ...item,
                            rows: item.rows.map((row) => {
                                if (row.label === "Team") return { ...row, value: "Eneas Aldabe", pending: false }
                                if (row.label === "Tools") return { ...row, value: "Figma · Jitter · Webflow", pending: false }
                                return row
                            }),
                        }
                    }),
            }
        }),
    }
}
