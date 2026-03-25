import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import SecurityContent from "./security-content"

export const metadata: Metadata = buildMetadata({
  title: "Security & Trust — How Valymux Protects Your API Keys",
  description:
    "Valymux encrypts provider keys at rest, hashes virtual API keys, validates every request, and redacts secrets from logs. See how we earn developer trust.",
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
