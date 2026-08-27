/**
 * Arma el árbol de un sitio a partir de la lista de slugs capturados y lo
 * acomoda como un organigrama horizontal.
 *
 * La jerarquía sale del propio slug: `shop-sauces-fiery` cuelga de `shop-sauces`
 * y ése de `shop`, buscando el prefijo más largo que exista en la lista. Es la
 * misma lógica que usa la herramienta de capturas, portada acá para que el
 * bloque `sitemap` guarde sólo los slugs y no un blob de coordenadas.
 */

export interface TreeNode {
    slug: string
    label: string
    children: TreeNode[]
    root?: boolean
    depth?: number
    w?: number
    x?: number
    y?: number
    branch?: number
}

export interface LaidOutNode {
    slug: string
    label: string
    x: number
    y: number
    w: number
    branch: number
    root: boolean
    kids: number
}

export interface LaidOutEdge {
    x1: number
    y1: number
    x2: number
    y2: number
    branch: number
}

const NODE_H = 34
const VGAP = 13
const XGAP = 84

const safeSlug = (s: unknown): s is string =>
    typeof s === 'string' && /^[a-z0-9._-]+$/i.test(s)

export function buildSiteTree(slugs: string[], rootLabel: string): TreeNode {
    const list = (slugs || []).filter(safeSlug).slice(0, 60)
    const set = new Set(list)
    const nodes = new Map<string, TreeNode>()

    const nodeFor = (slug: string): TreeNode => {
        if (!nodes.has(slug)) nodes.set(slug, { slug, label: slug, children: [] })
        return nodes.get(slug)!
    }

    // El padre es el prefijo más largo que exista: shop-sauces-fiery -> shop-sauces.
    const parentOf = (slug: string): string | null => {
        const parts = slug.split('-')
        for (let i = parts.length - 1; i >= 1; i--) {
            const cand = parts.slice(0, i).join('-')
            if (set.has(cand)) return cand
        }
        return null
    }

    const root: TreeNode = { slug: '', label: rootLabel || 'site', children: [], root: true }

    for (const slug of list) {
        const n = nodeFor(slug)
        const p = parentOf(slug)
        if (p) {
            n.label = slug.slice(p.length + 1).replace(/-/g, ' ')
            nodeFor(p).children.push(n)
        } else {
            n.label = slug === 'localhost'
                ? 'home'
                : slug.replace(/^localhost-/, '').replace(/-/g, ' ')
            root.children.push(n)
        }
    }

    // Orden estable: primero las ramas con más hijos, después alfabético.
    const sortRec = (n: TreeNode) => {
        n.children.sort((a, b) => (b.children.length - a.children.length) || a.label.localeCompare(b.label))
        n.children.forEach(sortRec)
    }
    sortRec(root)

    return root
}

export function layoutTree(root: TreeNode) {
    const widths: number[] = []

    const measure = (n: TreeNode, d: number) => {
        n.depth = d
        n.w = Math.max(58, 22 + n.label.length * 6.9)
        widths[d] = Math.max(widths[d] || 0, n.w)
        n.children.forEach((c) => measure(c, d + 1))
    }

    let leafY = 0
    const place = (n: TreeNode) => {
        if (!n.children.length) { n.y = leafY; leafY += NODE_H + VGAP; return }
        n.children.forEach(place)
        n.y = (n.children[0].y! + n.children[n.children.length - 1].y!) / 2
    }

    measure(root, 0)
    place(root)

    const xs = [0]
    for (let d = 1; d < widths.length; d++) xs[d] = xs[d - 1] + widths[d - 1] + XGAP

    const all: TreeNode[] = []
    const collect = (n: TreeNode, branch: number) => {
        n.x = xs[n.depth!]
        n.branch = branch
        all.push(n)
        // Cada rama de primer nivel se queda con su color y lo hereda hacia abajo.
        n.children.forEach((c, i) => collect(c, n.root ? i : branch))
    }
    collect(root, -1)

    const nodes: LaidOutNode[] = all.map((n) => ({
        slug: n.slug,
        label: n.label,
        x: Math.round(n.x!),
        y: Math.round(n.y!),
        w: Math.round(n.w!),
        branch: n.branch!,
        root: !!n.root,
        kids: n.children.length,
    }))

    const edges: LaidOutEdge[] = []
    for (const n of all) {
        for (const c of n.children) {
            edges.push({
                x1: Math.round(n.x! + n.w!),
                y1: Math.round(n.y! + NODE_H / 2),
                x2: Math.round(c.x!),
                y2: Math.round(c.y! + NODE_H / 2),
                branch: c.branch!,
            })
        }
    }

    return {
        nodes,
        edges,
        nodeH: NODE_H,
        canvas: {
            w: Math.round(xs[widths.length - 1] + widths[widths.length - 1]),
            h: Math.round(Math.max(leafY - VGAP, NODE_H)),
        },
    }
}
