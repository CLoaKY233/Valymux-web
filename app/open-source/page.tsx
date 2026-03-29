import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import OpenSourceContent from "./open-source-content"

export const metadata: Metadata = buildMetadata({
  title: "Open Source Rust LLM Gateway — Self-Host & Inspect | Valymux",
  description:
    "Valymux is a fully open-source (AGPL) LLM proxy built in Rust. Self-host for complete data privacy, audit our memory-safe codebase, and avoid vendor lock-in forever.",
  path: "/open-source",
})

export default function OpenSourcePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Open Source", path: "/open-source" }]} />
      <OpenSourceContent />
    </>
  )
}
