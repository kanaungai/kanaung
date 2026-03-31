import React from "react";
import { AlertCircle } from "lucide-react";

export default function AIStatusBar({ signals, escalated, align = "left" }) {
  if (!signals || signals.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-1.5 mb-4 ${align === "right" ? "justify-end" : "justify-start pl-[46px]"}`}>
      {signals.map((signal, i) => {
        const isEscalation = signal.toLowerCase().includes("escalat");
        const isWarning = escalated && isEscalation;
        return (
          <span
            key={i}
            className="inline-flex items-center gap-1 text-[9.5px] font-medium px-2.5 py-1 rounded-full"
            style={
              isWarning
                ? {
                    background: "hsl(38 80% 96%)",
                    color: "hsl(38 65% 36%)",
                    border: "1px solid hsl(38 60% 86%)",
                  }
                : {
                    background: "hsl(220 16% 93%)",
                    color: "hsl(220 12% 50%)",
                    border: "1px solid hsl(220 16% 88%)",
                  }
            }
          >
            {isWarning && <AlertCircle className="w-2.5 h-2.5" />}
            {signal}
          </span>
        );
      })}
    </div>
  );
}