import React from "react";
import { Building2, MapPin, Globe } from "lucide-react";

const CHANNEL_COLORS = {
  Web: { bg: "hsl(220 16% 93%)", text: "hsl(220 18% 30%)" },
  Messenger: { bg: "hsl(214 80% 94%)", text: "hsl(214 72% 38%)" },
  Viber: { bg: "hsl(270 60% 94%)", text: "hsl(270 55% 40%)" },
};

export default function BusinessContextCard({ context, update }) {
  const { business } = context;

  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "white", border: "1px solid hsl(220 16% 89%)" }}
    >
      <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-3">
        Business Context
      </p>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2.5">
          <Building2 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="text-[13px] font-semibold text-foreground tracking-[-0.01em]">
              {business.name}
            </p>
            <p className="text-[11px] text-muted-foreground">{business.industry}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          <p className="text-[12px] text-foreground/70">{business.location}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <Globe className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-1.5 flex-wrap">
            {business.channels.map((ch) => (
              <span
                key={ch}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                style={CHANNEL_COLORS[ch] || { bg: "hsl(220 16% 93%)", text: "hsl(220 18% 30%)" }}
              >
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* Language toggle */}
        <div className="pt-1 flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground">Response language</p>
          <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "hsl(220 16% 88%)" }}>
            {["burmese", "bilingual"].map((mode) => (
              <button
                key={mode}
                onClick={() => update("business", "language", mode)}
                className="px-3 py-1 text-[10px] font-semibold capitalize transition-all"
                style={
                  business.language === mode
                    ? { background: "hsl(220 25% 11%)", color: "white" }
                    : { background: "transparent", color: "hsl(220 12% 52%)" }
                }
              >
                {mode === "burmese" ? "Burmese" : "Bilingual"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}