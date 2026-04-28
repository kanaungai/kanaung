import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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

// ── Evidence footer: one clean block, not multiple pills ──
function EvidenceFooter({ evidence }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: 0.22 }}
      style={{
        marginTop: 5,
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.03)",
        alignSelf: "flex-start",
        minWidth: 180,
      }}
    >
      {/* Data rows */}
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
      {/* Source line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "3px 10px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <CheckCircle2 style={{ width: 8, height: 8, color: "hsl(142 55% 50% / 0.55)", flexShrink: 0 }} />
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontWeight: 500, letterSpacing: "0.02em" }}>
          {evidence.source}
        </span>
      </div>
    </motion.div>
  );
}

function AIAvatar() {
  return (
    <div
      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <img
        src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
        alt="AI"
        className="w-3.5 h-3.5 object-contain"
        style={{ filter: "brightness(0) invert(1) opacity(0.75)" }}
      />
    </div>
  );
}

// Waveform bars — more organic, fewer bars for cleaner look
function ActivityBars({ isActive }) {
  const bars = [8, 18, 12, 24, 10, 20, 14, 22, 8, 16];
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 18 }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          animate={isActive ? { scaleY: [0.25, 1, 0.4, 0.9, 0.2, 0.8, 0.45] } : { scaleY: 0.2 }}
          transition={
            isActive
              ? { duration: 2.4, repeat: Infinity, delay: i * 0.11, ease: "easeInOut" }
              : { duration: 0.4 }
          }
          style={{
            height: h,
            transformOrigin: "center",
            background: isActive
              ? "linear-gradient(to top, hsl(352 72% 48% / 0.5), hsl(352 60% 65% / 0.85))"
              : "rgba(255,255,255,0.12)",
          }}
        />
      ))}
    </div>
  );
}

// Always-on ambient pulse dots — give the idle strip life
function AmbientPulse() {
  return (
    <div className="flex items-center gap-1">
      {[0, 0.4, 0.8].map((delay, i) => (
        <motion.div
          key={i}
          className="w-1 h-1 rounded-full"
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 2.2, repeat: Infinity, delay, ease: "easeInOut" }}
          style={{ background: "rgba(255,255,255,0.35)" }}
        />
      ))}
    </div>
  );
}

function GenerationStrip({ isActive, statusLabel }) {
  return (
    <div
      className="px-5 py-3 flex items-center justify-between gap-4"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.055)",
        background: "rgba(255,255,255,0.012)",
      }}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Indicator dot */}
        <span
          className="flex-shrink-0"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            display: "inline-block",
            background: isActive ? "hsl(352 72% 52%)" : "rgba(255,255,255,0.18)",
            boxShadow: isActive ? "0 0 7px hsl(352 72% 52% / 0.55)" : "none",
            transition: "background 0.4s, box-shadow 0.4s",
          }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={statusLabel + String(isActive)}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.22 }}
            className="text-[10px] font-medium font-inter truncate tracking-[-0.005em]"
            style={{ color: isActive ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.22)" }}
          >
            {isActive ? statusLabel : "Monitoring · Kanaung AI"}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {!isActive && <AmbientPulse />}
        <ActivityBars isActive={isActive} />
      </div>
    </div>
  );
}

