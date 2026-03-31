import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";

export default function Industries() {
  const { lang } = useLang();
  const tx = t[lang];

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
    <section id="industries" className="py-24 md:py-32 bg-[hsl(220_25%_6%)]">
      <div className="max-w-[1200px] mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            <p className="text-[16px] text-white/50 leading-[1.8] md:pt-2 max-w-md font-inter">
              {tx.ind_sub}
            </p>
          </div>
        </motion.div>

        <div
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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.05 + i * 0.05, ease: "easeOut" }}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full h-px bg-white/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}