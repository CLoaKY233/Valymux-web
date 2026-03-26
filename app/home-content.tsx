"use client"

import dynamic from "next/dynamic"
import { HeroScene } from "@/components/scenes/hero-scene"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

function ScenePlaceholder() {
  return <div className="scene-section min-h-screen" aria-hidden="true" />
}

const ChaosScene = dynamic(() => import("@/components/scenes/chaos-scene").then(m => ({ default: m.ChaosScene })), { ssr: false, loading: () => <ScenePlaceholder /> })
const BridgeScene = dynamic(() => import("@/components/scenes/bridge-scene").then(m => ({ default: m.BridgeScene })), { ssr: false, loading: () => <ScenePlaceholder /> })
const CompressionScene = dynamic(() => import("@/components/scenes/compression-scene").then(m => ({ default: m.CompressionScene })), { ssr: false, loading: () => <ScenePlaceholder /> })
const TransformationScene = dynamic(() => import("@/components/scenes/transformation-scene").then(m => ({ default: m.TransformationScene })), { ssr: false, loading: () => <ScenePlaceholder /> })
const PillarsScene = dynamic(() => import("@/components/scenes/pillars-scene").then(m => ({ default: m.PillarsScene })), { ssr: false, loading: () => <ScenePlaceholder /> })
const DeveloperScene = dynamic(() => import("@/components/scenes/developer-scene").then(m => ({ default: m.DeveloperScene })), { ssr: false, loading: () => <ScenePlaceholder /> })
const TrustScene = dynamic(() => import("@/components/scenes/trust-scene").then(m => ({ default: m.TrustScene })), { ssr: false, loading: () => <ScenePlaceholder /> })
const CTAScene = dynamic(() => import("@/components/scenes/cta-scene").then(m => ({ default: m.CTAScene })), { ssr: false, loading: () => <ScenePlaceholder /> })

export default function HomeContent() {
  return (
    <>
      <Navbar />
      <main>
        <HeroScene />
        <ChaosScene />
        <BridgeScene />
        <CompressionScene />
        <TransformationScene />
        <PillarsScene />
        <DeveloperScene />
        <TrustScene />
        <CTAScene />
      </main>
      <Footer />
    </>
  )
}
