import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { INITIAL_CONTEXT, INITIAL_INVENTORY, INITIAL_SHOWROOM, INITIAL_KB } from "../../data/showroomData";
import ControlLayer from "./ControlLayer";
import ConversationPanel from "./ConversationPanel";

export function useShowroomDemoState() {
  const [context, setContext] = useState(INITIAL_CONTEXT);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [showroom, setShowroom] = useState(INITIAL_SHOWROOM);
  const [kb, setKb] = useState(INITIAL_KB);

  return {
    context,
    setContext,
    inventory,
    setInventory,
    showroom,
    setShowroom,
    kb,
    setKb,
  };
}

export function DemoHeader({ backTo = null, onBack = undefined, showClose = false }) {
  const backClassName = "flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors";
  const backContent = (
    <>
      <ArrowLeft className="w-3.5 h-3.5" />
      Back
    </>
  );

  return (
    <div
      className="flex items-center gap-4 px-6 h-[56px] border-b flex-shrink-0"
      style={{ background: "hsl(0 0% 100%)", borderColor: "hsl(220 16% 88%)" }}
    >
      {backTo ? (
        <Link to={backTo} className={backClassName}>
          {backContent}
        </Link>
      ) : (
        <button onClick={onBack} className={backClassName}>
          {backContent}
        </button>
      )}
      <div className="w-px h-3.5 bg-foreground/10" />
      <span className="font-sora font-semibold text-[14px] tracking-[-0.01em] text-foreground">
        kanaung<span className="text-primary font-bold">.</span>
      </span>
      <span className="text-[12px] text-muted-foreground">Product Demo</span>
      <div className="ml-auto flex items-center gap-3">
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
        {showClose && (
          <button
            onClick={onBack}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-foreground/6 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}

export function DemoWorkspaceBody({ demoState }) {
  const {
    context,
    setContext,
    inventory,
    setInventory,
    showroom,
    setShowroom,
    kb,
    setKb,
  } = demoState;

  return (
    <div className="flex flex-1 overflow-hidden">
      <div
        className="w-[38%] flex-shrink-0 border-r flex flex-col overflow-hidden"
        style={{ borderColor: "hsl(220 16% 88%)", background: "hsl(220 20% 98%)" }}
      >
        <ControlLayer
          context={context}
          setContext={setContext}
          inventory={inventory}
          setInventory={setInventory}
          showroom={showroom}
          setShowroom={setShowroom}
          kb={kb}
          setKb={setKb}
        />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <ConversationPanel context={context} inventory={inventory} showroom={showroom} kb={kb} />
      </div>
    </div>
  );
}
