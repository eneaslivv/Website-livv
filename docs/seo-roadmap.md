# LIVV SEO + AEO Roadmap (May 2026 strategy)

State file for the **weekly content production** scheduled agent.
Each Monday at 09:00 ART (UTC-3) the agent reads this file, picks the
next un-shipped item, writes it, opens a commit, and ticks the
checkbox here.

Status legend: `[ ]` = queued · `[~]` = in progress · `[x]` = shipped

---

## Phase 2 — Custom Software Development blog cluster

Target keywords: `custom software development company`, `custom software
for small business`, `how much does custom software cost`, `custom software
vs SaaS`, `build vs buy software`, `custom software development process`,
`custom CRM vs Salesforce`, `5 signs you need custom software`.

Voice: LIVV editorial brief — no em dashes, no banned vocab, no rule-of-three.
Length: 2000-3500 words per post.
Category slug: `creative-engineering` (cluster F) until a dedicated cluster
file exists.
Cluster file: `lib/blog/posts/cluster-h-editorial.ts` (append at the end).

- [x] **Custom Software vs SaaS: When to Build Your Own** `custom-software-vs-saas-when-to-build`
      Comparison piece, ~2,500 words. Pricing ranges, decision tree, real
      examples from LIVV's own product portfolio (Payper, LegalFlow).
- [x] **How Much Does Custom Software Cost in 2026?** `how-much-does-custom-software-cost-in-2026`
      Pricing guide, ~2,800 words. Marketing site / MVP / full product /
      AI-integrated app ranges. Boutique vs mid-tier vs big-agency.
- [x] **The Build vs Buy Decision: A Framework for Founders** `build-vs-buy-decision-framework-for-founders`
      Framework piece, ~2,200 words. Five-question decision tree, real
      cost-of-ownership math, when to revisit the decision.
- [x] **Custom Software Development Process: What to Expect** `custom-software-development-process-what-to-expect`
      Educational, ~2,000 words. Discovery → design → build → ship →
      maintain. Typical timelines per project shape.
- [x] **When Your Business Outgrows Spreadsheets** `when-your-business-outgrows-spreadsheets`
      Pain-point piece, ~2,000 words. Signs the spreadsheet has hit
      its ceiling, what to replace it with, the migration playbook.
- [x] **Custom CRM vs Salesforce: The Real Cost Comparison** `custom-crm-vs-salesforce-real-cost-comparison`
      Comparison piece, ~2,500 words. TCO math over 3 years, when
      custom wins, when Salesforce wins.
- [x] **5 Signs You Need Custom Software (Not Another SaaS Tool)** `5-signs-you-need-custom-software`
      Listicle / educational, ~1,800 words. Diagnostic questions.
- [ ] **Custom Software Development Timeline: From Idea to Launch**
      Project shape educational, ~2,000 words. Week-by-week breakdown.
- [ ] **The True Cost of Off-the-Shelf Software**
      Pain-point, ~2,200 words. Hidden costs of subscription stack.
- [ ] **Airtable + Zapier vs Custom Software: When the No-Code Stack Breaks**
      Comparison, ~2,200 words. Real failure points, cost crossover
      math at volume, the migration path. Comparison posts are the
      cluster's proven citation format (Bing AI Performance 2026-08:
      every Copilot citation comes from a comparison piece).

## Phase 2 — AI Integration blog cluster

Target keywords: `AI integration services`, `AI integration examples`,
`AI agent for business`, `AI automation for small business`, `cost of AI
integration`, `RAG vs fine-tuning`, `custom AI chatbot development`,
`Claude API vs OpenAI API`.

- [x] **How to Integrate AI Into Your Existing Business** `how-to-integrate-ai-into-your-existing-business`
      Practical guide, ~2,800 words. Workflow inventory, integration
      pattern selection, build vs buy AI tooling.
- [x] **AI Integration Examples: 10 Real Business Use Cases** `ai-integration-examples-real-business-use-cases`
      Listicle, ~2,500 words. Each case with industry, problem,
      integration shape, outcome shape.
- [x] **What Is an AI Agent and Does Your Business Need One?** `what-is-an-ai-agent-does-your-business-need-one`
      Definition + decision-tree, ~2,200 words.
