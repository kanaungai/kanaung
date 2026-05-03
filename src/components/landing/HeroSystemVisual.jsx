import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Copy,
  Database,
  FileText,
  HelpCircle,
  MessageCircle,
  Truck,
} from "lucide-react";
import LiveCallPanel from "./LiveCallPanel";

const cardShadow =
  "0 1px 2px rgba(15,23,42,0.025), 0 10px 24px -22px rgba(15,23,42,0.24)";

const MODULES = {
  knowledge: "knowledge",
  source: "source",
  channel: "channel",
  policy: "policy",
};

const DEFAULT_METRICS = {
  sourcesChecked: 7,
  confidenceScore: 94,
  responseTime: 1.3,
  activeMetric: "confidence",
  status: "Knowledge ready",
};

const DEFAULT_STAGE = {
  module: MODULES.knowledge,
  kbItem: "Product Catalog",
  metrics: DEFAULT_METRICS,
};

function CountUp({ to, suffix = "", decimals = 0 }) {
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);

  useEffect(() => {
    let frame;
    const duration = 900;
    const from = valueRef.current;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = from + (to - from) * eased;
      valueRef.current = nextValue;
      setValue(nextValue);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, decimals]);

  return (
    <>
      {value.toFixed(decimals)}
      {suffix}
    </>
  );
}

function LiveDot({ size = 6, className = "" }) {
  return (
    <span className={`relative inline-flex ${className}`} style={{ width: size, height: size }}>
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: "rgba(34,197,94,0.28)" }}
        animate={{ scale: [1, 2.1, 1], opacity: [0.42, 0, 0.42] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative rounded-full" style={{ width: size, height: size, background: "#22c55e" }} />
    </span>
  );
}

