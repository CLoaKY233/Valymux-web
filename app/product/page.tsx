"use client"

import { useEffect, useRef } from "react"
import { PageLayout } from "@/components/page-layout"
import { ArrowRight, Layers, Globe, Route, Activity, ShieldCheck, Rocket } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const problems = [
  "Every provider has its own request schema",
  "Model names and capabilities are inconsistent",
  "Streaming behavior differs across vendors",
  "Credentials need to be stored safely",
  "Usage and latency need to be visible",
  "Routing logic becomes custom code quickly",
]

const approach = [
  { icon: Layers, title: "Standardize the interface", desc: "Use one way to send requests. OpenAI-compatible from day one." },
  { icon: Globe, title: "Translate provider differences", desc: "Valymux adapts schemas, parameters, and formats where needed." },
  { icon: Route, title: "Route intelligently", desc: "Send requests to the right provider credential and model path." },
  { icon: Activity, title: "Keep the system observable", desc: "Log metadata so teams see latency, usage, errors, and volume." },
  { icon: ShieldCheck, title: "Keep developers in control", desc: "Simple management for keys, models, access, and policy." },
]

const inMotion = [
  "Authentication and user management",
  "Provider credential storage",
  "Virtual API keys",
  "Model catalog and routing",
  "Proxy execution for chat completions",
  "Request-level logging",
  "OpenAI-compatible and Anthropic provider paths",
  "Secure secret encryption and hashed API keys",
]

export default function ProductPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".product-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", end: "top 55%", scrub: 1 },
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
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="product-reveal">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">Product</span>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[#2d3436] mt-4 leading-tight">
                One stable layer for{" "}
                <span className="font-normal text-[#44474a]">provider chaos.</span>
              </h1>
              <p className="text-[#7d8da1] font-light text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                Valymux is the gateway between your application and the AI provider ecosystem.
                It helps developers use one stable interface while Valymux handles the provider-specific differences behind the scenes.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="product-reveal text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                The <span className="font-normal text-[#44474a]">Problem</span>
              </h2>
              <p className="text-[#7d8da1] font-light mt-4 max-w-xl mx-auto">
                Modern AI teams are dealing with a messy reality. That complexity grows every time you add a new provider, model, or team.
              </p>
            </div>
            <div className="product-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {problems.map((problem, i) => (
                <div key={i} className="neo-pressed p-5 rounded-xl flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff570a]/30 shrink-0 mt-1.5" />
                  <span className="text-sm text-[#44474a] font-light leading-relaxed">{problem}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Valymux Approach */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="product-reveal text-center mb-14">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                The Valymux <span className="font-normal text-[#44474a]">Approach</span>
              </h2>
              <p className="text-[#7d8da1] font-light mt-4 max-w-xl mx-auto">
                Instead of making every application speak every provider dialect, Valymux normalizes the chaos into a single workflow.
              </p>
            </div>
            <div className="space-y-4">
              {approach.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="product-reveal neo-flat p-6 md:p-7 rounded-2xl flex items-start gap-5">
                    <div className="neo-pressed w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#ff570a]/40" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-medium text-[#2d3436] mb-1">{item.title}</h3>
                      <p className="text-sm text-[#7d8da1] font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* What Is Already In Motion */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="product-reveal text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                Already in <span className="font-normal text-[#44474a]">motion.</span>
              </h2>
            </div>
            <div className="product-reveal neo-flat p-6 md:p-8 rounded-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {inMotion.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 neo-pressed p-3.5 rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 shrink-0" />
                    <span className="text-xs md:text-sm text-[#44474a] font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12">
          <div className="product-reveal max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-[#2d3436] mb-6">
              AI infrastructure, without the headache.
            </h2>
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
