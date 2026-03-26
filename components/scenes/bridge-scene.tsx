"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldSkipSceneAnimations } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

export function BridgeScene() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (shouldSkipSceneAnimations()) {
        gsap.set(".bridge-question, .bridge-sub", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".bridge-question",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".bridge-question",
            start: "top 88%",
            end: "top 55%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".bridge-sub",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".bridge-sub",
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section min-h-[70vh] flex items-center justify-center px-6 md:px-12"
    >
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="bridge-question text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#2d3436] opacity-0 text-balance">
          What if you never had to{" "}
          <span className="font-normal text-[#44474a]">read a provider doc again?</span>
        </h2>
        <p className="bridge-sub text-[#7d8da1] font-light text-base md:text-xl mt-8 opacity-0">
          Every model. Every parameter. Right there.
        </p>
      </div>
    </section>
  );
}
