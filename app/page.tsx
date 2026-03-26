import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import HomeContent from "./home-content"

export const metadata: Metadata = buildMetadata({
  title: "Valymux — One API Across Every AI Provider",
  description:
    "Route AI requests across OpenAI, Anthropic, and more through one stable endpoint. Built in Rust for minimal overhead, with built-in observability and secure credential management.",
  path: "/",
})

export default function Home() {
  return <HomeContent />
}
