import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

export default function CostSection() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref: sectionRef, inView: sectionVisible } = useScrollReveal({ margin: "-80px" });

  return (
    <section className="py-28 md:py-40 relative overflow-hidden bg-[hsl(220_25%_6%)]">

      {/* Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_25%_4%)] via-[hsl(220_25%_7%)] to-[hsl(220_25%_6%)] pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: 800, height: 480, background: "hsl(352 72% 38% / 0.07)", filter: "blur(130px)", borderRadius: "50%" }}
      />

      <div ref={sectionRef} className="relative max-w-[1200px] mx-auto px-8">

        {/* Eyebrow + rule */}
        <motion.div
          animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 14 }}
          initial={{ opacity: 0, y: 14 }}
          transition={REVEAL.primary}
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white/25 mb-6 font-inter">
            {tx.cost_eyebrow}
          </p>
          <div className="w-full h-px bg-white/8 mb-16 md:mb-20" />
        </motion.div>

        {/* ── Hero: 21× ── */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-end mb-20 md:mb-28">

          {/* Giant number */}
          <motion.div
            animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 24 }}
            initial={{ opacity: 0, y: 24 }}
            transition={{ ...REVEAL.card, delay: 0.05 }}
          >
            <div
              className="font-sora font-extrabold tracking-[-0.07em] leading-none select-none"
              style={{
                fontSize: "clamp(100px, 18vw, 200px)",
                background: "linear-gradient(170deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.28) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              21×
            </div>
          </motion.div>

          {/* Copy beside the number */}
          <motion.div
            animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 18 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ ...REVEAL.card, delay: 0.15 }}
            className="pb-3 md:pb-5"
          >
            <h2 className="font-sora text-[26px] md:text-[34px] font-extrabold tracking-[-0.04em] leading-[1.1] text-white mb-5">
              {tx.cost_h2}
            </h2>
            <p className="text-[14.5px] text-white/42 leading-[1.85] font-inter tracking-[-0.005em] max-w-sm">
              {tx.cost_s1_body}
            </p>
            {/* Narrative thread */}
            <div className="mt-8 flex items-center gap-2.5 flex-wrap">
              {(lang === "en"
                ? ["Inquiry arrives", "No fast reply", "Lead goes cold"]
                : ["မေးမြန်းချက် ရောက်သည်", "မြန်မြန်မဖြေ", "ဖောက်သည် ထွက်သွားသည်"]
              ).map((step, i, arr) => (
                <React.Fragment key={step}>
                  <span
                    className="text-[11px] font-medium font-inter"
                    style={{
                      color: i === 0
                        ? "rgba(255,255,255,0.35)"
                        : i === 1
                        ? "hsl(38 75% 55%)"
                        : "hsl(352 65% 60%)",
                    }}
                  >
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 11 }}>→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Supporting stats — open, minimal, no cards ── */}
        <motion.div
          animate={{ opacity: sectionVisible ? 1 : 0, y: sectionVisible ? 0 : 12 }}
          initial={{ opacity: 0, y: 12 }}
          transition={{ ...REVEAL.fade, delay: 0.28 }}
          className="grid md:grid-cols-2 gap-10 md:gap-20 pt-10 border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          {[
            { stat: tx.cost_s2_stat, label: tx.cost_s2_label, body: tx.cost_s2_body },
            { stat: tx.cost_s3_stat, label: tx.cost_s3_label, body: tx.cost_s3_body },
          ].map((item) => (
            <div key={item.label} className="flex gap-6 items-start">
              <div
                className="font-sora font-extrabold tracking-[-0.05em] leading-none flex-shrink-0 mt-0.5"
                style={{ fontSize: 44, color: "rgba(255,255,255,0.18)" }}
              >
                {item.stat}
              </div>
              <div>
                <p className="text-[9.5px] font-semibold tracking-[0.14em] uppercase text-white/20 mb-2 font-inter">
                  {item.label}
                </p>
                <p className="text-[13px] text-white/36 leading-[1.8] font-inter tracking-[-0.005em]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{ opacity: sectionVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.38 }}
          className="w-full h-px bg-white/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}