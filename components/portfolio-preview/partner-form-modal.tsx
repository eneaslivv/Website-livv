"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, ArrowRight, Loader2 } from "lucide-react"
import { submitLead } from "@/lib/lead-ingest"

interface PartnerFormModalProps {
    isOpen: boolean
    onClose: () => void
}

export function PartnerFormModal({ isOpen, onClose }: PartnerFormModalProps) {
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        appIdea: ""
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await submitLead({
                name: formData.name,
                email: formData.email,
                company: formData.company,
                message: `Partner Application\n\nApp Idea: ${formData.appIdea}`,
                origin: "Partner Program",
                source: "website",
                category: "partner",
            })
        } catch (err) {
            console.error("Failed to submit partner application:", err)
        }
        setIsSubmitting(false)
        setIsSuccess(true)
        setTimeout(() => {
            onClose()
            // Reset after animation
            setTimeout(() => {
                setStep(1)
                setIsSuccess(false)
                setFormData({ name: "", email: "", company: "", appIdea: "" })
            }, 300)
        }, 2000)
    }

    if (!mounted) return null

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-[#FBFBF9] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-stone-200">
                            {/* Header */}
                            <div className="px-6 py-6 border-b border-stone-100 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-[#2C0405]">Partner Program</h2>
                                    <p className="text-sm text-stone-500 mt-1">Apply to resell your app on Livv</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-stone-400" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-8">
                                {!isSuccess ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[11px] uppercase tracking-widest font-semibold text-stone-500">Name</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="John Doe"
                                                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all outline-none text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[11px] uppercase tracking-widest font-semibold text-stone-500">Email</label>
                                                    <input
                                                        required
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                        placeholder="john@example.com"
                                                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all outline-none text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] uppercase tracking-widest font-semibold text-stone-500">Company / Product Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                                    placeholder="My SaaS App"
                                                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all outline-none text-sm"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] uppercase tracking-widest font-semibold text-stone-500">App Idea / Description</label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    value={formData.appIdea}
                                                    onChange={e => setFormData({ ...formData, appIdea: e.target.value })}
                                                    placeholder="Briefly describe what your app does..."
                                                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all outline-none text-sm resize-none"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-xl bg-[#2C0405] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#3D0A0C] transition-all disabled:opacity-50 group"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <>
                                                    Submit Application
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center text-center"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                                            <Check className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-[#2C0405]">Application Received!</h3>
                                        <p className="text-stone-500 mt-2">We'll review your app and get back to you shortly.</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )

    return createPortal(modalContent, document.body)
}
