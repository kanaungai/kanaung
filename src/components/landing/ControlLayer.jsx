import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ArrowRightLeft,
  Globe,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  Zap,
  BookOpen,
  ChevronRight,
  Clock,
} from "lucide-react";

// ── Top summary stats ──
const SUMMARY = [
  { label: "Active Conversations", value: "47", delta: "+12 vs yesterday" },
  { label: "Escalations Pending", value: "3", delta: "2 high priority" },
  { label: "AI Resolution Rate", value: "94%", delta: "Last 7 days" },
  { label: "Channels Online", value: "3 / 4", delta: "Web · Messenger · Viber" },
];

// ── Conversation queue ──
const QUEUE = [
  {
    id: 1,
    name: "Aung Myat Thu",
    preview: "Generator 50KVA bulk order — need pricing for 5 units",
    channel: "Viber",
    status: "escalated",
    priority: "high",
    time: "18m ago",
    assigned: null,
  },
  {
    id: 2,
    name: "Ko Htet Aung",
    preview: "Wheel loader WL350 — requesting live demo",
    channel: "Messenger",
    status: "escalated",
    priority: "medium",
    time: "1h ago",
    assigned: null,
  },
  {
    id: 3,
    name: "Kyaw Zin Oo",
    preview: "EX55 model ရှိသေးလား? ဈေးနှုန်းပြောပြပါ",
    channel: "Messenger",
    status: "resolved",
    priority: null,
    time: "2h ago",
    assigned: "AI",
  },
  {
    id: 4,
    name: "Mg Zaw Win",
    preview: "Fleet purchase — 3 excavators, delivery to Mandalay",
    channel: "Web",
    status: "escalated",
    priority: "high",
    time: "3h ago",
    assigned: null,
  },
  {
    id: 5,
    name: "Ma Hnin Wai",
    preview: "ရန်ကုန်ကို delivery ဘယ်လောက်ကြာလဲ?",
    channel: "Web",
    status: "resolved",
    priority: null,
    time: "3h ago",
    assigned: "AI",
  },
  {
    id: 6,
    name: "Su Myat Noe",
    preview: "ရုံးချိန် ဘယ်အချိန်ဖွင့်လဲ?",
    channel: "Web",
    status: "resolved",
    priority: null,
    time: "4h ago",
    assigned: "AI",
  },
];

