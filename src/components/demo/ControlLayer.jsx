import React from "react";
import BusinessContextCard from "./BusinessContextCard";
import KnowledgeBasePanel from "./KnowledgeBasePanel";
import AIRulesPanel from "./AIRulesPanel";
import InventoryPanel from "./InventoryPanel";

export default function ControlLayer({ context, setContext, inventory, setInventory }) {
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
      <InventoryPanel inventory={inventory} setInventory={setInventory} />
      <KnowledgeBasePanel context={context} update={update} />
      <AIRulesPanel context={context} update={update} />
    </div>
  );
}