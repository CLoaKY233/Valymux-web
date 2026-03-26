"use client"

import { useEffect, useRef } from "react"
import { PageLayout } from "@/components/page-layout"
import { ShieldCheck, Lock, Eye, KeyRound, Server, Shield, Rocket, ScrollText } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const currentPosture = [
  { icon: Lock, text: "Provider API keys encrypted at rest" },
  { icon: KeyRound, text: "Virtual API keys stored as hashes, not plaintext" },
  { icon: Server, text: "Database permissions scope access to authenticated users" },
  { icon: Eye, text: "Sensitive config values redacted in debug output" },
  { icon: Shield, text: "Request validation before forwarding to providers" },
  { icon: ShieldCheck, text: "Model capability checks before upstream requests" },
  { icon: ScrollText, text: "Request logs focus on metadata, not secrets" },
]

const trustSignals = [
  "Clear authentication flow",
  "Per-user provider ownership",
  "Virtual key authorization",
  "Model allowlists per virtual key",
  "Expiry support for virtual keys",
  "Secret redaction in configuration logging",
  "Request-level observability without leaking secrets",
]

const principles = [
  { title: "Minimize exposure", desc: "Store as little sensitive material as possible in plaintext." },
  { title: "Validate early", desc: "Reject invalid requests before they hit upstream providers." },
  { title: "Scope access tightly", desc: "Ensure users only access their own credentials and data." },
  { title: "Keep logs useful, not risky", desc: "Logs should help diagnose issues without creating a second secrets store." },
  { title: "Make control explicit", desc: "Model access, key access, and provider access should be visible and manageable." },
]

const comingSoon = [
  "Rate limiting",
  "Stronger policy controls",
  "Organization and team boundaries",
  "More audit visibility",
  "Better key rotation workflows",
  "Broader abuse prevention",
]

export default function SecurityContent() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".sec-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", end: "top 55%", scrub: 1 },
          }
        )
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <PageLayout>
      <div ref={pageRef}>
        {/* Hero */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="sec-reveal">
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">Security</span>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[#2d3436] mt-4 leading-tight">
                Safety is a product{" "}
                <span className="font-normal text-[#44474a]">principle.</span>
              </h1>
              <p className="text-[#7d8da1] font-light text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                Security is not compliance language. It is part of the developer experience.
                If developers trust the platform with their provider keys, traffic, and logs, the product has to earn that trust early.
              </p>
            </div>
          </div>
        </section>

        {/* Current Security Posture */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-5xl mx-auto">
            <div className="sec-reveal text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                Current <span className="font-normal text-[#44474a]">posture.</span>
              </h2>
            </div>
            <div className="sec-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPosture.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="neo-flat p-5 rounded-xl flex items-center gap-4">
                    <div className="neo-pressed w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-emerald-400/60" />
                    </div>
                    <span className="text-sm text-[#44474a] font-light leading-relaxed">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="sec-reveal text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                Principles we <span className="font-normal text-[#44474a]">follow.</span>
              </h2>
            </div>
            <div className="space-y-4">
              {principles.map((p, i) => (
                <div key={i} className="sec-reveal neo-pressed p-5 md:p-6 rounded-xl">
                  <h3 className="text-base font-medium text-[#2d3436] mb-1">{p.title}</h3>
                  <p className="text-sm text-[#7d8da1] font-light">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supply Chain Context */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="sec-reveal neo-flat p-6 md:p-8 rounded-4xl">
              <h2 className="text-xl md:text-2xl font-light tracking-tight text-[#2d3436] mb-4">
                Why the <span className="font-normal text-[#44474a]">language matters.</span>
              </h2>
              <p className="text-sm text-[#7d8da1] font-light leading-relaxed mb-4">
                Recent incidents in the LLM tooling ecosystem showed how a compromised dependency can silently exfiltrate credentials from every downstream user — SSH keys, cloud credentials, API tokens — on import, before any code runs.
              </p>
              <p className="text-sm text-[#7d8da1] font-light leading-relaxed mb-6">
                Valymux is written in Rust: compiled, statically linked, with no dynamic import hooks and no package manager running at runtime. There is no equivalent attack surface. You can audit the source, inspect the binary, and run it inside your own infrastructure with no external calls.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Compiled binary", desc: "No runtime package execution" },
                  { label: "AGPL source", desc: "Every line auditable" },
                  { label: "Self-hostable", desc: "Keys never leave your infra" },
                ].map((item) => (
                  <div key={item.label} className="neo-pressed p-4 rounded-xl">
                    <div className="text-xs font-medium text-[#2d3436] mb-1">{item.label}</div>
                    <div className="text-[11px] text-[#7d8da1] font-light">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-4xl mx-auto">
            <div className="sec-reveal text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                Built-in trust <span className="font-normal text-[#44474a]">signals.</span>
              </h2>
            </div>
            <div className="sec-reveal neo-flat p-6 md:p-8 rounded-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trustSignals.map((signal, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 shrink-0" />
                    <span className="text-xs md:text-sm text-[#44474a] font-light">{signal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Coming Next */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-3xl mx-auto">
            <div className="sec-reveal text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[#2d3436]">
                Coming <span className="font-normal text-[#44474a]">next.</span>
              </h2>
            </div>
            <div className="sec-reveal flex flex-wrap justify-center gap-3">
              {comingSoon.map((item, i) => (
                <div key={i} className="neo-pressed px-5 py-3 rounded-full">
                  <span className="text-xs md:text-sm text-[#7d8da1] font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12">
          <div className="sec-reveal max-w-2xl mx-auto text-center">
            <p className="text-lg md:text-xl font-light text-[#7d8da1] mb-6 italic">
              &ldquo;Not just fast. Not just flexible. Safe enough to trust with real workloads.&rdquo;
            </p>
            <Link href="/waitlist" className="neo-convex px-8 py-4 rounded-4xl inline-flex items-center gap-3">
              <Rocket className="w-4 h-4 text-[#ff570a]/50" />
              <span className="font-medium text-sm text-[#44474a]">Join Waitlist</span>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
