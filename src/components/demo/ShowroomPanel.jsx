import React, { useState } from "react";
import { MapPin, Clock, Truck, Key, Building2, Pencil, Check, X, Plus, Trash2 } from "lucide-react";

const FIELDS = [
  { key: "hours",       label: "Opening Hours",   icon: Clock },
  { key: "delivery",    label: "Delivery Info",   icon: Truck },
  { key: "test_drive",  label: "Test Drive",      icon: Key },
  { key: "warranty",    label: "Warranty",        icon: null },
  { key: "bulk_policy", label: "Bulk / Fleet",    icon: null },
];

function EditableRow({ icon: Icon, label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const save = () => { onSave(draft); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  return (
    <div className="group flex items-start gap-2 py-2 border-b last:border-0" style={{ borderColor: "hsl(220 16% 92%)" }}>
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold tracking-[0.08em] uppercase text-muted-foreground mb-0.5">{label}</p>
        {editing ? (
          <textarea
            autoFocus
            value={draft}
            rows={2}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full text-[11px] text-foreground bg-transparent border rounded px-1.5 py-1 focus:outline-none resize-none"
            style={{ borderColor: "hsl(220 16% 84%)" }}
          />
        ) : (
          <p className="text-[11px] text-foreground/75 leading-snug">{value}</p>
        )}
      </div>
      {!editing ? (
        <button onClick={() => { setDraft(value); setEditing(true); }} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
          <Pencil className="w-3 h-3 text-muted-foreground hover:text-foreground" />
        </button>
      ) : (
        <div className="flex gap-1 mt-1">
          <button onClick={save}><Check className="w-3.5 h-3.5 text-green-600" /></button>
          <button onClick={cancel}><X className="w-3.5 h-3.5 text-red-400" /></button>
        </div>
      )}
    </div>
  );
}

function BranchRow({ branch, onEdit, onDelete }) {
  return (
    <div className="group flex items-start gap-2 px-2.5 py-2 rounded-lg hover:bg-secondary/40 transition-colors">
      <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-foreground">{branch.name}</p>
        <p className="text-[10px] text-muted-foreground leading-snug">{branch.address}</p>
        <p className="text-[10px] text-muted-foreground">{branch.phone}</p>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(branch)} className="p-1 rounded hover:bg-secondary">
          <Pencil className="w-3 h-3 text-muted-foreground" />
        </button>
        <button onClick={() => onDelete(branch.name)} className="p-1 rounded hover:bg-red-50">
          <Trash2 className="w-3 h-3 text-muted-foreground hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}

const EMPTY_BRANCH = { name: "", address: "", phone: "" };

function BranchForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_BRANCH);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="rounded-xl p-3 mt-2 space-y-2" style={{ background: "hsl(220 18% 98.5%)", border: "1px solid hsl(220 16% 88%)" }}>
      {[["name","Branch Name"],["address","Address"],["phone","Phone"]].map(([k, lbl]) => (
        <div key={k}>
          <label className="text-[9px] font-bold tracking-[0.08em] uppercase text-muted-foreground block mb-0.5">{lbl}</label>
          <input
            value={form[k]}
            onChange={(e) => set(k, e.target.value)}
            className="w-full text-[11px] border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-foreground/20"
            style={{ borderColor: "hsl(220 16% 88%)", color: "hsl(220 18% 16%)" }}
          />
        </div>
      ))}
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onSave(form)}
          className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: "hsl(220 25% 11%)", color: "white" }}
        >
          <Check className="w-3 h-3" /> Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: "hsl(220 16% 92%)", color: "hsl(220 18% 28%)", border: "1px solid hsl(220 16% 86%)" }}
        >
          <X className="w-3 h-3" /> Cancel
        </button>
      </div>
    </div>
  );
}

export default function ShowroomPanel({ showroom, setShowroom }) {
  const [editingBranch, setEditingBranch] = useState(null); // null | "new" | branch obj

  const updateField = (key, val) => setShowroom((p) => ({ ...p, [key]: val }));

  const saveBranch = (branch) => {
    setShowroom((p) => {
      const existing = (p.branches || []).find((b) => b.name === branch.name);
      return {
        ...p,
        branches: existing
          ? p.branches.map((b) => (b.name === branch.name ? branch : b))
          : [...(p.branches || []), branch],
      };
    });
    setEditingBranch(null);
  };

  const deleteBranch = (name) => {
    setShowroom((p) => ({ ...p, branches: p.branches.filter((b) => b.name !== name) }));
  };

  return (
    <div className="rounded-xl p-4" style={{ background: "white", border: "1px solid hsl(220 16% 89%)" }}>
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
          Showroom Facts
        </p>
        <span className="ml-auto text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ background: "hsl(220 16% 93%)", color: "hsl(220 12% 52%)" }}>
          Hover to edit
        </span>
      </div>

      {/* Operational fields */}
      <div className="mb-4">
        {FIELDS.map(({ key, label, icon }) => (
          <EditableRow
            key={key}
            icon={icon}
            label={label}
            value={showroom[key] || ""}
            onSave={(val) => updateField(key, val)}
          />
        ))}
      </div>

      {/* Branches */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-[9px] font-bold tracking-[0.08em] uppercase text-muted-foreground">Branches</p>
          <button
            onClick={() => setEditingBranch("new")}
            className="ml-auto flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md"
            style={{ background: "hsl(220 16% 93%)", color: "hsl(220 18% 28%)" }}
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        {editingBranch === "new" && (
          <BranchForm initial={null} onSave={saveBranch} onCancel={() => setEditingBranch(null)} />
        )}
        <div className="space-y-0.5">
          {(showroom.branches || []).map((b) => (
            <React.Fragment key={b.name}>
              <BranchRow branch={b} onEdit={(br) => setEditingBranch(br)} onDelete={deleteBranch} />
              {editingBranch?.name === b.name && editingBranch !== "new" && (
                <BranchForm initial={editingBranch} onSave={saveBranch} onCancel={() => setEditingBranch(null)} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}