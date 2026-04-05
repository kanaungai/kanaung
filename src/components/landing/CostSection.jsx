import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

const STATS = (tx) => [
  { stat: tx.cost_s1_stat, label: tx.cost_s1_label, body: tx.cost_s1_body },
  { stat: tx.cost_s2_stat, label: tx.cost_s2_label, body: tx.cost_s2_body },
  { stat: tx.cost_s3_stat, label: tx.cost_s3_label, body: tx.cost_s3_body },
];

export default function CostSection() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref: sectionRef, inView: sectionVisible } = useScrollReveal({ margin: "-80px" });

  const stats = STATS(tx);

  return (
    <section className="py-28 md:py-40 relative overflow-hidden bg-[hsl(220_25%_6%)]">

      {/* Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_25%_4%)] via-[hsl(220_25%_7%)] to-[hsl(220_25%_6%)] pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: 700, height: 420, background: "hsl(352 72% 38% / 0.06)", filter: "blur(120px)", borderRadius: "50%" }}
      />

      <div ref={sectionRef} className="relative max-w-[1200px] mx-auto px-5 md:px-8">

        {/* Eyebrow + rule */}
        <motion.div
          animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 14 }}
          initial={{ opacity: 0, y: 14 }}
          transition={REVEAL.primary}
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase mb-6 font-inter" style={{ color: "rgba(255,255,255,0.6)" }}>
            {tx.cost_eyebrow}
          </p>
          <div className="w-full h-px mb-14 md:mb-16" style={{ background: "rgba(255,255,255,0.1)" }} />
        </motion.div>

        {/* Top row: headline left, paragraph right */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-24 mb-20 md:mb-24 items-start">

          <motion.h2
            animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 20 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ ...REVEAL.primary, delay: 0.05 }}
            className="font-sora font-extrabold tracking-[-0.045em] leading-[1.06] text-white"
            style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}
          >
            {tx.cost_h2}
          </motion.h2>

          <motion.p
            animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 16 }}
            initial={{ opacity: 0, y: 16 }}
            transition={{ ...REVEAL.primary, delay: 0.14 }}
            className="text-[14.5px] leading-[1.85] font-inter tracking-[-0.005em] md:pt-1 text-white"
          >
            {tx.cost_sub}
          </motion.p>
        </div>

        {/* Bottom row: 3 equal stat columns */}
        <motion.div
          animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 12 }}
          initial={{ opacity: 0, y: 12 }}
          transition={{ ...REVEAL.fade, delay: 0.24 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          {stats.map((item, i) => (
            <motion.div
              key={item.label}
              animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 10 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ ...REVEAL.fade, delay: 0.28 + i * 0.08 }}
              className="pt-10 pb-2 flex flex-col gap-3"
              style={{
                paddingRight: i < 2 ? "clamp(16px, 4vw, 56px)" : 0,
                paddingLeft: i > 0 ? "clamp(16px, 4vw, 56px)" : 0,
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
                borderTop: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <div
                className="font-sora font-extrabold tracking-[-0.05em] leading-none text-white"
                style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
              >
                {item.stat}
              </div>
              <p className="text-[9.5px] font-semibold tracking-[0.14em] uppercase font-inter text-white">
                {item.label}
              </p>
              <p className="text-[13px] leading-[1.8] font-inter tracking-[-0.005em] text-white">
                {item.body}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom rule */}
        <motion.div
          animate={{ opacity: sectionVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.44 }}
          className="w-full h-px mt-16 md:mt-20"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
      </div>
    </section>
  );
}