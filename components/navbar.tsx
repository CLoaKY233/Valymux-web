"use client"

import { useEffect, useRef } from "react"
import { Terminal } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
      )

      // Subtle background change on scroll
      ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          if (navRef.current) {
            const progress = Math.min(self.progress * 20, 1)
            navRef.current.style.backgroundColor = `rgba(224, 229, 236, ${0.7 + progress * 0.25})`
          }
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className="w-full h-20 md:h-24 flex items-center justify-between px-6 md:px-12 fixed top-0 z-50 backdrop-blur-md opacity-0"
      style={{ backgroundColor: "rgba(224, 229, 236, 0.7)" }}
    >
      <div className="flex items-center gap-8 md:gap-16">
        <span className="text-xl md:text-2xl font-light tracking-[0.2em] text-[#2d3436]">VALYGATE</span>
        <div className="hidden md:flex gap-10 items-center">
          <a className="text-sm font-light text-[#7d8da1] hover:text-[#2d3436] transition-colors" href="#">
            Documentation
          </a>
          <a className="text-sm font-light text-[#7d8da1] hover:text-[#2d3436] transition-colors" href="#">
            GitHub
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="neo-pressed px-4 py-2 rounded-full flex items-center gap-3">
          <Terminal className="w-3.5 h-3.5 text-[#7d8da1]" />
          <span className="font-mono text-[11px] text-[#7d8da1]">pre-release</span>
        </div>
        <button className="neo-button px-6 md:px-8 py-2.5 rounded-full text-sm font-medium text-[#44474a]">
          Join Waitlist
        </button>
      </div>
    </nav>
  )
}
