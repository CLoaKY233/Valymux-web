"use client"

import { useEffect, useRef, useState } from "react"
import { Copy, Check, Rocket, Github, MessageSquare } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGitHubStars } from "@/hooks/use-github-stars"

gsap.registerPlugin(ScrollTrigger)

export function CTAScene() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { stars, loading } = useGitHubStars()
  const [copied, setCopied] = useState(false)
  const command = "git clone https://github.com/CLoaKY233/Valymux.git"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cta-reveal").forEach((el, i) => {
        gsap.fromTo(el,
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
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="scene-section py-24 md:py-40 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Gateway visualization */}
        <div className="cta-reveal flex justify-center mb-12">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-[#ff570a]/20 gateway-pulse flex items-center justify-center">
            <div className="neo-convex w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center">
              <span className="text-sm md:text-lg font-light text-[#2d3436]">V</span>
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="cta-reveal">
          <span className="text-[10px] md:text-xs font-medium tracking-[0.6em] text-[#7d8da1] uppercase">
            Early Access
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-[#2d3436] tracking-tight mt-4 text-balance">
            Ready to simplify{" "}
            <br className="hidden md:block" />
            your AI stack?
          </h2>
          <p className="text-[#7d8da1] font-light text-base md:text-lg mt-6 max-w-xl mx-auto">
            MVP launching late April 2026. Join the waitlist to get early access
            and help shape the future of AI infrastructure.
          </p>
        </div>

        {/* Email waitlist */}
        <div className="cta-reveal mt-10 md:mt-14 max-w-md mx-auto">
          <div className="neo-pressed p-2 rounded-full flex items-center">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-5 py-3 text-sm text-[#44474a] placeholder-[#a3b1c6] outline-none font-light"
            />
            <Link href="/waitlist" className="neo-convex px-6 py-3 rounded-full flex items-center gap-2 shrink-0">
              <Rocket className="w-4 h-4 text-[#ff570a]/50" />
              <span className="font-medium text-sm text-[#44474a]">Join Waitlist</span>
            </Link>
          </div>
        </div>

        {/* GitHub CTA */}
        <div className="cta-reveal mt-8">
          <a
            href="https://github.com/cloaky233/Valymux"
            target="_blank"
            rel="noopener noreferrer"
            className="neo-button px-8 py-4 rounded-full inline-flex items-center gap-3"
          >
            <Github className="w-5 h-5 text-[#7d8da1]" />
            <span className="font-medium text-[#7d8da1]">Star on GitHub</span>
            {!loading && stars !== null && (
              <span className="neo-pressed px-2.5 py-0.5 rounded-full text-[10px] font-medium text-[#44474a] tracking-wide">
                {stars}
              </span>
            )}
          </a>
        </div>

        {/* Feedback CTA */}
        <div className="cta-reveal mt-4">
          <Link
            href="/feedback"
            className="neo-button px-7 py-3 rounded-full inline-flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#7d8da1]" />
            <span className="text-sm font-light text-[#7d8da1]">Already building with AI? Share your experience</span>
          </Link>
        </div>

        {/* Docker command */}
        <div className="cta-reveal mt-12 md:mt-16">
          <div className="neo-pressed p-2 pl-6 md:pl-8 rounded-full flex items-center max-w-2xl mx-auto bg-white/10">
            <code className="font-mono text-xs md:text-sm text-[#7d8da1] flex-1 text-left overflow-x-auto whitespace-nowrap">
              {command}
            </code>
            <button
              onClick={handleCopy}
              className="neo-button p-4 md:p-5 rounded-full ml-4 shrink-0"
              aria-label="Copy command"
            >
              {copied
                ? <Check className="w-4 h-4 text-green-500" />
                : <Copy className="w-4 h-4 text-[#7d8da1]" />
              }
            </button>
          </div>
          <p className="mt-6 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#7d8da1]">
            OSS • 100% Rust • Pre-Release
          </p>
        </div>
      </div>
    </section>
  )
}
