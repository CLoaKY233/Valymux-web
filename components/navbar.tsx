"use client"

import { useEffect, useRef, useState } from "react"
import { Terminal, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: "Product", href: "/product" },
  { label: "Security", href: "/security" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Open Source", href: "/open-source" },
  { label: "FAQ", href: "/faq" },
]

export function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobileMenu = () => setMobileOpen(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
      )

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

  useEffect(() => {
    if (mobileOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = "hidden"

      const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      const drawer = drawerRef.current
      const focusableElements = drawer?.querySelectorAll<HTMLElement>(focusableSelector) || []
      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]

      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 0)
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (!drawer?.contains(document.activeElement)) {
            e.preventDefault()
            firstFocusable?.focus()
            return
          }
          if (e.shiftKey && document.activeElement === firstFocusable) {
            e.preventDefault()
            lastFocusable?.focus()
          } else if (!e.shiftKey && document.activeElement === lastFocusable) {
            e.preventDefault()
            firstFocusable?.focus()
          }
        }
        if (e.key === "Escape") {
          closeMobileMenu()
        }
      }

      document.addEventListener("keydown", handleKeyDown)

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.body.style.overflow = ""
        if (previousFocusRef.current) {
          previousFocusRef.current.focus()
        }
      }
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <nav
        ref={navRef}
        className="w-full h-20 md:h-24 flex items-center justify-between px-6 md:px-12 fixed top-0 z-50 backdrop-blur-md opacity-0"
        style={{ backgroundColor: "rgba(224, 229, 236, 0.7)" }}
      >
        <div className="flex items-center gap-8 lg:gap-14">
          <Link href="/" className="flex items-center gap-3 text-xl md:text-2xl font-light tracking-[0.2em] text-[#2d3436] hover:opacity-80 transition-opacity">
            <Image src="/logo.svg" alt="Valymux Logo" width={32} height={32} className="w-8 h-8 md:w-10 md:h-10" />
            VALYMUX
          </Link>
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-light transition-colors ${
                  pathname === link.href
                    ? "text-[#2d3436] font-normal"
                    : "text-[#7d8da1] hover:text-[#2d3436]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex neo-pressed px-4 py-2 rounded-full items-center gap-3">
            <Terminal className="w-3.5 h-3.5 text-[#7d8da1]" />
            <span className="font-mono text-[11px] text-[#7d8da1]">pre-release</span>
          </div>
          <Link href="/waitlist" className="neo-button px-6 md:px-8 py-2.5 rounded-full text-sm font-medium text-[#44474a]">
            Join Waitlist
          </Link>
          <button
            className="lg:hidden neo-button p-2.5 rounded-full"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-4 h-4 text-[#44474a]" /> : <Menu className="w-4 h-4 text-[#44474a]" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div ref={drawerRef} id="mobile-menu" className="fixed inset-0 z-40 pt-24 bg-[#e0e5ec]/98 backdrop-blur-lg lg:hidden">
          <div className="flex flex-col items-center gap-6 py-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`text-lg font-light transition-colors ${
                  pathname === link.href
                    ? "text-[#2d3436] font-normal"
                    : "text-[#7d8da1] hover:text-[#2d3436]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px w-20 bg-[#a3b1c6]/20 my-2" />
            <a
              href="https://github.com/cloaky233/Valymux"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="text-lg font-light text-[#7d8da1] hover:text-[#2d3436] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </>
  )
}
