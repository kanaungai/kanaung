import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  MessageSquare,
  ArrowRightLeft,
  Globe,
  Phone,
  FileText,
  Package,
  MapPin,
  Truck,
  Shield,
  Search,
  Upload,
  RefreshCw,
  User,
  Wifi,
  WifiOff,
  ChevronRight,
  MoreHorizontal,
  Zap,
} from "lucide-react";

// ── Summary stats ──
const STATS = [
  { label: "Knowledge Sources", value: "5", sub: "4 active · 1 draft" },
  { label: "Channels Connected", value: "3", sub: "Web · Messenger · Viber" },
  { label: "Pending Handoffs", value: "3", sub: "2 high priority" },
  { label: "AI Resolution Rate", value: "94%", sub: "Last 7 days" },
];

// ── Nav tabs ──
const TABS = [
  { id: "knowledge", label: "Knowledge Base", icon: BookOpen },
  { id: "conversations", label: "Conversations", icon: MessageSquare },
  { id: "handoffs", label: "Handoffs", icon: ArrowRightLeft },
  { id: "channels", label: "Channels", icon: Globe },
];

// ── Knowledge Base Panel ──
function KnowledgePanel() {
  const entries = [
    {
      icon: FileText,
      label: "FAQ Document",
      meta: "42 Q&A pairs",
      updated: "Updated 2 days ago",
      status: "active",
      tag: "Core",
    },
    {
      icon: Package,
      label: "Product Catalog",
      meta: "18 models · Excavators, Loaders, Generators",
      updated: "Updated 5 days ago",
      status: "active",
      tag: "Products",
    },
    {
      icon: MapPin,
      label: "Locations & Hours",
      meta: "3 showrooms · Mon–Sat 9:00–17:30",
      updated: "Updated 1 week ago",
      status: "active",
      tag: "Operations",
    },
    {
      icon: Truck,
      label: "Delivery Policy",
      meta: "Yangon free delivery · Upcountry rates",
      updated: "Updated 1 week ago",
      status: "active",
      tag: "Policy",
    },
    {
      icon: Shield,
      label: "Warranty & After-sales",
      meta: "12-month warranty terms",
      updated: "Draft · Not trained",
      status: "draft",
      tag: "Policy",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[14px] font-semibold text-foreground tracking-[-0.01em]">
            Business Knowledge
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            AI is trained on 4 active sources
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-foreground bg-foreground text-background px-3.5 py-1.5 rounded-lg hover:bg-foreground/90 transition-colors">
          <Upload className="w-3 h-3" />
          Upload
        </button>
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: i * 0.055 }}
            className="group flex items-center gap-4 px-4 py-3.5 rounded-xl border border-foreground/[0.07] bg-white hover:border-foreground/[0.12] hover:shadow-sm transition-all duration-200 cursor-default"
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl bg-foreground/[0.04] border border-foreground/[0.07] flex items-center justify-center flex-shrink-0">
              <entry.icon className="w-3.5 h-3.5 text-foreground/50" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[13px] font-semibold text-foreground tracking-[-0.01em] truncate">
                  {entry.label}
                </p>
                <span className="text-[10px] font-medium text-muted-foreground/60 bg-foreground/[0.04] px-1.5 py-0.5 rounded-md flex-shrink-0">
                  {entry.tag}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                {entry.meta}
              </p>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-[10px] text-muted-foreground/50 hidden sm:block">
                {entry.updated}
              </span>
              <span
                className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                  entry.status === "active"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-foreground/[0.03] text-muted-foreground border-foreground/[0.08]"
                }`}
              >
                {entry.status === "active" ? "Active" : "Draft"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Conversations Panel ──
function ConversationsPanel() {
  const convos = [
    { name: "Kyaw Zin Oo", preview: "EX55 model ရှိသေးလား? ဈေးနှုန်းပြောပြ...", time: "2m ago", status: "resolved", channel: "Web" },
    { name: "Ma Hnin Wai", preview: "ရန်ကုန်ကို delivery ဘယ်လောက်ကြာလဲ?", time: "14m ago", status: "resolved", channel: "Messenger" },
    { name: "Aung Myat Thu", preview: "Generator 50KVA warranty ဘယ်လောက်....", time: "31m ago", status: "escalated", channel: "Viber" },
    { name: "Su Myat Noe", preview: "ရုံးချိန် ဘယ်အချိန်ဖွင့်လဲ?", time: "1h ago", status: "resolved", channel: "Web" },
    { name: "Ko Htet Aung", preview: "Wheel loader WL350 demo ကြည့်လို့ရလား?", time: "2h ago", status: "escalated", channel: "Messenger" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[14px] font-semibold text-foreground tracking-[-0.01em]">Conversations</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">47 today · 3 escalated · 44 resolved</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">44 resolved</span>
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">3 escalated</span>
        </div>
      </div>
      <div className="space-y-1.5">
        {convos.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: i * 0.055 }}
            className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl border border-foreground/[0.07] bg-white hover:border-foreground/[0.12] hover:shadow-sm transition-all duration-200 cursor-default"
          >
            <div className="w-8 h-8 rounded-full bg-foreground/[0.05] border border-foreground/[0.07] flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5 text-foreground/40" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-[12px] font-semibold text-foreground tracking-[-0.01em] truncate">{c.name}</p>
                <span className="text-[9px] font-medium text-muted-foreground/50 bg-foreground/[0.04] px-1.5 py-0.5 rounded-md flex-shrink-0">{c.channel}</span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">{c.preview}</p>
            </div>
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span className="text-[10px] text-muted-foreground/50">{c.time}</span>
              <div className={`w-2 h-2 rounded-full ${c.status === "resolved" ? "bg-emerald-400" : "bg-amber-400"}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Handoffs Panel ──
