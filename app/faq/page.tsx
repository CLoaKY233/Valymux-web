import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd, FAQPageJsonLd } from "@/components/json-ld"
import { faqs } from "@/lib/faq-data"
import FAQContent from "./faq-content"

export const metadata: Metadata = buildMetadata({
  title: "FAQ — Common Questions About Valymux",
  description:
    "Answers to common questions about Valymux: what it is, who it's for, pricing, open source status, MVP timeline, and how to give feedback.",
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
