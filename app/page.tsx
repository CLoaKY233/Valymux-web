import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import HomeContent from "./home-content"

export const metadata: Metadata = buildMetadata({
  title: "Valymux | The Secure, Rust-Native LLM Gateway",
  description:
    "Route requests across any AI provider with a single OpenAI-compatible API. Valymux is an open-source, Rust-native LLM gateway built for speed, security, and full observability.",
  path: "/",
})

export default function Home() {
  return <HomeContent />
}
