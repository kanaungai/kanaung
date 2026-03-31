import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";

export default function Pricing() {
  const { lang } = useLang();
  const tx = t[lang];

  const PLANS = [
    {
      name: tx.price_p1_name,
      tagline: tx.price_p1_tag,
      price: "$99",
      period: "/ month",
      features: [
        "1 channel (Messenger or Viber)",
        "500 conversations / month",
        "Business knowledge base",
        "Burmese AI responses",
        "Basic analytics",
      ],
      cta: tx.price_cta1,
      highlighted: false,
    },
    {
      name: tx.price_p2_name,
      tagline: tx.price_p2_tag,
      price: "$199",
      period: "/ month",
      badge: tx.price_p2_badge,
      features: [
        "Everything in Starter, plus:",
        "3 channels (Messenger, Viber, Web)",
        "2,000 conversations / month",
        "Operations dashboard",
        "Escalation & human handoff",
        "Conversation analytics & export",
      ],
      cta: tx.price_cta1,
      highlighted: true,
    },
    {
      name: tx.price_p3_name,
      tagline: tx.price_p3_tag,
      price: "Custom",
      period: "",
      features: [
        "Everything in Growth, plus:",
        "Unlimited conversations",
        "Multiple locations",
        "Custom integrations",
        "Dedicated onboarding",
        "Priority support",
      ],
      cta: tx.price_cta2,
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-6">
            {tx.price_eyebrow}
          </p>
          <div className="w-full h-px bg-foreground/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[44px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.06] text-foreground">
              {tx.price_h2}
            </h2>
            <p className="text-[16px] text-muted-foreground leading-[1.8] md:pt-2 max-w-md font-inter">
              {tx.price_sub}
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.05 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col rounded-2xl p-8"
              style={
                plan.highlighted
                  ? {
                      background: "white",
                      border: "1.5px solid hsl(352 72% 38% / 0.35)",
                      boxShadow: "0 0 0 4px hsl(352 72% 38% / 0.05), 0 16px 40px -8px hsl(220 25% 15% / 0.10)",
                    }
                  : {
                      background: "linear-gradient(160deg, hsl(220 22% 98.5%) 0%, hsl(220 16% 96%) 100%)",
                      border: "1px solid hsl(220 16% 88%)",
                    }
              }
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-8 right-8 h-px bg-primary/30 pointer-events-none" />
              )}

              {plan.badge && (
                <div className="mb-5 self-start">
                  <span
                    className="text-[10px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      background: "hsl(352 72% 38% / 0.08)",
                      color: "hsl(352 72% 38%)",
                      border: "1px solid hsl(352 72% 38% / 0.18)",
                    }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={plan.badge ? "" : "mt-0"}>
                <h3 className="font-sora text-[20px] font-bold tracking-[-0.02em] text-foreground">
                  {plan.name}
                </h3>
                <p className="text-[13px] text-muted-foreground mt-1.5 leading-snug font-inter">
                  {plan.tagline}
                </p>
              </div>

              <div className="mt-8 mb-8 pb-8 border-b border-foreground/[0.07]">
                <div className="flex items-end gap-1.5">
                  <span className="font-sora text-[40px] font-bold tracking-[-0.04em] leading-none text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[14px] text-muted-foreground mb-1.5 font-inter">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 flex-1 mb-10">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    {f.endsWith(":") ? (
                      <span className="text-[12px] font-semibold text-foreground/40 tracking-wide uppercase leading-relaxed">
                        {f}
                      </span>
                    ) : (
                      <>
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: plan.highlighted ? "hsl(352 72% 38% / 0.08)" : "hsl(220 16% 90%)",
                          }}
                        >
                          <Check
                            className="w-2.5 h-2.5"
                            style={{ color: plan.highlighted ? "hsl(352 72% 38%)" : "hsl(220 18% 40%)" }}
                          />
                        </div>
                        <span className="text-[13.5px] text-foreground/75 leading-relaxed font-inter">
                          {f}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              <button
                onClick={openCalendly}
                className="w-full py-3 rounded-xl text-[13.5px] font-semibold tracking-[-0.01em] transition-all duration-200"
                style={
                  plan.highlighted
                    ? { background: "hsl(220 25% 11%)", color: "white" }
                    : { background: "transparent", color: "hsl(220 25% 18%)", border: "1.5px solid hsl(220 16% 82%)" }
                }
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-[13px] text-muted-foreground mt-10 font-inter"
        >
          {tx.price_trial}
        </motion.p>

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