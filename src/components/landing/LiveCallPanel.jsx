import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";

const CONVERSATION = [
  {
    role: "ai",
    text: "မင်္ဂလာပါ။ ရွှေကြယ် စက်ပစ္စည်းဆိုင်မှ ကြိုဆိုပါတယ်။ ဘာများ ကူညီပေးရမလဲ?",
    evidence: null,
  },
  {
    role: "customer",
    text: "Mini Excavator EX55 model ရှိသေးလား? ဈေးနှုန်းပြောပြပါ",
  },
  {
    role: "ai",
    text: "ဟုတ်ကဲ့၊ EX55 လက်ရှိ stock ရှိပါတယ်။ ကျပ် ၂၈၀ သိန်းမှ စတင်ပြီး အရောင် ၂ မျိုး ရရှိနိုင်ပါတယ်။",
    evidence: { rows: [{ label: "Stock", value: "Available" }, { label: "Price from", value: "280 သိန်း" }], source: "Inventory & Price List" },
  },
  {
    role: "customer",
    text: "ရန်ကုန်ကို delivery ဘယ်လောက်ကြာမလဲ?",
  },
  {
    role: "ai",
    text: "ရန်ကုန်အတွင်း ၃–၅ ရက်အတွင်း ရောက်ပါတယ်။ Standard delivery အခမဲ့ ပေးပါတယ်။",
    evidence: { rows: [{ label: "Delivery", value: "3–5 days · Free" }], source: "Delivery Policy" },
  },
  {
    role: "customer",
    text: "Financing option ရှိသလား?",
  },
  {
    role: "ai",
    text: "ဟုတ်ကဲ့၊ အရစ်ကျ ငွေပေးချေမှု ရရှိနိုင်ပါတယ်။ အသေးစိတ်အတွက် ကျွန်တော်တို့ team နှင့် တိုက်ရိုက် ဆက်သွယ်နိုင်ပါတယ်။",
    evidence: { rows: [{ label: "Financing", value: "Available" }], source: "Financing Options" },
  },
];

const STATUS_LABELS = [
  "Checking inventory and pricing",
  "Referencing business knowledge",
  "Drafting Burmese response",
  "Generating grounded reply",
];

function EvidenceFooter({ evidence }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.2 }}
      style={{
        marginTop: 5,
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.028)",
        alignSelf: "flex-start",
        minWidth: 190,
      }}
    >
      {evidence.rows.map((row, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "4px 10px",
            borderBottom: i < evidence.rows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}
        >
          <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.28)", fontWeight: 500, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
            {row.label}
          </span>
          <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.62)", fontWeight: 600, whiteSpace: "nowrap" }}>
            {row.value}
          </span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "3px 10px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.012)",
        }}
      >
        <BookOpen style={{ width: 8, height: 8, color: "rgba(255,255,255,0.22)", flexShrink: 0 }} />
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", fontWeight: 500, letterSpacing: "0.02em" }}>
          {evidence.source}
        </span>
      </div>
    </motion.div>
  );
}

function AIAvatar() {
  return (
    <div
      style={{
        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
        background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.09)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <img
        src="/kanaung-mark.svg"
        alt="AI"
        style={{ width: 14, height: 14, objectFit: "contain", filter: "brightness(0) invert(1) opacity(0.7)" }}
      />
    </div>
  );
}

function ActivityBars({ isActive }) {
  const bars = [8, 18, 12, 24, 10, 20, 14, 22, 8, 16];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 18 }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          style={{ width: 2, height: h, borderRadius: 2, transformOrigin: "center", background: isActive ? "linear-gradient(to top, hsl(352 65% 46% / 0.5), hsl(352 55% 62% / 0.8))" : "rgba(255,255,255,0.1)" }}
          animate={isActive ? { scaleY: [0.25, 1, 0.4, 0.9, 0.2, 0.8, 0.45] } : { scaleY: 0.2 }}
          transition={isActive ? { duration: 2.4, repeat: Infinity, delay: i * 0.11, ease: "easeInOut" } : { duration: 0.4 }}
        />
      ))}
    </div>
  );
}