function HandoffsPanel() {
  const handoffs = [
    { name: "Aung Myat Thu", phone: "09-456-789-123", inquiry: "Generator 50KVA pricing + bulk order quote", priority: "high", time: "31m ago", channel: "Viber" },
    { name: "Ko Htet Aung", phone: "09-321-654-987", inquiry: "Wheel loader WL350 live demo request", priority: "medium", time: "2h ago", channel: "Messenger" },
    { name: "Mg Zaw Win", phone: "09-111-222-333", inquiry: "Fleet purchase — 3 excavators, delivery to Mandalay", priority: "high", time: "3h ago", channel: "Web" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[14px] font-semibold text-foreground tracking-[-0.01em]">Pending Handoffs</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">3 conversations require your team · 2 high priority</p>
        </div>
      </div>
      <div className="space-y-3">
        {handoffs.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: i * 0.08 }}
            className="px-4 py-4 rounded-xl border border-foreground/[0.07] bg-white hover:border-foreground/[0.12] hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-foreground/[0.05] border border-foreground/[0.07] flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-foreground/40" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground tracking-[-0.01em]">{h.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Phone className="w-2.5 h-2.5 text-muted-foreground/50" />
                    <p className="text-[11px] text-muted-foreground">{h.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-medium text-muted-foreground/50 bg-foreground/[0.04] px-1.5 py-0.5 rounded-md">{h.channel}</span>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                  h.priority === "high"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}>
                  {h.priority === "high" ? "High" : "Medium"}
                </span>
                <span className="text-[10px] text-muted-foreground/50">{h.time}</span>
              </div>
            </div>
            <div className="bg-foreground/[0.025] rounded-lg px-3.5 py-2.5 border border-foreground/[0.05]">
              <p className="text-[11px] text-foreground/60 leading-relaxed">{h.inquiry}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Channels Panel ──
function ChannelsPanel() {
  const channels = [
    { name: "Website Chat", description: "Embed widget · goldenstar.com", status: "active", since: "Since Jan 2025", conversations: "1,240" },
    { name: "Facebook Messenger", description: "Golden Star Machinery page", status: "active", since: "Since Feb 2025", conversations: "892" },
    { name: "Viber Business", description: "Business account connected", status: "active", since: "Since Feb 2025", conversations: "604" },
    { name: "WhatsApp Business", description: "Connect your WhatsApp account", status: "inactive", since: "Not connected", conversations: "—" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[14px] font-semibold text-foreground tracking-[-0.01em]">Channels</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">3 of 4 channels active · All synced</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {channels.map((ch, i) => (
          <motion.div
            key={ch.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: i * 0.07 }}
            className="flex items-center gap-4 px-4 py-4 rounded-xl border border-foreground/[0.07] bg-white hover:border-foreground/[0.12] hover:shadow-sm transition-all duration-200"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${
              ch.status === "active"
                ? "bg-foreground/[0.04] border-foreground/[0.08]"
                : "bg-foreground/[0.015] border-foreground/[0.05]"
            }`}>
              {ch.status === "active"
                ? <Wifi className="w-3.5 h-3.5 text-foreground/45" />
                : <WifiOff className="w-3.5 h-3.5 text-muted-foreground/25" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] font-semibold truncate tracking-[-0.01em] ${ch.status === "active" ? "text-foreground" : "text-muted-foreground/50"}`}>
                {ch.name}
              </p>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">{ch.description}</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              {ch.status === "active" && (
                <div className="text-right hidden sm:block">
                  <p className="text-[12px] font-semibold text-foreground">{ch.conversations}</p>
                  <p className="text-[10px] text-muted-foreground/50">conversations</p>
                </div>
              )}
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                  ch.status === "active"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-foreground/[0.03] text-muted-foreground border-foreground/[0.08]"
                }`}>
                  {ch.status === "active" ? "Active" : "Connect"}
                </span>
              </div>
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
              Manage your AI customer service from one dashboard.
            </h2>
            <p className="text-[16px] text-muted-foreground leading-[1.8] md:pt-2 max-w-md font-inter">
              Upload business knowledge, review conversations, monitor human handoffs, and manage channels — all from one place.
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
            border: "1px solid hsl(220 16% 86%)",
            boxShadow: "0 0 0 1px hsl(220 16% 92%), 0 24px 60px -12px hsl(220 25% 15% / 0.12), 0 8px 20px -4px hsl(220 25% 15% / 0.06)",
            background: "hsl(220 20% 97%)",
          }}
        >
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10" />

          {/* ── Browser chrome bar ── */}
          <div
            className="flex items-center gap-4 px-5 py-3 border-b"
            style={{
              background: "hsl(220 20% 98.5%)",
              borderColor: "hsl(220 16% 88%)",
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(0 0% 82%)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(0 0% 82%)" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(0 0% 82%)" }} />
            </div>
            <div className="flex-1 flex justify-center">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-mono"
                style={{
                  background: "hsl(220 16% 95%)",
                  border: "1px solid hsl(220 16% 89%)",
                  color: "hsl(220 12% 52%)",
                  minWidth: 240,
                  justifyContent: "center",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                app.kanaung.ai
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium" style={{ color: "hsl(220 12% 60%)" }}>All systems operational</span>
            </div>
          </div>

          {/* ── App shell ── */}
          <div className="flex" style={{ minHeight: 580 }}>

            {/* ── Sidebar ── */}
            <div
              className="w-52 flex-shrink-0 flex flex-col border-r"
              style={{
                background: "hsl(220 20% 98%)",
                borderColor: "hsl(220 16% 88%)",
              }}
            >
              {/* Workspace header */}
              <div
                className="px-4 py-4 border-b"
                style={{ borderColor: "hsl(220 16% 90%)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(220 25% 12%)" }}
                  >
                    <Zap className="w-3.5 h-3.5 text-white/80" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-foreground tracking-[-0.01em] truncate leading-tight">Golden Star</p>
                    <p className="text-[10px] truncate" style={{ color: "hsl(220 12% 55%)" }}>Machinery Co.</p>
                  </div>
                  <ChevronRight className="w-3 h-3 ml-auto flex-shrink-0" style={{ color: "hsl(220 12% 65%)" }} />
                </div>
              </div>

              {/* Nav section label */}
              <div className="px-4 pt-4 pb-1">
                <p className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color: "hsl(220 12% 62%)" }}>
                  Management
                </p>
              </div>

              {/* Nav items */}
              <nav className="px-3 flex flex-col gap-0.5 flex-1">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-200"
                      style={
                        isActive
                          ? {
                              background: "hsl(220 25% 12%)",
                              color: "white",
                            }
                          : {
                              color: "hsl(220 12% 48%)",
                            }
                      }
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "hsl(220 16% 93%)";
                          e.currentTarget.style.color = "hsl(220 25% 12%)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "hsl(220 12% 48%)";
                        }
                      }}
                    >
                      <tab.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ opacity: isActive ? 0.8 : 0.6 }} />
                      <span className="text-[12px] font-medium">{tab.label}</span>
                      {tab.id === "handoffs" && (
                        <span
                          className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                          style={
                            isActive
                              ? { background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }
                              : { background: "hsl(352 72% 38% / 0.12)", color: "hsl(352 72% 38%)" }
                          }
                        >
                          3
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar footer */}
              <div
                className="px-4 py-4 border-t"
                style={{ borderColor: "hsl(220 16% 90%)" }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "hsl(220 16% 88%)" }}
                  >
                    <User className="w-3 h-3" style={{ color: "hsl(220 12% 50%)" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-foreground truncate leading-tight">Admin</p>
                    <p className="text-[10px] truncate" style={{ color: "hsl(220 12% 60%)" }}>admin@goldenstar.mm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Main content area ── */}
            <div className="flex-1 flex flex-col min-w-0">

              {/* ── Top app bar ── */}
              <div
                className="flex items-center justify-between gap-4 px-6 py-3.5 border-b flex-shrink-0"
                style={{
                  background: "hsl(220 20% 98.5%)",
                  borderColor: "hsl(220 16% 89%)",
                }}
              >
                {/* Page title */}
                <div>
                  <p className="text-[14px] font-semibold text-foreground tracking-[-0.01em]">
                    {TABS.find((t) => t.id === activeTab)?.label}
                  </p>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2">
                  {/* Search */}
                  <div
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px]"
                    style={{
                      background: "hsl(220 16% 94%)",
                      border: "1px solid hsl(220 16% 89%)",
                      color: "hsl(220 12% 58%)",
                    }}
                  >
                    <Search className="w-3 h-3" />
                    <span>Search...</span>
                    <span
                      className="font-mono text-[9px] px-1 rounded"
                      style={{ background: "hsl(220 16% 88%)", color: "hsl(220 12% 55%)" }}
                    >
                      ⌘K
                    </span>
                  </div>

                  {/* Sync status */}
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium"
                    style={{
                      background: "hsl(142 60% 96%)",
                      border: "1px solid hsl(142 50% 88%)",
                      color: "hsl(142 60% 36%)",
                    }}
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span className="hidden sm:inline">Synced</span>
                  </div>

                  <button
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors"
                    style={{
                      background: "hsl(220 25% 12%)",
                      color: "white",
                    }}
                  >
                    <Upload className="w-3 h-3" />
                    <span className="hidden sm:inline">Upload</span>
                  </button>
                </div>
              </div>

              {/* ── Summary strip ── */}
              <div
                className="grid grid-cols-4 gap-0 border-b flex-shrink-0"
                style={{ borderColor: "hsl(220 16% 89%)" }}
              >
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="px-5 py-4 border-r last:border-r-0"
                    style={{ borderColor: "hsl(220 16% 89%)" }}
                  >
                    <p
                      className="text-[18px] font-bold tracking-[-0.02em] leading-none"
                      style={{ color: "hsl(220 25% 12%)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[11px] font-medium text-foreground mt-1 leading-none">
                      {stat.label}
                    </p>
                    <p
                      className="text-[10px] mt-1"
                      style={{ color: "hsl(220 12% 58%)" }}
                    >
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* ── Panel content ── */}
              <div className="flex-1 p-6 overflow-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <ActivePanel />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Bottom inner shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent pointer-events-none" />
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