import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";
import {
  Inbox,
  BookOpen,
  Zap,
  Settings,
  BarChart2,
  GitBranch,
  Radio,
  CheckCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
  Sparkles,
  UserCheck,
  Edit3,
  ArrowUpRight,
} from "lucide-react";

// ── Sidebar nav ──
const NAV = [
  { icon: Inbox, label: "Inbox", active: true },
  { icon: BookOpen, label: "Knowledge" },
  { icon: Radio, label: "Channels" },
  { icon: BarChart2, label: "Insights" },
  { icon: GitBranch, label: "Workflows" },
  { icon: Settings, label: "Settings" },
];

// ── Category filters ──
const CATEGORIES = [
  { label: "All Conversations", count: 14 },
  { label: "Needs Review", count: 3, accent: true },
  { label: "At Risk", count: 1, warn: true },
  { label: "Awaiting Human", count: 2 },
  { label: "AI Resolved", count: 8 },
];

// ── Conversation threads ──
const THREADS = [
  {
    id: 1,
    name: "Aung Myat Thu",
    preview: "Mitsubishi L200 spare parts ရှိသေးလား? အရေးပေါ်လိုအပ်...",
    channel: "Messenger",
    tag: "Parts Enquiry",
    tagColor: "blue",
    status: "review",
    time: "8m",
    unread: true,
  },
  {
    id: 2,
    name: "Ko Htet Aung",
    preview: "Generator 50KVA bulk order — ၅ လုံး quote ပေးနိုင်မလဲ",
    channel: "Viber",
    tag: "Bulk Quotation",
    tagColor: "amber",
    status: "at-risk",
    time: "23m",
    unread: true,
  },
  {
    id: 3,
    name: "Mg Zaw Win",
    preview: "EX55 excavator ဈေးနှုန်း နှင့် Mandalay ကို delivery",
    channel: "Web",
    tag: "Delivery Enquiry",
    tagColor: "slate",
    status: "resolved",
    time: "1h",
    unread: false,
  },
  {
    id: 4,
    name: "Ma Hnin Wai",
    preview: "ရုံးချိန် ဘယ်အချိန်ဖွင့်လဲ?",
    channel: "Web",
    tag: "General",
    tagColor: "slate",
    status: "resolved",
    time: "2h",
    unread: false,
  },
];

// ── Active thread detail ──
const DETAIL = {
  1: {
    name: "Aung Myat Thu",
    channel: "Messenger",
    customerMsg: "Mitsubishi L200 spare parts ရှိသေးလားဆိုပြီး မေးချင်တယ်။ Clutch plate နဲ့ brake disc လိုတယ်။ ဒီနေ့ဆိုရင်ပိုကောင်းမယ်။ stock ရှိသေးလား?",
    aiDraft: "မင်္ဂလာပါ။ Mitsubishi L200 Clutch Plate နှင့် Brake Disc နှစ်မျိုးစလုံး လက်ရှိ stock ရှိပါသည်။ တိကျသောအရေအတွက်နှင့် specification ပေးနိုင်ပါက ကျပ်ဈေးနှုန်း ချက်ချင်း quote ပေးနိုင်ပါတယ်။ ဘယ်မော်ဒယ်နှစ်၊ ဘယ်ကာလထုတ်လဲ ပြောပြပေးပါ။",
    confidence: 72,
    intent: "Parts Enquiry",
    source: "Parts Catalog · L200 Compatibility Sheet",
    risk: null,
  },
  2: {
    name: "Ko Htet Aung",
    channel: "Viber",
    customerMsg: "Generator 50KVA bulk order ဝယ်ချင်တယ်။ ၅ လုံးလောက် ဝယ်မယ်ဆိုရင် ဈေးနှုန်း ဘယ်လောက်ရမလဲ? သက်သာမလဲ?",
    aiDraft: "Generator 50KVA single unit ကျပ် ၁၄၅ သိန်းမှ စပါတယ်။ Bulk order ၅ လုံးအတွက် discount ပေးနိုင်ပါသည်။ Sales team မှ တိကျသော quote ချက်ချင်းဆက်သွယ်ပေးပါ့မည်။",
    confidence: 61,
    intent: "Bulk Quotation",
    source: "Product Catalog · Bulk Pricing Policy",
    risk: "Bulk purchase — pricing authority required",
  },
  3: {
    name: "Mg Zaw Win",
    channel: "Web",
    customerMsg: "EX55 mini excavator ဈေးနှုန်း ဘယ်လောက်လဲ? Mandalay ကိုပို့ဆောင်ပေးနိုင်မလား?",
    aiDraft: "EX55 မော်ဒယ် ကျပ် ၂၈၀ သိန်းမှ စပါတယ်။ Mandalay ကို delivery ပေးနိုင်ပြီး ၃–၅ ရက်အတွင်း ရောက်ပါသည်။ Logistics fee သီးခြား quote ပေးပါမည်။",
    confidence: 88,
    intent: "Delivery Enquiry",
    source: "Product Catalog · Delivery Policy",
    risk: null,
  },
  4: {
    name: "Ma Hnin Wai",
    channel: "Web",
    customerMsg: "ရုံးချိန် ဘယ်အချိန်ဖွင့်လဲ?",
    aiDraft: "တနင်္လာ မှ စနေ နံနက် ၉:၀၀ မှ ညနေ ၅:၃၀ ထိ ဖွင့်ပါသည်။ တနင်္ဂနွေ ပိတ်ပါသည်။",
    confidence: 97,
    intent: "General FAQ",
    source: "Business Hours · FAQ",
    risk: null,
  },
};

