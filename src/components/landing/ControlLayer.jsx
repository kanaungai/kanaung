import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  MessageSquare,
  ArrowRightLeft,
  Globe,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  Zap,
  MoreHorizontal,
  Send,
} from "lucide-react";

const CONVERSATIONS = [
  {
    id: 1,
    name: "Kyaw Zin Oo",
    channel: "Messenger",
    preview: "EX55 model ရှိသေးလား? ဈေးနှုန်းပြောပြပါ",
    time: "2m ago",
    status: "resolved",
    priority: null,
  },
  {
    id: 2,
    name: "Aung Myat Thu",
    channel: "Viber",
    preview: "Generator 50KVA bulk order — need pricing",
    time: "18m ago",
    status: "escalated",
    priority: "high",
  },
  {
    id: 3,
    name: "Ma Hnin Wai",
    channel: "Web",
    preview: "ရန်ကုန်ကို delivery ဘယ်လောက်ကြာလဲ?",
    time: "34m ago",
    status: "resolved",
    priority: null,
  },
  {
    id: 4,
    name: "Ko Htet Aung",
    channel: "Messenger",
    preview: "Wheel loader WL350 — demo request",
    time: "1h ago",
    status: "escalated",
    priority: "medium",
  },
  {
    id: 5,
    name: "Su Myat Noe",
    channel: "Web",
    preview: "ရုံးချိန် ဘယ်အချိန်ဖွင့်လဲ?",
    time: "2h ago",
    status: "resolved",
    priority: null,
  },
  {
    id: 6,
    name: "Mg Zaw Win",
    channel: "Viber",
    preview: "Fleet purchase — 3 excavators to Mandalay",
    time: "3h ago",
    status: "escalated",
    priority: "high",
  },
];

const SELECTED_CONV = {
  id: 2,
  name: "Aung Myat Thu",
  phone: "09-456-789-123",
  channel: "Viber",
  time: "18 minutes ago",
  priority: "high",
  status: "escalated",
  inquiry: "Generator 50KVA လောကြည့်ရမလဲ? Bulk order ဆိုရင် ဈေးနှုန်းသက်သာမလဲ? ၅ လုံးဝယ်ချင်တယ်",
  aiReply: "မင်္ဂလာပါ။ Generator 50KVA single unit ဈေးနှုန်းမှာ ကျပ် ၁၄၅ သိန်းမှ စတင်ပါတယ်။ Bulk order ၅ လုံးအတွက် သီးသန့် quote ပေးနိုင်ပါတယ် — ပုံမှန်အတွက် ၅–8% လျော့ပေးနိုင်ပါတယ်။ Sales team မှ အသေးစိတ် ဆက်သွယ်ပေးပါ့မယ်။",
  source: "Product Catalog · Generator specifications",
  handoff: true,
  handoffReason: "Bulk purchase — pricing authority required",
};

const STATUS_FILTERS = ["All", "Escalated", "Resolved"];

