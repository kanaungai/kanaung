import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

export default function HowItWorks() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref: headerRef, inView: headerVisible } = useScrollReveal();
  const { ref: stepsRef, inView: stepsVisible } = useScrollReveal({ margin: "-60px" });

  const STEPS = [
    { number: tx.hiw_s1_num, title: tx.hiw_s1_title, description: tx.hiw_s1_desc, label: tx.hiw_s1_label },
    { number: tx.hiw_s2_num, title: tx.hiw_s2_title, description: tx.hiw_s2_desc, label: tx.hiw_s2_label },
    { number: tx.hiw_s3_num, title: tx.hiw_s3_title, description: tx.hiw_s3_desc, label: tx.hiw_s3_label },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-24 md:py-36 bg-[hsl(220_25%_6%)] relative overflow-hidden">

      {/* Subtle depth glow */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{ width: 600, height: 500, background: "hsl(210 80% 55% / 0.04)", filter: "blur(140px)", borderRadius: "50%" }}
      />

      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={REVEAL.primary}
          className="mb-14 sm:mb-20 md:mb-28"
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase mb-6 font-inter" style={{ color: "rgba(255,255,255,0.28)" }}>
            {tx.hiw_eyebrow}
          </p>
          <div className="w-full h-px mb-8 sm:mb-10" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[30px] md:text-[48px] xl:text-[56px] font-extrabold tracking-[-0.05em] leading-[0.97] text-white">
              {tx.hiw_h2}
            </h2>
            <motion.p
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ ...REVEAL.primary, delay: 0.12 }}
              className="text-[15px] leading-[1.8] md:pt-2 max-w-md font-inter tracking-[-0.005em]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {tx.hiw_sub}
            </motion.p>
          </div>
        </motion.div>

        {/* ── Steps ── */}
        <div ref={stepsRef} className="grid md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              animate={{ opacity: stepsVisible ? 1 : 0, y: stepsVisible ? 0 : 16 }}
              initial={{ opacity: 0, y: 16 }}
              transition={{ ...REVEAL.primary, delay: i * 0.12 }}
              className={`relative flex flex-col py-8 first:pt-0 last:pb-0 md:py-0 ${
                i > 0 ? "border-t border-white/[0.07] md:border-t-0 md:border-l md:border-white/[0.07]" : ""
              } ${i < 2 ? "md:pr-[clamp(28px,4vw,60px)]" : ""} ${
                i > 0 ? "md:pl-[clamp(28px,4vw,60px)]" : ""
              }`}
            >
              {/* Step number */}
              <span
                className="font-inter text-[11px] font-semibold tracking-[0.14em] uppercase mb-5 sm:mb-8 block"
                style={{ color: "rgba(255,255,255,0.18)" }}
              >
                {step.number}
              </span>

              {/* Title */}
              <h3
                className="font-sora font-extrabold tracking-[-0.04em] leading-[1.1] text-white mb-5"
                style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
              >
                {step.title}
              </h3>

              {/* Body */}
              <p
                className="text-[13.5px] leading-[1.85] font-inter tracking-[-0.005em] flex-1"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                {step.description}
              </p>

              {/* Bottom label */}
              <div
                className="mt-8 sm:mt-10 pt-5 sm:pt-6 flex items-center gap-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Subtle progress dot — filled for all previous, hollow for next */}
                <div className="flex items-center gap-1.5">
                  {STEPS.map((_, j) => (
                    <div
                      key={j}
                      className="rounded-full"
                      style={{
                        width: j === i ? 14 : 5,
                        height: 5,
                        background: j <= i ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.08)",
                        transition: "width 0.3s ease",
                      }}
                    />
                  ))}
                </div>
                <span
                  className="text-[9px] font-semibold tracking-[0.12em] uppercase font-inter ml-2"
                  style={{ color: "rgba(255,255,255,0.20)" }}
                >
                  {step.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom rule */}
        <motion.div
          animate={{ opacity: stepsVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px mt-20 md:mt-28"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />
      </div>
    </section>
  );
}
