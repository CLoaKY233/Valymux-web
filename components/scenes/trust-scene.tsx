"use client";

import { useEffect, useRef } from "react";
import { Github, Heart, Users, BookOpen, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { shouldSkipSceneAnimations } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

export function TrustScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { stars, loading } = useGitHubStars();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (shouldSkipSceneAnimations()) {
        gsap.set(".trust-reveal", { opacity: 1, y: 0 });
        return;
      }

      gsap.utils.toArray<HTMLElement>(".trust-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 65%",
              scrub: 1,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section px-6 md:px-12 py-24 md:py-40"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <div className="trust-reveal mb-16">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#7d8da1] font-medium">
            Open Source
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4 text-balance">
            Built in the open.{" "}
            <span className="font-normal text-[#44474a]">
              Shaped by developers.
            </span>
          </h2>
          <p className="text-[#7d8da1] font-light text-base md:text-lg mt-6 max-w-2xl mx-auto">
            Valymux is open source from day one. We believe the infrastructure
            you trust with your API keys should be transparent, auditable, and
            under your control.
          </p>
        </div>

        {/* GitHub card */}
        <div className="trust-reveal neo-flat p-8 md:p-10 rounded-4xl md:rounded-5xl max-w-lg mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Github className="w-8 h-8 text-[#2d3436]" />
            <span className="text-lg font-light tracking-[0.2em] text-[#2d3436]">
              CLoaKY233/Valymux
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="neo-pressed p-3 rounded-xl text-center">
              <div className="text-lg font-light text-[#44474a]">
                {loading ? "★" : stars !== null ? stars : "★"}
              </div>
              <div className="text-[8px] uppercase tracking-widest text-[#7d8da1] mt-1">
                Stars
              </div>
            </div>
            <div className="neo-pressed p-3 rounded-xl text-center">
              <div className="text-lg font-light text-[#44474a]">🦀</div>
              <div className="text-[8px] uppercase tracking-widest text-[#7d8da1] mt-1">
                Rust
              </div>
            </div>
            <div className="neo-pressed p-3 rounded-xl text-center">
              <div className="text-lg font-light text-[#44474a]">AGPL</div>
              <div className="text-[8px] uppercase tracking-widest text-[#7d8da1] mt-1">
                License
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="trust-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="neo-pressed p-6 rounded-2xl text-center">
            <BookOpen className="w-6 h-6 text-[#7d8da1] mx-auto mb-3" />
            <h3 className="text-sm font-medium text-[#2d3436] mb-2">
              Transparent
            </h3>
            <p className="text-xs text-[#7d8da1] font-light">
              Every line of code is public. Audit the gateway yourself.
            </p>
          </div>
          <div className="neo-pressed p-6 rounded-2xl text-center">
            <Users className="w-6 h-6 text-[#7d8da1] mx-auto mb-3" />
            <h3 className="text-sm font-medium text-[#2d3436] mb-2">
              Community
            </h3>
            <p className="text-xs text-[#7d8da1] font-light">
              Feature requests, bug reports, and PRs welcome from day one.
            </p>
          </div>
          <div className="neo-pressed p-6 rounded-2xl text-center">
            <Heart className="w-6 h-6 text-[#7d8da1] mx-auto mb-3" />
            <h3 className="text-sm font-medium text-[#2d3436] mb-2">Honest</h3>
            <p className="text-xs text-[#7d8da1] font-light">
              We're early. We share what works, what doesn't, and what's next.
            </p>
          </div>
          <div className="neo-pressed p-6 rounded-2xl text-center">
            <Shield className="w-6 h-6 text-[#7d8da1] mx-auto mb-3" />
            <h3 className="text-sm font-medium text-[#2d3436] mb-2">Secure</h3>
            <p className="text-xs text-[#7d8da1] font-light">
              Rust-native, no dynamic imports. Audit the binary. Host it yourself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
