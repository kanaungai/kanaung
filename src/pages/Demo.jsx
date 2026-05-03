import React from "react";
import { DemoHeader, DemoWorkspaceBody, useShowroomDemoState } from "../components/demo/DemoWorkspace";

export default function Demo() {
  const demoState = useShowroomDemoState();

  return (
    <div className="h-[100dvh] bg-[hsl(220_22%_97%)] flex flex-col font-inter overflow-hidden">
      <DemoHeader backTo="/" />
      <DemoWorkspaceBody demoState={demoState} />
    </div>
  );
}