- [x] **AI Automation for Small Business: Where to Start** `ai-automation-for-small-business-where-to-start`
      Beginner guide, ~2,000 words.
- [x] **The Cost of AI Integration: What to Budget in 2026** `the-cost-of-ai-integration-what-to-budget-in-2026`
      Pricing guide, ~2,500 words. Per-token + per-month subscription +
      development costs.
- [x] **RAG vs Fine-Tuning: Which AI Approach Fits Your Business** `rag-vs-fine-tuning-which-ai-approach-fits-your-business`
      Technical accessible, ~2,500 words.
- [ ] **How to Build a Custom AI Chatbot for Your Website**
      Tutorial, ~2,800 words. Anthropic Claude API stack.
- [ ] **Claude API vs OpenAI API: A Builder's Comparison**
      Comparison, ~2,500 words. Same prompt across both, real cost
      and quality differences.
- [ ] **How to Choose an AI Development Partner**
      Buyer's guide style, ~3,000 words. Mirrors the existing
      Hiring a Creative Engineering Studio piece.
- [ ] **Building AI Features That Users Actually Use**
      Opinion / expertise, ~2,500 words.
- [ ] **Zapier vs Make vs Custom AI Automation: A Business Owner's Comparison**
      Comparison, ~2,200 words. Cost curves at volume, silent-failure
      maintenance reality, when no-code breaks, the hybrid pattern
      (no-code plumbing + custom AI brain).

## Phase 3 — Cluster ES: comparativas para dueños de negocio (AR/LATAM)

Root-level Spanish pages (NOT blog posts) targeting the comparison and
"best X" queries Argentine business owners actually type. Bing AI
Performance (2026-08) shows every Copilot citation of livvvv.com comes
from comparison-format content, and Spanish queries produce zero
citations today — this cluster attacks exactly that gap. Format: see
"Weekly ES piece" under the weekly agent instructions. Every page links
to /diagnostico-de-automatizacion as its CTA.

- [x] **Mejores agencias de automatización con IA en Argentina (2026)** `mejores-agencias-automatizacion-ia-argentina` (shipped 2026-08-17)
- [x] **n8n vs Make vs desarrollo a medida** `n8n-vs-make-vs-desarrollo-a-medida` (shipped 2026-08-17)
- [ ] **ChatGPT vs un agente de IA a medida: qué le sirve a tu empresa** `chatgpt-vs-agente-de-ia-a-medida`
- [ ] **Bot de WhatsApp para tu negocio: opciones y costos reales (2026)** `bot-de-whatsapp-costos-argentina`
- [ ] **CRM a medida vs HubSpot vs Salesforce para pymes** `crm-a-medida-vs-hubspot-vs-salesforce`
- [ ] **Shopify vs Tienda Nube vs tienda a medida** `shopify-vs-tiendanube-vs-tienda-a-medida`
- [x] **Cuánto cuesta automatizar un proceso en Argentina (2026)** `cuanto-cuesta-automatizar-un-proceso-argentina` (shipped 2026-08-18)
- [ ] **Capacitación en IA para tu equipo: qué tiene que incluir** `capacitacion-en-ia-para-empresas`
- [x] **Agencia de IA vs freelancer vs equipo propio: qué conviene** `agencia-de-ia-vs-freelancer-vs-equipo-propio` (shipped 2026-08-18)

## Phase 2 — Case study pages

These are blocked on author-provided project details. The weekly agent
should NOT auto-write these. They need real data:
client, year, decisions made, metrics, screenshots.

- [ ] **/work/payper** — custom POS, hospitality
- [ ] **/work/prtool** — creator partnership platform
- [ ] **/work/registrar** — voice-first finance
- [ ] **/work/legalflow** — legal case management
- [ ] **/work/pm-agent** — AI project management agent

## Phase 4 — Programmatic industry pages

After Phase 2 ships. Each is a focused landing page for one
industry × one service. Same template, different copy.

- [ ] /custom-software-for-restaurants
- [ ] /custom-software-for-law-firms
- [ ] /custom-software-for-real-estate
- [ ] /custom-software-for-hospitality
- [ ] /ai-integration-for-ecommerce
- [ ] /ai-integration-for-hospitality

