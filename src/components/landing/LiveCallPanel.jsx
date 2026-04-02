import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Zap, ChevronRight, Clock, User, MessageSquare } from "lucide-react";

const QUEUE = [
  {
    id: 1,
    name: "Ko Zaw Lin",
    preview: "L200 spare parts — availability & price",
    channel: "Messenger",
    status: "review",
    time: "2m ago",
    intent: "Product Inquiry",
  },
  {
    id: 2,
    name: "Ma Hnin Thida",
    preview: "ဒီကနေ Mandalay ပို့ဆောင်ပေးနိုင်သလား?",
    channel: "Viber",
    status: "ready",
    time: "8m ago",
    intent: "Delivery Query",
  },
  {
    id: 3,
    name: "Aung Myat Thu",
    preview: "Generator 50KVA bulk order — 5 units",
    channel: "Web",
    status: "escalated",
    time: "14m ago",
    intent: "Bulk Purchase",
  },
  {
    id: 4,
    name: "Kyaw Zin Oo",
    preview: "EX55 excavator ဈေးနှုန်းပြောပါ",
    channel: "Messenger",
    status: "ready",
    time: "22m ago",
    intent: "Pricing",
  },
];

const DETAIL = {
  inquiry: "Mitsubishi L200 (2022 model) အတွက် spare parts ရှိသေးလား? Crankshaft bearing နဲ့ timing belt set ဈေးနှုန်းပါ ပြောပြပါ။",
  draft: "မင်္ဂလာပါ။ Mitsubishi L200 2022 model အတွက် spare parts ရှိပါတယ်။\n\n• Crankshaft bearing set — ကျပ် ၁၂,၅၀၀\n• Timing belt set — ကျပ် ၁၈,၀၀၀\n\nဒါ့အပြင် ကျွန်တော်တို့ဆိုင် OEM genuine parts နဲ့ aftermarket options နှစ်မျိုးလုံး ရပါတယ်။ ဘယ် option ကြိုက်ပါသလဲ?",
  confidence: 94,
  signals: ["Product match found", "Price data used", "Stock confirmed"],
};

