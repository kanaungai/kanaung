import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  MessageSquare,
  ArrowRightLeft,
  Globe,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  FileText,
  Package,
  MapPin,
  Truck,
  ChevronRight,
  Wifi,
  WifiOff,
  User,
} from "lucide-react";

const TABS = [
  { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
  { id: "conversations", label: "Conversations", icon: MessageSquare },
  { id: "handoffs", label: "Handoffs", icon: ArrowRightLeft },
  { id: "channels", label: "Channels", icon: Globe },
];

// ── Knowledge Base Panel ──
function KnowledgePanel() {
  const entries = [
    { icon: FileText, label: "FAQ Document", meta: "42 Q&A pairs · Updated 2 days ago", status: "active" },
    { icon: Package, label: "Product Catalog", meta: "Excavators, Loaders, Generators · 18 models", status: "active" },
    { icon: MapPin, label: "Locations & Hours", meta: "3 showrooms · Mon–Sat 9:00–17:30", status: "active" },
    { icon: Truck, label: "Delivery Policy", meta: "Yangon free · Upcountry rates", status: "active" },
    { icon: FileText, label: "Warranty & After-sales", meta: "12-month warranty terms", status: "draft" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Business Knowledge</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">5 documents · AI trained on all active entries</p>
        </div>
        <button className="text-[11px] font-semibold text-foreground bg-foreground/5 border border-foreground/10 px-3 py-1.5 rounded-lg hover:bg-foreground/8 transition-colors">
          + Upload
        </button>
      </div>
      <div className="space-y-2 flex-1">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-foreground/[0.06] bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center flex-shrink-0">
              <entry.icon className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-foreground truncate">{entry.label}</p>
              <p className="text-[11px] text-muted-foreground truncate">{entry.meta}</p>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
              entry.status === "active"
                ? "bg-green-500/10 text-green-600 border border-green-500/15"
                : "bg-foreground/5 text-muted-foreground border border-foreground/8"
            }`}>
              {entry.status === "active" ? "Active" : "Draft"}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Conversations Panel ──
function ConversationsPanel() {
  const convos = [
    { name: "Kyaw Zin Oo", preview: "EX55 model ရှိသေးလား? ဈေးနှုန်းပြောပြ...", time: "2m ago", status: "resolved" },
    { name: "Ma Hnin Wai", preview: "ရန်ကုန်ကို delivery ဘယ်လောက်ကြာလဲ?", time: "14m ago", status: "resolved" },
    { name: "Aung Myat Thu", preview: "Generator 50KVA warranty ဘယ်လောက်....", time: "31m ago", status: "escalated" },
    { name: "Su Myat Noe", preview: "ရုံးချိန် ဘယ်အချိန်ဖွင့်လဲ?", time: "1h ago", status: "resolved" },
    { name: "Ko Htet Aung", preview: "Wheel loader WL350 demo ကြည့်လို့ရလား?", time: "2h ago", status: "escalated" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Recent Conversations</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">47 today · 3 escalated · 44 resolved</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/15">44 resolved</span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/15">3 escalated</span>
        </div>
      </div>
      <div className="space-y-1.5 flex-1">
        {convos.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-foreground/[0.06] hover:bg-foreground/[0.02] transition-colors cursor-default group"
          >
            <div className="w-7 h-7 rounded-full bg-foreground/[0.06] flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[12px] font-semibold text-foreground truncate">{c.name}</p>
                <span className="text-[10px] text-muted-foreground flex-shrink-0">{c.time}</span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">{c.preview}</p>
            </div>
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.status === "resolved" ? "bg-green-400" : "bg-amber-400"}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Handoffs Panel ──
function HandoffsPanel() {
  const handoffs = [
    { name: "Aung Myat Thu", phone: "09-456-789-123", inquiry: "Generator 50KVA pricing + bulk order", priority: "high", time: "31m ago" },
    { name: "Ko Htet Aung", phone: "09-321-654-987", inquiry: "Wheel loader WL350 demo request", priority: "medium", time: "2h ago" },
    { name: "Mg Zaw Win", phone: "09-111-222-333", inquiry: "Fleet purchase quote — 3 excavators", priority: "high", time: "3h ago" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Pending Handoffs</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">3 conversations require your team</p>
        </div>
      </div>
      <div className="space-y-3 flex-1">
        {handoffs.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="px-4 py-4 rounded-xl border border-foreground/[0.06] bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div>
                <p className="text-[12px] font-semibold text-foreground">{h.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Phone className="w-2.5 h-2.5 text-muted-foreground" />
                  <p className="text-[11px] text-muted-foreground">{h.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  h.priority === "high"
                    ? "bg-red-500/8 text-red-600 border-red-500/15"
                    : "bg-amber-500/8 text-amber-600 border-amber-500/15"
                }`}>
                  {h.priority === "high" ? "High" : "Medium"}
                </span>
                <span className="text-[10px] text-muted-foreground">{h.time}</span>
              </div>
            </div>
            <p className="text-[11px] text-foreground/60 leading-relaxed bg-foreground/[0.03] rounded-lg px-3 py-2 border border-foreground/[0.04]">
              {h.inquiry}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Channels Panel ──
function ChannelsPanel() {
  const channels = [
    { name: "Website Chat", description: "Embed widget on your website", status: "active", since: "Active since Jan 2025" },
    { name: "Facebook Messenger", description: "Connected to Golden Star Machinery page", status: "active", since: "Active since Feb 2025" },
    { name: "Viber Business", description: "Business account connected", status: "active", since: "Active since Feb 2025" },
    { name: "WhatsApp Business", description: "Connect your WhatsApp account", status: "inactive", since: "Not connected" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[13px] font-semibold text-foreground">Channels</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">3 of 4 channels active · All synced</p>
        </div>
      </div>
      <div className="space-y-3 flex-1">
        {channels.map((ch, i) => (
          <motion.div
            key={ch.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className="flex items-center gap-4 px-4 py-4 rounded-xl border border-foreground/[0.06] hover:bg-foreground/[0.02] transition-colors"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              ch.status === "active" ? "bg-foreground/[0.05] border border-foreground/[0.08]" : "bg-foreground/[0.02] border border-foreground/[0.05]"
            }`}>
              {ch.status === "active"
                ? <Wifi className="w-4 h-4 text-foreground/50" />
                : <WifiOff className="w-4 h-4 text-muted-foreground/30" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[12px] font-semibold truncate ${ch.status === "active" ? "text-foreground" : "text-muted-foreground/60"}`}>
                {ch.name}
              </p>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">{ch.description}</p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                ch.status === "active"
                  ? "bg-green-500/10 text-green-600 border-green-500/15"
                  : "bg-foreground/5 text-muted-foreground border-foreground/8"
              }`}>
                {ch.status === "active" ? "Active" : "Inactive"}
              </span>
              <span className="text-[10px] text-muted-foreground/50">{ch.since}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const PANELS = {
  knowledge: KnowledgePanel,
  conversations: ConversationsPanel,
  handoffs: HandoffsPanel,
  channels: ChannelsPanel,
};

export default function ControlLayer() {
  const [activeTab, setActiveTab] = useState("knowledge");
  const ActivePanel = PANELS[activeTab];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-8">

        {/* ── Header ── */}
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
              Manage your AI customer service from one dashboard.
            </h2>
            <p className="text-[16px] text-muted-foreground leading-[1.8] md:pt-2 max-w-md font-inter">
              Upload business knowledge, review conversations, monitor human handoffs, and manage channels — all from one place.
            </p>
          </div>
        </motion.div>

        {/* ── Dashboard Mockup ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl border border-foreground/[0.08] overflow-hidden shadow-2xl shadow-foreground/[0.06]"
          style={{
            background: "linear-gradient(160deg, hsl(220 22% 99%) 0%, hsl(220 16% 97%) 100%)",
          }}
        >
          {/* Inner top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent pointer-events-none" />

          {/* ── Dashboard top bar ── */}
          <div
            className="flex items-center justify-between px-5 py-3.5 border-b border-foreground/[0.06]"
            style={{ background: "hsl(220 22% 99.5%)" }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
            </div>
            {/* URL bar */}
            <div className="flex-1 max-w-xs mx-6">
              <div className="bg-foreground/[0.04] border border-foreground/[0.06] rounded-md px-3 py-1 text-center">
                <span className="text-[10px] text-muted-foreground/60 font-mono">app.kanaung.ai / dashboard</span>
              </div>
            </div>
            {/* Status */}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-medium text-muted-foreground">All systems operational</span>
            </div>
          </div>

          {/* ── Dashboard body ── */}
          <div className="flex min-h-[520px]">

            {/* Left sidebar */}
            <div
              className="w-48 flex-shrink-0 border-r border-foreground/[0.06] p-4 flex flex-col gap-1"
              style={{ background: "hsl(220 22% 99%)" }}
            >
              {/* Brand */}
              <div className="flex items-center gap-2 px-2 py-2 mb-3">
                <div className="w-5 h-5 rounded-md bg-foreground/80 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-sm bg-white/80" />
                </div>
                <span className="font-sora text-[11px] font-semibold text-foreground tracking-[-0.01em]">kanaung.</span>
              </div>

              {/* Nav items */}
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-[12px] font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <ChevronRight className="w-3 h-3 ml-auto opacity-60" />
                  )}
                </button>
              ))}

              {/* Bottom meta */}
              <div className="mt-auto pt-4 border-t border-foreground/[0.06]">
                <div className="px-2">
                  <p className="text-[10px] font-semibold text-foreground/50 truncate">Golden Star Machinery</p>
                  <p className="text-[10px] text-muted-foreground/50 truncate mt-0.5">admin@goldenstar.mm</p>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6 md:p-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-full"
                >
                  <ActivePanel />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom highlight */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.05] to-transparent pointer-events-none" />
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