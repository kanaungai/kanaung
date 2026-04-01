import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  { role: "customer", text: "SUV တစ်စီးဘယ်လောက်ရနိုင်မလဲ?" },
  { role: "ai",       text: "မင်္ဂလာပါ 🙏  Toyota Fortuner ကျပ် ၆၅ သန်းကနေ စတင်ပါတယ်၊ installment လည်း ရနိုင်ပါတယ်ဗျာ။" },
];

function useTypingEffect(text, active, delay = 0) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    let i = 0;
    const timer = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(id);
      }, 28);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(timer);
  }, [active, text, delay]);

  return displayed;
}

function Waveform() {
  const bars = [3, 6, 10, 7, 4, 8, 12, 6, 4, 9, 5, 11, 7, 3, 8];
  return (
    <div className="flex items-center gap-[3px] h-5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          style={{ background: "rgba(100,200,190,0.7)", height: h }}
          animate={{ scaleY: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.1,
            delay: i * 0.07,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function DemoHoverPreview({ visible }) {
  const [phase, setPhase] = useState("wave"); // "wave" | "typing"
  const customerText = useTypingEffect(LINES[0].text, phase === "typing", 0);
  const aiText       = useTypingEffect(LINES[1].text, phase === "typing", LINES[0].text.length * 28 + 400);

  useEffect(() => {
    if (!visible) { setPhase("wave"); return; }
    const t = setTimeout(() => setPhase("typing"), 1200);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{    opacity: 0, y: 8,  scale: 0.97 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{ minWidth: 260 }}
        >
          {/* Card */}
          <div
            className="relative rounded-2xl px-4 py-3.5 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(0,0,0,0.055)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            {/* Ambient orb */}
            <motion.div
              animate={{ x: ["0%", "50%", "0%"], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              className="absolute -top-4 -right-4 w-24 h-24 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(245,160,100,0.22) 0%, rgba(100,210,200,0.14) 60%, transparent 100%)",
                filter: "blur(16px)",
              }}
            />

            {/* Header */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
              <span className="text-[10px] font-semibold tracking-[0.06em] uppercase text-muted-foreground">
                Live AI · Messenger
              </span>
            </div>

            {/* Content */}
            <div className="space-y-2">
              {phase === "wave" ? (
                <div className="flex flex-col gap-2">
                  <div className="self-end bg-[hsl(220_25%_11%)] text-white text-[11px] px-3 py-1.5 rounded-xl rounded-br-sm max-w-[180px] leading-snug opacity-70">
                    {LINES[0].text}
                  </div>
                  <div className="flex items-center gap-2 px-1 py-1">
                    <Waveform />
                    <span className="text-[10px] text-muted-foreground">AI is responding…</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {customerText && (
                    <div className="self-end bg-[hsl(220_25%_11%)] text-white text-[11px] px-3 py-1.5 rounded-xl rounded-br-sm max-w-[180px] leading-snug">
                      {customerText}
                    </div>
                  )}
                  {aiText && (
                    <div
                      className="self-start text-[11px] px-3 py-1.5 rounded-xl rounded-bl-sm max-w-[210px] leading-snug"
                      style={{
                        background: "hsl(220 16% 94%)",
                        color: "hsl(220 18% 16%)",
                        border: "1px solid hsl(220 16% 90%)",
                      }}
                    >
                      {aiText}
                      {aiText.length < LINES[1].text.length && (
                        <span className="inline-block w-1.5 h-3 ml-0.5 bg-current opacity-60 animate-pulse align-middle" />
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tiny arrow pointing down */}
          <div className="flex justify-center mt-[-1px]">
            <div
              className="w-2.5 h-2.5 rotate-45"
              style={{
                background: "rgba(255,255,255,0.82)",
                border: "1px solid rgba(0,0,0,0.055)",
                borderTop: "none",
                borderLeft: "none",
                marginTop: -6,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}