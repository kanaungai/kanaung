import React, { useState } from "react";
import BusinessContextCard from "./BusinessContextCard";
import InventoryPanel from "./InventoryPanel";
import ShowroomPanel from "./ShowroomPanel";
import KnowledgeBasePanel from "./KnowledgeBasePanel";

const TABS = ["Overview", "Inventory", "Policies", "Branches"];

export default function ControlLayer({ context, setContext, inventory, setInventory, showroom, setShowroom, kb, setKb }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const update = (section, key, value) => {
    setContext((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="flex-shrink-0 px-4 sm:px-5 pt-4 pb-3 border-b" style={{ borderColor: "hsl(220 16% 89%)" }}>
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-muted-foreground mb-0.5">
          Control Layer
        </p>
        <h2 className="font-sora text-[14px] font-semibold text-foreground tracking-[-0.02em]">
          Business Configuration
        </h2>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Changes update AI responses in real time.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 flex overflow-x-auto border-b [scrollbar-width:none]" style={{ borderColor: "hsl(220 16% 89%)" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="min-w-[86px] flex-1 py-2.5 text-[11px] font-semibold transition-all"
            style={
              activeTab === tab
                ? { color: "hsl(220 25% 11%)", borderBottom: "2px solid hsl(220 25% 11%)" }
                : { color: "hsl(220 12% 52%)", borderBottom: "2px solid transparent" }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content — scrollable */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
        {activeTab === "Overview" && (
          <BusinessContextCard context={context} update={update} />
        )}
        {activeTab === "Inventory" && (
          <InventoryPanel inventory={inventory} setInventory={setInventory} />
        )}
        {activeTab === "Policies" && (
          <KnowledgeBasePanel kb={kb} setKb={setKb} />
        )}
        {activeTab === "Branches" && (
          <ShowroomPanel showroom={showroom} setShowroom={setShowroom} />
        )}
      </div>
    </div>
  );
}
