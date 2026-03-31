import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { INITIAL_CONTEXT, INITIAL_INVENTORY, INITIAL_SHOWROOM, INITIAL_KB } from "../data/showroomData";
import ControlLayer from "../components/demo/ControlLayer";
import ConversationPanel from "../components/demo/ConversationPanel";

export default function Demo() {
  const [context, setContext] = useState(INITIAL_CONTEXT);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [showroom, setShowroom] = useState(INITIAL_SHOWROOM);
  const [kb, setKb] = useState(INITIAL_KB);

  return (
    <div className="min-h-screen bg-[hsl(220_22%_97%)] flex flex-col font-inter">
      {/* Top bar */}
      <div
        className="flex items-center gap-4 px-6 h-[56px] border-b flex-shrink-0"
        style={{ background: "hsl(0 0% 100%)", borderColor: "hsl(220 16% 88%)" }}
      >
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>
        <div className="w-px h-3.5 bg-foreground/10" />
        <span className="font-sora font-semibold text-[14px] tracking-[-0.01em] text-foreground">
          kanaung<span className="text-primary font-bold">.</span>
        </span>
        <span className="text-[12px] text-muted-foreground">Product Demo</span>
        <div className="ml-auto flex items-center gap-2">
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide"
            style={{
              background: "hsl(142 55% 95%)",
              color: "hsl(142 55% 33%)",
              border: "1px solid hsl(142 45% 86%)",
            }}
          >
            ● LIVE DEMO
          </span>
        </div>
      </div>

      {/* Two-panel body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Control Layer */}
        <div
          className="w-[38%] flex-shrink-0 border-r overflow-y-auto"
          style={{ borderColor: "hsl(220 16% 88%)", background: "hsl(220 20% 98%)" }}
        >
          <ControlLayer context={context} setContext={setContext} inventory={inventory} setInventory={setInventory} showroom={showroom} setShowroom={setShowroom} kb={kb} setKb={setKb} />
        </div>

        {/* Right: Conversation */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ConversationPanel context={context} inventory={inventory} showroom={showroom} kb={kb} />
        </div>
      </div>
    </div>
  );
}