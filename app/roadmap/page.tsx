import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import RoadmapContent from "./roadmap-content"

export const metadata: Metadata = buildMetadata({
  title: "Roadmap | Valymux Open Source AI Gateway",
  description:
    "Explore the Valymux development roadmap. See upcoming features for our Rust-native LLM proxy, including rate limiting, team workflows, and new provider adapters.",
  path: "/roadmap",
})

export default function RoadmapPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Roadmap", path: "/roadmap" }]} />
      <RoadmapContent />
    </>
  )
}
