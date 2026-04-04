import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Package, Truck, BadgeCheck } from "lucide-react";

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
    evidence: [
      { icon: "package", label: "Stock", value: "Available" },
      { icon: "check", label: "Source", value: "Inventory & Price List" },
    ],
  },
  {
    role: "customer",
    text: "ရန်ကုန်ကို delivery ဘယ်လောက်ကြာမလဲ?",
  },
  {
    role: "ai",
    text: "ရန်ကုန်အတွင်း ၃–၅ ရက်အတွင်း ရောက်ပါတယ်။ Standard delivery အခမဲ့ ပေးပါတယ်။",
    evidence: [
      { icon: "truck", label: "Delivery", value: "3–5 days · Free" },
      { icon: "check", label: "Source", value: "Delivery Policy" },
    ],
  },
  {
    role: "customer",
    text: "Financing option ရှိသလား?",
  },
  {
    role: "ai",
    text: "ဟုတ်ကဲ့၊ အရစ်ကျ ငွေပေးချေမှု ရရှိနိုင်ပါတယ်။ အသေးစိတ်အတွက် ကျွန်တော်တို့ team နှင့် တိုက်ရိုက် ဆက်သွယ်နိုင်ပါတယ်။",
    evidence: [
      { icon: "badge", label: "Policy", value: "Financing available" },
      { icon: "check", label: "Source", value: "Financing Options" },
    ],
  },
];

const DELAYS = [1000, 3200, 3800, 3400, 4000, 3200, 4200];

// Cycling status labels shown in the generation strip
const STATUS_LABELS = [
  "Checking inventory and pricing",
  "Drafting Burmese response",
  "Generating grounded reply",
  "Referencing business knowledge",
];

function AIAvatar() {
  return (
    <div className="w-6 h-6 rounded-lg bg-primary/20 border border-primary/20 flex items-center justify-center flex-shrink-0">
      <img
        src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
        alt="AI"
        className="w-3.5 h-3.5 object-contain"
        style={{ filter: "brightness(0) invert(1) opacity(0.85)" }}
      />
    </div>
  );
}

const ICON_MAP = {
  package: Package,
  truck: Truck,
  badge: BadgeCheck,
  check: CheckCircle2,
};

function EvidenceFooter({ evidence }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.2 }}
      style={{
        marginTop: 6,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: "100%",
      }}
    >
      {evidence.map((item, i) => {
        const Icon = ICON_MAP[item.icon] || CheckCircle2;
        const isSource = item.icon === "check";
        return (
          <div
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 8px 3px 6px",
              borderRadius: 6,
              background: isSource ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)",
              border: isSource ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(255,255,255,0.09)",
              alignSelf: "flex-start",
            }}
          >
            <Icon
              style={{
                width: 9,
                height: 9,
                flexShrink: 0,
                color: isSource ? "rgba(255,255,255,0.22)" : "hsl(142 55% 50% / 0.8)",
              }}
            />
            <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.28)", fontWeight: 500, letterSpacing: "0.02em" }}>
              {item.label}:
            </span>
            <span style={{ fontSize: 9.5, color: isSource ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.5)", fontWeight: 600 }}>
              {item.value}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

// Animated activity bars — live generation feel
function ActivityBars() {
  const bars = [6, 14, 22, 18, 10, 26, 16, 20, 12, 24, 8, 18, 22, 14, 10];
  return (
    <div className="flex items-center gap-[2.5px] h-5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full flex-shrink-0"
          animate={{
            scaleY: [0.3, 1, 0.45, 0.85, 0.2, 0.9, 0.5],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: i * 0.09,
            ease: "easeInOut",
          }}
          style={{
            height: h,
            transformOrigin: "center",
            background: "linear-gradient(to top, hsl(352 72% 48% / 0.45), hsl(352 60% 62% / 0.8))",
          }}
        />
      ))}
    </div>
  );
}

