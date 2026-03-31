import React from "react";
import { Zap } from "lucide-react";

const RULE_LABELS = {
  language_first: "Burmese-first replies",
  concise: "Keep responses concise & polite",
  no_invent: "Don't invent unavailable models",
  escalate_discounts: "Escalate discount negotiations",
  escalate_complaints: "Escalate complaints",
};

// Rules the user can toggle
const TOGGLEABLE = ["escalate_discounts", "escalate_complaints"];

export default function AIRulesPanel({ context, update }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "white", border: "1px solid hsl(220 16% 89%)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
          AI Operating Rules
        </p>
      </div>

      <div className="space-y-2">
        {Object.entries(context.rules).map(([key, enabled]) => {
          const toggleable = TOGGLEABLE.includes(key);
          return (
            <div key={key} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: enabled ? "hsl(142 55% 46%)" : "hsl(220 12% 75%)" }}
                />
                <p
                  className="text-[11px] leading-snug"
                  style={{ color: enabled ? "hsl(220 18% 22%)" : "hsl(220 12% 60%)" }}
                >
                  {RULE_LABELS[key]}
                </p>
              </div>
              {toggleable && (
                <button
                  onClick={() => update("rules", key, !enabled)}
                  className="flex-shrink-0 w-7 h-4 rounded-full relative transition-colors duration-200"
                  style={{ background: enabled ? "hsl(220 25% 11%)" : "hsl(220 12% 82%)" }}
                >
                  <span
                    className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all duration-200"
                    style={{ left: enabled ? "calc(100% - 14px)" : "2px" }}
                  />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}