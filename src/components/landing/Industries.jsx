import React from "react";
import { motion } from "framer-motion";

const CARDS = [
  {
    industry: "Restaurants",
    scenario: "A customer asks to pre-order for 20 guests tomorrow and wants the full menu sent over.",
  },
  {
    industry: "Car Dealerships",
    scenario: "A buyer messages at midnight asking about installment plans on a specific model.",
  },
  {
    industry: "Real Estate",
    scenario: "A renter wants listings under budget in a specific township, with photos.",
  },
  {
    industry: "Retail & E-commerce",
    scenario: "A shopper asks if an item is in stock and how long delivery takes.",
  },
];

export default function Industries() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-6">
            Industries
          </p>
          <div className="w-full h-px bg-foreground/8 mb-10" />
          <h2 className="font-sora text-[36px] md:text-[44px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.06] text-foreground">
            Built for the businesses Myanmar runs on.
          </h2>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.industry}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col p-8 md:p-10 rounded-2xl border border-foreground/[0.07] overflow-hidden"
              style={{
                background: "linear-gradient(160deg, hsl(220 22% 98.5%) 0%, hsl(220 16% 96%) 100%)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/8 to-transparent pointer-events-none" />
              <h3 className="font-sora text-[17px] font-semibold tracking-[-0.02em] text-foreground leading-snug mb-4">
                {card.industry}
              </h3>
              <p className="text-[14px] text-muted-foreground leading-[1.75] font-inter">
                {card.scenario}
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