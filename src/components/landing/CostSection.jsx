import React from "react";
import { motion } from "framer-motion";

const STATS = [
  {
    label: "01 — Lost Qualification",
    stat: "21×",
    body: "Responding to a lead within 5 minutes instead of 30 can make the odds of qualification 21 times higher. Delay kills intent before it converts.",
  },
  {
    label: "02 — Expected Immediacy",
    stat: "77%",
    body: "Most customers expect to interact with someone immediately when they contact a company. Anything slower signals disorganisation.",
  },
  {
    label: "03 — Experience Drives Revenue",
    stat: "80%",
    body: "Customers say the experience a company provides is as important as its products and services. Service quality is now a commercial variable.",
  },
];

export default function CostSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[hsl(220_25%_6%)]">
      {/* Subtle dark texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_25%_4%)] via-[hsl(220_25%_7%)] to-[hsl(220_25%_6%)] pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-8">

        {/* ── Top row: label + headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          {/* Eyebrow */}
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-6">
            The Problem
          </p>

          {/* Full-width thin rule */}
          <div className="w-full h-px bg-white/8 mb-10" />

          {/* Headline */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[44px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.06] text-white">
              The hidden cost of missed customer messages.
            </h2>
            <p className="text-[16px] text-white/50 leading-[1.8] md:pt-2 max-w-md font-inter">
              In fast-moving, chat-first markets, slow replies and missed messages are not just an inconvenience — they directly reduce conversion, trust, and customer lifetime value.
            </p>
          </div>
        </motion.div>

        {/* ── Stats grid ── */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">
          {STATS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="pt-10 md:pt-0 md:px-10 first:md:pl-0 last:md:pr-0 pb-10 md:pb-0"
            >
              {/* Card number label */}
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30 mb-5">
                {item.label}
              </p>

              {/* Large stat */}
              <div className="font-sora text-[52px] md:text-[60px] font-bold tracking-[-0.04em] leading-none text-white mb-6">
                {item.stat}
              </div>

              {/* Thin divider */}
              <div className="w-8 h-px bg-white/20 mb-5" />

              {/* Body */}
              <p className="text-[14px] text-white/45 leading-[1.8] font-inter max-w-[280px]">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom rule */}
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