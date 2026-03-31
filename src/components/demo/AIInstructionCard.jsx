import React, { useState } from "react";
import { Zap, ChevronDown, ChevronUp } from "lucide-react";

const LANGUAGE_OPTIONS = [
  { value: "burmese", label: "Burmese" },
  { value: "english", label: "English" },
  { value: "bilingual", label: "Bilingual" },
];

const STYLE_OPTIONS = [
  { value: "formal", label: "Formal" },
  { value: "friendly", label: "Friendly" },
  { value: "concise", label: "Concise" },
];

function ToggleGroup({ options, value, onChange }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="px-3 py-1 rounded-full text-[10px] font-semibold transition-all duration-150"
          style={
            value === opt.value
              ? { background: "hsl(220 25% 11%)", color: "white" }
              : { background: "hsl(220 16% 92%)", color: "hsl(220 12% 48%)", border: "1px solid hsl(220 16% 88%)" }
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function AIInstructionCard({ instructions, language, style, onLanguageChange, onStyleChange }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <button
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-foreground/[0.02] transition-colors border-b"
        style={{ borderColor: "hsl(220 16% 90%)" }}
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-muted-foreground/50" />
          <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground/40">
            AI Instructions
          </p>
        </div>
        {expanded
          ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground/30" />
          : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/30" />
        }
      </button>

      {expanded && (
        <div className="px-5 py-4 space-y-5">
          {/* Quick controls */}
          <div className="space-y-3">
            <div>
              <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-muted-foreground/40 mb-2">
                Language Mode
              </p>
              <ToggleGroup options={LANGUAGE_OPTIONS} value={language} onChange={onLanguageChange} />
            </div>
            <div>
              <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-muted-foreground/40 mb-2">
                Response Style
              </p>
              <ToggleGroup options={STYLE_OPTIONS} value={style} onChange={onStyleChange} />
            </div>
          </div>

          {/* Rule list */}
          <div
            className="rounded-lg px-3.5 py-3 space-y-2"
            style={{ background: "hsl(220 18% 95.5%)", border: "1px solid hsl(220 16% 90%)" }}
          >
            {instructions.map((rule, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span
                  className="text-[8px] font-bold w-4 h-4 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "hsl(220 16% 89%)", color: "hsl(220 12% 48%)" }}
                >
                  {i + 1}
                </span>
                <p className="text-[11px] text-foreground/65 leading-[1.65]">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}