"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-32 pb-16 md:pb-24 min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  )
}