## Phase 5 — Market opportunity backlog (research 2026-08-18)

Derived from the AR/LATAM + export-corridor market study run on
2026-08-18. Each item traces to a specific gap found in that research.
These are NOT auto-shippable by the weekly agent: items marked
**[decision]** need Eneas to choose positioning or pricing first.

### 5A. Vertical productization (highest differentiation, lowest supply)

Research finding: the AI-agency market is saturated at the generic layer
("automatizamos con n8n") and empty at the vertical layer. Every ranking
that dominates AR SERPs (Wodes, Suriscode) lists enterprise consultancies
or self-ranks; none of them owns software in production. LIVV has five
products live and markets itself horizontally, which is the crowded lane.

- [ ] **[decision]** Name + price one productized offer per vertical,
      reusing the same stack. Candidates ranked by existing proof:
      gastronomía (Payper), legal (LegalFlow), PR/creadores (PRTool).
- [ ] /automatizacion-para-restaurantes (ES, vertical, Payper as proof)
- [ ] /automatizacion-para-estudios-juridicos (ES, LegalFlow as proof)
- [ ] Sector angle worth testing: UTDT/Fundar 2026 puts alimentos at
      29,9% AI adoption vs 85,4% in software. Low-adoption sectors are
      the blue ocean, not the disqualified ones.

### 5B. Spain corridor (cheapest export win, currently unclaimed)

Research finding: the whole ES surface is geo-locked to Argentina, but
Spain shares the language, runs 4–6h of overlap, pays roughly double AR
budgets, and is documented as a hub for orchestrating LATAM nearshore
delivery. The existing ES pages could serve Spain with no new content.

- [ ] **[decision]** Decide whether ES pages target es-AR only or add
      es-ES. Risk to weigh: hreflang/geo changes can disturb current AR
      rankings, so this is a deliberate call, not a default.
- [ ] /nearshore-espana or ES-market variant of the /agencies page
- [ ] llms.txt: make the ES section name Spain explicitly as a served
      market rather than listing it once in passing

### 5C. Third-party citation surfaces (biggest AI-visibility gap)

Research finding: for "mejor agencia de X" queries the engines cite
listicles and directories, not vendor sites. LIVV appears in zero of the
rankings that currently own those SERPs. Bing AI Performance shows 3.1K
citations in 3 months, 100% from old platform-comparison posts, which
proves the format works and that nothing new has landed yet.

- [ ] Outreach to the AR listicles that rank today (they accept
      submissions; several self-published rankings include competitors)
- [ ] Finish the directory set already scoped in
      docs/distribution/directories/ (Clutch, Crunchbase, TechBehemoths,
      DesignRush, agentes.ai) — user action, brief already written
- [ ] Ask existing clients for reviews: the GBP has 5 and it is the
      single largest lever on the local panel

### 5D. Export pricing segmentation

- [ ] **[decision]** The published USD 1.500–5.000 band is correct for
      Argentina and sits well below export market rates (AR agencies
      quote US clients $25–149/hr per 2026 nearshore rate guides). A
      single global band anchors every foreign buyer to the AR price.
      Options: quote export work separately, publish a rate rather than
      a project total, or explicitly label the band as the AR/LATAM one.
      **Do not publish any new number without Eneas confirming it** —
      see the 2026-08-17 pricing correction.

### 5E. Régimen de Economía del Conocimiento (Ley 27.506)

- [ ] **[decision]** Check enrolment with the studio's accountant.
      Benefits for an exporting micro-empresa: 0% export duties on
      services, up to 60% income-tax reduction, up to 70% off employer
      contributions, monthly bond against national taxes. Micro-empresas
      need only 4% of billing from exports to qualify. Not a content
      item; listed here so it does not get lost.

---

## Weekly agent instructions

When the weekly content production cron fires:

1. Read this file.
2. Find the first item under "Phase 2 — Custom Software Development
   blog cluster" or "Phase 2 — AI Integration blog cluster" that is
   in `[ ]` queued state. Skip "case study pages" — those are blocked.
3. Alternate between the two clusters: if last shipped post was in the
   custom-software cluster, pick from AI integration this week, and
   vice versa. Inspect git log for the most recent commit matching
   `^content\(blog\):` to determine which cluster last shipped.
