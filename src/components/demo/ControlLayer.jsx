import React from "react";
import BusinessContextCard from "./BusinessContextCard";
import InventoryPanel from "./InventoryPanel";
import ShowroomPanel from "./ShowroomPanel";
import KnowledgeBasePanel from "./KnowledgeBasePanel";

export default function ControlLayer({ context, setContext, inventory, setInventory, showroom, setShowroom, kb, setKb }) {
  const update = (section, key, value) => {
    setContext((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="pb-4 border-b" style={{ borderColor: "hsl(220 16% 89%)" }}>
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-1">
          Control Layer
        </p>
        <h2 className="font-sora text-[15px] font-semibold text-foreground tracking-[-0.02em]">
          Business Configuration
        </h2>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
          Changes here update AI responses in real time.
        </p>
      </div>

      <BusinessContextCard context={context} update={update} />

      {/* Part 1: Structured facts */}
      <div>
        <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-2 px-1">
          Part 1 — Structured Data
        </p>
        <InventoryPanel inventory={inventory} setInventory={setInventory} />
        <div className="mt-3">
          <ShowroomPanel showroom={showroom} setShowroom={setShowroom} />
        </div>
      </div>

      {/* Part 2: Knowledge base / policy */}
      <div>
        <p className="text-[9px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-2 px-1">
          Part 2 — Knowledge Base &amp; Policy
        </p>
        <KnowledgeBasePanel kb={kb} setKb={setKb} />
      </div>
    </div>
  );
}