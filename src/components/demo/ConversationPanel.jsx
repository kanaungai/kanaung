import React from "react";
import ConversationHeader from "./ConversationHeader";
import MessageThread from "./MessageThread";
import DraftComposer from "./DraftComposer";

export default function ConversationPanel({ scenario, language, responseStyle }) {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background">
      <ConversationHeader scenario={scenario} />
      <MessageThread messages={scenario.conversation} />
      <DraftComposer draft={scenario.draft} signals={scenario.draftSignals} />
    </div>
  );
}