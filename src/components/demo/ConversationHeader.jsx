import React from "react";
import { User, Zap } from "lucide-react";

export default function ConversationHeader() {
  return (
    <div
      className="flex items-center justify-between px-5 py-3.5 border-b flex-shrink-0"
      style={{ borderColor: "hsl(220 16% 89%)", background: "hsl(220 20% 99%)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "hsl(220 16% 92%)" }}
        >
          <User className="w-3.5 h-3.5" style={{ color: "hsl(220 12% 46%)" }} />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-foreground tracking-[-0.01em]">
            Ko Aung Kyaw
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: "hsl(214 80% 94%)", color: "hsl(214 72% 38%)" }}
            >
              Messenger
            </span>
            <span className="text-[10px] text-muted-foreground">New lead · Today</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: "hsl(220 16% 95%)" }}>
          <Zap className="w-3 h-3" style={{ color: "hsl(220 20% 40%)" }} />
          <span className="text-[10px] font-semibold" style={{ color: "hsl(220 20% 30%)" }}>
            AI Active
          </span>
        </div>
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "hsl(142 55% 46%)" }}
        />
      </div>
    </div>
  );
}
