/**
 * Content for the product landings at /products/[slug].
 *
 * Every screen shown here is a real one, placed in the mockups of the LIVV Hub
 * (04.1), and every claim is something the product does today: what was
 * checked against each product's own code, screens or public site. No metrics,
 * no client results. When a product gains a feature, add it here with a screen
 * that shows it.
 *
 * FAQs live in lib/product-faqs.ts, shared with the FAQPage JSON-LD.
 */

export type TwoTone = readonly [string, string]

export interface ProductShot {
    src: string
    alt: string
    /** Natural size of the file: the frame takes its ratio, so nothing is cropped. */
    width: number
    height: number
}

export interface ProductLink {
    label: string
    href: string
    /** Opens in a new tab, outside the site. */
    external?: boolean
}

export type ProductBand =
    | { kind: "image"; src: string; alt: string; position?: string; caption: string }
    /** Products with no photography yet wear the brand gradient and one line of type. */
    | { kind: "gradient"; line: string; caption: string }

export interface ProductLanding {
    slug: string
    name: string
    /** What kind of software it is, as the home picker names it. */
    kind: string
    /** Real brand mark, drawn as a mask. Without one, the name is set in type. */
    logo?: { src: string; ratio: number }
    headline: TwoTone
    lead: string
    facts: readonly (readonly [label: string, value: string])[]
    cta: ProductLink
    secondary?: ProductLink
    hero: ProductShot & { mobilePosition?: string }
    features: readonly { title: string; line: string; shot: ProductShot }[]
    roles: { heading: TwoTone; items: readonly { name: string; line: string }[] }
    band: ProductBand
    offer: {
        heading: TwoTone
        line: string
        price: string
        priceNote: string
        includes: readonly string[]
        cta: ProductLink
    }
}

