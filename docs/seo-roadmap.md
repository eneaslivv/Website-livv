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
- [ ] **How Much Does Custom Software Cost in 2026?**
      Pricing guide, ~2,800 words. Marketing site / MVP / full product /
      AI-integrated app ranges. Boutique vs mid-tier vs big-agency.
- [ ] **The Build vs Buy Decision: A Framework for Founders**
      Framework piece, ~2,200 words. Five-question decision tree, real
      cost-of-ownership math, when to revisit the decision.
- [ ] **Custom Software Development Process: What to Expect**
      Educational, ~2,000 words. Discovery → design → build → ship →
      maintain. Typical timelines per project shape.
- [ ] **When Your Business Outgrows Spreadsheets**
      Pain-point piece, ~2,000 words. Signs the spreadsheet has hit
      its ceiling, what to replace it with, the migration playbook.
- [ ] **Custom CRM vs Salesforce: The Real Cost Comparison**
      Comparison piece, ~2,500 words. TCO math over 3 years, when
      custom wins, when Salesforce wins.
- [ ] **5 Signs You Need Custom Software (Not Another SaaS Tool)**
      Listicle / educational, ~1,800 words. Diagnostic questions.
- [ ] **Custom Software Development Timeline: From Idea to Launch**
      Project shape educational, ~2,000 words. Week-by-week breakdown.
- [ ] **The True Cost of Off-the-Shelf Software**
      Pain-point, ~2,200 words. Hidden costs of subscription stack.

## Phase 2 — AI Integration blog cluster

Target keywords: `AI integration services`, `AI integration examples`,
`AI agent for business`, `AI automation for small business`, `cost of AI
integration`, `RAG vs fine-tuning`, `custom AI chatbot development`,
`Claude API vs OpenAI API`.

- [~] **How to Integrate AI Into Your Existing Business** `how-to-integrate-ai-into-your-existing-business`
      Practical guide, ~2,800 words. Workflow inventory, integration
      pattern selection, build vs buy AI tooling.
- [ ] **AI Integration Examples: 10 Real Business Use Cases**
      Listicle, ~2,500 words. Each case with industry, problem,
      integration shape, outcome shape.
- [ ] **What Is an AI Agent and Does Your Business Need One?**
      Definition + decision-tree, ~2,200 words.
- [ ] **AI Automation for Small Business: Where to Start**
      Beginner guide, ~2,000 words.
- [ ] **The Cost of AI Integration: What to Budget in 2026**
      Pricing guide, ~2,500 words. Per-token + per-month subscription +
      development costs.
- [ ] **RAG vs Fine-Tuning: Which AI Approach Fits Your Business**
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
10. The Vercel deploy + IndexNow ping happen automatically downstream.

## Weekly maintenance agent instructions

Every Friday at 17:00 ART:

1. Run `node scripts/render-audit.mjs --concurrency=4`.
2. If any pages broke since last run, report in a commit on the
   `audit/<date>` branch with the diff.
3. Run an IndexNow ping for any URL changed in the last 7 days
   (`git log --since="7 days ago" --name-only --pretty=format: | sort -u`
    filtered to /blog/ and /services/ paths).
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
