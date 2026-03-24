"use client"

import { useEffect, useRef } from "react"
import { ShieldCheck, Zap, Activity } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PillarsScene() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading
      gsap.fromTo(".pillars-heading",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 50%", scrub: 1 },
        }
      )

      // Each pillar card reveals on scroll
      gsap.utils.toArray<HTMLElement>(".pillar-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          }
        )
      })

      // Stat bars animate width on scroll
      gsap.utils.toArray<HTMLElement>(".pillar-bar-fill").forEach((bar) => {
        const targetWidth = bar.getAttribute("data-width") || "50%"
        gsap.fromTo(bar,
          { width: "0%" },
          {
            width: targetWidth, duration: 1,
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="scene-section px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="pillars-heading text-center mb-16 md:mb-20 opacity-0">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#7d8da1] font-medium">
            Three Pillars
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4">
            Architected for{" "}
            <span className="font-normal text-[#44474a]">Intelligence.</span>
          </h2>
          <p className="text-[#7d8da1] font-light text-base md:text-lg mt-5 max-w-2xl mx-auto">
            Every design decision serves safety, speed, or observability.
            No compromises.
          </p>
        </div>

        {/* Three pillar cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* SAFETY */}
          <div className="pillar-card neo-flat p-7 md:p-8 rounded-[2rem] flex flex-col opacity-0">
            <div className="flex items-center gap-3 mb-5">
              <div className="neo-pressed w-11 h-11 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#ff570a]/40" />
              </div>
              <h3 className="text-xl md:text-2xl font-light text-[#2d3436]">Safety</h3>
            </div>

            <p className="text-sm text-[#7d8da1] font-light leading-relaxed mb-6 flex-1">
              Virtual API keys isolate access. Provider credentials never leave the gateway.
              PII filtering, budget controls, and automatic key rotation built in.
            </p>

            <div className="space-y-3">
              <div className="neo-pressed p-3.5 rounded-xl flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                <span className="text-xs text-[#44474a] font-light flex-1">Virtual API Keys</span>
                <span className="font-mono text-[9px] text-[#a3b1c6]">vk_live_***</span>
              </div>
              <div className="neo-pressed p-3.5 rounded-xl flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                <span className="text-xs text-[#44474a] font-light flex-1">PII Filtering</span>
                <span className="font-mono text-[9px] text-[#a3b1c6]">enabled</span>
              </div>
              <div className="neo-pressed p-3.5 rounded-xl flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                <span className="text-xs text-[#44474a] font-light flex-1">Budget Controls</span>
                <span className="font-mono text-[9px] text-[#a3b1c6]">$500/mo cap</span>
              </div>
            </div>
          </div>

          {/* SPEED */}
          <div className="pillar-card neo-convex p-7 md:p-8 rounded-[2rem] flex flex-col opacity-0">
            <div className="flex items-center gap-3 mb-5">
              <div className="neo-pressed w-11 h-11 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-400/50" />
              </div>
              <h3 className="text-xl md:text-2xl font-light text-[#2d3436]">Speed</h3>
            </div>

            <p className="text-sm text-[#7d8da1] font-light leading-relaxed mb-6 flex-1">
              Rust-native engine with zero garbage collection. Concurrent streaming
              across providers. Internal overhead measured in microseconds.
            </p>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[9px] tracking-widest text-[#7d8da1] mb-2">
                  <span>INTERNAL OVERHEAD</span>
                  <span className="text-[#44474a] font-medium">0.4ms</span>
                </div>
                <div className="neo-pressed h-2 w-full rounded-full overflow-hidden">
                  <div className="pillar-bar-fill bg-blue-300/40 h-full rounded-full" data-width="8%" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] tracking-widest text-[#7d8da1] mb-2">
                  <span>P99 LATENCY</span>
                  <span className="text-[#44474a] font-medium">12ms</span>
                </div>
                <div className="neo-pressed h-2 w-full rounded-full overflow-hidden">
                  <div className="pillar-bar-fill bg-blue-300/40 h-full rounded-full" data-width="15%" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[9px] tracking-widest text-[#7d8da1] mb-2">
                  <span>CONCURRENT STREAMS</span>
                  <span className="text-[#44474a] font-medium">10k+</span>
                </div>
                <div className="neo-pressed h-2 w-full rounded-full overflow-hidden">
                  <div className="pillar-bar-fill bg-blue-300/40 h-full rounded-full" data-width="90%" />
                </div>
              </div>
            </div>
          </div>

          {/* OBSERVABILITY */}
          <div className="pillar-card neo-flat p-7 md:p-8 rounded-[2rem] flex flex-col opacity-0">
            <div className="flex items-center gap-3 mb-5">
              <div className="neo-pressed w-11 h-11 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-400/50" />
              </div>
              <h3 className="text-xl md:text-2xl font-light text-[#2d3436]">Observability</h3>
            </div>

            <p className="text-sm text-[#7d8da1] font-light leading-relaxed mb-6 flex-1">
              Every request traced end-to-end. Unified metrics across all providers.
              Cost tracking, token analytics, and latency breakdowns.
            </p>

            <div className="space-y-3">
              <div className="neo-pressed p-3.5 rounded-xl font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50" />
                  <span className="text-[#7d8da1]">trace:</span>
                  <span className="text-[#44474a]">abc-123</span>
                  <span className="ml-auto text-[#a3b1c6]">182ms</span>
                </div>
              </div>
              <div className="neo-pressed p-3.5 rounded-xl font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
                  <span className="text-[#7d8da1]">tokens:</span>
                  <span className="text-[#44474a]">1,247 / 856</span>
                  <span className="ml-auto text-[#a3b1c6]">$0.003</span>
                </div>
              </div>
              <div className="neo-pressed p-3.5 rounded-xl font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                  <span className="text-[#7d8da1]">provider:</span>
                  <span className="text-[#44474a]">openai/gpt-4o</span>
                  <span className="ml-auto text-emerald-400/60">✓ 200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
