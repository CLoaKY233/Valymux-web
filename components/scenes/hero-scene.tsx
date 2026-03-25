"use client";

import { useEffect, useRef } from "react";
import { Rocket, Star } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGitHubStars } from "@/hooks/use-github-stars";
import {
  configureScrollTrigger,
  shouldSkipSceneAnimations,
} from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);
configureScrollTrigger();

export function HeroScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { stars, loading } = useGitHubStars();
  const contentRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (shouldSkipSceneAnimations()) {
        gsap.set(
          [
            ".hero-label",
            ".hero-headline",
            ".hero-subtitle",
            ".hero-cta",
            ".hero-stat",
            diagramRef.current,
          ],
          { opacity: 1, y: 0 },
        );
        return;
      }

      // Entrance animations on load
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        ".hero-label",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0,
      );

      tl.fromTo(
        ".hero-headline",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        0.15,
      );

      tl.fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.35,
      );

      tl.fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        0.5,
      );

      tl.fromTo(
        ".hero-stat",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.6,
      );

      tl.fromTo(
        diagramRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        0.25,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section min-h-screen relative grid-bg pt-28 md:pt-32 pb-16"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[calc(100vh-10rem)]">
          {/* Left: Copy */}
          <div
            ref={contentRef}
            className="lg:col-span-7 flex flex-col space-y-8"
          >
            <div className="hero-label flex items-center gap-3 opacity-0">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400/40" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#7d8da1] font-medium">
                Unified AI Infrastructure
              </span>
            </div>

            <h1 className="hero-headline text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-light tracking-tight leading-[1.12] text-[#2d3436] opacity-0">
              The Simple{" "}
              <span className="font-normal text-[#44474a]">Gateway</span>
              <br />
              for Developers
              <br />
              Building with AI.
            </h1>

            <p className="hero-subtitle text-base md:text-lg text-[#7d8da1] font-light max-w-lg leading-relaxed opacity-0">
              One API endpoint for every AI provider. Route, translate, and
              observe — without fighting each provider&apos;s API.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-2">
              <Link
                href="/waitlist"
                className="hero-cta neo-convex px-8 py-4 rounded-4xl flex items-center justify-center gap-3 group opacity-0"
              >
                <Rocket className="w-4 h-4 text-[#ff570a]/50" />
                <span className="font-medium text-sm text-[#44474a]">
                  Join Waitlist
                </span>
              </Link>
              <a
                href="https://github.com/cloaky233/Valymux"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta neo-button px-8 py-4 rounded-4xl flex items-center justify-center gap-3 opacity-0"
              >
                <Star className="w-4 h-4 text-[#7d8da1]" />
                <span className="font-medium text-sm text-[#7d8da1]">
                  Star on GitHub
                </span>
                {!loading && stars !== null && (
                  <span className="neo-pressed px-2.5 py-0.5 rounded-full text-[10px] font-medium text-[#44474a] tracking-wide">
                    {stars}
                  </span>
                )}
              </a>
            </div>

            <p className="hero-cta text-xs text-[#a3b1c6] font-light opacity-0">
              Already building with AI?{" "}
              <Link
                href="/feedback"
                className="text-[#7d8da1] hover:text-[#44474a] underline underline-offset-2 transition-colors"
              >
                Share your experience →
              </Link>
            </p>

            <div className="hero-stat flex items-center gap-2 md:gap-3 pt-4 opacity-0">
              <div className="neo-pressed px-3 md:px-4 py-2 md:py-2.5 rounded-full">
                <span className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-[#44474a] font-medium">
                  Open Source
                </span>
              </div>
              <span className="text-[#a3b1c6]/50 text-xs">•</span>
              <div className="neo-pressed px-3 md:px-4 py-2 md:py-2.5 rounded-full">
                <span className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-[#44474a] font-medium">
                  Rust Engine
                </span>
              </div>
              <span className="text-[#a3b1c6]/50 text-xs">•</span>
              <div className="neo-pressed px-3 md:px-4 py-2 md:py-2.5 rounded-full">
                <span className="text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-[#44474a] font-medium">
                  Zero Lock-in
                </span>
              </div>
            </div>
          </div>

          {/* Right: Gateway diagram */}
          <div ref={diagramRef} className="lg:col-span-5 opacity-0">
            <div className="neo-flat p-8 md:p-10 rounded-[2.5rem] relative">
              <div className="flex justify-center gap-3 md:gap-4 mb-6">
                {["API Call", "SDK", "cURL"].map((label) => (
                  <div
                    key={label}
                    className="neo-convex px-3 md:px-4 py-2 md:py-2.5 rounded-xl text-center min-w-[70px] md:min-w-[80px]"
                  >
                    <span className="text-[9px] font-medium tracking-widest text-[#7d8da1] uppercase">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mb-4">
                <div className="neo-pressed w-0.5 h-8 rounded-full" />
              </div>

              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full border-2 border-[#ff570a]/15 gateway-pulse flex items-center justify-center">
                  <div className="neo-convex w-16 h-16 rounded-full flex items-center justify-center">
                    <span className="text-sm font-light text-[#2d3436]">V</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <div className="neo-pressed w-0.5 h-8 rounded-full" />
              </div>

              <div className="flex justify-center gap-2 flex-wrap max-w-[280px] mx-auto">
                {["OpenAI", "Anthropic", "Gemini", "Mistral"].map((name) => (
                  <div
                    key={name}
                    className="neo-pressed px-3 py-2 rounded-full"
                  >
                    <span className="text-[8px] font-medium tracking-widest text-[#7d8da1] uppercase">
                      {name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#7d8da1] font-medium">
                  One Gateway · Any Provider
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
