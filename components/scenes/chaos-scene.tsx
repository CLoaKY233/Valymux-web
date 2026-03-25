"use client";

import { useEffect, useRef } from "react";
import {
  Zap,
  Wrench,
  KeyRound,
  Lock,
  BarChart3,
  Shield,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  {
    label: "Different streaming formats",
    icon: Zap,
    color: "text-orange-400/50",
  },
  {
    label: "Inconsistent tool schemas",
    icon: Wrench,
    color: "text-slate-500/50",
  },
  {
    label: "Secret sprawl across teams",
    icon: KeyRound,
    color: "text-amber-400/50",
  },
  { label: "Provider lock-in risk", icon: Lock, color: "text-red-400/50" },
  { label: "No unified logging", icon: BarChart3, color: "text-blue-400/50" },
  { label: "Mixed auth patterns", icon: Shield, color: "text-emerald-400/50" },
  {
    label: "Version mismatches",
    icon: AlertTriangle,
    color: "text-yellow-400/50",
  },
  { label: "Cost blind spots", icon: DollarSign, color: "text-green-400/50" },
];

export function ChaosScene() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      tl.fromTo(
        ".chaos-heading",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.12 },
        0,
      );

      painPoints.forEach((_, i) => {
        const isLeft = i % 2 === 0;

        tl.fromTo(
          `.chaos-card-${i}`,
          {
            x: isLeft ? -600 : 600,
            y: gsap.utils.random(-100, 100),
            rotation: gsap.utils.random(-25, 25),
            opacity: 0,
            scale: 0.6,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: "back.out(1.5)",
          },
          0.1 + i * 0.12,
        );
      });

      tl.to(
        ".chaos-card",
        {
          x: "random(-8, 8)",
          y: "random(-6, 6)",
          rotation: "random(-3, 3)",
          duration: 0.1,
          stagger: { each: 0.02, from: "random" },
        },
        1.05,
      );

      tl.fromTo(
        ".chaos-summary",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.08 },
        1.20,
      );

      tl.fromTo(
        ".chaos-glow",
        { opacity: 0, scale: 0.6 },
        { opacity: 0.2, scale: 1.2, duration: 0.15 },
        0.5,
      );

      tl.to(
        ".chaos-all",
        {
          opacity: 0,
          y: -30,
          duration: 0.15,
        },
        1.35,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scene-section min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      <div
        className="chaos-glow absolute pointer-events-none opacity-0"
        style={{
          width: 800,
          height: 600,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse, rgba(255,87,11,0.1) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />

      <div className="chaos-all relative z-10 max-w-4xl mx-auto px-6 w-full">
        <div className="chaos-heading text-center mb-12 md:mb-14 opacity-0">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#ff570a]/50 font-medium">
            The Problem
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2d3436] mt-4">
            Chaos under{" "}
            <span className="font-normal text-[#44474a]">the hood.</span>
          </h2>
          <p className="text-[#7d8da1] font-light text-base md:text-lg mt-4 max-w-xl mx-auto">
            Every provider has its own formats, its own auth, its own quirks.
            Your team writes glue code instead of building product.
          </p>
        </div>

        <div className="chaos-cards-container grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
          {painPoints.map((point, i) => {
            const Icon = point.icon;
            return (
              <div
                key={point.label}
                className={`chaos-card chaos-card-${i} neo-flat p-4 md:p-5 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 opacity-0`}
              >
                <div className="neo-pressed w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${point.color}`} />
                </div>
                <span className="text-xs md:text-sm font-light text-[#44474a]">
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="chaos-summary flex justify-center mt-10 opacity-0">
          <div className="neo-pressed px-6 py-3 rounded-full">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#7d8da1] font-medium">
              8+ integration headaches per provider
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
