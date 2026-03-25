"use client"

import { useEffect, useRef } from "react"
import { SlidersHorizontal, ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function DeveloperScene() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-triggered reveals
      gsap.utils.toArray<HTMLElement>(".dev-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="scene-section px-6 md:px-12 py-24 md:py-40">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="dev-reveal mb-16 md:mb-24 text-center">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#7d8da1] font-medium">
            Developer Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4 text-balance">
            Less glue code.{" "}
            <span className="font-normal text-[#44474a]">More product.</span>
          </h2>
        </div>

        {/* Before / After comparison */}
        <div className="dev-reveal grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-16">
          {/* Before */}
          <div className="neo-flat p-6 md:p-8 rounded-4xl md:rounded-[3rem]">
            <div className="flex items-center gap-3 mb-6">
              <div className="neo-pressed px-3 py-1.5 rounded-full">
                <span className="text-[9px] font-medium tracking-widest text-[#ff570a]/60 uppercase">Before</span>
              </div>
              <span className="text-xs text-[#7d8da1] font-light">Multi-provider chaos</span>
            </div>
            <div className="neo-pressed p-5 rounded-2xl font-mono text-[11px] md:text-xs text-[#7d8da1] leading-relaxed overflow-x-auto">
              <pre className="whitespace-pre-wrap">{`// Different client for each provider
const openai = new OpenAI({ apiKey: KEY_1 })
const anthropic = new Anthropic({ apiKey: KEY_2 })
const gemini = new Gemini({ apiKey: KEY_3 })

// Different formats everywhere
if (provider === "openai") {
  res = await openai.chat.completions.create(...)
} else if (provider === "anthropic") {
  res = await anthropic.messages.create(...)
} else if (provider === "gemini") {
  res = await gemini.generateContent(...)
}

// Different streaming, tools, errors...
// 200+ lines of glue code per provider`}</pre>
            </div>
          </div>

          {/* After */}
          <div className="neo-flat p-6 md:p-8 rounded-4xl md:rounded-[3rem] border-2 border-[#ff570a]/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="neo-convex px-3 py-1.5 rounded-full">
                <span className="text-[9px] font-medium tracking-widest text-[#44474a] uppercase">After</span>
              </div>
              <span className="text-xs text-[#7d8da1] font-light">One Valymux call</span>
            </div>
            <div className="neo-pressed p-5 rounded-2xl font-mono text-[11px] md:text-xs text-[#7d8da1] leading-relaxed overflow-x-auto">
              <pre className="whitespace-pre-wrap">{`// One client. Any provider.
const res = await fetch("http://valymux/v1/chat", {
  method: "POST",
  headers: {
    "Authorization": "Bearer vk_live_***",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "primary-model",
    messages: [{ role: "user", content: "..." }]
  })
})

// That's it. Routing, failover, auth,
// streaming, tracing — all handled.`}</pre>
            </div>
          </div>
        </div>

        {/* Config snippet */}
        <div className="dev-reveal max-w-2xl mx-auto">
          <div className="neo-flat p-6 md:p-8 rounded-4xl md:rounded-[3rem]">
            <div className="flex items-center gap-4 mb-6">
              <div className="neo-pressed w-10 h-10 rounded-xl flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5 text-[#44474a]" />
              </div>
              <div>
                <h3 className="text-base font-medium text-[#2d3436]">Configuration First</h3>
                <p className="text-xs text-[#7d8da1] font-light">Swap LLMs in YAML, not in production code.</p>
              </div>
            </div>
            <div className="neo-pressed p-5 rounded-2xl font-mono text-xs text-[#7d8da1] leading-relaxed overflow-x-auto">
              <pre>
                <span className="text-[#ff570a]/40 italic">{"# gateway-config.yaml"}</span>
                {"\n"}<span className="text-[#44474a]">providers:</span>
                {"\n"}  - <span className="text-[#44474a]">id:</span> primary-model
                {"\n"}    <span className="text-[#44474a]">target:</span> openai/gpt-4o
                {"\n"}    <span className="text-[#44474a]">fallback:</span> anthropic/claude-3-opus
                {"\n"}
                {"\n"}<span className="text-[#44474a]">security:</span>
                {"\n"}  <span className="text-[#44474a]">virtual_keys:</span> true
                {"\n"}  <span className="text-[#44474a]">pii_filter:</span> enabled
                {"\n"}  <span className="text-[#44474a]">budget_cap:</span> $500/mo
              </pre>
            </div>
          </div>
        </div>

        {/* Architecture diagram */}
        <div className="dev-reveal mt-16 flex items-center justify-center">
          <div className="flex items-center gap-4 md:gap-8 flex-wrap justify-center">
            <div className="neo-pressed px-5 py-3 rounded-full text-sm text-[#44474a] font-light">
              Your App
            </div>
            <ArrowRight className="w-5 h-5 text-[#a3b1c6]" />
            <div className="neo-convex px-6 py-3 rounded-full text-sm font-medium text-[#2d3436] border border-[#ff570a]/10">
              Valymux
            </div>
            <ArrowRight className="w-5 h-5 text-[#a3b1c6]" />
            <div className="flex gap-2">
              {["OpenAI", "Anthropic", "Gemini", "Any"].map((p) => (
                <div key={p} className="neo-pressed px-3 py-2 rounded-full text-[9px] text-[#7d8da1] font-medium tracking-widest uppercase">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
