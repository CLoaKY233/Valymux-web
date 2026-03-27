"use client"

import { useEffect, useRef } from "react"
import { PageLayout } from "@/components/page-layout"
import { Rocket } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { faqs } from "@/lib/faq-data"

gsap.registerPlugin(ScrollTrigger)

export default function FAQContent() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      gsap.utils.toArray<HTMLElement>(".faq-reveal").forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", end: "top 65%", scrub: 1 },
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
        <section className="px-6 md:px-12 mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <span className="faq-reveal text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium block">FAQ</span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-[#2d3436] mt-4 leading-tight">
              Common{" "}
              <span className="font-normal text-[#44474a]">questions.</span>
            </h1>
          </div>
        </section>

        {/* FAQ Grid */}
        <section className="px-6 md:px-12 mb-20 md:mb-28">
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-reveal neo-flat p-6 md:p-7 rounded-2xl">
                <h3 className="text-base md:text-lg font-medium text-[#2d3436] mb-2">{faq.q}</h3>
                <p className="text-sm text-[#7d8da1] font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12">
          <div className="faq-reveal max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-light text-[#2d3436] mb-3">
              Still have questions?
            </h2>
            <p className="text-sm text-[#7d8da1] font-light mb-6">
              Join the waitlist and tell us what you need. We read everything.
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
