import React from "react";
import { User, Zap } from "lucide-react";

export default function ConversationHeader({ scenario }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b"
      style={{ borderColor: "hsl(220 16% 89%)", background: "hsl(220 18% 98.5%)" }}
    >
      {/* Customer info */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "hsl(220 16% 91%)" }}
        >
          <User className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-foreground tracking-[-0.01em]">
            {scenario.conversation[0]?.role === "customer" ? "Incoming customer" : "Customer"}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: "hsl(220 16% 91%)", color: "hsl(220 12% 46%)" }}
            >
              {scenario.business.channels[0]}
            </span>
            <span className="text-[10px] text-muted-foreground">· {scenario.industry}</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: "hsl(142 50% 94%)", border: "1px solid hsl(142 45% 85%)" }}
        >
          <Zap className="w-2.5 h-2.5" style={{ color: "hsl(142 55% 38%)" }} />
          <span className="text-[9px] font-bold tracking-[0.08em] uppercase" style={{ color: "hsl(142 55% 33%)" }}>
            AI Active
          </span>
        </div>
        <span
          className="text-[9px] font-semibold px-2 py-1 rounded-full"
          style={{ background: "hsl(220 16% 93%)", color: "hsl(220 12% 46%)" }}
        >
          In progress
        </span>
      </div>
    </div>
  );
}