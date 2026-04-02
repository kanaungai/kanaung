import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ChevronRight, Zap, BookOpen, User } from "lucide-react";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";

// ── Conversation queue ──────────────────────────────────────────────────────
const QUEUE = [
  {
    id: 1,
    name: "Aung Myat Thu",
    preview: "L200 spare parts availability?",
    channel: "Messenger",
    channelColor: "#0084FF",
    state: "needs_review",
    stateLabel: "Needs review",
    time: "2m ago",
  },
  {
    id: 2,
    name: "Ko Htet Aung",
    preview: "Toyota Hilux accessories — Mandalay",
    channel: "Viber",
    channelColor: "#7B52D4",
    state: "ready",
    stateLabel: "Ready to send",
    time: "14m ago",
  },
  {
    id: 3,
    name: "Ma Hnin Wai",
    preview: "Thingyan showroom hours?",
    channel: "WhatsApp",
    channelColor: "#25D366",
    state: "resolved",
    stateLabel: "Resolved by AI",
    time: "31m ago",
  },
  {
    id: 4,
    name: "Mg Zaw Win",
    preview: "Bosch warranty claim process",
    channel: "Messenger",
    channelColor: "#0084FF",
    state: "escalated",
    stateLabel: "Awaiting human",
    time: "1h ago",
  },
];

const STATE_CONFIG = {
  needs_review: { dot: "#F59E0B", bg: "rgba(245,158,11,0.08)", text: "#92400E" },
  ready:        { dot: "#10B981", bg: "rgba(16,185,129,0.08)", text: "#065F46" },
  resolved:     { dot: "#94A3B8", bg: "rgba(148,163,184,0.1)",  text: "#64748B" },
  escalated:    { dot: "#EF4444", bg: "rgba(239,68,68,0.07)",   text: "#991B1B" },
};

// ── Selected thread data ──────────────────────────────────────────────────
const THREADS = {
  1: {
    name: "Aung Myat Thu",
    channel: "Messenger",
    channelColor: "#0084FF",
    inquiry: "Mitsubishi L200 2023 spare parts ရောင်းသလား? Timing belt set နဲ့ brake pad ၂ ခုလိုချင်တယ်။ ဈေးနှုန်းနဲ့ stock ပြောပြပါ။",
    aiReply: "မင်္ဂလာပါ ကိုအောင်မြတ်သူ ။ L200 2023 Timing Belt Set (ကျပ် ၄၈,၀၀၀) နှင့် Front Brake Pad Set (ကျပ် ၃၂,၀၀၀) နှစ်မျိုးလုံး stock ရှိပါတယ်။ ယနေ့ Yangon ကြိုဆောင်ပေးနိုင်ပါတယ်၊ Mandalay ဆိုရင် ၂-၃ ရက် ကြာပါမည်။",
    confidence: 94,
    intent: "Product + Pricing Enquiry",
    source: "Parts Catalog · Delivery Policy",
    state: "needs_review",
  },
  2: {
    name: "Ko Htet Aung",
    channel: "Viber",
    channelColor: "#7B52D4",
    inquiry: "Toyota Hilux 2022 accessories ကြည့်ချင်တယ်။ Roll bar နဲ့ snorkel ရှိလား? Mandalay ပို့ပေးလို့ရလား?",
    aiReply: "မင်္ဂလာပါ ကိုထက်အောင်။ Hilux 2022 Roll Bar (ကျပ် ၁၂၅,၀၀၀) နှင့် Snorkel Kit (ကျပ် ၈၅,၀၀၀) ရှိပါသည်။ Mandalay delivery ၃-၄ ရက်ကြာပြီး delivery charge ကျပ် ၁၅,၀၀၀ ဖြစ်ပါသည်။",
    confidence: 97,
    intent: "Accessories + Delivery Enquiry",
    source: "Accessories Catalog · Upcountry Rates",
    state: "ready",
  },
  3: {
    name: "Ma Hnin Wai",
    channel: "WhatsApp",
    channelColor: "#25D366",
    inquiry: "Thingyan အတွင်း showroom ဘယ်အချိန် ဖွင့်သလဲ?",
    aiReply: "မင်္ဂလာပါ မဟင်းဝေ။ Thingyan ကာလ (ဧပြီ ၁၃-၁၆) ရုံးပိတ်ရက် ဖြစ်ပါသည်။ ဧပြီ ၁၇ ရက်မှ ပုံမှန်အတိုင်း တနင်္လာ–စနေ နံနက် ၉ နာရီ မှ ညနေ ၅:၃၀ ထိ ပြန်ဖွင့်ပါမည်။",
    confidence: 99,
    intent: "Operating Hours",
    source: "Locations & Hours",
    state: "resolved",
  },
  4: {
    name: "Mg Zaw Win",
    channel: "Messenger",
    channelColor: "#0084FF",
    inquiry: "Bosch drill GSB 550 ဝယ်တာ ၆ လကျော်တယ်။ warranty claim လုပ်ချင်ရင် ဘယ်လိုလုပ်ရမလဲ?",
    aiReply: "မင်္ဂလာပါ မောင်ဇော်ဝင်း။ Bosch GSB 550 ၁ နှစ် warranty ပါပါတယ်။ ဆက်လက်ဆောင်ရွက်ရန် warranty card နဲ့ purchase receipt ယူဆောင်လာပြီး Yangon showroom ကို လာပါ။ Service team မှ ကြည့်ပေးပါ့မည်။",
    confidence: 71,
    intent: "Warranty Claim",
    source: "Warranty Policy",
    state: "escalated",
  },
};

