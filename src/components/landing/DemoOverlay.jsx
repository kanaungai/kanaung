import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DemoHeader, DemoWorkspaceBody, useShowroomDemoState } from "../demo/DemoWorkspace";

// Phases: "idle" | "expanding" | "open" | "collapsing"
export default function DemoOverlay({ open, onClose, originRef }) {
  const demoState = useShowroomDemoState();
  const [contentVisible, setContentVisible] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Slight delay before showing inner content for cleaner expansion feel
      const t = setTimeout(() => setContentVisible(true), 380);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      setContentVisible(false);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Get button origin rect for the expanding-from animation.
  // null originRef = navbar trigger → expand from center (x:0, y:0 relative to panel center)
  const originRect = originRef?.current?.getBoundingClientRect?.() ?? null;
  const originCx = originRect ? originRect.left + originRect.width / 2 - window.innerWidth / 2 : 0;
  const originCy = originRect ? originRect.top + originRect.height / 2 - window.innerHeight / 2 : 0;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[90]"
            style={{
              background: "rgba(10,12,18,0.55)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
            onClick={onClose}
          />

          {/* Expanding panel */}
          <motion.div
            key="panel"
            initial={{
              opacity: 0,
              scale: originRect ? 0.12 : 0.94,
              x: originCx,
              y: originCy,
              borderRadius: originRect ? 50 : 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              borderRadius: isMobile ? 0 : 16,
            }}
            exit={{
              opacity: 0,
              scale: originRect ? 0.1 : 0.94,
              x: originCx,
              y: originCy,
              borderRadius: originRect ? 50 : 20,
            }}
            transition={{
              duration: 0.52,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed z-[100] overflow-hidden flex flex-col"
            style={{
              top: isMobile ? 0 : "3vh",
              left: isMobile ? 0 : "3vw",
              width: isMobile ? "100vw" : "94vw",
              height: isMobile ? "100dvh" : "94vh",
              background: "hsl(220 22% 97%)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.12)",
              originX: 0.5,
              originY: 0.5,
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: contentVisible ? 1 : 0 }}
              transition={{ duration: 0.22 }}
            >
              <DemoHeader onBack={onClose} showClose />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: contentVisible ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex flex-1 overflow-hidden"
            >
              <DemoWorkspaceBody demoState={demoState} />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