export default function ControlLayer() {
  const [selectedId, setSelectedId] = useState(2);
  const [filter, setFilter] = useState("All");

  const filtered = CONVERSATIONS.filter((c) => {
    if (filter === "All") return true;
    if (filter === "Escalated") return c.status === "escalated";
    if (filter === "Resolved") return c.status === "resolved";
    return true;
  });

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
              Every conversation, fully in view.
            </h2>
            <p className="text-[16px] text-muted-foreground leading-[1.8] md:pt-2 max-w-md font-inter">
              Review AI-handled conversations, monitor escalations, capture leads, and follow up — all from a single operations dashboard built for Myanmar businesses.
            </p>
          </div>
        </motion.div>

        {/* ── Product render ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1px solid hsl(220 16% 84%)",
            boxShadow: "0 0 0 1px hsl(220 20% 96%), 0 32px 80px -16px hsl(220 25% 15% / 0.14), 0 8px 24px -4px hsl(220 25% 15% / 0.05)",
            background: "hsl(220 18% 96.5%)",
          }}
        >
          {/* Top inner highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-10" />

          {/* ── Browser bar ── */}
          <div
            className="flex items-center gap-4 px-5 py-3 border-b"
            style={{ background: "hsl(220 18% 98.5%)", borderColor: "hsl(220 16% 87%)" }}
          >
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {["hsl(0 0% 80%)", "hsl(0 0% 80%)", "hsl(0 0% 80%)"].map((bg, i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: bg }} />
              ))}
            </div>
            <div className="flex-1 flex justify-center">
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono"
                style={{ background: "hsl(220 16% 94%)", border: "1px solid hsl(220 16% 88%)", color: "hsl(220 12% 52%)", minWidth: 220, justifyContent: "center" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                app.kanaung.ai / conversations
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] font-medium" style={{ color: "hsl(220 12% 58%)" }}>Golden Star Machinery</span>
              <div className="w-px h-3" style={{ background: "hsl(220 16% 86%)" }} />
              <span
                className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "hsl(142 50% 94%)", color: "hsl(142 55% 35%)", border: "1px solid hsl(142 45% 86%)" }}
              >
                47 today
              </span>
            </div>
          </div>

          {/* ── App body ── */}
          <div className="flex" style={{ minHeight: 560 }}>

            {/* ── Left: Conversation list ── */}
            <div
              className="w-72 flex-shrink-0 flex flex-col border-r"
              style={{ background: "hsl(220 18% 97.5%)", borderColor: "hsl(220 16% 88%)" }}
            >
              {/* List header */}
              <div className="px-5 py-4 border-b" style={{ borderColor: "hsl(220 16% 90%)" }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[13px] font-semibold text-foreground tracking-[-0.015em]">
                    Conversations
                  </p>
                  <span className="text-[10px] font-medium" style={{ color: "hsl(220 12% 56%)" }}>
                    {filtered.length} shown
                  </span>
                </div>
                {/* Filter tabs */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg" style={{ background: "hsl(220 16% 92%)" }}>
                  {STATUS_FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className="flex-1 text-[10px] font-semibold py-1 rounded-md transition-all duration-150"
                      style={
                        filter === f
                          ? { background: "white", color: "hsl(220 25% 10%)", boxShadow: "0 1px 3px hsl(220 25% 15% / 0.1)" }
                          : { color: "hsl(220 12% 52%)" }
                      }
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* List items */}
              <div className="flex-1 overflow-auto py-2">
                {filtered.map((conv) => {
                  const isSelected = selectedId === conv.id;
                  return (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedId(conv.id)}
                      className="w-full text-left px-4 py-3.5 transition-all duration-150 relative border-l-2"
                      style={{
                        background: isSelected ? "hsl(220 18% 99%)" : "transparent",
                        borderLeftColor: isSelected
                          ? "hsl(220 25% 12%)"
                          : "transparent",
                      }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p
                          className="text-[12px] font-semibold leading-snug tracking-[-0.01em]"
                          style={{ color: isSelected ? "hsl(220 25% 10%)" : "hsl(220 18% 22%)" }}
                        >
                          {conv.name}
                        </p>
                        <span className="text-[9px] flex-shrink-0 mt-0.5" style={{ color: "hsl(220 12% 60%)" }}>
                          {conv.time}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed truncate mb-2" style={{ color: "hsl(220 12% 54%)" }}>
                        {conv.preview}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[9px] font-medium px-1.5 py-0.5 rounded"
                          style={{ background: "hsl(220 16% 92%)", color: "hsl(220 12% 50%)" }}
                        >
                          {conv.channel}
                        </span>
                        {conv.status === "escalated" ? (
                          <span
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                            style={{
                              background: conv.priority === "high" ? "hsl(0 70% 96%)" : "hsl(38 80% 95%)",
                              color: conv.priority === "high" ? "hsl(0 65% 42%)" : "hsl(38 75% 38%)",
                            }}
                          >
                            {conv.priority === "high" ? "High priority" : "Escalated"}
                          </span>
                        ) : (
                          <span
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                            style={{ background: "hsl(142 55% 95%)", color: "hsl(142 55% 32%)" }}
                          >
                            AI resolved
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Right: Conversation detail ── */}
            <div className="flex-1 flex flex-col min-w-0" style={{ background: "white" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col h-full"
                >
                  {/* Detail top bar */}
                  <div
                    className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
                    style={{ borderColor: "hsl(220 16% 91%)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "hsl(220 16% 92%)" }}
                      >
                        <User className="w-3.5 h-3.5" style={{ color: "hsl(220 12% 48%)" }} />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-foreground tracking-[-0.01em] leading-snug">
                          {SELECTED_CONV.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Phone className="w-2.5 h-2.5" style={{ color: "hsl(220 12% 60%)" }} />
                          <p className="text-[10px]" style={{ color: "hsl(220 12% 56%)" }}>
                            {SELECTED_CONV.phone}
                          </p>
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ background: "hsl(220 16% 93%)", color: "hsl(220 12% 50%)" }}>
                            {SELECTED_CONV.channel}
                          </span>
                          <span className="text-[9px]" style={{ color: "hsl(220 12% 62%)" }}>{SELECTED_CONV.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "hsl(0 70% 96%)", color: "hsl(0 65% 40%)", border: "1px solid hsl(0 60% 90%)" }}
                      >
                        High Priority
                      </span>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-foreground/5">
                        <MoreHorizontal className="w-3.5 h-3.5" style={{ color: "hsl(220 12% 55%)" }} />
                      </button>
                    </div>
                  </div>

                  {/* Conversation thread */}
                  <div className="flex-1 px-6 py-5 space-y-4 overflow-auto">

                    {/* Customer message */}
                    <div className="flex gap-3 justify-end">
                      <div className="max-w-[72%]">
                        <p
                          className="text-[11px] font-medium mb-1 text-right"
                          style={{ color: "hsl(220 12% 58%)" }}
                        >
                          Customer
                        </p>
                        <div
                          className="px-4 py-3 rounded-2xl rounded-tr-md text-[13px] leading-relaxed"
                          style={{
                            background: "hsl(220 25% 11%)",
                            color: "hsl(220 20% 94%)",
                          }}
                        >
                          {SELECTED_CONV.inquiry}
                        </div>
                      </div>
                    </div>

                    {/* AI reply */}
                    <div className="flex gap-3">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-5"
                        style={{ background: "hsl(220 20% 96%)", border: "1px solid hsl(220 16% 88%)" }}
                      >
                        <Zap className="w-3 h-3" style={{ color: "hsl(220 25% 30%)" }} />
                      </div>
                      <div className="max-w-[78%]">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[11px] font-semibold" style={{ color: "hsl(220 18% 30%)" }}>Kanaung AI</p>
                          <span
                            className="text-[9px] font-medium px-1.5 py-0.5 rounded"
                            style={{ background: "hsl(220 16% 93%)", color: "hsl(220 12% 52%)" }}
                          >
                            Auto-generated
                          </span>
                        </div>
                        <div
                          className="px-4 py-3 rounded-2xl rounded-tl-md text-[13px] leading-relaxed"
                          style={{ background: "hsl(220 18% 96%)", color: "hsl(220 18% 22%)", border: "1px solid hsl(220 16% 90%)" }}
                        >
                          {SELECTED_CONV.aiReply}
                        </div>
                        {/* Source attribution */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <BookOpen className="w-3 h-3" style={{ color: "hsl(220 12% 64%)" }} />
                          <p className="text-[10px]" style={{ color: "hsl(220 12% 58%)" }}>
                            Source: {SELECTED_CONV.source}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Handoff notice */}
                    <div
                      className="flex items-start gap-3 px-4 py-3.5 rounded-xl"
                      style={{
                        background: "hsl(38 80% 97%)",
                        border: "1px solid hsl(38 70% 88%)",
                      }}
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(38 75% 45%)" }} />
                      <div>
                        <p className="text-[12px] font-semibold" style={{ color: "hsl(38 60% 32%)" }}>
                          Escalated for human follow-up
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: "hsl(38 45% 48%)" }}>
                          {SELECTED_CONV.handoffReason}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action bar */}
                  <div
                    className="flex items-center gap-3 px-6 py-4 border-t flex-shrink-0"
                    style={{ borderColor: "hsl(220 16% 91%)", background: "hsl(220 18% 98.5%)" }}
                  >
                    <button
                      className="flex items-center gap-1.5 text-[11px] font-semibold px-3.5 py-2 rounded-lg transition-colors"
                      style={{ background: "hsl(220 25% 11%)", color: "white" }}
                    >
                      <Send className="w-3 h-3" />
                      Assign to agent
                    </button>
                    <button
                      className="flex items-center gap-1.5 text-[11px] font-semibold px-3.5 py-2 rounded-lg transition-colors"
                      style={{ background: "hsl(220 16% 93%)", color: "hsl(220 18% 25%)", border: "1px solid hsl(220 16% 88%)" }}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      Mark resolved
                    </button>
                    <div className="flex-1" />
                    <span className="text-[10px]" style={{ color: "hsl(220 12% 60%)" }}>
                      Reply via {SELECTED_CONV.channel}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
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