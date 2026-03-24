"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const painPoints = [
  { label: "Different streaming formats", icon: "⚡" },
  { label: "Inconsistent tool schemas", icon: "🔧" },
  { label: "Secret sprawl across teams", icon: "🔑" },
  { label: "Provider lock-in risk", icon: "🔒" },
  { label: "No unified logging", icon: "📊" },
  { label: "Mixed auth patterns", icon: "🛡️" },
  { label: "Version mismatches", icon: "⚠️" },
  { label: "Cost blind spots", icon: "💸" },
]

export function ChaosScene() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      })

      // Phase 1: Heading fades in
      tl.fromTo(".chaos-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2 },
        0
      )

      // Phase 2: Cards fly in from left and right, landing in a centered 2x4 grid
      painPoints.forEach((_, i) => {
        const isLeft = i % 2 === 0
        const row = Math.floor(i / 2)

        tl.fromTo(`.chaos-card-${i}`,
          {
            x: isLeft ? -500 : 500,
            y: gsap.utils.random(-80, 80),
            rotation: gsap.utils.random(-20, 20),
            opacity: 0,
            scale: 0.7,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 0.12,
            ease: "back.out(1.4)",
          },
          0.15 + i * 0.04
        )
      })

      // Phase 3: Once all cards are in, subtle chaotic jitter
      tl.to(".chaos-card", {
        x: "random(-6, 6)",
        y: "random(-4, 4)",
        rotation: "random(-2, 2)",
        duration: 0.15,
        stagger: { each: 0.02, from: "random" },
      }, 0.65)

      // Phase 4: Bottom summary appears
      tl.fromTo(".chaos-summary",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1 },
        0.72
      )

      // Phase 5: Orange glow intensifies behind the grid
      tl.fromTo(".chaos-glow",
        { opacity: 0, scale: 0.8 },
        { opacity: 0.2, scale: 1.2, duration: 0.3 },
        0.5
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="scene-section min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="chaos-glow absolute pointer-events-none opacity-0"
        style={{
          width: 700,
          height: 500,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse, rgba(255,87,11,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
        {/* Heading — at the top of the pinned area */}
        <div className="chaos-heading text-center mb-12 md:mb-14 opacity-0">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">
            The Problem
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4">
            Chaos under{" "}
            <span className="font-normal text-[#44474a]">the hood.</span>
          </h2>
          <p className="text-[#7d8da1] font-light text-base md:text-lg mt-4 max-w-xl mx-auto">
            Every provider has its own formats, its own auth, its own quirks.
            Your team writes glue code instead of building product.
          </p>
        </div>

        {/* Pain point cards — 2-column grid as landing positions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
          {painPoints.map((point, i) => (
            <div
              key={point.label}
              className={`chaos-card chaos-card-${i} neo-flat p-4 md:p-5 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 opacity-0`}
            >
              <div className="neo-pressed w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-sm md:text-base">{point.icon}</span>
              </div>
              <span className="text-xs md:text-sm font-light text-[#44474a]">{point.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom summary */}
        <div className="chaos-summary flex justify-center mt-10 opacity-0">
          <div className="neo-pressed px-6 py-3 rounded-full">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#7d8da1] font-medium">
              8+ integration headaches per provider
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
