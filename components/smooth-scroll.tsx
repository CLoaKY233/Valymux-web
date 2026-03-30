"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const snapRef = useRef<Snap | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Connect GSAP ticker to Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initialize Snap after a short delay to ensure scenes are mounted
    const snapTimeout = setTimeout(() => {
      const sceneElements = document.querySelectorAll(".scene-section");
      
      if (sceneElements.length > 0) {
        const snap = new Snap(lenis, {
          type: "proximity",
          lerp: 0.1,
          duration: 0.6,
          debounce: 150,
          distanceThreshold: "15%",
        });

        snapRef.current = snap;

        // Add each scene as a snap target
        sceneElements.forEach((el) => {
          snap.addElement(el as HTMLElement, { 
            align: ["start"],
          });
        });
      }
    }, 500);

    return () => {
      clearTimeout(snapTimeout);
      snapRef.current?.destroy();
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
