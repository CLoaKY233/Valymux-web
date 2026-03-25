"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const beforeApis = [
  { provider: "OpenAI", endpoint: "/v1/chat/completions", format: "messages[]" },
  { provider: "Anthropic", endpoint: "/v1/messages", format: "content[]" },
  { provider: "Gemini", endpoint: "/v1/generateContent", format: "parts[]" },
  { provider: "Mistral", endpoint: "/v1/chat/completions", format: "messages[]" },
]

export function CompressionScene() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(".compress-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 45%", scrub: 1 },
        }
      )

      // Before cards slide in
      gsap.fromTo(".compress-before",
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: ".compress-visual", start: "top 80%", end: "top 45%", scrub: 1 },
        }
      )

      // Arrow appears
      gsap.fromTo(".compress-arrow",
        { scale: 0.5, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5,
          scrollTrigger: { trigger: ".compress-visual", start: "top 60%", end: "top 35%", scrub: 1 },
        }
      )

      // After card appears
      gsap.fromTo(".compress-after",
        { x: 40, opacity: 0, scale: 0.95 },
        {
          x: 0, opacity: 1, scale: 1, duration: 0.6,
          scrollTrigger: { trigger: ".compress-visual", start: "top 55%", end: "top 30%", scrub: 1 },
        }
      )

      // Bottom headline
      gsap.fromTo(".compress-tagline",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6,
          scrollTrigger: { trigger: ".compress-tagline", start: "top 90%", end: "top 65%", scrub: 1 },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="scene-section px-6 md:px-12 py-24 md:py-32 grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="compress-heading text-center mb-16 md:mb-20 opacity-0">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">
            The Solution
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4">
            One stable{" "}
            <span className="font-normal text-[#44474a]">layer.</span>
          </h2>
        </div>

        {/* Before → Gateway → After visual */}
        <div className="compress-visual grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-center">
          {/* Before: fragmented APIs */}
          <div className="space-y-3">
            {beforeApis.map((api, i) => (
              <div key={api.provider} className="compress-before neo-flat p-4 rounded-xl flex items-center justify-between gap-4 opacity-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-[#ff570a]/30 shrink-0" />
                  <span className="text-xs font-medium text-[#2d3436] shrink-0">{api.provider}</span>
                </div>
                <div className="flex items-center gap-3 text-right min-w-0">
                  <code className="font-mono text-[10px] text-[#7d8da1] truncate">{api.endpoint}</code>
                  <span className="neo-pressed px-2 py-1 rounded text-[8px] text-[#7d8da1] font-mono shrink-0">{api.format}</span>
                </div>
              </div>
            ))}
            <div className="text-center pt-2">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#7d8da1]">4 different APIs</span>
            </div>
          </div>

          {/* Center: Gateway */}
          <div className="compress-arrow flex flex-col items-center gap-4 py-6 opacity-0">
            <div className="neo-pressed w-0.5 h-10 rounded-full lg:hidden" />
            <div className="hidden lg:block neo-pressed w-10 h-0.5 rounded-full" />

            <div className="w-20 h-20 rounded-full border-2 border-[#ff570a]/20 gateway-pulse flex items-center justify-center">
              <div className="neo-convex w-14 h-14 rounded-full flex items-center justify-center">
                <span className="text-xs font-light tracking-[0.3em] text-[#2d3436]">V</span>
              </div>
            </div>

            <div className="neo-pressed w-0.5 h-10 rounded-full lg:hidden" />
            <div className="hidden lg:block neo-pressed w-10 h-0.5 rounded-full" />
          </div>

          {/* After: unified API */}
          <div className="compress-after opacity-0">
            <div className="neo-flat p-6 md:p-8 rounded-2xl border-2 border-[#ff570a]/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full bg-emerald-400/50" />
                <span className="text-xs font-medium text-[#44474a]">Valymux</span>
                <span className="ml-auto neo-convex px-2.5 py-1 rounded-full text-[8px] font-medium tracking-wider text-[#44474a]">UNIFIED</span>
              </div>

              <div className="neo-pressed p-4 rounded-xl font-mono text-[11px] text-[#7d8da1] space-y-2">
                <div><span className="text-emerald-400/60">POST</span> /v1/chat/completions</div>
                <div className="h-px bg-[#7d8da1]/15" />
                <div>
                  <span className="text-[#2d3436]">model:</span> &quot;primary-model&quot;
                </div>
                <div>
                  <span className="text-[#2d3436]">messages:</span> {"[{ role, content }]"}
                </div>
                <div className="h-px bg-[#7d8da1]/15" />
                <div><span className="text-emerald-400/60">→</span> Routes to best available provider</div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="neo-pressed p-3 rounded-lg text-center">
                  <div className="text-sm font-light text-[#2d3436]">1</div>
                  <div className="text-[7px] uppercase tracking-widest text-[#7d8da1] mt-1">API Format</div>
                </div>
                <div className="neo-pressed p-3 rounded-lg text-center">
                  <div className="text-sm font-light text-[#2d3436]">All</div>
                  <div className="text-[7px] uppercase tracking-widest text-[#7d8da1] mt-1">Providers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="compress-tagline text-center mt-16 md:mt-20 opacity-0">
          <h3 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
            One integration.{" "}
            <span className="font-normal text-[#44474a]">One interface.</span>{" "}
            One mental model.
          </h3>
        </div>
      </div>
    </section>
  )
}
