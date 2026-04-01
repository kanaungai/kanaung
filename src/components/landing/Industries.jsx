import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

export default function Industries() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref: headerRef, inView: headerVisible } = useScrollReveal();
  const { ref: gridRef, inView: gridVisible } = useScrollReveal({ margin: "-40px" });

  const INDUSTRIES = [
    { name: tx.ind_1_name, detail: tx.ind_1_detail },
    { name: tx.ind_2_name, detail: tx.ind_2_detail },
    { name: tx.ind_3_name, detail: tx.ind_3_detail },
    { name: tx.ind_4_name, detail: tx.ind_4_detail },
    { name: tx.ind_5_name, detail: tx.ind_5_detail },
    { name: tx.ind_6_name, detail: tx.ind_6_detail },
    { name: tx.ind_7_name, detail: tx.ind_7_detail },
    { name: tx.ind_8_name, detail: tx.ind_8_detail },
  ];

  return (
    <section id="industries" className="py-24 md:py-32 bg-[hsl(220_25%_6%)] relative">
      {/* Smooth gradient out to light section below */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[hsl(220_22%_97%)] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-8">

        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={REVEAL.primary}
          className="mb-16 md:mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-6">
            {tx.ind_eyebrow}
          </p>
          <div className="w-full h-px bg-white/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[44px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.06] text-white">
              {tx.ind_h2}
            </h2>
            <motion.p
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ ...REVEAL.primary, delay: 0.12 }}
              className="text-[16px] text-white/50 leading-[1.8] md:pt-2 max-w-md font-inter"
            >
              {tx.ind_sub}
            </motion.p>
          </div>
        </motion.div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-2xl border border-white/[0.07] overflow-hidden"
          style={{
            background: "linear-gradient(160deg, hsl(220 22% 10%) 0%, hsl(220 22% 8%) 100%)",
          }}
        >
          {INDUSTRIES.map((item, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const totalRows = Math.ceil(INDUSTRIES.length / 4);
            const isLastRow = row === totalRows - 1;
            const isLastCol = col === 3;

            return (
              <motion.div
                key={item.name}
                animate={{ opacity: gridVisible ? 1 : 0, y: gridVisible ? 0 : 12 }}
                initial={{ opacity: 0, y: 12 }}
                transition={{ ...REVEAL.card, delay: i * 0.06 }}
                className="group relative flex flex-col px-8 py-8 md:py-10 border-r border-b border-foreground/[0.07] hover:bg-foreground/[0.015] transition-colors duration-200"
                style={{
                  borderRight: isLastCol ? "none" : undefined,
                  borderBottom: isLastRow ? "none" : undefined,
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/8 to-transparent pointer-events-none" />
                <h3 className="font-sora text-[16px] md:text-[17px] font-semibold tracking-[-0.02em] text-white/80 leading-snug mb-2.5">
                  {item.name}
                </h3>
                <p className="text-[13px] text-white/35 leading-[1.7] font-inter">
                  {item.detail}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          animate={{ opacity: gridVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px bg-white/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}