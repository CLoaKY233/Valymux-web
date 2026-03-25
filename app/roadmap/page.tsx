import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/json-ld"
import RoadmapContent from "./roadmap-content"

export const metadata: Metadata = buildMetadata({
  title: "Roadmap — What We're Building Next",
  description:
    "See what Valymux is building now and what's coming next. MVP targeting end of April 2026 — rate limiting, team workflows, more provider adapters, and beyond.",
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
