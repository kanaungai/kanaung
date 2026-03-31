import React, { useState } from "react";
import { BookOpen, Pencil, Check, X } from "lucide-react";

const KB_LABELS = {
  hours: "Opening Hours",
  models: "Available Models",
  financing: "Financing",
  delivery: "Delivery",
  warranty: "Warranty",
  bulk: "Bulk / Fleet",
  test_drive: "Test Drive",
};

// Which fields can be edited inline
const EDITABLE_KEYS = ["hours", "financing"];

function KBRow({ field, value, editable, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const save = () => {
    onSave(draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return (
    <div className="group flex items-start gap-2 py-2 border-b last:border-0" style={{ borderColor: "hsl(220 16% 92%)" }}>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold tracking-[0.08em] uppercase text-muted-foreground mb-0.5">
          {KB_LABELS[field]}
        </p>
        {editing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full text-[11px] text-foreground bg-transparent border-b border-primary/40 focus:outline-none pb-0.5"
            onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") cancel(); }}
          />
        ) : (
          <p className="text-[11px] text-foreground/75 leading-snug">{value}</p>
        )}
      </div>
      {editable && !editing && (
        <button
          onClick={() => { setDraft(value); setEditing(true); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1"
        >
          <Pencil className="w-3 h-3 text-muted-foreground hover:text-foreground" />
        </button>
      )}
      {editing && (
        <div className="flex gap-1 flex-shrink-0 mt-1">
          <button onClick={save}><Check className="w-3.5 h-3.5 text-green-600" /></button>
          <button onClick={cancel}><X className="w-3.5 h-3.5 text-red-400" /></button>
        </div>
      )}
    </div>
  );
}

export default function KnowledgeBasePanel({ context, update }) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "white", border: "1px solid hsl(220 16% 89%)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
          Knowledge Base
        </p>
        <span
          className="ml-auto text-[9px] font-medium px-1.5 py-0.5 rounded"
          style={{ background: "hsl(220 16% 93%)", color: "hsl(220 12% 52%)" }}
        >
          Hover to edit
        </span>
      </div>

      <div>
        {Object.entries(context.knowledge).map(([key, value]) => (
          <KBRow
            key={key}
            field={key}
            value={value}
            editable={EDITABLE_KEYS.includes(key)}
            onSave={(val) => update("knowledge", key, val)}
          />
        ))}
      </div>
    </div>
  );
}