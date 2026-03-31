import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LiveCallPanel from "./LiveCallPanel";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(30_40%_96%)_0%,hsl(220_22%_97%)_60%,hsl(222_24%_95%)_100%)] pointer-events-none" />
      <div className="absolute -top-32 right-0 w-[700px] h-[700px] bg-primary/[0.045] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-40 w-[600px] h-[500px] bg-blue-500/[0.025] rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px"
        }} />

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
              <span className="text-[11px] font-semibold text-background/90 tracking-[0.07em] uppercase">
                {tx.hero_eyebrow}
              </span>
            </motion.div>

            <h1 className="font-sora text-[44px] md:text-[52px] xl:text-[60px] font-bold tracking-[-0.03em] leading-[1.04] text-foreground">
              {tx.hero_h1_1}<br />
              {tx.hero_h1_2}<br />
              <span className="text-[hsl(var(--foreground))]">{tx.hero_h1_3}</span>
            </h1>

            <p className="mt-7 text-[16px] md:text-[17px] text-muted-foreground leading-[1.75] max-w-[420px] font-inter font-normal">
              {tx.hero_sub}{" "}
              <span className="text-foreground/70 font-medium">{tx.hero_sub_bold}</span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openCalendly}
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background text-[14px] font-semibold px-7 h-[50px] rounded-full hover:bg-foreground/88 transition-all duration-200 shadow-lg shadow-foreground/10 tracking-[-0.01em]">
                {tx.hero_cta1}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-foreground text-[14px] font-semibold px-7 h-[50px] rounded-full border border-foreground/12 hover:bg-foreground/[0.04] transition-all duration-200 tracking-[-0.01em]">
                {tx.hero_cta2}
              </button>
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
                  <span className="font-sora text-[22px] font-bold text-foreground tracking-[-0.02em]">
                    {stat.value}
                  </span>
                  <span className="text-[12px] text-muted-foreground font-medium tracking-wide">
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