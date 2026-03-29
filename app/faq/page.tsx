import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/json-ld"
import { faqs } from "@/lib/faq-data"
import FAQContent from "./faq-content"

export const metadata: Metadata = buildMetadata({
  title: "FAQ | Valymux LLM Proxy & AI Gateway Questions",
  description:
    "Answers to common questions about Valymux: proxy overhead latency, self-hosting options, OpenAI compatibility, and why we built a secure AI gateway in Rust.",
  path: "/faq",
})

export default function FAQPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "FAQ", path: "/faq" }]} />
      <FAQPageJsonLd faqs={faqs} />
      <FAQContent />
    </>
  )
}
