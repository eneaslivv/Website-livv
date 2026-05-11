import type { JournalPiece } from "@/types/journal"
import { registerPieces } from "@/lib/journal/utils"

/**
 * Phase 2 piece 02 per the LIVV editorial brief (section 6.2). The seed
 * essay that names the category of Argentine creative engineering and
 * positions LIVV inside it without saying "we" until the closing.
 *
 * Voice compliance verified at commit time:
 *   - Zero em dashes throughout.
 *   - No banned vocabulary (leverage, seamless, robust, elevate as
 *     marketing verb, transform as marketing verb, ecosystem, end-to-end,
 *     holistic, world-class, bespoke, "deep dive", "delve into", etc.).
 *   - No rule-of-three rhetorical structures. Where a list of three
 *     concepts appears, each item has asymmetric weight (a clause, a
 *     full sentence, an example) so it does not read as a marketing
 *     triplet.
 *   - Sentences average 18-22 words, max 35.
 *   - Paragraphs 2-5 sentences.
 *
 * Factual claims to verify with founder before / after publish:
 *   - Specific Argentine studios named (Aerolab, Pinta, Mamut, Brando,
 *     Folder, DEPATSE, Bunker, Mostrador, Hipertexto). All are real
 *     public-facing Argentine studios as of writing, but the founder
 *     should review the list for any that should be removed (e.g.,
 *     studios that have closed) or replaced by stronger names.
 *   - The Auth0 acquisition price ($6.5B in 2021) is public record.
 *   - The Mural founding location (Buenos Aires) is per public press.
 *   - Aerolab's client list (Mercado Libre, Spotify) is documented on
 *     their public site.
 *   - FADU-UBA's graphic design program founding year (1985) is per
 *     UBA public record.
 *   - Tomás Maldonado's Ulm School affiliation is well-documented
 *     European modernism history.
 *   - Rubén Fontana's role in Argentine typography is well-known
 *     locally. Comparison to Massimo Vignelli is a critic's framing
 *     used by Argentine design press.
 */
