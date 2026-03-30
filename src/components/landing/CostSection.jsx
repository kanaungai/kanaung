import React from "react";
import { motion } from "framer-motion";

const STATS = [
  {
    title: "Leads Go Cold",
    stat: "< 5 min",
    body: "Businesses are far more likely to convert inbound enquiries when they reply within minutes. Every hour of delay reduces intent — and revenue.",
  },
  {
    title: "After-Hours Demand",
    stat: "24 / 7",
    body: "Customer questions do not stop after working hours. Without automation, valuable enquiries go unanswered overnight and on weekends.",
  },
  {
    title: "Repeat Questions",
    stat: "70%+",
    body: "The majority of inbound messages are repetitive — pricing, availability, location, hours, and delivery. Answering them manually is expensive.",
  },
];

export default function CostSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Very subtle background tint shift */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background pointer-events-none" />

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
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-6">
            The Problem
          </p>

          {/* Full-width thin rule */}
          <div className="w-full h-px bg-foreground/8 mb-10" />

          {/* Headline */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[44px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.06] text-foreground">
              The hidden cost of missed customer messages.
            </h2>
            <p className="text-[16px] text-muted-foreground leading-[1.8] md:pt-2 max-w-md font-inter">
              In Myanmar's fast-moving, chat-first market, slow replies and missed messages are not just an inconvenience — they are a direct cost to revenue, trust, and growth.
            </p>
          </div>
        </motion.div>

        {/* ── Stats grid ── */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/8">
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
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground/60 mb-5">
                0{i + 1} — {item.title}
              </p>

              {/* Large stat */}
              <div className="font-sora text-[52px] md:text-[60px] font-bold tracking-[-0.04em] leading-none text-foreground mb-6">
                {item.stat}
              </div>

              {/* Thin divider */}
              <div className="w-8 h-px bg-primary/40 mb-5" />

              {/* Body */}
              <p className="text-[14px] text-muted-foreground leading-[1.8] font-inter max-w-[280px]">
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
          className="w-full h-px bg-foreground/8 mt-16 md:mt-20"
        />

      </div>
    </section>
  );
}