function AmbientPulse() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {[0, 0.4, 0.8].map((delay, i) => (
        <motion.div
          key={i}
          style={{ width: 4, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.3)" }}
          animate={{ opacity: [0.12, 0.4, 0.12] }}
          transition={{ duration: 2.2, repeat: Infinity, delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function GenerationStrip({ isActive, statusLabel }) {
  return (
    <div
      style={{
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <span style={{
          width: 6, height: 6, borderRadius: "50%", flexShrink: 0, display: "inline-block",
          background: isActive ? "hsl(352 65% 52%)" : "rgba(255,255,255,0.16)",
          boxShadow: isActive ? "0 0 8px hsl(352 65% 52% / 0.5)" : "none",
          transition: "background 0.4s, box-shadow 0.4s",
        }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={statusLabel + String(isActive)}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 10, fontWeight: 500, fontFamily: "var(--font-inter)", color: isActive ? "rgba(255,255,255,0.36)" : "rgba(255,255,255,0.2)", letterSpacing: "-0.005em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {isActive ? statusLabel : "Monitoring · Kanaung AI"}
          </motion.span>
        </AnimatePresence>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        {!isActive && <AmbientPulse />}
        <ActivityBars isActive={isActive} />
      </div>
    </div>
  );
}

export default function LiveCallPanel({ compact = false }) {
  const [runKey, setRunKey] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState(STATUS_LABELS[0]);
  const containerRef = useRef(null);
  const statusCycleRef = useRef(null);

  useEffect(() => {
    if (!isTyping) { clearInterval(statusCycleRef.current); return; }
    let idx = 0;
    statusCycleRef.current = setInterval(() => {
      idx = (idx + 1) % STATUS_LABELS.length;
      setStatusLabel(STATUS_LABELS[idx]);
    }, 1400);
    return () => clearInterval(statusCycleRef.current);
  }, [isTyping]);

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    async function run() {
      await sleep(1000);
      for (let i = 0; i < CONVERSATION.length; i++) {
        if (cancelled) return;
        const msg = CONVERSATION[i];
        if (msg.role === "customer") {
          setVisibleMessages((prev) => [...prev, msg]);
          await sleep(900 + Math.random() * 200);
        } else {
          setIsTyping(true);
          await sleep(16);
          if (cancelled) return;
          await sleep(1600 + Math.min(msg.text.length * 7, 550) + Math.random() * 300);
          if (cancelled) return;
          setIsTyping(false);
          await sleep(120);
          if (cancelled) return;
          setVisibleMessages((prev) => [...prev, msg]);
          await sleep(1400 + Math.min(msg.text.length * 8, 500) + Math.random() * 300);
        }
      }
      await sleep(4000);
      if (!cancelled) { setVisibleMessages([]); setIsTyping(false); setRunKey((k) => k + 1); }
    }

    run();
    return () => { cancelled = true; };
  }, [runKey]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleMessages]);

  return (
    <div className="relative w-full" style={{ zIndex: 1 }}>
      {/* Premium glow — deeper ruby */}
      <div className="absolute pointer-events-none" style={{ inset: -20, borderRadius: 40, background: "hsl(352 60% 40% / 0.07)", filter: "blur(36px)" }} />
      <div className="absolute pointer-events-none" style={{ inset: -6, borderRadius: 34, background: "radial-gradient(ellipse at 60% 30%, hsl(352 55% 44% / 0.06) 0%, transparent 65%)", filter: "blur(18px)" }} />

      {/* Panel */}
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 20,
          background: "linear-gradient(148deg, hsl(220 18% 9%) 0%, hsl(220 22% 7%) 50%, hsl(220 18% 8%) 100%)",
          border: "1px solid rgba(255,255,255,0.075)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.25), 0 24px 60px -12px rgba(0,0,0,0.45), 0 8px 24px -6px rgba(0,0,0,0.28)",
        }}
      >
        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }} />

        {/* Header */}
        <div style={{ padding: "14px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Logo mark */}
            <div style={{ position: "relative", width: 30, height: 30, flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: "hsl(352 65% 44% / 0.18)", filter: "blur(4px)" }} />
              <div style={{ position: "relative", width: 30, height: 30, borderRadius: 8, background: "hsl(220 22% 11%)", border: "1px solid rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src="/kanaung-mark.svg"
                  alt="Kanaung"
                  style={{ width: 15, height: 15, objectFit: "contain", filter: "brightness(0) invert(1) opacity(0.88)" }}
                />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.88)", fontFamily: "var(--font-sora)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                Kanaung AI
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.24)", fontFamily: "var(--font-inter)", marginTop: 1, letterSpacing: "0.005em" }}>
                ရွှေကြယ် စက်ပစ္စည်း · Business Assistant
              </div>
            </div>
          </div>
          {/* Live badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 9px", borderRadius: 99, background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.13)" }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block" }}
            />
            <span style={{ fontSize: 9, fontWeight: 700, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-inter)" }}>Live</span>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={containerRef}
          style={{ padding: "18px 20px 12px", height: compact ? 320 : 440, overflowY: "auto", scrollbarWidth: "none", display: "flex", flexDirection: "column", gap: 14 }}
        >
          <style>{`@keyframes typingBounce{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-5px);opacity:1}}`}</style>

          <AnimatePresence initial={false}>
            {visibleMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, ease: [0.25, 1, 0.4, 1] }}
                style={{ display: "flex", alignItems: "flex-end", gap: 8, justifyContent: msg.role === "ai" ? "flex-start" : "flex-end" }}
              >
                {msg.role === "ai" && <AIAvatar />}
                <div style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "ai" ? "flex-start" : "flex-end", maxWidth: "82%" }}>
                  <div
                    style={
                      msg.role === "ai"
                        ? {
                            padding: "10px 13px",
                            borderRadius: "14px 14px 14px 4px",
                            fontSize: 13,
                            lineHeight: 1.72,
                            fontFamily: "var(--font-inter)",
                            color: "rgba(255,255,255,0.80)",
                            background: "rgba(255,255,255,0.055)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                        : {
                            padding: "10px 13px",
                            borderRadius: "14px 14px 4px 14px",
                            fontSize: 13,
                            lineHeight: 1.72,
                            fontFamily: "var(--font-inter)",
                            color: "rgba(255,255,255,0.94)",
                            background: "linear-gradient(135deg, hsl(352 62% 42%) 0%, hsl(352 58% 36%) 100%)",
                            boxShadow: "0 3px 16px hsl(352 65% 36% / 0.28)",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                  {msg.role === "ai" && msg.evidence && <EvidenceFooter evidence={msg.evidence} />}
                </div>
                {msg.role === "customer" && (
                  <div style={{ width: 24, height: 24, borderRadius: 7, background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.28)" }}>U</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: "flex", alignItems: "flex-end", gap: 8 }}
              >
                <AIAvatar />
                <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", padding: "9px 13px", borderRadius: "14px 14px 14px 4px", display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 150, 300].map((delay, i) => (
                    <span key={i} style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.65)", animation: "typingBounce 1.2s ease-in-out infinite", animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer strip */}
        <GenerationStrip isActive={isTyping} statusLabel={statusLabel} />

        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.035),transparent)" }} />
      </div>
    </div>
  );
}
