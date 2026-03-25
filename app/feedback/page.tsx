"use client"

import { useEffect, useRef, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Github, Send, CheckCircle, MessageSquare, Lightbulb, Users } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  { icon: MessageSquare, text: "We read every single submission" },
  { icon: Lightbulb, text: "Your pain points shape what gets built" },
  { icon: Users, text: "Anonymous submissions welcome" },
]

export default function FeedbackPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const data = {
      story: (form.elements.namedItem("story") as HTMLTextAreaElement).value,
      ideal_solution: (form.elements.namedItem("ideal_solution") as HTMLTextAreaElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.")
      } else {
        setSubmitted(true)
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".feedback-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%", end: "top 65%", scrub: 1 },
          }
        )
      })

      gsap.fromTo(".feedback-form",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.4 }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageLayout>
      <div ref={pageRef}>
        {/* Hero + Form */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left: Copy */}
              <div className="lg:pt-2">
                <div className="feedback-reveal">
                  <h2 className="sr-only">Share your experience with Valymux AI infrastructure tools</h2>
                  <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">Share your experience</span>
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4 leading-tight">
                    Your experience{" "}
                    <span className="font-normal text-[#44474a]">matters.</span>
                  </h1>
                  <p className="text-[#7d8da1] font-light text-base md:text-lg mt-5 leading-relaxed">
                    We are building Valymux to solve real problems developers face every day.
                    The best way to get that right is to hear from you directly.
                  </p>
                  <p className="text-[#7d8da1] font-light text-sm mt-4 leading-relaxed">
                    Tell us what frustrates you about working with multiple AI providers.
                    No sales pitch — just genuine curiosity about your world.
                  </p>
                </div>

                <div className="feedback-reveal mt-8 space-y-3">
                  {reasons.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="neo-pressed w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5 text-[#ff570a]/40" />
                        </div>
                        <span className="text-sm text-[#44474a] font-light">{item.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Right: Form */}
              <div className="feedback-form opacity-0">
                {submitted ? (
                  <div className="neo-convex p-8 md:p-10 rounded-4xl text-center">
                    <CheckCircle className="w-12 h-12 text-emerald-400/60 mx-auto mb-4" />
                    <h3 className="text-xl font-light text-[#2d3436] mb-2">Thank you for sharing.</h3>
                    <p className="text-sm text-[#7d8da1] font-light leading-relaxed">
                      We read every submission. Your story directly influences what gets prioritised next.
                    </p>
                    <a
                      href="https://github.com/cloaky233/Valymux"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-button px-6 py-3 rounded-full inline-flex items-center gap-2 mt-6"
                    >
                      <Github className="w-4 h-4 text-[#7d8da1]" />
                      <span className="text-sm font-medium text-[#7d8da1]">Star on GitHub</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="neo-flat p-8 md:p-10 rounded-4xl" noValidate>
                    <h3 className="text-lg font-medium text-[#2d3436] mb-6">Tell us your story</h3>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="story" className="text-[10px] tracking-widest uppercase text-[#7d8da1] font-medium mb-2 block">
                          What slows you down today? <span className="text-[#ff570a]/50">*</span>
                        </label>
                        <div className="neo-pressed rounded-xl">
                          <textarea
                            id="story"
                            name="story"
                            placeholder="Describe your biggest AI infrastructure pain point..."
                            rows={4}
                            required
                            className="w-full bg-transparent px-5 py-3.5 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light resize-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="ideal_solution" className="text-[10px] tracking-widest uppercase text-[#7d8da1] font-medium mb-2 block">
                          What would the perfect fix look like? <span className="text-[#a3b1c6]">(optional)</span>
                        </label>
                        <div className="neo-pressed rounded-xl">
                          <textarea
                            id="ideal_solution"
                            name="ideal_solution"
                            placeholder="Describe your ideal solution..."
                            rows={3}
                            className="w-full bg-transparent px-5 py-3.5 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light resize-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="name" className="text-[10px] tracking-widest uppercase text-[#7d8da1] font-medium mb-2 block">
                            Name <span className="text-[#a3b1c6]">(optional)</span>
                          </label>
                          <div className="neo-pressed rounded-xl">
                            <input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Your name"
                              className="w-full bg-transparent px-4 py-3 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="role" className="text-[10px] tracking-widest uppercase text-[#7d8da1] font-medium mb-2 block">
                            Role <span className="text-[#a3b1c6]">(optional)</span>
                          </label>
                          <div className="neo-pressed rounded-xl">
                            <input
                              id="role"
                              name="role"
                              type="text"
                              placeholder="AI Engineer, etc."
                              className="w-full bg-transparent px-4 py-3 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="company" className="text-[10px] tracking-widest uppercase text-[#7d8da1] font-medium mb-2 block">
                            Company <span className="text-[#a3b1c6]">(optional)</span>
                          </label>
                          <div className="neo-pressed rounded-xl">
                            <input
                              id="company"
                              name="company"
                              type="text"
                              placeholder="Where you work"
                              className="w-full bg-transparent px-4 py-3 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="text-[10px] tracking-widest uppercase text-[#7d8da1] font-medium mb-2 block">
                            Email <span className="text-[#a3b1c6]">(optional)</span>
                          </label>
                          <div className="neo-pressed rounded-xl">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="For follow-up only"
                              className="w-full bg-transparent px-4 py-3 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <p className="text-xs text-red-400/70 mt-4 text-center">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="neo-convex w-full py-4 rounded-[1.5rem] flex items-center justify-center gap-3 mt-6 group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#ff570a]/30 border-t-[#ff570a]/70 rounded-full animate-spin" />
                          <span className="font-medium text-sm text-[#44474a]">Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#ff570a]/50 group-hover:translate-x-0.5 transition-transform" />
                          <span className="font-medium text-sm text-[#44474a]">Share your experience</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
