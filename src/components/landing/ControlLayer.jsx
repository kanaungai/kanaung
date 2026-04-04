import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal, REVEAL } from "../../hooks/useScrollReveal";
import {
  MessageSquare,
  BookOpen,
  Zap,
  GitBranch,
  Settings,
  BarChart2,
  Radio,
  ChevronRight,
  User,
  CheckCircle2,
  AlertTriangle,
  Pencil,
  ArrowUpRight,
} from "lucide-react";

// ── Sidebar nav items ──
const NAV = [
  { icon: MessageSquare, label: "Inbox", active: true },
  { icon: BookOpen, label: "Knowledge" },
  { icon: Radio, label: "Channels" },
  { icon: BarChart2, label: "Insights" },
  { icon: GitBranch, label: "Workflows" },
  { icon: Settings, label: "Settings" },
];

// ── Queue categories ──
const CATEGORIES = [
  { id: "needs_review", label: "Needs Review", count: 4, color: "hsl(38 75% 46%)" },
  { id: "at_risk", label: "At Risk", count: 1, color: "hsl(0 65% 52%)" },
  { id: "awaiting_human", label: "Awaiting Human", count: 3, color: "hsl(220 65% 52%)" },
  { id: "ai_resolved", label: "AI Resolved", count: 44, color: "hsl(142 55% 44%)" },
];

const CHANNEL_PILLS = [
  { label: "Messenger", color: "#006AFF" },
  { label: "Viber", color: "#7360F2" },
  { label: "WhatsApp", color: "#25D366" },
];

// ── Conversation list ──
const CONVERSATIONS = [
  {
    id: 1,
    name: "ဦးကျော်ဇင်",
    preview: "Mitsubishi L200 spare parts တွေ stock ရှိသေးလား? အမြန်လိုအပ်နေတယ်",
    channel: "Messenger",
    channelColor: "#006AFF",
    status: "needs_review",
    time: "မိနစ် ၄",
    intent: "Parts Enquiry",
    confidence: 72,
  },
  {
    id: 2,
    name: "မသီတာ",
    preview: "EX55 model ရှိသေးလား? ဈေးနှုန်းပြောပြပါ",
    channel: "Viber",
    channelColor: "#7360F2",
    status: "needs_review",
    time: "မိနစ် ၂၂",
    intent: "Stock Check",
    confidence: 88,
  },
  {
    id: 3,
    name: "ကိုအောင်နိုင်",
    preview: "မန္တလေးကို delivery ဘယ်လောက်ကြာမလဲ?",
    channel: "WhatsApp",
    channelColor: "#25D366",
    status: "ai_resolved",
    time: "၁ နာရီ",
    intent: "Delivery Info",
    confidence: 95,
  },
];

// ── Conversation detail ──
const DETAIL = {
  1: {
    name: "ဦးကျော်ဇင်",
    channel: "Messenger",
    channelColor: "#006AFF",
    intent: "Parts Enquiry",
    confidence: 72,
    status: "needs_review",
    customerMsg: "ဟယ်လို၊ Mitsubishi L200 spare parts တွေ အရမ်းအမြန်လိုအပ်နေတယ်။ Stock ရှိသေးလား? ကျွန်တော့်ကား ပျက်နေလို့ အမြန်ပြောပြပါ။",
    aiDraft: "ဆက်သွယ်ပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။ Mitsubishi L200 spare parts တွေ ကျွန်တော်တို့မှာ ရှိပါတယ်။ ဘယ် parts တွေ လိုအပ်တယ်ဆိုတာ ပြောပြပါ — ဈေးနှုန်းနဲ့ delivery အချိန် အသေးစိတ် အကြောင်းပြန်ပေးပါ့မယ်။",
    source: "Parts Catalog · Mitsubishi L200",
    handoff: false,
  },
  2: {
    name: "မသီတာ",
    channel: "Viber",
    channelColor: "#7360F2",
    intent: "Stock Check",
    confidence: 88,
    status: "needs_review",
    customerMsg: "EX55 model ရှိသေးလား? ဈေးနှုန်းပြောပြပါ",
    aiDraft: "EX55 model လက်ရှိ stock ရှိပါတယ်။ ကျပ် ၂၈၀ သိန်းမှ စတင်ပါတယ်။ အရောင် ၂ မျိုး ရရှိနိုင်ပြီး financing option များလည်း ရှိပါတယ်။ အသေးစိတ် သိချင်ပါက ဆက်သွယ်ပေးပါ။",
    source: "Product Catalog · EX55 Specifications",
    handoff: false,
  },
  3: {
    name: "ကိုအောင်နိုင်",
    channel: "WhatsApp",
    channelColor: "#25D366",
    intent: "Delivery Info",
    confidence: 95,
    status: "ai_resolved",
    customerMsg: "မန္တလေးကို delivery ဘယ်လောက်ကြာမလဲ? မနက်ဖြန် ရနိုင်မလား?",
    aiDraft: "မန္တလေးကို ပုံမှန် ၃–၅ ရက်အတွင်း ရောက်ပါတယ်။ Urgent delivery ဆိုရင် express option ကို ၂ ရက်အတွင်း စီစဉ်ပေးနိုင်ပါတယ်။ Order ထည့်ပြီးနောက် tracking link ပို့ပေးပါ့မယ်။",
    source: "Delivery Policy · Upcountry",
    handoff: false,
  },
};

