import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, PhoneOff, Volume2, Wifi } from "lucide-react";

const CONVERSATION = [
  { role: "ai", text: "မင်္ဂလာပါ။ ရွှေကြယ် စက်ပစ္စည်းဆိုင်မှ ကြိုဆိုပါတယ်။ ဘာများ ကူညီပေးရမလဲ?" },
  { role: "customer", text: "Mini Excavator EX55 model ရှိသေးလား?" },
  { role: "ai", text: "ဟုတ်ကဲ့၊ EX55 လက်ရှိ stock ရှိပါတယ်။ အရောင် ၂ မျိုး ရရှိနိုင်ပါတယ်။" },
  { role: "customer", text: "ဈေးနှုန်းဘယ်လောက်လဲ?" },
  { role: "ai", text: "EX55 အတွက် ကျပ် ၂၈၀ သိန်းမှ စတင်ပါတယ်။ အချိုးအစားပေါ် မူတည်ပြီး အသေးစိတ် quote ပေးနိုင်ပါတယ်။" },
  { role: "customer", text: "ရန်ကုန်ကို ပို့ဆောင်ပေးနိုင်သလား?" },
  { role: "ai", text: "ဟုတ်ကဲ့၊ ရန်ကုန်အတွင်း ပို့ဆောင်ခ အခမဲ့ ပေးပါတယ်။ အသေးစိတ်အတွက် ဖုန်းနံပါတ် ချန်ထားနိုင်ပါတယ်။" },
];

function WaveBar({ delay, height }) {
  return (
    <motion.div
      className="w-[3px] rounded-full flex-shrink-0"
      animate={{
        height: [height * 0.25, height, height * 0.35, height * 0.75, height * 0.15, height * 0.9],
        opacity: [0.4, 1, 0.5, 0.85, 0.3, 0.95],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      style={{
        minHeight: 3,
        background: "linear-gradient(to top, hsl(352 72% 48% / 0.5), hsl(352 65% 62% / 0.9))",
      }}
    />
  );
}

function Waveform() {
  const heights = [8, 16, 28, 20, 36, 24, 16, 32, 20, 10, 28, 18, 36, 14, 24, 30, 18, 34, 10, 26, 20, 30, 16, 24, 18, 28, 12, 20, 26, 32, 10, 22, 18, 34, 14, 24];
  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {heights.map((h, i) => (
        <WaveBar key={i} delay={i * 0.048} height={h} />
      ))}
    </div>
  );
}

function AIAvatar() {
  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-md" />
      <div className="relative w-10 h-10 rounded-2xl bg-[#1a1015] border border-primary/25 flex items-center justify-center overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
          alt="Kanaung"
          className="w-6 h-6 object-contain"
          style={{ filter: "brightness(0) invert(1) opacity(0.9)" }}
        />
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
    const delays = [1200, 2800, 2400, 2600, 3200, 2600, 2800];

    if (currentIndex >= CONVERSATION.length) {
      timeoutRef.current = setTimeout(() => {
        setVisibleMessages([]);
        setCurrentIndex(0);
      }, 5000);
      return () => clearTimeout(timeoutRef.current);
    }

    const delay = delays[currentIndex] || 2000;
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
      {/* Multi-layer premium glow */}
      <div className="absolute -inset-4 rounded-[36px] bg-primary/[0.08] blur-3xl pointer-events-none" />
      <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-primary/10 via-transparent to-blue-500/5 blur-xl pointer-events-none" />

      {/* Main panel */}
      <div className="relative rounded-[28px] overflow-hidden shadow-2xl shadow-black/40"
        style={{
          background: "linear-gradient(145deg, #111117 0%, #0d0d12 50%, #0f0e14 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Inner top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        {/* ── Header ── */}
        <div className="px-6 pt-6 pb-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-3.5">
            <AIAvatar />
            <div>
              <div className="font-sora text-[14px] font-semibold text-white leading-tight tracking-[-0.01em]">
                Kanaung AI
              </div>
              <div className="text-[11px] text-white/35 mt-0.5 tracking-wide">
                ရွှေကြယ် စက်ပစ္စည်း
              </div>
            </div>
          </div>

          {/* Status pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold text-green-400 tracking-[0.1em] uppercase">Live</span>
            </div>
          </div>
        </div>

        {/* ── Messages area ── */}
        <div
          ref={containerRef}
          className="px-6 py-5 space-y-4 overflow-y-auto scrollbar-none"
          style={{
            height: "380px",
            scrollbarWidth: "none",
          }}
        >
          <AnimatePresence initial={false}>
            {visibleMessages.map((msg, i) => (
              <motion.div
               key={i}
               initial={{ opacity: 0, y: 8, scale: 0.96 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               transition={{ duration: 0.32, ease: [0.25, 1, 0.4, 1] }}
               className={`flex items-end gap-2.5 ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
              >
                {msg.role === "ai" && (
                  <div className="w-7 h-7 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center flex-shrink-0 mb-0.5">
                    <img
                      src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
                      alt="AI"
                      className="w-4 h-4 object-contain"
                      style={{ filter: "brightness(0) invert(1) opacity(0.8)" }}
                    />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-4 py-3 text-[13.5px] leading-[1.65] font-inter ${
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
                          boxShadow: "0 4px 20px hsl(352 72% 38% / 0.25)",
                        }
                  }
                >
                  {msg.text}
                </div>
                {msg.role === "customer" && (
                  <div className="w-7 h-7 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 mb-0.5">
                    <span className="text-[10px] font-bold text-white/50">U</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isAiTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-end gap-2.5 justify-start"
              >
                <div className="w-7 h-7 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <img
                    src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
                    alt="AI"
                    className="w-4 h-4 object-contain"
                    style={{ filter: "brightness(0) invert(1) opacity(0.8)" }}
                  />
                </div>
                <div
                  className="px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5 items-center"
                  style={{
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {[0, 150, 300].map((d, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/35 animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── AI status label ── */}
        <div
          className="px-6 py-3 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-medium text-white/30 tracking-wide">
              AI is responding
            </span>
          </div>
          <div className="flex items-center gap-1 text-white/20">
            <Wifi className="w-3 h-3" />
            <span className="text-[10px] font-medium tracking-wide">Secure</span>
          </div>
        </div>

        {/* ── Waveform ── */}
        <div className="px-6 pb-4">
          <div
            className="rounded-2xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <Waveform />
          </div>
        </div>

        {/* ── Controls ── */}
        <div
          className="px-6 pb-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: "300ms" }} />
            <div className="w-1 h-1 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: "600ms" }} />
          </div>

          <div className="flex items-center gap-2.5">
            <button
              className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Volume2 className="w-3.5 h-3.5 text-white/40" />
            </button>
            <button
              className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Mic className="w-3.5 h-3.5 text-white/40" />
            </button>
            <button
              className="w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-105"
              style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              <PhoneOff className="w-3.5 h-3.5 text-red-400" />
            </button>
          </div>
        </div>

        {/* Bottom inner highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}