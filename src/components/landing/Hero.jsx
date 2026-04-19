import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import TryDemoButton from "./TryDemoButton";

// Subtle noise/grain overlay using canvas — drawn once, static texture
function GrainOverlay() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const imageData = ctx.createImageData(W, H);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const val = Math.random() * 255;
      imageData.data[i] = val;
      imageData.data[i + 1] = val;
      imageData.data[i + 2] = val;
      imageData.data[i + 3] = Math.random() * 18;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={512}
      height={512}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity: 0.55,
        mixBlendMode: "overlay",
        backgroundRepeat: "repeat",
        zIndex: 2,
      }}
    />
  );
}

// Faint radial waveform rings — abstract signal energy
function SignalRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
      {[280, 400, 540, 700, 880].map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: r,
            height: r,
            border: `1px solid rgba(255, 220, 160, ${0.032 - i * 0.005})`,
          }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.008, 1] }}
          transition={{
            duration: 6 + i * 1.4,
            repeat: Infinity,
            delay: i * 0.9,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// The eclipse: warm halo + dark core disc
function Eclipse() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>

      {/* Outermost wide atmospheric bloom */}
      <motion.div
        className="absolute rounded-full"
        animate={{ opacity: [0.55, 0.72, 0.55], scale: [1, 1.018, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 900,
          height: 900,
          background: "radial-gradient(ellipse, hsl(38 80% 62% / 0.09) 0%, hsl(32 70% 52% / 0.06) 30%, transparent 68%)",
          filter: "blur(60px)",
        }}
      />

      {/* Middle glow ring — the main halo body */}
      <motion.div
        className="absolute rounded-full"
        animate={{ opacity: [0.7, 0.9, 0.7], scale: [1, 1.012, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        style={{
          width: 560,
          height: 560,
          background: "radial-gradient(ellipse, hsl(40 90% 70% / 0.28) 0%, hsl(35 80% 58% / 0.18) 28%, hsl(30 60% 45% / 0.06) 55%, transparent 72%)",
          filter: "blur(32px)",
        }}
      />

      {/* Inner bright corona ring */}
      <motion.div
        className="absolute rounded-full"
        animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.006, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          width: 340,
          height: 340,
          background: "radial-gradient(ellipse, hsl(45 100% 88% / 0.22) 0%, hsl(38 90% 72% / 0.38) 30%, hsl(32 80% 56% / 0.22) 55%, transparent 72%)",
          filter: "blur(16px)",
        }}
      />

      {/* Bright limb highlight — thin hot ring at edge of core */}
      <div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          background: "transparent",
          boxShadow: "0 0 40px 12px hsl(42 100% 82% / 0.18), 0 0 80px 30px hsl(36 90% 64% / 0.10)",
        }}
      />

      {/* Dark eclipse core — the moon disc blocking the light */}
      <motion.div
        className="absolute rounded-full"
        animate={{ opacity: [0.96, 1, 0.96] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 168,
          height: 168,
          background: "radial-gradient(ellipse at 40% 38%, hsl(225 22% 7%) 55%, hsl(222 20% 5%) 100%)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "hsl(222 24% 5%)" }}>

      {/* Deep atmosphere gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 120% 80% at 50% 50%, hsl(225 22% 9%) 0%, hsl(222 24% 4%) 60%, hsl(222 26% 3%) 100%)",
          zIndex: 0,
        }}
      />

      {/* Grain texture */}
      <GrainOverlay />

      {/* Signal rings */}
      <SignalRings />

      {/* Eclipse */}
      <Eclipse />

      {/* Very subtle vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, hsl(222 26% 3% / 0.7) 100%)",
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-8 w-full pt-28 pb-24" style={{ zIndex: 4 }}>

        <div className="flex flex-col items-center text-center">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-12"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(142 55% 50%)" }} />
            <span className="text-[10.5px] font-semibold tracking-[0.14em] uppercase font-inter" style={{ color: "rgba(255,255,255,0.44)" }}>
              {tx.hero_eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sora font-extrabold tracking-[-0.055em] leading-[0.95] text-white"
            style={{ fontSize: "clamp(44px, 7.5vw, 96px)", maxWidth: 900 }}
          >
            {tx.hero_h1_1}<br />
            {tx.hero_h1_2}<br />
            <span style={{ color: "rgba(255,255,255,0.42)" }}>{tx.hero_h1_3}</span>
          </motion.h1>

          {/* Supporting paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.38, ease: "easeOut" }}
            className="mt-8 text-[15px] md:text-[16px] font-inter leading-[1.8] max-w-[480px]"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            {tx.hero_sub}{" "}
            <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>{tx.hero_sub_bold}</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.52, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          >
            {/* Primary CTA */}
            <button
              onClick={openCalendly}
              className="group inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold font-inter px-6 h-[46px] rounded-lg transition-all duration-200 tracking-[-0.01em]"
              style={{
                background: "white",
                color: "hsl(222 24% 8%)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.88)"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}
            >
              {tx.hero_cta1}
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Secondary CTA */}
            <TryDemoButton label={tx.hero_cta2} />
          </motion.div>

          {/* Minimal proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex items-center gap-8 md:gap-12"
          >
            {[
              { value: "LLM", label: tx.stat1_label },
              { value: "24 / 7", label: tx.stat2_label },
              { value: lang === "en" ? "Burmese" : "မြန်မာ", label: tx.stat3_label },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="font-sora text-[18px] font-bold tracking-[-0.03em]" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {stat.value}
                </span>
                <span className="text-[10px] font-inter tracking-[0.08em] uppercase" style={{ color: "rgba(255,255,255,0.22)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, hsl(222 24% 5%))",
          zIndex: 5,
        }}
      />
    </section>
  );
}