import React from "react";
import { motion } from "framer-motion";
import { Bot, MessageSquareText, BookOpen, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";

function ChannelBadge({ label, color }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full"
      style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span className="text-[10px] font-semibold tracking-[0.04em]" style={{ color: "rgba(255,255,255,0.58)" }}>{label}</span>
    </div>
  );
}

function KnowledgeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.28 }}
      className="absolute right-5 top-5 w-[220px] rounded-2xl overflow-hidden hidden md:block"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}
    >
      <div className="px-4 py-3 border-b border-white/[0.07] flex items-center gap-2">
        <BookOpen className="w-3.5 h-3.5 text-white/55" />
        <span className="text-[11px] font-semibold text-white/72">Business knowledge</span>
      </div>
      <div className="px-4 py-3 space-y-2.5">
        {[
          ["Inventory", "EX55 · In stock"],
          ["Price", "From 280 သိန်း"],
          ["Delivery", "Yangon · 3–5 days"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <span className="text-[10px] text-white/34">{label}</span>
            <span className="text-[10px] font-semibold text-white/72">{value}</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t border-white/[0.07] flex items-center gap-1.5 bg-white/[0.015]">
        <CheckCircle2 className="w-3 h-3 text-emerald-400/70" />
        <span className="text-[10px] text-white/42">Grounded response source</span>
      </div>
    </motion.div>
  );
}

function ReviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.38 }}
      className="absolute left-6 bottom-6 w-[240px] rounded-2xl overflow-hidden hidden md:block"
      style={{ background: "rgba(10,10,14,0.84)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(18px)", boxShadow: "0 18px 40px rgba(0,0,0,0.28)" }}
    >
      <div className="px-4 py-3 border-b border-white/[0.07] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-white/55" />
          <span className="text-[11px] font-semibold text-white/72">Handoff state</span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-amber-300 bg-amber-500/10 border border-amber-400/15">Review</span>
      </div>
      <div className="px-4 py-3 space-y-2">
        <p className="text-[11px] text-white/78 leading-[1.6]">
          “Financing option ရှိသလား?”
        </p>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/34">Confidence</span>
          <span className="text-white/72 font-semibold">82%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
          <div className="h-full w-[82%] rounded-full bg-white/70" />
        </div>
        <p className="text-[10px] text-white/42 leading-[1.55]">
          Kanaung drafted the reply using business policy, then routed it for human review.
        </p>
      </div>
    </motion.div>
  );
}

function Message({ role, children, meta, delay = 0 }) {
  const isAI = role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`flex gap-3 ${isAI ? "justify-start" : "justify-end"}`}
    >
      {isAI && (
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1" style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Bot className="w-4 h-4 text-white/75" />
        </div>
      )}
      <div className={`max-w-[78%] ${isAI ? "items-start" : "items-end"} flex flex-col`}>
        <div
          className={`px-4 py-3 rounded-[20px] text-[13px] leading-[1.72] ${isAI ? "rounded-bl-sm" : "rounded-br-sm"}`}
          style={
            isAI
              ? { background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.84)" }
              : { background: "linear-gradient(135deg, hsl(352 72% 44%) 0%, hsl(352 65% 38%) 100%)", color: "white", boxShadow: "0 10px 24px rgba(84, 15, 33, 0.28)" }
          }
        >
          {children}
        </div>
        {meta && (
          <div className="mt-2 flex items-center gap-2 text-[10px] text-white/38">
            {meta}
          </div>
        )}
      </div>
      {!isAI && (
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span className="text-[10px] font-bold text-white/46">U</span>
        </div>
      )}
    </motion.div>
  );
}

export default function HeroConversationShowcase() {
  return (
    <div className="relative w-full">
      <div
        className="relative rounded-[28px] overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #111216 0%, #0c0d11 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 100px -24px rgba(0,0,0,0.42)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0) 28%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent pointer-events-none" />

        <div className="px-5 md:px-6 pt-5 md:pt-6 pb-4 border-b border-white/[0.06] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <MessageSquareText className="w-4 h-4 text-white/75" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white tracking-[-0.01em]">Kanaung AI</p>
              <p className="text-[11px] text-white/34 truncate">Burmese customer service agent · Golden Star Machinery</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <ChannelBadge label="Messenger" color="#0084FF" />
            <ChannelBadge label="Viber" color="#7360F2" />
            <ChannelBadge label="Web chat" color="#94A3B8" />
          </div>
        </div>

        <div className="relative px-5 md:px-6 pt-6 md:pt-7 pb-24 md:pb-28 min-h-[560px] md:min-h-[620px]">
          <div className="space-y-5 md:space-y-6 max-w-[620px]">
            <Message role="customer" delay={0.05}>Mini Excavator EX55 model ရှိသေးလား? ဈေးနှုန်းနဲ့ delivery အချိန်ပါ ပြောပြပါ</Message>

            <Message
              role="ai"
              delay={0.18}
              meta={
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400/65" />
                  <span>Grounded in Inventory · Pricing · Delivery Policy</span>
                </>
              }
            >
              ဟုတ်ကဲ့၊ EX55 model လက်ရှိ stock ရှိပါတယ်။ ဈေးနှုန်းက ကျပ် ၂၈၀ သိန်းမှ စတင်ပြီး ရန်ကုန်အတွင်း ၃–၅ ရက်အတွင်း ပို့ဆောင်ပေးနိုင်ပါတယ်။
            </Message>

            <Message role="customer" delay={0.3}>Financing option ရှိသလား? Down payment ဘယ်လောက်လိုမလဲ?</Message>

            <Message
              role="ai"
              delay={0.42}
              meta={
                <>
                  <ArrowUpRight className="w-3 h-3 text-amber-300/70" />
                  <span>High-intent question · Sent for review</span>
                </>
              }
            >
              အရစ်ကျ ဝယ်ယူနိုင်တဲ့ option ရှိပါတယ်။ အသေးစိတ် down payment နဲ့ term plan ကို sales team က ဆက်လက်အတည်ပြုပေးပါမယ်။
            </Message>
          </div>

          <KnowledgeCard />
          <ReviewCard />
        </div>
      </div>
    </div>
  );
}