// ── Selected conversation detail ──
const DETAIL = {
  1: {
    name: "Aung Myat Thu",
    phone: "09-456-789-123",
    channel: "Viber",
    time: "18 minutes ago",
    priority: "high",
    inquiry: "Generator 50KVA လောကြည့်ရမလဲ? Bulk order ဆိုရင် ဈေးနှုန်းသက်သာမလဲ? ၅ လုံးဝယ်ချင်တယ်",
    aiReply: "Generator 50KVA single unit ဈေးနှုန်းမှာ ကျပ် ၁၄၅ သိန်းမှ စတင်ပါတယ်။ Bulk order ၅ လုံးအတွက် ၅–8% လျော့ပေးနိုင်ပါတယ်။ Sales team မှ အသေးစိတ် ဆက်သွယ်ပေးပါ့မယ်။",
    source: "Product Catalog · Generator specs",
    handoff: true,
    handoffReason: "Bulk purchase — pricing authority required",
  },
  2: {
    name: "Ko Htet Aung",
    phone: "09-321-654-987",
    channel: "Messenger",
    time: "1 hour ago",
    priority: "medium",
    inquiry: "Wheel loader WL350 demo ကြည့်လို့ရလား? ဘယ်နေ့ဘယ်အချိန် သွားလို့ရမလဲ?",
    aiReply: "WL350 demo ကြည့်ရှုနိုင်ပါတယ်။ တနင်္လာမှ စနေ နံနက် ၉:၀၀ မှ ညနေ ၅:၃၀ ထိ ရရှိနိုင်ပါတယ်။ ကြိုတင်ချိန်းဆိုပေးဖို့ team မှ ဆက်သွယ်ပေးပါ့မယ်။",
    source: "Locations & Hours · Demo policy",
    handoff: true,
    handoffReason: "Showroom demo request — scheduling required",
  },
  3: {
    name: "Kyaw Zin Oo",
    phone: "09-789-123-456",
    channel: "Messenger",
    time: "2 hours ago",
    priority: null,
    inquiry: "EX55 model ရှိသေးလား? ဈေးနှုန်းပြောပြပါ",
    aiReply: "EX55 model လက်ရှိ stock ရှိပါတယ်။ ကျပ် ၂၈၀ သိန်းမှ စတင်ပါတယ်။ အရောင် ၂ မျိုး ရရှိနိုင်ပါတယ်။",
    source: "Product Catalog · EX55 specifications",
    handoff: false,
    handoffReason: null,
  },
  4: {
    name: "Mg Zaw Win",
    phone: "09-111-222-333",
    channel: "Web",
    time: "3 hours ago",
    priority: "high",
    inquiry: "Excavator ၃ လုံး Mandalay ကို ပို့ဆောင်ပေးနိုင်မလား? ဈေးနှုန်းနဲ့ timelines ပါ ပြောပြပါ",
    aiReply: "Mandalay ကို ပို့ဆောင်ပေးနိုင်ပါတယ်။ Fleet order အတွက် သီးသန့် quote နဲ့ logistics planning ပေးနိုင်ပါတယ်။",
    source: "Delivery Policy · Upcountry rates",
    handoff: true,
    handoffReason: "Fleet sale + upcountry logistics — senior sales required",
  },
  5: {
    name: "Ma Hnin Wai",
    phone: "09-222-333-444",
    channel: "Web",
    time: "3 hours ago",
    priority: null,
    inquiry: "ရန်ကုန်ကို delivery ဘယ်လောက်ကြာလဲ?",
    aiReply: "ရန်ကုန်တွင်း delivery ၁–၂ ရက်အတွင်း ပြီးပါတယ်။ ပို့ဆောင်ခ အခမဲ့ ဖြစ်ပါတယ်။",
    source: "Delivery Policy · Yangon delivery",
    handoff: false,
    handoffReason: null,
  },
  6: {
    name: "Su Myat Noe",
    phone: "09-555-666-777",
    channel: "Web",
    time: "4 hours ago",
    priority: null,
    inquiry: "ရုံးချိန် ဘယ်အချိန်ဖွင့်လဲ?",
    aiReply: "တနင်္လာ မှ စနေ နံနက် ၉:၀၀ မှ ညနေ ၅:၃၀ ထိ ဖွင့်ပါတယ်။ တနင်္ဂနွေ ပိတ်ပါတယ်။",
    source: "Locations & Hours",
    handoff: false,
    handoffReason: null,
  },
};

function SummaryStrip() {
  return (
    <div className="grid grid-cols-4 border-b" style={{ borderColor: "hsl(220 16% 89%)" }}>
      {SUMMARY.map((s, i) => (
        <div
          key={s.label}
          className="px-6 py-4 border-r last:border-r-0"
          style={{ borderColor: "hsl(220 16% 89%)" }}
        >
          <p
            className="text-[22px] font-bold tracking-[-0.03em] leading-none"
            style={{ color: "hsl(220 25% 10%)" }}
          >
            {s.value}
          </p>
          <p
            className="text-[11px] font-semibold mt-1.5 leading-none"
            style={{ color: "hsl(220 18% 30%)" }}
          >
            {s.label}
          </p>
          <p
            className="text-[10px] mt-1 leading-none"
            style={{ color: "hsl(220 12% 58%)" }}
          >
            {s.delta}
          </p>
        </div>
      ))}
    </div>
  );
}

