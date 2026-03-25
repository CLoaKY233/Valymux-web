"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, Globe, KeyRound, Activity, Route } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: Route,
    title: "Smart Routing",
    desc: "Requests routed to the best available provider based on config, load, and fallback rules.",
    color: "text-blue-400/60",
    detail: "primary: openai/gpt-4o → fallback: anthropic/claude-3",
  },
  {
    icon: Globe,
    title: "Universal Translation",
    desc: "One API format across all providers. No more adapting to each provider's quirks.",
    color: "text-emerald-400/60",
    detail: '{ "model": "any", "messages": [...] } → normalized',
  },
  {
    icon: KeyRound,
    title: "Secure Credentials",
    desc: "Provider keys never leave the gateway. Virtual API keys for your team, automatic rotation.",
    color: "text-orange-400/60",
    detail: "vk_live_*** → resolved provider key (never exposed)",
  },
  {
    icon: Activity,
    title: "Full Observability",
    desc: "Every request traced. Latency, tokens, cost — unified across all providers in real time.",
    color: "text-purple-400/60",
    detail: "trace_id: abc123 | 182ms | 1.2k tokens | $0.003",
  },
]

export function TransformationScene() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      })

      // Phase 0: Heading appears
      tl.fromTo(".transform-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.08 },
        0
      )

      // Phase 0: Product frame appears on the right
      tl.fromTo(".transform-frame",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1 },
        0.02
      )

      // Phase 0: Request line appears
      tl.fromTo(".transform-request-line",
        { opacity: 0 },
        { opacity: 1, duration: 0.05 },
        0.1
      )

      // Phase 1-4: Each step reveals one-by-one with staggered timing
      steps.forEach((_, i) => {
        const offset = 0.14 + i * 0.2

        // Step card slides in from left
        tl.fromTo(`.transform-step-${i}`,
          { x: -50, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" },
          offset
        )

        // Corresponding detail line appears in the product frame
        tl.fromTo(`.transform-detail-${i}`,
          { y: 8, opacity: 0, height: 0 },
          { y: 0, opacity: 1, height: "auto", duration: 0.08, ease: "power2.out" },
          offset + 0.04
        )

        // Active indicator grows
        tl.fromTo(`.transform-indicator-${i}`,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.06, transformOrigin: "left" },
          offset + 0.02
        )

        // Previous step dims (except the last one)
        if (i > 0) {
          tl.to(`.transform-step-${i - 1}`, {
            opacity: 0.4,
            duration: 0.08,
          }, offset)
        }
      })

      // Phase 5: Success line appears
      tl.fromTo(".transform-success",
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.14 + steps.length * 0.2
      )

      // Phase 5: Flow indicator appears
      tl.fromTo(".transform-flow",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.06 },
        0.16 + steps.length * 0.2
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="scene-section min-h-screen relative flex items-center px-6 md:px-12 grid-bg">
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <div className="transform-heading text-center mb-10 md:mb-14 opacity-0">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4">
            Route. Translate.{" "}
            <span className="font-normal text-[#44474a]">Observe.</span>
          </h2>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Steps revealed one-by-one */}
          <div className="space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.title}
                  className={`transform-step-${i} neo-flat p-5 md:p-6 rounded-xl md:rounded-2xl flex items-start gap-4 opacity-0`}
                >
                  <div className="neo-pressed w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="text-sm md:text-base font-medium text-[#2d3436]">{step.title}</h3>
                      <div
                        className={`transform-indicator-${i} h-0.5 w-10 bg-[#ff570a]/20 rounded-full`}
                        style={{ transform: "scaleX(0)" }}
                      />
                    </div>
                    <p className="text-xs text-[#7d8da1] font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: Product frame */}
          <div className="transform-frame opacity-0">
            <div className="neo-flat p-6 md:p-8 rounded-3xl md:rounded-4xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f1f2f6]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#f1f2f6]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#f1f2f6]" />
                <span className="ml-3 font-mono text-[9px] text-[#a3b1c6]">valymux-request-flow</span>
              </div>

              {/* Request visualization */}
              <div className="neo-pressed p-4 md:p-5 rounded-xl font-mono text-[10px] md:text-[11px] space-y-2.5">
                {/* Request line */}
                <div className="transform-request-line text-[#7d8da1] opacity-0">
                  <span className="text-[#ff570a]/40">→</span> POST /v1/chat/completions
                </div>

                <div className="h-px bg-[#a3b1c6]/10" />

                {/* Detail lines — appear one-by-one matching left steps */}
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={`transform-detail-${i} flex items-start gap-2 opacity-0 overflow-hidden`}
                    style={{ height: 0 }}
                  >
                    <span className="text-[#ff570a]/30 shrink-0 leading-relaxed">│</span>
                    <span className="text-[#44474a] leading-relaxed break-all">{step.detail}</span>
                  </div>
                ))}

                <div className="h-px bg-[#a3b1c6]/10" />

                {/* Success line */}
                <div className="transform-success text-[#7d8da1] opacity-0">
                  <span className="text-emerald-400/60">✓</span> 200 OK — 182ms
                </div>
              </div>

              {/* Flow indicator */}
              <div className="transform-flow flex items-center justify-center gap-3 mt-5 flex-wrap opacity-0">
                <span className="neo-pressed px-3 py-1.5 rounded-full text-[8px] tracking-widest text-[#a3b1c6] uppercase">Your App</span>
                <ArrowRight className="w-3 h-3 text-[#a3b1c6]" />
                <span className="neo-convex px-3.5 py-1.5 rounded-full text-[8px] tracking-widest text-[#44474a] font-medium uppercase">Valymux</span>
                <ArrowRight className="w-3 h-3 text-[#a3b1c6]" />
                <span className="neo-pressed px-3 py-1.5 rounded-full text-[8px] tracking-widest text-[#a3b1c6] uppercase">Provider</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
