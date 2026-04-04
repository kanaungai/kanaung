import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CheckCircle2, Send } from "lucide-react";

const CONVERSATION = [
  {
    role: "customer",
    text: "Mini Excavator EX55 model ရှိသေးလား? ဈေးနှုန်းပြောပြပါ",
    source: null,
  },
  {
    role: "ai",
    text: "ဟုတ်ကဲ့၊ EX55 လက်ရှိ stock ရှိပါတယ်။ ကျပ် ၂၈၀ သိန်းမှ စတင်ပြီး အရောင် ၂ မျိုး ရရှိနိုင်ပါတယ်။",
    source: "Inventory & Price List",
  },
  {
    role: "customer",
    text: "ရန်ကုန်ကို delivery ဘယ်လောက်ကြာမလဲ?",
    source: null,
  },
  {
    role: "ai",
    text: "ရန်ကုန်အတွင်း ၃–၅ ရက်အတွင်း ရောက်ပါတယ်။ Standard delivery အခမဲ့ ပေးပါတယ်။",
    source: "Delivery Policy",
  },
];

// timing: how long to wait before showing each message
const DELAYS = [900, 2400, 2200, 2600];

function AIAvatar({ small = false }) {
  const size = small ? "w-6 h-6" : "w-8 h-8";
  const imgSize = small ? "w-3.5 h-3.5" : "w-4.5 h-4.5";
  return (
    <div className={`${size} rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center flex-shrink-0`}>
      <img
        src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
        alt="AI"
        className={`${imgSize} object-contain`}
        style={{ filter: "brightness(0) invert(1) opacity(0.85)" }}
      />
    </div>
  );
}

function SourceChip({ source }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.15 }}
      className="mt-2 flex items-center gap-1.5 self-start"
    >
      <div
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <BookOpen className="w-2.5 h-2.5" style={{ color: "rgba(255,255,255,0.3)" }} />
        <span className="text-[10px] font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.3)" }}>
          {source}
        </span>
        <CheckCircle2 className="w-2.5 h-2.5" style={{ color: "hsl(142 55% 52% / 0.7)" }} />
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 justify-start">
      <AIAvatar small />
      <div className="flex flex-col gap-1.5">
        {/* Status line */}
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "hsl(352 72% 52%)" }}
          />
          <span className="text-[10px] font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.28)" }}>
            Generating reply…
          </span>
        </div>
        {/* Dots bubble */}
        <div
          className="px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5 items-center w-fit"
          style={{
            background: "rgba(255,255,255,0.055)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[0, 150, 300].map((d, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LiveCallPanel() {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

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

  const isAiTyping =
    currentIndex < CONVERSATION.length &&
    visibleMessages.length > 0 &&
    visibleMessages[visibleMessages.length - 1]?.role === "customer";

  return (
    <div className="relative w-full">
      {/* Ambient glow */}
      <div className="absolute -inset-4 rounded-[36px] bg-primary/[0.07] blur-3xl pointer-events-none" />
      <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-primary/8 via-transparent to-blue-500/4 blur-xl pointer-events-none" />

      {/* Panel */}
      <div
        className="relative rounded-[28px] overflow-hidden shadow-2xl shadow-black/40"
        style={{
          background: "linear-gradient(145deg, #111117 0%, #0d0d12 50%, #0f0e14 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* ── Header ── */}
        <div
          className="px-5 pt-5 pb-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-md" />
              <div className="relative w-9 h-9 rounded-2xl bg-[#1a1015] border border-primary/25 flex items-center justify-center overflow-hidden">
                <img
                  src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
                  alt="Kanaung"
                  className="w-5 h-5 object-contain"
                  style={{ filter: "brightness(0) invert(1) opacity(0.9)" }}
                />
              </div>
            </div>
            <div>
              <div className="font-sora text-[13.5px] font-semibold text-white leading-tight tracking-[-0.01em]">
                Kanaung AI
              </div>
              <div className="text-[10.5px] text-white/30 mt-0.5 tracking-wide font-inter">
                ရွှေကြယ် စက်ပစ္စည်း
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.14)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9.5px] font-bold text-green-400 tracking-[0.1em] uppercase">Live</span>
            </div>
          </div>
        </div>

        {/* ── Messages ── */}
        <div
          ref={containerRef}
          className="px-5 py-5 space-y-4 overflow-y-auto"
          style={{ height: "340px", scrollbarWidth: "none" }}
        >
          <AnimatePresence initial={false}>
            {visibleMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.4, 1] }}
                className={`flex items-end gap-2.5 ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
              >
                {msg.role === "ai" && <AIAvatar small />}

                <div className={`flex flex-col ${msg.role === "ai" ? "items-start" : "items-end"} max-w-[78%]`}>
                  <div
                    className={`px-4 py-3 text-[13px] leading-[1.7] font-inter ${
                      msg.role === "ai"
                        ? "rounded-2xl rounded-bl-md text-white/80"
                        : "rounded-2xl rounded-br-md text-white"
                    }`}
                    style={
                      msg.role === "ai"
                        ? {
                            background: "rgba(255,255,255,0.055)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }
                        : {
                            background: "linear-gradient(135deg, hsl(352 72% 44%) 0%, hsl(352 65% 38%) 100%)",
                            boxShadow: "0 4px 16px hsl(352 72% 38% / 0.22)",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                  {msg.role === "ai" && msg.source && <SourceChip source={msg.source} />}
                </div>

                {msg.role === "customer" && (
                  <div className="w-6 h-6 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 mb-0.5">
                    <span className="text-[9px] font-bold text-white/40">U</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isAiTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Input bar ── */}
        <div
          className="px-5 pb-5 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span className="text-[12px] text-white/20 flex-1 font-inter">Message in Burmese…</span>
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "hsl(352 72% 40% / 0.8)" }}
            >
              <Send className="w-3 h-3 text-white/80" />
            </div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}