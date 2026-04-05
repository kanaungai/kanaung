import React from "react";
import { motion } from "framer-motion";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

// Faint ghost message bubbles — suggest unread/missed conversations
const GHOST_MESSAGES = [
  { w: 120, top: "8%",  left: "2%",  delay: 0,    opacity: 0.045 },
  { w: 80,  top: "18%", left: "8%",  delay: 0.6,  opacity: 0.03  },
  { w: 140, top: "30%", left: "1%",  delay: 1.2,  opacity: 0.04  },
  { w: 90,  top: "50%", left: "5%",  delay: 0.3,  opacity: 0.025 },
  { w: 110, top: "68%", left: "2%",  delay: 0.9,  opacity: 0.035 },
  { w: 100, top: "82%", left: "7%",  delay: 1.5,  opacity: 0.03  },
  { w: 130, top: "12%", right: "3%", delay: 0.4,  opacity: 0.04  },
  { w: 85,  top: "25%", right: "9%", delay: 1.0,  opacity: 0.03  },
  { w: 155, top: "42%", right: "2%", delay: 0.7,  opacity: 0.045 },
  { w: 95,  top: "58%", right: "6%", delay: 1.3,  opacity: 0.025 },
  { w: 120, top: "74%", right: "3%", delay: 0.2,  opacity: 0.035 },
  { w: 70,  top: "88%", right: "8%", delay: 1.6,  opacity: 0.03  },
];

function GhostBubble({ w, top, left, right, delay, opacity }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, opacity, opacity * 0.6, opacity] }}
      transition={{ duration: 4, delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="absolute pointer-events-none"
      style={{ top, left, right, width: w }}
    >
      <div
        className="h-3 rounded-full"
        style={{ background: "rgba(255,255,255,0.9)", width: "100%" }}
      />
      <div
        className="h-2.5 rounded-full mt-1.5"
        style={{ background: "rgba(255,255,255,0.7)", width: "65%" }}
      />
    </motion.div>
  );
}

