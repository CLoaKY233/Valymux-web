import type { Metadata } from "next"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/json-ld"
import ProductContent from "./product-content"

export const metadata: Metadata = buildMetadata({
  title: "How Valymux Works — AI Gateway Architecture",
  description:
    "Learn how Valymux standardizes AI provider chaos into one stable interface. One API, intelligent routing, built-in observability, and secure credential management.",
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
