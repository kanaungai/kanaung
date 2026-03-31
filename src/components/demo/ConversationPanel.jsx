import React, { useState } from "react";
import { requestShowroomAssistantReply } from "@/api/showroomAssistant";
import { INITIAL_MESSAGES } from "../../data/showroomData";
import ConversationHeader from "./ConversationHeader";
import MessageThread from "./MessageThread";
import DraftComposer from "./DraftComposer";

export default function ConversationPanel({ context, inventory, showroom, kb }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [draft, setDraft] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");

  const handleCustomerSend = async (text) => {
    if (!text.trim()) return;

    const customerMsg = {
      id: Date.now(),
      role: "customer",
      name: "Ko Aung Kyaw",
      content: text,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      channel: "Messenger",
    };
    const nextMessages = [...messages, customerMsg];

    setMessages(nextMessages);
    setDraft(null);
    setGenerationError("");
    setIsGenerating(true);

    const reply = await requestShowroomAssistantReply({
      message: text,
      context,
      inventory,
      showroom,
      kb,
      messages: nextMessages,
    });

    setDraft({ ...reply, id: Date.now() + 1 });
    setIsGenerating(false);
    setGenerationError(reply.error ? "Using local fallback because the backend function is unavailable." : "");
  };

  const handleSendDraft = () => {
    if (!draft) return;
    const aiMsg = {
      id: draft.id,
      role: "ai",
      content: draft.content,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      signals: draft.signals || [],
    };
    setMessages((prev) => [...prev, aiMsg]);
    setDraft(null);
  };

  const handleEscalate = () => {
    const escalateMsg = {
      id: Date.now(),
      role: "system",
      content: "Conversation escalated to sales team.",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, escalateMsg]);
    setDraft(null);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "white" }}>
      <ConversationHeader context={context} />
      <MessageThread messages={messages} />
      <DraftComposer
        draft={draft}
        setDraft={setDraft}
        onSend={handleSendDraft}
        onEscalate={handleEscalate}
        onCustomerSend={handleCustomerSend}
        context={context}
        isGenerating={isGenerating}
        generationError={generationError}
      />
    </div>
  );
}
