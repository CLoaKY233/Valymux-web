"use client";

import { useLayoutEffect, useRef } from "react";
import { ShieldCheck, Zap, Table2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { configureScrollTrigger, shouldSkipSceneAnimations, shouldSkipPinnedAnimations } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);
configureScrollTrigger();

const pillars = [
  {
    id: "security",
    icon: ShieldCheck,
    title: "Security",
    color: "text-[#ff570a]/40",
    description:
      "Provider credentials encrypted at rest. Virtual keys displayed once on creation, never stored in recoverable form. AGPL codebase — every line auditable. Self-hostable by design.",
    features: [
      { label: "Credential Encryption", value: "at rest" },
      { label: "Virtual Keys", value: "one-time display" },
      { label: "Self-Hostable", value: "air-gapped option" },
    ],
  },
  {
    id: "speed",
    icon: Zap,
    title: "Speed",
    color: "text-blue-400/50",
    description:
      "Rust-native engine with no garbage collection overhead. Concurrent streaming across providers. Designed to never be your bottleneck.",
    stats: [
      { label: "TARGET OVERHEAD", value: "0.4ms", width: "8%" },
      { label: "TARGET P99", value: "12ms", width: "15%" },
      { label: "DESIGN CAPACITY", value: "10k+", width: "90%" },
    ],
  },
  {
    id: "clarity",
    icon: Table2,
    title: "Clarity",
    color: "text-emerald-400/50",
    description:
      "Every model cataloged with its exact capabilities: streaming, thinking, tools, temperature range, context window. Configure once. Copy to code. No docs tab.",
    features: [
      { label: "claude-sonnet-4-6 · thinking", value: "✓ supported" },
      { label: "gpt-5.4 · tools + vision", value: "✓ supported" },
      { label: "gemini-3.1-pro · context", value: "1M tokens" },
    ],
  },
];

