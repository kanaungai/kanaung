import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

export default function Pricing() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref: headerRef, inView: headerVisible } = useScrollReveal();
  const { ref: bodyRef, inView: bodyVisible } = useScrollReveal({ margin: "-60px" });

  return (
    <section id="pricing" className="py-24 md:py-36 relative">
      <div className="max-w-[1200px] mx-auto px-8">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={REVEAL.primary}
          className="mb-16 md:mb-20"
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60 mb-6 font-inter">
            {tx.price_eyebrow}
          </p>
          <div className="w-full h-px bg-foreground/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[30px] md:text-[48px] xl:text-[56px] font-extrabold tracking-[-0.05em] leading-[0.97] text-foreground">
              {tx.price_h2}
            </h2>
            <motion.p
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ ...REVEAL.primary, delay: 0.12 }}
              className="text-[15px] text-muted-foreground leading-[1.8] md:pt-2 max-w-md font-inter tracking-[-0.005em]"
            >
              {tx.price_sub}
            </motion.p>
          </div>
        </motion.div>

        {/* ── Plans ── */}
        <motion.div
          ref={bodyRef}
          animate={{ opacity: bodyVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.1 }}
        >
          {/* Top hairline */}
          <div className="w-full h-px bg-foreground/8 mb-0" />

          {/* ── Starter row ── */}
          <motion.div
            animate={{ opacity: bodyVisible ? 1 : 0, y: bodyVisible ? 0 : 12 }}
            initial={{ opacity: 0, y: 12 }}
            transition={{ ...REVEAL.primary, delay: 0.12 }}
            className="grid md:grid-cols-[1fr_1fr_auto] gap-8 md:gap-16 items-center py-10 border-b border-foreground/[0.07]"
          >
            {/* Name + tagline */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="font-sora text-[22px] font-extrabold tracking-[-0.04em] text-foreground">
                  {tx.price_p1_name}
                </h3>
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase font-inter text-muted-foreground/50">
                  {tx.price_p1_tier}
                </span>
              </div>
              <p className="text-[13px] text-muted-foreground font-inter leading-relaxed max-w-xs">
                {tx.price_p1_tag}
              </p>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2.5">
              {[tx.price_p1_f1, tx.price_p1_f2, tx.price_p1_f3].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <Check className="w-3 h-3 text-foreground/30 flex-shrink-0" />
                  <span className="text-[13px] text-foreground/60 font-inter">{f}</span>
                </li>
              ))}
            </ul>

            {/* Price + CTA */}
            <div className="flex md:flex-col items-center md:items-end gap-5 md:gap-3">
              <div className="flex items-baseline gap-1">
                <span className="font-sora text-[28px] font-bold tracking-[-0.04em] text-foreground">$99</span>
                <span className="text-[12px] text-muted-foreground font-inter">/ mo</span>
              </div>
              <button
                onClick={openCalendly}
                className="text-[12.5px] font-semibold font-inter px-5 py-2 rounded-full transition-all duration-200"
                style={{ border: "1.5px solid hsl(220 16% 80%)", color: "hsl(220 25% 22%)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "hsl(220 16% 96%)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                {tx.price_cta1}
              </button>
            </div>
          </motion.div>

          {/* ── Growth row — hero ── */}
          <motion.div
            animate={{ opacity: bodyVisible ? 1 : 0, y: bodyVisible ? 0 : 12 }}
            initial={{ opacity: 0, y: 12 }}
            transition={{ ...REVEAL.primary, delay: 0.2 }}
            className="grid md:grid-cols-[1fr_1fr_auto] gap-8 md:gap-16 items-center py-10 border-b border-foreground/[0.07] relative"
          >
            {/* Subtle left accent bar */}
            <div
              className="absolute left-0 top-4 bottom-4 w-[2.5px] rounded-r-full hidden md:block"
              style={{ background: "hsl(220 25% 14%)" }}
            />

            {/* Name + tagline */}
            <div className="md:pl-5">
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="font-sora text-[22px] font-extrabold tracking-[-0.04em] text-foreground">
                  {tx.price_p2_name}
                </h3>
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase font-inter" style={{ color: "hsl(220 25% 40%)" }}>
                  {tx.price_p2_tier}
                </span>
              </div>
              <p className="text-[13px] text-muted-foreground font-inter leading-relaxed max-w-xs">
                {tx.price_p2_tag}
              </p>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2.5">
              {[tx.price_p2_f1, tx.price_p2_f2, tx.price_p2_f3, tx.price_p2_f4].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <Check className="w-3 h-3 flex-shrink-0" style={{ color: "hsl(220 25% 22%)" }} />
                  <span className="text-[13px] font-inter font-medium" style={{ color: "hsl(220 20% 18%)" }}>{f}</span>
                </li>
              ))}
            </ul>

            {/* Price + CTA */}
            <div className="flex md:flex-col items-center md:items-end gap-5 md:gap-3">
              <div className="flex items-baseline gap-1">
                <span className="font-sora text-[28px] font-bold tracking-[-0.04em] text-foreground">$199</span>
                <span className="text-[12px] text-muted-foreground font-inter">/ mo</span>
              </div>
              <button
                onClick={openCalendly}
                className="group inline-flex items-center gap-2 text-[12.5px] font-bold font-inter px-5 py-2 rounded-full transition-all duration-200"
                style={{ background: "hsl(220 25% 12%)", color: "white" }}
                onMouseEnter={e => { e.currentTarget.style.background = "hsl(220 25% 8%)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "hsl(220 25% 12%)"; }}
              >
                {tx.price_cta1}
                <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>

          {/* ── Enterprise row ── */}
          <motion.div
            animate={{ opacity: bodyVisible ? 1 : 0, y: bodyVisible ? 0 : 12 }}
            initial={{ opacity: 0, y: 12 }}
            transition={{ ...REVEAL.primary, delay: 0.28 }}
            className="grid md:grid-cols-[1fr_1fr_auto] gap-8 md:gap-16 items-center py-10"
          >
            {/* Name + tagline */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="font-sora text-[22px] font-extrabold tracking-[-0.04em] text-foreground">
                  {tx.price_p3_name}
                </h3>
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase font-inter text-muted-foreground/50">
                  {tx.price_p3_tier}
                </span>
              </div>
              <p className="text-[13px] text-muted-foreground font-inter leading-relaxed max-w-xs">
                {tx.price_p3_tag}
              </p>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-2.5">
              {[tx.price_p3_f1, tx.price_p3_f2, tx.price_p3_f3].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <Check className="w-3 h-3 text-foreground/30 flex-shrink-0" />
                  <span className="text-[13px] text-foreground/60 font-inter">{f}</span>
                </li>
              ))}
            </ul>

            {/* Price + CTA */}
            <div className="flex md:flex-col items-center md:items-end gap-5 md:gap-3">
              <div>
                <span className="font-sora text-[20px] font-bold tracking-[-0.04em] text-foreground/60">Custom</span>
              </div>
              <button
                onClick={openCalendly}
                className="text-[12.5px] font-semibold font-inter px-5 py-2 rounded-full transition-all duration-200 text-muted-foreground"
                style={{ border: "1.5px solid hsl(220 16% 80%)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "hsl(220 16% 96%)"; e.currentTarget.style.color = "hsl(220 25% 18%)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ""; }}
              >
                {tx.price_cta2}
              </button>
            </div>
          </motion.div>

          {/* Bottom hairline + note */}
          <div className="w-full h-px bg-foreground/8 mb-8" />
          <motion.p
            animate={{ opacity: bodyVisible ? 1 : 0 }}
            initial={{ opacity: 0 }}
            transition={{ ...REVEAL.fade, delay: 0.36 }}
            className="text-[12px] text-muted-foreground/60 font-inter"
          >
            {tx.price_trial}
          </motion.p>
        </motion.div>

        {/* Section bottom rule */}
        <motion.div
          animate={{ opacity: bodyVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.44 }}
          className="w-full h-px bg-foreground/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}