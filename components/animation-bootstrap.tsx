"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { configureScrollTrigger } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

export function AnimationBootstrap() {
  useEffect(() => {
    configureScrollTrigger();
  }, []);

  return null;
}
