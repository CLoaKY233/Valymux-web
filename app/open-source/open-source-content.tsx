"use client";

import { useEffect, useRef } from "react";
import { PageLayout } from "@/components/page-layout";
import { GITHUB_URL } from "@/lib/seo";
import { useGitHubStars } from "@/hooks/use-github-stars";
import {
  Github,
  Eye,
  Users,
  MessageCircle,
  GitPullRequest,
  Rocket,
  GitMerge,
} from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const meanings = [
  { icon: Eye, text: "Visible architecture" },
  { icon: Users, text: "Transparent product direction" },
  { icon: MessageCircle, text: "Community feedback before and after launch" },
  { icon: GitPullRequest, text: "Issue-driven development" },
  { icon: GitMerge, text: "A path for contributions and collaboration" },
];

export default function OpenSourceContent() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { stars, loading } = useGitHubStars();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".oss-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <div ref={pageRef}>
        {/* Hero */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="oss-reveal">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">
                Open Source
              </span>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[#2d3436] mt-4 leading-tight">
                Open source from{" "}
                <span className="font-normal text-[#44474a]">day one.</span>
              </h1>
              <p className="text-[#7d8da1] font-light text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                We are building developer infrastructure. That means trust
                matters, and openness matters. People should be able to inspect
                how the gateway works and follow the product as it evolves.
              </p>
            </div>
          </div>
        </section>

        {/* GitHub Card */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="oss-reveal max-w-md mx-auto">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block neo-convex p-8 md:p-10 rounded-4xl text-center group hover:scale-[1.02] transition-transform duration-300"
            >
              <Github className="w-12 h-12 text-[#2d3436] mx-auto mb-5" />
              <div className="text-xl font-light tracking-[0.15em] text-[#2d3436] mb-2">
                valymux/core
              </div>
              <div className="font-mono text-xs text-[#7d8da1]">
                {GITHUB_URL.replace("https://", "")}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="neo-pressed p-3 rounded-xl text-center">
                  <div className="text-base font-light text-[#44474a]">
                    {loading ? "★" : stars !== null ? stars : "★"}
                  </div>
                  <div className="text-[7px] uppercase tracking-widest text-[#7d8da1] mt-1">
                    Stars
                  </div>
                </div>
                <div className="neo-pressed p-3 rounded-xl text-center">
                  <div className="text-base font-light text-[#44474a]">🦀</div>
                  <div className="text-[7px] uppercase tracking-widest text-[#7d8da1] mt-1">
                    Rust
                  </div>
                </div>
                <div className="neo-pressed p-3 rounded-xl text-center">
                  <div className="text-base font-light text-[#44474a]">
                    AGPL
                  </div>
                  <div className="text-[7px] uppercase tracking-widest text-[#7d8da1] mt-1">
                    License
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* What Open Source Means */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="oss-reveal text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                What open source{" "}
                <span className="font-normal text-[#44474a]">means here.</span>
              </h2>
            </div>
            <div className="oss-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {meanings.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="neo-flat p-5 rounded-xl flex items-center gap-4"
                  >
                    <div className="neo-pressed w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#7d8da1]" />
                    </div>
                    <span className="text-sm text-[#44474a] font-light">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Belief */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="oss-reveal max-w-3xl mx-auto neo-pressed p-8 md:p-10 rounded-4xl text-center">
            <h3 className="text-xl md:text-2xl font-light text-[#2d3436] mb-4">
              Our Belief
            </h3>
            <p className="text-base text-[#7d8da1] font-light leading-relaxed max-w-lg mx-auto">
              The best infrastructure tools are the ones people can read, trust,
              and improve. We want Valymux to be one of those tools.
            </p>
          </div>
        </section>

        {/* Community Signal */}
        <section className="px-6 md:px-12">
          <div className="oss-reveal max-w-2xl mx-auto text-center">
            <p className="text-base md:text-lg text-[#7d8da1] font-light leading-relaxed mb-8">
              We are not pretending to know everything on day one. We want
              developers to tell us what is missing, what is confusing, and what
              should be built next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-convex px-8 py-4 rounded-4xl inline-flex items-center justify-center gap-3"
              >
                <Github className="w-4 h-4 text-[#44474a]" />
                <span className="font-medium text-sm text-[#44474a]">
                  Star on GitHub
                </span>
                {!loading && stars !== null && (
                  <span className="neo-pressed px-2.5 py-0.5 rounded-full text-[10px] font-medium text-[#44474a] tracking-wide">
                    {stars}
                  </span>
                )}
              </a>
              <Link
                href="/waitlist"
                className="neo-button px-8 py-4 rounded-4xl inline-flex items-center justify-center gap-3"
              >
                <Rocket className="w-4 h-4 text-[#7d8da1]" />
                <span className="font-medium text-sm text-[#7d8da1]">
                  Join Waitlist
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
