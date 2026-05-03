import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import HeroSystemVisual from "./HeroSystemVisual";
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
      className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-20 lg:min-h-screen lg:flex lg:items-center"
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

      <div className="relative w-full max-w-[1280px] mx-auto px-5 sm:px-8 xl:px-10">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(300px,0.82fr)_minmax(620px,1.18fr)] lg:gap-5 xl:gap-8">

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
              style={{ fontSize: "clamp(34px, 3.8vw, 54px)", lineHeight: 1.04, letterSpacing: 0 }}
            >
              The AI customer service agent built for Myanmar.
            </h1>

            {/* Subheading */}
            <p
              className="font-inter font-normal mt-6"
              style={{ fontSize: 14.5, lineHeight: 1.82, color: "hsl(220 12% 44%)", maxWidth: 420, letterSpacing: "0.002em" }}
            >
              Kanaung helps Myanmar businesses answer customers across web, Messenger, and Viber using their own product data, pricing, and policies.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openCalendly}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 font-inter font-semibold tracking-[-0.01em] transition-all duration-200"
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
              className="mt-8 grid grid-cols-1 min-[380px]:grid-cols-2 gap-2"
              style={{ maxWidth: 380 }}
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

          {/* ── RIGHT: live AI system visual ── */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.82, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:justify-self-end lg:translate-x-3 xl:translate-x-4 2xl:translate-x-0"
          >
            <HeroSystemVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
