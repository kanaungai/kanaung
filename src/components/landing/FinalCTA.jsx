import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

export default function FinalCTA() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref, inView } = useScrollReveal({ margin: "-80px" });

  return (
    <section
      id="final-cta"
      className="relative pt-28 md:pt-36 pb-0 overflow-hidden"
      style={{ background: "hsl(220 25% 5%)" }}
    >
      {/* Restrained glow — top-left behind headline */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: 700,
          height: 500,
          background: "hsl(352 72% 38% / 0.07)",
          filter: "blur(160px)",
          borderRadius: "50%",
          transform: "translate(-20%, -30%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-8">

        {/* Top hairline */}
        <div className="w-full h-px mb-16 md:mb-20" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* ── Split layout ── */}
        <motion.div
          ref={ref}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 24 }}
          initial={{ opacity: 0, y: 24 }}
          transition={REVEAL.primary}
          className="grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-20 items-end pb-24 md:pb-32"
        >

          {/* ── Left: headline block ── */}
          <div className="flex flex-col">
            <span
              className="text-[10px] font-semibold tracking-[0.16em] uppercase mb-7 font-inter block"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              {tx.cta_eyebrow}
            </span>
            <h2
              className="font-sora font-extrabold tracking-[-0.05em] leading-[0.95] text-white"
              style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
            >
              {tx.cta_h2}
            </h2>
          </div>

          {/* ── Right: copy + CTA ── */}
          <motion.div
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 16 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ ...REVEAL.primary, delay: 0.14 }}
            className="flex flex-col justify-end gap-10"
          >
            <p
              className="text-[15px] leading-[1.85] font-inter tracking-[-0.005em] max-w-md"
              style={{ color: "rgba(255,255,255,0.50)" }}
            >
              {tx.cta_sub}
            </p>

            {/* CTA cluster */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Primary */}
              <button
                onClick={openCalendly}
                className="group inline-flex items-center gap-2.5 font-sora font-bold text-[13.5px] tracking-[-0.01em] px-7 py-3.5 rounded-full transition-all duration-200"
                style={{
                  background: "white",
                  color: "hsl(220 25% 8%)",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.88)"}
                onMouseLeave={e => e.currentTarget.style.background = "white"}
              >
                {tx.cta_btn1}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Secondary */}
              <button
                onClick={openCalendly}
                className="inline-flex items-center gap-2 text-[13px] font-medium font-inter tracking-[-0.005em] transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.38)" }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.65)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.38)"}
              >
                {tx.cta_btn2}
              </button>
            </div>

            {/* Trust line */}
            <p
              className="text-[11px] font-inter tracking-[0.03em]"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              {tx.cta_note}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}