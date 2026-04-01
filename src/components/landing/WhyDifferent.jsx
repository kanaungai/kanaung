import React from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
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
    <section className="py-24 md:py-32 relative overflow-hidden bg-[hsl(220_25%_6%)]">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-8">

        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={REVEAL.primary}
          className="mb-16 md:mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-6">
            {tx.why_eyebrow}
          </p>
          <div className="w-full h-px bg-white/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[44px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.06] text-white">
              {tx.why_h2}
            </h2>
            <motion.p
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ ...REVEAL.primary, delay: 0.12 }}
              className="text-[16px] text-white/50 leading-[1.8] md:pt-2 max-w-md font-inter"
            >
              {tx.why_sub}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          ref={cardRef}
          animate={{ opacity: cardVisible ? 1 : 0, y: cardVisible ? 0 : 16 }}
          initial={{ opacity: 0, y: 16 }}
          transition={REVEAL.card}
          className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.07]"
          style={{
            background: "linear-gradient(160deg, hsl(220 22% 10%) 0%, hsl(220 22% 8%) 100%)",
          }}
        >
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/[0.07]">
            <div className="mb-8">
              <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/25">
                {tx.why_trad_label}
              </span>
              <h3 className="font-sora text-[20px] font-semibold tracking-[-0.02em] text-white/30 mt-2">
                {tx.why_trad_title}
              </h3>
            </div>
            <ul className="space-y-4">
              {TRADITIONAL.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-white/20" />
                  </div>
                  <span className="text-[14px] text-white/30 leading-[1.7] font-inter">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 md:p-12 relative">
            <div className="absolute inset-0 bg-foreground/[0.015] pointer-events-none" />
            <div className="relative">
              <div className="mb-8">
                <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30">
                  {tx.why_kan_label}
                </span>
                <h3 className="font-sora text-[20px] font-semibold tracking-[-0.02em] text-white mt-2">
                  {tx.why_kan_title}
                </h3>
              </div>
              <ul className="space-y-4">
                {KANAUNG.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-white/20 bg-white/[0.07] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white/70" />
                    </div>
                    <span className="text-[14px] text-white/75 leading-[1.7] font-inter font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.p
          animate={{ opacity: cardVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.3 }}
          className="mt-10 text-center text-[13px] text-white/30 font-inter tracking-wide"
        >
          {tx.why_micro}
        </motion.p>

        <motion.div
          animate={{ opacity: cardVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px bg-white/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}