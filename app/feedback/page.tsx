import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import FeedbackContent from "./feedback-content"

export const metadata: Metadata = buildMetadata({
  title: "Share Feedback — Help Shape Valymux",
  description:
    "Tell us what frustrates you about working with multiple AI providers. Your feedback directly shapes what gets built next in Valymux.",
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