export default function LiveCallPanel() {
  const [runKey, setRunKey] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [statusLabel, setStatusLabel] = useState(STATUS_LABELS[0]);
  const containerRef = useRef(null);
  const statusCycleRef = useRef(null);

  useEffect(() => {
    if (!isTyping) {
      clearInterval(statusCycleRef.current);
      return;
    }
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

    async function runConversation() {
      await sleep(1200);

      for (let i = 0; i < CONVERSATION.length; i++) {
        if (cancelled) return;
        const msg = CONVERSATION[i];

        if (msg.role === "customer") {
          setVisibleMessages((prev) => [...prev, msg]);
          await sleep(1000 + Math.random() * 200);
        } else {
          setIsTyping(true);
          await sleep(16);
          if (cancelled) return;

          const charCount = msg.text.length;
          const typingDuration = 1800 + Math.min(charCount * 8, 600) + Math.random() * 400;
          await sleep(typingDuration);
          if (cancelled) return;

          setIsTyping(false);
          await sleep(150);
          if (cancelled) return;
          setVisibleMessages((prev) => [...prev, msg]);

          const readPause = 1600 + Math.min(charCount * 10, 600) + Math.random() * 400;
          await sleep(readPause);
        }
      }

      await sleep(4500);
      if (!cancelled) {
        setVisibleMessages([]);
        setIsTyping(false);
        setRunKey((k) => k + 1);
      }
    }

    runConversation();
    return () => { cancelled = true; };
  }, [runKey]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [visibleMessages]);

  return (
    <div className="relative w-full">
      {/* Ambient glow */}
      <div className="absolute -inset-5 rounded-[40px] bg-slate-900/[0.08] blur-3xl pointer-events-none" />
      <div className="absolute -inset-1 rounded-[34px] bg-gradient-to-br from-white/90 via-slate-200/40 to-primary/5 blur-xl pointer-events-none" />

      {/* Panel */}
      <div
        className="relative rounded-[26px] overflow-hidden"
        style={{
          background: "hsl(220 22% 98%)",
          border: "1px solid hsl(220 16% 84%)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 34px 90px -28px rgba(15,23,42,0.45), 0 14px 34px -24px rgba(15,23,42,0.35)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        {/* ── Header ── */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderBottom: "1px solid hsl(220 16% 87%)", background: "linear-gradient(180deg, white 0%, hsl(220 20% 97%) 100%)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0 mr-1">
              {[0, 1, 2].map((i) => <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(220 10% 82%)" }} />)}
            </div>
            <div className="relative w-8 h-8 flex-shrink-0">
              <div className="absolute inset-0 rounded-xl bg-primary/10 blur-sm" />
              <div
                className="relative w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "white", border: "1px solid hsl(220 16% 86%)", boxShadow: "0 1px 2px rgba(15,23,42,0.05)" }}
              >
                <img
                  src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
                  alt="Kanaung"
                  className="w-4 h-4 object-contain"
                  style={{ filter: "brightness(0) saturate(100%) invert(16%) sepia(80%) saturate(900%) hue-rotate(330deg) brightness(80%)" }}
                />
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-sora text-[13px] font-semibold leading-tight tracking-[-0.01em] text-foreground">
                Kanaung AI
              </div>
              <div className="text-[10px] mt-0.5 font-inter truncate" style={{ color: "hsl(220 12% 48%)", letterSpacing: "0.01em" }}>
                ရွှေကြယ် စက်ပစ္စည်း · Business Assistant
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full flex-shrink-0"
            style={{ background: "hsl(142 55% 95%)", border: "1px solid hsl(142 45% 86%)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "hsl(142 50% 34%)" }}>Live</span>
          </div>
        </div>

        {/* ── Messages ── */}
        <div
          ref={containerRef}
          className="relative px-5 pt-5 pb-3 space-y-4 overflow-y-auto"
          style={{
            height: "450px",
            scrollbarWidth: "none",
            background: "radial-gradient(circle at 18% 0%, hsl(220 28% 14%) 0%, transparent 34%), linear-gradient(180deg, hsl(220 25% 8%) 0%, hsl(220 24% 6%) 100%)",
          }}
        >
          <AnimatePresence initial={false}>
            {visibleMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.25, 1, 0.4, 1] }}
                className={`flex items-end gap-2 ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
              >
                {msg.role === "ai" && <AIAvatar />}

                <div className={`flex flex-col ${msg.role === "ai" ? "items-start" : "items-end"} max-w-[82%]`}>
                  <div
                    className={`px-3.5 py-2.5 text-[12.5px] leading-[1.72] font-inter ${
                      msg.role === "ai" ? "rounded-2xl rounded-bl-sm" : "rounded-2xl rounded-br-sm"
                    }`}
                    style={
                      msg.role === "ai"
                        ? {
                            color: "rgba(255,255,255,0.82)",
                            background: "rgba(255,255,255,0.058)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }
                        : {
                            color: "rgba(255,255,255,0.95)",
                            background: "linear-gradient(135deg, hsl(352 72% 44%) 0%, hsl(352 65% 38%) 100%)",
                            boxShadow: "0 4px 14px hsl(352 72% 38% / 0.22)",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                  {msg.role === "ai" && msg.evidence && <EvidenceFooter evidence={msg.evidence} />}
                </div>

                {msg.role === "customer" && (
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
                  >
                    <span className="text-[9px] font-bold" style={{ color: "rgba(255,255,255,0.32)" }}>U</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <style>{`
            @keyframes typingBounce {
              0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
              30% { transform: translateY(-5px); opacity: 1; }
            }
          `}</style>
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-end gap-2 justify-start"
              >
                <AIAvatar />
                <div
                  style={{
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "10px 14px",
                    borderRadius: "16px 16px 16px 4px",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  {[0, 150, 300].map((delay, i) => (
                    <span
                      key={i}
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.7)",
                        animation: `typingBounce 1.2s ease-in-out infinite`,
                        animationDelay: `${delay}ms`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Generation strip ── */}
        <div style={{ background: "hsl(220 24% 6%)" }}>
          <GenerationStrip isActive={isTyping} statusLabel={statusLabel} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}