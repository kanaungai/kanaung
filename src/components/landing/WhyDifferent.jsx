import React from "react";
import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

export default function WhyDifferent() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref: headerRef, inView: headerVisible } = useScrollReveal();
  const { ref: cardRef, inView: cardVisible } = useScrollReveal({ margin: "-60px" });

  const TRADITIONAL = [tx.why_trad_1, tx.why_trad_2, tx.why_trad_3, tx.why_trad_4];
  const KANAUNG = [tx.why_kan_1, tx.why_kan_2, tx.why_kan_3, tx.why_kan_4];

  return (
    <section className="py-24 md:py-36 relative overflow-hidden bg-[hsl(220_25%_6%)]">

      <div className="relative max-w-[1200px] mx-auto px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={REVEAL.primary}
          className="mb-20 md:mb-28"
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase mb-6 font-inter" style={{ color: "rgba(255,255,255,0.28)" }}>
            {tx.why_eyebrow}
          </p>
          <div className="w-full h-px mb-10" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[30px] md:text-[48px] xl:text-[56px] font-extrabold tracking-[-0.05em] leading-[0.97] text-white">
              {tx.why_h2}
            </h2>
            <motion.p
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ ...REVEAL.primary, delay: 0.12 }}
              className="text-[15px] leading-[1.8] md:pt-2 max-w-md font-inter tracking-[-0.005em]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {tx.why_sub}
            </motion.p>
          </div>
        </motion.div>

        {/* ── Comparison ── */}
        <motion.div
          ref={cardRef}
          animate={{ opacity: cardVisible ? 1 : 0, y: cardVisible ? 0 : 16 }}
          initial={{ opacity: 0, y: 16 }}
          transition={REVEAL.card}
          className="grid md:grid-cols-[1fr_1px_1fr] gap-0 items-start"
        >

          {/* ── Left: Traditional ── */}
          <div className="pr-0 md:pr-16 pb-12 md:pb-0">
            <div className="mb-8">
              <span
                className="text-[9.5px] font-bold tracking-[0.16em] uppercase font-inter block mb-3"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                {tx.why_trad_label}
              </span>
              <h3
                className="font-sora font-extrabold tracking-[-0.04em] leading-[1.1]"
                style={{ fontSize: "clamp(20px, 2.2vw, 26px)", color: "rgba(255,255,255,0.36)" }}
              >
                {tx.why_trad_title}
              </h3>
            </div>

            <ul className="space-y-5">
              {TRADITIONAL.map((point) => (
                <li key={point} className="flex items-start gap-3.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                  >
                    <X className="w-2.5 h-2.5" style={{ color: "rgba(255,255,255,0.25)" }} />
                  </div>
                  <span
                    className="text-[13.5px] leading-[1.75] font-inter tracking-[-0.005em]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Vertical divider ── */}
          <div
            className="hidden md:block self-stretch"
            style={{ background: "rgba(255,255,255,0.08)", width: 1 }}
          />
          {/* Mobile divider */}
          <div
            className="block md:hidden w-full h-px mb-12"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          {/* ── Right: Kanaung ── */}
          <div className="pl-0 md:pl-16">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <span
                  className="text-[9.5px] font-bold tracking-[0.16em] uppercase font-inter block mb-3"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {tx.why_kan_label}
                </span>
                <h3
                  className="font-sora font-extrabold tracking-[-0.04em] leading-[1.1] text-white"
                  style={{ fontSize: "clamp(20px, 2.2vw, 26px)" }}
                >
                  {tx.why_kan_title}
                </h3>
              </div>
              {/* Subtle "upgrade" arrow pill */}
              <div
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full mt-1"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <ArrowRight className="w-3 h-3" style={{ color: "rgba(255,255,255,0.40)" }} />
                <span className="text-[9px] font-semibold tracking-[0.1em] uppercase font-inter" style={{ color: "rgba(255,255,255,0.40)" }}>
                  LLM
                </span>
              </div>
            </div>

            <ul className="space-y-5">
              {KANAUNG.map((point) => (
                <li key={point} className="flex items-start gap-3.5">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
                  >
                    <Check className="w-2.5 h-2.5" style={{ color: "rgba(255,255,255,0.75)" }} />
                  </div>
                  <span
                    className="text-[13.5px] leading-[1.75] font-inter font-medium tracking-[-0.005em]"
                    style={{ color: "rgba(255,255,255,0.80)" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Micro caption */}
        <motion.p
          animate={{ opacity: cardVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.3 }}
          className="mt-14 text-center text-[12.5px] font-inter tracking-[0.01em] italic"
          style={{ color: "rgba(255,255,255,0.20)" }}
        >
          {tx.why_micro}
        </motion.p>

        {/* Bottom rule */}
        <motion.div
          animate={{ opacity: cardVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px mt-16 md:mt-20"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      </div>
    </section>
  );
}