export function SystemCard({ label, children, className = "", delay = 0, style, active = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: active ? 1 : 0.5, y: 0, scale: active ? 1.015 : 1 }}
      transition={{ duration: 0.58, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-[14px] bg-white/88 p-2 backdrop-blur-xl ${className}`}
      style={{
        border: active ? "1px solid rgba(15,23,42,0.12)" : "1px solid rgba(15,23,42,0.06)",
        boxShadow: active ? "0 1px 2px rgba(15,23,42,0.04), 0 14px 30px -22px rgba(15,23,42,0.34)" : cardShadow,
        ...style,
      }}
    >
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <p className="font-inter text-[7px] font-bold uppercase tracking-[0.16em] text-slate-400/85">
          {label}
        </p>
      </div>
      {children}
    </motion.div>
  );
}

export function KnowledgeBaseCard({ className = "", delay = 0, active = true, activeItem = "Product Catalog" }) {
  const items = [
    { label: "Product Catalog", icon: Database },
    { label: "Pricing Sheet", icon: FileText },
    { label: "Delivery Policy", icon: Truck },
    { label: "FAQ", icon: HelpCircle },
  ];

  return (
    <SystemCard label="Knowledge Base" className={className} delay={delay} active={active}>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active && activeItem === item.label;
          return (
            <motion.div
              key={item.label}
              className="flex items-center gap-1.5 rounded-md px-1.5 py-1"
              style={{
                border: isActive ? "1px solid rgba(15,23,42,0.08)" : "1px solid transparent",
                color: isActive ? "rgb(15,23,42)" : "rgb(148,163,184)",
              }}
              animate={
                isActive
                  ? {
                      backgroundColor: [
                        "rgba(248,250,252,0.82)",
                        "rgba(241,245,249,1)",
                        "rgba(248,250,252,0.82)",
                      ],
                      boxShadow: [
                        "0 0 0 rgba(15,23,42,0)",
                        "0 6px 16px -18px rgba(15,23,42,0.42)",
                        "0 0 0 rgba(15,23,42,0)",
                      ],
                    }
                  : { backgroundColor: "rgba(255,255,255,0)", opacity: active ? 0.38 : 0.72 }
              }
              transition={isActive ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.24 }}
            >
              <Icon className="h-2.5 w-2.5 text-slate-400" strokeWidth={1.8} />
              <span className="font-inter text-[8.5px] font-medium tracking-[-0.01em]">{item.label}</span>
            </motion.div>
          );
        })}
      </div>
    </SystemCard>
  );
}

export function SourceInspectionCard({ className = "", delay = 0, active = true }) {
  const fields = [
    ["Source", "Inventory & Price List"],
    ["Item", "EX55 Mini Excavator"],
    ["Stock Status", "Available"],
    ["Price", "280 သိန်း"],
    ["Confidence", "98%"],
  ];

  return (
    <SystemCard label="Source Inspection" className={className} delay={delay} active={active}>
      <div className="-mt-0.5 mb-2 flex items-center gap-1.5">
        <LiveDot size={5} />
        <span className="font-inter text-[8.5px] font-semibold text-emerald-600">Verified</span>
      </div>
      <div className="space-y-1">
        {fields.map(([label, value], index) => (
          <motion.div
            key={label}
            className="flex items-start justify-between gap-2 border-t border-slate-100 pt-1 first:border-t-0 first:pt-0"
            animate={{ opacity: active ? 1 : 0.58, x: active ? [0, index === 0 ? 1 : 0, 0] : 0 }}
            transition={{ duration: active ? 1.8 : 0.24, repeat: active ? Infinity : 0, delay: index * 0.08, ease: "easeInOut" }}
          >
            <span className="font-inter text-[7.5px] font-medium text-slate-400">{label}</span>
            <span className="max-w-[82px] text-right font-inter text-[8px] font-semibold leading-snug text-slate-600">
              {value}
            </span>
          </motion.div>
        ))}
      </div>
    </SystemCard>
  );
}

export function LiveChannelCard({ className = "", delay = 0, active = true }) {
  return (
    <SystemCard label="Live Channel" className={className} delay={delay} active={active}>
      <div className="-mt-1 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-50/80 text-slate-500 ring-1 ring-slate-200/70">
            <MessageCircle className="h-2.5 w-2.5" strokeWidth={1.7} />
          </span>
          <div>
            <p className="font-inter text-[8.5px] font-semibold text-slate-700">Messenger</p>
            <p className="font-inter text-[7.5px] font-medium text-slate-400">Inbound session</p>
          </div>
        </div>
        <LiveDot size={5} />
      </div>
      <div className="mt-1.5 rounded-lg bg-slate-50/80 px-2 py-1.5 ring-1 ring-slate-200/60">
        <p className="font-inter text-[8px] leading-relaxed text-slate-500">
          EX55 mini excavator ရှိသေးလား၊ စျေးနှုန်းလေး သိချင်ပါတယ်။
        </p>
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-2">
        <div>
          <p className="font-inter text-[7.5px] font-medium text-slate-400">Response time</p>
          <p className="font-inter text-[8.5px] font-semibold text-slate-700">2.1s</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white/80 px-1.5 py-1 ring-1 ring-slate-200/70">
          <span className="font-inter text-[7.5px] font-semibold text-slate-500">MS-2048</span>
          <Copy className="h-2.5 w-2.5 text-slate-400" strokeWidth={1.8} />
        </div>
      </div>
    </SystemCard>
  );
}

export function PolicyCheckCard({ className = "", delay = 0, active = true }) {
  const rows = ["Delivery available", "Warranty info found"];

  return (
    <SystemCard label="Policy Check" className={className} delay={delay} active={active}>
      <div className="space-y-1.5">
        {rows.map((row, index) => (
          <motion.div
            key={row}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: active ? 1 : 0.52, x: 0 }}
            transition={{ duration: 0.36, delay: delay + 0.25 + index * 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-1.5 rounded-md bg-slate-50/80 px-1.5 py-1 ring-1 ring-slate-100"
          >
            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" strokeWidth={2} />
            <span className="font-inter text-[8.5px] font-semibold text-slate-600">{row}</span>
          </motion.div>
        ))}
      </div>
    </SystemCard>
  );
}

export function HeroMetricsStrip({ className = "", delay = 0, stage = DEFAULT_STAGE }) {
  const stageMetrics = stage.metrics || DEFAULT_METRICS;
  const metrics = [
    { key: "sources", label: "Sources checked", value: <CountUp to={stageMetrics.sourcesChecked} /> },
    { key: "confidence", label: "Confidence score", value: <CountUp to={stageMetrics.confidenceScore} suffix="%" /> },
    { key: "response", label: "Response time", value: <CountUp to={stageMetrics.responseTime} decimals={1} suffix="s" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, scale: stageMetrics.activeMetric ? 1.015 : 1 }}
      transition={{ duration: 0.58, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden rounded-2xl bg-white/90 px-3 py-2.5 backdrop-blur-xl ${className}`}
      style={{
        border: stageMetrics.activeMetric ? "1px solid rgba(15,23,42,0.1)" : "1px solid rgba(15,23,42,0.06)",
        boxShadow: stageMetrics.activeMetric ? "0 1px 2px rgba(15,23,42,0.04), 0 16px 34px -24px rgba(15,23,42,0.36)" : cardShadow,
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <motion.div
          key={stageMetrics.status}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
          className="flex min-w-0 items-center gap-1.5"
        >
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <motion.span
              className="absolute inset-0 rounded-full bg-emerald-400"
              animate={{ scale: [1, 2.2, 1], opacity: [0.48, 0, 0.48] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="truncate font-inter text-[8px] font-bold uppercase tracking-[0.12em] text-slate-400">
            {stageMetrics.status}
          </span>
        </motion.div>
        <span className="font-inter text-[7.5px] font-bold uppercase tracking-[0.1em] text-slate-300">
          Live
        </span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-slate-100">
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            className="relative px-3 text-center first:pl-0 last:pr-0"
            animate={{ opacity: stageMetrics.activeMetric === metric.key ? 1 : 0.64 }}
            transition={{ duration: 0.28 }}
          >
            {stageMetrics.activeMetric === metric.key && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                className="absolute inset-x-1 -inset-y-1 rounded-xl bg-slate-50"
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <p className="relative font-inter text-[14px] font-semibold tracking-[-0.03em] text-slate-900">{metric.value}</p>
            <p className="relative mt-0.5 font-inter text-[8px] font-semibold uppercase tracking-[0.08em] text-slate-400">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ConnectorLines({ activeModule = MODULES.knowledge }) {
  const paths = [
    { module: MODULES.knowledge, d: "M120 126 C130 132 136 144 143 162" },
    { module: MODULES.source, d: "M132 352 C138 340 144 324 150 306" },
    { module: MODULES.channel, d: "M500 168 C506 150 514 136 522 126" },
    { module: MODULES.policy, d: "M500 354 C508 340 516 322 522 304" },
  ];

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
      viewBox="0 0 640 520"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((path) => (
        <path key={`base-${path.module}`} d={path.d} fill="none" stroke="rgba(100,116,139,0.13)" strokeWidth="0.9" />
      ))}
      {paths.map((path, index) => {
        const isActive = activeModule === path.module;
        return (
        <motion.path
          key={`signal-${path.module}`}
          d={path.d}
          fill="none"
          stroke={isActive ? "rgba(34,197,94,0.42)" : "rgba(148,163,184,0.08)"}
          strokeLinecap="round"
          strokeWidth={isActive ? "1.4" : "0.9"}
          strokeDasharray={isActive ? "12 150" : "1 150"}
          animate={isActive ? { strokeDashoffset: [162, 0], opacity: [0.35, 0.9, 0.35] } : { opacity: 0.18 }}
          transition={isActive ? { duration: 2.8, repeat: Infinity, delay: index * 0.1, ease: "linear" } : { duration: 0.24 }}
        />
        );
      })}
    </svg>
  );
}

function DesktopSystemVisual() {
  const [systemStage, setSystemStage] = useState(DEFAULT_STAGE);
  const activeModule = systemStage.module;
  const activeKnowledgeItem = systemStage.kbItem || "Product Catalog";

  return (
    <div className="relative mx-auto hidden h-[590px] w-[620px] lg:block xl:h-[602px] xl:w-[660px] 2xl:h-[610px] 2xl:w-[700px]">
      <div
        className="absolute left-1/2 top-[48%] h-[360px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "rgba(148,163,184,0.085)" }}
      />
      <ConnectorLines activeModule={activeModule} />
      <KnowledgeBaseCard
        active={activeModule === MODULES.knowledge || Boolean(systemStage.kbItem)}
        activeItem={activeKnowledgeItem}
        className="absolute left-[10px] top-[68px] z-20 w-[108px] xl:left-[8px] xl:w-[116px] 2xl:left-[4px] 2xl:w-[126px]"
        delay={0.28}
      />
      <SourceInspectionCard
        active={activeModule === MODULES.source}
        className="absolute left-[6px] top-[322px] z-20 w-[122px] xl:left-[4px] xl:top-[332px] xl:w-[132px] 2xl:left-[0px] 2xl:w-[142px]"
        delay={0.4}
      />
      <LiveChannelCard
        active={activeModule === MODULES.channel}
        className="absolute right-[-2px] top-[84px] z-20 w-[124px] xl:right-[-6px] xl:w-[132px] 2xl:w-[140px]"
        delay={0.34}
      />
      <PolicyCheckCard
        active={activeModule === MODULES.policy}
        className="absolute right-[2px] top-[346px] z-20 w-[112px] xl:right-[-2px] xl:top-[360px] xl:w-[120px] 2xl:w-[128px]"
        delay={0.48}
      />
      <div className="absolute left-1/2 top-[44px] z-30 w-[360px] -translate-x-1/2 xl:w-[376px] 2xl:w-[392px]">
        <LiveCallPanel compact messageHeight={360} onStageChange={setSystemStage} />
      </div>
      <div className="absolute left-1/2 top-[510px] z-40 w-[276px] -translate-x-1/2 xl:w-[290px] 2xl:w-[302px]">
        <HeroMetricsStrip delay={0.72} stage={systemStage} />
      </div>
    </div>
  );
}

function MobileSystemVisual() {
  const [systemStage, setSystemStage] = useState(DEFAULT_STAGE);

  return (
    <div className="lg:hidden">
      <LiveCallPanel compact onStageChange={setSystemStage} />
      <HeroMetricsStrip className="mt-4" delay={0.62} stage={systemStage} />
      <div className="-mx-8 mt-4 flex gap-3 overflow-x-auto px-8 pb-2 [scrollbar-width:none]">
        <KnowledgeBaseCard className="w-[204px] shrink-0" delay={0.18} />
        <SourceInspectionCard className="w-[220px] shrink-0" delay={0.24} />
        <LiveChannelCard className="w-[220px] shrink-0" delay={0.3} />
        <PolicyCheckCard className="w-[194px] shrink-0" delay={0.36} />
      </div>
    </div>
  );
}

export default function HeroSystemVisual() {
  return (
    <div className="relative w-full">
      <DesktopSystemVisual />
      <MobileSystemVisual />
    </div>
  );
}
