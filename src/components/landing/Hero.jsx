import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LiveCallPanel from "./LiveCallPanel";
import { openCalendly } from "./CalendlyPopup";
import { useLang } from "../../lib/LanguageContext";
import { t } from "../../lib/translations";
import TryDemoButton from "./TryDemoButton";

const HERO_CHANNELS = [
  {
    name: "Messenger",
    color: "#006AFF",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="url(#hc-msg)"/><defs><linearGradient id="hc-msg" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse"><stop stopColor="#00B0FF"/><stop offset="1" stopColor="#006AFF"/></linearGradient></defs><path d="M24 8C15.163 8 8 14.716 8 23c0 4.557 2.057 8.627 5.322 11.42V40l5.586-2.853A15.9 15.9 0 0024 37.857C32.837 37.857 40 31.141 40 22.857 40 14.573 32.837 8 24 8zm1.392 19.392L21.837 23.57l-6.923 3.821 7.643-8.214 3.606 3.821 6.872-3.821-7.643 8.214z" fill="white"/></svg>
    ),
  },
  {
    name: "WhatsApp",
    color: "#25D366",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#25D366"/><path fillRule="evenodd" clipRule="evenodd" d="M34.603 13.365C32.022 10.783 28.614 9.355 24.987 9.354 17.512 9.354 11.433 15.432 11.43 22.908c-.001 2.371.619 4.685 1.795 6.719L11.32 36.646l7.183-1.868c1.96 1.071 4.2 1.635 6.477 1.636h.007c7.473 0 13.553-6.079 13.556-13.555.001-3.622-1.359-6.912-3.94-9.494zM24.987 34.116h-.006a11.47 11.47 0 01-5.761-1.554l-.413-.246-4.249 1.102 1.121-4.144-.269-.427a11.43 11.43 0 01-1.751-6.04c.002-6.211 5.07-11.277 11.284-11.277 3.007.001 5.832 1.172 7.962 3.304 2.129 2.132 3.298 4.958 3.297 7.922-.003 6.212-5.051 11.258-11.264 11.258zm6.183-8.343c-.337-.168-2.013-.992-2.322-1.103-.31-.112-.534-.168-.759.169-.224.337-.88 1.102-1.077 1.327-.198.225-.394.253-.731.085-.337-.168-1.413-.522-2.688-1.662-.994-.888-1.679-1.981-1.876-2.319-.196-.337-.02-.52.149-.687.152-.151.337-.394.505-.591.169-.197.225-.338.337-.563.112-.225.056-.422-.028-.59-.085-.168-.759-1.849-1.04-2.53-.275-.665-.553-.576-.76-.587l-.649-.012c-.224 0-.59.084-.9.422-.309.337-1.187 1.162-1.187 2.84 0 1.679 1.217 3.302 1.385 3.527.169.225 2.388 3.616 5.759 5.095.8.346 1.427.552 1.916.705.805.252 1.537.216 2.115.13.645-.096 2.085-.807 2.365-1.589.28-.781.28-1.464.196-1.604-.084-.14-.309-.224-.646-.392z" fill="white"/></svg>
    ),
  },
  {
    name: "Viber",
    color: "#7360F2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#7360F2"/><path d="M34.5 14.2C32.1 11.9 27.6 10 24 10c-3.6 0-8.1 1.9-10.5 4.2C11 16.8 10 20.5 10 24c0 3.3.8 6.4 2.3 8.9L10 38l5.4-2.2c2.3 1.2 5 1.9 7.8 1.9 8.3 0 15-5.8 15-13.7 0-3.5-1-7.2-3.7-9.8zM24 35.2c-2.5 0-4.9-.7-6.9-1.9l-.5-.3-3.2 1.3 1.3-3-.4-.5C13 29 12.2 26.6 12.2 24c0-6.5 5.3-11.8 11.8-11.8 6.5 0 11.8 5.3 11.8 11.8 0 6.5-5.3 11.2-11.8 11.2zm6.5-8.8c-.4-.2-2.1-1-2.4-1.1-.3-.1-.6-.2-.8.2-.2.4-.9 1.1-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.5-.6-2.9-1.8-1.1-1-1.8-2.2-2-2.5-.2-.4 0-.6.1-.7.1-.1.4-.4.5-.6.1-.2.2-.4.3-.6.1-.2.1-.4 0-.6-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.3 3.3 1.4 3.6c.2.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .7.8.3 1.6.2 2.2.1.7-.1 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.1-.2-.3-.3-.5-.4z" fill="white"/></svg>
    ),
  },
  {
    name: "Facebook",
    color: "#1877F2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#1877F2"/><path d="M33 24c0-4.971-4.029-9-9-9s-9 4.029-9 9c0 4.496 3.291 8.212 7.594 8.892V26.656H20.31V24h2.284v-1.981c0-2.253 1.338-3.495 3.39-3.495.98 0 2.007.175 2.007.175v2.213h-1.131c-1.117 0-1.453.671-1.453 1.36V24h2.48l-.387 2.656H25.41v6.236C29.709 32.212 33 28.496 33 24z" fill="white"/></svg>
    ),
  },
  {
    name: "Instagram",
    color: "#E1306C",
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none"><defs><radialGradient id="hc-ig" cx="30%" cy="107%" r="150%"><stop offset="0%" stopColor="#fdf497"/><stop offset="5%" stopColor="#fdf497"/><stop offset="45%" stopColor="#fd5949"/><stop offset="60%" stopColor="#d6249f"/><stop offset="90%" stopColor="#285AEB"/></radialGradient></defs><circle cx="24" cy="24" r="24" fill="url(#hc-ig)"/><rect x="14" y="14" width="20" height="20" rx="6" stroke="white" strokeWidth="2.2" fill="none"/><circle cx="24" cy="24" r="5.2" stroke="white" strokeWidth="2.2" fill="none"/><circle cx="30.5" cy="17.5" r="1.5" fill="white"/></svg>
    ),
  },
];

