"use client"

import Link from "next/link"
import { ArrowRight, Check, ChevronDown, } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
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
                            <a href="mailto:hola@livv.systems" className="group h-14 px-10 rounded-full bg-white text-[#1a1a1a] font-medium flex items-center justify-center hover:bg-white/90 transition-all w-full sm:w-auto hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] duration-300">
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
