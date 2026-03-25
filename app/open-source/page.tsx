import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import OpenSourceContent from "./open-source-content"

export const metadata: Metadata = buildMetadata({
  title: "Open Source AI Gateway — Inspect, Trust, Contribute",
  description:
    "Valymux is fully open source under AGPL-3.0. Explore the Rust codebase, follow development in public, and contribute to the AI gateway built for transparency.",
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
