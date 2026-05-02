import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

function TierRow({ index, name, tier, tagline, price, period, features, inherits, cta, ctaStyle, accent, delay, visible }) {
  const isPrimary = ctaStyle === "primary";
  const isMuted = ctaStyle === "muted";

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ ...REVEAL.primary, delay }}
      className="grid md:grid-cols-[80px_1.15fr_1.35fr_auto] gap-6 md:gap-10 items-start py-12 border-b border-foreground/[0.07] relative"
    >
      {/* Row index */}
      <div className="hidden md:block pt-1">
        <span className="font-sora text-[13px] font-semibold tabular-nums tracking-[0.08em]" style={{ color: accent ? "hsl(220 25% 22%)" : "hsl(220 14% 62%)" }}>
          {index}
        </span>
      </div>

      {/* Name + tier label + tagline */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="font-sora text-[22px] md:text-[24px] font-extrabold tracking-[-0.035em] text-foreground leading-none">
            {name}
          </h3>
          <span
            className="text-[9.5px] font-semibold tracking-[0.14em] uppercase font-inter px-2 py-0.5 rounded"
            style={
              accent
                ? { color: "hsl(220 25% 22%)", background: "hsl(220 20% 92%)" }
                : { color: "hsl(220 12% 54%)", background: "transparent", border: "1px solid hsl(220 16% 88%)" }
            }
          >
            {tier}
          </span>
        </div>
        <p className="text-[13px] text-muted-foreground font-inter leading-[1.7] max-w-[280px]">
          {tagline}
        </p>
      </div>

      {/* Features */}
      <div>
        {inherits && (
          <p className="text-[11px] font-semibold tracking-[0.08em] uppercase font-inter mb-3" style={{ color: "hsl(220 14% 52%)" }}>
            {inherits}
          </p>
        )}
        <ul className="flex flex-col gap-2">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span
                className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: accent ? "hsl(220 25% 22%)" : "hsl(220 14% 62%)" }}
              />
              <span className={`text-[13.5px] font-inter leading-[1.65] ${accent ? "text-foreground/85 font-medium" : "text-foreground/65"}`}>
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price + CTA */}
      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-5 md:gap-4 md:min-w-[160px]">
        <div className="flex items-baseline gap-1">
          <span className="font-sora text-[30px] font-bold tracking-[-0.04em] leading-none text-foreground">
            {price}
          </span>
          {period && (
            <span className="text-[12px] text-muted-foreground font-inter">{period}</span>
          )}
        </div>
        <button
          onClick={openCalendly}
          className={`group inline-flex items-center justify-center gap-1.5 text-[12.5px] font-semibold font-inter px-4 h-[36px] rounded-lg transition-all duration-200 whitespace-nowrap ${
            isPrimary ? "" : isMuted ? "" : ""
          }`}
          style={
            isPrimary
              ? { background: "hsl(220 25% 10%)", color: "white", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }
              : isMuted
              ? { color: "hsl(220 18% 32%)", background: "transparent", border: "1px solid hsl(220 16% 82%)" }
              : { color: "hsl(220 18% 32%)", background: "transparent", border: "1px solid hsl(220 16% 82%)" }
          }
          onMouseEnter={e => {
            if (isPrimary) e.currentTarget.style.background = "hsl(220 25% 6%)";
            else e.currentTarget.style.background = "hsl(220 16% 96%)";
          }}
          onMouseLeave={e => {
            if (isPrimary) e.currentTarget.style.background = "hsl(220 25% 10%)";
            else e.currentTarget.style.background = "transparent";
          }}
        >
          {cta}
          <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref: headerRef, inView: headerVisible } = useScrollReveal();
  const { ref: bodyRef, inView: bodyVisible } = useScrollReveal({ margin: "-60px" });

  const tiers = [
    {
      index: "01",
      name: tx.price_p1_name,
      tier: tx.price_p1_tier,
      tagline: tx.price_p1_tag,
      price: "$99",
      period: "/ mo",
      inherits: null,
      features: [tx.price_p1_f1, tx.price_p1_f2, tx.price_p1_f3],
      cta: tx.price_cta1,
      ctaStyle: "secondary",
      accent: false,
    },
    {
      index: "02",
      name: tx.price_p2_name,
      tier: tx.price_p2_tier,
      tagline: tx.price_p2_tag,
      price: "$199",
      period: "/ mo",
      inherits: tx.price_p2_inherits,
      features: [tx.price_p2_f1, tx.price_p2_f2, tx.price_p2_f3, tx.price_p2_f4],
      cta: tx.price_cta1,
      ctaStyle: "primary",
      accent: true,
    },
    {
      index: "03",
      name: tx.price_p3_name,
      tier: tx.price_p3_tier,
      tagline: tx.price_p3_tag,
      price: "Custom",
      period: "",
      inherits: tx.price_p3_inherits,
      features: [tx.price_p3_f1, tx.price_p3_f2, tx.price_p3_f3],
      cta: tx.price_cta2,
      ctaStyle: "muted",
      accent: false,
    },
  ];

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

        {/* ── Tiers ── */}
        <div ref={bodyRef} style={{ borderTop: "1px solid hsl(var(--foreground) / 0.08)" }}>
          {tiers.map((tier, i) => (
            <TierRow
              key={tier.name}
              {...tier}
              delay={0.12 + i * 0.08}
              visible={bodyVisible}
            />
          ))}
        </div>

        {/* ── Footnote row ── */}
        <motion.div
          animate={{ opacity: bodyVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-8"
        >
          <p className="text-[12px] text-muted-foreground/70 font-inter tracking-[0.005em]">
            {tx.price_trial}
          </p>
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground/50 font-inter">
            {tx.price_footer_note}
          </p>
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