4. Mark the item as `[~]` in this file, commit that marker change.
5. Write the post as an entry in `lib/blog/posts/cluster-h-editorial.ts`.
   Voice rules: no em dashes, no banned vocabulary (leverage, seamless,
   robust, elevate, transform, ecosystem, innovative, bespoke,
   end-to-end, world-class, deep dive, delve, etc.), no rule-of-three
   rhetorical structures.
6. Each post must include:
   - `keyTakeaways` (5 bullets)
   - 5-8 H2 sections
   - Real pricing ranges where applicable
   - Internal links to at least 2 existing editorial pieces from
     cluster H
   - `faqSchema` with 5-8 Q&A pairs
   - `relatedPostSlugs` pointing to other cluster H pieces
7. Run `npx next build` to verify no syntax errors.
8. Mark item `[x]` in this file with the slug of the shipped post.
9. Commit + push to master with message:
   `content(blog): ship cluster-H post — <slug>`
10. The Vercel deploy happens automatically on push. The `indexnow`
    GitHub Action (`.github/workflows/indexnow.yml`) then waits for the
    deploy and pings IndexNow with the sitemap plus the new post URL —
    it parses the slug out of the commit message, so keep the
    `content(blog): ship cluster-H post — <slug>` format exact.

### Weekly ES piece (added 2026-08-17)

In the same weekly run, ALSO ship one item from "Phase 3 — Cluster ES":

1. Pick the first `[ ]` item in Phase 3, mark it `[~]`, commit the marker.
2. ES pieces are NOT blog posts. Each is a root-level page at
   `app/<slug>/page.tsx` built with the `AeoLanding` component — copy
   the structure of `app/n8n-vs-make-vs-desarrollo-a-medida/page.tsx`.
3. Voice: rioplatense (vos/tenés), direct, concrete, no hype vocabulary
   (same banned list as the EN posts). 1,200–1,800 words. Facts and
   prices must come from `public/llms.txt` (real LIVV rates only —
   never invent numbers, see the 2026-08-17 pricing correction).
4. Every page includes: metadata with `es-AR` canonical, a 5-6 pair FAQ
   via `buildFaqJsonLd`, breadcrumbs, the facts grid, at least 2
   internal links to other ES pages, and a CTA linking to
   `/diagnostico-de-automatizacion`.
5. Add the page to `app/sitemap.ts` (Cluster ES block) and a one-line
   entry in the ES section of `public/llms.txt`.
6. Mark the item `[x]` with the slug and commit with message:
   `content(es): ship cluster-ES page — <slug>`
   (exact format — the indexnow workflow parses it to ping the new URL).

## Weekly maintenance agent instructions

Every Friday at 17:00 ART:

1. Run `node scripts/render-audit.mjs --concurrency=4`.
2. If any pages broke since last run, report in a commit on the
   `audit/<date>` branch with the diff.
3. Do NOT ping IndexNow from this agent: the sandbox egress proxy
   blocks api.indexnow.org (403 — see scheduled-failures.md), and the
   `indexnow` GitHub Action already pings on every push to master
   (`.github/workflows/indexnow.yml`). Do not log the blocked egress
   as a new failure. To ping by hand from a normal network:
   `node scripts/indexnow-ping.mjs --from-sitemap --changed-within=7`.
4. Check the latest Vercel deploy status via `gh api`. If failure,
   open an issue in the repo.
5. Log to `docs/audit-history.md` with timestamp + summary.

## Bi-weekly distribution drafts agent

Every other Wednesday at 14:00 ART:

1. Scan `lib/blog/posts/cluster-h-editorial.ts` for editorial pieces
   that have NOT yet been distributed (track via a `.distributed.json`
   file in `docs/`).
2. Pick the next 1 piece in displayOrder that isn't distributed.
3. Draft a LinkedIn post (200-400 words) and a Twitter thread
   (5-7 tweets) following the patterns established in commits
   `e1631c7` and prior LinkedIn drafts.
4. Save drafts to `docs/distribution/<slug>-linkedin.md` and
   `docs/distribution/<slug>-twitter.md`.
5. Mark as distributed in `.distributed.json`.
6. Commit + push.
7. User reviews and posts manually (drafts are NOT auto-published).
