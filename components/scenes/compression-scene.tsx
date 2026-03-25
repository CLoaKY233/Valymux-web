"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldSkipSceneAnimations } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

const beforeApis = [
  {
    provider: "OpenAI",
    endpoint: "/v1/chat/completions",
    format: "messages[]",
  },
  { provider: "Anthropic", endpoint: "/v1/messages", format: "content[]" },
  { provider: "Gemini", endpoint: "/v1/generateContent", format: "parts[]" },
  {
    provider: "Mistral",
    endpoint: "/v1/chat/completions",
    format: "messages[]",
  },
];

export function CompressionScene() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (shouldSkipSceneAnimations()) {
        gsap.set(
          [
            ".compress-heading",
            ".compress-chaos-label",
            ".compress-arrow-container",
            ".compress-gateway",
            ".compress-unified",
            ".compress-unified-content",
            ".compress-stats",
            ".compress-tagline",
            ".compress-glow",
            ".compress-sparkle",
            ...beforeApis.map((_, i) => `.compress-api-${i}`),
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0 },
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=265%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      tl.fromTo(
        ".compress-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1 },
        0,
      );

      beforeApis.forEach((_, i) => {
        tl.fromTo(
          `.compress-api-${i}`,
          { x: -100, opacity: 0, rotation: -5 },
          { x: 0, opacity: 1, rotation: 0, duration: 0.08, ease: "power2.out" },
          0.08 + i * 0.06,
        );
      });

      tl.fromTo(
        ".compress-chaos-label",
        { opacity: 0 },
        { opacity: 1, duration: 0.05 },
        0.35,
      );

      tl.fromTo(
        ".compress-arrow-container",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.12, ease: "back.out(1.7)" },
        0.42,
      );

      tl.to(
        ".compress-apis-container",
        {
          x: -30,
          opacity: 0.4,
          duration: 0.1,
        },
        0.5,
      );

      beforeApis.forEach((_, i) => {
        tl.to(
          `.compress-api-${i}`,
          {
            y: (i - 1.5) * 8,
            scale: 0.95,
            duration: 0.08,
          },
          0.5 + i * 0.015,
        );
      });

      tl.fromTo(
        ".compress-gateway",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.15, ease: "back.out(1.4)" },
        0.55,
      );

      tl.fromTo(
        ".compress-glow",
        { opacity: 0, scale: 0.8 },
        { opacity: 0.6, scale: 1.5, duration: 0.2 },
        0.55,
      );

      tl.fromTo(
        ".compress-unified",
        { x: 100, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, duration: 0.15, ease: "power2.out" },
        0.65,
      );

      tl.fromTo(
        ".compress-unified-content",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1 },
        0.72,
      );

      tl.fromTo(
        ".compress-stats",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.08 },
        0.78,
      );

      tl.to(
        ".compress-apis-container",
        {
          opacity: 0.15,
          duration: 0.1,
        },
        0.75,
      );

      tl.fromTo(
        ".compress-tagline",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.1 },
        0.85,
      );

      tl.fromTo(
        ".compress-sparkle",
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.1, stagger: 0.02 },
        0.7,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section min-h-screen relative flex items-center py-24 md:py-0 px-6 md:px-12 grid-bg overflow-hidden"
    >
      <div
        className="compress-glow absolute pointer-events-none opacity-0"
        style={{
          width: 600,
          height: 600,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, rgba(255,87,11,0.12) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="compress-heading text-center mb-12 md:mb-16 opacity-0">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">
            The Solution
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4">
            One stable{" "}
            <span className="font-normal text-[#44474a]">layer.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-10 items-center">
          <div className="compress-apis-container space-y-3">
            {beforeApis.map((api, i) => (
              <div
                key={api.provider}
                className={`compress-api-${i} neo-flat p-4 rounded-xl flex items-center justify-between gap-4 opacity-0`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-[#ff570a]/30 shrink-0" />
                  <span className="text-xs font-medium text-[#2d3436] shrink-0">
                    {api.provider}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-right min-w-0">
                  <code className="font-mono text-[10px] text-[#7d8da1] truncate">
                    {api.endpoint}
                  </code>
                  <span className="neo-pressed px-2 py-1 rounded text-[8px] text-[#7d8da1] font-mono shrink-0">
                    {api.format}
                  </span>
                </div>
              </div>
            ))}
            <div className="compress-chaos-label text-center pt-2 opacity-0">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#7d8da1]">
                4 different APIs
              </span>
            </div>
          </div>

          <div className="compress-arrow-container flex flex-col items-center gap-4 py-6 opacity-0">
            <div className="neo-pressed w-0.5 h-8 rounded-full lg:hidden" />
            <div className="hidden lg:block neo-pressed w-8 h-0.5 rounded-full" />

            <div className="compress-gateway relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-[#ff570a]/25 gateway-pulse flex items-center justify-center">
                <div className="neo-convex w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center">
                  <span className="text-sm md:text-base font-light text-[#2d3436]">
                    V
                  </span>
                </div>
              </div>
              <Sparkles className="compress-sparkle absolute -top-2 -right-2 w-5 h-5 text-[#ff570a]/40 opacity-0" />
              <Sparkles className="compress-sparkle absolute -bottom-1 -left-3 w-4 h-4 text-[#ff570a]/30 opacity-0" />
            </div>

            <div className="neo-pressed w-0.5 h-8 rounded-full lg:hidden" />
            <div className="hidden lg:block neo-pressed w-8 h-0.5 rounded-full" />
          </div>

          <div className="compress-unified opacity-0">
            <div className="neo-flat p-6 md:p-8 rounded-3xl border-2 border-[#ff570a]/15 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff570a]/5 to-transparent pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                  <span className="text-sm font-medium text-[#44474a]">
                    Valymux
                  </span>
                  <span className="ml-auto neo-convex px-3 py-1 rounded-full text-[8px] font-medium tracking-wider text-[#44474a]">
                    UNIFIED
                  </span>
                </div>

                <div className="compress-unified-content neo-pressed p-4 md:p-5 rounded-xl font-mono text-[11px] md:text-xs text-[#7d8da1] space-y-2.5 opacity-0">
                  <div>
                    <span className="text-emerald-400/70">POST</span>{" "}
                    <span className="text-[#44474a]">/v1/chat/completions</span>
                  </div>
                  <div className="h-px bg-[#7d8da1]/15" />
                  <div>
                    <span className="text-[#2d3436]">model:</span>{" "}
                    "primary-model"
                  </div>
                  <div>
                    <span className="text-[#2d3436]">messages:</span>{" "}
                    {"[{ role, content }]"}
                  </div>
                  <div className="h-px bg-[#7d8da1]/15" />
                  <div className="text-[#ff570a]/60">
                    <ArrowRight className="w-3 h-3 inline mr-1" />
                    Routes to best available provider
                  </div>
                </div>

                <div className="compress-stats mt-5 grid grid-cols-2 gap-3 opacity-0">
                  <div className="neo-pressed p-3 rounded-xl text-center">
                    <div className="text-xl font-light text-[#2d3436]">1</div>
                    <div className="text-[8px] uppercase tracking-widest text-[#7d8da1] mt-1">
                      API Format
                    </div>
                  </div>
                  <div className="neo-pressed p-3 rounded-xl text-center">
                    <div className="text-xl font-light text-[#2d3436]">All</div>
                    <div className="text-[8px] uppercase tracking-widest text-[#7d8da1] mt-1">
                      Providers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="compress-tagline text-center mt-16 md:mt-20 opacity-0">
          <h3 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
            One integration.{" "}
            <span className="font-normal text-[#44474a]">One interface.</span>{" "}
            One mental model.
          </h3>
        </div>
      </div>
    </section>
  );
}
