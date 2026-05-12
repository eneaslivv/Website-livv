"use client"

import Link from "next/link"
import { ArrowRight, Check, ChevronDown, } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { trackContactClick } from "@/lib/analytics"
import Image from "next/image"
import { AnimatedBorders } from "@/components/ui/animated-borders"
import { PixelCanvas } from "@/components/ui/pixel-canvas"
import { TechStackTicker } from "@/components/ui/tech-stack-ticker"
import { ProcessIllustration } from "@/components/ui/process-illustration"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { ScrollTypewriter } from "@/components/ui/scroll-typewriter"
import { ExperienceStats } from "@/components/ui/experience-stats"
import { SectionReveal } from "@/components/ui/section-reveal"
import { DeconstructedExpertise } from "@/components/sections/deconstructed-expertise"
import { GlobalReachSection } from "@/components/sections/global-reach"

export default function AboutPage() {
    return (
        <div className="min-h-screen w-full bg-white text-[#1a1a1a] antialiased relative">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <PixelCanvas />
            </div>

            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <header className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-6 overflow-hidden flex items-center justify-center min-h-[50vh] md:min-h-[60vh]">

                    {/* Animated Stats in Corners */}
                    <ExperienceStats />

                    <div className="max-w-4xl mx-auto relative z-10 text-center pointer-events-none">
                        <Link href="/admin/login" className="inline-flex items-center gap-3 px-1.5 py-1.5 pr-4 rounded-full bg-[#1a1a1a]/5 border border-[#1a1a1a]/5 backdrop-blur-md mb-8 cursor-pointer group hover:bg-[#1a1a1a]/10 transition-all duration-300 pointer-events-auto">
                            <span className="px-3 py-1 rounded-full bg-[#E8BC59] text-[#1a1a1a] text-[10px] font-bold tracking-wider uppercase leading-none flex items-center">
                                New
                            </span>
                            <span className="text-[13px] font-medium text-[#1a1a1a]/80 group-hover:text-[#1a1a1a] transition-colors">
                                Livv client management app
                            </span>
                        </Link>

                        <h1 className="text-2xl md:text-4xl lg:text-5xl leading-tight md:leading-none font-light tracking-[-0.08em] text-[#1a1a1a] mb-8">
                            Design That<br />
                            <span className="text-gradient-gold pb-2 block mt-2">Scales.</span>
                        </h1>

                        <p className="text-sm md:text-base text-[#1a1a1a]/70 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
                            Boutique design and digital product studio. We transform complexity into scalable systems and experiences that feel inevitable.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                            <a href="#contact" className="h-12 px-8 rounded-full bg-[#1a1a1a] text-white text-sm font-medium flex items-center justify-center hover:bg-[#1a1a1a]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
                                Let's Start Together
                            </a>
                            <a href="#team" className="group h-12 px-8 rounded-full bg-transparent border border-[#1a1a1a]/20 text-[#1a1a1a] text-sm font-medium flex items-center justify-center hover:bg-[#1a1a1a]/5 transition-all">
                                Meet the Studio
                                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </a>
                        </div>
                    </div>
                </header>

                {/* Clients Ticker */}
                <SectionReveal>
                    <TechStackTicker />
                </SectionReveal>

                {/* Intro Text - ALREADY ANIMATED WITH SCROLLTYPEWRITER */}
                <section className="py-20 md:py-32 px-6 bg-[#FAFAFA] border-b border-[#1a1a1a]/5 relative group">
                    <AnimatedBorders className="hidden md:block pointer-events-none opacity-20 absolute inset-0 z-0" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <ScrollTypewriter as="h2" className="section-heading text-[#1a1a1a] mb-10 block">
                            We design digital products that work like <span className="font-light tracking-[-0.08em] text-gradient-gold">living organisms.</span>
                        </ScrollTypewriter>
                        <div className="space-y-6 text-xl text-[#1a1a1a]/60 leading-relaxed font-light max-w-2xl mx-auto">
                            <ScrollTypewriter as="p">
                                We're not a traditional agency. We're <span className="text-[#1a1a1a] font-normal">livvvv</span>: a boutique studio obsessed with the intersection between flawless aesthetics and business logic.
                            </ScrollTypewriter>
                            <ScrollTypewriter as="p">
                                We design without ego. We don't seek awards, we seek for your users to understand and love your product. We work with founders who value clarity in a noisy digital world.
                            </ScrollTypewriter>
                        </div>
                    </div>
                </section>

                {/* Manifesto — added as a new section that sits in the studio
                    voice, between the intro text and the team grid. Restraint
                    over decoration: no entrance animations on the body, only
                    the two bracket lines get the section-heading treatment so
                    they read at the same tier as the existing section
                    headings. Manifesto body is plain prose, no banned vocab,
                    no em dashes, no rule-of-three. Aligned with the LIVV
                    editorial brief 6.1 voice rules. */}
                <SectionReveal>
                    <section id="manifesto" className="py-24 md:py-40 px-6 bg-white border-b border-[#1a1a1a]/5 relative overflow-hidden">
                        <AnimatedBorders className="hidden md:block pointer-events-none opacity-15 absolute inset-0 z-0" />

                        {/* Number marker in the corner, editorial print feel */}
                        <span className="hidden md:block absolute top-12 right-12 text-[10px] font-mono uppercase tracking-[0.3em] text-[#1a1a1a]/30 z-10">
                            01 / Manifesto
                        </span>

                        <div className="max-w-3xl mx-auto relative z-10">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a]/40 mb-8 block text-center">
                                ✦  The Manifesto  ✦
                            </span>

                            <ScrollTypewriter as="h2" className="section-heading text-[#1a1a1a] mb-16 text-center block">
                                LIVV is a <span className="font-light tracking-[-0.08em] text-gradient-gold">creative engineering</span> studio.
                            </ScrollTypewriter>

                            {/* Beat 1 — Position. Drop cap on the first paragraph
                                for editorial-print feel. Inline gold accents on
                                the phrases that carry the most positioning
                                weight. */}
                            <SectionReveal>
                                <div className="space-y-6 text-lg md:text-xl text-[#1a1a1a]/75 leading-[1.8] font-light">
                                    <p className="manifesto-paragraph first-letter:float-left first-letter:text-7xl md:first-letter:text-8xl first-letter:font-light first-letter:leading-[0.9] first-letter:mr-3 first-letter:mt-1 first-letter:text-[#1a1a1a] first-letter:tracking-[-0.05em]">
                                        The phrase is more specific than it sounds. We are not a marketing agency, and we are not a development shop in the conventional sense. We do not sit comfortably in the commodity tier of subscription-based, section-priced Webflow shops, and we do not pretend to be the kind of awards-led, direct-only studio whose pricing puts them out of reach for most of the work that needs doing. The work is the same hands from first wireframe to deployed product. That is the only honest way we know to ship things at the level we want them shipped.
                                    </p>
                                    <p>
                                        Most of our work is <span className="text-[#1a1a1a] font-normal">white-label</span>, behind agencies in the US and UK. We sign strict NDAs. We operate inside the agency's process, in the agency's tools, on the agency's calls. The end client never knows we exist. The work that does ship with our name on it sits closer to what you see from a studio in Berlin or Quebec than from a typical Buenos Aires shop, and we try not to make that the point.
                                    </p>
                                </div>
                            </SectionReveal>

                            {/* First pullquote — the most quotable line of the
                                white-label paragraphs, surfaced as a typographic
                                statement so a skimmer registers it. */}
                            <SectionReveal>
                                <blockquote className="my-16 md:my-20 relative">
                                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#E8BC59] via-[#E8BC59]/40 to-transparent" />
                                    <p className="pl-8 md:pl-10 text-2xl md:text-4xl font-light tracking-[-0.03em] leading-[1.2] text-[#1a1a1a]">
                                        White-label is not what we do between direct clients. It is the <span className="text-gradient-gold italic">reason</span> the studio runs at the scale it runs.
                                    </p>
                                </blockquote>
                            </SectionReveal>

                            {/* Beat 2 — Structure + Stack */}
                            <SectionReveal>
                                <div className="space-y-6 text-lg md:text-xl text-[#1a1a1a]/75 leading-[1.8] font-light">
                                    <p>
                                        The fact that we do both modes, direct and invisible, is the architecture of the studio, not a side product of the model. Agencies in our partnership tier ship under our quiet support. They keep the recurring client relationship and the credit. We get the technical work, and the moments when the project lives or dies on a deploy. That is the trade we like.
                                    </p>
                                    <p>
                                        We work in whatever the project needs. Webflow when the client will own the CMS. Framer when the motion is part of the argument. Next.js with Supabase when the product is real. React Native or Flutter when the product has to live in a pocket. Shopify when there is inventory. Anthropic and OpenAI when the product wants to think. The tools are not the brand. The judgement about which tool to pick is closer to what the brand is.
                                    </p>
                                </div>
                            </SectionReveal>

                            {/* Hairline divider with a small gold mark in the
                                middle — punctuates the shift from "what we do"
                                to "where and how". */}
                            <div className="flex items-center gap-4 my-16 md:my-20" aria-hidden="true">
                                <div className="h-px flex-1 bg-[#1a1a1a]/10" />
                                <span className="text-[#E8BC59]/60 text-xs">✦</span>
                                <div className="h-px flex-1 bg-[#1a1a1a]/10" />
                            </div>

                            {/* Beat 3 — Place + Taste */}
                            <SectionReveal>
                                <div className="space-y-6 text-lg md:text-xl text-[#1a1a1a]/75 leading-[1.8] font-light">
                                    <p>
                                        <span className="text-[#1a1a1a] font-normal">Buenos Aires</span> is a deliberate choice, not a cost play. The city has produced an unusual amount of the design and engineering work that quietly powers the global product layer over the last fifteen years. There is a tradition here, even if it does not name itself. The conditions that created it do not replicate easily anywhere else. We are part of that tradition. We are also of the generation that intends to name it.
                                    </p>
                                    <p>
                                        <span className="text-[#1a1a1a] font-normal">Editorial taste</span> runs through everything we ship. Not as decoration. Editorial taste is how you decide what to leave out. It is how a homepage stops feeling cluttered without losing any of its content. It is how a dashboard makes a CFO feel competent at her job instead of confused by her own data. It is how a brand identity does not look like every other identity that was made this year.
                                    </p>
                                </div>
                            </SectionReveal>

                            {/* Second pullquote — the most quotable single line
                                of the entire manifesto, placed where it can
                                stand alone. */}
                            <SectionReveal>
                                <blockquote className="my-16 md:my-20 text-center">
                                    <p className="text-3xl md:text-5xl font-light tracking-[-0.04em] leading-[1.1] text-[#1a1a1a]">
                                        The <span className="text-gradient-gold italic">cuts</span> are the work.
                                    </p>
                                </blockquote>
                            </SectionReveal>

                            {/* Beat 4 — Team + Client */}
                            <SectionReveal>
                                <div className="space-y-6 text-lg md:text-xl text-[#1a1a1a]/75 leading-[1.8] font-light">
                                    <p>
                                        We are <span className="text-[#1a1a1a] font-normal">small on purpose</span>. The founder is on every project. There are no juniors handing off to other juniors. There is no agency layer between you and the people writing the code. The work begins with a quote and ends with a deploy. Most of the conversation in between is about the work, not about the process.
                                    </p>
                                    <p>
                                        The kind of client who finds us, finds us. Founders past their first fundraise who got burned once by a cheap shop. Design leads at scale-ups who need a partner that will not embarrass them in front of their CEO. And, increasingly, creative directors at agencies who need someone they can trust to ship under their name without their name showing up anywhere. We have not advertised any of this until now.
                                    </p>
                                </div>
                            </SectionReveal>

                            {/* Closing line, ScrollTypewriter at the same tier
                                as the opening so the two bracket the essay. */}
                            <ScrollTypewriter as="h3" className="section-heading text-[#1a1a1a] mt-20 md:mt-28 text-center block">
                                The work is <span className="font-light tracking-[-0.08em] text-gradient-gold">the work</span>, and we like making it.
                            </ScrollTypewriter>

                            <p className="text-center text-[10px] font-mono uppercase tracking-[0.3em] text-[#1a1a1a]/40 mt-10">
                                Founded 2022  ·  Olivos, Buenos Aires, Argentina
                            </p>
                        </div>
                    </section>
                </SectionReveal>

                {/* Team */}
                <section id="team" className="py-20 md:py-32 px-6 bg-[#FAFAFA] border-b border-[#1a1a1a]/5 relative">
                    <AnimatedBorders className="hidden md:block pointer-events-none opacity-20 absolute inset-0 z-0" />
                    <SectionReveal className="max-w-6xl mx-auto relative z-10">
                        <h2 className="section-heading text-[#1a1a1a] mb-8 relative z-10">Senior Team Only</h2>
                        <div className="grid grid-cols-2 gap-4 relative z-10 min-h-[500px]">
                            {[
                                {
                                    name: 'Eneas Aldabe',
                                    role: 'Digital Product Builder & Founder',
                                    img: '/images/senior-team-eneas.jpg',
                                    linkedin: 'https://www.linkedin.com/in/eneas-aldabe-creativedigital/'
                                },
                                {
                                    name: 'Luis Cabral',
                                    role: 'Operations Lead',
                                    img: '/assets/team-ana.jpg',
                                    linkedin: '#'
                                }
                            ].map((member, i) => (
                                <a
                                    key={i}
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group cursor-pointer flex flex-col gap-4 relative h-full transition-transform duration-500 hover:-translate-y-1"
                                >
                                    <div className="w-full h-full bg-[#1a1a1a]/5 overflow-hidden rounded-[4px] relative border border-[#1a1a1a]/5 shadow-sm">
                                        <Image
                                            src={member.img}
                                            alt={member.name}
                                            fill
                                            quality={95}
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 33vw"
                                            className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                        />

                                        {/* Overlay gradient for text readability and to hide low-res artifacts */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>

                                        <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            <h3 className="font-medium text-3xl mb-1">{member.name}</h3>
                                            <p className="text-xs uppercase tracking-[0.2em] font-medium opacity-80">{member.role}</p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </SectionReveal>
                </section>

                {/* Global Reach Section */}
                <GlobalReachSection />




                {/* Deconstructed Expertise Section */}
                <DeconstructedExpertise />



                {/* Process Section */}
                <SectionReveal>
                    <section className="py-20 md:py-32 px-6 bg-[#FAFAFA] text-[#1a1a1a] relative border-b border-[#1a1a1a]/5">
                        <AnimatedBorders className="hidden md:block pointer-events-none opacity-20 absolute inset-0 z-0" />
                        <div className="max-w-6xl mx-auto relative z-10">
                            {/* Horizontal Cards Timeline */}
                            <ProcessTimeline />
                        </div>
                    </section>
                </SectionReveal>



                {/* FAQ */}
                <section className="py-20 md:py-32 px-6 bg-[#FAFAFA] relative group">
                    <AnimatedBorders className="hidden md:block pointer-events-none opacity-20 absolute inset-0 z-0" />
                    <div className="max-w-3xl mx-auto relative z-10">
                        <h2 className="section-heading text-[#1a1a1a] mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: 'How much does a typical project cost?', a: 'Depends on scope. Landing pages from $2k, full Web Apps from $8k. We always work with fixed price or retainer. Total transparency before starting.' },
                                { q: 'How long do they take?', a: 'Speed is key. Corporate sites in 3-4 weeks. MVP products in 6-8 weeks. We move fast because we eliminate bureaucracy.' },
                                { q: 'What tech stack do you use?', a: 'We design in Figma. We develop sites in Webflow or Framer. For complex apps we use React/Next.js and Node.' }
                            ].map((faq, i) => (
                                <details key={i} className="group border border-[#1a1a1a]/10 rounded-2xl open:bg-[#FAFAFA] transition-all duration-300">
                                    <summary className="flex justify-between items-center cursor-pointer font-medium text-[#1a1a1a]/80 p-6 select-none hover:text-[#1a1a1a] transition-colors">
                                        <span className="text-base">{faq.q}</span>
                                        <ChevronDown className="w-5 h-5 text-[#1a1a1a]/30 group-open:rotate-180 transition-transform duration-300" />
                                    </summary>
                                    <div className="px-6 pb-6 text-base text-[#1a1a1a]/60 leading-relaxed font-light">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <footer id="contact" className="relative py-20 md:py-32 px-6 overflow-hidden">
                    <div className="absolute inset-0 bg-[#1a1a1a] -z-20"></div>
                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.08em] text-white mb-8">
                            Tell Us What<br />You're <span className="text-gradient-gold pb-2">Building.</span>
                        </h2>
                        <p className="text-white/50 text-xl mb-16 max-w-xl mx-auto font-light leading-relaxed">
                            Let's see if we're the right fit. No commitment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-24">
                            <a
                                href="mailto:hola@livv.systems"
                                onClick={() => trackContactClick("email", "about_page")}
                                className="group h-14 px-10 rounded-full bg-white text-[#1a1a1a] font-medium flex items-center justify-center hover:bg-white/90 transition-all w-full sm:w-auto hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] duration-300"
                            >
                                Send an email
                                <ArrowRight className="w-5 h-5 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </a>
                            <a href="https://cal.com/eneas-aldabe-youfep/15min" target="_blank" rel="noopener noreferrer" className="h-14 px-10 rounded-full border border-white/20 text-white font-medium flex items-center justify-center hover:bg-white/5 hover:border-white/40 transition-all w-full sm:w-auto">
                                Schedule 15 min
                            </a>
                        </div>

                        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/30 font-light">
                            <div className="font-medium text-white/40">livvvv © 2025</div>
                            <div className="flex gap-8">
                                <a href="https://www.linkedin.com/company/39648193/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                                <a href="https://github.com/livvstudio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    )
}
