import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import SecurityContent from "./security-content"

export const metadata: Metadata = buildMetadata({
  title: "Security First | Supply-Chain Resistant LLM Gateway | Valymux",
  description:
    "Protect your AI infrastructure. Valymux ensures security with Rust memory safety, encrypted API keys at rest, virtual keys, and zero dynamic code execution risks.",
  path: "/security",
})

export default function SecurityPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Security", path: "/security" }]} />
      <SecurityContent />
    </>
  )
}
