import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/json-ld"
import ProductContent from "./product-content"

export const metadata: Metadata = buildMetadata({
  title: "Features & Architecture | Valymux LLM API Gateway",
  description:
    "Discover how Valymux sits between your app and AI providers. Get built-in request tracing, secure credential isolation, and microsecond-latency routing without the Python supply chain risks.",
  path: "/product",
})

export default function ProductPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Product", path: "/product" }]} />
      <SoftwareApplicationJsonLd />
      <ProductContent />
    </>
  )
}