// ── Channel dot ───────────────────────────────────────────────────────────
function ChannelDot({ color, label }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded"
      style={{ background: `${color}12`, color }}
    >
      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
      {label}
    </span>
  );
}

// ── Queue row ─────────────────────────────────────────────────────────────
function QueueRow({ item, selected, onClick }) {
  const cfg = STATE_CONFIG[item.state];
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3.5 py-3 flex items-start gap-2.5 transition-all border-b"
      style={{
        borderBottomColor: "hsl(220 16% 92%)",
        background: selected ? "white" : "transparent",
        borderLeft: `2px solid ${selected ? "hsl(220 25% 14%)" : "transparent"}`,
      }}
    >
      <div className="flex-shrink-0 mt-1.5">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <p
            className="text-[11px] font-semibold truncate"
            style={{ color: "hsl(220 25% 12%)" }}
          >
            {item.name}
          </p>
          <span className="text-[9px] flex-shrink-0 ml-2" style={{ color: "hsl(220 12% 58%)" }}>
            {item.time}
          </span>
        </div>
        <p className="text-[10px] truncate mb-1.5" style={{ color: "hsl(220 12% 52%)" }}>
          {item.preview}
        </p>
        <div className="flex items-center gap-1.5">
          <ChannelDot color={item.channelColor} label={item.channel} />
          <span
            className="text-[9px] font-medium px-1.5 py-0.5 rounded"
            style={{ background: cfg.bg, color: cfg.text }}
          >
            {item.stateLabel}
          </span>
        </div>
      </div>
    </button>
  );
}

