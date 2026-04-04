import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

export default function CostSection() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref: headerRef, inView: headerVisible } = useScrollReveal();
  const { ref: statsRef, inView: statsVisible } = useScrollReveal({ margin: "-60px" });

  const STATS = [
    { label: tx.cost_s1_label, stat: tx.cost_s1_stat, body: tx.cost_s1_body },
    { label: tx.cost_s2_label, stat: tx.cost_s2_stat, body: tx.cost_s2_body },
    { label: tx.cost_s3_label, stat: tx.cost_s3_stat, body: tx.cost_s3_body },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[hsl(220_25%_6%)]">

      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_25%_4%)] via-[hsl(220_25%_7%)] to-[hsl(220_25%_6%)] pointer-events-none" />
      {/* Subtle warm/red glow — echoes FinalCTA */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none" style={{ background: "hsl(352 72% 38% / 0.08)", filter: "blur(100px)" }} />

      <div className="relative max-w-[1200px] mx-auto px-8">

        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={REVEAL.primary}
          className="mb-16 md:mb-20"
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white/25 mb-6 font-inter">
            {tx.cost_eyebrow}
          </p>
          <div className="w-full h-px bg-white/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[48px] xl:text-[56px] font-extrabold tracking-[-0.05em] leading-[0.97] text-white">
              {tx.cost_h2}
            </h2>
            <motion.p
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ ...REVEAL.primary, delay: 0.12 }}
              className="text-[15px] text-white/45 leading-[1.8] md:pt-2 max-w-md font-inter tracking-[-0.005em]"
            >
              {tx.cost_sub}
            </motion.p>
          </div>
        </motion.div>

        <div ref={statsRef} className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">
          {STATS.map((item, i) => (
            <motion.div
              key={item.label}
              animate={{ opacity: statsVisible ? 1 : 0, y: statsVisible ? 0 : 16 }}
              initial={{ opacity: 0, y: 16 }}
              transition={{ ...REVEAL.card, delay: i * REVEAL.stagger }}
              className="pt-10 md:pt-0 md:px-10 first:md:pl-0 last:md:pr-0 pb-10 md:pb-0"
            >
              <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-white/25 mb-5 font-inter">
                {item.label}
              </p>
              <div className="font-sora text-[60px] md:text-[72px] font-extrabold tracking-[-0.06em] leading-none text-white mb-6">
                {item.stat}
              </div>
              <div className="w-8 h-px bg-white/20 mb-5" />
              <p className="text-[13.5px] text-white/40 leading-[1.8] font-inter max-w-[280px] tracking-[-0.005em]">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ opacity: statsVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px bg-white/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}