function Sidebar() {
  return (
    <div
      className="w-[52px] flex-shrink-0 flex flex-col items-center py-3 gap-1 border-r"
      style={{ background: "hsl(220 18% 98.5%)", borderColor: "hsl(220 16% 90%)" }}
    >
      {/* Logo mark */}
      <div className="w-7 h-7 rounded-lg mb-3 flex items-center justify-center"
        style={{ background: "hsl(220 25% 11%)" }}>
        <img
          src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
          alt="K"
          className="w-4 h-4 object-contain"
          style={{ filter: "brightness(0) invert(1) opacity(0.9)" }}
        />
      </div>
      {NAV.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          title={label}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{
            background: active ? "hsl(220 25% 11%)" : "transparent",
            color: active ? "white" : "hsl(220 12% 60%)",
          }}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      ))}
    </div>
  );
}

function CategoryPane({ activeCategory, onSelect }) {
  return (
    <div
      className="w-[148px] flex-shrink-0 flex flex-col border-r"
      style={{ background: "hsl(220 18% 97.5%)", borderColor: "hsl(220 16% 91%)" }}
    >
      <div className="px-3 pt-3 pb-2 border-b" style={{ borderColor: "hsl(220 16% 91%)" }}>
        <p className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color: "hsl(220 12% 56%)" }}>
          Inbox
        </p>
      </div>
      <div className="flex flex-col gap-0.5 p-1.5 flex-1">
        {CATEGORIES.map((cat, i) => {
          const isActive = activeCategory === i;
          return (
            <button
              key={cat.label}
              onClick={() => onSelect(i)}
              className="w-full text-left flex items-center justify-between px-2 py-1.5 rounded-md transition-colors"
              style={{
                background: isActive ? "white" : "transparent",
                boxShadow: isActive ? "0 1px 3px hsl(220 25% 15% / 0.06)" : "none",
              }}
            >
              <span
                className="text-[10.5px] leading-tight truncate"
                style={{
                  color: isActive ? "hsl(220 25% 10%)" : "hsl(220 12% 48%)",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {cat.label}
              </span>
              {cat.count != null && (
                <span
                  className="text-[9px] font-semibold px-1 min-w-[16px] h-4 rounded flex items-center justify-center flex-shrink-0 ml-1"
                  style={{
                    background: cat.warn
                      ? "hsl(38 80% 93%)"
                      : cat.accent
                      ? "hsl(220 70% 94%)"
                      : "hsl(220 16% 91%)",
                    color: cat.warn
                      ? "hsl(38 65% 36%)"
                      : cat.accent
                      ? "hsl(220 70% 40%)"
                      : "hsl(220 12% 50%)",
                  }}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ThreadRow({ thread, isSelected, onClick }) {
  const dotColor =
    thread.status === "review"
      ? "hsl(220 70% 55%)"
      : thread.status === "at-risk"
      ? "hsl(38 72% 44%)"
      : "hsl(142 55% 46%)";

  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-3 flex flex-col gap-1.5 border-b transition-all"
      style={{
        borderBottomColor: "hsl(220 16% 92%)",
        background: isSelected ? "white" : "transparent",
        borderLeft: `2px solid ${isSelected ? "hsl(220 25% 11%)" : "transparent"}`,
      }}
    >
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dotColor }} />
          <span
            className="text-[11px] font-semibold truncate"
            style={{ color: isSelected ? "hsl(220 25% 10%)" : "hsl(220 18% 18%)" }}
          >
            {thread.name}
          </span>
        </div>
        <span className="text-[9px] flex-shrink-0" style={{ color: "hsl(220 12% 60%)" }}>
          {thread.time}
        </span>
      </div>
      <p className="text-[10.5px] leading-snug line-clamp-2" style={{ color: "hsl(220 12% 52%)" }}>
        {thread.preview}
      </p>
      <div className="flex items-center gap-1.5">
        <span
          className="text-[9px] font-medium px-1.5 py-0.5 rounded"
          style={{ background: "hsl(220 16% 92%)", color: "hsl(220 12% 48%)" }}
        >
          {thread.channel}
        </span>
        <span
          className="text-[9px] font-medium px-1.5 py-0.5 rounded"
          style={{
            background:
              thread.tagColor === "blue"
                ? "hsl(220 70% 95%)"
                : thread.tagColor === "amber"
                ? "hsl(38 80% 94%)"
                : "hsl(220 16% 93%)",
            color:
              thread.tagColor === "blue"
                ? "hsl(220 70% 40%)"
                : thread.tagColor === "amber"
                ? "hsl(38 65% 36%)"
                : "hsl(220 12% 48%)",
          }}
        >
          {thread.tag}
        </span>
      </div>
    </button>
  );
}

function ConfidenceMeter({ value }) {
  const color =
    value >= 80 ? "hsl(142 55% 42%)" : value >= 60 ? "hsl(38 72% 44%)" : "hsl(0 62% 48%)";
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-1 h-1 rounded-full overflow-hidden"
        style={{ background: "hsl(220 16% 91%)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="text-[10px] font-bold flex-shrink-0" style={{ color }}>
        {value}%
      </span>
    </div>
  );
}

function DetailPanel({ thread, detail }) {
  if (!thread || !detail) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={thread.id}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex flex-col h-full"
      >
        {/* Thread header */}
        <div
          className="px-5 py-3.5 border-b flex items-center justify-between"
          style={{ borderColor: "hsl(220 16% 91%)", background: "hsl(220 18% 98.5%)" }}
        >
          <div>
            <p className="text-[12px] font-semibold" style={{ color: "hsl(220 25% 10%)" }}>
              {thread.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded"
                style={{ background: "hsl(220 16% 91%)", color: "hsl(220 12% 48%)" }}>
                {thread.channel}
              </span>
              <span className="text-[9px]" style={{ color: "hsl(220 12% 58%)" }}>Parts Enquiry · {thread.time} ago</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="text-[9px] font-semibold px-2 py-1 rounded-full"
              style={{
                background: thread.status === "at-risk" ? "hsl(38 80% 94%)" : "hsl(220 70% 94%)",
                color: thread.status === "at-risk" ? "hsl(38 65% 34%)" : "hsl(220 70% 38%)",
                border: `1px solid ${thread.status === "at-risk" ? "hsl(38 55% 86%)" : "hsl(220 55% 86%)"}`,
              }}
            >
              {thread.status === "at-risk" ? "At Risk" : "Needs Review"}
            </span>
          </div>
        </div>

        {/* Customer message */}
        <div className="px-5 py-4 flex-shrink-0" style={{ borderBottom: "1px solid hsl(220 16% 92%)" }}>
          <p className="text-[9px] font-bold tracking-[0.1em] uppercase mb-2.5" style={{ color: "hsl(220 12% 56%)" }}>
            Customer Message
          </p>
          <div
            className="px-3.5 py-3 rounded-xl text-[12px] leading-relaxed"
            style={{
              background: "hsl(220 18% 97%)",
              border: "1px solid hsl(220 16% 91%)",
              color: "hsl(220 18% 20%)",
            }}
          >
            {detail.customerMsg}
          </div>
        </div>

        {/* AI drafted reply — hero element */}
        <div className="px-5 py-4 flex-1 flex flex-col" style={{ borderBottom: "1px solid hsl(220 16% 92%)" }}>
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" style={{ color: "hsl(220 65% 52%)" }} />
              <p className="text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "hsl(220 12% 56%)" }}>
                AI Drafted Reply
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Intent tag */}
              <span
                className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "hsl(220 65% 95%)", color: "hsl(220 65% 40%)", border: "1px solid hsl(220 55% 88%)" }}
              >
                {detail.intent}
              </span>
            </div>
          </div>

          {/* Draft card */}
          <div
            className="flex-1 rounded-xl px-4 py-3.5 mb-3 relative overflow-hidden"
            style={{
              background: "linear-gradient(145deg, hsl(220 60% 98%) 0%, hsl(220 40% 97%) 100%)",
              border: "1px solid hsl(220 55% 88%)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, hsl(220 65% 80% / 0.5), transparent)" }}
            />
            <p className="text-[12px] leading-relaxed" style={{ color: "hsl(220 18% 20%)" }}>
              {detail.aiDraft}
            </p>
          </div>

          {/* Metadata row */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-[9px] font-semibold tracking-wide uppercase w-[68px] flex-shrink-0"
                style={{ color: "hsl(220 12% 58%)" }}>Confidence</p>
              <div className="flex-1">
                <ConfidenceMeter value={detail.confidence} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-[9px] font-semibold tracking-wide uppercase w-[68px] flex-shrink-0"
                style={{ color: "hsl(220 12% 58%)" }}>Source</p>
              <div className="flex items-center gap-1">
                <BookOpen className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "hsl(220 12% 60%)" }} />
                <p className="text-[9.5px]" style={{ color: "hsl(220 12% 50%)" }}>{detail.source}</p>
              </div>
            </div>
          </div>

          {/* Risk notice */}
          {detail.risk && (
            <div
              className="mt-3 flex items-start gap-2 px-3 py-2.5 rounded-lg"
              style={{ background: "hsl(38 80% 96%)", border: "1px solid hsl(38 60% 86%)" }}
            >
              <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: "hsl(38 72% 44%)" }} />
              <p className="text-[10px] leading-snug" style={{ color: "hsl(38 55% 32%)" }}>
                {detail.risk}
              </p>
            </div>
          )}
        </div>

        {/* Action row */}
        <div
          className="flex items-center gap-2 px-5 py-3.5 flex-shrink-0"
          style={{ background: "hsl(220 18% 98.5%)", borderTop: "1px solid hsl(220 16% 91%)" }}
        >
          <button
            className="flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 rounded-lg transition-colors"
            style={{ background: "hsl(220 25% 11%)", color: "white" }}
          >
            <CheckCircle className="w-3 h-3" />
            Approve & Send
          </button>
          <button
            className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-2 rounded-lg transition-colors"
            style={{ background: "transparent", color: "hsl(220 18% 30%)", border: "1px solid hsl(220 16% 85%)" }}
          >
            <Edit3 className="w-3 h-3" />
            Edit Reply
          </button>
          <button
            className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-2 rounded-lg transition-colors ml-auto"
            style={{ background: "transparent", color: "hsl(38 65% 34%)", border: "1px solid hsl(38 50% 82%)" }}
          >
            <UserCheck className="w-3 h-3" />
            Escalate
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function InboxShowcase() {
  const [selectedThread, setSelectedThread] = useState(THREADS[0]);
  const [activeCategory, setActiveCategory] = useState(1);
  const { ref: headerRef, inView: headerVisible } = useScrollReveal();
  const { ref: cardRef, inView: cardVisible } = useScrollReveal({ margin: "-60px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Very subtle warm tint to separate from hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_18%_96%)] via-background to-background pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-8">

        {/* ── Section header ── */}
        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={REVEAL.primary}
          className="mb-16 md:mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-6">
            The Operations Layer
          </p>
          <div className="w-full h-px bg-foreground/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[44px] xl:text-[50px] font-bold tracking-[-0.03em] leading-[1.06] text-foreground">
              AI replies when it can.<br />Your team steps in when it matters.
            </h2>
            <motion.p
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ ...REVEAL.primary, delay: 0.12 }}
              className="text-[16px] text-muted-foreground leading-[1.8] md:pt-2 max-w-md font-inter"
            >
              Kanaung gives your team a clean inbox to review AI-drafted replies, approve them with one click, or escalate to a human — so the business stays in control without being buried in every conversation.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Product showcase card ── */}
        <motion.div
          ref={cardRef}
          animate={{ opacity: cardVisible ? 1 : 0, y: cardVisible ? 0 : 22 }}
          initial={{ opacity: 0, y: 22 }}
          transition={REVEAL.card}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1px solid hsl(220 16% 84%)",
            boxShadow:
              "0 0 0 1px hsl(220 20% 95%), 0 32px 80px -16px hsl(220 25% 15% / 0.12), 0 8px 24px -4px hsl(220 25% 15% / 0.05)",
            background: "hsl(220 18% 97%)",
          }}
        >
          {/* Inner top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-10" />

          {/* ── Browser chrome ── */}
          <div
            className="flex items-center gap-4 px-5 py-3 border-b"
            style={{ background: "hsl(220 18% 98.5%)", borderColor: "hsl(220 16% 88%)" }}
          >
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(220 10% 82%)" }} />
              ))}
            </div>
            <div className="flex-1 flex justify-center">
              <div
                className="flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-mono"
                style={{
                  background: "hsl(220 16% 94%)",
                  border: "1px solid hsl(220 16% 88%)",
                  color: "hsl(220 12% 52%)",
                  minWidth: 210,
                  justifyContent: "center",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                app.kanaung.ai / inbox
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] font-semibold" style={{ color: "hsl(220 18% 28%)" }}>
                Golden Star Machinery
              </span>
              <span
                className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "hsl(142 50% 94%)", color: "hsl(142 55% 33%)", border: "1px solid hsl(142 45% 86%)" }}
              >
                Live
              </span>
            </div>
          </div>

          {/* ── App body ── */}
          <div className="flex" style={{ height: 460 }}>

            {/* Sidebar */}
            <Sidebar />

            {/* Category pane */}
            <CategoryPane activeCategory={activeCategory} onSelect={setActiveCategory} />

            {/* Thread list */}
            <div
              className="w-[200px] flex-shrink-0 flex flex-col border-r overflow-auto"
              style={{ background: "hsl(220 18% 97%)", borderColor: "hsl(220 16% 91%)" }}
            >
              <div className="px-3 py-2.5 border-b" style={{ borderColor: "hsl(220 16% 91%)" }}>
                <p className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color: "hsl(220 12% 56%)" }}>
                  {CATEGORIES[activeCategory]?.label} · {THREADS.length}
                </p>
              </div>
              {THREADS.map((thread) => (
                <ThreadRow
                  key={thread.id}
                  thread={thread}
                  isSelected={selectedThread?.id === thread.id}
                  onClick={() => setSelectedThread(thread)}
                />
              ))}
            </div>

            {/* Detail / review panel */}
            <div className="flex-1 min-w-0 flex flex-col" style={{ background: "white" }}>
              <DetailPanel thread={selectedThread} detail={DETAIL[selectedThread?.id]} />
            </div>

          </div>

          {/* Bottom highlight */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent pointer-events-none" />
        </motion.div>

        {/* Rule */}
        <motion.div
          animate={{ opacity: cardVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px bg-foreground/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}