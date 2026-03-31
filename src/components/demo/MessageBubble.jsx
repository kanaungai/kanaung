import React from "react";
import { AlertCircle } from "lucide-react";

function SignalChips({ signals }) {
  if (!signals || signals.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {signals.map((s) => {
        const isEscalate = s.toLowerCase().includes("escalat");
        return (
          <span
            key={s}
            className="flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full"
            style={
              isEscalate
                ? { background: "hsl(38 80% 95%)", color: "hsl(38 60% 38%)", border: "1px solid hsl(38 65% 86%)" }
                : { background: "hsl(220 16% 93%)", color: "hsl(220 18% 38%)", border: "1px solid hsl(220 16% 87%)" }
            }
          >
            {isEscalate && <AlertCircle className="w-2.5 h-2.5" />}
            {s}
          </span>
        );
      })}
    </div>
  );
}

export default function MessageBubble({ message }) {
  if (message.role === "system") {
    return (
      <div className="flex justify-center">
        <span
          className="text-[10px] px-3 py-1 rounded-full"
          style={{ background: "hsl(38 80% 95%)", color: "hsl(38 60% 36%)", border: "1px solid hsl(38 60% 86%)" }}
        >
          {message.content}
        </span>
      </div>
    );
  }

  const isCustomer = message.role === "customer";

  return (
    <div className={`flex flex-col ${isCustomer ? "items-end" : "items-start"} gap-1`}>
      {isCustomer && (
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[10px] text-muted-foreground">{message.name}</span>
          {message.channel && (
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: "hsl(214 80% 94%)", color: "hsl(214 72% 38%)" }}
            >
              {message.channel}
            </span>
          )}
        </div>
      )}

      <div className={`max-w-[78%] ${isCustomer ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className="rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line"
          style={
            isCustomer
              ? {
                  background: "hsl(220 25% 11%)",
                  color: "white",
                  borderRadius: "16px 16px 4px 16px",
                }
              : {
                  background: "hsl(220 18% 96%)",
                  color: "hsl(220 18% 16%)",
                  border: "1px solid hsl(220 16% 90%)",
                  borderRadius: "16px 16px 16px 4px",
                }
          }
        >
          {message.content}
        </div>

        {!isCustomer && <SignalChips signals={message.signals} />}

        <p className="text-[9px] text-muted-foreground mt-1 px-1">{message.time}</p>
      </div>
    </div>
  );
}