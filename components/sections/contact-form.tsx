"use client"

import { useState } from "react"
import { submitLead } from "@/lib/lead-ingest"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.phone
          ? `${formData.message}\n\nPhone: ${formData.phone}`
          : formData.message,
        origin: "Contact Page",
        source: "website",
        category: "contact",
      })

      setIsSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setIsSuccess(false), 5000)

    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="p-8 bg-[#C4A35A]/10 border border-[#C4A35A]/20 rounded-2xl">
        <h3 className="text-xl font-medium text-white mb-2">Message Sent</h3>
        <p className="text-white/60">Thank you for reaching out. We'll get back to you shortly.</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-xs uppercase tracking-widest text-[#C4A35A] font-bold"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
     <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
       <div>
         <label htmlFor="name" className="block text-xs uppercase tracking-widest text-white/40 mb-2">Name</label>
         <input
           type="text"
           id="name"
           required
           value={formData.name}
           onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
           className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#C4A35A] transition-colors placeholder:text-white/20"
           placeholder="Jane Doe"
         />
       </div>
       <div>
         <label htmlFor="email" className="block text-xs uppercase tracking-widest text-white/40 mb-2">Email</label>
         <input
           type="email"
           id="email"
           required
           value={formData.email}
           onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
           className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#C4A35A] transition-colors placeholder:text-white/20"
           placeholder="jane@example.com"
         />
       </div>
       <div>
         <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-white/40 mb-2">Phone (Optional)</label>
         <input
           type="tel"
           id="phone"
           value={formData.phone}
           onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
           className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#C4A35A] transition-colors placeholder:text-white/20"
           placeholder="+1 (555) 123-4567"
         />
       </div>
       <div>
         <label htmlFor="message" className="block text-xs uppercase tracking-widest text-white/40 mb-2">Message</label>
         <textarea
           id="message"
           required
           rows={4}
           value={formData.message}
           onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
           className="w-full bg-transparent border-b border-white/20 py-2 text-white outline-none focus:border-[#C4A35A] transition-colors placeholder:text-white/20 resize-none"
           placeholder="Tell us about your project..."
         />
       </div>
       <button
         type="submit"
         disabled={isLoading}
         className="group relative px-8 py-3 bg-white text-black overflow-hidden rounded-full transition-all hover:bg-[#C4A35A] disabled:opacity-50 disabled:cursor-not-allowed"
       >
         <span className="relative z-10 text-xs uppercase tracking-widest font-medium">
           {isLoading ? 'Sending...' : 'Send Message'}
         </span>
       </button>
     </form>
  )
}
