"use client"

import { useEffect, useRef, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Github, Send, CheckCircle, Zap, Shield, Eye, Code, Users } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  { icon: Zap, text: "Get early updates on product progress" },
  { icon: Shield, text: "Help shape the MVP" },
  { icon: Eye, text: "Share what problems matter most to you" },
  { icon: Code, text: "Be first to try the platform when ready" },
  { icon: Users, text: "Influence what gets built next" },
]

const interests = [
  "What slows you down today",
  "Which provider differences are most painful",
  "What you want to observe and log",
  "How you manage keys and access now",
  "What would make you trust a gateway like this",
]

export default function WaitlistPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".wait-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", end: "top 55%", scrub: 1 },
          }
        )
      })

      // Form entrance animation
      gsap.fromTo(".waitlist-form",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 }
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <div className="wait-reveal">
                  <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">Early Access</span>
                  <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4 leading-tight">
                    Join the{" "}
                    <span className="font-normal text-[#44474a]">waitlist.</span>
                  </h1>
                  <p className="text-[#7d8da1] font-light text-base md:text-lg mt-5 leading-relaxed">
                    Valygate is being built now, and we want the first people who care about AI
                    infra to be part of the process.
                  </p>
                  <p className="text-[#7d8da1] font-light text-sm mt-4 leading-relaxed">
                    If you are dealing with provider sprawl, model churn, custom integration code,
                    or weak observability — we want to hear from you.
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div className="waitlist-form opacity-0">
                {submitted ? (
                  <div className="neo-convex p-8 md:p-10 rounded-4xl text-center">
                    <CheckCircle className="w-12 h-12 text-emerald-400/60 mx-auto mb-4" />
                    <h3 className="text-xl font-light text-[#2d3436] mb-2">You are on the list.</h3>
                    <p className="text-sm text-[#7d8da1] font-light">
                      We will be in touch as the MVP gets closer. In the meantime, star us on GitHub.
                    </p>
                    <a
                      href="https://github.com/cloaky233/Valygate"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-button px-6 py-3 rounded-full inline-flex items-center gap-2 mt-6"
                    >
                      <Github className="w-4 h-4 text-[#7d8da1]" />
                      <span className="text-sm font-medium text-[#7d8da1]">Star on GitHub</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="neo-flat p-8 md:p-10 rounded-4xl">
                    <h3 className="text-lg font-medium text-[#2d3436] mb-6">Get early access</h3>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="text-[10px] tracking-widest uppercase text-[#7d8da1] font-medium mb-2 block">Name</label>
                        <div className="neo-pressed rounded-xl">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            className="w-full bg-transparent px-5 py-3.5 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="text-[10px] tracking-widest uppercase text-[#7d8da1] font-medium mb-2 block">Email</label>
                        <div className="neo-pressed rounded-xl">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            className="w-full bg-transparent px-5 py-3.5 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="role" className="text-[10px] tracking-widest uppercase text-[#7d8da1] font-medium mb-2 block">Role</label>
                        <div className="neo-pressed rounded-xl">
                          <input
                            id="role"
                            name="role"
                            type="text"
                            placeholder="AI Engineer, Backend Dev, etc."
                            className="w-full bg-transparent px-5 py-3.5 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="text-[10px] tracking-widest uppercase text-[#7d8da1] font-medium mb-2 block">
                          What slows you down today? <span className="text-[#a3b1c6]">(optional)</span>
                        </label>
                        <div className="neo-pressed rounded-xl">
                          <textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your biggest pain point..."
                            rows={3}
                            className="w-full bg-transparent px-5 py-3.5 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="neo-convex w-full py-4 rounded-[1.5rem] flex items-center justify-center gap-3 mt-6 group"
                    >
                      <Send className="w-4 h-4 text-[#ff570a]/50 group-hover:translate-x-0.5 transition-transform" />
                      <span className="font-medium text-sm text-[#44474a]">Join Waitlist</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Why Join */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="wait-reveal text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                Why <span className="font-normal text-[#44474a]">join.</span>
              </h2>
            </div>
            <div className="wait-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reasons.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="neo-flat p-5 rounded-xl flex items-center gap-4">
                    <div className="neo-pressed w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#ff570a]/40" />
                    </div>
                    <span className="text-sm text-[#44474a] font-light">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* What We Want To Learn */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-3xl mx-auto">
            <div className="wait-reveal text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                What we want to <span className="font-normal text-[#44474a]">learn.</span>
              </h2>
            </div>
            <div className="wait-reveal neo-pressed p-6 md:p-8 rounded-4xl">
              <div className="space-y-3">
                {interests.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff570a]/30 shrink-0" />
                    <span className="text-sm text-[#44474a] font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founder Message */}
        <section className="px-6 md:px-12">
          <div className="wait-reveal max-w-2xl mx-auto text-center">
            <p className="text-base md:text-lg text-[#7d8da1] font-light leading-relaxed italic">
              &ldquo;We are not building this in a vacuum. We are building it with a clear goal:
              make it easier for developers to work across AI providers without wasting time on repeated infrastructure work.
              If that sounds like your world, we want you close.&rdquo;
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
