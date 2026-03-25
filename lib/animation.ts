import { ScrollTrigger } from "gsap/ScrollTrigger";

const MOBILE_SCROLL_MEDIA_QUERY = "(max-width: 767px), (pointer: coarse)";
const REDUCED_MOTION_MEDIA_QUERY = "(prefers-reduced-motion: reduce)";

let scrollTriggerConfigured = false;

export function configureScrollTrigger() {
  if (typeof window === "undefined" || scrollTriggerConfigured) {
    return;
  }

  ScrollTrigger.config({ ignoreMobileResize: true });
  scrollTriggerConfigured = true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(REDUCED_MOTION_MEDIA_QUERY).matches;
}

export function isMobileScrollDevice() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(MOBILE_SCROLL_MEDIA_QUERY).matches;
}

export function shouldSkipSceneAnimations() {
  return prefersReducedMotion() || isMobileScrollDevice();
}
