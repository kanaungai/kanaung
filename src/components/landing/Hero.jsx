import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LiveCallPanel from "./LiveCallPanel";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import TryDemoButton from "./TryDemoButton";

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden">

      {/* Base surface */}
      <div className="absolute inset-0 bg-[hsl(220_22%_97%)] pointer-events-none" />

      {/* Warm radial glow — primary atmosphere, left-center behind text */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          left: "-15%",
          width: "80%",
          height: "110%",
          background: "radial-gradient(ellipse at 40% 45%, hsl(28 70% 91% / 0.95) 0%, hsl(26 50% 94% / 0.65) 35%, transparent 65%)",
        }}
      />

      {/* Secondary glow — right side cool depth */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          right: "-10%",
          width: "60%",
          height: "85%",
          background: "radial-gradient(ellipse at 60% 35%, hsl(220 35% 92% / 0.7) 0%, transparent 58%)",
        }}
      />

      {/* Pinstripes — crisp vertical structure, fades over content areas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 39px,
            hsl(220 25% 55% / 0.11) 39px,
            hsl(220 25% 55% / 0.11) 40px
          )`,
          maskImage: `
            radial-gradient(ellipse 55% 80% at 28% 50%, transparent 30%, black 70%),
            linear-gradient(to bottom, transparent 0%, black 10%, black 82%, transparent 100%)
          `,
          WebkitMaskImage: `
            radial-gradient(ellipse 55% 80% at 28% 50%, transparent 30%, black 70%),
            linear-gradient(to bottom, transparent 0%, black 10%, black 82%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "destination-in",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 xl:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="inline-flex items-center self-start gap-2 px-4 py-2 rounded-full bg-foreground mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
              <span className="text-[9.5px] font-bold text-background/70 tracking-[0.2em] uppercase font-inter">
                {tx.hero_eyebrow}
              </span>
            </motion.div>

            <h1 className="font-sora text-[50px] md:text-[62px] xl:text-[72px] font-extrabold tracking-[-0.05em] leading-[0.96] text-foreground">
              {tx.hero_h1_1}<br />
              {tx.hero_h1_2}<br />
              <span className="text-[hsl(var(--foreground))]">{tx.hero_h1_3}</span>
            </h1>

            <p className="mt-8 text-[14.5px] md:text-[15.5px] text-muted-foreground leading-[1.85] max-w-[390px] font-inter font-normal tracking-[0.005em]">
              {tx.hero_sub}{" "}
              <span className="text-foreground/60 font-medium">{tx.hero_sub_bold}</span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openCalendly}
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background text-[14px] font-semibold px-7 h-[50px] rounded-full hover:bg-foreground/88 transition-all duration-200 shadow-lg shadow-foreground/10 tracking-[-0.01em]">
                {tx.hero_cta1}
                <ArrowRight className="w-4 h-4" />
              </button>
              <TryDemoButton label={tx.hero_cta2} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-14 flex items-center gap-10">
              {[
                { value: "LLM", label: tx.stat1_label },
                { value: "24 / 7", label: tx.stat2_label },
                { value: lang === "en" ? "Burmese" : "မြန်မာ", label: tx.stat3_label },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="font-sora text-[20px] font-bold text-foreground tracking-[-0.03em]">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium tracking-[0.04em] font-inter">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full">
            <LiveCallPanel />
          </motion.div>

        </div>
      </div>
    </section>
  );
}