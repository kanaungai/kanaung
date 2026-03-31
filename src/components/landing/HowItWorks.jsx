import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Upload your business knowledge",
    description:
      "Add your FAQs, product details, opening hours, location, delivery info, and other key customer-facing information.",
    label: "1–2 day setup",
  },
  {
    number: "02",
    title: "Kanaung generates natural Burmese replies",
    description:
      "Using your business knowledge, Kanaung handles real customer questions in natural Burmese — across web, Messenger, and Viber — without rigid scripts or fixed flows.",
    label: "24/7 automated replies",
  },
  {
    number: "03",
    title: "Handoff when needed",
    description:
      "Complex or high-value conversations are routed to your team with full context, so nothing important gets lost.",
    label: "Human-in-the-loop",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[hsl(220_25%_6%)]">
      <div className="max-w-[1200px] mx-auto px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/30 mb-6">
            How It Works
          </p>
          <div className="w-full h-px bg-white/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[44px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.06] text-white">
              Launch Burmese AI customer service in three steps.
            </h2>
            <p className="text-[16px] text-white/50 leading-[1.8] md:pt-2 max-w-md font-inter">
              Kanaung turns your business knowledge into an LLM-powered Burmese customer service assistant — more natural than scripted bots, deployed across web, Messenger, and Viber, with human handoff when needed.
            </p>
          </div>
        </motion.div>

        {/* ── Steps container ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-white/[0.08] overflow-hidden"
          style={{
            background: "linear-gradient(160deg, hsl(220 22% 10%) 0%, hsl(220 22% 8%) 100%)",
          }}
        >
          {/* Inner top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col p-8 md:p-10"
              >
                {/* Step number */}
                <span className="font-sora text-[11px] font-bold tracking-[0.12em] uppercase text-white/25 mb-8">
                  {step.number}
                </span>

                {/* Connector dot — desktop only */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-[52px] right-0 translate-x-1/2 w-2 h-2 rounded-full border-2 border-white/15 bg-[hsl(220_25%_6%)] z-10" />
                )}

                {/* Title */}
                <h3 className="font-sora text-[18px] font-semibold tracking-[-0.02em] text-white leading-snug mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-white/45 leading-[1.8] font-inter flex-1">
                  {step.description}
                </p>

                {/* Footer label */}
                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/25">
                    {step.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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