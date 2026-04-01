import { useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Returns { ref, inView } using framer-motion's useInView.
 * Designed for Apple/Linear-style scroll reveals:
 *  - triggers once, 80px before entering viewport
 *  - very soft, no demo-ish bounce
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: options.margin ?? "-80px",
    ...options,
  });
  return { ref, inView };
}

/**
 * Shared transition presets — all slow and soft.
 */
export const REVEAL = {
  // Primary: section headers and large copy
  primary: {
    duration: 0.9,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  // Cards / sub-elements: slightly faster
  card: {
    duration: 0.75,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  // Fade-only (decorators, dividers)
  fade: {
    duration: 1.1,
    ease: "easeOut",
  },
  // Stagger offset between sibling elements
  stagger: 0.1,
};