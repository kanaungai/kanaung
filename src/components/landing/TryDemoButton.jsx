import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import DemoHoverPreview from "./DemoHoverPreview";
import DemoOverlay from "./DemoOverlay";

const PROXIMITY_RADIUS = 120;

export default function TryDemoButton({ label = "Try the Demo" }) {
  const wrapperRef = useRef(null);
  const enterTimer = useRef(null);
  const leaveTimer = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  // "button" = expand from button, "center" = expand from screen center
  const [overlayOrigin, setOverlayOrigin] = useState("button");

  // Listen for navbar trigger
  useEffect(() => {
    const handler = () => {
      setOverlayOrigin("center");
      setOverlayOpen(true);
      setHovered(false);
    };
    window.addEventListener("kanaung:open-demo", handler);
    return () => window.removeEventListener("kanaung:open-demo", handler);
  }, []);

  // Proximity spring: 0 = far, 1 = on button
  const proximity = useSpring(0, { stiffness: 80, damping: 22, mass: 0.6 });
  const orbX = useSpring(0, { stiffness: 60, damping: 20 });
  const orbY = useSpring(0, { stiffness: 60, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = Math.max(rect.width / 2, rect.height / 2) + PROXIMITY_RADIUS;
    const raw = Math.max(0, 1 - dist / maxDist);
    proximity.set(raw);
    const strength = raw * 0.4;
    orbX.set(dx * strength * 0.25);
    orbY.set(dy * strength * 0.15);
  }, [proximity, orbX, orbY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const handleEnter = () => {
    clearTimeout(leaveTimer.current);
    enterTimer.current = setTimeout(() => setHovered(true), 180);
  };
  const handleLeave = () => {
    clearTimeout(enterTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(false), 120);
  };

  const handleClick = () => {
    setHovered(false);
    setOverlayOrigin("button");
    setOverlayOpen(true);
  };

  // Derived animated values
  const boxShadow = useTransform(proximity, [0, 1],
    ["0 2px 16px rgba(0,0,0,0.06)", "0 8px 32px rgba(0,0,0,0.11)"]);
  const borderOpacity = useTransform(proximity, [0, 1], [0.06, 0.14]);
  const orbOpacity    = useTransform(proximity, [0, 1], [1, 1.6]);
  const liftY         = useTransform(proximity, [0, 1], [0, -2]);

  return (
    <>
      <div ref={wrapperRef} className="relative inline-block">
        {/* Hover preview — desktop only */}
        <div className="hidden md:block">
          <DemoHoverPreview visible={hovered && !overlayOpen} />
        </div>

        <motion.button
          onClick={handleClick}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          whileTap={{ scale: 0.97 }}
          style={{ y: liftY, boxShadow }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative inline-flex items-center justify-center overflow-hidden rounded-full h-[50px] px-7 cursor-pointer"
        >
          {/* Base background */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: useTransform(borderOpacity, (v) => `rgba(0,0,0,${v})`),
            }}
          />

          {/* Floating glow orb — breathing + proximity shift */}
          <motion.div
            animate={{ x: ["0%", "60%", "0%"], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                x: orbX,
                y: orbY,
                opacity: orbOpacity,
                background:
                  "radial-gradient(ellipse 90px 40px at 30% 50%, rgba(245,160,100,0.28) 0%, rgba(100,210,200,0.18) 60%, transparent 100%)",
                filter: "blur(14px)",
              }}
            />
          </motion.div>

          {/* Label */}
          <span
            className="relative z-10 text-[14px] font-medium tracking-[-0.015em]"
            style={{ color: "#0A0A0A", fontFamily: "var(--font-inter)" }}
          >
            {label}
          </span>
        </motion.button>
      </div>

      {/* Single demo overlay — serves both hero and navbar */}
      <DemoOverlay
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        originRef={overlayOrigin === "button" ? wrapperRef : null}
      />
    </>
  );
}