// ── Main thread + AI reply panel ─────────────────────────────────────────
function ThreadPanel({ thread }) {
  const cfg = STATE_CONFIG[thread.state];
  const confidenceColor =
    thread.confidence >= 90 ? "#10B981" : thread.confidence >= 75 ? "#F59E0B" : "#EF4444";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={thread.name + thread.state}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex flex-col h-full"
      >
        {/* Thread header */}
        <div
          className="flex items-center gap-3 px-5 py-3.5 border-b flex-shrink-0"
          style={{ borderColor: "hsl(220 16% 91%)", background: "hsl(220 18% 98.5%)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(220 16% 91%)" }}
          >
            <User className="w-3 h-3" style={{ color: "hsl(220 12% 50%)" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold" style={{ color: "hsl(220 25% 10%)" }}>
              {thread.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <ChannelDot color={thread.channelColor} label={thread.channel} />
            </div>
          </div>
          <span
            className="text-[9px] font-semibold px-2 py-1 rounded-full"
            style={{ background: cfg.bg, color: cfg.text }}
          >
            {STATE_CONFIG[thread.state] && QUEUE.find(q => q.id === QUEUE.find(q2 => q2.state === thread.state)?.id)?.stateLabel}
            {thread.state === "needs_review" && "Needs review"}
            {thread.state === "ready" && "Ready to send"}
            {thread.state === "resolved" && "Resolved"}
            {thread.state === "escalated" && "Awaiting human"}
          </span>
        </div>

        {/* Customer message */}
        <div className="px-5 py-4 border-b flex-shrink-0" style={{ borderColor: "hsl(220 16% 91%)" }}>
          <p className="text-[9px] font-bold tracking-[0.1em] uppercase mb-2" style={{ color: "hsl(220 12% 56%)" }}>
            Customer Message
          </p>
          <div
            className="px-3.5 py-3 rounded-xl text-[11.5px] leading-relaxed"
            style={{
              background: "hsl(220 16% 95%)",
              color: "hsl(220 18% 22%)",
            }}
          >
            {thread.inquiry}
          </div>
        </div>

        {/* AI reply module — the focal moment */}
        <div className="px-5 py-4 flex-1 overflow-auto" style={{ background: "white" }}>
          {/* AI label row */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "hsl(220 25% 11%)" }}
            >
              <Zap className="w-2.5 h-2.5 text-white" />
            </div>
            <p className="text-[10px] font-bold tracking-[0.08em] uppercase" style={{ color: "hsl(220 25% 14%)" }}>
              AI Drafted Reply
            </p>

            {/* Confidence badge */}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-[9px] font-medium" style={{ color: "hsl(220 12% 52%)" }}>
                Confidence
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${confidenceColor}14`, color: confidenceColor }}
              >
                {thread.confidence}%
              </span>
            </div>
          </div>

          {/* Draft reply bubble */}
          <div
            className="px-4 py-3.5 rounded-xl text-[11.5px] leading-relaxed mb-3"
            style={{
              background: "hsl(220 18% 97%)",
              border: "1px solid hsl(220 16% 90%)",
              color: "hsl(220 18% 20%)",
            }}
          >
            {thread.aiReply}
          </div>

          {/* Intent + source row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-semibold" style={{ color: "hsl(220 12% 56%)" }}>
                Intent:
              </span>
              <span
                className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                style={{ background: "hsl(220 16% 93%)", color: "hsl(220 18% 28%)" }}
              >
                {thread.intent}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-2.5 h-2.5" style={{ color: "hsl(220 12% 60%)" }} />
              <span className="text-[9px]" style={{ color: "hsl(220 12% 56%)" }}>
                {thread.source}
              </span>
            </div>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 text-[10.5px] font-semibold px-3.5 py-2 rounded-lg flex-1 justify-center transition-all"
              style={{ background: "hsl(220 25% 11%)", color: "white" }}
            >
              <CheckCircle2 className="w-3 h-3" />
              Approve & Send
            </button>
            <button
              className="flex items-center gap-1.5 text-[10.5px] font-semibold px-3 py-2 rounded-lg transition-all"
              style={{ background: "hsl(220 16% 93%)", color: "hsl(220 18% 24%)", border: "1px solid hsl(220 16% 87%)" }}
            >
              Edit Reply
            </button>
            <button
              className="flex items-center gap-1.5 text-[10.5px] font-semibold px-3 py-2 rounded-lg transition-all"
              style={{ background: "hsl(0 70% 97%)", color: "hsl(0 65% 38%)", border: "1px solid hsl(0 60% 89%)" }}
            >
              <AlertCircle className="w-3 h-3" />
              Escalate
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
export default function InboxShowcase() {
  const [selectedId, setSelectedId] = useState(1);
  const { ref: headRef, inView: headVisible } = useScrollReveal();
  const { ref: frameRef, inView: frameVisible } = useScrollReveal({ margin: "-60px" });

  const thread = THREADS[selectedId];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8">

        {/* ── Two-col layout ── */}
        <div className="grid lg:grid-cols-[1fr_1.55fr] gap-12 xl:gap-20 items-start">

          {/* LEFT — narrative block */}
          <motion.div
            ref={headRef}
            animate={{ opacity: headVisible ? 1 : 0, y: headVisible ? 0 : 20 }}
            initial={{ opacity: 0, y: 20 }}
            transition={REVEAL.primary}
            className="lg:sticky lg:top-28"
          >
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground mb-6">
              The Inbox
            </p>
            <div className="w-16 h-px bg-foreground/10 mb-8" />

            <h2 className="font-sora text-[34px] md:text-[40px] xl:text-[46px] font-bold tracking-[-0.03em] leading-[1.07] text-foreground mb-6">
              Kanaung drafts.<br />Your team decides.
            </h2>

            <p className="text-[15px] text-muted-foreground leading-[1.8] font-inter max-w-sm mb-10">
              Every customer message is read, understood, and answered using your own price lists, FAQs, and business rules. Your team only sees what actually needs attention.
            </p>

            {/* Proof points */}
            <ul className="space-y-4">
              {[
                { label: "Draft replies grounded in your business data", sub: "Prices, stock, hours, policies — all applied automatically." },
                { label: "Low-confidence replies held for review", sub: "Kanaung flags uncertainty before it becomes a mistake." },
                { label: "Works across Messenger, Viber, and WhatsApp", sub: "One inbox. Every channel. No switching." },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <div
                    className="w-1 h-1 rounded-full mt-2.5 flex-shrink-0"
                    style={{ background: "hsl(220 25% 35%)" }}
                  />
                  <div>
                    <p className="text-[13.5px] font-semibold text-foreground/85 leading-snug">
                      {item.label}
                    </p>
                    <p className="text-[12px] text-muted-foreground mt-0.5 leading-relaxed">
                      {item.sub}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT — product frame */}
          <motion.div
            ref={frameRef}
            animate={{ opacity: frameVisible ? 1 : 0, y: frameVisible ? 0 : 24 }}
            initial={{ opacity: 0, y: 24 }}
            transition={REVEAL.card}
          >
            {/* Subtle annotations */}
            <div className="relative">

              {/* Top annotation */}
              <motion.div
                animate={{ opacity: frameVisible ? 1 : 0, x: frameVisible ? 0 : -8 }}
                initial={{ opacity: 0, x: -8 }}
                transition={{ ...REVEAL.fade, delay: 0.5 }}
                className="hidden xl:flex absolute -left-36 top-20 items-center gap-2 pointer-events-none"
              >
                <div className="text-right">
                  <p className="text-[10px] font-semibold text-muted-foreground/60 leading-tight">
                    Drafted from your
                  </p>
                  <p className="text-[10px] font-semibold text-muted-foreground/60 leading-tight">
                    knowledge base
                  </p>
                </div>
                <svg width="28" height="12" viewBox="0 0 28 12" fill="none" className="opacity-30">
                  <path d="M0 6 Q14 6 28 6" stroke="hsl(220 12% 40%)" strokeWidth="1" strokeDasharray="2 2" />
                  <path d="M24 3 L28 6 L24 9" stroke="hsl(220 12% 40%)" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* Bottom annotation */}
              <motion.div
                animate={{ opacity: frameVisible ? 1 : 0, x: frameVisible ? 0 : -8 }}
                initial={{ opacity: 0, x: -8 }}
                transition={{ ...REVEAL.fade, delay: 0.65 }}
                className="hidden xl:flex absolute -left-36 bottom-28 items-center gap-2 pointer-events-none"
              >
                <div className="text-right">
                  <p className="text-[10px] font-semibold text-muted-foreground/60 leading-tight">
                    Escalates only
                  </p>
                  <p className="text-[10px] font-semibold text-muted-foreground/60 leading-tight">
                    when needed
                  </p>
                </div>
                <svg width="28" height="12" viewBox="0 0 28 12" fill="none" className="opacity-30">
                  <path d="M0 6 Q14 6 28 6" stroke="hsl(220 12% 40%)" strokeWidth="1" strokeDasharray="2 2" />
                  <path d="M24 3 L28 6 L24 9" stroke="hsl(220 12% 40%)" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* Product frame */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid hsl(220 16% 85%)",
                  boxShadow:
                    "0 0 0 1px hsl(220 20% 96%), 0 24px 64px -12px hsl(220 25% 15% / 0.12), 0 6px 20px -4px hsl(220 25% 15% / 0.05)",
                  background: "hsl(220 18% 97%)",
                }}
              >
                {/* Inner top highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />

                {/* Browser bar */}
                <div
                  className="flex items-center gap-4 px-4 py-2.5 border-b"
                  style={{ background: "hsl(220 18% 98.5%)", borderColor: "hsl(220 16% 88%)" }}
                >
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ background: "hsl(220 10% 82%)" }} />
                    ))}
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[9px] font-mono"
                      style={{
                        background: "hsl(220 16% 94%)",
                        border: "1px solid hsl(220 16% 89%)",
                        color: "hsl(220 12% 52%)",
                        minWidth: 200,
                        justifyContent: "center",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      app.kanaung.ai / inbox
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "hsl(142 50% 94%)", color: "hsl(142 55% 33%)", border: "1px solid hsl(142 45% 87%)" }}
                    >
                      Live
                    </span>
                  </div>
                </div>

                {/* App header */}
                <div
                  className="flex items-center justify-between px-5 py-3 border-b"
                  style={{ background: "hsl(220 18% 98.5%)", borderColor: "hsl(220 16% 90%)" }}
                >
                  <div>
                    <p className="text-[12px] font-semibold" style={{ color: "hsl(220 25% 10%)" }}>
                      Inbox
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "hsl(220 12% 54%)" }}>
                      4 conversations · 2 need review
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {["Messenger", "Viber", "WhatsApp"].map((ch, i) => (
                      <span
                        key={ch}
                        className="text-[8.5px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: ["#0084FF14","#7B52D414","#25D36614"][i],
                          color: ["#0084FF","#7B52D4","#25D366"][i],
                        }}
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Two-pane layout */}
                <div className="flex" style={{ minHeight: 380 }}>
                  {/* Queue */}
                  <div
                    className="w-52 flex-shrink-0 flex flex-col border-r overflow-auto"
                    style={{ background: "hsl(220 18% 97.5%)", borderColor: "hsl(220 16% 89%)" }}
                  >
                    <div className="px-3.5 py-2 border-b" style={{ borderColor: "hsl(220 16% 91%)" }}>
                      <p className="text-[8.5px] font-bold tracking-[0.12em] uppercase" style={{ color: "hsl(220 12% 58%)" }}>
                        Queue · {QUEUE.length}
                      </p>
                    </div>
                    {QUEUE.map((item) => (
                      <QueueRow
                        key={item.id}
                        item={item}
                        selected={selectedId === item.id}
                        onClick={() => setSelectedId(item.id)}
                      />
                    ))}
                  </div>

                  {/* Thread + AI reply */}
                  <div className="flex-1 min-w-0" style={{ background: "white" }}>
                    {thread && <ThreadPanel thread={thread} />}
                  </div>
                </div>

                {/* Bottom shimmer */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom rule */}
        <motion.div
          animate={{ opacity: frameVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px bg-foreground/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}