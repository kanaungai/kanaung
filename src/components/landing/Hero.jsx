import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LiveCallPanel from "./LiveCallPanel";
import { openCalendly } from "./CalendlyPopup";
import TryDemoButton from "./TryDemoButton";

const PROOF_PILLS = [
  { label: "Burmese-first" },
  { label: "Uses your business data" },
  { label: "Messenger + Viber + Web" },
  { label: "24/7 replies" },
];

const CHANNEL_ICONS = [
  {
    name: "Messenger",
    icon: (
      <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="url(#hc-msg)" />
        <defs>
          <linearGradient id="hc-msg" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B0FF" /><stop offset="1" stopColor="#006AFF" />
          </linearGradient>
        </defs>
        <path d="M24 8C15.163 8 8 14.716 8 23c0 4.557 2.057 8.627 5.322 11.42V40l5.586-2.853A16.08 16.08 0 0024 37.857C32.837 37.857 40 31.141 40 22.857 40 14.573 32.837 8 24 8zm1.392 19.392l-3.555-3.821-6.923 3.821 7.643-8.214 3.606 3.821 6.872-3.821-7.643 8.214z" fill="white" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    icon: (
      <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#25D366" />
        <path fillRule="evenodd" clipRule="evenodd" d="M34.603 13.365C32.022 10.783 28.614 9.355 24.987 9.354 17.512 9.354 11.433 15.432 11.43 22.908c-.001 2.371.619 4.685 1.794 6.719L11.32 36.646l7.183-1.868a13.468 13.468 0 006.474 1.636h.007c7.473 0 13.553-6.079 13.556-13.555.001-3.622-1.359-6.912-3.937-9.494zM24.987 34.116h-.006a11.184 11.184 0 01-5.761-1.553l-.413-.246-4.249 1.102 1.121-4.144-.27-.427a11.192 11.192 0 01-1.714-5.94c.002-6.211 5.07-11.277 11.284-11.277 3.007.001 5.832 1.172 7.962 3.304 2.13 2.132 3.298 4.958 3.297 7.922-.003 6.212-5.051 11.259-11.251 11.259zm6.183-8.343c-.337-.168-2.013-.992-2.322-1.103-.31-.112-.534-.168-.759.169-.225.337-.881 1.102-1.078 1.327-.197.225-.394.253-.731.085-.337-.168-1.413-.522-2.688-1.662-.994-.888-1.679-1.981-1.876-2.319-.197-.337-.021-.519.148-.686.152-.151.337-.394.506-.591.169-.197.226-.338.338-.563.112-.225.056-.422-.028-.59-.084-.169-.759-1.848-1.04-2.531-.275-.665-.554-.575-.76-.586-.196-.01-.421-.012-.646-.012-.225 0-.59.084-.899.421-.309.338-1.188 1.162-1.188 2.841s1.217 3.297 1.386 3.522c.168.225 2.387 3.616 5.758 5.095.801.346 1.428.552 1.917.705.804.252 1.536.216 2.114.13.644-.096 2.084-.807 2.375-1.589.29-.781.29-1.451.202-1.595-.084-.14-.309-.224-.646-.392z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Viber",
    icon: (
      <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#7360F2" />
        <path d="M34.5 13.6c-1.2-1.1-5.8-4.4-10.2-4.5-10.3-.2-13.1 8.4-13.2 13.3-.1 3 .5 8.5 5.5 11.4v3.6l3.3-3.3c7.5 1.2 13.2-2.3 14.2-7.5.9-4.8.6-11.3-1.6-13z" fill="white" fillOpacity="0.2" />
        <path d="M24.3 10.5c-9.2.1-11.6 7.4-11.7 11.8-.1 2.7.5 7.5 5 10l.1 2.7 2.4-2.4c6.6 1.1 11.6-2 12.5-6.6.8-4.3.5-10-1.4-11.6-1.1-1-4.2-3.9-6.9-3.9zm1.1 18.1s-.5-.1-.8-.4l-1.8-1.5c-.3-.3-.8-.4-1.1-.2-1 .6-2.1.3-2.9-.5l-1.6-1.6c-.8-.8-1.1-1.9-.5-2.9.2-.3.1-.8-.2-1.1L14.7 18c-.3-.3-.4-.8-.1-1.1.6-.8 1.6-1.3 2.5-1.2.5.1.9.3 1.3.7l4.4 4.4.2.2 2.5 2.5.2.2 1.2 1.2c.4.4.6.8.7 1.3.1.9-.4 1.9-1.2 2.5-.3.2-.5.2-.8.2l-.2-.1z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Website",
    icon: (
      <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#475569" />
        <circle cx="24" cy="24" r="11" stroke="white" strokeWidth="2" fill="none" />
        <ellipse cx="24" cy="24" rx="5" ry="11" stroke="white" strokeWidth="2" fill="none" />
        <path d="M13 24h22M13 19h22M13 29h22" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Google Sheets",
    icon: (
      <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#34A853" />
        <rect x="14" y="11" width="16" height="22" rx="2" fill="white" fillOpacity="0.2" />
        <rect x="16" y="13" width="12" height="18" rx="1" fill="white" />
        <path d="M18 17h8M18 20h8M18 23h8M18 26h5" stroke="#34A853" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: "Excel",
    icon: (
      <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="24" fill="#217346" />
        <path d="M14 14h12l8 5v15H14V14z" fill="white" fillOpacity="0.15" />
        <path d="M14 14h10v26H14V14zM24 14l10 5M24 14v26" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M17 20l4 4-4 4M22 28h5" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden">

      {/* Base: warm off-white */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "hsl(36 20% 97%)" }} />

      {/* Very faint grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Very faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg,transparent,transparent 79px,hsl(220 20% 35% / 0.055) 79px,hsl(220 20% 35% / 0.055) 80px),repeating-linear-gradient(0deg,transparent,transparent 79px,hsl(220 20% 35% / 0.04) 79px,hsl(220 20% 35% / 0.04) 80px)`,
          maskImage: "linear-gradient(to bottom,transparent 0%,black 8%,black 86%,transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom,transparent 0%,black 8%,black 86%,transparent 100%)",
        }}
      />

      {/* Soft left atmosphere */}
      <div className="absolute pointer-events-none" style={{ top: "-10%", left: "-15%", width: "70%", height: "100%", background: "radial-gradient(ellipse at 38% 44%, hsl(36 30% 93% / 0.8) 0%, transparent 60%)" }} />

      {/* Right radial glow behind demo */}
      <div className="absolute pointer-events-none" style={{ top: "0%", right: "-5%", width: "65%", height: "110%", background: "radial-gradient(ellipse at 62% 48%, hsl(352 40% 93% / 0.45) 0%, transparent 55%)" }} />

      <div className="relative max-w-[1200px] mx-auto px-8 w-full">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 xl:gap-20 items-center">

          {/* ── Left: headline + CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="inline-flex items-center self-start gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(20,18,14,0.04)", border: "1px solid rgba(20,18,14,0.08)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(352 60% 44%)", boxShadow: "0 0 6px hsl(352 60% 44% / 0.5)" }} />
              <span className="text-[10px] font-semibold tracking-[0.14em] uppercase font-inter" style={{ color: "hsl(220 18% 30%)" }}>
                AI Customer Service · Myanmar
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-sora text-[46px] md:text-[58px] xl:text-[66px] font-extrabold tracking-[-0.05em] leading-[0.97] text-foreground">
              The AI customer service agent built for Myanmar.
            </h1>

            {/* Subheading */}
            <p className="mt-7 text-[14.5px] md:text-[15px] leading-[1.85] max-w-[400px] font-inter font-normal tracking-[0.003em]" style={{ color: "hsl(220 12% 44%)" }}>
              Kanaung helps Myanmar businesses answer customers across web, Messenger, and Viber using their own product data, pricing, and policies.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openCalendly}
                className="inline-flex items-center justify-center gap-2 text-[13.5px] font-semibold px-6 h-[46px] rounded-lg transition-all duration-200 tracking-[-0.01em]"
                style={{ background: "hsl(220 25% 8%)", color: "white", boxShadow: "0 1px 2px rgba(0,0,0,0.1), 0 4px 12px -2px rgba(0,0,0,0.08)" }}
                onMouseEnter={e => e.currentTarget.style.background = "hsl(220 25% 4%)"}
                onMouseLeave={e => e.currentTarget.style.background = "hsl(220 25% 8%)"}
              >
                Book a Demo
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <TryDemoButton label="See it live" />
            </div>

            {/* Proof pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {PROOF_PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 text-[11.5px] font-medium font-inter px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(20,18,14,0.04)",
                    border: "1px solid rgba(20,18,14,0.08)",
                    color: "hsl(220 16% 36%)",
                  }}
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "hsl(352 55% 48%)" }} />
                  {pill.label}
                </span>
              ))}
            </motion.div>

            {/* Integration strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-10"
            >
              <p className="text-[9.5px] font-semibold tracking-[0.14em] uppercase mb-3 font-inter" style={{ color: "hsl(220 12% 54%)" }}>
                Works with your existing channels
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                {CHANNEL_ICONS.map((ch) => (
                  <div key={ch.name} className="flex items-center gap-1.5 opacity-55 hover:opacity-80 transition-opacity duration-200">
                    {ch.icon}
                    <span className="text-[11px] font-medium font-inter" style={{ color: "hsl(220 14% 40%)" }}>{ch.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: cinematic demo ── */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            {/* Decorative enterprise panels behind the demo */}
            <DecorativePanels />
            <LiveCallPanel />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Very low-opacity "enterprise context" panels decorating the background
function DecorativePanels() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Knowledge base panel — top left offset */}
      <div
        className="absolute"
        style={{
          top: "-14px", left: "-28px", width: 140, opacity: 0.28,
          background: "hsl(36 20% 96%)", border: "1px solid hsl(220 14% 88%)",
          borderRadius: 10, padding: "8px 10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(220 12% 54%)", marginBottom: 5 }}>Knowledge Base</p>
        {["Product Catalog", "Delivery Policy", "Pricing Sheet", "FAQ"].map((r) => (
          <div key={r} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
            <div style={{ width: 4, height: 4, borderRadius: 2, background: "hsl(142 50% 52%)", flexShrink: 0 }} />
            <span style={{ fontSize: 8.5, color: "hsl(220 14% 42%)" }}>{r}</span>
          </div>
        ))}
      </div>

      {/* Analytics panel — top right */}
      <div
        className="absolute"
        style={{
          top: "-10px", right: "-22px", width: 120, opacity: 0.22,
          background: "hsl(36 20% 96%)", border: "1px solid hsl(220 14% 88%)",
          borderRadius: 10, padding: "8px 10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(220 12% 54%)", marginBottom: 5 }}>This Week</p>
        {[{ l: "Resolved", v: "94%" }, { l: "Avg reply", v: "0.8s" }, { l: "Escalated", v: "6%" }].map((r) => (
          <div key={r.l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 8, color: "hsl(220 12% 52%)" }}>{r.l}</span>
            <span style={{ fontSize: 8, fontWeight: 600, color: "hsl(220 18% 28%)" }}>{r.v}</span>
          </div>
        ))}
      </div>

      {/* Channel connections — bottom left */}
      <div
        className="absolute"
        style={{
          bottom: "-12px", left: "-20px", width: 130, opacity: 0.24,
          background: "hsl(36 20% 96%)", border: "1px solid hsl(220 14% 88%)",
          borderRadius: 10, padding: "8px 10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <p style={{ fontSize: 7, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "hsl(220 12% 54%)", marginBottom: 5 }}>Channels</p>
        {[{ n: "Messenger", c: "#006AFF" }, { n: "Viber", c: "#7360F2" }, { n: "WhatsApp", c: "#25D366" }].map((ch) => (
          <div key={ch.n} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: ch.c, flexShrink: 0 }} />
            <span style={{ fontSize: 8.5, color: "hsl(220 14% 40%)" }}>{ch.n}</span>
            <span style={{ marginLeft: "auto", fontSize: 7, fontWeight: 600, color: "hsl(142 48% 44%)" }}>●</span>
          </div>
        ))}
      </div>
    </div>
  );
}