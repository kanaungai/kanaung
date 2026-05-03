import React, { useState } from "react";
import { Plus, Pencil, Trash2, Check, X, Car } from "lucide-react";

const STOCK_STYLES = {
  in_stock:    { bg: "hsl(142 55% 95%)", color: "hsl(142 55% 30%)", label: "In Stock" },
  low_stock:   { bg: "hsl(38 80% 94%)",  color: "hsl(38 60% 32%)",  label: "Low Stock" },
  out_of_stock:{ bg: "hsl(0 60% 95%)",   color: "hsl(0 60% 38%)",   label: "Out of Stock" },
  preorder:    { bg: "hsl(214 80% 94%)", color: "hsl(214 72% 38%)", label: "Pre-order" },
};

const EMPTY_CAR = {
  brand: "",
  model: "",
  variant: "",
  body_type: "",
  cash_price: "",
  installment_available: true,
  down_payment_pct: 20,
  monthly_term: "12 / 24 / 36 / 48 months",
  monthly_note: "",
  stock_status: "in_stock",
  quantity: 1,
  notes: "",
};

function StockBadge({ status }) {
  const s = STOCK_STYLES[status] || STOCK_STYLES.in_stock;
  return (
    <span
      className="text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

function CarRow({ car, onEdit, onDelete }) {
  return (
    <div
      className="group flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/40 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[12px] font-semibold text-foreground tracking-[-0.01em]">
            {car.brand} {car.model}
          </p>
          <StockBadge status={car.stock_status} />
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{car.variant}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[11px] font-medium text-foreground/70">
            {car.cash_price ? `ကျပ် ${car.cash_price}` : "Contact sales"}
          </span>
          {car.installment_available && (
            <span className="text-[9px] text-muted-foreground">
              💳 {car.down_payment_pct}% down
            </span>
          )}
          <span className="text-[9px] text-muted-foreground">Qty: {car.quantity}</span>
        </div>
      </div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5">
        <button onClick={() => onEdit(car)} className="p-1 rounded hover:bg-secondary">
          <Pencil className="w-3 h-3 text-muted-foreground hover:text-foreground" />
        </button>
        <button onClick={() => onDelete(car.id)} className="p-1 rounded hover:bg-red-50">
          <Trash2 className="w-3 h-3 text-muted-foreground hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}

function CarForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_CAR);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const Field = ({ label, k, type = "text", small = false }) => (
    <div className={small ? "" : ""}>
      <label className="text-[9px] font-bold tracking-[0.08em] uppercase text-muted-foreground block mb-1">
        {label}
      </label>
      <input
        type={type}
        value={form[k]}
        onChange={(e) => set(k, type === "number" ? Number(e.target.value) : e.target.value)}
        className="w-full text-[11px] border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-foreground/20"
        style={{ borderColor: "hsl(220 16% 88%)", color: "hsl(220 18% 16%)" }}
      />
    </div>
  );

  return (
    <div
      className="rounded-xl p-4 mt-2 space-y-3"
      style={{ background: "hsl(220 18% 98.5%)", border: "1px solid hsl(220 16% 88%)" }}
    >
      <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-muted-foreground">
        {initial?.id ? "Edit Model" : "Add New Model"}
      </p>

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2">
        <Field label="Brand" k="brand" />
        <Field label="Model" k="model" />
        <Field label="Variant / Trim" k="variant" />
        <Field label="Body Type" k="body_type" />
        <Field label="Cash Price (MMK)" k="cash_price" />
        <Field label="Qty in Stock" k="quantity" type="number" />
      </div>

      <div>
        <label className="text-[9px] font-bold tracking-[0.08em] uppercase text-muted-foreground block mb-1">
          Stock Status
        </label>
        <div className="flex gap-1.5 flex-wrap">
          {Object.entries(STOCK_STYLES).map(([val, s]) => (
            <button
              key={val}
              onClick={() => set("stock_status", val)}
              className="text-[9px] font-bold px-2 py-1 rounded transition-all"
              style={
                form.stock_status === val
                  ? { background: s.bg, color: s.color, border: `1px solid ${s.color}40` }
                  : { background: "hsl(220 16% 94%)", color: "hsl(220 12% 55%)", border: "1px solid hsl(220 16% 88%)" }
              }
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="inst"
          checked={form.installment_available}
          onChange={(e) => set("installment_available", e.target.checked)}
          className="w-3.5 h-3.5"
        />
        <label htmlFor="inst" className="text-[11px] text-foreground/70">Installment available</label>
      </div>

      {form.installment_available && (
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2">
          <Field label="Down Payment %" k="down_payment_pct" type="number" />
          <Field label="Term Options" k="monthly_term" />
        </div>
      )}

      <div>
        <label className="text-[9px] font-bold tracking-[0.08em] uppercase text-muted-foreground block mb-1">
          Notes
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={2}
          className="w-full text-[11px] border rounded-md px-2 py-1.5 focus:outline-none resize-none"
          style={{ borderColor: "hsl(220 16% 88%)", color: "hsl(220 18% 16%)" }}
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onSave({ ...form, id: form.id || String(Date.now()) })}
          className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: "hsl(220 25% 11%)", color: "white" }}
        >
          <Check className="w-3 h-3" />
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg"
          style={{ background: "hsl(220 16% 92%)", color: "hsl(220 18% 28%)", border: "1px solid hsl(220 16% 86%)" }}
        >
          <X className="w-3 h-3" />
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function InventoryPanel({ inventory, setInventory }) {
  const [editing, setEditing] = useState(null); // null | "new" | car object

  const handleSave = (car) => {
    setInventory((prev) => {
      const exists = prev.find((c) => c.id === car.id);
      return exists ? prev.map((c) => (c.id === car.id ? car : c)) : [...prev, car];
    });
    setEditing(null);
  };

  const handleDelete = (id) => {
    setInventory((prev) => prev.filter((c) => c.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  return (
    <div
      className="rounded-xl p-3 sm:p-4"
      style={{ background: "white", border: "1px solid hsl(220 16% 89%)" }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Car className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground">
          Car Inventory
        </p>
        <span
          className="ml-1 text-[9px] font-semibold px-1.5 py-0.5 rounded"
          style={{ background: "hsl(220 16% 93%)", color: "hsl(220 12% 52%)" }}
        >
          {inventory.length} models
        </span>
        <button
          onClick={() => setEditing("new")}
          className="ml-auto flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all"
          style={{ background: "hsl(220 25% 11%)", color: "white" }}
        >
          <Plus className="w-3 h-3" />
          Add
        </button>
      </div>

      {editing === "new" && (
        <CarForm
          initial={null}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="space-y-0.5">
        {inventory.map((car) => (
          <React.Fragment key={car.id}>
            <CarRow
              car={car}
              onEdit={(c) => setEditing(c)}
              onDelete={handleDelete}
            />
            {editing?.id === car.id && (
              <CarForm
                initial={editing}
                onSave={handleSave}
                onCancel={() => setEditing(null)}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {inventory.length === 0 && (
        <p className="text-center text-[11px] text-muted-foreground py-4">
          No models yet. Click Add to get started.
        </p>
      )}
    </div>
  );
}
