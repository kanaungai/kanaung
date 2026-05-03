import React, { useState } from "react";
import { BookOpen, Pencil, Check, X } from "lucide-react";

const KB_FIELDS = [
  { key: "tone",             label: "Tone of Voice",     rows: 2 },
  { key: "sales_policy",     label: "Sales Policy",      rows: 3 },
  { key: "escalation_rules", label: "Escalation Rules",  rows: 3 },
  { key: "dos",              label: "AI Should Say",     rows: 2 },
  { key: "donts",            label: "AI Should NOT Say", rows: 2 },
  { key: "faqs",             label: "FAQs",              rows: 5 },
];

function KBRow({ label, value, rows, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const save = () => { onSave(draft); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  return (
    <div className="group flex items-start gap-2 py-2.5 border-b last:border-0" style={{ borderColor: "hsl(220 16% 92%)" }}>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold tracking-[0.08em] uppercase text-muted-foreground mb-1">{label}</p>
        {editing ? (
          <textarea
            autoFocus
            value={draft}
            rows={rows}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full text-[11px] text-foreground bg-transparent border rounded px-1.5 py-1 focus:outline-none resize-none"
            style={{ borderColor: "hsl(220 16% 84%)" }}
          />
        ) : (
          <p className="text-[11px] text-foreground/75 leading-relaxed whitespace-pre-line">{value}</p>
        )}
      </div>
      {!editing ? (
        <button
          onClick={() => { setDraft(value); setEditing(true); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0"
        >
          <Pencil className="w-3 h-3 text-muted-foreground hover:text-foreground" />
        </button>
      ) : (
        <div className="flex gap-1 mt-0.5 flex-shrink-0">
          <button onClick={save}><Check className="w-3.5 h-3.5 text-green-600" /></button>
          <button onClick={cancel}><X className="w-3.5 h-3.5 text-red-400" /></button>
        </div>
      )}
    </div>
  );
}

export default function KnowledgeBasePanel({ kb, setKb }) {
  const update = (key, val) => setKb((p) => ({ ...p, [key]: val }));

  return (
    <div className="rounded-xl p-3 sm:p-4" style={{ background: "white", border: "1px solid hsl(220 16% 89%)" }}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
          Knowledge Base
        </p>
        <span className="ml-1 text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ background: "hsl(214 80% 94%)", color: "hsl(214 72% 38%)" }}>
          Policy &amp; Reasoning
        </span>
        <span className="ml-0 sm:ml-auto text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ background: "hsl(220 16% 93%)", color: "hsl(220 12% 52%)" }}>
          Hover to edit
        </span>
      </div>

      <div>
        {KB_FIELDS.map(({ key, label, rows }) => (
          <KBRow
            key={key}
            label={label}
            value={kb[key] || ""}
            rows={rows}
            onSave={(val) => update(key, val)}
          />
        ))}
      </div>
    </div>
  );
}
