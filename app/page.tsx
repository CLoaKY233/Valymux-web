import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import HomeContent from "./home-content"

export const metadata: Metadata = buildMetadata({
  title: "The Simple Gateway for AI Providers",
  description:
    "One simple API endpoint. Every model at your fingertips. Zero latency overhead. The intelligent gateway for developers building with AI providers.",
  path: "/",
})

export default function Home() {
  return <HomeContent />
}