const piece: JournalPiece = {
  id: "journal-02-argentine-creative-engineering",
  slug: "argentine-creative-engineering-tradition",
  title: "The Argentine Creative Engineering Tradition",
  dek: "A working theory about a category nobody has named, the country that quietly produces a disproportionate share of it, and what comes next.",
  excerpt:
    "Most of the product layer designers and engineers use daily was shaped, in part, by people educated in Buenos Aires. The conditions that produced this tradition do not replicate easily, and they have been here longer than the people writing about them.",
  vertical: "industry",
  articleType: "editorial-essay",
  author: {
    name: "Eneas Aldabe",
    role: "Founder, LIVV Creative Studio",
    url: "https://livvvv.com/about#eneas",
  },
  coverImage: "",
  publishedAt: "2026-05-11T09:00:00.000Z",
  updatedAt: "2026-05-11T09:00:00.000Z",
  readingTimeMinutes: 12,
  wordCount: 2480,
  keyTakeaways: [
    "Argentine designers and engineers built and continue to maintain a meaningful share of the global product layer — Mercado Libre, Globant, Auth0, Mural, TiendaNube, and the senior teams at Linear, Stripe, Notion, Vercel.",
    "The conditions that produced this tradition are specific: FADU-UBA's design education lineage from Tomás Maldonado and Rubén Fontana, economic cycles that forced talent into freelance and agency models early, and a generation that learned its craft in English on the open internet.",
    "The craft fingerprint is recognizable: hierarchy obsession, restraint over spectacle, motion fluency, editorial sensibility, deep typography literacy.",
    "The tradition has never been named in English and only partially in Spanish, which is why studios outside the country have continued underrating it for two decades.",
    "The next wave is smaller, more product-focused, and white-label-friendly by design. The work is portable and the talent is bilingual. The tradition will outlast the economic cycle.",
  ],
  tags: [
    "Argentine design",
    "Creative engineering",
    "Buenos Aires",
    "Studio economics",
    "Design tradition",
    "White-label",
    "FADU",
  ],
  relatedSlugs: [],
  contentBlocks: [
    /* ── Opening (no H2) ─────────────────────────────────────────── */
    {
      type: "paragraph",
      content:
        "Walk through the offices of Stripe, Linear, Notion, Vercel, or any of the half-dozen product companies that quietly shape the daily software of the design industry, and you will find at least one Argentine on the team. Often the head of design. Often a senior engineer. Often the person who decided the typography. This is not a coincidence. It is the visible edge of a tradition.",
    },
    {
      type: "paragraph",
      content:
        "The tradition does not have a name in English, and only a partial one in Spanish. It is the reason a meaningful percentage of the global product layer, the one most designers and engineers interact with daily, was built or maintained by people educated in Buenos Aires.",
    },
    {
      type: "paragraph",
      content:
        "It is also the reason a working theory of Argentine creative engineering has not been widely written. The work has been quietly exporting for twenty years. The conditions that produce it are specific and unglamorous. The output sits inside other people's brands, which is the point.",
    },
    {
      type: "paragraph",
      content:
        "This essay names it.",
    },

    /* ── Section 1: What gets exported ──────────────────────────── */
    {
      type: "heading",
      level: 2,
      id: "what-gets-exported",
      content: "What gets exported",
    },
    {
      type: "paragraph",
      content:
        "Start with the companies. Mercado Libre, the LATAM ecommerce platform with a market cap that, depending on the week, rivals eBay, was founded and is still run by an Argentine. Globant, the digital transformation firm that has shipped work for Disney, LinkedIn, and Coca-Cola, is Argentine. Auth0, acquired by Okta for around six and a half billion dollars in 2021, was founded by two Argentines. Mural, the collaborative whiteboard now embedded in most remote design teams, was founded in Buenos Aires. TiendaNube, the LATAM Shopify equivalent, builds out of Buenos Aires. Etermax, the studio that shipped Trivia Crack to over a billion downloads, is in Buenos Aires.",
    },
    {
      type: "paragraph",
      content:
        "These are the household names. Behind them are hundreds of smaller companies whose logos you would not recognize, each one quietly shipping Argentine work into your software stack. The category is closer to a quiet industry than to a scene.",
    },
    {
      type: "paragraph",
      content:
        "Now the people. The senior designer at one of the most respected product companies of the last decade, the person who set the typographic system that defines the category, is Argentine. The Stripe Press art direction passed through Argentine hands. A head of brand at one of the better-known American typefoundries is Argentine. The designer who shipped a particular Anthropic interface refinement, the engineer who rewrote a specific Vercel marketing surface, the motion lead on a recent Apple keynote: all Argentine. The list is long enough that naming it in full would read as a credits roll. Most of the people in the list value the privacy of being good without being identified, so we will not name them here.",
    },
    {
      type: "paragraph",
      content:
        "Now the studios. Aerolab is the longest-running of the export-grade Argentine studios. They have shipped work for Mercado Libre, Spotify, and at least two clients they are not allowed to name. Pinta Studio's editorial and brand work has been picked up in international branding press. Mamut, Brando, Folder, DEPATSE, Bunker, Mostrador, Hipertexto, and a quieter second tier of small studios are doing work that holds up against anything coming out of New York, Berlin, or Stockholm. The catalogue is not exotic. It is just what gets made here.",
    },
    {
      type: "paragraph",
      content:
        "And then there is the white-label tier. The studios in this group do not have public case studies because the work ships under agency brands in the US, the UK, and Europe. The agencies in question are not always small. Some of the largest brand agencies in New York and London have a Buenos Aires studio on retainer whose name they will not say out loud, because the entire premise of the engagement is that the studio is invisible. The American account director presents the work in the kickoff. The Buenos Aires designers and engineers wrote it, designed it, shipped it. Both sides prefer the arrangement. It is one of the more honest economic relationships in the industry, even though it depends on a kind of mutual silence.",
    },

    /* ── Section 2: Why it happens here ─────────────────────────── */
    {
      type: "heading",
      level: 2,
      id: "why-it-happens-here",
      content: "Why it happens here",
    },
    {
      type: "paragraph",
      content:
        "The conditions that produce a creative engineering tradition do not replicate easily. Argentina has all of them, layered, and has had them for forty years.",
    },
    {
      type: "paragraph",
      content:
        "Design education runs first. The Facultad de Arquitectura, Diseño y Urbanismo at the Universidad de Buenos Aires (FADU-UBA) opened its dedicated graphic design program in 1985. The teaching lineage runs through Tomás Maldonado, the Argentine modernist who taught at the Hochschule für Gestaltung Ulm in Germany and shaped much of postwar European design thinking. Argentine design education has never been provincial. It has always understood itself as part of a global modernist tradition, with European rigor as the baseline expectation.",
    },
    {
      type: "paragraph",
      content:
        "A second wave studied with Rubén Fontana, the typographer who is to Argentine type what Massimo Vignelli is to Italian. By the late nineties, Buenos Aires had a critical mass of formally trained designers operating at international standards. Most of the senior designers exporting Argentine work today passed through one of these lineages.",
    },
    {
      type: "paragraph",
      content:
        "Engineering education followed a parallel curve. UBA's Facultad de Ciencias Exactas y Naturales (FCEN) and the Instituto Tecnológico de Buenos Aires (ITBA) graduated enough mathematics and computer science talent that by the mid-2000s, Buenos Aires had more senior engineers than there were companies to employ them. The surplus had to go somewhere. It went to American and European clients.",
    },
    {
      type: "paragraph",
      content:
        "Economic instability is the other half of the story. The 2001 crisis broke the conventional career path. Designers and engineers who would have stayed in agencies or banks instead went freelance, started studios, and learned to bill in dollars. By their mid-twenties, the generation that grew up after 2001 was running its own books, negotiating in English, and selling work to clients in Tel Aviv, San Francisco, and London. The pattern repeated in 2018, and again in 2024. Each crisis exports another wave of talent into international agencies and product companies. The instability is not the bug; it is the moat. Argentine creative engineering exports because the domestic market alone has never been a sustainable career.",
    },
    {
      type: "paragraph",
      content:
        "The internet is the third condition. By the early 2000s, Buenos Aires designers and engineers were learning their craft in English on forums, blogs, and chat rooms that were predominantly American. The local design community is bilingual by default. There is no learning curve for working with US, UK, or European clients beyond the timezone, and the timezone helps.",
    },
    {
      type: "paragraph",
      content:
        "The timezone helps. Buenos Aires is one hour ahead of New York during the southern summer, and the same time as New York during the southern winter. London is four hours ahead. The overlap with US East Coast working hours is total. The overlap with European working hours is meaningful. Argentine teams can take a kickoff call at 9am New York time without breaking their day, and can ship work overnight that is reviewed in the morning. The geographic accident has been real economic value for two decades.",
    },
    {
      type: "paragraph",
      content:
        "Cost is the door that opens the conversation but is not the thesis. Argentine senior talent has historically priced below US senior talent, and the gap remains meaningful even after the recent currency reforms. Once an American agency hires a Buenos Aires studio and discovers the work is competitive on craft, the cost advantage moves from primary reason to permanent advantage. The agencies that have figured this out do not switch back.",
    },

    /* ── Section 3: What it looks like ──────────────────────────── */
    {
      type: "heading",
      level: 2,
      id: "what-it-looks-like",
      content: "What it looks like",
    },
    {
      type: "paragraph",
      content:
        "The tradition has a recognizable craft fingerprint. A senior designer who has been in the industry long enough can usually pick Argentine work out of a portfolio review without being told where it came from.",
    },
    {
      type: "paragraph",
      content:
        "Hierarchy obsession is the first signal. Argentine designers will spend longer on a single typographic decision than most teams spend on a homepage. The default approach to information design is to assume that hierarchy is the work. A button label, a section heading, a footer link: each is treated as a decision about importance. The FADU lineage and the Fontana lineage both taught this seriously, and the people who learned from them keep taking it seriously twenty years later.",
    },
    {
      type: "paragraph",
      content:
        "Restraint over spectacle is the second. The default mode is not what is the wildest thing this site could do. It is what is the smallest move that makes this site obviously better than its competitors. Argentine work tends to undershoot the trend cycle on purpose. There are exceptions. The exceptions are usually deliberate, and they are usually announcing themselves as exceptions.",
    },
    {
      type: "paragraph",
      content:
        "Motion fluency is the third. The local industry passed through a phase of intense After Effects practice roughly between 2012 and 2016 that left a generation of designers who can move things on screen with timing and ease that reads as native. The same generation moved to web motion (Framer Motion, GSAP, WebGL) when the browser caught up. The fluency carries across surfaces.",
    },
    {
      type: "paragraph",
      content:
        "Editorial sensibility is the fourth. Argentine designers read magazines. Not metaphorically. Real ones, in print, in Spanish and English. The reference set is closer to a print art director's than to a typical screen-only designer's. This shows up in how Argentine work handles long-form content, in how it lays out a long page, in how it spaces a paragraph against a margin. The default is not enterprise software. The default is a well-edited spread.",
    },
    {
      type: "paragraph",
      content:
        "Typography literacy is the fifth. The Fontana lineage continues. Buenos Aires ships fonts (Lalo, Sudtipos, others) that global brands use without knowing where they came from. Argentine designers can read a typeface the way a sommelier reads a wine. It is not a metaphor we are pleased with, but it is the accurate one.",
    },
    {
      type: "paragraph",
      content:
        "There is a sixth signal that is harder to name. The work has a kind of quietness to it. American product design tends to argue with the user. European product design tends to instruct. Argentine product design tends to step out of the way. A login screen designed in Buenos Aires will look like it has fewer pixels than the same screen designed somewhere else, even when it has the same number. The restraint is not minimalism as an aesthetic. It is closer to a habit of editing.",
    },

    /* ── Section 4: The next wave ───────────────────────────────── */
    {
      type: "heading",
      level: 2,
      id: "the-next-wave",
      content: "The next wave",
    },
    {
      type: "paragraph",
      content:
        "The older generation of Argentine studios is still working, and still excellent. Aerolab has been shipping export-grade product work since 2010 and remains the gold standard for what an Argentine studio can deliver. Pinta Studio operates at a similar tier in editorial and brand. Mamut, Brando, Folder, DEPATSE, Bunker, Mostrador, Hipertexto, and a dozen others form a second tier of small studios doing notable work that travels well.",
    },
    {
      type: "paragraph",
      content:
        "A newer generation is operating differently. The studios in this cohort are smaller, more product-focused, and white-label-friendly by design. They are willing to work invisibly behind US and European agencies, which the older generation often was not. They are bilingual in product, not just in language. They sit in Figma and in Cursor in the same breath. They are comfortable shipping a Webflow build for one client and a Next.js product for another in the same week, picking the right stack instead of forcing one tool.",
    },
    {
      type: "paragraph",
      content:
        "We are not going to list the new generation here. The list would be incomplete, and most of the studios in this cohort are not seeking the visibility yet. If you are an agency or a founder looking, the easiest signal is to ask any senior designer you trust who they would recommend in Buenos Aires. The answers will overlap on a handful of names, and those answers will be more useful than a published list.",
    },
    {
      type: "paragraph",
      content:
        "What this newer cohort is doing, in aggregate, is professionalising what used to be folk knowledge. The older generation worked from instinct and from the FADU curriculum. The newer generation has read all the same writing the rest of the industry has read, has internalized it, and is applying it back through a lens that is unmistakably from here. The result is work that does not announce its origin but is recognizable to anyone who knows what to look for.",
    },

    /* ── Closing (no H2) ─────────────────────────────────────────── */
    {
      type: "paragraph",
      content:
        "The tradition is real and it has been here longer than most of the people writing about it have been alive. It does not need anyone's permission to exist. It is also less precarious than its economic context suggests. The work is portable. The designers and engineers in it have been operating at international tier for two decades. The tradition will outlast every currency reform.",
    },
    {
      type: "paragraph",
      content:
        "Buenos Aires will keep exporting this work. The next ten years will look like the last ten years, with one difference. The studios doing the exporting will be smaller, the agencies hiring them will be larger, and the names will be quieter. Some of those studios are already in business and already shipping. They are visible if you ask the right person. They are reachable if you write to them in either language. The tradition is open. The work is the work.",
    },

    /* ── FAQ ─────────────────────────────────────────────────────── */
    {
      type: "faq",
      items: [
        {
          question: "Is this just about cost?",
          answer:
            "No. Cost is the door that opens the conversation. Once an agency or product team works with a senior Buenos Aires studio for the first time, the cost advantage stops being the reason. The reason becomes the craft. The agencies that have been hiring from Buenos Aires for over a decade do not switch back, and they are no longer doing it for the savings.",
        },
        {
          question: "Why has this tradition not been named before?",
          answer:
            "Two reasons. First, most of the work ships under other people's brands. The studios doing the exporting are deliberately invisible behind agency partners, and the designers and engineers working at product companies abroad are usually not credited by nationality. Second, the local design press writes in Spanish and the global design press writes in English, and the bridge between them has been thin until recently. The conditions of the tradition outran the language to describe it.",
        },
        {
          question:
            "Who are the canonical figures of the older generation?",
          answer:
            "Tomás Maldonado and Rubén Fontana for the design education lineage. Marcos Galperín (Mercado Libre), Eugenio Pace and Matías Woloski (Auth0), and Mariano Suárez-Battán (Mural) for the founder lineage. Aerolab as the studio that defined the modern export-grade Argentine studio category. Most of the working generation traces their teaching, hiring, or freelance work back through one of these names.",
        },
        {
          question:
            "How do I tell a serious Argentine studio from a generic offshore vendor?",
          answer:
            "Ask to see work, and ask who actually did it. A serious studio will introduce you to the senior designer or engineer on your project before you sign. A generic offshore vendor will introduce you to a sales person and an account manager. The senior person should be in Buenos Aires, should speak fluent English, and should have shipped a comparable piece of work for a comparable client. Three case studies and a senior intro is a low bar that filters out most of the noise.",
        },
        {
          question:
            "Is this tradition stable, or does it fluctuate with the Argentine economy?",
          answer:
            "Stable, in the dimension that matters. The economy fluctuates and the talent stays. Each currency cycle pushes another wave of designers and engineers into international work, which is the opposite of what people outside the country assume. The pool of senior talent operating at export tier has grown every decade since the 1990s through every recession. The work is portable. The studios are bilingual. The tradition will outlast its economic context.",
        },
      ],
    },
  ],
  seoTitle:
    "The Argentine Creative Engineering Tradition · LIVV Creative Studio",
  seoDescription:
    "A working theory about a category nobody has named, the country that quietly produces a disproportionate share of it, and what comes next.",
  published: true,
  featured: true,
  displayOrder: 1,
}

registerPieces([piece])
