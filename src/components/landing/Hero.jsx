import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import HeroConversationShowcase from "./HeroConversationShowcase";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import TryDemoButton from "./TryDemoButton";

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 overflow-hidden bg-[hsl(220_25%_6%)]">

      <div className="absolute inset-0 bg-[hsl(220_25%_6%)] pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "88px 88px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          opacity: 0.34,
        }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0) 18%, rgba(255,255,255,0) 82%, rgba(255,255,255,0.02) 100%)" }} />

      <div className="relative max-w-[1280px] mx-auto px-8 w-full">
        <div className="grid lg:grid-cols-[0.95fr_1.2fr] gap-12 xl:gap-18 items-center">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="inline-flex items-center self-start gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.09)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(142 55% 48%)" }} />
              <span className="text-[10px] font-semibold tracking-[0.14em] uppercase font-inter text-white/66">
                {tx.hero_eyebrow}
              </span>
            </motion.div>

            <h1 className="font-sora text-[46px] md:text-[60px] xl:text-[74px] font-extrabold tracking-[-0.055em] leading-[0.92] text-white max-w-[660px]">
              {tx.hero_h1_1}<br />
              {tx.hero_h1_2}<br />
              <span className="text-white/96">{tx.hero_h1_3}</span>
            </h1>

            <p className="mt-8 text-[15px] md:text-[16px] text-white/50 leading-[1.9] max-w-[520px] font-inter tracking-[-0.003em]">
              {tx.hero_sub}{" "}
              <span className="text-white/82 font-medium">{tx.hero_sub_bold}</span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openCalendly}
                className="inline-flex items-center justify-center gap-2 bg-white text-[hsl(220_25%_8%)] text-[13.5px] font-semibold px-6 h-[48px] rounded-lg hover:bg-white/90 transition-all duration-200 tracking-[-0.01em]"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.16)" }}>
                {tx.hero_cta1}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <TryDemoButton label={tx.hero_cta2} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-14 grid grid-cols-3 gap-6 max-w-[520px] pt-6 border-t border-white/10">
              {[
                { value: "Burmese", label: tx.stat3_label },
                { value: "24/7", label: tx.stat2_label },
                { value: "Grounded", label: tx.stat1_label },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-sora text-[20px] font-bold text-white tracking-[-0.03em]">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-white/36 font-medium tracking-[0.05em] uppercase font-inter">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full">
            <HeroConversationShowcase />
          </motion.div>

        </div>
      </div>
    </section>
  );
}