export default function CostSection() {
  const { lang } = useLang();
  const tx = t[lang];
  const { ref: headerRef, inView: headerVisible } = useScrollReveal();
  const { ref: heroRef, inView: heroVisible } = useScrollReveal({ margin: "-80px" });
  const { ref: supportRef, inView: supportVisible } = useScrollReveal({ margin: "-40px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[hsl(220_25%_6%)]">

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_25%_4%)] via-[hsl(220_25%_7%)] to-[hsl(220_25%_6%)] pointer-events-none" />

      {/* Warm urgency glow — center top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none" style={{ background: "hsl(352 72% 38% / 0.09)", filter: "blur(120px)" }} />
      {/* Secondary cool glow — bottom, keeps it from being one-note */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full pointer-events-none" style={{ background: "hsl(220 60% 50% / 0.04)", filter: "blur(100px)" }} />

      {/* Ghost message bubbles — faint, suggest missed conversations */}
      {GHOST_MESSAGES.map((m, i) => (
        <GhostBubble key={i} {...m} />
      ))}

      <div className="relative max-w-[1200px] mx-auto px-8">

        {/* Section header */}
        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={REVEAL.primary}
          className="mb-16 md:mb-20"
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white/25 mb-6 font-inter">
            {tx.cost_eyebrow}
          </p>
          <div className="w-full h-px bg-white/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[48px] xl:text-[56px] font-extrabold tracking-[-0.05em] leading-[0.97] text-white">
              {tx.cost_h2}
            </h2>
            <motion.p
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ ...REVEAL.primary, delay: 0.12 }}
              className="text-[15px] text-white/45 leading-[1.8] md:pt-2 max-w-md font-inter tracking-[-0.005em]"
            >
              {tx.cost_sub}
            </motion.p>
          </div>
        </motion.div>

        {/* ── Hero stat: 21× ── */}
        <motion.div
          ref={heroRef}
          animate={{ opacity: heroVisible ? 1 : 0, y: heroVisible ? 0 : 24 }}
          initial={{ opacity: 0, y: 24 }}
          transition={REVEAL.card}
          className="relative rounded-2xl mb-4 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(220 22% 10%) 0%, hsl(220 22% 8%) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
          {/* Inner warm glow behind the number */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-48 rounded-full pointer-events-none" style={{ background: "hsl(352 72% 38% / 0.11)", filter: "blur(60px)" }} />

          <div className="relative px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row md:items-center gap-10 md:gap-20">

            {/* The dominant number */}
            <div className="flex-shrink-0 text-center md:text-left">
              <div
                className="font-sora font-extrabold tracking-[-0.07em] leading-none"
                style={{
                  fontSize: "clamp(88px, 14vw, 148px)",
                  background: "linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                21×
              </div>
              <p className="text-[10px] font-semibold tracking-[0.16em] uppercase mt-3 font-inter" style={{ color: "hsl(352 60% 62% / 0.8)" }}>
                {tx.cost_s1_label}
              </p>
            </div>

            {/* Divider — vertical on desktop */}
            <div className="hidden md:block w-px self-stretch" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div className="md:hidden h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

            {/* Explanation */}
            <div className="flex-1 max-w-lg">
              <p className="font-sora text-[20px] md:text-[24px] font-bold tracking-[-0.03em] text-white leading-[1.3] mb-4">
                {lang === "en"
                  ? "Respond within 5 minutes. Not 30."
                  : "မိနစ် ၅ အတွင်း ဖြေပါ။ မိနစ် ၃၀ မဟုတ်ပါ။"}
              </p>
              <p className="text-[14px] text-white/40 leading-[1.85] font-inter tracking-[-0.005em]">
                {tx.cost_s1_body}
              </p>

              {/* Narrative thread — the cost pipeline */}
              <div className="mt-8 flex items-center gap-3 flex-wrap">
                {[
                  lang === "en" ? "Inquiry arrives" : "မေးမြန်းချက် ရောက်သည်",
                  lang === "en" ? "No fast reply" : "မြန်မြန်မဖြေ",
                  lang === "en" ? "Customer moves on" : "ဖောက်သည် ထွက်သွားသည်",
                ].map((step, i, arr) => (
                  <React.Fragment key={step}>
                    <span
                      className="text-[11px] font-semibold font-inter px-3 py-1.5 rounded-full"
                      style={{
                        background: i === 0 ? "rgba(255,255,255,0.06)" : i === 1 ? "hsl(38 75% 46% / 0.12)" : "hsl(352 72% 38% / 0.12)",
                        color: i === 0 ? "rgba(255,255,255,0.45)" : i === 1 ? "hsl(38 75% 60%)" : "hsl(352 65% 62%)",
                        border: `1px solid ${i === 0 ? "rgba(255,255,255,0.07)" : i === 1 ? "hsl(38 75% 46% / 0.2)" : "hsl(352 72% 38% / 0.2)"}`,
                      }}
                    >
                      {step}
                    </span>
                    {i < arr.length - 1 && (
                      <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}>→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Supporting stats ── */}
        <div ref={supportRef} className="grid md:grid-cols-2 gap-4">
          {[
            { label: tx.cost_s2_label, stat: tx.cost_s2_stat, body: tx.cost_s2_body },
            { label: tx.cost_s3_label, stat: tx.cost_s3_stat, body: tx.cost_s3_body },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              animate={{ opacity: supportVisible ? 1 : 0, y: supportVisible ? 0 : 16 }}
              initial={{ opacity: 0, y: 16 }}
              transition={{ ...REVEAL.card, delay: 0.1 + i * REVEAL.stagger }}
              className="rounded-xl px-7 py-7 flex gap-6 items-start"
              style={{
                background: "hsl(220 22% 9%)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="font-sora font-extrabold tracking-[-0.05em] leading-none flex-shrink-0"
                style={{ fontSize: 52, color: "rgba(255,255,255,0.22)" }}
              >
                {item.stat}
              </div>
              <div>
                <p className="text-[9.5px] font-semibold tracking-[0.14em] uppercase text-white/22 mb-2 font-inter">
                  {item.label}
                </p>
                <p className="text-[13px] text-white/38 leading-[1.8] font-inter tracking-[-0.005em]">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ opacity: supportVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px bg-white/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}