export default function Hero() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden">

      {/* Base surface */}
      <div className="absolute inset-0 bg-[hsl(220_22%_97%)] pointer-events-none" />

      {/* Cool neutral atmosphere — restrained, enterprise */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          left: "-20%",
          width: "90%",
          height: "120%",
          background: "radial-gradient(ellipse at 38% 44%, hsl(220 30% 93% / 0.9) 0%, hsl(220 25% 95% / 0.6) 32%, transparent 62%)",
        }}
      />

      {/* Secondary depth — very subtle warmth on the right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          right: "-10%",
          width: "60%",
          height: "85%",
          background: "radial-gradient(ellipse at 60% 35%, hsl(28 40% 94% / 0.55) 0%, transparent 58%)",
        }}
      />

      <style>{`
        @keyframes hero-channels {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>

      {/* Grid — vertical + horizontal lines, architectural canvas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 79px,
              hsl(220 25% 40% / 0.10) 79px,
              hsl(220 25% 40% / 0.10) 80px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 79px,
              hsl(220 25% 40% / 0.07) 79px,
              hsl(220 25% 40% / 0.07) 80px
            )
          `,
          maskImage: `linear-gradient(to bottom, transparent 0%, black 8%, black 86%, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 8%, black 86%, transparent 100%)`,
        }}
      />

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
              className="inline-flex items-center self-start gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(20, 22, 30, 0.04)", border: "1px solid rgba(20, 22, 30, 0.08)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(142 55% 44%)" }} />
              <span className="text-[10px] font-semibold tracking-[0.14em] uppercase font-inter" style={{ color: "hsl(220 20% 28%)" }}>
                {tx.hero_eyebrow}
              </span>
            </motion.div>

            <h1 className="font-sora text-[50px] md:text-[62px] xl:text-[72px] font-extrabold tracking-[-0.05em] leading-[0.96] text-foreground">
              {tx.hero_h1_1}<br />
              {tx.hero_h1_2}<br />
              <span className="text-[hsl(var(--foreground))]">{tx.hero_h1_3}</span>
            </h1>

            <p className="mt-8 text-[14.5px] md:text-[15.5px] text-muted-foreground leading-[1.85] max-w-[390px] font-inter font-normal tracking-[0.005em]">
              {tx.hero_sub}{" "}
              <span className="text-foreground/60 font-medium">{tx.hero_sub_bold}</span>
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openCalendly}
                className="inline-flex items-center justify-center gap-2 bg-foreground text-background text-[13.5px] font-semibold px-6 h-[46px] rounded-lg hover:bg-foreground/90 transition-all duration-200 tracking-[-0.01em]"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 4px 12px -2px rgba(0,0,0,0.06)" }}>
                {tx.hero_cta1}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <TryDemoButton label={tx.hero_cta2} />
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
                  <span className="font-sora text-[20px] font-bold text-foreground tracking-[-0.03em]">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium tracking-[0.04em] font-inter">
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
            {/* Scale down ~12% */}
            <div style={{ transform: "scale(0.88)", transformOrigin: "top center" }}>
              <LiveCallPanel />
            </div>

            {/* ── Inline channels strip ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-3"
              style={{ marginTop: "-5.5%" }}
            >
              <p className="text-center text-[9.5px] font-semibold tracking-[0.14em] uppercase font-inter mb-2.5" style={{ color: "rgba(20,22,30,0.28)" }}>
                Works with your existing channels
              </p>
              <div className="relative overflow-hidden" style={{ height: 44 }}>
                {/* Left fade */}
                <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, hsl(220 22% 97%) 0%, transparent 100%)" }} />
                {/* Right fade */}
                <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, hsl(220 22% 97%) 0%, transparent 100%)" }} />

                <div className="flex items-center" style={{ animation: "hero-channels 28s linear infinite", width: "max-content" }}>
                  {[...HERO_CHANNELS, ...HERO_CHANNELS, ...HERO_CHANNELS].map((ch, i) => (
                    <div key={i} className="flex items-center gap-2 mx-6 flex-shrink-0" style={{ opacity: 0.52 }}>
                      {ch.icon}
                      <span className="text-[12px] font-semibold font-inter tracking-[-0.01em]" style={{ color: ch.color }}>
                        {ch.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}