import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { INITIAL_CONTEXT, INITIAL_INVENTORY, INITIAL_SHOWROOM, INITIAL_KB } from "../../data/showroomData";
import ControlLayer from "../demo/ControlLayer";
import ConversationPanel from "../demo/ConversationPanel";

// Phases: "idle" | "expanding" | "open" | "collapsing"
export default function DemoOverlay({ open, onClose, originRef }) {
  const [context, setContext] = useState(INITIAL_CONTEXT);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [showroom, setShowroom] = useState(INITIAL_SHOWROOM);
  const [kb, setKb] = useState(INITIAL_KB);
  const [contentVisible, setContentVisible] = useState(false);

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
              borderRadius: 16,
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
              top: "3vh",
              left: "3vw",
              width: "94vw",
              height: "94vh",
              background: "hsl(220 22% 97%)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.12)",
              originX: 0.5,
              originY: 0.5,
            }}
          >
            {/* Top bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: contentVisible ? 1 : 0 }}
              transition={{ duration: 0.22 }}
              className="flex items-center gap-4 px-6 h-[56px] border-b flex-shrink-0"
              style={{ background: "hsl(0 0% 100%)", borderColor: "hsl(220 16% 88%)" }}
            >
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
              <div className="w-px h-3.5 bg-foreground/10" />
              <span className="font-sora font-semibold text-[14px] tracking-[-0.01em] text-foreground">
                kanaung<span className="text-primary font-bold">.</span>
              </span>
              <span className="text-[12px] text-muted-foreground">Product Demo</span>
              <div className="ml-auto flex items-center gap-3">
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide"
                  style={{
                    background: "hsl(142 55% 95%)",
                    color: "hsl(142 55% 33%)",
                    border: "1px solid hsl(142 45% 86%)",
                  }}
                >
                  ● LIVE DEMO
                </span>
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-foreground/6 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </motion.div>

            {/* Two-panel body */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: contentVisible ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex flex-1 overflow-hidden"
            >
              {/* Left: Control Layer */}
              <div
                className="w-[38%] flex-shrink-0 border-r flex flex-col overflow-hidden"
                style={{ borderColor: "hsl(220 16% 88%)", background: "hsl(220 20% 98%)" }}
              >
                <ControlLayer
                  context={context} setContext={setContext}
                  inventory={inventory} setInventory={setInventory}
                  showroom={showroom} setShowroom={setShowroom}
                  kb={kb} setKb={setKb}
                />
              </div>

              {/* Right: Conversation */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <ConversationPanel context={context} inventory={inventory} showroom={showroom} kb={kb} />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