function GenerationStrip({ isActive, statusLabel }) {
  return (
    <div
      className="px-5 py-3.5 flex items-center justify-between gap-4"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      {/* Left: status label */}
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{
            background: isActive ? "hsl(352 72% 52%)" : "rgba(255,255,255,0.15)",
            boxShadow: isActive ? "0 0 6px hsl(352 72% 52% / 0.5)" : "none",
          }}
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={statusLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-[10.5px] font-medium tracking-[-0.005em] font-inter truncate"
            style={{ color: isActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)" }}
          >
            {isActive ? statusLabel : "Kanaung AI · Ready"}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Right: activity bars */}
      <div
        className="flex-shrink-0"
        style={{ opacity: isActive ? 1 : 0.2, transition: "opacity 0.4s" }}
      >
        <ActivityBars />
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

  // Cycle status labels only while AI is typing
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
      await sleep(1500); // initial pause before conversation starts

      for (let i = 0; i < CONVERSATION.length; i++) {
        if (cancelled) return;
        const msg = CONVERSATION[i];

        if (msg.role === "customer") {
          // Show customer message
          setVisibleMessages((prev) => [...prev, msg]);
          // Pause so user can read it, then AI begins typing
          await sleep(1000 + Math.random() * 200);

        } else {
          // AI turn: 3-phase sequence

          // Phase 1 — typing dots appear, give React a tick to paint them
          setIsTyping(true);
          await sleep(16);
          if (cancelled) return;

          // Phase 2 — keep dots visible long enough to clearly notice
          // Scale with message length for believability
          const charCount = msg.text.length;
          const typingDuration = 1800 + Math.min(charCount * 8, 600) + Math.random() * 400;
          await sleep(typingDuration);
          if (cancelled) return;

          // Phase 3 — hide dots, brief breath, show AI message
          setIsTyping(false);
          await sleep(150);
          if (cancelled) return;
          setVisibleMessages((prev) => [...prev, msg]);

          // Post-AI-message reading pause — longer for longer messages
          const readPause = 1600 + Math.min(charCount * 10, 600) + Math.random() * 400;
          await sleep(readPause);
        }
      }

      // Hold conversation at end before looping
      await sleep(5000);
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
      <div className="absolute -inset-4 rounded-[36px] bg-primary/[0.07] blur-3xl pointer-events-none" />
      <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-primary/8 via-transparent to-blue-500/4 blur-xl pointer-events-none" />

      {/* Panel */}
      <div
        className="relative rounded-[24px] overflow-hidden shadow-2xl shadow-black/40"
        style={{
          background: "linear-gradient(145deg, #111117 0%, #0d0d12 60%, #0f0e14 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* ── Header ── */}
        <div
          className="px-5 pt-4 pb-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex-shrink-0">
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-sm" />
              <div className="relative w-8 h-8 rounded-xl bg-[#1a1015] border border-primary/25 flex items-center justify-center">
                <img
                  src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
                  alt="Kanaung"
                  className="w-4.5 h-4.5 object-contain"
                  style={{ filter: "brightness(0) invert(1) opacity(0.9)" }}
                />
              </div>
            </div>
            <div>
              <div className="font-sora text-[13px] font-semibold text-white leading-tight tracking-[-0.01em]">
                Kanaung AI
              </div>
              <div className="text-[10px] text-white/28 mt-0.5 tracking-wide font-inter">
                ရွှေကြယ် စက်ပစ္စည်း
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
            style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.14)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] font-bold text-green-400 tracking-[0.1em] uppercase">Live</span>
          </div>
        </div>

        {/* ── Messages ── */}
        <div
          ref={containerRef}
          className="px-5 py-4 space-y-4 overflow-y-auto"
          style={{ height: "400px", scrollbarWidth: "none" }}
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

                <div className={`flex flex-col ${msg.role === "ai" ? "items-start" : "items-end"} max-w-[80%]`}>
                  <div
                    className={`px-3.5 py-2.5 text-[12.5px] leading-[1.7] font-inter ${
                      msg.role === "ai"
                        ? "rounded-2xl rounded-bl-sm text-white/80"
                        : "rounded-2xl rounded-br-sm text-white"
                    }`}
                    style={
                      msg.role === "ai"
                        ? {
                            background: "rgba(255,255,255,0.055)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                        : {
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
                  <div className="w-6 h-6 rounded-lg bg-white/7 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-bold text-white/35">U</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing dots */}
          <style>{`
            @keyframes typingBounce {
              0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
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
                    border: "1px solid rgba(255,255,255,0.12)",
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
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.75)",
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
        <GenerationStrip isActive={isTyping} statusLabel={statusLabel} />

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}