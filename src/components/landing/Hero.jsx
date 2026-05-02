import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LiveCallPanel from "./LiveCallPanel";
import { openCalendly } from "./CalendlyPopup";
import TryDemoButton from "./TryDemoButton";

const PROOF_PILLS = [
  "Burmese-first",
  "Uses your business data",
  "Messenger + Viber + Web",
  "24/7 replies",
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 88, paddingBottom: 64 }}
    >
      {/* Base warm off-white */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "hsl(36 18% 97%)" }} />

      {/* Faint grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      {/* Faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(30,28,24,0.045) 79px,rgba(30,28,24,0.045) 80px),repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(30,28,24,0.032) 79px,rgba(30,28,24,0.032) 80px)`,
          maskImage: "linear-gradient(to bottom,transparent 0%,black 10%,black 88%,transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom,transparent 0%,black 10%,black 88%,transparent 100%)",
        }}
      />

      {/* Soft left atmosphere */}
      <div className="absolute pointer-events-none" style={{ top: "-5%", left: "-10%", width: "60%", height: "110%", background: "radial-gradient(ellipse at 40% 46%, hsl(36 28% 93% / 0.7) 0%, transparent 58%)" }} />

      {/* Right ruby tint behind demo */}
      <div className="absolute pointer-events-none" style={{ top: "-10%", right: "-8%", width: "60%", height: "120%", background: "radial-gradient(ellipse at 65% 50%, hsl(352 38% 94% / 0.5) 0%, transparent 52%)" }} />

      <div className="relative w-full max-w-[1280px] mx-auto px-8 xl:px-12">
        <div
          className="grid items-center gap-10 xl:gap-14"
          style={{ gridTemplateColumns: "44% 1fr" }}
        >

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="inline-flex items-center self-start gap-1.5 px-2.5 py-1 rounded-full mb-6"
              style={{ background: "rgba(20,18,14,0.04)", border: "1px solid rgba(20,18,14,0.08)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "hsl(352 62% 44%)", boxShadow: "0 0 5px hsl(352 62% 44% / 0.5)" }}
              />
              <span className="text-[9.5px] font-semibold tracking-[0.13em] uppercase font-inter" style={{ color: "hsl(220 16% 32%)" }}>
                AI Customer Service · Myanmar
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="font-sora font-extrabold text-foreground"
              style={{ fontSize: "clamp(36px, 3.8vw, 54px)", lineHeight: 1.02, letterSpacing: "-0.046em" }}
            >
              The AI customer service agent built for Myanmar.
            </h1>

            {/* Subheading */}
            <p
              className="font-inter font-normal mt-6"
              style={{ fontSize: 14.5, lineHeight: 1.82, color: "hsl(220 12% 44%)", maxWidth: 380, letterSpacing: "0.002em" }}
            >
              Kanaung helps Myanmar businesses answer customers across web, Messenger, and Viber using their own product data, pricing, and policies.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openCalendly}
                className="inline-flex items-center justify-center gap-2 font-inter font-semibold tracking-[-0.01em] transition-all duration-200"
                style={{
                  fontSize: 13.5, height: 44, paddingLeft: 22, paddingRight: 22,
                  borderRadius: 8, background: "hsl(220 25% 8%)", color: "white",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 4px 12px -2px rgba(0,0,0,0.09)",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "hsl(220 25% 5%)"}
                onMouseLeave={e => e.currentTarget.style.background = "hsl(220 25% 8%)"}
              >
                Book a Demo
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
              <TryDemoButton label="See it live" />
            </div>

            {/* Proof pills — 2×2 compact grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.44 }}
              className="mt-8 grid grid-cols-2 gap-2"
              style={{ maxWidth: 360 }}
            >
              {PROOF_PILLS.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 font-inter font-medium"
                  style={{
                    fontSize: 11, padding: "6px 11px", borderRadius: 99,
                    background: "rgba(20,18,14,0.035)", border: "1px solid rgba(20,18,14,0.07)",
                    color: "hsl(220 14% 38%)", letterSpacing: "-0.005em",
                  }}
                >
                  <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: "hsl(352 58% 46%)" }} />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: demo ── */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.82, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            style={{ maxWidth: 660 }}
          >
            <DecorativePanels />
            {/* Constrain the panel width */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <LiveCallPanel compact />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function DecorativePanels() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Knowledge base — top-left, peeking */}
      <div
        className="absolute hidden xl:block"
        style={{
          top: 18, left: -32, width: 134, opacity: 0.25,
          background: "hsl(0 0% 100%)", border: "1px solid hsl(220 14% 90%)",
          borderRadius: 10, padding: "8px 10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <p style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(220 12% 52%)", marginBottom: 5 }}>Knowledge Base</p>
        {["Product Catalog", "Pricing Sheet", "Delivery Policy", "FAQs"].map((r) => (
          <div key={r} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3.5 }}>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: "hsl(142 48% 50%)", flexShrink: 0 }} />
            <span style={{ fontSize: 8, color: "hsl(220 14% 40%)", letterSpacing: "-0.005em" }}>{r}</span>
          </div>
        ))}
      </div>

      {/* Analytics — bottom-right, peeking */}
      <div
        className="absolute hidden xl:block"
        style={{
          bottom: 28, right: -26, width: 116, opacity: 0.22,
          background: "hsl(0 0% 100%)", border: "1px solid hsl(220 14% 90%)",
          borderRadius: 10, padding: "8px 10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <p style={{ fontSize: 6.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(220 12% 52%)", marginBottom: 5 }}>This Week</p>
        {[{ l: "AI resolved", v: "94%" }, { l: "Avg reply", v: "0.8s" }, { l: "Escalated", v: "6%" }].map((r) => (
          <div key={r.l} style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 7.5, color: "hsl(220 12% 50%)" }}>{r.l}</span>
            <span style={{ fontSize: 7.5, fontWeight: 600, color: "hsl(220 18% 26%)" }}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}