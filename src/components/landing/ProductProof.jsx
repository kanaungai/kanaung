import React from "react";
import { motion } from "framer-motion";
import LiveCallPanel from "./LiveCallPanel";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";

export default function ProductProof() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref: headerRef, inView: headerVisible } = useScrollReveal({ margin: "-60px" });
  const { ref: panelRef, inView: panelVisible } = useScrollReveal({ margin: "-40px" });

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "hsl(222 24% 5%)" }}
    >
      {/* Top seamless continuation from hero */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      {/* Subtle depth glow behind panel */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          style={{
            width: 700,
            height: 500,
            background: "hsl(352 72% 38% / 0.05)",
            filter: "blur(120px)",
            borderRadius: "50%",
          }}
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-8" style={{ zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={REVEAL.primary}
          className="text-center mb-16 md:mb-20"
        >
          <p
            className="text-[10px] font-semibold tracking-[0.18em] uppercase font-inter mb-5"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            {lang === "en" ? "Live in Action" : "တိုက်ရိုက် ကြည့်ရှုမှု"}
          </p>
          <h2
            className="font-sora font-extrabold tracking-[-0.045em] leading-[1.04] text-white"
            style={{ fontSize: "clamp(26px, 4vw, 48px)" }}
          >
            {lang === "en"
              ? "A real conversation.\nIn Burmese. Instant."
              : "မြန်မာဘာသာ · တိုက်ရိုက် · ချက်ချင်း"}
          </h2>
          <p
            className="mt-5 text-[14px] font-inter leading-[1.8] max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            {lang === "en"
              ? "Watch Kanaung handle a live customer inquiry — product questions, pricing, delivery — fully in Burmese, grounded in your business knowledge."
              : "Kanaung AI သည် ဖောက်သည်မေးမြန်းမှုများကို မြန်မာဘာသာဖြင့် ချက်ချင်း ဖြေကြားနိုင်ပုံကို ကြည့်ပါ"}
          </p>
        </motion.div>

        {/* Panel — constrained width, centered */}
        <motion.div
          ref={panelRef}
          animate={{ opacity: panelVisible ? 1 : 0, y: panelVisible ? 0 : 24 }}
          initial={{ opacity: 0, y: 24 }}
          transition={REVEAL.card}
          className="max-w-[520px] mx-auto"
        >
          <LiveCallPanel />
        </motion.div>

        {/* Bottom hairline */}
        <motion.div
          animate={{ opacity: panelVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px mt-20 md:mt-28"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>
    </section>
  );
}