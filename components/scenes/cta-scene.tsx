"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Copy, Check, Rocket, Github, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { configureScrollTrigger, shouldSkipSceneAnimations, shouldSkipPinnedAnimations } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);
configureScrollTrigger();

export function CTAScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { stars, loading } = useGitHubStars();
  const [copied, setCopied] = useState(false);
  const [ctaEmail, setCtaEmail] = useState("");
  const router = useRouter();
  const command = "git clone https://github.com/CLoaKY233/Valymux.git";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write failed; leave UI unchanged
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (shouldSkipSceneAnimations()) {
        gsap.set(".cta-reveal", { opacity: 1, y: 0 });
        return;
      }

      if (shouldSkipPinnedAnimations()) {
        gsap.utils.toArray<HTMLElement>(".cta-reveal").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%", end: "top 65%" } },
          );
        });
        return;
      }

      gsap.utils.toArray<HTMLElement>(".cta-reveal").forEach((el) => {
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
              end: "top 68%",
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
      className="scene-section py-24 md:py-40 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Gateway visualization */}
        <div className="cta-reveal flex justify-center mb-12">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-[#ff570a]/20 gateway-pulse flex items-center justify-center">
            <div className="neo-convex w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center">
              <span className="text-sm md:text-lg font-light text-[#2d3436]">
                V
              </span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="cta-reveal">
          <span className="text-[10px] md:text-xs font-medium tracking-[0.6em] text-[#7d8da1] uppercase">
            Early Access
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-[#2d3436] tracking-tight mt-4 text-balance">
            Stop managing providers. <br className="hidden md:block" />
            Start building product.
          </h2>
          <p className="text-[#7d8da1] font-light text-base md:text-lg mt-6 max-w-xl mx-auto">
            MVP launching Q2 2026. Join early — your feedback shapes what gets
            built next.
          </p>
        </div>

        {/* Email waitlist */}
        <div className="cta-reveal mt-10 md:mt-14 max-w-xl mx-auto space-y-3">
          <div className="neo-pressed p-1.5 rounded-full flex items-center min-h-14">
            <input
              id="cta-email"
              type="email"
              aria-label="Waitlist email"
              placeholder="your@email.com"
              value={ctaEmail}
              onChange={(e) => setCtaEmail(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                router.push(
                  `/waitlist${ctaEmail ? `?email=${encodeURIComponent(ctaEmail)}` : ""}`,
                )
              }
              className="flex-1 bg-transparent px-5 py-2.5 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light min-w-0"
            />
            <button
              onClick={() =>
                router.push(
                  `/waitlist${ctaEmail ? `?email=${encodeURIComponent(ctaEmail)}` : ""}`,
                )
              }
              className="neo-convex min-h-11 px-5 py-2.5 rounded-full flex items-center justify-center gap-2 shrink-0"
            >
              <Rocket className="w-4 h-4 text-[#ff570a]/50" />
              <span className="font-medium text-sm text-[#44474a]">
                Join Waitlist
              </span>
            </button>
          </div>

          {/* GitHub CTA */}
          <a
            href="https://github.com/cloaky233/Valymux"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-button w-full min-h-12 px-5 rounded-full inline-flex items-center justify-center gap-2.5"
          >
            <Github className="w-4 h-4 text-[#7d8da1]" />
            <span className="text-sm font-medium text-[#7d8da1]">
              Star on GitHub
            </span>
            <span className={`neo-pressed px-2 py-0.5 rounded-full text-[9px] font-medium text-[#44474a] tracking-wide transition-opacity ${!loading && stars !== null ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              {stars ?? ""}
            </span>
          </a>

          {/* Feedback CTA */}
          <Link
            href="/feedback"
            className="neo-button w-full min-h-12 px-5 rounded-full inline-flex items-center justify-center gap-2 text-center"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#7d8da1] shrink-0 opacity-80" />
            <span className="text-[13px] font-light text-[#7d8da1]">
              Already building with AI? Share your experience
            </span>
          </Link>
        </div>

        {/* Docker command */}
        <div className="cta-reveal mt-12 md:mt-16">
          <div className="neo-pressed p-1.5 pl-5 md:pl-6 rounded-full flex items-center min-h-14 max-w-xl mx-auto bg-white/10">
            <code className="font-mono text-[11px] md:text-xs text-[#7d8da1] flex-1 text-left overflow-x-auto whitespace-nowrap min-w-0">
              {command}
            </code>
            <button
              onClick={handleCopy}
              className="neo-button w-11 h-11 md:w-12 md:h-12 rounded-full ml-3 shrink-0 flex items-center justify-center"
              aria-label="Copy command"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-[#7d8da1]" />
              )}
            </button>
          </div>
          <p className="mt-6 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#7d8da1]">
            OSS • Rust-Native • Self-Hostable
          </p>
        </div>
      </div>
    </section>
  );
}
