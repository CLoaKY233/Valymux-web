"use client"

import { useEffect, useRef } from "react"
import { PageLayout } from "@/components/page-layout"
import { Rocket } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const alreadyBuilding = [
  "Authentication and user management",
  "Provider credential storage",
  "Encrypted secret handling",
  "Virtual API key management",
  "Model catalog routing",
  "Proxy support for OpenAI-compatible requests",
  "Anthropic translation support",
  "Request logging and observability",
  "SurrealDB-backed persistence and permissions",
]

const phases = [
  {
    label: "Near-term",
    color: "bg-emerald-400/50",
    items: [
      "Rate limiting",
      "Better routing logic",
      "More provider adapters",
      "More request translation coverage",
      "Prompt management foundations",
      "Richer observability views",
    ],
  },
  {
    label: "Soon after",
    color: "bg-blue-400/50",
    items: [
      "Team workflows",
      "Policy and control features",
      "Expanded audit logging",
      "Usage insights",
      "Model governance improvements",
    ],
  },
  {
    label: "Later",
    color: "bg-purple-400/50",
    items: [
      "Organization support",
      "Advanced access controls",
      "Broader evaluation and ops tooling",
      "Multi-team and multi-environment support",
    ],
  },
]

export default function RoadmapPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".road-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", end: "top 55%", scrub: 1 },
          }
        )
      })

      // Animate timeline line growing
      gsap.fromTo(".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1, transformOrigin: "top",
          scrollTrigger: { trigger: ".timeline-line", start: "top 80%", end: "bottom 40%", scrub: 1 },
        }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageLayout>
      <div ref={pageRef}>
        {/* Hero */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="road-reveal">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">Roadmap</span>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[#2d3436] mt-4 leading-tight">
                Where we are.{" "}
                <span className="font-normal text-[#44474a]">Where we are headed.</span>
              </h1>
              <p className="text-[#7d8da1] font-light text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                Valymux is in the foundation stage. We are building the backend, the product core, and the trust layer
                while the brand prepares to launch publicly.
              </p>
            </div>
          </div>
        </section>

        {/* MVP Target */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="road-reveal max-w-3xl mx-auto">
            <div className="neo-convex p-8 md:p-10 rounded-4xl text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#7d8da1] font-medium">MVP Target</span>
              <div className="text-3xl md:text-5xl font-light text-[#2d3436] mt-3 tracking-tight">
                End of April 2026
              </div>
              <p className="text-sm text-[#7d8da1] font-light mt-4 max-w-md mx-auto">
                The smallest version that gives developers a real reason to switch from ad hoc provider integrations to a cleaner platform.
              </p>
            </div>
          </div>
        </section>

        {/* Already Building */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="road-reveal text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                Already being <span className="font-normal text-[#44474a]">built.</span>
              </h2>
            </div>
            <div className="road-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {alreadyBuilding.map((item, i) => (
                <div key={i} className="neo-pressed p-4 rounded-xl flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 shrink-0" />
                  <span className="text-xs md:text-sm text-[#44474a] font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Phases Timeline */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="road-reveal text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                What is <span className="font-normal text-[#44474a]">next.</span>
              </h2>
            </div>

            <div className="relative">
              {/* Vertical timeline line */}
              <div className="timeline-line absolute left-6 md:left-8 top-0 bottom-0 w-px bg-[#a3b1c6]/20" />

              <div className="space-y-10">
                {phases.map((phase, i) => (
                  <div key={phase.label} className="road-reveal relative pl-16 md:pl-20">
                    {/* Timeline dot */}
                    <div className={`absolute left-4 md:left-6 top-2 w-4 h-4 rounded-full ${phase.color} border-4 border-[#e0e5ec]`} />

                    <div>
                      <h3 className="text-lg md:text-xl font-medium text-[#2d3436] mb-4">{phase.label}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {phase.items.map((item, j) => (
                          <div key={j} className="neo-flat p-4 rounded-xl flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${phase.color} shrink-0`} />
                            <span className="text-xs md:text-sm text-[#44474a] font-light">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="road-reveal max-w-3xl mx-auto neo-pressed p-8 md:p-10 rounded-4xl">
            <h3 className="text-lg font-medium text-[#2d3436] mb-4">Product Philosophy</h3>
            <p className="text-sm text-[#7d8da1] font-light leading-relaxed mb-5">
              We do not want a roadmap full of vague ambition. Every feature answers three questions:
            </p>
            <div className="space-y-3">
              {[
                "Does this reduce developer pain?",
                "Does this improve trust and safety?",
                "Does this help teams ship faster across providers?",
              ].map((q, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[#44474a]">{i + 1}.</span>
                  <span className="text-sm text-[#44474a] font-light">{q}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#7d8da1] font-light mt-5 italic">
              If the answer is no, it should wait.
            </p>
          </div>
        </section>

        {/* Founder Note + CTA */}
        <section className="px-6 md:px-12">
          <div className="road-reveal max-w-2xl mx-auto text-center">
            <p className="text-base md:text-lg text-[#7d8da1] font-light leading-relaxed mb-8">
              We are building in public, listening closely, and staying focused on a product people actually want.
              Feedback will shape the roadmap as much as engineering will.
            </p>
            <Link href="/waitlist" className="neo-convex px-8 py-4 rounded-4xl inline-flex items-center gap-3">
              <Rocket className="w-4 h-4 text-[#ff570a]/50" />
              <span className="font-medium text-sm text-[#44474a]">Shape the Roadmap</span>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
