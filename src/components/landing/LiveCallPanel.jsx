import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CheckCircle2 } from "lucide-react";

const CONVERSATION = [
  {
    role: "ai",
    text: "မင်္ဂလာပါ။ ရွှေကြယ် စက်ပစ္စည်းဆိုင်မှ ကြိုဆိုပါတယ်။ ဘာများ ကူညီပေးရမလဲ?",
    source: null,
  },
  {
    role: "customer",
    text: "Mini Excavator EX55 model ရှိသေးလား? ဈေးနှုန်းပြောပြပါ",
  },
  {
    role: "ai",
    text: "ဟုတ်ကဲ့၊ EX55 လက်ရှိ stock ရှိပါတယ်။ ကျပ် ၂၈၀ သိန်းမှ စတင်ပြီး အရောင် ၂ မျိုး ရရှိနိုင်ပါတယ်။",
    source: "Inventory & Price List",
  },
  {
    role: "customer",
    text: "ရန်ကုန်ကို delivery ဘယ်လောက်ကြာမလဲ?",
  },
  {
    role: "ai",
    text: "ရန်ကုန်အတွင်း ၃–၅ ရက်အတွင်း ရောက်ပါတယ်။ Standard delivery အခမဲ့ ပေးပါတယ်။",
    source: "Delivery Policy",
  },
  {
    role: "customer",
    text: "Financing option ရှိသလား?",
  },
  {
    role: "ai",
    text: "ဟုတ်ကဲ့၊ အရစ်ကျ ငွေပေးချေမှု ရရှိနိုင်ပါတယ်။ အသေးစိတ်အတွက် ကျွန်တော်တို့ team နှင့် တိုက်ရိုက် ဆက်သွယ်နိုင်ပါတယ်။",
    source: "Financing Options",
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

function SourceChip({ source }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 3 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: 0.18 }}
      className="mt-1.5 flex items-center gap-1.5"
    >
      <div
        className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <BookOpen className="w-2 h-2" style={{ color: "rgba(255,255,255,0.28)" }} />
        <span className="text-[9.5px] font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.28)" }}>
          {source}
        </span>
        <CheckCircle2 className="w-2 h-2" style={{ color: "hsl(142 55% 50% / 0.65)" }} />
      </div>
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
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statusLabel, setStatusLabel] = useState(STATUS_LABELS[0]);
  const timeoutRef = useRef(null);
  const statusRef = useRef(null);
  const containerRef = useRef(null);

  // Cycle status labels while AI is typing
  const isAiTyping =
    currentIndex < CONVERSATION.length &&
    visibleMessages.length > 0 &&
    CONVERSATION[currentIndex]?.role === "ai";

  useEffect(() => {
    if (!isAiTyping) return;
    let idx = 0;
    statusRef.current = setInterval(() => {
      idx = (idx + 1) % STATUS_LABELS.length;
      setStatusLabel(STATUS_LABELS[idx]);
    }, 1600);
    return () => clearInterval(statusRef.current);
  }, [isAiTyping]);

  useEffect(() => {
    if (currentIndex >= CONVERSATION.length) {
      timeoutRef.current = setTimeout(() => {
        setVisibleMessages([]);
        setCurrentIndex(0);
      }, 5500);
      return () => clearTimeout(timeoutRef.current);
    }

    const delay = DELAYS[currentIndex] ?? 2000;
    timeoutRef.current = setTimeout(() => {
      setVisibleMessages((prev) => [...prev, CONVERSATION[currentIndex]]);
      setCurrentIndex((i) => i + 1);
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

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
                  {msg.role === "ai" && msg.source && <SourceChip source={msg.source} />}
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
          <AnimatePresence>
            {isAiTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-end gap-2 justify-start"
              >
                <AIAvatar />
                <div
                  className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex gap-1.5 items-center"
                  style={{
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {[0, 140, 280].map((d, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/28 animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Generation strip ── */}
        <GenerationStrip isActive={isAiTyping} statusLabel={statusLabel} />

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}