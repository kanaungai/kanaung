import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DemoHoverPreview from "./DemoHoverPreview";

export default function TryDemoButton({ label = "Try the Demo" }) {
  const [hovered, setHovered] = useState(false);
  const enterTimer = useRef(null);
  const leaveTimer = useRef(null);

  const handleEnter = () => {
    clearTimeout(leaveTimer.current);
    enterTimer.current = setTimeout(() => setHovered(true), 180);
  };

  const handleLeave = () => {
    clearTimeout(enterTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(false), 120);
  };

  return (
    <div className="relative inline-block">
      {/* Preview — desktop only */}
      <div className="hidden md:block">
        <DemoHoverPreview visible={hovered} />
      </div>

      <Link to="/demo">
        <motion.button
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.10)" }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative inline-flex items-center justify-center overflow-hidden rounded-full h-[50px] px-7"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          }}
        >
          {/* Floating glow orb */}
          <motion.div
            animate={{ x: ["0%", "60%", "0%"], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90px 40px at 30% 50%, rgba(245,160,100,0.28) 0%, rgba(100,210,200,0.18) 60%, transparent 100%)",
              filter: "blur(14px)",
            }}
          />
          <span
            className="relative z-10 text-[14px] font-medium tracking-[-0.015em]"
            style={{ color: "#0A0A0A", fontFamily: "var(--font-inter)" }}
          >
            {label}
          </span>
        </motion.button>
      </Link>
    </div>
  );
}