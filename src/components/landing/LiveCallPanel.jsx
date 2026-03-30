import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, PhoneOff, Volume2 } from "lucide-react";

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
      className="w-[3px] rounded-full bg-primary/70 flex-shrink-0"
      animate={{
        height: [height * 0.3, height, height * 0.4, height * 0.8, height * 0.2, height],
        opacity: [0.4, 0.9, 0.5, 0.8, 0.3, 0.7],
      }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      style={{ minHeight: 3 }}
    />
  );
}

function Waveform() {
  const bars = 28;
  const heights = [8, 14, 22, 18, 28, 20, 14, 26, 18, 10, 24, 16, 28, 12, 20, 24, 16, 28, 10, 22, 18, 26, 14, 20, 16, 24, 12, 18];
  return (
    <div className="flex items-center justify-center gap-[3px] h-9">
      {Array.from({ length: bars }).map((_, i) => (
        <WaveBar key={i} delay={i * 0.055} height={heights[i % heights.length]} />
      ))}
    </div>
  );
}

export default function LiveCallPanel() {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const delays = [1200, 2200, 2000, 1800, 2400, 1600, 2200];

    function scheduleNext(index, messages) {
      if (index >= CONVERSATION.length) {
        // Wait then restart
        timeoutRef.current = setTimeout(() => {
          setVisibleMessages([]);
          setCurrentIndex(0);
          setIsLooping(true);
        }, 3000);
        return;
      }

      const delay = delays[index] || 2000;
      timeoutRef.current = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, CONVERSATION[index]]);
        setCurrentIndex(index + 1);
      }, delay);
    }

    scheduleNext(currentIndex, visibleMessages);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  // scroll to bottom on new message
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  return (
    <div className="relative w-full max-w-[420px] mx-auto lg:mx-0 lg:ml-auto">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-2xl scale-105 pointer-events-none" />

      {/* Panel */}
      <div className="relative rounded-3xl border border-white/10 bg-[#0f0f13] shadow-2xl shadow-black/50 overflow-hidden">
        {/* Panel header */}
        <div className="px-5 pt-5 pb-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-1.5">
            <img
              src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
              alt="Kanaung"
              className="w-full h-full object-contain"
              style={{ filter: "brightness(0) invert(1) opacity(0.85)" }}
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-white leading-tight">Kanaung AI</div>
            <div className="text-[11px] text-white/40 mt-0.5">ရွှေကြယ် စက်ပစ္စည်း</div>
          </div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-green-400 tracking-wider uppercase">Live</span>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={containerRef}
          className="px-4 py-4 space-y-3 h-[310px] overflow-y-auto scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          <AnimatePresence initial={false}>
            {visibleMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                    msg.role === "ai"
                      ? "bg-white/[0.07] text-white/85 rounded-tl-md border border-white/[0.06]"
                      : "bg-primary/80 text-white rounded-tr-md"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator when AI is about to respond */}
          {currentIndex < CONVERSATION.length && visibleMessages.length > 0 && visibleMessages[visibleMessages.length - 1]?.role === "customer" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-white/[0.07] border border-white/[0.06] flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Waveform + bottom bar */}
        <div className="px-5 pt-3 pb-5 border-t border-white/[0.06]">
          <div className="mb-3">
            <Waveform />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] text-white/35 font-medium">AI is responding</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Volume2 className="w-3.5 h-3.5 text-white/50" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Mic className="w-3.5 h-3.5 text-white/50" />
              </button>
              <button className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition-colors">
                <PhoneOff className="w-3.5 h-3.5 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}