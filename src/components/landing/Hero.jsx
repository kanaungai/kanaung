import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LiveCallPanel from "./LiveCallPanel";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import TryDemoButton from "./TryDemoButton";

// Ambient moving orbs — pure CSS, no heavy libs
function AmbientOrb({ style, delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.06, 1] }}
      transition={{ duration: 8 + delay, ease: "easeInOut", repeat: Infinity, delay }}
    />
  );
}

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 overflow-hidden">

      {/* ── Dark cinematic base ── */}
      <div className="absolute inset-0" style={{ background: "hsl(222 28% 4%)" }} />

      {/* ── Primary bloom — warm focal glow behind product panel ── */}
      <AmbientOrb
        delay={0}
        style={{
          top: "10%",
          right: "-5%",
          width: 800,
          height: 700,
          background: "radial-gradient(ellipse at 50% 50%, hsl(352 60% 30% / 0.18) 0%, hsl(28 50% 20% / 0.09) 45%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Secondary bloom — cool deep left ── */}
      <AmbientOrb
        delay={3}
        style={{
          top: "-15%",
          left: "-10%",
          width: 700,
          height: 600,
          background: "radial-gradient(ellipse at 50% 50%, hsl(220 60% 18% / 0.35) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />

      {/* ── Bottom vignette ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, hsl(222 28% 4%) 0%, transparent 100%)" }}
      />

      {/* ── Subtle noise texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Fine grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,0.025) 79px, rgba(255,255,255,0.025) 80px),
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.018) 79px, rgba(255,255,255,0.018) 80px)
          `,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 85%, transparent 100%)",
        }}
      />

      {/* ── Top separator line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)" }}
      />

      <div className="relative max-w-[1200px] mx-auto px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 xl:gap-20 items-center">

          {/* ── Left: copy block ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center self-start gap-2 px-3 py-1.5 rounded-full mb-10"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "hsl(142 55% 48%)", boxShadow: "0 0 6px hsl(142 55% 48% / 0.7)" }}
              />
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase font-inter" style={{ color: "rgba(255,255,255,0.45)" }}>
                {tx.hero_eyebrow}
              </span>
            </motion.div>

            {/* Headline — poster scale */}
            <h1
              className="font-sora font-extrabold tracking-[-0.055em] leading-[0.93] mb-8"
              style={{
                fontSize: "clamp(44px, 5.5vw, 76px)",
                color: "rgba(255,255,255,0.95)",
                letterSpacing: "-0.055em",
              }}
            >
              <span style={{ color: "rgba(255,255,255,0.95)" }}>{tx.hero_h1_1}</span>
              <br />
              <span style={{ color: "rgba(255,255,255,0.95)" }}>{tx.hero_h1_2}</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.30) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {tx.hero_h1_3}
              </span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="text-[15px] leading-[1.85] max-w-[380px] font-inter tracking-[0.003em] mb-10"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              {tx.hero_sub}{" "}
              <span style={{ color: "rgba(255,255,255,0.55)" }} className="font-medium">{tx.hero_sub_bold}</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={openCalendly}
                className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold px-6 h-[46px] rounded-lg transition-all duration-200 tracking-[-0.01em] font-sora"
                style={{
                  background: "rgba(255,255,255,0.96)",
                  color: "hsl(222 28% 6%)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.2), 0 4px 20px rgba(255,255,255,0.06)",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.88)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.96)"}
              >
                {tx.hero_cta1}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <TryDemoButton label={tx.hero_cta2} dark={true} />
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="mt-16 pt-8 flex items-center gap-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {[
                { value: "LLM", label: tx.stat1_label },
                { value: "24 / 7", label: tx.stat2_label },
                { value: lang === "en" ? "Burmese" : "မြန်မာ", label: tx.stat3_label },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-sora text-[20px] font-bold tracking-[-0.04em]" style={{ color: "rgba(255,255,255,0.88)" }}>
                    {stat.value}
                  </span>
                  <span className="text-[10.5px] font-medium tracking-[0.04em] font-inter" style={{ color: "rgba(255,255,255,0.28)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: product visual ── */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            {/* Outer glow frame */}
            <div
              className="absolute pointer-events-none"
              style={{
                inset: "-40px -30px",
                background: "radial-gradient(ellipse at 50% 45%, hsl(352 60% 36% / 0.12) 0%, transparent 65%)",
                filter: "blur(40px)",
              }}
            />
            <LiveCallPanel />
          </motion.div>

        </div>
      </div>
    </section>
  );
}