const landings: Record<string, ProductLanding> = {
    payper: {
        slug: "payper",
        name: "Payper",
        kind: "Hospitality software",
        logo: { src: "/images/products/logos/payper.png", ratio: 331 / 140 },
        headline: ["Orders, payments and access for your venue,", "in one system."],
        lead: "Payper runs bars, restaurants and events. Guests order and pay from a QR code, staff work from their phones, and every sale lands in the same dashboard.",
        facts: [
            ["Built for", "Bars, restaurants, venues and events"],
            ["Covers", "QR ordering, cashless, ticketing and stock"],
            ["Pricing", "No fixed fee"],
        ],
        cta: { label: "Book a demo", href: "https://payperapp.io", external: true },
        secondary: { label: "Talk to LIVV", href: "/contact" },
        hero: {
            src: "/images/products/payper/hero.webp",
            alt: "The Payper orders screen on a phone, next to the icons of its modules: cashless card, receipt, QR code, stock and service bell",
            width: 1654,
            height: 951,
            mobilePosition: "82% center",
        },
        features: [
            {
                title: "Guests order and pay from the table",
                line: "They scan a QR code and the menu opens in the browser. No app to install and no login.",
                shot: {
                    src: "/images/products/payper/qr.webp",
                    alt: "A guest scanning a Payper QR code on the wall of a bar with their phone",
                    width: 1080,
                    height: 810,
                },
            },
            {
                title: "The whole venue on one map",
                line: "Sales points, tables, cashless top-ups, access and stock, laid over your floor plan with live capacity.",
                shot: {
                    src: "/images/products/payper/mapa.webp",
                    alt: "Payper's operations map: the floor plan of an events venue with its modules as layers and live capacity",
                    width: 2000,
                    height: 1380,
                },
            },
            {
                title: "The week, in one view",
                line: "Tickets, bar, cashless and customers add up to a single total, compared with the week before.",
                shot: {
                    src: "/images/products/payper/resumen.webp",
                    alt: "Payper's owner summary: total sales for the week, transactions, estimated margin and sales by module",
                    width: 2000,
                    height: 1380,
                },
            },
            {
                title: "Tickets and access at the door",
                line: "Sell tickets for your events and validate them at the entrance, in the same system as the bar.",
                shot: {
                    src: "/images/products/payper/tickets.webp",
                    alt: "Three people on a night out holding their Payper tickets",
                    width: 1440,
                    height: 962,
                },
            },
        ],
        roles: {
            heading: ["One system,", "four ways in."],
            items: [
                { name: "Guest", line: "Scans, orders and pays from their own phone." },
                { name: "Waiter", line: "Takes orders and follows each table from the waiter app." },
                { name: "Counter", line: "Charges, tops up cashless balance and keeps stock in check." },
                { name: "Owner", line: "Reads the week's sales, module by module, from the owner portal." },
            ],
        },
        band: {
            kind: "image",
            src: "/images/products/payper/band.webp",
            alt: "Payper receipts and a table card with a QR code that reads Escaneá. Pedí. Brindá.",
            position: "center 60%",
            caption: "Scan. Order. Cheers. The card guests find on the table.",
        },
        offer: {
            heading: ["No fixed fee", "to get started."],
            line: "Payper charges a percentage of the cashless transactions it processes. Demos and onboarding run through payperapp.io.",
            price: "% per transaction",
            priceNote: "No fixed cost to start",
            includes: [
                "QR menu and checkout",
                "Waiter app",
                "Counter, stock and cashless top-ups",
                "Ticketing and access",
                "Owner portal",
            ],
            cta: { label: "Book a demo at payperapp.io", href: "https://payperapp.io", external: true },
        },
    },

    prtool: {
        slug: "prtool",
        name: "PRTool",
        kind: "Creator campaign software",
        logo: { src: "/images/products/logos/prtool.svg", ratio: 182 / 94 },
        headline: ["Creator campaigns, from brief to payout,", "in one place."],
        lead: "PRTool gives brands, creators and agencies one workspace: publish a campaign, review who applies, and see the clicks and sales each creator brings in.",
        facts: [
            ["Built for", "Brands, creators and agencies"],
            ["Covers", "Campaigns, applications, performance and payments"],
            ["Pricing", "From $29/mo"],
        ],
        cta: { label: "Request a demo", href: "/contact" },
        secondary: { label: "Read the case study", href: "/projects/pr-tool" },
        hero: {
            src: "/images/pr-tool/intro-home-de-marca-v2.webp",
            alt: "PRTool's brand home: active creators, live campaigns and the campaigns in progress",
            width: 2000,
            height: 1333,
        },
        features: [
            {
                title: "Publish a campaign creators can apply to",
                line: "The brief, the requirements and what it pays, on one public page with an Apply button.",
                shot: {
                    src: "/images/pr-tool/desktop-detalle-de-campana-v2.webp",
                    alt: "A PRTool campaign page with its date, monetization, requirements and the Apply button",
                    width: 2000,
                    height: 1442,
                },
            },
            {
                title: "Review who applied",
                line: "Every application and proposal in one list, with the creator's profile and media kit a click away.",
                shot: {
                    src: "/images/pr-tool/desktop-busqueda-de-creadores-v2.webp",
                    alt: "PRTool's creators view: campaign applications by status and the list of proposals",
                    width: 2000,
                    height: 1442,
                },
            },
            {
                title: "See what each creator sold",
                line: "Clicks, sales, conversion and ROI per campaign, with top performers ranked and a report to export.",
                shot: {
                    src: "/images/pr-tool/desktop-performance-de-campana-v2.webp",
                    alt: "PRTool's campaign performance: clicks, sales, conversion rate, ROI and top performers",
                    width: 2000,
                    height: 1503,
                },
            },
            {
                title: "A profile creators carry with them",
                line: "Followers, engagement and social presence in a profile made for the phone.",
                shot: {
                    src: "/images/pr-tool/mobile-perfil-sobre-salvia-v2.webp",
                    alt: "A creator profile in PRTool on a phone: followers, engagement and a Contact Creator button",
                    width: 2000,
                    height: 1333,
                },
            },
        ],
        roles: {
            heading: ["Three workspaces,", "one campaign."],
            items: [
                { name: "Brand", line: "Publishes campaigns, approves creators and reads performance." },
                { name: "Creator", line: "Applies to campaigns and shares a profile with their numbers." },
                { name: "Agency", line: "Runs several brands, assigns creators and tracks upcoming payments." },
            ],
        },
        band: {
            kind: "image",
            src: "/images/products/prtool/band.webp",
            alt: "A creator in a green PR Tool T-shirt holding a phone up to the camera",
            position: "20% center",
            caption: "PR Tool's brand campaign, also by LIVV.",
        },
        offer: {
            heading: ["Licensed", "under your brand."],
            line: "PRTool is white-label software: LIVV sets it up with your identity and keeps the product maintained.",
            price: "From $29/mo",
            priceNote: "Plus a one-time setup of $999",
            includes: [
                "Brand, creator and agency workspaces",
                "Campaign pages with applications",
                "Performance per campaign and creator",
                "Payments and reports",
            ],
            cta: { label: "Request a demo", href: "/contact" },
        },
    },

    // Screens: the real app running on fictional sample data. Its interface
    // is in Spanish.
    legalflow: {
        slug: "legalflow",
        name: "LegalFlow",
        kind: "Legal practice software",
        headline: ["Contracts, clients and deadlines for your firm,", "in one workspace."],
        lead: "LegalFlow is a workspace for law firms. An assistant drafts and refines contracts next to the text, and every client keeps their contracts, documents, tasks and dates in one place.",
        facts: [
            ["Built for", "Law firms and legal teams"],
            ["Covers", "Contracts, documents, clients, tasks and calendar"],
            ["Pricing", "From $59/mo"],
        ],
        cta: { label: "Request a demo", href: "/contact" },
        hero: {
            src: "/images/products/legalflow/hero.webp",
            alt: "LegalFlow's dashboard: active clients, contracts in progress, pending tasks and the most recent contracts",
            width: 2000,
            height: 1380,
        },
        features: [
            {
                title: "Draft contracts with an assistant beside the text",
                line: "Generate a first draft from the client, the type of contract and its context, then refine the text with a plain instruction.",
                shot: {
                    src: "/images/products/legalflow/contrato.webp",
                    alt: "A lease contract open in LegalFlow, with the drafting assistant panel on the right",
                    width: 2000,
                    height: 1380,
                },
            },
            {
                title: "Every client, with their history",
                line: "Contracts, documents and tasks on one timeline per client, from the day they were added.",
                shot: {
                    src: "/images/products/legalflow/cliente.webp",
                    alt: "A client's timeline in LegalFlow: signed contracts, drafts and tasks in date order",
                    width: 2000,
                    height: 1380,
                },
            },
            {
                title: "The firm's work on one board",
                line: "Tasks by status, with priority, practice area, due date, subtasks and who is on it.",
                shot: {
                    src: "/images/products/legalflow/tareas.webp",
                    alt: "LegalFlow's task board with columns for to do, in progress and completed",
                    width: 2000,
                    height: 1380,
                },
            },
            {
                title: "Hearings and deadlines on the calendar",
                line: "Events and task due dates share one month view, so nothing depends on memory.",
                shot: {
                    src: "/images/products/legalflow/calendario.webp",
                    alt: "LegalFlow's calendar for a month, with hearings, signings and task deadlines",
                    width: 2000,
                    height: 1380,
                },
            },
        ],
        roles: {
            heading: ["One firm,", "one shared workspace."],
            items: [
                { name: "Administrator", line: "Adds the team and gives each person their role." },
                { name: "Lawyer", line: "Drafts and refines contracts, and follows each client." },
                { name: "Paralegal", line: "Keeps documents filed and tasks moving." },
                { name: "Assistant", line: "Runs the calendar and the day's follow-ups." },
            ],
        },
        band: {
            kind: "gradient",
            line: "Your firm's work, in one place.",
            caption: "LegalFlow, by LIVV Creative Studio.",
        },
        offer: {
            heading: ["Licensed", "under your firm's brand."],
            line: "LegalFlow is white-label software: LIVV sets it up with your firm's identity and keeps the product maintained.",
            price: "From $59/mo",
            priceNote: "Plus a one-time setup of $999",
            includes: [
                "Contract drafting with an AI assistant",
                "Documents and clients",
                "Task board and calendar",
                "Team with roles",
            ],
            cta: { label: "Request a demo", href: "/contact" },
        },
    },

    // Screens: the real page editor (livv-cms), captured from its dev
    // playground. The dashboard behind the login is not shown yet — add those
    // screens when there is a demo workspace to capture them from.
    "cms-livv": {
        slug: "cms-livv",
        name: "CMS LIVV",
        kind: "Website content management",
        headline: ["Your website's content,", "edited by your own team."],
        lead: "CMS LIVV is a headless CMS. The studio builds the site and connects it; your team edits pages, collections and images from a dashboard, and the site reads what you publish.",
        facts: [
            ["Built for", "Teams that edit their own site"],
            ["Covers", "Pages, collections, media and publishing"],
            ["Pricing", "On request"],
        ],
        cta: { label: "Request a demo", href: "/contact" },
        hero: {
            src: "/images/products/cms-livv/hero.webp",
            alt: "The CMS LIVV page editor with a hero section open: its layers on the left, the fields in the middle and the section's properties on the right",
            width: 2000,
            height: 1280,
        },
        features: [
            {
                title: "Build pages from blocks",
                line: "Nine block types, from hero to form, added and reordered from one panel.",
                shot: {
                    src: "/images/products/cms-livv/bloques.webp",
                    alt: "The CMS LIVV page editor: the page's sections and the catalogue of blocks to add",
                    width: 2000,
                    height: 1280,
                },
            },
            {
                title: "Edit a section as a form",
                line: "Each block opens as its own fields, with lists you can add to, reorder and remove.",
                shot: {
                    src: "/images/products/cms-livv/formulario.webp",
                    alt: "A features block open in the CMS LIVV editor, with its heading and a repeatable list of items",
                    width: 2000,
                    height: 1280,
                },
            },
            {
                title: "Write and format in place",
                line: "Rich text with headings, lists and links, saved to the section it belongs to.",
                shot: {
                    src: "/images/products/cms-livv/texto.webp",
                    alt: "A rich text block being edited in CMS LIVV, with its formatting bar",
                    width: 2000,
                    height: 1280,
                },
            },
        ],
        roles: {
            heading: ["Built by the studio,", "edited by you."],
            items: [
                { name: "Studio", line: "Builds the site and connects it through the read API or the React SDK." },
                { name: "Your team", line: "Edits pages, collection items and images, and publishes when ready." },
            ],
        },
        band: {
            kind: "gradient",
            line: "Built once. Edited by you.",
            caption: "CMS LIVV, by LIVV Creative Studio.",
        },
        offer: {
            heading: ["Set up", "with your site."],
            line: "CMS LIVV comes with a site LIVV builds or connects for you. Tell us what your team needs to edit and we scope it.",
            price: "On request",
            priceNote: "Quoted with your site",
            includes: [
                "Page editor with nine block types",
                "Collections with drafts and publishing",
                "Media library",
                "Read API and React SDK",
                "Roles and invitations by email",
            ],
            cta: { label: "Request a demo", href: "/contact" },
        },
    },
}

export function getProductLanding(slug: string): ProductLanding | undefined {
    return landings[slug]
}
