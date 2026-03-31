import React, { useState, useEffect } from "react";
import { Send, Pencil, AlertCircle, Zap, Play, Square } from "lucide-react";

export default function DraftComposer({ draft, setDraft, onSend, onEscalate, onCustomerSend, context, isGenerating, generationError, isAutoPlaying, onAutoPlay }) {
  const [customerInput, setCustomerInput] = useState("");
  const [draftText, setDraftText] = useState("");
  const [editingDraft, setEditingDraft] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (draft) {
      setDraftText(draft.content);
      setEditingDraft(false);
      setSent(false);
    }
  }, [draft]);

  const handleSend = () => {
    if (editingDraft && draft) {
      setDraft({ ...draft, content: draftText });
    }
    setSent(true);
    setTimeout(() => {
      onSend();
      setSent(false);
    }, 400);
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    if (!customerInput.trim() || isGenerating) return;
    onCustomerSend(customerInput);
    setCustomerInput("");
  };

  return (
    <div className="flex-shrink-0 border-t" style={{ borderColor: "hsl(220 16% 89%)" }}>

      {/* AI Draft */}
      {!draft && isGenerating && (
        <div
          className="border-b px-4 py-3"
          style={{ background: "hsl(220 18% 98%)", borderColor: "hsl(220 16% 89%)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3 h-3" style={{ color: "hsl(220 20% 40%)" }} />
            <p className="text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "hsl(220 12% 54%)" }}>
              Generating AI Draft
            </p>
          </div>
          <p
            className="text-[12px] leading-relaxed rounded-lg px-3 py-2"
            style={{
              background: "white",
              border: "1px solid hsl(220 16% 89%)",
              color: "hsl(220 18% 18%)",
            }}
          >
            Sending the current showroom context to the backend function...
          </p>
        </div>
      )}

      {draft && (
        <div
          className="border-b px-4 py-3"
          style={{ background: "hsl(220 18% 98%)", borderColor: "hsl(220 16% 89%)" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3 h-3" style={{ color: "hsl(220 20% 40%)" }} />
            <p className="text-[9px] font-bold tracking-[0.1em] uppercase" style={{ color: "hsl(220 12% 54%)" }}>
              AI Draft Response
            </p>
            <div className="flex gap-1 ml-1 flex-wrap">
              {draft.signals?.map((s) => (
                <span
                  key={s}
                  className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
                  style={{ background: "hsl(220 16% 93%)", color: "hsl(220 18% 42%)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {editingDraft ? (
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              rows={3}
              className="w-full text-[12px] leading-relaxed bg-white border rounded-lg px-3 py-2 focus:outline-none resize-none"
              style={{ borderColor: "hsl(220 16% 88%)", color: "hsl(220 18% 18%)" }}
            />
          ) : (
            <p
              className="text-[12px] leading-relaxed rounded-lg px-3 py-2 whitespace-pre-line"
              style={{
                background: "white",
                border: "1px solid hsl(220 16% 89%)",
                color: "hsl(220 18% 18%)",
              }}
            >
              {draftText}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2.5">
            <button
              onClick={handleSend}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3.5 py-1.5 rounded-lg transition-all"
              style={
                sent
                  ? { background: "hsl(142 55% 46%)", color: "white" }
                  : { background: "hsl(220 25% 11%)", color: "white" }
              }
            >
              <Send className="w-3 h-3" />
              {sent ? "Sent" : "Send"}
            </button>
            <button
              onClick={() => setEditingDraft((p) => !p)}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3.5 py-1.5 rounded-lg transition-all"
              style={{
                background: "hsl(220 16% 93%)",
                color: "hsl(220 18% 24%)",
                border: "1px solid hsl(220 16% 87%)",
              }}
            >
              <Pencil className="w-3 h-3" />
              Edit
            </button>
            <button
              onClick={onEscalate}
              className="flex items-center gap-1.5 text-[11px] font-semibold px-3.5 py-1.5 rounded-lg transition-all ml-auto"
              style={{
                background: "hsl(38 80% 96%)",
                color: "hsl(38 60% 34%)",
                border: "1px solid hsl(38 65% 86%)",
              }}
            >
              <AlertCircle className="w-3 h-3" />
              Escalate
            </button>
          </div>
        </div>
      )}

      {/* Simulate customer input */}
      <div className="px-4 py-3" style={{ background: "white" }}>
        <div className="flex items-center justify-between mb-2">
          <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-muted-foreground">
            Simulate Customer Message
          </p>
          <button
            onClick={onAutoPlay}
            className="flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-md transition-all"
            style={
              isAutoPlaying
                ? { background: "hsl(0 60% 95%)", color: "hsl(0 60% 38%)", border: "1px solid hsl(0 50% 86%)" }
                : { background: "hsl(220 16% 93%)", color: "hsl(220 18% 28%)", border: "1px solid hsl(220 16% 87%)" }
            }
          >
            {isAutoPlaying ? <Square className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
            {isAutoPlaying ? "Stop" : "Auto Demo"}
          </button>
        </div>
        {generationError && (
          <div
            className="mb-2 text-[10px] rounded-lg px-3 py-2"
            style={{
              background: "hsl(38 80% 96%)",
              color: "hsl(38 60% 34%)",
              border: "1px solid hsl(38 65% 86%)",
            }}
          >
            {generationError}
          </div>
        )}
        <form onSubmit={handleCustomerSubmit} className="flex gap-2">
          <input
            type="text"
            value={customerInput}
            onChange={(e) => setCustomerInput(e.target.value)}
            placeholder={isGenerating ? "Waiting for backend response..." : "Type a customer message..."}
            disabled={isGenerating}
            className="flex-1 text-[12px] bg-secondary/50 border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 transition-all"
            style={{ borderColor: "hsl(220 16% 88%)", color: "hsl(220 18% 18%)" }}
          />
          <button
            type="submit"
            disabled={!customerInput.trim() || isGenerating}
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40"
            style={{ background: "hsl(220 25% 11%)", color: "white" }}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}