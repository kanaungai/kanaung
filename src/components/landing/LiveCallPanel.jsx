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

// Metadata strip — three-cell production-signal footer
function MetadataStrip() {
  const cellStyle = {
    fontSize: 10,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.4)",
    textTransform: "uppercase",
    fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, monospace",
    fontWeight: 500,
    whiteSpace: "nowrap",
  };
  return (
    <div
      className="px-5 py-3 grid grid-cols-3 items-center"
      style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
    >
      <div style={{ ...cellStyle, textAlign: "left" }}>RESPONSE · 1.2s</div>
      <div style={{ ...cellStyle, textAlign: "center" }}>CONFIDENCE · 94%</div>
      <div style={{ ...cellStyle, textAlign: "right" }}>KANAUNG v2.1</div>
    </div>
  );
}

// Real Messenger icon — blue circle with white lightning bolt
function MessengerIcon({ size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="24" cy="24" r="24" fill="url(#msg-hero-grad)"/>
      <defs>
        <linearGradient id="msg-hero-grad" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00B0FF"/>
          <stop offset="1" stopColor="#006AFF"/>
        </linearGradient>
      </defs>
      <path d="M24 8C15.163 8 8 14.716 8 23C8 27.557 10.057 31.627 13.322 34.42V40L18.908 37.147C20.511 37.608 22.224 37.857 24 37.857C32.837 37.857 40 31.141 40 22.857C40 14.573 32.837 8 24 8ZM25.392 27.392L21.837 23.571L14.914 27.392L22.557 19.178L26.163 22.999L33.035 19.178L25.392 27.392Z" fill="white"/>
    </svg>
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

      {/* Panel */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "#0a0a0b",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
        }}
      >
        {/* ── Header ── Messenger-inbox style */}
        <div
          className="px-4 pt-3.5 pb-3.5 flex items-center justify-between"
          style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2.5">
            {/* Back chevron */}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M15 18L9 12L15 6" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            {/* Diamond avatar — 28px */}
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 28,
                height: 28,
                borderRadius: 10,
                background: "#1a1015",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <img
                src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
                alt="Kanaung"
                style={{ width: 14, height: 14, objectFit: "contain", filter: "brightness(0) invert(1) opacity(0.9)" }}
              />
            </div>

            {/* Two-line label */}
            <div className="flex flex-col">
              <span
                className="font-sora leading-tight"
                style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,1)", letterSpacing: "-0.005em" }}
              >
                မောင်သီဟ
              </span>
              <span
                className="font-inter flex items-center gap-1 leading-tight mt-[2px]"
                style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}
              >
                via <MessengerIcon size={10} /> Messenger · Yangon
              </span>
            </div>
          </div>

          {/* Timestamp */}
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, monospace",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            2 MIN AGO
          </span>
        </div>

        {/* ── Messages ── */}
        <div
          ref={containerRef}
          className="px-5 pt-5 pb-3 space-y-4 overflow-y-auto"
          style={{ height: "450px", scrollbarWidth: "none" }}
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

        {/* ── Metadata strip ── */}
        <MetadataStrip />
      </div>
    </div>
  );
}