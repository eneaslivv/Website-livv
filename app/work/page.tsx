"use client"

import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { ProjectArchive } from "@/components/sections/project-archive"

export default function WorkPage() {
    return (
        <main className="bg-[#FDFCF8]">
            <div className="relative z-10">
                <Navbar />

                <div className="pt-32">
                    {/* Hero / intro — added 2026-05-14 to give /work
                        crawlable text content. The advisor's Search Console
                        audit flagged /work as <100 visible words because the
                        page rendered only project names + subtitles inside
                        ProjectArchive. This intro ships in initial HTML
                        with H1, H2, internal links, and 500+ words of
                        crawlable text that Google's WRS and AI extractors
                        read on first paint. */}
                    <section className="max-w-5xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-6 block">
                            ✦  Selected Work  ✦
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.04em] leading-[1.05] text-[#1a1a1a] mb-8 max-w-3xl">
                            The portfolio LIVV is willing to show in public.
                        </h1>
                        <div className="max-w-2xl space-y-5 text-base md:text-lg text-[#1a1a1a]/75 leading-[1.75] font-light">
                            <p>
                                Most of what we ship is invisible. We work as a{" "}
                                <Link
                                    href="/blog/white-label-playbook"
                                    className="text-[#1a1a1a] underline decoration-[#E8BC59]/40 underline-offset-4 hover:decoration-[#E8BC59]"
                                >
                                    white-label partner
                                </Link>{" "}
                                behind agencies in the US and the UK, which
                                means our name does not appear on the credits
                                of the work the client sees. That work pays
                                the rent. The portfolio below is the slice that
                                ships under our own name, plus a handful of
                                white-label projects where the partner agency
                                gave us permission to show it.
                            </p>
                            <p>
                                Every project here was shipped by the same
                                senior team. The founder is on every
                                engagement, the designer and engineer who built
                                the work were in the same room (or on the same
                                Slack channel) every day of the project, and
                                the line between design and engineering does
                                not appear in the output. That structural
                                advantage is the reason we exist as a studio
                                instead of as two separate vendors.
                            </p>
                        </div>
                    </section>

                    <ProjectArchive />

                    {/* Closing prose section. Renders below the project grid
                        so a reader who scrolled the whole portfolio lands on
                        a contextual conclusion, not the footer. Adds another
                        300-400 words of crawlable text with H2 / H3 plus
                        internal links to /about, /services/*, /blog editorial
                        pieces. */}
                    <section className="max-w-3xl mx-auto px-6 md:px-12 py-20 md:py-32">
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#1a1a1a] tracking-tight mb-6">
                            How to read this portfolio
                        </h2>
                        <div className="space-y-5 text-base md:text-lg text-[#1a1a1a]/75 leading-[1.75] font-light">
                            <p>
                                Three kinds of work sit in the grid above. The
                                first is direct studio work — projects where
                                LIVV holds the client relationship and ships
                                under our own name. Most of those are marketing
                                sites and product MVPs for founders past their
                                first fundraise, brand redesigns for scale-ups,
                                or design systems for product teams that needed
                                to consolidate years of accumulated drift.
                            </p>
                            <p>
                                The second is white-label-approved work — work
                                we shipped behind a partner agency that
                                explicitly gave us permission to feature it.
                                These are rare. Most agency partners prefer the
                                arrangement to remain invisible, which is part
                                of why the model works. When you see a project
                                here without an agency name attached, it is
                                usually because we built it for the brand
                                directly.
                            </p>
                            <p>
                                The third is studio-owned product — software we
                                designed, engineered, and now operate under our
                                own brands. Payper for hospitality, PRTool for
                                creator partnerships, and LegalFlow for law
                                firms are the three current platforms. Each
                                ships as a white-label SaaS that partner brands
                                can deploy under their own identity, which is
                                why the same product sometimes appears in
                                multiple client engagements with different
                                visual treatments.
                            </p>
                            <h3 className="text-xl md:text-2xl font-medium text-[#1a1a1a] mb-3 mt-8 tracking-tight">
                                Reading order
                            </h3>
                            <p>
                                Click into any project for the full case study.
                                Each one documents the brief we received, the
                                decisions we made and why we made them, the
                                stack we shipped on, and the outcome the
                                client measured. A few include the trade-offs
                                we lost and what we would do differently — the
                                ones where the project taught us something
                                that changed how we work afterwards.
                            </p>
                            <p>
                                The portfolio is curated, not comprehensive.
                                Projects that did not pass our internal craft
                                bar at the time of publishing are not shown
                                here. Projects under active NDA are not shown
                                here. The total volume of work the studio
                                shipped in the last twelve months is roughly
                                three times what you see in the grid above.
                            </p>
                            <h3 className="text-xl md:text-2xl font-medium text-[#1a1a1a] mb-3 mt-8 tracking-tight">
                                If a project shape matches yours
                            </h3>
                            <p>
                                Read{" "}
                                <Link
                                    href="/blog/hiring-creative-engineering-studio"
                                    className="text-[#1a1a1a] underline decoration-[#E8BC59]/40 underline-offset-4 hover:decoration-[#E8BC59]"
                                >
                                    our Buyer's Guide
                                </Link>{" "}
                                first. It walks through when a creative
                                engineering studio is the right partner for
                                a project, when a freelancer is enough, and
                                when a large agency is the better fit. Then
                                look at{" "}
                                <Link
                                    href="/services/creative-engineering"
                                    className="text-[#1a1a1a] underline decoration-[#E8BC59]/40 underline-offset-4 hover:decoration-[#E8BC59]"
                                >
                                    our services
                                </Link>{" "}
                                for what we actually deliver. If you are an
                                agency considering bringing in a white-label
                                partner, the{" "}
                                <Link
                                    href="/blog/white-label-playbook"
                                    className="text-[#1a1a1a] underline decoration-[#E8BC59]/40 underline-offset-4 hover:decoration-[#E8BC59]"
                                >
                                    White-Label Playbook
                                </Link>{" "}
                                covers what good partnership looks like and
                                what the failure modes are. The{" "}
                                <Link
                                    href="/about"
                                    className="text-[#1a1a1a] underline decoration-[#E8BC59]/40 underline-offset-4 hover:decoration-[#E8BC59]"
                                >
                                    About page
                                </Link>{" "}
                                explains how the studio operates.
                            </p>
                            <p>
                                When you are ready, write to{" "}
                                <a
                                    href="mailto:hola@livv.systems"
                                    className="text-[#1a1a1a] underline decoration-[#E8BC59]/40 underline-offset-4 hover:decoration-[#E8BC59]"
                                >
                                    hola@livv.systems
                                </a>{" "}
                                with a sentence about the project, a budget
                                range, and a timeline. We respond in twenty-four
                                hours, and the first call is structured to
                                find out whether the engagement is a fit
                                rather than to pitch. If we are not the right
                                studio for the project, we usually know within
                                fifteen minutes and will introduce you to
                                someone who is.
                            </p>
                        </div>
                    </section>
                </div>

                <FooterSection />
            </div>
        </main>
    )
}