function QueueItem({ item, selected, onClick }) {
  const statusColor =
    item.status === "ready"
      ? { dot: "#22c55e", badge: { bg: "hsl(142 55% 95%)", color: "hsl(142 55% 33%)" }, label: "Ready" }
      : item.status === "review"
      ? { dot: "#f59e0b", badge: { bg: "hsl(43 90% 95%)", color: "hsl(38 70% 36%)" }, label: "Needs review" }
      : { dot: "#ef4444", badge: { bg: "hsl(0 70% 96%)", color: "hsl(0 65% 40%)" }, label: "Escalated" };

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-3 flex items-start gap-2.5 transition-all duration-100 border-l-2"
      style={{
        borderLeftColor: selected ? "hsl(220 25% 12%)" : "transparent",
        background: selected ? "white" : "transparent",
        borderBottom: "1px solid hsl(220 16% 92%)",
      }}
    >
      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: statusColor.dot }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className="text-[11px] font-semibold truncate" style={{ color: "hsl(220 25% 12%)" }}>
            {item.name}
          </span>
          <span className="text-[9px] flex-shrink-0" style={{ color: "hsl(220 12% 60%)" }}>
            {item.time}
          </span>
        </div>
        <p className="text-[10px] truncate mb-1.5" style={{ color: "hsl(220 12% 52%)" }}>
          {item.preview}
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className="text-[8px] font-medium px-1.5 py-0.5 rounded"
            style={{ background: "hsl(220 16% 92%)", color: "hsl(220 12% 48%)" }}
          >
            {item.channel}
          </span>
          <span
            className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
            style={statusColor.badge}
          >
            {statusColor.label}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function LiveCallPanel() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="relative w-full">
      {/* Ambient glow */}
      <div className="absolute -inset-4 rounded-[32px] bg-primary/[0.05] blur-3xl pointer-events-none" />
      <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-br from-blue-500/[0.04] via-transparent to-primary/[0.04] blur-xl pointer-events-none" />

      {/* App shell */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "hsl(220 18% 98%)",
          border: "1px solid hsl(220 16% 86%)",
          boxShadow:
            "0 0 0 1px hsl(220 20% 96%), 0 24px 60px -10px hsl(220 25% 15% / 0.14), 0 6px 20px -4px hsl(220 25% 15% / 0.06)",
        }}
      >
        {/* Top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-10" />

        {/* Browser bar */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 border-b"
          style={{ background: "hsl(0 0% 100%)", borderColor: "hsl(220 16% 88%)" }}
        >
          <div className="flex items-center gap-1.5">
            {["hsl(0 75% 70%)", "hsl(38 75% 60%)", "hsl(142 55% 55%)"].map((c, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-mono flex-1 justify-center"
            style={{ background: "hsl(220 16% 94%)", border: "1px solid hsl(220 16% 89%)", color: "hsl(220 12% 52%)", maxWidth: 210 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            app.kanaung.ai / inbox
          </div>
          <span
            className="text-[8px] font-semibold px-2 py-0.5 rounded-full ml-auto"
            style={{ background: "hsl(142 50% 94%)", color: "hsl(142 55% 33%)", border: "1px solid hsl(142 45% 86%)" }}
          >
            ● LIVE
          </span>
        </div>

        {/* Inner topbar */}
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b"
          style={{ background: "white", borderColor: "hsl(220 16% 90%)" }}
        >
          <div>
            <p className="text-[12px] font-semibold" style={{ color: "hsl(220 25% 10%)" }}>
              Inbox
            </p>
            <p className="text-[9px]" style={{ color: "hsl(220 12% 55%)" }}>
              24 today · 3 need review · 21 handled by AI
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="text-[9px] font-semibold px-2 py-1 rounded-full"
              style={{ background: "hsl(220 18% 95%)", color: "hsl(220 18% 38%)", border: "1px solid hsl(220 16% 87%)" }}
            >
              Golden Star Auto Parts
            </span>
          </div>
        </div>

        {/* Main area */}
        <div className="flex" style={{ minHeight: 360 }}>

          {/* Queue sidebar */}
          <div
            className="w-[185px] flex-shrink-0 border-r overflow-hidden flex flex-col"
            style={{ background: "hsl(220 18% 97.5%)", borderColor: "hsl(220 16% 89%)" }}
          >
            <div className="px-3 py-2 border-b" style={{ borderColor: "hsl(220 16% 91%)" }}>
              <p className="text-[8px] font-bold tracking-[0.1em] uppercase" style={{ color: "hsl(220 12% 56%)" }}>
                Queue · {QUEUE.length}
              </p>
            </div>
            {QUEUE.map((item) => (
              <QueueItem
                key={item.id}
                item={item}
                selected={selected === item.id}
                onClick={() => setSelected(item.id)}
              />
            ))}
          </div>

          {/* Detail panel */}
          <div className="flex-1 min-w-0 flex flex-col bg-white">

            {/* Customer strip */}
            <div className="px-4 py-3 border-b flex items-center gap-2.5" style={{ borderColor: "hsl(220 16% 91%)" }}>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(220 16% 92%)" }}
              >
                <User className="w-3.5 h-3.5" style={{ color: "hsl(220 12% 46%)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold" style={{ color: "hsl(220 25% 10%)" }}>
                  Ko Zaw Lin
                </p>
                <p className="text-[9px]" style={{ color: "hsl(220 12% 54%)" }}>
                  via Messenger · 2 minutes ago
                </p>
              </div>
              <span
                className="text-[8px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0"
                style={{ background: "hsl(43 90% 95%)", color: "hsl(38 70% 36%)", border: "1px solid hsl(43 60% 85%)" }}
              >
                Needs review
              </span>
            </div>

            {/* Customer message */}
            <div className="px-4 pt-4 pb-2">
              <p className="text-[8px] font-bold tracking-[0.09em] uppercase mb-2" style={{ color: "hsl(220 12% 56%)" }}>
                Customer Inquiry
              </p>
              <div
                className="px-3 py-2.5 rounded-xl text-[11px] leading-relaxed"
                style={{
                  background: "hsl(220 18% 97%)",
                  border: "1px solid hsl(220 16% 90%)",
                  color: "hsl(220 18% 22%)",
                }}
              >
                {DETAIL.inquiry}
              </div>
            </div>

            {/* AI Draft — focal point */}
            <div className="px-4 pt-3 pb-3 flex-1">
              {/* Header row */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="flex items-center gap-1.5 flex-1"
                >
                  <Zap className="w-3 h-3" style={{ color: "hsl(220 20% 42%)" }} />
                  <p className="text-[8px] font-bold tracking-[0.09em] uppercase" style={{ color: "hsl(220 12% 56%)" }}>
                    AI Drafted Reply
                  </p>
                </div>
                {/* Confidence pill */}
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-full"
                  style={{ background: "hsl(142 50% 95%)", border: "1px solid hsl(142 45% 86%)" }}
                >
                  <CheckCircle2 className="w-2.5 h-2.5" style={{ color: "hsl(142 55% 40%)" }} />
                  <span className="text-[8px] font-bold" style={{ color: "hsl(142 55% 33%)" }}>
                    {DETAIL.confidence}% confidence
                  </span>
                </div>
              </div>

              {/* Draft card — elevated, dominant */}
              <div
                className="relative px-3.5 py-3 rounded-xl text-[11px] leading-relaxed mb-2.5"
                style={{
                  background: "white",
                  border: "1.5px solid hsl(220 16% 86%)",
                  color: "hsl(220 18% 20%)",
                  boxShadow: "0 2px 12px hsl(220 25% 15% / 0.07)",
                  whiteSpace: "pre-line",
                }}
              >
                <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-foreground/8 to-transparent pointer-events-none" />
                {DETAIL.draft}
              </div>

              {/* Signals */}
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                {DETAIL.signals.map((s) => (
                  <span
                    key={s}
                    className="text-[8px] font-medium px-1.5 py-0.5 rounded-full flex items-center gap-1"
                    style={{ background: "hsl(220 16% 94%)", color: "hsl(220 12% 46%)" }}
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    {s}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 text-[10px] font-semibold py-2 rounded-lg transition-all"
                  style={{ background: "hsl(220 25% 11%)", color: "white" }}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Approve & Send
                </button>
                <button
                  className="flex items-center justify-center gap-1.5 text-[10px] font-semibold py-2 px-3 rounded-lg transition-all"
                  style={{
                    background: "transparent",
                    color: "hsl(38 70% 38%)",
                    border: "1.5px solid hsl(43 60% 82%)",
                  }}
                >
                  <AlertCircle className="w-3 h-3" />
                  Escalate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}