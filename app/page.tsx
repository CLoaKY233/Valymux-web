"use client"

import { HeroScene } from "@/components/scenes/hero-scene"
import { ChaosScene } from "@/components/scenes/chaos-scene"
import { BridgeScene } from "@/components/scenes/bridge-scene"
import { CompressionScene } from "@/components/scenes/compression-scene"
import { TransformationScene } from "@/components/scenes/transformation-scene"
import { PillarsScene } from "@/components/scenes/pillars-scene"
import { DeveloperScene } from "@/components/scenes/developer-scene"
import { TrustScene } from "@/components/scenes/trust-scene"
import { CTAScene } from "@/components/scenes/cta-scene"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
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
