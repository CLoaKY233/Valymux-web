import type { Metadata } from "next"
import { Suspense } from "react"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import WaitlistContent from "./waitlist-content"

export const metadata: Metadata = buildMetadata({
  title: "Get Early Access | Valymux Secure LLM Gateway",
  description:
    "Join the Valymux waitlist. Get early access to the fastest, most secure Rust-based AI gateway and help shape the future of LLM observability and routing.",
  path: "/waitlist",
})

export default function WaitlistPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Waitlist", path: "/waitlist" }]} />
      <Suspense fallback={<div className="min-h-screen" />}>
        <WaitlistContent />
      </Suspense>
    </>
  )
}