export function PillarsScene() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (shouldSkipSceneAnimations()) {
        gsap.set(
          [
            ".pillars-heading",
            ".pillars-subheading",
            ".pillars-glow",
            ".pillars-sparkle",
            ...pillars.flatMap((p, i) => [
              `.pillar-icon-${i}`,
              ...(p.features?.map((_, fi) => `.pillar-feature-${i}-${fi}`) ??
                []),
              ...(p.stats?.flatMap((_, si) => [
                `.pillar-stat-label-${i}-${si}`,
                `.pillar-bar-${i}-${si}`,
              ]) ?? []),
            ]),
            ...pillars.map((_, i) => `.pillar-card-${i}`),
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0 },
        );

        pillars.forEach((p, i) => {
          if (p.stats) {
            p.stats.forEach((stat, si) => {
              gsap.set(`.pillar-bar-${i}-${si}`, { width: stat.width });
            });
          }
        });

        return;
      }

      if (shouldSkipPinnedAnimations()) {
        const allEls = [
          ".pillars-heading",
          ".pillars-subheading",
          ".pillars-glow",
          ".pillars-sparkle",
          ...pillars.map((_, i) => `.pillar-card-${i}`),
          ...pillars.flatMap((p, i) => [
            `.pillar-icon-${i}`,
            ...(p.features?.map((_, fi) => `.pillar-feature-${i}-${fi}`) ?? []),
            ...(p.stats?.flatMap((_, si) => [`.pillar-stat-label-${i}-${si}`, `.pillar-bar-${i}-${si}`]) ?? []),
          ]),
        ];
        allEls.forEach((sel) => {
          gsap.fromTo(
            sel,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: { trigger: sel, start: "top 88%", end: "top 65%" },
            },
          );
        });
        pillars.forEach((p, i) => {
          if (p.stats) {
            p.stats.forEach((stat, si) => {
              gsap.set(`.pillar-bar-${i}-${si}`, { width: stat.width });
            });
          }
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.8,
          pinSpacing: true,
        },
      });

      tl.fromTo(
        ".pillars-heading",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.12 },
        0,
      );

      tl.fromTo(
        ".pillars-subheading",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.08 },
        0.08,
      );

      pillars.forEach((pillar, i) => {
        const offset = 0.18 + i * 0.25;

        tl.fromTo(
          `.pillar-card-${i}`,
          { y: 80, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.15, ease: "power2.out" },
          offset,
        );

        tl.fromTo(
          `.pillar-icon-${i}`,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.1, ease: "back.out(1.7)" },
          offset + 0.05,
        );

        if (pillar.features) {
          pillar.features.forEach((_, fi) => {
            tl.fromTo(
              `.pillar-feature-${i}-${fi}`,
              { x: -20, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.06 },
              offset + 0.08 + fi * 0.03,
            );
          });
        }

        if (pillar.stats) {
          pillar.stats.forEach((stat, si) => {
            tl.fromTo(
              `.pillar-stat-label-${i}-${si}`,
              { opacity: 0 },
              { opacity: 1, duration: 0.04 },
              offset + 0.08 + si * 0.02,
            );
            tl.fromTo(
              `.pillar-bar-${i}-${si}`,
              { width: "0%" },
              { width: stat.width, duration: 0.1, ease: "power2.out" },
              offset + 0.1 + si * 0.03,
            );
          });
        }


      });

      tl.fromTo(
        ".pillars-glow",
        { opacity: 0, scale: 0.8 },
        { opacity: 0.15, scale: 1.2, duration: 0.2 },
        0.3,
      );

      tl.fromTo(
        ".pillars-sparkle",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.6, duration: 0.08, stagger: 0.02 },
        0.85,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section min-h-screen relative flex items-center py-24 md:py-0 px-6 md:px-12 overflow-hidden"
    >
      <div
        className="pillars-glow absolute pointer-events-none opacity-0"
        style={{
          width: 800,
          height: 600,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, rgba(255,87,11,0.08) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="pillars-heading opacity-0">
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#7d8da1] font-medium">
              Three Pillars
            </span>
          </div>
          <h2 className="pillars-subheading text-3xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4 opacity-0">
            Built without{" "}
            <span className="font-normal text-[#44474a]">compromise.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`pillar-card-${i} ${
                  pillar.id === "speed" ? "neo-convex" : "neo-flat"
                } p-7 md:p-8 rounded-4xl flex flex-col opacity-0 relative`}
              >
                {pillar.id === "speed" && (
                  <>
                    <Sparkles className="pillars-sparkle absolute top-4 right-4 w-4 h-4 text-blue-400/30 opacity-0" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent rounded-4xl pointer-events-none" />
                  </>
                )}

                <div className="flex items-center gap-3 mb-5 relative">
                  <div
                    className={`pillar-icon-${i} neo-pressed w-11 h-11 rounded-xl flex items-center justify-center`}
                  >
                    <Icon className={`w-5 h-5 ${pillar.color}`} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-light text-[#2d3436]">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-sm text-[#7d8da1] font-light leading-relaxed mb-6 flex-1">
                  {pillar.description}
                </p>

                {pillar.features && (
                  <div className="space-y-3 relative">
                    {pillar.features.map((feature, fi) => (
                      <div
                        key={feature.label}
                        className={`pillar-feature-${i}-${fi} neo-pressed p-3.5 rounded-xl flex items-center gap-3 opacity-0`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                        <span className="text-xs text-[#44474a] font-light flex-1">
                          {feature.label}
                        </span>
                        <span className="font-mono text-[9px] text-[#a3b1c6]">
                          {feature.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {pillar.stats && (
                  <div className="space-y-4 relative">
                    {pillar.stats.map((stat, si) => (
                      <div key={stat.label}>
                        <div
                          className={`pillar-stat-label-${i}-${si} flex justify-between text-[9px] tracking-widest text-[#7d8da1] mb-2 opacity-0`}
                        >
                          <span>{stat.label}</span>
                          <span className="text-[#44474a] font-medium">
                            {stat.value}
                          </span>
                        </div>
                        <div className="neo-pressed h-2 w-full rounded-full overflow-hidden">
                          <div
                            className={`pillar-bar-${i}-${si} bg-blue-300/40 h-full rounded-full`}
                            style={{ width: 0 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
