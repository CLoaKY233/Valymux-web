"use client"

import { useEffect, useRef } from "react"
import { PageLayout } from "@/components/page-layout"
import { Rocket } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: "What is Valymux?",
    a: "Valymux is an LLM gateway, proxy, and observability platform for developers who need one stable way to work across multiple AI providers.",
  },
  {
    q: "Who is it for?",
    a: "AI engineers, backend teams, startups, and anyone tired of rebuilding provider-specific glue code every time the ecosystem changes.",
  },
  {
    q: "What problem does it solve?",
    a: "It solves the integration chaos that comes from juggling multiple providers, different request formats, changing model capabilities, and scattered observability.",
  },
  {
    q: "Is the product ready today?",
    a: "Not yet. We are still building the core backend and product foundation, and the site is here to show progress, invite feedback, and start building an audience early.",
  },
  {
    q: "What makes Valymux different?",
    a: "It focuses on three things at once: safety, speed and concurrency, and observability — without throwing away developer experience.",
  },
  {
    q: "What providers are supported first?",
    a: "OpenAI and Anthropic are the first provider paths in the codebase, with a design that can expand beyond them.",
  },
  {
    q: "Is it open source?",
    a: "Yes, completely. GitHub: github.com/cloaky233/Valymux",
  },
  {
    q: "Will the core be free?",
    a: "We want to keep as much of the value as possible free, especially the parts developers need most.",
  },
  {
    q: "What is the MVP timeline?",
    a: "We are aiming for the end of April 2026.",
  },
  {
    q: "Can I give feedback now?",
    a: "Yes — that is exactly what we want. We are building this for developers, and the best feedback comes early.",
  },
]

export default function FAQPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".faq-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", end: "top 65%", scrub: 1 },
          }
        )
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageLayout>
      <div ref={pageRef}>
        {/* Hero */}
        <section className="px-6 md:px-12 mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="faq-reveal">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">FAQ</span>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[#2d3436] mt-4 leading-tight">
                Common{" "}
                <span className="font-normal text-[#44474a]">questions.</span>
              </h1>
            </div>
          </div>
        </section>

        {/* FAQ Grid */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-reveal neo-flat p-6 md:p-7 rounded-2xl">
                <h3 className="text-base md:text-lg font-medium text-[#2d3436] mb-2">{faq.q}</h3>
                <p className="text-sm text-[#7d8da1] font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12">
          <div className="faq-reveal max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-light text-[#2d3436] mb-3">
              Still have questions?
            </h2>
            <p className="text-sm text-[#7d8da1] font-light mb-6">
              Join the waitlist and tell us what you need. We read everything.
            </p>
            <Link href="/waitlist" className="neo-convex px-8 py-4 rounded-4xl inline-flex items-center gap-3">
              <Rocket className="w-4 h-4 text-[#ff570a]/50" />
              <span className="font-medium text-sm text-[#44474a]">Join Waitlist</span>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