const STATUS_CONFIG = {
  needs_review: { label: "Needs Review", bg: "hsl(38 80% 96%)", color: "hsl(38 65% 38%)", border: "hsl(38 60% 88%)" },
  at_risk: { label: "At Risk", bg: "hsl(0 70% 97%)", color: "hsl(0 60% 42%)", border: "hsl(0 55% 90%)" },
  awaiting_human: { label: "Awaiting Human", bg: "hsl(220 70% 96%)", color: "hsl(220 55% 42%)", border: "hsl(220 55% 88%)" },
  ai_resolved: { label: "AI Resolved", bg: "hsl(142 55% 95%)", color: "hsl(142 50% 33%)", border: "hsl(142 45% 86%)" },
};

// ── Confidence ring ──
function ConfidenceRing({ value }) {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const fill = (value / 100) * circ;
  const color = value >= 85 ? "hsl(142 55% 44%)" : value >= 65 ? "hsl(38 75% 46%)" : "hsl(0 65% 52%)";
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
      <circle cx="18" cy="18" r={r} fill="none" stroke="hsl(220 16% 92%)" strokeWidth="2.5" />
      <circle
        cx="18" cy="18" r={r}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray={`${fill} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
      />
      <text x="18" y="22" textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: color, fontFamily: "var(--font-inter)" }}>
        {value}%
      </text>
    </svg>
  );
}

// ── Conversation row ──
function ConvRow({ conv, isSelected, onClick }) {
  const st = STATUS_CONFIG[conv.status];
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-start gap-3 px-4 py-3.5 border-b transition-all duration-100"
      style={{
        borderBottomColor: "hsl(220 16% 91%)",
        background: isSelected ? "white" : "transparent",
        borderLeft: `2.5px solid ${isSelected ? "hsl(220 25% 16%)" : "transparent"}`,
      }}
    >
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold"
        style={{ background: isSelected ? "hsl(220 25% 14%)" : "hsl(220 16% 90%)", color: isSelected ? "white" : "hsl(220 18% 40%)" }}
      >
        {conv.name.charAt(0)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <p className="text-[11.5px] font-semibold tracking-[-0.01em] truncate" style={{ color: "hsl(220 25% 12%)" }}>
            {conv.name}
          </p>
          <span className="text-[9px] flex-shrink-0 ml-1" style={{ color: "hsl(220 12% 60%)" }}>{conv.time}</span>
        </div>
        <p className="text-[10.5px] leading-snug truncate mb-1.5" style={{ color: "hsl(220 12% 52%)" }}>
          {conv.preview}
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
            style={{ background: `${conv.channelColor}14`, color: conv.channelColor }}
          >
            {conv.channel}
          </span>
          <span
            className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
            style={{ background: st.bg, color: st.color }}
          >
            {st.label}
          </span>
        </div>
      </div>
    </button>
  );
}

// ── Main detail panel ──
function DetailPanel({ detail }) {
  if (!detail) return null;
  const st = STATUS_CONFIG[detail.status];
  const isResolved = detail.status === "ai_resolved";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={detail.name}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex flex-col h-full overflow-auto"
      >
        {/* Header */}
        <div className="px-5 py-3.5 border-b flex items-center justify-between gap-3" style={{ borderColor: "hsl(220 16% 91%)" }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
              style={{ background: "hsl(220 25% 14%)", color: "white" }}
            >
              {detail.name.charAt(0)}
            </div>
            <div>
              <p className="text-[12.5px] font-semibold tracking-[-0.01em]" style={{ color: "hsl(220 25% 10%)" }}>
                {detail.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: `${detail.channelColor}14`, color: detail.channelColor }}
                >
                  {detail.channel}
                </span>
                <span
                  className="text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                  style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}
                >
                  {st.label}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="text-[9px] font-semibold px-2 py-1 rounded-md"
              style={{ background: "hsl(220 55% 97%)", color: "hsl(220 50% 46%)", border: "1px solid hsl(220 40% 90%)" }}
            >
              {detail.intent}
            </span>
          </div>
        </div>

        {/* Customer message bubble */}
        <div className="px-5 pt-4 pb-3">
          <p className="text-[9px] font-bold tracking-[0.1em] uppercase mb-2.5" style={{ color: "hsl(220 12% 60%)" }}>
            Customer
          </p>
          <div
            className="px-3.5 py-3 rounded-2xl rounded-tl-sm text-[12px] leading-relaxed"
            style={{
              background: "hsl(220 20% 96%)",
              border: "1px solid hsl(220 16% 90%)",
              color: "hsl(220 18% 22%)",
              maxWidth: "88%",
            }}
          >
            {detail.customerMsg}
          </div>
        </div>

        {/* AI Draft Reply — hero of the panel */}
        <div className="px-5 pb-4 flex-1">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid hsl(220 30% 88%)",
              background: "linear-gradient(160deg, hsl(220 30% 98.5%) 0%, hsl(220 20% 97%) 100%)",
            }}
          >
            {/* Draft header */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b"
              style={{ borderColor: "hsl(220 20% 91%)", background: "hsl(220 25% 98%)" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ background: "hsl(220 25% 14%)" }}
                >
                  <Zap className="w-2.5 h-2.5" style={{ color: "white" }} />
                </div>
                <span className="text-[10.5px] font-semibold tracking-[-0.01em]" style={{ color: "hsl(220 25% 14%)" }}>
                  AI Drafted Reply
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Confidence */}
                <ConfidenceRing value={detail.confidence} />
                <div>
                  <p className="text-[9px] font-bold leading-none" style={{ color: "hsl(220 18% 24%)" }}>
                    Confidence
                  </p>
                  <p className="text-[8.5px] mt-0.5 leading-none" style={{ color: "hsl(220 12% 56%)" }}>
                    {detail.intent}
                  </p>
                </div>
              </div>
            </div>

            {/* Draft body */}
            <div className="px-4 py-3.5">
              <p className="text-[12px] leading-[1.75]" style={{ color: "hsl(220 18% 22%)" }}>
                {detail.aiDraft}
              </p>
            </div>

            {/* Source */}
            <div
              className="flex items-center gap-1.5 px-4 py-2 border-t"
              style={{ borderColor: "hsl(220 20% 91%)" }}
            >
              <BookOpen className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "hsl(220 12% 64%)" }} />
              <p className="text-[9.5px]" style={{ color: "hsl(220 12% 56%)" }}>
                Source: {detail.source}
              </p>
            </div>

            {/* Actions */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-t"
              style={{ borderColor: "hsl(220 20% 91%)", background: "hsl(220 18% 98%)" }}
            >
              {isResolved ? (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: "hsl(142 50% 44%)" }} />
                  <span className="text-[11px] font-semibold" style={{ color: "hsl(142 50% 38%)" }}>
                    Sent by AI · Resolved
                  </span>
                </div>
              ) : (
                <>
                  <button
                    className="flex items-center gap-1.5 text-[11px] font-semibold px-3.5 py-1.5 rounded-lg transition-colors"
                    style={{ background: "hsl(220 25% 12%)", color: "white" }}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Approve & Send
                  </button>
                  <button
                    className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg"
                    style={{ background: "hsl(220 16% 93%)", color: "hsl(220 18% 28%)", border: "1px solid hsl(220 16% 87%)" }}
                  >
                    <Pencil className="w-2.5 h-2.5" />
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg ml-auto"
                    style={{ background: "hsl(38 80% 96%)", color: "hsl(38 60% 36%)", border: "1px solid hsl(38 55% 88%)" }}
                  >
                    <ArrowUpRight className="w-2.5 h-2.5" />
                    Escalate
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ControlLayer() {
  const [selectedId, setSelectedId] = useState(1);
  const { ref: headerRef, inView: headerVisible } = useScrollReveal();
  const { ref: dashRef, inView: dashVisible } = useScrollReveal({ margin: "-60px" });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-8">

        {/* ── Section header — UNTOUCHED ── */}
        <motion.div
          ref={headerRef}
          animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 18 }}
          initial={{ opacity: 0, y: 18 }}
          transition={REVEAL.primary}
          className="mb-16 md:mb-20"
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60 mb-6 font-inter">
            The Control Layer
          </p>
          <div className="w-full h-px bg-foreground/8 mb-10" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <h2 className="font-sora text-[36px] md:text-[46px] xl:text-[52px] font-bold tracking-[-0.04em] leading-[1.03] text-foreground">
              The control layer behind every conversation.
            </h2>
            <motion.p
              animate={{ opacity: headerVisible ? 1 : 0, y: headerVisible ? 0 : 12 }}
              initial={{ opacity: 0, y: 12 }}
              transition={{ ...REVEAL.primary, delay: 0.12 }}
              className="text-[15px] text-muted-foreground leading-[1.8] md:pt-2 max-w-md font-inter tracking-[-0.005em]"
            >
              Monitor AI-handled conversations, review auto-generated replies, and manage human escalations — all from one operations dashboard built for Myanmar businesses.
            </motion.p>
          </div>
        </motion.div>

        {/* ── Demo card ── */}
        <motion.div
          ref={dashRef}
          animate={{ opacity: dashVisible ? 1 : 0, y: dashVisible ? 0 : 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={REVEAL.card}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "1px solid hsl(220 16% 84%)",
            boxShadow: "0 0 0 1px hsl(220 20% 95%), 0 32px 80px -16px hsl(220 25% 15% / 0.13), 0 8px 24px -4px hsl(220 25% 15% / 0.05)",
            background: "hsl(220 18% 97%)",
          }}
        >
          {/* Inner top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-10" />

          {/* Browser chrome */}
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
                app.kanaung.ai / inbox
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

          {/* App layout: sidebar + queue column + conv list + detail */}
          <div className="flex" style={{ minHeight: 580 }}>

            {/* ── Far-left slim sidebar ── */}
            <div
              className="flex-shrink-0 flex flex-col items-center py-4 gap-1 border-r"
              style={{ width: 52, background: "hsl(220 22% 13%)", borderColor: "hsl(220 16% 87%)" }}
            >
              {/* Logo mark */}
              <div className="mb-3 mt-1">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(352 72% 44%)" }}
                >
                  <span className="text-white font-bold text-[10px]" style={{ fontFamily: "var(--font-sora)" }}>K</span>
                </div>
              </div>

              {NAV.map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  title={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                  style={{
                    background: active ? "hsl(220 25% 24%)" : "transparent",
                  }}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: active ? "white" : "hsl(220 16% 52%)" }}
                  />
                </div>
              ))}
            </div>

            {/* ── Queue / category column ── */}
            <div
              className="flex-shrink-0 flex flex-col border-r"
              style={{ width: 188, background: "hsl(220 20% 97%)", borderColor: "hsl(220 16% 89%)" }}
            >
              <div className="px-3.5 pt-4 pb-3">
                <p className="text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "hsl(220 12% 56%)" }}>
                  Inbox
                </p>
              </div>

              {/* All conversations */}
              <button className="flex items-center justify-between px-3.5 py-2 mx-2 rounded-lg mb-1"
                style={{ background: "hsl(220 20% 92%)" }}>
                <span className="text-[11px] font-semibold" style={{ color: "hsl(220 25% 14%)" }}>All</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "hsl(220 25% 20%)", color: "white" }}>52</span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className="flex items-center justify-between px-3.5 py-2 mx-2 rounded-lg mb-0.5 hover:bg-foreground/[0.03] transition-colors"
                >
                  <span className="text-[10.5px]" style={{ color: "hsl(220 18% 36%)" }}>{cat.label}</span>
                  <span
                    className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                    style={{ background: `${cat.color}18`, color: cat.color }}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}

              {/* Channels */}
              <div className="mt-4 mx-3.5">
                <p className="text-[8.5px] font-bold tracking-[0.1em] uppercase mb-2" style={{ color: "hsl(220 12% 64%)" }}>
                  Channels
                </p>
                {CHANNEL_PILLS.map((ch) => (
                  <div key={ch.label} className="flex items-center gap-2 py-1.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ch.color }} />
                    <span className="text-[10px]" style={{ color: "hsl(220 14% 44%)" }}>{ch.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Conversation list ── */}
            <div
              className="flex-shrink-0 flex flex-col border-r"
              style={{ width: 260, background: "hsl(220 18% 97.5%)", borderColor: "hsl(220 16% 89%)" }}
            >
              <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "hsl(220 16% 91%)" }}>
                <p className="text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "hsl(220 12% 58%)" }}>
                  Needs Review · 4
                </p>
              </div>
              {CONVERSATIONS.map((conv) => (
                <ConvRow
                  key={conv.id}
                  conv={conv}
                  isSelected={selectedId === conv.id}
                  onClick={() => setSelectedId(conv.id)}
                />
              ))}
            </div>

            {/* ── Main detail / AI reply panel ── */}
            <div className="flex-1 min-w-0 flex flex-col" style={{ background: "white" }}>
              <DetailPanel detail={DETAIL[selectedId]} />
            </div>
          </div>

          {/* Bottom highlight */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent pointer-events-none" />
        </motion.div>

        {/* Bottom rule */}
        <motion.div
          animate={{ opacity: dashVisible ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ ...REVEAL.fade, delay: 0.4 }}
          className="w-full h-px bg-foreground/8 mt-16 md:mt-20"
        />
      </div>
    </section>
  );
}