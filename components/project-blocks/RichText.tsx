import React from "react"

/**
 * Renders simple markdown: **bold** and bullet lists (- item)
 */
export function RichText({ content, className = "" }: { content: string; className?: string }) {
    // Split by lines to detect bullet lists
    const lines = content.split("\n")
    const elements: React.ReactNode[] = []
    let bulletBuffer: string[] = []
    let key = 0

    const flushBullets = () => {
        if (bulletBuffer.length === 0) return
        elements.push(
            <ul key={key++} className="list-disc pl-5 space-y-1">
                {bulletBuffer.map((b, i) => (
                    <li key={i}>{parseBold(b)}</li>
                ))}
            </ul>
        )
        bulletBuffer = []
    }

    for (const line of lines) {
        if (line.startsWith("- ")) {
            bulletBuffer.push(line.substring(2))
        } else {
            flushBullets()
            if (line.trim() === "") {
                // empty line → space
            } else {
                elements.push(<span key={key++}>{parseBold(line)}</span>)
                elements.push(<br key={key++} />)
            }
        }
    }
    flushBullets()

    // Remove trailing <br>
    if (elements.length > 0 && (elements[elements.length - 1] as any)?.type === "br") {
        elements.pop()
    }

    return <span className={className}>{elements}</span>
}

function parseBold(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    if (parts.length === 1) return text
    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
        }
        return part
    })
}
