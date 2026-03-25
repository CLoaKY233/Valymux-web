import type { Metadata } from "next"
import { Suspense } from "react"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import WaitlistContent from "./waitlist-content"

export const metadata: Metadata = buildMetadata({
  title: "Join the Waitlist — Get Early Access to Valymux",
  description:
    "Sign up for early access to Valymux. Be first to try the AI gateway, share feedback that shapes the MVP, and get updates as we build in public.",
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
