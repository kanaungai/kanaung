import React from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const TRADITIONAL = [
  "Fixed decision trees",
  "Keyword-based replies",
  "Breaks on unexpected questions",
  "High manual takeover rate",
];

const KANAUNG = [
  "LLM-powered Burmese responses",
  "Handles natural customer questions",
  "Answers from your business knowledge",
  "Human handoff when needed",
];

export default function WhyDifferent() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-6">
            Why Kanaung Is Different
          </p>
          <div className="w-full h-px bg-foreground/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[44px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.06] text-foreground">
              Beyond scripted bots.
            </h2>
            <p className="text-[16px] text-muted-foreground leading-[1.8] md:pt-2 max-w-md font-inter">
              Traditional bots follow rigid flows and break when customers ask unexpected questions. Kanaung uses LLM-powered Burmese understanding to handle natural conversations more flexibly — while keeping your team in control.
            </p>
          </div>
        </motion.div>

        {/* ── Comparison block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-foreground/[0.07]"
          style={{
            background: "linear-gradient(160deg, hsl(220 22% 98.5%) 0%, hsl(220 16% 96%) 100%)",
          }}
        >
          {/* Inner top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/8 to-transparent pointer-events-none" />

          {/* Left — Traditional bots */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-foreground/[0.07]">
            <div className="mb-8">
              <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/50">
                Traditional bots
              </span>
              <h3 className="font-sora text-[20px] font-semibold tracking-[-0.02em] text-foreground/50 mt-2">
                Rule-based &amp; scripted
              </h3>
            </div>
            <ul className="space-y-4">
              {TRADITIONAL.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border border-foreground/10 bg-foreground/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-foreground/25" />
                  </div>
                  <span className="text-[14px] text-muted-foreground/70 leading-[1.7] font-inter">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Kanaung */}
          <div className="p-8 md:p-12 relative">
            {/* Subtle premium tint on Kanaung side */}
            <div className="absolute inset-0 bg-foreground/[0.015] pointer-events-none" />
            <div className="relative">
              <div className="mb-8">
                <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-foreground/40">
                  Kanaung
                </span>
                <h3 className="font-sora text-[20px] font-semibold tracking-[-0.02em] text-foreground mt-2">
                  LLM-powered &amp; adaptive
                </h3>
              </div>
              <ul className="space-y-4">
                {KANAUNG.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-foreground/15 bg-foreground/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-foreground/60" />
                    </div>
                    <span className="text-[14px] text-foreground/80 leading-[1.7] font-inter font-medium">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── Micro-copy ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 text-center text-[13px] text-muted-foreground/60 font-inter tracking-wide"
        >
          The result: fewer dead ends, more resolved conversations, and a better customer experience.
        </motion.p>

        {/* Bottom rule */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full h-px bg-foreground/8 mt-16 md:mt-20"
        />

      </div>
    </section>
  );
}