function QueueRow({ conv, isSelected, onClick }) {
  const isEscalated = conv.status === "escalated";
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3.5 flex items-start gap-3.5 transition-all duration-100 border-l-2 border-b"
      style={{
        borderLeftColor: isSelected ? "hsl(220 25% 12%)" : "transparent",
        borderBottomColor: "hsl(220 16% 92%)",
        background: isSelected ? "white" : "transparent",
      }}
    >
      {/* Status dot */}
      <div className="flex-shrink-0 mt-1">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: isEscalated
              ? conv.priority === "high"
                ? "hsl(0 65% 52%)"
                : "hsl(38 75% 48%)"
              : "hsl(142 55% 46%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p
            className="text-[12px] font-semibold leading-snug tracking-[-0.01em]"
            style={{ color: isSelected ? "hsl(220 25% 10%)" : "hsl(220 18% 20%)" }}
          >
            {conv.name}
          </p>
          <span className="text-[9px] flex-shrink-0" style={{ color: "hsl(220 12% 62%)" }}>
            {conv.time}
          </span>
        </div>
        <p className="text-[11px] leading-snug truncate mb-1.5" style={{ color: "hsl(220 12% 52%)" }}>
          {conv.preview}
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className="text-[9px] font-medium px-1.5 py-0.5 rounded"
            style={{ background: "hsl(220 16% 92%)", color: "hsl(220 12% 48%)" }}
          >
            {conv.channel}
          </span>
          {isEscalated ? (
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
              style={{
                background: conv.priority === "high" ? "hsl(0 70% 96%)" : "hsl(38 80% 95%)",
                color: conv.priority === "high" ? "hsl(0 65% 40%)" : "hsl(38 70% 36%)",
              }}
            >
              {conv.priority === "high" ? "High priority" : "Escalated"}
            </span>
          ) : (
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: "hsl(142 55% 95%)", color: "hsl(142 55% 33%)" }}
            >
              AI resolved
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function DetailPanel({ detail }) {
  if (!detail) return null;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={detail.name + detail.time}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex flex-col h-full"
      >
        {/* Customer block */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "hsl(220 16% 91%)" }}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "hsl(220 16% 92%)" }}
              >
                <User className="w-3.5 h-3.5" style={{ color: "hsl(220 12% 46%)" }} />
              </div>
              <div>
                <p className="text-[13px] font-semibold tracking-[-0.01em]" style={{ color: "hsl(220 25% 10%)" }}>
                  {detail.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-2.5 h-2.5" style={{ color: "hsl(220 12% 60%)" }} />
                  <p className="text-[10px]" style={{ color: "hsl(220 12% 54%)" }}>{detail.phone}</p>
                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ background: "hsl(220 16% 92%)", color: "hsl(220 12% 48%)" }}>
                    {detail.channel}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {detail.priority && (
                <span
                  className="text-[9px] font-semibold px-2 py-1 rounded-full"
                  style={{
                    background: detail.priority === "high" ? "hsl(0 70% 96%)" : "hsl(38 80% 95%)",
                    color: detail.priority === "high" ? "hsl(0 65% 40%)" : "hsl(38 70% 36%)",
                    border: `1px solid ${detail.priority === "high" ? "hsl(0 60% 89%)" : "hsl(38 65% 86%)"}`,
                  }}
                >
                  {detail.priority === "high" ? "High priority" : "Medium"}
                </span>
              )}
              <span className="text-[9px]" style={{ color: "hsl(220 12% 62%)" }}>{detail.time}</span>
            </div>
          </div>
        </div>

        {/* Inquiry */}
        <div className="px-5 py-4 border-b" style={{ borderColor: "hsl(220 16% 91%)" }}>
          <p className="text-[9px] font-bold tracking-[0.1em] uppercase mb-2" style={{ color: "hsl(220 12% 58%)" }}>
            Customer Inquiry
          </p>
          <p className="text-[12px] leading-relaxed" style={{ color: "hsl(220 18% 22%)" }}>
            {detail.inquiry}
          </p>
        </div>

        {/* AI Reply */}
        <div className="px-5 py-4 border-b flex-1" style={{ borderColor: "hsl(220 16% 91%)" }}>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Zap className="w-3 h-3" style={{ color: "hsl(220 20% 40%)" }} />
            <p className="text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "hsl(220 12% 58%)" }}>
              AI Generated Reply
            </p>
            <span
              className="text-[8px] font-semibold px-1.5 py-0.5 rounded ml-auto"
              style={{ background: "hsl(220 16% 93%)", color: "hsl(220 12% 50%)" }}
            >
              Auto-drafted
            </span>
          </div>
          <div
            className="px-3.5 py-3 rounded-xl text-[12px] leading-relaxed mb-3"
            style={{
              background: "hsl(220 18% 97%)",
              border: "1px solid hsl(220 16% 90%)",
              color: "hsl(220 18% 22%)",
            }}
          >
            {detail.aiReply}
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3 h-3" style={{ color: "hsl(220 12% 64%)" }} />
            <p className="text-[10px]" style={{ color: "hsl(220 12% 58%)" }}>
              Source: {detail.source}
            </p>
          </div>
        </div>

        {/* Handoff notice */}
        {detail.handoff && (
          <div
            className="mx-5 my-3 flex items-start gap-2.5 px-3.5 py-3 rounded-xl"
            style={{ background: "hsl(38 80% 97%)", border: "1px solid hsl(38 65% 88%)" }}
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "hsl(38 72% 44%)" }} />
            <div>
              <p className="text-[11px] font-semibold" style={{ color: "hsl(38 58% 30%)" }}>
                Escalated for human follow-up
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "hsl(38 45% 48%)" }}>
                {detail.handoffReason}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div
          className="flex items-center gap-2 px-5 py-3.5 border-t flex-shrink-0"
          style={{ borderColor: "hsl(220 16% 91%)", background: "hsl(220 18% 98.5%)" }}
        >
          <button
            className="text-[11px] font-semibold px-3.5 py-1.5 rounded-lg"
            style={{ background: "hsl(220 25% 11%)", color: "white" }}
          >
            Assign to agent
          </button>
          <button
            className="text-[11px] font-semibold px-3.5 py-1.5 rounded-lg"
            style={{ background: "hsl(220 16% 93%)", color: "hsl(220 18% 24%)", border: "1px solid hsl(220 16% 88%)" }}
          >
            Mark resolved
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ControlLayer() {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-8">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-6">
            The Control Layer
          </p>
          <div className="w-full h-px bg-foreground/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[44px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.06] text-foreground">
              Full visibility over every customer conversation.
            </h2>
            <p className="text-[16px] text-muted-foreground leading-[1.8] md:pt-2 max-w-md font-inter">
              Monitor AI-handled conversations, review auto-generated replies, and manage human escalations — all from one operations dashboard built for Myanmar businesses.
            </p>
          </div>
        </motion.div>

        {/* ── Dashboard chrome ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1px solid hsl(220 16% 84%)",
            boxShadow: "0 0 0 1px hsl(220 20% 95%), 0 32px 80px -16px hsl(220 25% 15% / 0.13), 0 8px 24px -4px hsl(220 25% 15% / 0.05)",
            background: "hsl(220 18% 97%)",
          }}
        >
          {/* Inner top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-10" />

          {/* ── Browser bar ── */}
          <div
            className="flex items-center gap-4 px-5 py-3 border-b"
            style={{ background: "hsl(220 18% 98.5%)", borderColor: "hsl(220 16% 87%)" }}
          >
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(220 10% 81%)" }} />
              ))}
            </div>
            <div className="flex-1 flex justify-center">
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono"
                style={{
                  background: "hsl(220 16% 94%)",
                  border: "1px solid hsl(220 16% 88%)",
                  color: "hsl(220 12% 52%)",
                  minWidth: 220,
                  justifyContent: "center",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                app.kanaung.ai / conversations
              </div>
            </div>
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span className="text-[10px] font-semibold" style={{ color: "hsl(220 18% 26%)" }}>
                Golden Star Machinery
              </span>
              <div className="w-px h-3" style={{ background: "hsl(220 16% 86%)" }} />
              <span
                className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "hsl(142 50% 94%)", color: "hsl(142 55% 33%)", border: "1px solid hsl(142 45% 86%)" }}
              >
                Live
              </span>
            </div>
          </div>

          {/* ── Top bar inside app ── */}
          <div
            className="flex items-center justify-between px-6 py-3.5 border-b"
            style={{ background: "hsl(220 18% 98.5%)", borderColor: "hsl(220 16% 89%)" }}
          >
            <div>
              <p className="text-[14px] font-semibold tracking-[-0.015em]" style={{ color: "hsl(220 25% 10%)" }}>
                Conversations
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "hsl(220 12% 56%)" }}>
                47 today · 3 escalated · 44 AI resolved
              </p>
            </div>
            <button
              className="text-[11px] font-semibold px-4 py-2 rounded-lg"
              style={{ background: "hsl(220 25% 11%)", color: "white" }}
            >
              Export report
            </button>
          </div>

          {/* ── Summary strip ── */}
          <SummaryStrip />

          {/* ── Main area: queue + detail ── */}
          <div className="flex" style={{ minHeight: 420 }}>

            {/* Queue */}
            <div
              className="w-72 flex-shrink-0 flex flex-col border-r overflow-auto"
              style={{ background: "hsl(220 18% 97.5%)", borderColor: "hsl(220 16% 88%)" }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: "hsl(220 16% 90%)" }}>
                <p className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color: "hsl(220 12% 58%)" }}>
                  Queue · {QUEUE.length} conversations
                </p>
              </div>
              {QUEUE.map((conv) => (
                <QueueRow
                  key={conv.id}
                  conv={conv}
                  isSelected={selectedId === conv.id}
                  onClick={() => setSelectedId(conv.id)}
                />
              ))}
            </div>

            {/* Detail */}
            <div className="flex-1 min-w-0 flex flex-col" style={{ background: "white" }}>
              <DetailPanel detail={DETAIL[selectedId]} />
            </div>
          </div>

          {/* Bottom highlight */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent pointer-events-none" />
        </motion.div>

        {/* Bottom rule */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full h-px bg-foreground/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}