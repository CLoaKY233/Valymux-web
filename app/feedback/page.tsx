import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import FeedbackContent from "./feedback-content"

export const metadata: Metadata = buildMetadata({
  title: "Share Feedback | Shape the Valymux Rust LLM Gateway",
  description:
    "Help us build the ultimate open-source LLM gateway. Share your feedback on Valymux's routing capabilities, observability metrics, and security features.",
  path: "/feedback",
})

export default function FeedbackPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Feedback", path: "/feedback" }]} />
      <FeedbackContent />
    </>
  )
}
