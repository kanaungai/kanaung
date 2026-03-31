import React, { useState, useEffect } from "react";
import { Send, Pencil, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";

export default function DraftComposer({ draft, signals }) {
  const [text, setText] = useState(draft);
  const [sent, setSent] = useState(false);
  const [expanded, setExpanded] = useState(true);

  // Reset when draft prop changes (scenario switch)
  useEffect(() => {
    setText(draft);
    setSent(false);
  }, [draft]);

  const handleSend = () => {
    if (!text.trim()) return;
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <div
      className="flex-shrink-0 border-t"
      style={{ borderColor: "hsl(220 16% 89%)", background: "hsl(220 18% 98.5%)" }}
    >
      {/* Draft header */}
      <button
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-foreground/[0.02] transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-muted-foreground/50">
            AI Draft Response
          </p>
          <span
            className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
            style={{ background: "hsl(220 16% 91%)", color: "hsl(220 12% 50%)" }}
          >
            Auto-drafted
          </span>
        </div>
        {expanded
          ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/30" />
          : <ChevronUp className="w-3.5 h-3.5 text-muted-foreground/30" />
        }
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-3">
          {/* Signal chips */}
          {signals && signals.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {signals.map((sig, i) => (
                <span
                  key={i}
                  className="text-[9.5px] font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: "hsl(220 16% 93%)",
                    color: "hsl(220 12% 50%)",
                    border: "1px solid hsl(220 16% 88%)",
                  }}
                >
                  {sig}
                </span>
              ))}
            </div>
          )}

          {/* Text area */}
          <textarea
            value={sent ? "✓  Message sent" : text}
            onChange={(e) => !sent && setText(e.target.value)}
            rows={3}
            readOnly={sent}
            className="w-full text-[13px] leading-[1.7] resize-none rounded-xl px-4 py-3 outline-none transition-all"
            style={{
              background: sent ? "hsl(142 50% 97%)" : "white",
              border: `1px solid ${sent ? "hsl(142 45% 82%)" : "hsl(220 16% 87%)"}`,
              color: sent ? "hsl(142 55% 32%)" : "hsl(220 18% 16%)",
              boxShadow: "0 1px 4px hsl(220 16% 88% / 0.4)",
            }}
          />

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSend}
              disabled={sent}
              className="inline-flex items-center gap-2 text-[12px] font-semibold px-5 py-2 rounded-full transition-all duration-150"
              style={{
                background: sent ? "hsl(142 50% 94%)" : "hsl(220 25% 11%)",
                color: sent ? "hsl(142 55% 33%)" : "white",
                opacity: sent ? 1 : 1,
              }}
            >
              <Send className="w-3.5 h-3.5" />
              {sent ? "Sent" : "Send reply"}
            </button>
            <button
              disabled={sent}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-full transition-all duration-150"
              style={{
                background: "transparent",
                color: "hsl(220 18% 36%)",
                border: "1px solid hsl(220 16% 84%)",
              }}
            >
              <Pencil className="w-3 h-3" />
              Edit
            </button>
            <button
              disabled={sent}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold px-4 py-2 rounded-full transition-all duration-150 ml-auto"
              style={{
                background: "hsl(38 80% 97%)",
                color: "hsl(38 65% 36%)",
                border: "1px solid hsl(38 60% 86%)",
              }}
            >
              <AlertCircle className="w-3 h-3" />
              Escalate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}